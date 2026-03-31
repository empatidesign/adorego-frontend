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

const getCustomApiIntegrationDefaults = (lang: 'tr' | 'en') => (
    lang === 'tr'
        ? {
            title: 'Özel Site Entegrasyonu (API)',
            description: 'Kendi e-ticaret sitenizi AdorelGo API ile entegre edin.',
            breadcrumbLabel: 'Anasayfa',
            ctaTitle: 'API Entegrasyonuna Hemen Başlayın',
            ctaDescription: 'Ücretsiz üye olun, API anahtarınızı alın ve entegrasyonunuzu başlatın.',
            ctaButtonText: 'Ücretsiz Üye Ol',
            seoTitle: 'Özel Site API Entegrasyonu | AdorelGo',
            seoDescription: 'AdorelGo RESTful API ile kendi e-ticaret sitenizi entegre edin. Webhook desteği ve sandbox ortamı.',
            sections: [
                {
                    type: 'card-grid',
                    cards: [
                        { icon: 'fa-code', title: 'RESTful API', description: 'Modern ve iyi dokümante edilmiş RESTful API ile sitenizi kolayca entegre edin.' },
                        { icon: 'fa-bell', title: 'Webhook Desteği', description: 'Sipariş durumu değişikliklerinde otomatik bildirim alın.' },
                        { icon: 'fa-flask', title: 'Sandbox Test Ortamı', description: 'Canlıya almadan önce sandbox ortamında entegrasyonunuzu test edin.' },
                    ]
                },
            ],
        }
        : {
            title: 'Custom Website Integration (API)',
            description: 'Integrate your own e-commerce website with the AdorelGo API.',
            breadcrumbLabel: 'Home',
            ctaTitle: 'Start Your API Integration Today',
            ctaDescription: 'Sign up for free, get your API key, and start your integration.',
            ctaButtonText: 'Sign Up Free',
            seoTitle: 'Custom Website API Integration | AdorelGo',
            seoDescription: 'Integrate your own e-commerce website with the AdorelGo RESTful API. Webhook support and sandbox environment included.',
            sections: [
                {
                    type: 'card-grid',
                    cards: [
                        { icon: 'fa-code', title: 'RESTful API', description: 'Integrate your site easily with a modern and well-documented RESTful API.' },
                        { icon: 'fa-bell', title: 'Webhook Support', description: 'Receive automatic notifications when order statuses change.' },
                        { icon: 'fa-flask', title: 'Sandbox Test Environment', description: 'Test your integration in a sandbox environment before going live.' },
                    ]
                },
            ],
        }
);

const CustomAPIIntegration: React.FC = () => {
    const { currentLang } = useLanguage();
    const [cms, setCms] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/content/page/ozel-site-api?lang=${currentLang}`)
            .then(r => { if (r.data && Object.keys(r.data).length > 0) setCms(r.data); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [currentLang]);

    const defaults = getCustomApiIntegrationDefaults(currentLang);
    const title = cms?.title || defaults.title;
    const subtitle = cms?.description || defaults.description;
    const sections: any[] = (cms?.sections && cms.sections.length > 0) ? cms.sections : defaults.sections;

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="ozel-site-api" customTitle={defaults.seoTitle} customDescription={defaults.seoDescription} />
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
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-6 h-6 border-2 border-[#102477] border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                            <CmsSections sections={sections} />
                        )}
                    </div>
                </section>
                <section className="py-6 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8"><i className="fas fa-plug text-[#4DB848] text-2xl"></i></div>
                        <h2 className="text-3xl font-bold tracking-tight mb-4">{defaults.ctaTitle}</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">{defaults.ctaDescription}</p>
                        <a href="https://app.adorelgo.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#4DB848] hover:bg-[#3da33a] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105">{defaults.ctaButtonText}<i className="fas fa-arrow-right"></i></a>
                    </div>
                </section>
            </main>
            <Footer /><WhatsAppButton />
        </div>
    );
};
export default CustomAPIIntegration;
