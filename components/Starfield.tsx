import React, { useRef, useEffect } from 'react';

const Starfield: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationFrameId: number;
        
        const setup = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const STAR_LAYERS = [
            { count: 40, minRadius: 1.5, maxRadius: 2.5, speed: 0.8, twinkle: true }, // Foreground
            { count: 100, minRadius: 0.8, maxRadius: 1.5, speed: 0.5, twinkle: false }, // Midground
            { count: 400, minRadius: 0.3, maxRadius: 0.8, speed: 0.2, twinkle: false }, // Background
        ];

        const NEBULAE = [
            { x: 0.2, y: 0.3, radius: 0.4, color: 'rgba(75, 0, 130, 0.15)' }, // Indigo
            { x: 0.8, y: 0.7, radius: 0.5, color: 'rgba(0, 75, 130, 0.12)' }, // Teal
            { x: 0.5, y: 0.8, radius: 0.3, color: 'rgba(130, 0, 75, 0.15)' }, // Purple
        ];

        let stars: any[] = [];
        let comets: any[] = [];
        let rotation = 0;
        // Full rotation over ~240 seconds (4 minutes)
        const ROTATION_SPEED = (Math.PI * 2) / (240 * 60); 

        const createStars = () => {
            stars = [];
            const maxDist = Math.sqrt(width*width + height*height);
            STAR_LAYERS.forEach(layer => {
                for (let i = 0; i < layer.count; i++) {
                    stars.push({
                        dist: (Math.random() ** 2) * maxDist / 2,
                        angle: Math.random() * Math.PI * 2,
                        radius: Math.random() * (layer.maxRadius - layer.minRadius) + layer.minRadius,
                        alpha: Math.random() * 0.4 + 0.2, // Reduced opacity from 0.5-1.0 to 0.2-0.6
                        twinkle: layer.twinkle,
                        twinkleSpeed: Math.random() * 0.02,
                        twinklePhase: Math.random() * Math.PI * 2,
                        speedMultiplier: layer.speed,
                    });
                }
            });
        };

        const createComets = () => {
            // Keep a max of 1 comet on screen, and spawn it occasionally
            if (comets.length < 1 && Math.random() > 0.97) {
                comets.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5 + 0.5,
                    speed: Math.random() * 0.8 + 0.3,
                    angle: Math.random() * Math.PI * 2,
                    length: Math.random() * 60 + 30,
                    alpha: 1,
                });
            }
        };

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            rotation += ROTATION_SPEED;
            
            // Draw Nebulae
            NEBULAE.forEach(nebula => {
                const centerX = nebula.x * width;
                const centerY = nebula.y * height;
                const radius = nebula.radius * Math.min(width, height);
                const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
                gradient.addColorStop(0, nebula.color);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            });

            // Draw Stars
            const centerX = width / 2;
            const centerY = height / 2;
            stars.forEach(star => {
                const currentAngle = star.angle + rotation * star.speedMultiplier;
                const x = centerX + Math.cos(currentAngle) * star.dist;
                const y = centerY + Math.sin(currentAngle) * star.dist;

                let alpha = star.alpha;
                if (star.twinkle) {
                    alpha *= (Math.sin(star.twinklePhase + Date.now() * 0.001 * star.twinkleSpeed) * 0.4 + 0.6);
                }

                if (x > 0 && x < width && y > 0 && y < height) {
                    ctx.fillStyle = `rgba(222, 226, 230, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(x, y, star.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // Draw and update comets
            createComets();
            comets.forEach((comet, index) => {
                const tailX = comet.x - comet.length * Math.cos(comet.angle);
                const tailY = comet.y - comet.length * Math.sin(comet.angle);

                const gradient = ctx.createLinearGradient(comet.x, comet.y, tailX, tailY);
                gradient.addColorStop(0, `rgba(213, 183, 112, ${comet.alpha})`);
                gradient.addColorStop(1, 'rgba(213, 183, 112, 0)');

                ctx.strokeStyle = gradient;
                ctx.lineWidth = comet.radius;
                ctx.beginPath();
                ctx.moveTo(comet.x, comet.y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();

                comet.x += Math.cos(comet.angle) * comet.speed;
                comet.y += Math.sin(comet.angle) * comet.speed;
                comet.alpha -= 0.008;

                if (comet.alpha <= 0) {
                    comets.splice(index, 1);
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            setup();
            createStars();
        };
        
        setup();
        createStars();
        draw();
        
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} id="starfield-canvas" />;
};

export default Starfield;