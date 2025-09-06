import mongoose from 'mongoose';
import 'dotenv/config';
import TarotCard from '../db/models/TarotCard.js';
import { tarotCardsData } from './tarotCardData.js';
import connectDB from '../db/connection.js';

const seedDB = async () => {
  await connectDB();

  try {
    console.log('Clearing existing data...');
    await TarotCard.deleteMany({});

    console.log('Inserting seed data...');
    await TarotCard.insertMany(tarotCardsData);

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();