import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <h2 className="title text-4xl sm:text-5xl">Consulting the cosmos...</h2>
            <p className="subtitle max-w-lg mt-4 text-lg">
                The cards are being drawn for you. Please wait a moment.
            </p>
            <div className="flex justify-center gap-4 sm:gap-8 mt-12">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="card-container w-[120px] h-[180px] sm:w-[180px] sm:h-[270px]"
                        style={{ animationDelay: `${i * 150}ms` }}
                    >
                        <div className="card-flipper">
                            <div className="card-face card-back flex items-center justify-center">
                                {/* You can add an SVG or icon here */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingScreen;