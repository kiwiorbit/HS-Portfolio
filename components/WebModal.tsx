import React, { useRef, useState, useEffect } from 'react';

// This interface defines the structure for a single web project's data.
export interface WebProject {
    title: string;
    image: string; // This will be the long, scrollable image
    link: string;
    thumbnail: string;
    description: string;
}

interface WebModalProps {
    webProject: WebProject;
    onClose: () => void;
}

// This is a reusable React component for displaying a web project in a modal.
const WebModal: React.FC<WebModalProps> = ({ webProject, onClose }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // Trigger the fade-in animation shortly after the component mounts
        const timer = setTimeout(() => {
            setIsActive(true);
        }, 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsActive(false);
        // Wait for the animation to finish before calling the parent's onClose
        setTimeout(() => {
            onClose();
        }, 300); // This duration must match the CSS transition duration
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current) {
            handleClose();
        }
    };

    return (
        <div
            id="web-modal"
            className={`modal fixed inset-0 z-[100] flex items-center justify-center ${isActive ? 'modal-active' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm modal-overlay"
                onClick={handleOverlayClick}
            ></div>
            <div className="relative w-full max-w-6xl mx-auto my-8 p-4 bg-transparent rounded-lg shadow-2xl modal-container">
                 <button
                    aria-label="Close project details"
                    className="modal-close absolute -top-2 -right-2 md:top-4 md:right-4 text-white bg-dark-bg rounded-full h-10 w-10 flex items-center justify-center hover:bg-kiwi hover:text-darker-bg transition-colors z-10"
                    onClick={handleClose}
                >
                    <i className="fas fa-times text-2xl"></i>
                </button>
                <div className="vertical-slide-container h-[80vh] w-full">
                    <div className="vertical-slide-wrapper">
                        {/* Duplicate the image to create a seamless loop */}
                        <img src={webProject.image} alt={`${webProject.title} screenshot`} />
                        <img src={webProject.image} alt={`${webProject.title} screenshot`} />
                    </div>
                </div>
                 <div className="mt-6 text-center">
                    <a href={webProject.link} target="_blank" rel="noopener noreferrer" className="primary-button inline-flex items-center">
                        <i className="fas fa-external-link-alt mr-2"></i> View Project
                    </a>
                </div>
            </div>
        </div>
    );
};

export default WebModal;