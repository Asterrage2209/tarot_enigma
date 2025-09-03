import React, { useState, useEffect, useMemo } from 'react';

// --- DATA: Tarot card data extracted from your C file ---
const tarotCardsData = [
    { name: "The Fool", type: "Major Arcana", description: "He inspires courage, for he understands that every day is a chance to open up new areas in your life, and with that comes a mixture of anticipation, wonder, awe and curiosity." },
    { name: "The Magician", type: "Major Arcana", description: "Remember that you are powerful, create your inner world, and the outer will follow." },
    { name: "The High Priestess", type: "Major Arcana", description: "Her appearance in a reading can signify that it is time for you to listen to your intuition rather than prioritizing your intellect and conscious mind." },
    { name: "The Empress", type: "Major Arcana", description: "She is associated with fertility, expression, creativity and nurturing among many other aspects." },
    { name: "The Emperor", type: "Major Arcana", description: "He is a symbol of the masculine principle. The paternal figure in life that gives structure, creates rules and systems, and imparts knowledge." },
    { name: "The Hierophant", type: "Major Arcana", description: "The card suggests that it's better for you to follow social structures which are established and have their own traditions." },
    { name: "The Lovers", type: "Major Arcana", description: "The trust and the unity that they have gives each of them confidence and strength, empowering the other." },
    { name: "The Chariot", type: "Major Arcana", description: "He shows that you should pursue the plan with a structured and ordered approach." },
    { name: "Strength", type: "Major Arcana", description: "Your resilience will greatly aid you, and your fearlessness means that you should have no issues speaking your mind." },
    { name: "The Hermit", type: "Major Arcana", description: "He walks through the dark night of his unconscious, guided only by the low light of the northern star, with his destination being his home, his self." },
    { name: "The Wheel of Fortune", type: "Major Arcana", description: "The same forces that govern the changing of the seasons, or the rising and setting of the Sun is also the master of luck and the fate of individuals." },
    { name: "Justice", type: "Major Arcana", description: "If you have been wrong, this card's appearance may bring you relief. On the other hand, if your actions caused pain to others, this card serves as a warning." },
    { name: "The Hanged Man", type: "Major Arcana", description: "His card reflects a particular need to suspend certain action. As a result, this might indicate a certain period of indecision." },
    { name: "Death", type: "Major Arcana", description: "The card signals that one major phase in your life is ending, and a new one is going to start." },
    { name: "Temperance", type: "Major Arcana", description: "The card suggests moderation and balance, coupled with a lot of patience." },
    { name: "The Devil", type: "Major Arcana", description: "Addiction to substances or material pleasures can also be the reason for your feelings of powerlessness and entrapment." },
    { name: "The Tower", type: "Major Arcana", description: "The old ways are no longer useful, and you must find another set of reliefs, values and processes to take their place." },
    { name: "The Star", type: "Major Arcana", description: "To see this card is a message to have faith, for the universe will bless you and bring forth all that you need." },
    { name: "The Moon", type: "Major Arcana", description: "The moon's light can bring you clarity and understanding and you should allow your intuition to guide you through this darkness." },
    { name: "The Sun", type: "Major Arcana", description: "The card shows that you have a significant sense of deserved confidence right now." },
    { name: "Judgment", type: "Major Arcana", description: "The card indicates that you are in a period of awakening, brought on by the act of self-reflection." },
    { name: "The World", type: "Major Arcana", description: "To encounter this card in your set of cards is to encounter a great unity and wholeness." },
    { name: "Ace of Wands", type: "Suit of Wands", description: "The card calls out to you to follow your instincts. If you think that the project that you've been dreaming of is a good idea, then just go ahead and do it." },
    { name: "Two of Wands", type: "Suit of Wands", description: "The card is more mature version of the ace of wands card, meaning that this tarot card is all about planning and moving forward. In short progression." },
    { name: "Three of Wands", type: "Suit of Wands", description: "the card hints that you are creating a stable foundation for yourself." },
    { name: "Four of Wands", type: "Suit of Wands", description: "Oftentimes the card is known to reflect a period of holidays when you are together with your friends and family for an extended period of time." },
    { name: "Five of Wands", type: "Suit of Wands", description: "This tarot card encourages that you accept the competition as a way for you to improve yourself without feeling any malice towards them." },
    { name: "Six of Wands", type: "Suit of Wands", description: "The card is indication that you have managed to harness the strengths and talents that you in an attempt to bring a particularly successful outcome in your life." },
    { name: "Seven of Wands", type: "Suit of Wands", description: "The overall meaning of this card is to hold your ground, no matter what is challenging your position." },
    { name: "Eight of Wands", type: "Suit of Wands", description: "Perhaps important news will be coming on your way, and you may experience a sudden, yet steady positive growth." },
    { name: "Nine of Wands", type: "Suit of Wands", description: "The card symbolizes a life of someone who had undergone many trials, but through determination and will, they were able to overcome them." },
    { name: "Ten of Wands", type: "Suit of Wands", description: "Although it sounds marvelous and satisfying, the card depicts a lot of responsibilities on your side." },
    { name: "Page of Wands", type: "Suit of Wands", description: "When you get this card, it simple means something is within you, something that triggers you to make discoveries, indulge in investments or take the next advancement in life." },
    { name: "Knight of Wands", type: "Suit of Wands", description: "If you are starting a creative project, then you should do so with a lots of energy and enthusiasm." },
    { name: "Queen of Wands", type: "Suit of Wands", description: "She has a positive and an uplifting energy, they represent someone who is willing to be by your side and stand up for you." },
    { name: "King of Wands", type: "Suit of Wands", description: "He is a natural born leader of people, and he is also extremely capable." },
    { name: "Ace of Cups", type: "Suit of Cups", description: "The release indicated by this card may either be spiritual or emotional, depending on what you are going through." },
    { name: "Two of Cups", type: "Suit of Cups", description: "A strong pair is indicated here, the joy of two becoming one." },
    { name: "Three of Cups", type: "Suit of Cups", description: "This card is about spending quality time with people you cherish in your life." },
    { name: "Four of Cups", type: "Suit of Cups", description: "You are feeling apathetic, regardless of what happens, whether the day is good or bad, none of it matters to you." },
    { name: "Five of Cups", type: "Suit of Cups", description: "Instead of moving towards a more positive perspective, this card seems to say that you are dwelling in the past, inducing feelings of self-pity and regret." },
    { name: "Six of Cups", type: "Suit of Cups", description: "You may be seeking the comfort and warmth of people that unconditionally love you." },
    { name: "Seven of Cups", type: "Suit of Cups", description: "You will need to separate what is real and what is not so that you can make better choices." },
    { name: "Eight of Cups", type: "Suit of Cups", description: "You are coming to a realization that you must step away from what is familiar." },
    { name: "Nine of Cups", type: "Suit of Cups", description: "This card is normally associated with extreme happiness and satisfaction." },
    { name: "Ten of Cups", type: "Suit of Cups", description: "To see this card is to indicate a true emotional fulfillment, one where the lonely self-satisfaction of the Nine of Cups is shared with others to create a true sense of community and family." },
    { name: "Page of Cups", type: "Suit of Cups", description: "It symbolizes persistence as this is the only way that you can make your dreams come true." },
    { name: "Knight of Cups", type: "Suit of Cups", description: "He appears as a messenger, and with him, e carries an invitation or an arrival of something or someone which will benefit you." },
    { name: "Queen of Cups", type: "Suit of Cups", description: "This card can also represent the trusted inner voice you have within you." },
    { name: "King of Cups", type: "Suit of Cups", description: "This card represents a balance between the intellect and emotions. He indicates that there is a strong relationship between understanding and feeling." },
    { name: "Ace of Swords", type: "Suit of Swords", description: "This card indicates that one is about to experience a moment of breakthrough." },
    { name: "Two of Swords", type: "Suit of Swords", description: "We find ourselves in a situation where we must make a choice... Neither seems particularly appealing." },
    { name: "Three of Swords", type: "Suit of Swords", description: "Sometimes life gives us no choice, we're knocked down. But what determines one's future is the choice of whether to remain down, or rise again." },
    { name: "Four of Swords", type: "Suit of Swords", description: "This card represents a moment of rest. Whether this is form a choice to withdraw, or whether it is from pure exhaustion, it is not clear." },
    { name: "Five of Swords", type: "Suit of Swords", description: "What is more important to you? Mutual progress, or winning. The card actually represents ambition in way which is rather negative." },
    { name: "Six of Swords", type: "Suit of Swords", description: "Despite your sadness, you need to remember that moving on is the ideal option for your future." },
    { name: "Seven of Swords", type: "Suit of Swords", description: "There are instances when we are forced to be sneaky, hoping that we will not be discovered. When we are found out, we have to face the consequences." },
    { name: "Eight of Swords", type: "Suit of Swords", description: "Surrendering one's power to an unknown entity, whether it's fate, or God, the government or something else means that you are giving away your own personal responsibility to affect change." },
    { name: "Nine of Swords", type: "Suit of Swords", description: "Sometimes this card can be associated with trauma, one which may be shameful for you to confide with others about." },
    { name: "Ten of Swords", type: "Suit of Swords", description: "The story as it unfolds from the ace to the ten is one where an untrained individual uses this weapon for faulty reasons, makes many mistakes, and then spends an entire lifetime attempting to run away from the power that he misused." },
    { name: "Page of Swords", type: "Suit of Swords", description: "Her aptitude for language also makes her an incredible communicator, and with her love of ideas, you may find her always engaged in some passionate debate." },
    { name: "Queen of Swords", type: "Suit of Swords", description: "The card represents the importance of making judgments without relying on emotion alone. The Queen beckons you to look at all the facts before making a decision." },
    { name: "Knight of Swords", type: "Suit of Swords", description: "Once he sets forth towards his goals, there is absolutely no stopping him. He doesn't see and he doesn't care a damn about any upcoming challenges." },
    { name: "King of Swords", type: "Suit of Swords", description: "Because he rules over the suit of swords, he has a special connection to rules, laws, and diplomacy, which are systems of logical thought applied and manifest on earth." },
    { name: "Ace of Pentacles", type: "Suit of Pentacles", description: "Watering this seed has the potential to be very rewarding, for anything that is grown on this energy is meant to be stable, secure and give a good yield." },
    { name: "Two of Pentacles", type: "Suit of Pentacles", description: "For those that may have more coins to go around, they can afford to be less careful, but at this moment things may be tight." },
    { name: "Three of Pentacles", type: "Suit of Pentacles", description: "Successful projects usually require different kinds of expertise, and at this moment, this card means that all the skills required are coming together." },
    { name: "Four of Pentacles", type: "Suit of Pentacles", description: "There is a chance to turn you into an overly possessive or greedy person who wants to ensure that no one is capable of taking away your own wealth." },
    { name: "Five of Pentacles", type: "Suit of Pentacles", description: "There is a chance that you will lose something significant, whether it is financial wealth or an important item." },
    { name: "Six of Pentacles", type: "Suit of Pentacles", description: "The card can be about charity. You can either be the man giving away the money to the needy, or a beggar gratefully receiving what you need from wealthy donor." },
    { name: "Seven of Pentacles", type: "Suit of Pentacles", description: "It reaffirms you of your long term vision and helps to show that you are not confined to seeing results in the short term only." },
    { name: "Eight of Pentacles", type: "Suit of Pentacles", description: "This card refers to the efforts that you undertake. There is a possibility that there will be a lot of things that you need to address." },
    { name: "Nine of Pentacles", type: "Suit of Pentacles", description: "This card conveys not only joy, but also the feeling of security and freedom that material wealth can bring." },
    { name: "Ten of Pentacles", type: "Suit of Pentacles", description: "Your legacy is sure to stand for quite a long time to come." },
    { name: "Page of Pentacles", type: "Suit of Pentacles", description: "Guided by the pentacles, she is deeply tied to the earth, nature and all of its gift. She cherishes the body, for it too is something which is a manifestation of her element." },
    { name: "Knight of Pentacles", type: "Suit of Pentacles", description: "This knight has patience to accomplish all his given duties and is considered by others reliable and committed to his work." },
    { name: "Queen of Pentacles", type: "Suit of Pentacles", description: "Do not mistake her for being only a homebody, alongside all these motherly attributes, she can plan business ventures and execute her plans successfully." },
    { name: "King of Pentacles", type: "Suit of Pentacles", description: "He is a provider and a protector, for under his care is a flourishing and abundant kingdom where its citizens are prosperous and encouraged to grow." },
];

