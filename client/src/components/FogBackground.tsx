import React, { useMemo } from 'react';

interface FogPatch {
  id: number;
  style: React.CSSProperties;
  className: string;
}

const FogBackground: React.FC = () => {
  const fogPatches = useMemo(() => {
    const patches: FogPatch[] = [];
    const numPatches = 20;

    for (let i = 0; i < numPatches; i++) {
      const size = Math.random() * 400 + 200;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 30 + 25; 
      const animationDelay = Math.random() * -55;
      const opacity = Math.random() * 0.15 + 0.05;
      const animationClass = `fog-drift-${Math.ceil(Math.random() * 3)}`;

      patches.push({
        id: i,
        className: `fog-patch ${animationClass}`,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDelay}s`,
          opacity: opacity,
        },
      });
    }
    return patches;
  }, []);

  return (
    <div className="fog-container">
      {fogPatches.map(patch => (
        <div key={patch.id} className={patch.className} style={patch.style} />
      ))}
    </div>
  );
};

export default FogBackground;