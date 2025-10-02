import React, { forwardRef } from 'react';

const About = forwardRef<HTMLElement>((props, ref) => {
    return (
        <section id="about" ref={ref} className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-2/5 about-animate-image">
                        <div className="relative">
                            <img src="/images/myphoto.webp" alt="Profile" className="rounded-lg shadow-xl relative z-10" loading="lazy" />
                            <div className="absolute -bottom-3 -left-3 h-24 w-24 bg-orbit-accent rounded-lg z-0"></div>
                            <div className="absolute -top-3 -right-3 h-24 w-24 bg-kiwi rounded-lg z-0"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-3/5 about-animate-text">
                        <div className="mb-6">
                            <h2 className="text-kiwi text-lg font-medium mb-2">ABOUT ME</h2>
                            <h3 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Turning Ideas Into <span className="text-orbit-accent">Digital Reality</span></h3>
                        </div>
                        <p className="text-lg text-gray-300 mb-6">Hey there! I'm Hussain Shah, passionate web developer and digital creator from Auckland, New Zealand, with over 5 years of experience in e-commerce management and web development. I specialise in creating modern, responsive websites that blend creativity with functionality, from landing pages to comprehensive business platforms.</p>
                        <p className="text-lg text-gray-300 mb-6">I'm all about clean code, intuitive user experiences, and leveraging modern technologies like AI tools and AI Agents to enhance productivity and implementing best practices. Whether it's building responsive web applications or designing compelling visuals I bring a unique blend of technical expertise and creative vision to every project.</p>
                        <div className="flex flex-wrap gap-4 mt-6">
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
                </div>
            </div>
        </section>
    );
});

export default About;
