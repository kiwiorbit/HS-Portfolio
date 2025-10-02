import React, { useEffect, useRef, useState } from 'react';

export interface AppData {
    title: string;
    link: string;
    images: string[];
}

interface AppModalProps {
    app: AppData;
    onClose: () => void;
}

const AppModal: React.FC<AppModalProps> = ({ app, onClose }) => {
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
    
    // Create a seamless loop for the slideshow
    const slideshowImages = [...app.images, ...app.images];

    // Calculate a dynamic animation duration to keep the speed consistent

    // e.g., 2 seconds per image

    const animationDuration = app.images.length * 1.5;
    
    return (
        <div 
            className={`modal fixed inset-0 z-[100] flex items-center justify-center ${isActive ? 'modal-active' : ''}`}
            role="dialog" 
            aria-modal="true"
        >
            <div 
                ref={overlayRef}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm modal-overlay"
                onClick={handleOverlayClick}
            ></div>
            <div className="relative w-full max-w-6xl mx-auto my-8 p-4 bg-transparent rounded-lg shadow-2xl modal-container">
                <button 
                    aria-label="Close app details" 
                    className="modal-close absolute -top-2 -right-2 md:top-4 md:right-4 text-white bg-dark-bg rounded-full h-10 w-10 flex items-center justify-center hover:bg-kiwi hover:text-darker-bg transition-colors z-10"
                    onClick={handleClose}
                >
                    <i className="fas fa-times text-2xl"></i>
                </button>
                <div className="modal-content-wrapper h-[70vh] md:h-[80vh] flex flex-col items-center justify-center">
                    <div className="slideshow-container h-full w-full">
                        <div className="slideshow-wrapper h-full"

                            style={{ '--slide-duration': `${animationDuration}s` } as React.CSSProperties}

                        >
                            {slideshowImages.map((image, index) => (
                                <img key={index} src={image} alt={`${app.title} screenshot ${index + 1}`} />
                            ))}
                        </div>
                    </div>
                    <div className="mt-6">
                        <a href={app.link} target="_blank" rel="noopener noreferrer" className="primary-button inline-flex items-center">
                            <i className="fas fa-external-link-alt mr-2"></i> View App
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppModal;