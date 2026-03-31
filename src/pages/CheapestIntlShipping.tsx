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

const getCheapestIntlShippingDefaults = (lang: 'tr' | 'en') => (
    lang === 'tr'
        ? {
            title: 'En Ucuz Yurtdışı Kargo Firması Hangisi?',
            description: 'DHL, FedEx, UPS detaylı karşılaştırma rehberi',
            breadcrumbLabel: 'Anasayfa',
            ctaTitle: 'Tüm firmaları karşılaştırın, en uygununu bulun',
            ctaDescription: 'Ücretsiz üye olun ve en ucuz seçeneği anında görün.',
            ctaButtonText: 'Ücretsiz Üye Ol',
            seoTitle: 'En Ucuz Yurtdışı Kargo Firması Hangisi? (2026) | AdorelGo',
            seoDescription: 'DHL, FedEx, UPS karşılaştırması.',
            sections: [
                {
                    type: 'text',
                    content: `<h2>Hız Karşılaştırması</h2>`
                },
                {
                    type: 'card-grid',
                    cards: [
                        { icon: 'fa-shipping-fast', title: 'DHL – 2-3 gün', description: 'Express teslimat seçeneği ile en hızlı teslimat.' },
                        { icon: 'fa-shipping-fast', title: 'FedEx – 2-4 gün', description: 'Priority teslimat ile güvenilir uluslararası gönderim.' },
                        { icon: 'fa-shipping-fast', title: 'UPS – 2-4 gün', description: 'Express Saver seçeneği ile uygun fiyatlı hızlı teslimat.' },
                    ]
                },
            ],
        }
        : {
            title: 'Which Is the Cheapest International Shipping Company?',
            description: 'Detailed comparison guide for DHL, FedEx, and UPS',
            breadcrumbLabel: 'Home',
            ctaTitle: 'Compare all carriers and find the best option',
            ctaDescription: 'Sign up for free and instantly see the most affordable option.',
            ctaButtonText: 'Sign Up Free',
            seoTitle: 'Which Is the Cheapest International Shipping Company? (2026) | AdorelGo',
            seoDescription: 'Compare DHL, FedEx, and UPS for international shipping.',
            sections: [
                {
                    type: 'text',
                    content: `<h2>Speed Comparison</h2>`
                },
                {
                    type: 'card-grid',
                    cards: [
                        { icon: 'fa-shipping-fast', title: 'DHL - 2-3 days', description: 'The fastest delivery with express service.' },
                        { icon: 'fa-shipping-fast', title: 'FedEx - 2-4 days', description: 'Reliable international delivery with priority service.' },
                        { icon: 'fa-shipping-fast', title: 'UPS - 2-4 days', description: 'Affordable fast delivery with the Express Saver option.' },
                    ]
                },
            ],
        }
);

const CheapestIntlShipping: React.FC = () => {
    const { currentLang } = useLanguage();
    const [cms, setCms] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/content/page/en-ucuz-yurtdisi-kargo?lang=${currentLang}`)
            .then(r => { if (r.data && Object.keys(r.data).length > 0) setCms(r.data); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [currentLang]);

    const defaults = getCheapestIntlShippingDefaults(currentLang);
    const title = cms?.title || defaults.title;
    const subtitle = cms?.description || defaults.description;
    const sections: any[] = (cms?.sections && cms.sections.length > 0) ? cms.sections : defaults.sections;

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="en-ucuz-yurtdisi-kargo" customTitle={defaults.seoTitle} customDescription={defaults.seoDescription} />
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
export default CheapestIntlShipping;
