import express from 'express';
import TarotCard from '../db/models/TarotCard.js';
import { selectCards, generateReading } from '../services/openAiService.js';

const router = express.Router();

// POST /api/reading
router.post('/reading', async (req, res) => {
  const { name, problem } = req.body;

  if (!name || !problem) {
    return res.status(400).json({ error: 'Name and problem are required.' });
  }

  try {
    // 1. Get all card names from DB
    const allCards = await TarotCard.find().select('name');
    const allCardNames = allCards.map(card => card.name);

    // 2. AI selects 3 cards
    const selectedNames = await selectCards(problem, allCardNames);

    // 3. Fetch full details for the selected cards from MongoDB
    const cardDetails = await TarotCard.find({ name: { $in: selectedNames } });
    
    // 4. Match the AI's selected names with the DB results
    const sortedCardDetails = selectedNames
      .map(name => cardDetails.find(card => card.name === name))
      // VVV THIS IS THE FIX VVV
      .filter(Boolean); // This removes any 'undefined' items if a card name wasn't found

    // Safety check: If after filtering we don't have 3 cards, something went wrong
    if (sortedCardDetails.length < 3) {
      throw new Error("AI returned card names that could not be found in the database.");
    }

    // 5. AI generates interpretations and summary
    const aiReading = await generateReading(name, problem, sortedCardDetails);

    // 6. Combine card details with AI interpretations
    const finalCards = sortedCardDetails.map(card => ({
      name: card.name,
      description: card.description,
      imageUrl: card.imageUrl,
      interpretation: aiReading.interpretations[card.name] || "No interpretation provided.",
    }));

    // 7. Send the final response
    res.json({
      cards: finalCards,
      summary: aiReading.summary,
    });

  } catch (error) {
    console.error('Error in /api/reading:', error);
    res.status(500).json({ error: 'An error occurred while generating your reading.' });
  }
});

export default router;