export interface TarotCard {
  name: string;
  type: string;
  description: string;
  imageUrl: string;
}

export interface ReadingCardData extends TarotCard {
  interpretation: string;
}

export interface ReadingData {
  cards: ReadingCardData[];
  summary: string;
}