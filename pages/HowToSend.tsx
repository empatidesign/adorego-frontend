import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../src/api-config';

const HowToSend: React.FC = () => {
    const { currentLang } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState<any>({
        badge: currentLang === 'tr' ? 'REHBER' : 'GUIDE',
        title: currentLang === 'tr' ? 'Nasıl Gönderirim?' : 'How to Send?',
        description: currentLang === 'tr' ? 'Yurtdışı kargo gönderimi için adım adım rehberimiz.' : 'Our step-by-step guide for international shipping.',
        introText: currentLang === 'tr' ? 'Adorego ile yurtdışına kargo göndermek hiç bu kadar kolay olmamıştı. Aşağıdaki adımları takip ederek dakikalar içinde gönderinizi oluşturabilirsiniz.' : 'International shipping has never been easier with Adorego. You can create your shipment in minutes by following the steps below.',
        steps: []
    });

    useEffect(() => {
        axios.get(`${API_BASE_URL}/content/howtosend?lang=${currentLang}`)
            .then(res => {
                if (res.data && Object.keys(res.data).length > 0) {
                    setContent({
                        ...content,
                        ...res.data
                    });
                }
            })
            .catch(err => console.error('HowToSend content yüklenemedi:', err))
            .finally(() => setLoading(false));
    }, [currentLang]);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <SEO page="how-to-send" />
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
                            <h1 className="text-3xl font-bold">{content.title}</h1>
                            <nav className="flex items-center gap-2 text-sm opacity-80">
                                <Link to="/" className="hover:opacity-100">{currentLang === 'tr' ? 'Anasayfa' : 'Home'}</Link>
                                <span>/</span>
                                <span>{currentLang === 'tr' ? 'Nasıl Gönderirim' : 'How to Send'}</span>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="py-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">

                        {/* Steps Grid - 4 columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {content.steps?.map((step: any, idx: number) => (
                                <div key={idx} className="group">
                                    <div className="bg-white border-l-4 border-[#4DB848] p-5 h-full hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-[#102477] text-white flex items-center justify-center font-bold text-base flex-shrink-0">
                                                {idx + 1}
                                            </div>
                                        </div>
                                        <h3 className="text-base font-bold text-[#102477] mb-2 group-hover:text-[#4DB848] transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {step.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HowToSend;
