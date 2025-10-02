import React, { forwardRef, useEffect } from 'react';
import Starfield from './Starfield';

interface SectionRefs {
    [key: string]: React.RefObject<HTMLElement>;
}

interface HeroProps {
    sections: SectionRefs;
    scrollToSection: (ref: React.RefObject<HTMLElement>) => void;
}

const Hero = forwardRef<HTMLElement, HeroProps>(({ sections, scrollToSection }, ref) => {

    useEffect(() => {
        const typingElement = document.getElementById('typing-text') as HTMLSpanElement;
        if (!typingElement) return;

        const phrases: string[] = [
            'responsive websites.', 'engaging user interfaces.', 'creative web applications.',
            'unique digital designs.', 'seamless user experiences.', 'modern landing pages.'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeoutId: number;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            let typeSpeed = 100;

            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }
            timeoutId = window.setTimeout(type, typeSpeed);
        };
        timeoutId = window.setTimeout(type, 1000);
        
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (window.innerWidth <= 768) return;

        const navItems = [
            { el: document.getElementById('nav-about'), radius: 250, speed: 0.0048, angle: 45 },
            { el: document.getElementById('nav-skills'), radius: 350, speed: -0.0040, angle: 135 },
            { el: document.getElementById('nav-web'), radius: 450, speed: 0.0032, angle: 225 },
            { el: document.getElementById('nav-contact'), radius: 550, speed: -0.0024, angle: 315 }
        ];

        let animationFrameId: number;

        const animate = () => {
            const now = Date.now();
            navItems.forEach(item => {
                if (item.el) {
                    const currentAngle = (item.angle + now * item.speed) * (Math.PI / 180);
                    const x = item.radius * Math.cos(currentAngle) - (item.el.offsetWidth / 2);
                    const y = item.radius * Math.sin(currentAngle) - (item.el.offsetHeight / 2);
                    item.el.style.transform = `translate(${x}px, ${y}px)`;
                }
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        
        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <section id="hero" ref={ref} className="min-h-screen relative overflow-hidden orbital-container">
            <Starfield />
            <div className="orbit orbit-1"></div>
            <div className="orbit orbit-2"></div>
            <div className="orbit orbit-3"></div>
            <div className="orbit orbit-4"></div>

            <div id="nav-about" className="orbital-nav-item" onClick={() => scrollToSection(sections.about)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && scrollToSection(sections.about)}>
                <i className="fas fa-user nav-icon"></i><span className="nav-text">About</span>
            </div>
            <div id="nav-skills" className="orbital-nav-item" onClick={() => scrollToSection(sections.skills)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && scrollToSection(sections.skills)}>
                <i className="fas fa-code nav-icon"></i><span className="nav-text">Skills</span>
            </div>
            <div id="nav-web" className="orbital-nav-item" onClick={() => scrollToSection(sections.web)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && scrollToSection(sections.web)}>
                <i className="fas fa-rocket nav-icon"></i><span className="nav-text">Web</span>
            </div>
            <div id="nav-contact" className="orbital-nav-item" onClick={() => scrollToSection(sections.contact)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && scrollToSection(sections.contact)}>
                <i className="fas fa-envelope nav-icon"></i><span className="nav-text">Contact</span>
            </div>

            <div className="orbital-center">
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold mb-6 hero-title">
                        <span className="text-white">Crafting Digital</span><br />
                        <span className="text-gradient-primary shine-effect">Experiences</span> <span className="text-white">That</span><br />
                        <span className="text-white">Orbit Your Success</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-300 hero-subtitle">I build <span id="typing-text" className="text-kiwi"></span></p>
                    <div className="flex flex-wrap gap-4 justify-center hero-buttons">
                        <button onClick={() => scrollToSection(sections.web)} className="primary-button">View Work</button>
                        <button onClick={() => scrollToSection(sections.contact)} className="secondary-button">Contact Me</button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
                <button onClick={() => scrollToSection(sections.about)} className="text-kiwi hover:text-kiwi-light transition-colors" aria-label="Scroll to about section">
                    <i className="fas fa-chevron-down text-2xl"></i>
                </button>
            </div>
        </section>
    );
});

export default Hero;