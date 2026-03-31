import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';
import { API_BASE_URL } from '../api-config';
import { useLanguage } from '../contexts/LanguageContext';
import { CmsSections } from './_CmsSections';

const getHowToShipAbroadDefaults = (lang: 'tr' | 'en') => (
    lang === 'tr'
        ? {
            title: 'Yurtdışına Kargo Nasıl Gönderilir?',
            description: 'Adım adım yurtdışı kargo gönderim rehberi',
            breadcrumbLabel: 'Anasayfa',
            ctaTitle: 'Hemen ilk kargonuzu gönderin',
            ctaDescription: 'Ücretsiz üye olun ve yurtdışına kargo göndermeye başlayın.',
            ctaButtonText: 'Ücretsiz Üye Ol',
            seoTitle: 'Yurtdışına Kargo Nasıl Gönderilir? | AdorelGo',
            seoDescription: 'Yurtdışına kargo göndermek için adım adım rehber.',
            sections: [
                {
                    type: 'card-grid',
                    cards: [
                        { icon: 'fa-user-plus', title: '01 – Ücretsiz üye olun', description: "AdorelGo'ya ücretsiz kayıt olun." },
                        { icon: 'fa-edit', title: '02 – Gönderi bilgilerini girin', description: 'Alıcı adresi, paket ağırlığı ve boyutlarını girin.' },
                        { icon: 'fa-balance-scale', title: '03 – En uygun seçeneği seçin', description: 'Sistem tüm kargo firmalarının fiyatlarını karşılaştırır.' },
                        { icon: 'fa-truck', title: '04 – Kapıdan alım ile teslim edin', description: 'Kargo firması paketi adresinizden alır ve alıcıya teslim eder.' },
                    ]
                },
            ],
        }
        : {
            title: 'How to Send Cargo Abroad?',
            description: 'A step-by-step guide for international shipping',
            breadcrumbLabel: 'Home',
            ctaTitle: 'Send your first shipment today',
            ctaDescription: 'Sign up for free and start shipping abroad.',
            ctaButtonText: 'Sign Up Free',
            seoTitle: 'How to Send Cargo Abroad? | AdorelGo',
            seoDescription: 'A step-by-step guide to sending cargo abroad.',
            sections: [
                {
                    type: 'card-grid',
                    cards: [
                        { icon: 'fa-user-plus', title: '01 - Sign up for free', description: 'Create your AdorelGo account for free.' },
                        { icon: 'fa-edit', title: '02 - Enter shipment details', description: 'Enter the recipient address, package weight, and dimensions.' },
                        { icon: 'fa-balance-scale', title: '03 - Choose the best option', description: 'The system compares prices from all carriers for you.' },
                        { icon: 'fa-truck', title: '04 - Hand it over with door pickup', description: 'The carrier collects the package from your address and delivers it to the recipient.' },
                    ]
                },
            ],
        }
);

const HowToShipAbroad: React.FC = () => {
    const { currentLang } = useLanguage();
    const [cms, setCms] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/content/page/yurtdisina-kargo-nasil-gonderilir?lang=${currentLang}`)
            .then(r => { if (r.data && Object.keys(r.data).length > 0) setCms(r.data); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [currentLang]);

    const defaults = getHowToShipAbroadDefaults(currentLang);
    const title = cms?.title || defaults.title;
    const subtitle = cms?.description || defaults.description;
    const sections: any[] = (cms?.sections && cms.sections.length > 0) ? cms.sections : defaults.sections;

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="yurtdisina-kargo-nasil-gonderilir" customTitle={defaults.seoTitle} customDescription={defaults.seoDescription} />
            <Navbar />
            <main className="flex-grow pt-20">
                <section className="text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #102477 0%, #1a3a9e 50%, #102477 100%)', paddingTop: '28px', paddingBottom: '24px' }}>
                    <div className="absolute inset-0 opacity-10"><div className="absolute top-0 right-0 w-96 h-96 bg-[#4DB848] rounded-full blur-[120px] -mr-48 -mt-48"></div></div>
                    <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                        <nav className="flex items-center gap-2 text-sm opacity-60 mb-6"><Link to="/" className="hover:opacity-100">{defaults.breadcrumbLabel}</Link><span>/</span><span>{title}</span></nav>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{title}</h1>
                        <p className="text-white/70 text-lg max-w-2xl">{subtitle}</p>
                    </div>
                </section>
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-6 h-6 border-2 border-[#102477] border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                            <div className="max-w-4xl mx-auto">
                                <CmsSections sections={sections} />
                            </div>
                        )}
                    </div>
                </section>
                <section className="py-6 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">{defaults.ctaTitle}</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-8">{defaults.ctaDescription}</p>
                        <a href="https://app.adorelgo.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#4DB848] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3da03a] transition-all hover:-translate-y-1 shadow-lg text-base">{defaults.ctaButtonText}<i className="fas fa-arrow-right"></i></a>
                    </div>
                </section>
            </main>
            <Footer /><WhatsAppButton />
        </div>
    );
};
export default HowToShipAbroad;
