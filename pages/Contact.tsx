import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    const [language, setLanguage] = useState<'tr' | 'en'>('tr');
    const [settings, setSettings] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as 'tr' | 'en';
        if (savedLang) setLanguage(savedLang);

        axios.get('http://localhost:3000/api/settings')
            .then(res => setSettings(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/contact', formData);
            alert(language === 'tr' ? 'Mesajınız gönderildi!' : 'Your message has been sent!');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            alert(language === 'tr' ? 'Bir hata oluştu!' : 'An error occurred!');
        }
    };

    const t = {
        tr: {
            title: 'İletişim',
            home: 'Anasayfa',
            breadcrumbCurrent: 'İletişim',
            sendMessage: 'Bize mesaj gönderin',
            contactInfo: 'İletişim bilgileri',
            formName: 'Adınız soyadınız',
            formEmail: 'E-posta adresiniz',
            formPhone: 'Telefon numaranız',
            formSubject: 'Konu',
            formMessage: 'Mesajınız',
            formBtn: 'Gönder',
            phone: 'Telefon',
            email: 'E-posta',
            address: 'Adres',
            workingHours: 'Çalışma saatleri',
            quickSupport: 'Hızlı destek hattı'
        },
        en: {
            title: 'Contact',
            home: 'Home',
            breadcrumbCurrent: 'Contact',
            sendMessage: 'Send Us a Message',
            contactInfo: 'Contact information',
            formName: 'Your name',
            formEmail: 'Your email',
            formPhone: 'Your phone',
            formSubject: 'Subject',
            formMessage: 'Your message',
            formBtn: 'Send',
            phone: 'Phone',
            email: 'Email',
            address: 'Address',
            workingHours: 'Working hours',
            quickSupport: 'Quick support'
        }
    };

    const currentT = t[language];

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
                            <h1 className="text-3xl font-bold">{currentT.title}</h1>
                            <nav className="flex items-center gap-2 text-sm opacity-80">
                                <Link to="/" className="hover:opacity-100">{currentT.home}</Link>
                                <span>/</span>
                                <span>{currentT.breadcrumbCurrent}</span>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="bg-white py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.2266489!2d28.9784!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjUiTiAyOMKwNTgnNDIuMiJF!5e0!3m2!1str!2str!4v1234567890"
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
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentT.sendMessage}</h2>
                                    <p className="text-gray-600 mb-8">
                                        Aşağıdaki formu doldurarak bizimle hızlıca iletişime geçebilirsiniz. Uzman ekibimiz en kısa sürede size geri dönüş yapacaktır.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentT.formName}
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                placeholder={currentT.formName}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentT.formEmail}
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                placeholder={currentT.formEmail}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentT.formSubject}
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                placeholder={currentT.formSubject}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {currentT.formMessage}
                                            </label>
                                            <textarea
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                rows={6}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                                placeholder={currentT.formMessage}
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                                            style={{ backgroundColor: '#0051ba' }}
                                        >
                                            {currentT.formBtn}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Right Side: Contact Info - 4 columns */}
                            <div className="lg:col-span-4 space-y-6">
                                {/* Contact Information Card */}
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6">{currentT.contactInfo}</h3>

                                    <div className="space-y-5">
                                        {/* Address */}
                                        <div>
                                            <h4 className="text-xs font-semibold text-gray-500 mb-1">{currentT.address}</h4>
                                            <p className="text-gray-800 text-sm">{settings?.address || 'İstanbul, Türkiye'}</p>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <h4 className="text-xs font-semibold text-gray-500 mb-1">{currentT.phone}</h4>
                                            <p className="text-gray-800 text-sm font-medium">{settings?.phone || '+90 (212) 123 45 67'}</p>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <h4 className="text-xs font-semibold text-gray-500 mb-1">{currentT.email}</h4>
                                            <p className="text-gray-800 text-sm font-medium break-all">{settings?.email || 'info@adorego.com'}</p>
                                        </div>

                                        {/* Working Hours */}
                                        <div>
                                            <h4 className="text-xs font-semibold text-gray-500 mb-1">{currentT.workingHours}</h4>
                                            <p className="text-gray-800 text-sm">{settings?.workingHours || 'Pazartesi - Cuma: 09:00 - 18:00'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* WhatsApp Support Card */}
                                <div className="rounded-xl shadow-sm p-6 text-white" style={{ backgroundColor: '#4DB848' }}>
                                    <h4 className="text-lg font-bold mb-2">{currentT.quickSupport}</h4>
                                    <p className="text-white/90 text-sm mb-5">
                                        Her türlü sorunuz için WhatsApp üzerinden bize anında ulaşabilirsiniz.
                                    </p>
                                    <a
                                        href={`https://wa.me/${settings?.whatsapp?.replace(/\D/g, '')}`}
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
