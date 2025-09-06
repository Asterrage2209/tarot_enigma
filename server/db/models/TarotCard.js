import mongoose from 'mongoose';

const TarotCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const TarotCard = mongoose.model('TarotCard', TarotCardSchema);

export default TarotCard;