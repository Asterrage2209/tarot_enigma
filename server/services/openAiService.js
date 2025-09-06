import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

// Configure the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Fast and capable model

/**
 * AI selects 3 cards based on the user's problem.
 */
export const selectCards = async (problem, cardNames) => {
  const prompt = `
    You are an expert tarot reader. A user is asking about the following problem: "${problem}".
    From the following list of 78 tarot cards, select the THREE (3) cards that are most relevant to the user's problem.
    List of cards: ${cardNames.join(', ')}.
    
    Respond with ONLY a valid JSON object containing a single key "selected_cards" which is an array of the three card names. Example: {"selected_cards": ["Card Name 1", "Card Name 2", "Card Name 3"]}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the text to ensure it's valid JSON
    const jsonText = text.replace('```json', '').replace('```', '').trim();
    const parsedResult = JSON.parse(jsonText);
    
    const selected = parsedResult.selected_cards;
    if (Array.isArray(selected) && selected.length === 3) {
      return selected;
    } else {
      throw new Error("AI did not return a valid array of 3 card names.");
    }

  } catch (error) {
    console.error("Error selecting cards from Gemini:", error);
    throw new Error("Failed to get card selection from AI.");
  }
};

/**
 * AI generates interpretations for the selected cards and a summary.
 */
export const generateReading = async (name, problem, selectedCards) => {
  const cardInfo = selectedCards.map(card => `- ${card.name}: ${card.description}`).join('\n');

  const prompt = `
    You are an expert, empathetic, and insightful tarot reader.
    Your client, ${name}, has come to you with a problem: "${problem}".

    You have drawn the following three cards for them:
    ${cardInfo}

    Please provide a comprehensive reading. Structure your response as a valid JSON object with two keys: "interpretations" and "summary".
    1.  "interpretations": An object where each key is the card name (e.g., "The Fool") and the value is a string of 2-3 sentences explaining that card's meaning for ${name}'s problem.
    2.  "summary": A final paragraph (4-5 sentences) of advice and summary for ${name}, synthesizing the messages of all three cards.

    Your tone should be wise and supportive. Address ${name} directly. Respond with ONLY the JSON object.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the text to ensure it's valid JSON
    const jsonText = text.replace('```json', '').replace('```', '').trim();
    return JSON.parse(jsonText);

  } catch (error) {
    console.error("Error generating reading from Gemini:", error);
    throw new Error("Failed to get reading from AI.");
  }
};