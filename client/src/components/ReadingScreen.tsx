import React from 'react';
import { ReadingData } from '../types';

interface ReadingScreenProps {
    reading: ReadingData;
    onReset: () => void;
}

const ReadingScreen: React.FC<ReadingScreenProps> = ({ reading, onReset }) => {
    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center p-4 animate-reading-reveal">
            <h2 className="title text-4xl sm:text-5xl">Your Tarot Enigma Reading</h2>
            
            <div className="flex flex-col lg:flex-row justify-center items-start gap-8 my-12 w-full">
                {reading.cards.map((card) => (
                    <div key={card.name} className="flex-1 w-full max-w-sm mx-auto text-center">
                        <img src={card.imageUrl} alt={card.name} className="w-full aspect-[2/3] object-cover rounded-2xl shadow-lg shadow-purple-deep/50" />
                        <div className="mt-6">
                            <h4 className="font-display text-gold text-2xl mb-2">{card.name}</h4>
                            <p className="text-text-muted text-sm italic mb-3">"{card.description}"</p>
                            <p className="text-text-main leading-relaxed">{card.interpretation}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 w-full max-w-4xl text-center">
                 <h3 className="title text-3xl mb-4">Final Guidance</h3>
                 <p className="text-text-main text-lg leading-loose bg-purple-deep/30 p-6 rounded-lg">{reading.summary}</p>
            </div>

            <button onClick={onReset} className="primary-button mt-12">
                Ask Another Question
            </button>
        </div>
    );
};

export default ReadingScreen;