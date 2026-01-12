import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../src/api-config';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import WhatsAppButton from '../components/WhatsAppButton';

const InternationalShipping: React.FC = () => {
    const { currentLang } = useLanguage();
    const [pageHeader, setPageHeader] = useState<any>({
        title: currentLang === 'tr' ? 'Yurtdışı Kargo Hizmetleri' : 'International Shipping Services',
        breadcrumb: currentLang === 'tr' ? 'Yurtdışı Kargo' : 'International Shipping'
    });

    useEffect(() => {
        // Sayfa başlığını API'den yükle
        axios.get(`${API_BASE_URL}/content/page/yurtdisi-kargo?lang=${currentLang}`)
            .then(res => {
                if (res.data && res.data.header) {
                    setPageHeader(res.data.header);
                }
            })
            .catch(err => console.error('Sayfa başlığı yüklenemedi:', err));
    }, [currentLang]);

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="yurtdisi-kargo" />
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
                            <h1 className="text-3xl font-bold">{pageHeader.title}</h1>
                            <nav className="flex items-center gap-2 text-sm opacity-80">
                                <Link to="/" className="hover:opacity-100">
                                    {currentLang === 'tr' ? 'Anasayfa' : 'Home'}
                                </Link>
                                <span>/</span>
                                <span>{pageHeader.breadcrumb}</span>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* Content Sections */}
                <div className="bg-gradient-to-b from-white to-blue-50/30">
                    <HowItWorks />
                    <Features />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default InternationalShipping;