// --- TYPE DEFINITIONS ---
type TarotCard = {
    name: string;
    type: string;
    description: string;
};
type GameStep = 'name_input' | 'card_selection' | 'reading';

// --- HELPER FUNCTIONS ---
const shuffleDeck = (deck: TarotCard[]): TarotCard[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
    const [name, setName] = useState('');
    const [step, setStep] = useState<GameStep>('name_input');
    const [deck, setDeck] = useState<TarotCard[]>([]);
    const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);

    const initialDeck = useMemo(() => shuffleDeck(tarotCardsData), []);

    useEffect(() => {
        setDeck(initialDeck);
    }, [initialDeck]);

    const handleNameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            setStep('card_selection');
        }
    };

    const handleCardSelect = (card: TarotCard) => {
        if (selectedCards.length < 3 && !selectedCards.includes(card)) {
            setSelectedCards([...selectedCards, card]);
        }
    };
    
    useEffect(() => {
        if (selectedCards.length === 3) {
            const timer = setTimeout(() => {
                setStep('reading');
            }, 2000); // Wait for animations
            return () => clearTimeout(timer);
        }
    }, [selectedCards]);

    const handleReset = () => {
        setSelectedCards([]);
        setDeck(shuffleDeck(tarotCardsData));
        setStep('card_selection');
    };

    const APP_NAME = "Tarot Enigma";

    // --- RENDER FUNCTIONS FOR EACH STEP ---
    const renderNameInput = () => (
        <div className="name-input-container">
            <h1 className="title">Tarot Enigma</h1>
            <p className="subtitle">
                Unveil the secrets the universe holds for you.
            </p>
            <form onSubmit={handleNameSubmit} className="name-input-container">
                <div className="input-wrapper">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Please enter your name"
                        className="name-input"
                    />
                </div>
                <button type="submit" className="primary-button">
                    Begin Your Reading
                </button>
            </form>
        </div>
    );

    const renderCardSelection = () => (
        <div className="card-selection-container">
            <h2 className="title">{APP_NAME}</h2>
            <p className="subtitle">Welcome, {name}.</p>
            <p className="subtitle">The cards are shuffled. Choose three that call to you.</p>
            <div className="card-grid">
                {deck.map((card, index) => {
                    const isSelected = selectedCards.includes(card);
                    return (
                        <div
                            key={index}
                            className={'card-container' + (isSelected ? ' is-selected' : '')}
                            onClick={() => handleCardSelect(card)}
                            style={{ animationDelay: `${index * 15}ms` }}
                        >
                            <div className="card-flipper">
                                <div className="card-face card-back">
                                    <svg width="60%" height="60%" viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M42.3421 10.9231C44.5113 10.2099 45.8617 8.01844 45.1485 5.84926C44.4353 3.68007 42.2438 2.32969 40.0746 3.04287L2.34209 13.9231C0.172905 14.6363 -1.17748 16.8277 0.135702 18.9969C0.848883 21.1661 3.04033 22.5165 5.20952 21.8033L42.3421 10.9231Z" fill="url(#paint0_radial_101_2)" />
                                        <path d="M107.509 23.2312C105.158 22.1466 102.434 22.977 101.349 25.328C100.264 27.679 101.095 30.4034 103.446 31.488L121.603 39.866C123.954 40.9506 126.678 40.1202 127.763 37.7692C128.848 35.4182 128.018 32.6938 125.667 31.6092L107.509 23.2312Z" fill="url(#paint1_radial_101_2)" />
                                        <path d="M62 124C96.2416 124 124 96.2416 124 62C124 27.7584 96.2416 0 62 0C27.7584 0 0 27.7584 0 62C0 96.2416 27.7584 124 62 124ZM62 103.333C85.0217 103.333 103.333 85.0217 103.333 62C103.333 38.9783 85.0217 20.6667 62 20.6667C38.9783 20.6667 20.6667 38.9783 20.6667 62C20.6667 85.0217 38.9783 103.333 62 103.333Z" fill="url(#paint2_radial_101_2)" />
                                        <defs>
                                            <radialGradient id="paint0_radial_101_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(22.7423 12.5132) rotate(90) scale(10.0401 22.544)"><stop stopColor="#FDE047" /><stop offset="1" stopColor="#F59E0B" stopOpacity="0" /></radialGradient>
                                            <radialGradient id="paint1_radial_101_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(114.636 31.8487) rotate(90) scale(9.51651 13.7845)"><stop stopColor="#FDE047" /><stop offset="1" stopColor="#F59E0B" stopOpacity="0" /></radialGradient>
                                            <radialGradient id="paint2_radial_101_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(62 62) rotate(90) scale(62)"><stop stopColor="#FDE047" /><stop offset="1" stopColor="#F59E0B" /></radialGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="card-face card-front">
                                    <h3>{card.name}</h3>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <p className="subtitle" style={{marginTop: '2rem'}}>Selected: {selectedCards.length} / 3</p>
        </div>
    );

    const renderReading = () => (
        <div className="reading-screen">
            <div className="reading-header">
                <h2 className="title">{APP_NAME}</h2>
                <p className="subtitle">Your Tarot Enigma reading:</p>
            </div>
            <div className="reading-container">
                {selectedCards.map((card, index) => (
                    <div key={card.name} className="reading-card-display" style={{ animationDelay: `${index * 250}ms` }}>
                        <h4>{card.name}</h4>
                        <p>{card.description}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleReset} className="primary-button reset-button">
                Read Again
            </button>
        </div>
    );

    return (
        <main className="app">
            <div className="stars">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="star"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>
            {step === 'name_input' && renderNameInput()}
            {step === 'card_selection' && renderCardSelection()}
            {step === 'reading' && renderReading()}
        </main>
    );
};

export default App;

