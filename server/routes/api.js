import express from 'express';
import TarotCard from '../db/models/TarotCard.js';
import { selectCards, generateReading } from '../services/openAiService.js';

const router = express.Router();

router.post('/reading', async (req, res) => {
  const { name, problem } = req.body;

  if (!name || !problem) {
    return res.status(400).json({ error: 'Name and problem are required.' });
  }

  try {
    const allCards = await TarotCard.find().select('name');
    const allCardNames = allCards.map(card => card.name);

    const selectedNames = await selectCards(problem, allCardNames);

    const cardDetails = await TarotCard.find({ name: { $in: selectedNames } });
    
    const sortedCardDetails = selectedNames
      .map(name => cardDetails.find(card => card.name === name))
      .filter(Boolean); 

    if (sortedCardDetails.length < 3) {
      throw new Error("AI returned card names that could not be found in the database.");
    }

    const aiReading = await generateReading(name, problem, sortedCardDetails);

    const finalCards = sortedCardDetails.map(card => ({
      name: card.name,
      description: card.description,
      imageUrl: card.imageUrl,
      interpretation: aiReading.interpretations[card.name] || "No interpretation provided.",
    }));

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