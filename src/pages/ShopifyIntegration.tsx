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

const getShopifyIntegrationDefaults = (lang: 'tr' | 'en') => (
    lang === 'tr'
        ? {
            title: 'Shopify Entegrasyonu',
            description: "Shopify mağazanızı AdorelGo'ya bağlayarak siparişlerinizi otomatik olarak kargo sürecine aktarın.",
            breadcrumbLabel: 'Anasayfa',
            ctaTitle: 'Shopify Mağazanızı Hemen Bağlayın',
            ctaDescription: 'Ücretsiz üye olun ve Shopify entegrasyonunu dakikalar içinde aktif edin.',
            ctaButtonText: 'Ücretsiz Üye Ol',
            seoTitle: 'Shopify Kargo Entegrasyonu | AdorelGo',
            seoDescription: "Shopify mağazanızı AdorelGo'ya bağlayın. Siparişlerinizi otomatik kargolayın.",
            sections: [
                {
                    type: 'card-grid',
                    cards: [
                        { icon: 'fa-sync-alt', title: 'Otomatik Sipariş Senkronizasyonu', description: 'Shopify mağazanızdaki siparişler otomatik olarak AdorelGo paneline aktarılır.' },
                        { icon: 'fa-mouse-pointer', title: 'Tek Tıkla Gönderi Oluşturma', description: 'Siparişlerinizi tek bir tıklamayla kargoya verin.' },
                        { icon: 'fa-truck', title: 'Takip Numarası Otomatik Güncelleme', description: 'Kargo takip numaraları otomatik olarak Shopify mağazanıza iletilir.' },
                    ]
                },
            ],
        }
        : {
            title: 'Shopify Integration',
            description: 'Connect your Shopify store to AdorelGo and move your orders into the shipping workflow automatically.',
            breadcrumbLabel: 'Home',
            ctaTitle: 'Connect Your Shopify Store Today',
            ctaDescription: 'Sign up for free and activate your Shopify integration in minutes.',
            ctaButtonText: 'Sign Up Free',
            seoTitle: 'Shopify Shipping Integration | AdorelGo',
            seoDescription: 'Connect your Shopify store to AdorelGo and automate your shipping workflow.',
            sections: [
                {
                    type: 'card-grid',
                    cards: [
                        { icon: 'fa-sync-alt', title: 'Automatic Order Sync', description: 'Orders from your Shopify store are automatically transferred to the AdorelGo panel.' },
                        { icon: 'fa-mouse-pointer', title: 'One-Click Shipment Creation', description: 'Send your orders to shipping with a single click.' },
                        { icon: 'fa-truck', title: 'Automatic Tracking Updates', description: 'Tracking numbers are automatically sent back to your Shopify store.' },
                    ]
                },
            ],
        }
);

const ShopifyIntegration: React.FC = () => {
    const { currentLang } = useLanguage();
    const [cms, setCms] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/content/page/shopify-entegrasyonu?lang=${currentLang}`)
            .then(r => { if (r.data && Object.keys(r.data).length > 0) setCms(r.data); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [currentLang]);

    const defaults = getShopifyIntegrationDefaults(currentLang);
    const title = cms?.title || defaults.title;
    const subtitle = cms?.description || defaults.description;
    const sections: any[] = (cms?.sections && cms.sections.length > 0) ? cms.sections : defaults.sections;

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="shopify-entegrasyonu" customTitle={defaults.seoTitle} customDescription={defaults.seoDescription} />
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
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8"><i className="fab fa-shopify text-[#4DB848] text-2xl"></i></div>
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
export default ShopifyIntegration;
