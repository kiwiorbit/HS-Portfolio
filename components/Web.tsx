import React, { forwardRef, useEffect } from 'react';
import { WebProject } from './WebModal';

const projectsData: WebProject[] = [
    { title: 'New Zealand Board of Imams', image: '/images/nzbi-fullpage.webp', link: 'https://dev.nzbi.nz/', thumbnail: '/images/nzbi.webp', description: 'A website for the NZBI providing guidance, moonsighting information to the Muslim community.' },
    { title: 'Educational Institute Website', image: 'https://picsum.photos/id/2/800/1600', link: 'https://khuddam.co.nz/', thumbnail: 'https://picsum.photos/id/22/600/338', description: 'An educational platform that provides linguistic tools, resources, and community building to help users connect with the Quran.' },
    { title: 'Crypto RSI Dashboard', image: 'https://picsum.photos/id/3/800/1600', link: 'https://rsipulse.vercel.app/', thumbnail: 'https://picsum.photos/id/33/600/338', description: 'A real-time cryptocurrency dashboard that tracks and displays RSI (Relative Strength Index) data for the top 100 digital assets,' },
    { title: 'E-commerce Platform', image: 'https://picsum.photos/id/4/800/1600', link: '#', thumbnail: 'https://picsum.photos/id/44/600/338', description: 'A full-featured online store with a custom CMS and payment integration.' },
    { title: 'Portfolio Template', image: 'https://picsum.photos/id/5/800/1600', link: '#', thumbnail: 'https://picsum.photos/id/54/600/338', description: 'A creative and modern portfolio template for designers and developers.' },
    { title: 'SaaS Landing Page', image: 'https://picsum.photos/id/6/800/1600', link: '#', thumbnail: 'https://picsum.photos/id/64/600/338', description: 'A high-converting landing page for a new software-as-a-service product.' },
];

interface WebProps {
    onSelectWebProject: (project: WebProject) => void;
}

const Web = forwardRef<HTMLElement, WebProps>(({ onSelectWebProject }, ref) => {

    useEffect(() => {
        const projectItems = document.querySelectorAll<HTMLElement>('.web-project-item');
        
        projectItems.forEach(item => {
            const card = item.querySelector<HTMLElement>('.web-project-card');
            if (!card) return;

            const handleMouseMove = (e: MouseEvent) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                const maxRotate = 12;
                const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * maxRotate;
                const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * maxRotate;
                
                card.style.transform = `scale(1.04) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            };
            
            const handleMouseEnter = () => {
                card.style.transition = 'transform 0.1s linear';
            };

            const handleMouseLeave = () => {
                card.style.transition = 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)';
                card.style.transform = `rotateX(0deg) rotateY(0deg)`;
            };

            item.addEventListener('mouseenter', handleMouseEnter);
            item.addEventListener('mousemove', handleMouseMove);
            item.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                item.removeEventListener('mouseenter', handleMouseEnter);
                item.removeEventListener('mousemove', handleMouseMove);
                item.removeEventListener('mouseleave', handleMouseLeave);
            };
        });
    }, []);

    return (
        <section id="web" ref={ref} className="py-20 pb-28 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 scroll-animate">
                    <h2 className="text-kiwi text-lg font-medium mb-2">MY WORK</h2>
                    <h3 className="text-3xl md:text-4xl font-poppins font-bold">Featured Web Projects</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <div
                            key={project.title}
                            className="block web-project-item cursor-pointer scroll-animate"
                            data-delay={index % 3 * 200}
                            onClick={() => onSelectWebProject(project)}
                            onKeyDown={(e) => e.key === 'Enter' && onSelectWebProject(project)}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="web-project-card h-full flex flex-col">
                                <div className="web-project-image">
                                    <img src={project.thumbnail} alt={project.title} className="w-full aspect-[16/9] object-cover rounded-t-lg" loading="lazy" />
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-poppins font-bold mb-2 text-white">{project.title}</h3>
                                    <p className="mb-4 text-gray-400 flex-grow">{project.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Web;