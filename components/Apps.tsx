import React, { forwardRef, useEffect } from 'react';
import { AppData } from './AppModal';

const appsData: AppData[] = [
    { title: 'Rebloom', link: 'https://rebloom.vercel.app/', images: ['/images/rebloom-1.webp', '/images/rebloom-2.webp', '/images/rebloom-3.webp', '/images/rebloom-4.webp']},
    { title: 'Crypto RSI Scanner', link: 'https://rsiscanv8.vercel.app/', images: ['/images/crysi-1.webp','/images/crysi-2.webp','/images/crysi-3.webp','/images/crysi-4.webp','/images/crysi-5.webp','/images/crysi-6.webp','/images/crysi-7.webp','/images/crysi-8.webp','/images/crysi-9.webp','/images/crysi-10.webp','/images/crysi-11.webp','/images/crysi-12.webp','/images/crysi-13.webp','/images/crysi-14.webp','/images/crysi-15.webp','/images/crysi-16.webp','/images/crysi-17.webp','/images/crysi-18.webp']},
    { title: 'Mood Garden', link: 'https://moodgarden-v5.vercel.app/', images: ['/images/mg-1.webp','/images/mg-2.webp','/images/mg-3.webp','/images/mg-4.webp','/images/mg-5.webp','/images/mg-6.webp','/images/mg-7.webp']},
    { title: 'ConnectSphere', link: '#', images: ['https://picsum.photos/id/10/400/800', 'https://picsum.photos/id/12/400/800', 'https://picsum.photos/id/13/400/800', 'https://picsum.photos/id/14/400/800']},
    { title: 'FitFlow', link: '#', images: ['https://picsum.photos/id/1060/400/800', 'https://picsum.photos/id/1062/400/800', 'https://picsum.photos/id/1063/400/800', 'https://picsum.photos/id/1064/400/800']},
    { title: 'MindGarden', link: '#', images: ['https://picsum.photos/id/15/400/800', 'https://picsum.photos/id/16/400/800', 'https://picsum.photos/id/17/400/800', 'https://picsum.photos/id/18/400/800']},
];

const appDescriptions: { [key: string]: string } = {
    'Rebloom': 'Rebloom is a Feature-rich, responsive React SPA, designed as a Gentle 30-day wellness guide for postpartum recovery for Women folks, ',
    'Crypto RSI Scanner': 'An Advanced Market Scanner, Monitors using multiple indicators, Features powerful alert bot, charting modal, drawing tools, Volume Profiling to catch every opportunity.',
    'Mood Garden': 'An interactive wellness app that gamifies mood tracking, letting users grow a beautiful virtual garden through engaging mini-games.',
    'ConnectSphere': 'A decentralized social platform that puts you in control.',
    'FitFlow': 'AI-powered personal fitness coach and workout planner.',
    'MindGarden': 'A calming space for meditation and mindfulness.',
};

interface AppsProps {
    onSelectApp: (app: AppData) => void;
}

const Apps = forwardRef<HTMLElement, AppsProps>(({ onSelectApp }, ref) => {

    useEffect(() => {
        const cards = document.querySelectorAll<HTMLElement>('.app-card');
        cards.forEach(card => {
            const handleMouseMove = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            };
            card.addEventListener('mousemove', handleMouseMove);
            return () => card.removeEventListener('mousemove', handleMouseMove);
        });
    }, []);

    return (
        <section id="apps" ref={ref} className="py-20 relative bg-darker-bg">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 scroll-animate">
                    <h2 className="text-kiwi text-lg font-medium mb-2">MY MOBILE CREATIONS</h2>
                    <h3 className="text-3xl md:text-4xl font-poppins font-bold">From Concept to App Store</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {appsData.map((app, index) => (
                        <div 
                            key={app.title} 
                            className="app-card scroll-animate"
                            data-delay={index % 3 * 200}
                            onClick={() => onSelectApp(app)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && onSelectApp(app)}
                        >
                            <div className="phone-mockup">
                                <div className="phone-screen">
                                    <img src={app.images[0].replace('/400/800', '/280/580')} alt={`${app.title} App`} loading="lazy" />
                                </div>
                            </div>
                            <div className="app-info">
                                <h4 className="text-xl font-bold mb-2">{app.title}</h4>
                                <p className="text-gray-400">{appDescriptions[app.title]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Apps;