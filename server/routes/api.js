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
    // 1. Get all card names from DB to pass to AI for selection
    const allCards = await TarotCard.find().select('name');
    const allCardNames = allCards.map(card => card.name);

    // 2. AI selects 3 cards
    const selectedNames = await selectCards(problem, allCardNames);

    // 3. Fetch full details for the selected cards from MongoDB
    const cardDetails = await TarotCard.find({ name: { $in: selectedNames } });
    
    // Ensure the order is the same as the AI selected
    const sortedCardDetails = selectedNames.map(name => 
      cardDetails.find(card => card.name === name)
    );

    // 4. AI generates interpretations and summary
    const aiReading = await generateReading(name, problem, sortedCardDetails);

    // 5. Combine card details with AI interpretations
    const finalCards = sortedCardDetails.map(card => ({
      name: card.name,
      description: card.description,
      imageUrl: card.imageUrl,
      interpretation: aiReading.interpretations[card.name] || "No interpretation provided.",
    }));

    // 6. Send the final response
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