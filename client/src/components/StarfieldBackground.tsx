import React, { useRef, useEffect } from 'react';

const StarfieldBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const stars: { x: number, y: number, radius: number, alpha: number, velocity: number }[] = [];
        const numStars = 400; 

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.2 + 0.5,
                alpha: Math.random(),
                velocity: Math.random() * 0.1 + 0.05,
            });
        }

        const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);
        
        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Base parallax offset
            const baseParallaxX = (mouse.x - canvas.width / 2) * -0.01;
            const baseParallaxY = (mouse.y - canvas.height / 2) * -0.01;

            stars.forEach(star => {
                // Twinkling effect
                star.alpha += star.velocity;
                if (star.alpha >= 1 || star.alpha <= 0) {
                    star.velocity = -star.velocity;
                }

                const starParallaxX = baseParallaxX * star.radius;
                const starParallaxY = baseParallaxY * star.radius;

                ctx.beginPath();
                ctx.arc(star.x + starParallaxX, star.y + starParallaxY, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };
        
        draw();
        
        const handleResize = () => {
             if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} id="starfield-canvas" />;
};

export default StarfieldBackground;