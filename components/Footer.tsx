import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 bg-darker-bg border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <a href="#hero" className="text-2xl font-poppins font-bold text-white flex items-center justify-center mb-4">
                        <img src="/images/kiwi-logo.webp" alt="Kiwi Orbit Logo" className="w-10 h-10 mr-2" />
                        <span>Kiwi<span className="text-orbit-accent">Orbit</span></span>
                    </a>
                    <p className="text-gray-400 mb-4 max-w-md mx-auto">Creating digital experiences that make an impact and inspire creativity.</p>
                    <div className="flex gap-4 justify-center">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 mb-4 md:mb-0">&copy; {currentYear} Kiwi Orbit. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-kiwi transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-kiwi transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
