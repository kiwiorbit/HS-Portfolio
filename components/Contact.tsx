import React, { useState, forwardRef, FormEvent, useEffect, ChangeEvent, FocusEvent } from 'react';

const Contact = forwardRef<HTMLElement>((props, ref) => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    
    // Google Form Details from pre-filled link
    const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScbxxnQ_tbZuYrMEoU8LKGZHZE7u194BnD9haRz8-K6d9irUg/formResponse';
    const NAME_ID = 'entry.502193778';
    const EMAIL_ID = 'entry.651857650';
    const SUBJECT_ID = 'entry.826248207';
    const MESSAGE_ID = 'entry.612391056';

    const validate = () => {
        const newErrors: { [key: string]: string | null } = {};
        if (!formData.name) newErrors.name = 'Name is required.';
        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formData.subject) newErrors.subject = 'Subject is required.';
        if (!formData.message) newErrors.message = 'Message is required.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Re-validate on every change for real-time feedback
    useEffect(() => {
        validate();
    }, [formData]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-kiwi' : 'bg-danger';
        const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        const textColor = type === 'success' ? 'text-darker-bg' : 'text-white';
        notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-2xl z-[200] ${bgColor} ${textColor} transform translate-y-full opacity-0 transition-all duration-500 ease-in-out`;
        notification.innerHTML = `<div class="flex items-center"><i class="fas ${iconClass} mr-3 text-xl"></i><p class="font-medium">${message}</p></div>`;
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.remove('translate-y-full', 'opacity-0'), 10);
        setTimeout(() => {
            notification.classList.add('opacity-0', 'translate-y-full');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTouched({ name: true, email: true, subject: true, message: true });
        
        if (!validate()) {
            showNotification('Please fill in all fields correctly.', 'error');
            return;
        }

        setStatus('sending');
        const googleFormData = new FormData();
        googleFormData.append(NAME_ID, formData.name);
        googleFormData.append(EMAIL_ID, formData.email);
        googleFormData.append(SUBJECT_ID, formData.subject);
        googleFormData.append(MESSAGE_ID, formData.message);

        try {
            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: 'POST',
                body: googleFormData,
                mode: 'no-cors',
            });
            showNotification('Message sent successfully! Thank you.');
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTouched({});
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('An error occurred. Please try again.', 'error');
            setStatus('error');
        }
    };

    return (
        <section id="contact" ref={ref} className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 scroll-animate">
                    <h2 className="text-kiwi text-lg font-medium mb-2">GET IN TOUCH</h2>
                    <h3 className="text-3xl md:text-4xl font-poppins font-bold">Let's Work Together</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="contact-card p-8 rounded-lg contact-animate-left">
                         <h4 className="text-2xl font-poppins font-bold mb-6">Contact Information</h4>
                        <p className="text-gray-400 mb-8">Interested in collaborating on a project? Have questions about my work or skills? Feel free to reach out and I'll get back to you as soon as possible.</p>
                        <div className="space-y-6">
                            <div className="flex items-center">
                                <div className="bg-kiwi/10 p-3 rounded-lg mr-4 feature-icon-container"><i className="fas fa-envelope text-kiwi"></i></div>
                                <div>
                                    <h5 className="font-poppins font-bold mb-1">Email</h5>
                                    <a href="mailto:kiwiorbitdev@outlook.com" className="text-gray-400 hover:text-kiwi transition-colors">kiwiorbitdev@outlook.com</a>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-orbit-accent/10 p-3 rounded-lg mr-4 feature-icon-container"><i className="fas fa-phone-alt text-orbit-accent"></i></div>
                                <div>
                                    <h5 className="font-poppins font-bold mb-1">Phone</h5>
                                    <a href="tel:+6401234567" className="text-gray-400 hover:text-orbit-accent transition-colors">+64 01 234 567</a>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-kiwi/10 p-3 rounded-lg mr-4 feature-icon-container"><i className="fas fa-map-marker-alt text-kiwi"></i></div>
                                <div>
                                    <h5 className="font-poppins font-bold mb-1">Location</h5>
                                    <p className="text-gray-400">Auckland, New Zealand</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h5 className="font-poppins font-bold mb-4">Connect With Me</h5>
                            <div className="flex gap-4">
                               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub"><i className="fab fa-github"></i></a>
                               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form-container p-8 rounded-lg transition-all duration-300 contact-animate-right">
                        <h4 className="text-2xl font-poppins font-bold mb-6">Send Me a Message</h4>
                        <form id="contact-form" className="space-y-6" onSubmit={handleSubmit} noValidate>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-group">
                                    <label htmlFor="name" className="block mb-2 text-white font-medium">Name</label>
                                    <div className="relative">
                                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} className={`form-input ${touched.name && errors.name ? 'border-danger' : ''}`} placeholder="Your name" required />
                                        {touched.name && !errors.name && formData.name && <div className="validation-icon"><i className="fas fa-check-circle text-green-500"></i></div>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="block mb-2 text-white font-medium">Email</label>
                                    <div className="relative">
                                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={`form-input ${touched.email && errors.email ? 'border-danger' : ''}`} placeholder="Your email" required />
                                        {touched.email && !errors.email && formData.email && <div className="validation-icon"><i className="fas fa-check-circle text-green-500"></i></div>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject" className="block mb-2 text-white font-medium">Subject</label>
                                <div className="relative">
                                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} onBlur={handleBlur} className={`form-input ${touched.subject && errors.subject ? 'border-danger' : ''}`} placeholder="Subject" required />
                                    {touched.subject && !errors.subject && formData.subject && <div className="validation-icon"><i className="fas fa-check-circle text-green-500"></i></div>}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message" className="block mb-2 text-white font-medium">Message</label>
                                <div className="relative">
                                    <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} onBlur={handleBlur} className={`form-input ${touched.message && errors.message ? 'border-danger' : ''}`} placeholder="Your message" required></textarea>
                                    {touched.message && !errors.message && formData.message && <div className="validation-icon"><i className="fas fa-check-circle text-green-500"></i></div>}
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="primary-button w-full" id="contact-submit-button" disabled={status === 'sending'}>
                                    {status === 'sending' && <i className="fas fa-spinner fa-spin mr-2"></i>}
                                    {status !== 'sending' && <i className="fas fa-paper-plane mr-2"></i>}
                                    <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Contact;