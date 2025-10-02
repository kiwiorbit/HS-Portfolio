import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Web from './components/Web';
import Apps from './components/Apps';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WebModal from './components/WebModal';
import AppModal from './components/AppModal';
import { WebProject } from './components/WebModal';
import { AppData } from './components/AppModal';

const App: React.FC = () => {
    const [selectedWebProject, setSelectedWebProject] = useState<WebProject | null>(null);
    const [selectedApp, setSelectedApp] = useState<AppData | null>(null);

    const sections = {
        hero: useRef<HTMLElement>(null),
        about: useRef<HTMLElement>(null),
        skills: useRef<HTMLElement>(null),
        web: useRef<HTMLElement>(null),
        apps: useRef<HTMLElement>(null),
        contact: useRef<HTMLElement>(null),
    };

    const handleSelectWebProject = useCallback((project: WebProject) => {
        setSelectedWebProject(project);
        document.body.classList.add('modal-open');
    }, []);

    const handleSelectApp = useCallback((app: AppData) => {
        setSelectedApp(app);
        document.body.classList.add('modal-open');
    }, []);

    const closeModal = useCallback(() => {
        setSelectedWebProject(null);
        setSelectedApp(null);
        document.body.classList.remove('modal-open');
    }, []);

    const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
        if (sectionRef.current) {
            window.scrollTo({
                top: sectionRef.current.offsetTop - 70, // Offset for fixed navbar
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const animatedElements = document.querySelectorAll('.scroll-animate, .about-animate-image, .about-animate-text, .contact-animate-left, .contact-animate-right');
        if (!animatedElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const target = entry.target as HTMLElement;
                const isStaggeredContainer = target.classList.contains('about-animate-text') || target.classList.contains('contact-animate-left') || target.classList.contains('contact-animate-right');

                if (entry.isIntersecting) {
                    target.classList.add('in-view');
                    if (isStaggeredContainer) {
                        Array.from(target.children).forEach(child => {
                            child.classList.add('in-view-child');
                        });
                    }
                } else {
                    target.classList.remove('in-view');
                     if (isStaggeredContainer) {
                        Array.from(target.children).forEach(child => {
                            child.classList.remove('in-view-child');
                        });
                    }
                }
            });
        }, { threshold: 0.25 });

        animatedElements.forEach(el => observer.observe(el));

        return () => {
            animatedElements.forEach(el => observer.unobserve(el));
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && (selectedWebProject || selectedApp)) {
                closeModal();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedWebProject, selectedApp, closeModal]);


    return (
        <>
            {/* Aurora Background */}
            <div className="aurora-background">
                <div className="aurora-dot"></div>
                <div className="aurora-dot"></div>
                <div className="aurora-dot"></div>
                <div className="aurora-dot"></div>
            </div>
            
            <Navbar sections={sections} scrollToSection={scrollToSection} />

            <main>
                <Hero ref={sections.hero} sections={sections} scrollToSection={scrollToSection} />
                <About ref={sections.about} />
                <Skills ref={sections.skills} />
                <Web ref={sections.web} onSelectWebProject={handleSelectWebProject} />
                <Apps ref={sections.apps} onSelectApp={handleSelectApp} />
                <Contact ref={sections.contact} />
            </main>

            <Footer />
            
            {selectedWebProject && <WebModal webProject={selectedWebProject} onClose={closeModal} />}
            {selectedApp && <AppModal app={selectedApp} onClose={closeModal} />}
        </>
    );
};

export default App;