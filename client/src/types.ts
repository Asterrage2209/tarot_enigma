// A generic Tarot Card from the main deck
export interface TarotCard {
  name: string;
  type: string;
  description: string;
  imageUrl: string;
}

// The specific data for a card returned from the AI reading
export interface ReadingCardData extends TarotCard {
  interpretation: string;
}

// The complete AI reading data structure
export interface ReadingData {
  cards: ReadingCardData[];
  summary: string;
}