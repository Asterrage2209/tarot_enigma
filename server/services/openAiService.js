import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * AI selects 3 cards based on the user's problem.
 */
export const selectCards = async (problem, cardNames) => {
  // --- NEW, MUCH STRICTER PROMPT ---
  const prompt = `
    You are an expert tarot reader AI. A user has the following problem: "${problem}".

    Your ONLY task is to select EXACTLY THREE cards that are most relevant to this problem from the provided list of valid card names.

    Here is the list of valid card names you MUST choose from:
    ["${cardNames.join('", "')}"]

    RULES:
    1.  You MUST use the exact spelling and capitalization for each card name as it appears in the list.
    2.  Your response MUST be a single, valid JSON object.
    3.  The JSON object must have a single key named "selected_cards".
    4.  The value of "selected_cards" MUST be an array containing exactly three strings.
    5.  Each string in the array MUST be a card name from the provided list.

    Example of a perfect response:
    {"selected_cards": ["The Fool", "Justice", "The World"]}

    Do not include any other text, explanations, or markdown formatting like \`\`\`json in your response. Your entire output must be ONLY the JSON object itself.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
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
    
    const jsonText = text.replace('```json', '').replace('```', '').trim();
    return JSON.parse(jsonText);

  } catch (error) {
    console.error("Error generating reading from Gemini:", error);
    throw new Error("Failed to get reading from AI.");
  }
};