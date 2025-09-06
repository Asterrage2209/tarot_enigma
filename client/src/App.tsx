import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardGridScreen from './components/CardGridScreen';
import ReadingScreen from './components/ReadingScreen';
import { tarotCardsData } from './data/tarotCardsData';
import { TarotCard, ReadingData } from './types';

type AppStep = 'name_input' | 'problem_input' | 'grid_reveal' | 'reading';

const shuffleDeck = (deck: TarotCard[]): TarotCard[] => {
    return deck.sort(() => Math.random() - 0.5);
};

const App: React.FC = () => {
    const [step, setStep] = useState<AppStep>('name_input');
    const [name, setName] = useState('');
    const [problem, setProblem] = useState('');
    const [allCards, setAllCards] = useState<TarotCard[]>([]);
    const [reading, setReading] = useState<ReadingData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // NEW STATE to manage the zoom-in animation
    const [isZooming, setIsZooming] = useState(false);

    useEffect(() => {
        setAllCards(shuffleDeck([...tarotCardsData]));
    }, []);
    
    // UPDATED useEffect to handle the new multi-stage animation
    useEffect(() => {
        if (reading) {
            // Start the zoom animation shortly after the flip begins
            const zoomTimer = setTimeout(() => {
                setIsZooming(true);
            }, 1500); // Starts 1.5s after reading is received

            // Transition to the reading screen after the zoom has finished
            const screenChangeTimer = setTimeout(() => {
                setStep('reading');
            }, 3500); // Total wait time of 3.5s

            return () => {
                clearTimeout(zoomTimer);
                clearTimeout(screenChangeTimer);
            };
        }
    }, [reading]);

    const handleNameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            setStep('problem_input');
        }
    };

    const handleProblemSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!problem.trim()) return;

        setIsLoading(true);
        setStep('grid_reveal');
        setError(null);
        setReading(null);
        setIsZooming(false); // Reset zoom state

        try {
            const response = await axios.post('http://localhost:5001/api/reading', {
                name,
                problem,
            });
            setReading(response.data);
        } catch (err) {
            setError('The cosmos seems to be busy. Please try again later.');
            setStep('problem_input');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setProblem('');
        setReading(null);
        setError(null);
        setAllCards(shuffleDeck([...tarotCardsData]));
        setIsZooming(false); // Reset zoom state
        setStep('problem_input');
    };
    
    const renderContent = () => {
        switch (step) {
            case 'name_input':
                // ... (no changes here)
                return (
                     <div className="flex flex-col items-center gap-6 w-full max-w-md text-center">
                        <h1 className="title text-5xl sm:text-6xl md:text-7xl">Tarot Enigma</h1>
                        <p className="text-lg text-text-muted">Unveil the secrets the universe holds for you.</p>
                        <form onSubmit={handleNameSubmit} className="w-full flex flex-col items-center gap-6 mt-4">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Please enter your name"
                                className="w-full bg-transparent border-2 border-purple-light rounded-full py-4 px-6 text-text-main text-lg placeholder-text-muted focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all"
                            />
                            <button type="submit" className="primary-button">
                                Begin Your Journey
                            </button>
                        </form>
                    </div>
                );

            case 'problem_input':
                // ... (no changes here)
                 return (
                    <div className="flex flex-col items-center gap-6 w-full max-w-2xl text-center">
                        <h2 className="title text-4xl sm:text-5xl">Welcome, {name}.</h2>
                        <p className="text-lg text-text-muted">What question weighs on your soul? Focus on your problem and ask the cards for guidance.</p>
                        <form onSubmit={handleProblemSubmit} className="w-full flex flex-col items-center gap-6 mt-4">
                            <textarea
                                value={problem}
                                onChange={(e) => setProblem(e.target.value)}
                                placeholder="e.g., How can I find more fulfillment in my career?"
                                className="w-full h-32 bg-transparent border-2 border-purple-light rounded-2xl py-4 px-6 text-text-main text-lg placeholder-text-muted focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all resize-none"
                            />
                            {error && <p className="text-red-400 mt-2">{error}</p>}
                            <button type="submit" className="primary-button">
                                Reveal My Reading
                            </button>
                        </form>
                    </div>
                );

            case 'grid_reveal':
                // Pass the new isZooming prop to the grid screen
                return <CardGridScreen 
                          allCards={allCards} 
                          selectedCards={reading?.cards || null} 
                          isLoading={isLoading} 
                          isZooming={isZooming} 
                       />;

            case 'reading':
                return reading ? <ReadingScreen reading={reading} onReset={handleReset} /> : null;
            
            default:
                return null;
        }
    };

    return (
        <main className="relative min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-8 overflow-hidden">
            {renderContent()}
        </main>
    );
};

export default App;