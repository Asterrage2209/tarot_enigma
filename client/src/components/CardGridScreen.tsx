import React from 'react';
import { TarotCard, ReadingCardData } from '../types';

interface CardGridScreenProps {
  allCards: TarotCard[];
  selectedCards: ReadingCardData[] | null;
  isLoading: boolean;
  isZooming: boolean; // Add the new prop
}

const CardGridScreen: React.FC<CardGridScreenProps> = ({ allCards, selectedCards, isLoading, isZooming }) => {
  const selectedNames = new Set(selectedCards?.map(c => c.name));

  return (
    <div className="flex flex-col items-center justify-center w-full text-center">
      <h2 className="title text-4xl sm:text-5xl mb-4 transition-opacity duration-1000" style={{ opacity: isLoading ? 1 : 0 }}>
        Consulting the Cosmos...
      </h2>
      
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2 sm:gap-3">
          {allCards.map((card, index) => {
            const isFlipped = selectedNames.has(card.name);
            // A card is zoomed only if it's selected AND the zoom state is active
            const isZoomed = isFlipped && isZooming;

            return (
              <div
                key={card.name + index}
                // Apply the is-zoomed class conditionally
                className={`card-container aspect-[2/3] ${isFlipped ? 'is-flipped' : ''} ${isZoomed ? 'is-zoomed' : ''}`}
                style={{ transitionDelay: isFlipped ? `${index * 25}ms` : '0ms' }}
              >
                <div className="card-flipper">
                  <div className="card-face card-back"></div>
                  <div className="card-face card-front">
                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardGridScreen;