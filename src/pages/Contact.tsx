import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../api-config';

function deepMerge(defaults: any, override: any): any {
    if (override === null || override === undefined) return defaults;
    if (Array.isArray(defaults)) return Array.isArray(override) && override.length > 0 ? override : defaults;
    if (typeof override === 'string') return override !== '' ? override : (defaults ?? override);
    if (typeof override !== 'object' || typeof defaults !== 'object') return override ?? defaults;
    const result = { ...defaults };
    for (const key of Object.keys(override)) {
        if (override[key] !== null && override[key] !== undefined) {
            result[key] = deepMerge(defaults[key], override[key]);
        }
    }
    return result;
}

const DEFAULT_CONTENT = {
    pageTitle: 'İletişim', breadcrumb: 'İletişim',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.294717533184!2d32.82214850442983!3d39.76911265077443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d345e33d97fc47%3A0xd4b2a2f7ce3c8e2b!2sAdorel!5e1!3m2!1sen!2str!4v1774722441289!5m2!1sen!2str',
    sendMessageTitle: 'Bize mesaj gönderin',
    sendMessageDesc: 'Aşağıdaki formu doldurarak bizimle hızlıca iletişime geçebilirsiniz.',
    formNameLabel: 'Adınız soyadınız', formEmailLabel: 'E-posta adresiniz',
    formSubjectLabel: 'Konu', formMessageLabel: 'Mesajınız', formButton: 'Gönder',
    contactInfoTitle: 'İletişim bilgileri',
    companyName: 'AdorelGo Global Operasyon Merkezi',
    companyFullName: 'ADOREL LOJİSTİK KARGO TELEKOMÜNİKASYON BİLİŞİM YAZILIM İÇ VE DIŞ TİCARET A.Ş.',
    addressLabel: 'Adres', addressValue: 'Bahçelievler Mah 232.Sok No 6 Gölbaşı - Ankara - Türkiye',
    phoneLabel: 'Telefon', phoneValue: '+90 312 320 26 26 – 533 13 13',
    emailLabel: 'E-posta', emailValue: 'info@adorelgo.com',
    websiteLabel: 'Web', websiteValue: 'www.adorelgo.com',
    workingHoursLabel: 'Çalışma saatleri', workingHoursValue: 'Pazartesi - Cuma: 09:00 - 18:00',
    quickSupportTitle: 'Hızlı destek hattı',
    quickSupportDesc: 'Her türlü sorunuz için WhatsApp üzerinden bize anında ulaşabilirsiniz.',
    whatsappNumber: '905331313',
};

const Contact = () => {
    const { language } = useLanguage();
    const [content, setContent] = useState<any>(DEFAULT_CONTENT);
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
            const response = await axios.get(`${API_BASE_URL}/content/contact?lang=${language}`);
            if (response.data && Object.keys(response.data).length > 0) {
                setContent(deepMerge(DEFAULT_CONTENT, response.data));
            }
        } catch (error) {
            console.error('İçerik yüklenemedi:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/content/contact/submit`, formData);
            alert(language === 'tr' ? 'Mesajınız gönderildi!' : 'Your message has been sent!');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            alert(language === 'tr' ? 'Bir hata oluştu!' : 'An error occurred!');
        }
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-20">
                {/* Compact Professional Header */}
                <section
                    className="text-white relative flex items-center"
                    style={{
                        background: 'linear-gradient(to right, #0051ba, #003d99)',
                        paddingTop: '28px',
                        paddingBottom: '24px'
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
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">{content.companyName || content.contactInfoTitle}</h3>
                                    {content.companyFullName && <p className="text-xs text-gray-500 mb-6 leading-relaxed">{content.companyFullName}</p>}

                                    <div className="space-y-5">
                                        {/* Address */}
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 bg-[#102477]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <i className="fas fa-location-dot text-[#102477] text-sm"></i>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-semibold text-gray-500 mb-1">{content.addressLabel}</h4>
                                                <p className="text-gray-800 text-sm">{content.addressValue}</p>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 bg-[#4DB848]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <i className="fas fa-phone text-[#4DB848] text-sm"></i>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-semibold text-gray-500 mb-1">{content.phoneLabel}</h4>
                                                <p className="text-gray-800 text-sm font-medium">{content.phoneValue}</p>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <i className="fas fa-envelope text-orange-500 text-sm"></i>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-semibold text-gray-500 mb-1">{content.emailLabel}</h4>
                                                <p className="text-gray-800 text-sm font-medium break-all">{content.emailValue}</p>
                                            </div>
                                        </div>

                                        {/* Website */}
                                        {content.websiteValue && (
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <i className="fas fa-globe text-purple-500 text-sm"></i>
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-semibold text-gray-500 mb-1">{content.websiteLabel || 'Web'}</h4>
                                                    <p className="text-gray-800 text-sm font-medium">{content.websiteValue}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Working Hours */}
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <i className="fas fa-clock text-blue-500 text-sm"></i>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-semibold text-gray-500 mb-1">{content.workingHoursLabel}</h4>
                                                <p className="text-gray-800 text-sm">{content.workingHoursValue}</p>
                                            </div>
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
