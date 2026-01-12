import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    const { language } = useLanguage();
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        loadContent();
    }, [language]);

    const loadContent = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/content/contact?lang=${language}`);
            setContent(response.data);
        } catch (error) {
            console.error('İçerik yüklenemedi:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/content/contact/submit', formData);
            alert(language === 'tr' ? 'Mesajınız gönderildi!' : 'Your message has been sent!');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            alert(language === 'tr' ? 'Bir hata oluştu!' : 'An error occurred!');
        }
    };

    if (loading || !content) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500">{language === 'tr' ? 'Yükleniyor...' : 'Loading...'}</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-20">
                {/* Compact Professional Header */}
                <section
                    className="text-white relative flex items-center"
                    style={{
                        background: 'linear-gradient(to right, #0051ba, #003d99)',
                        paddingTop: '100px',
                        paddingBottom: '60px'
                    }}
                >
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-3xl font-bold">{content.pageTitle}</h1>
                            <nav className="flex items-center gap-2 text-sm opacity-80">
                                <Link to="/" className="hover:opacity-100">
                                    {language === 'tr' ? 'Anasayfa' : 'Home'}
                                </Link>
                                <span>/</span>
                                <span>{content.breadcrumb}</span>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="bg-white py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <iframe
                                src={content.mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                            {/* Left Side: Contact Form - 8 columns */}
                            <div className="lg:col-span-8">
                                <div className="bg-white rounded-xl shadow-sm p-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{content.sendMessageTitle}</h2>
                                    <p className="text-gray-600 mb-8">
                                        {content.sendMessageDesc}
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {content.formNameLabel}
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                placeholder={content.formNameLabel}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {content.formEmailLabel}
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                placeholder={content.formEmailLabel}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {content.formSubjectLabel}
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                placeholder={content.formSubjectLabel}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {content.formMessageLabel}
                                            </label>
                                            <textarea
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                rows={6}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                                placeholder={content.formMessageLabel}
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                                            style={{ backgroundColor: '#0051ba' }}
                                        >
                                            {content.formButton}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Right Side: Contact Info - 4 columns */}
                            <div className="lg:col-span-4 space-y-6">
                                {/* Contact Information Card */}
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6">{content.contactInfoTitle}</h3>

                                    <div className="space-y-5">
                                        {/* Address */}
                                        <div>
                                            <h4 className="text-xs font-semibold text-gray-500 mb-1">{content.addressLabel}</h4>
                                            <p className="text-gray-800 text-sm">{content.addressValue}</p>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <h4 className="text-xs font-semibold text-gray-500 mb-1">{content.phoneLabel}</h4>
                                            <p className="text-gray-800 text-sm font-medium">{content.phoneValue}</p>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <h4 className="text-xs font-semibold text-gray-500 mb-1">{content.emailLabel}</h4>
                                            <p className="text-gray-800 text-sm font-medium break-all">{content.emailValue}</p>
                                        </div>

                                        {/* Working Hours */}
                                        <div>
                                            <h4 className="text-xs font-semibold text-gray-500 mb-1">{content.workingHoursLabel}</h4>
                                            <p className="text-gray-800 text-sm">{content.workingHoursValue}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* WhatsApp Support Card */}
                                <div className="rounded-xl shadow-sm p-6 text-white" style={{ backgroundColor: '#4DB848' }}>
                                    <h4 className="text-lg font-bold mb-2">{content.quickSupportTitle}</h4>
                                    <p className="text-white/90 text-sm mb-5">
                                        {content.quickSupportDesc}
                                    </p>
                                    <a
                                        href={`https://wa.me/${content.whatsappNumber?.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 bg-white text-green-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm"
                                    >
                                        <i className="fab fa-whatsapp text-lg"></i>
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
