import React, { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';

interface SectionRefs {
    [key: string]: React.RefObject<HTMLElement>;
}

interface NavbarProps {
    sections: SectionRefs;
    scrollToSection: (ref: React.RefObject<HTMLElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sections, scrollToSection }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroSection = sections.hero.current;
            if (heroSection) {
                const heroHeight = heroSection.offsetHeight;
                setIsScrolled(window.scrollY > heroHeight - 80);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections.hero]);
    
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('mobile-menu-open');
        } else {
            document.body.classList.remove('mobile-menu-open');
        }
    }, [isMobileMenuOpen]);

    const handleLinkClick = (ref: React.RefObject<HTMLElement>) => {
        scrollToSection(ref);
        setIsMobileMenuOpen(false);
    };
    
    const navClass = isScrolled ? 'navbar-scrolled' : 'navbar-transparent';

    return (
        <>
            <nav id="main-navbar" className={`fixed w-full z-50 transition-all duration-500 ${navClass}`}>
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection(sections.hero); }} className="text-2xl font-poppins font-bold text-white flex items-center">
                            <img src="/images/kiwi-logo.webp" alt="Kiwi Orbit Logo" className="w-10 h-10 mr-2" />
                            <span>Kiwi<span className="text-gradient-primary">Orbit</span></span>
                        </a>
                        <div className="hidden md:flex space-x-8 nav-links">
                            <button onClick={() => handleLinkClick(sections.about)} className="nav-link">About</button>
                            <button onClick={() => handleLinkClick(sections.skills)} className="nav-link">Skills</button>
                            <button onClick={() => handleLinkClick(sections.web)} className="nav-link">Web</button>
                            <button onClick={() => handleLinkClick(sections.apps)} className="nav-link">Apps</button>
                            <button onClick={() => handleLinkClick(sections.contact)} className="nav-link">Contact</button>
                        </div>
                        <button 
                            id="mobile-menu-button" 
                            className="md:hidden z-50" 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <div className={`hamburger-icon ${isMobileMenuOpen ? 'open' : ''}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                    </div>
                </div>
            </nav>
            <MobileMenu isOpen={isMobileMenuOpen} sections={sections} onLinkClick={handleLinkClick} />
        </>
    );
};

export default Navbar;