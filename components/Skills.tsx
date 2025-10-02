import React, { forwardRef, useEffect } from 'react';

const Skills = forwardRef<HTMLElement>((props, ref) => {
    
    useEffect(() => {
        const cards = document.querySelectorAll<HTMLElement>('.skill-card');
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
        <section id="skills" ref={ref} className="py-20 relative bg-darker-bg">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 scroll-animate">
                    <h2 className="text-kiwi text-lg font-medium mb-2">MY EXPERTISE</h2>
                    <h3 className="text-3xl md:text-4xl font-poppins font-bold">Skills & Technologies</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Development Stack */}
                    <div className="skill-card scroll-animate">
                        <div className="skill-header-new">
                            <i className="fas fa-laptop-code text-kiwi text-3xl"></i>
                            <h4 className="text-xl font-bold text-white">Development Stack</h4>
                        </div>
                        <ul className="skill-list-new">
                            <li><i className="fab fa-js-square text-yellow-400"></i> TypeScript & JavaScript</li>
                            <li><i className="fab fa-react text-blue-400"></i> React & Next.js</li>
                            <li><i className="fab fa-node-js text-green-400"></i> Node.js</li>
                            <li><i className="fas fa-bold text-purple-400"></i> Tailwind CSS & jQuery</li>
                            <li><i className="fab fa-html5 text-orange-500"></i> HTML5 & CSS3</li>
                            <li><i className="fab fa-github text-white"></i> GitHub & Vercel</li>
                        </ul>
                    </div>

                    {/* Design & AI Toolkit */}
                    <div className="skill-card scroll-animate" data-delay="200">
                        <div className="skill-header-new">
                            <i className="fas fa-palette text-kiwi text-3xl"></i>
                            <h4 className="text-xl font-bold text-white">Design & AI Toolkit</h4>
                        </div>
                        <ul className="skill-list-new">
                            <li><i className="fab fa-figma text-pink-500"></i> Figma & Canva</li>
                            <li><i className="fas fa-pencil-ruler text-indigo-400"></i> UI/UX Design</li>
                            <li><i className="fas fa-camera-retro text-teal-400"></i> Photography & Photoshop</li>
                            <li><i className="fas fa-video text-red-500"></i> DaVinci Resolve & CapCut</li>
                            <li><i className="fas fa-robot text-cyan-400"></i> ChatGPT & DALL-E</li>
                            <li><i className="fas fa-brain text-purple-400"></i> Google Colab & M365 Copilot</li>
                        </ul>
                    </div>

                    {/* Business Acumen */}
                    <div className="skill-card scroll-animate" data-delay="400">
                        <div className="skill-header-new">
                            <i className="fas fa-briefcase text-kiwi text-3xl"></i>
                            <h4 className="text-xl font-bold text-white">Business Acumen</h4>
                        </div>
                        <ul className="skill-list-new">
                            <li><i className="fas fa-store text-green-400"></i> E-commerce Management</li>
                            <li><i className="fas fa-boxes text-yellow-500"></i> Stock Management</li>
                            <li><i className="fas fa-cash-register text-blue-400"></i> Retail Administration</li>
                            <li><i className="fas fa-users text-red-400"></i> Leadership</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Skills;
