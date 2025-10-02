import React from 'react';

interface SectionRefs {
    [key: string]: React.RefObject<HTMLElement>;
}

interface MobileMenuProps {
    isOpen: boolean;
    sections: SectionRefs;
    onLinkClick: (ref: React.RefObject<HTMLElement>) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, sections, onLinkClick }) => {
    const navLinks = [
        { label: 'About', ref: sections.about },
        { label: 'Skills', ref: sections.skills },
        { label: 'Web', ref: sections.web },
        { label: 'Apps', ref: sections.apps },
        { label: 'Contact', ref: sections.contact },
    ];

    return (
        <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}>
            <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center space-y-8 text-center">
                {navLinks.map((link) => (
                    <button
                        key={link.label}
                        onClick={() => onLinkClick(link.ref)}
                        className="mobile-nav-link text-3xl font-bold text-gray-300 hover:text-kiwi transition-colors"
                    >
                        {link.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MobileMenu;
