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

const getAmazonIntegrationDefaults = (lang: 'tr' | 'en') => (
    lang === 'tr'
        ? {
            title: 'Amazon Entegrasyonu',
            description: 'Amazon mağazanızı entegre edin, FBA ve FBM siparişlerinizi tek panelden yönetin.',
            breadcrumbLabel: 'Anasayfa',
            ctaTitle: 'Amazon Mağazanızı Hemen Bağlayın',
            ctaDescription: 'Ücretsiz üye olun ve Amazon entegrasyonunu dakikalar içinde aktif edin.',
            ctaButtonText: 'Ücretsiz Üye Ol',
            seoTitle: 'Amazon Kargo Entegrasyonu | AdorelGo',
            seoDescription: 'Amazon FBA ve FBM siparişlerinizi tek panelden yönetin.',
            features: [
                { icon: 'fa-sync-alt', title: 'Otomatik Sipariş Senkronizasyonu', desc: 'Amazon FBA ve FBM siparişler otomatik olarak AdorelGo paneline aktarılır.' },
                { icon: 'fa-mouse-pointer', title: 'Tek Tıkla Gönderi Oluşturma', desc: 'Siparişlerinizi tek bir tıklamayla kargoya verin.' },
                { icon: 'fa-truck', title: 'Takip Numarası Otomatik Güncelleme', desc: 'Kargo takip numaraları otomatik olarak Amazon mağazanıza iletilir.' },
            ],
        }
        : {
            title: 'Amazon Integration',
            description: 'Connect your Amazon store and manage your FBA and FBM orders from a single panel.',
            breadcrumbLabel: 'Home',
            ctaTitle: 'Connect Your Amazon Store Today',
            ctaDescription: 'Sign up for free and activate your Amazon integration in minutes.',
            ctaButtonText: 'Sign Up Free',
            seoTitle: 'Amazon Shipping Integration | AdorelGo',
            seoDescription: 'Manage your Amazon FBA and FBM orders from a single panel.',
            features: [
                { icon: 'fa-sync-alt', title: 'Automatic Order Sync', desc: 'Amazon FBA and FBM orders are automatically transferred to the AdorelGo panel.' },
                { icon: 'fa-mouse-pointer', title: 'One-Click Shipment Creation', desc: 'Send your orders to shipping with a single click.' },
                { icon: 'fa-truck', title: 'Automatic Tracking Updates', desc: 'Tracking numbers are automatically sent back to your Amazon store.' },
            ],
        }
);

const AmazonIntegration: React.FC = () => {
    const { currentLang } = useLanguage();
    const [cms, setCms] = useState<any>(null);
    useEffect(() => { axios.get(`${API_BASE_URL}/content/page/amazon-entegrasyonu?lang=${currentLang}`).then(r => { if (r.data && Object.keys(r.data).length > 0) setCms(r.data); }).catch(() => {}); }, [currentLang]);

    const defaults = getAmazonIntegrationDefaults(currentLang);
    const title = cms?.title || defaults.title;
    const subtitle = cms?.description || defaults.description;
    const sections = cms?.sections;
    const defaultFeatures = defaults.features;

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="amazon-entegrasyonu" customTitle={defaults.seoTitle} customDescription={defaults.seoDescription} />
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
                        {sections && sections.length > 0 ? <CmsSections sections={sections} /> : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {defaultFeatures.map((f, i) => {
                                    const colors = ['bg-[#4DB848]', 'bg-[#102477]', 'bg-orange-500'];
                                    return (
                                    <div key={i} className="bg-slate-50 rounded-2xl p-8 border border-gray-100 text-center hover:shadow-lg transition-all">
                                        <div className={`w-14 h-14 ${colors[i % colors.length]} rounded-xl flex items-center justify-center mx-auto mb-6`}><i className={`fas ${f.icon} text-white text-xl`}></i></div>
                                        <h3 className="font-bold text-[#102477] text-lg mb-3">{f.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                                    </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
                <section className="py-6 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8"><i className="fab fa-amazon text-[#4DB848] text-2xl"></i></div>
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
export default AmazonIntegration;
