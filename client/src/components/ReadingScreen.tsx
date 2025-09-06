import React, { useState, useEffect } from 'react';

// --- Type Definitions ---
interface CardData {
    name: string;
    description: string;
    imageUrl: string;
    interpretation: string;
}

interface ReadingScreenProps {
    reading: {
        cards: CardData[];
        summary: string;
    };
    onReset: () => void;
}

const ReadingScreen: React.FC<ReadingScreenProps> = ({ reading, onReset }) => {
    const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);

    useEffect(() => {
        const timers = reading.cards.map((_, index) => 
            setTimeout(() => {
                setFlipped(prev => {
                    const newFlipped = [...prev];
                    newFlipped[index] = true;
                    return newFlipped;
                });
            }, index * 600 + 500) // Staggered flip animation
        );

        return () => timers.forEach(clearTimeout);
    }, [reading.cards]);

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center p-4">
            <h2 className="title text-4xl sm:text-5xl">Your Tarot Enigma Reading</h2>
            
            {/* Cards Display */}
            <div className="flex flex-col lg:flex-row justify-center items-start gap-8 my-12 w-full">
                {reading.cards.map((card, index) => (
                    <div key={card.name} className="flex-1 w-full max-w-sm mx-auto">
                        <div className={`card-container w-full aspect-[2/3] ${flipped[index] ? 'is-flipped' : ''}`}>
                            <div className="card-flipper">
                                {/* Card Back */}
                                <div className="card-face card-back flex items-center justify-center">
                                    <svg width="60%" height="60%" viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.3421 10.9231C44.5113 10.2099 45.8617 8.01844 45.1485 5.84926C44.4353 3.68007 42.2438 2.32969 40.0746 3.04287L2.34209 13.9231C0.172905 14.6363 -1.17748 16.8277 0.135702 18.9969C0.848883 21.1661 3.04033 22.5165 5.20952 21.8033L42.3421 10.9231Z" fill="url(#paint0_radial_101_2)" /><path d="M107.509 23.2312C105.158 22.1466 102.434 22.977 101.349 25.328C100.264 27.679 101.095 30.4034 103.446 31.488L121.603 39.866C123.954 40.9506 126.678 40.1202 127.763 37.7692C128.848 35.4182 128.018 32.6938 125.667 31.6092L107.509 23.2312Z" fill="url(#paint1_radial_101_2)" /><path d="M62 124C96.2416 124 124 96.2416 124 62C124 27.7584 96.2416 0 62 0C27.7584 0 0 27.7584 0 62C0 96.2416 27.7584 124 62 124ZM62 103.333C85.0217 103.333 103.333 85.0217 103.333 62C103.333 38.9783 85.0217 20.6667 62 20.6667C38.9783 20.6667 20.6667 38.9783 20.6667 62C20.6667 85.0217 38.9783 103.333 62 103.333Z" fill="url(#paint2_radial_101_2)" /><defs><radialGradient id="paint0_radial_101_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(22.7423 12.5132) rotate(90) scale(10.0401 22.544)"><stop stopColor="#FDE047" /><stop offset="1" stopColor="#F59E0B" stopOpacity="0" /></radialGradient><radialGradient id="paint1_radial_101_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(114.636 31.8487) rotate(90) scale(9.51651 13.7845)"><stop stopColor="#FDE047" /><stop offset="1" stopColor="#F59E0B" stopOpacity="0" /></radialGradient><radialGradient id="paint2_radial_101_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(62 62) rotate(90) scale(62)"><stop stopColor="#FDE047" /><stop offset="1" stopColor="#F59E0B" /></radialGradient></defs></svg>
                                </div>
                                {/* Card Front */}
                                <div className="card-face card-front">
                                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-center animate-reading-reveal" style={{ animationDelay: `${index * 250 + 800}ms` }}>
                            <h4 className="font-display text-gold text-2xl mb-2">{card.name}</h4>
                            <p className="text-text-muted text-sm italic mb-3">"{card.description}"</p>
                            <p className="text-text-main leading-relaxed">{card.interpretation}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Summary */}
            <div className="mt-12 w-full max-w-4xl text-center animate-reading-reveal" style={{ animationDelay: '1600ms' }}>
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