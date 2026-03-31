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

const DEFAULT_SECTIONS = [
    {
        type: 'text',
        content: `<h2>Yurtdışına Kargo Nasıl Gönderilir?</h2>`
    },
    {
        type: 'card-grid',
        cards: [
            { icon: 'fa-user-plus', title: 'Adım 1: Ücretsiz Üye Olun', description: 'AdorelGo paneline ücretsiz kayıt olun.' },
            { icon: 'fa-edit', title: 'Adım 2: Gönderi Bilgilerini Girin', description: 'Alıcı adres bilgileri, paket boyutu ve ağırlığını girin.' },
            { icon: 'fa-balance-scale', title: 'Adım 3: Kargo Firmasını Seçin', description: 'Size en uygun fiyat ve süre seçeneğini seçin.' },
            { icon: 'fa-truck', title: 'Adım 4: Kargonuzu Gönderin', description: 'Kapıdan alım ile gönderiminizi başlatın.' },
        ]
    },
];

const IntlShippingGuide: React.FC = () => {
    const { currentLang } = useLanguage();
    const [cms, setCms] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/content/page/yurtdisi-gonderim-rehberi?lang=${currentLang}`)
            .then(r => { if (r.data && Object.keys(r.data).length > 0) setCms(r.data); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [currentLang]);

    const title = cms?.title || 'Yurtdışı Gönderim Rehberi';
    const subtitle = cms?.description || 'Yurtdışı Kargo Nasıl Gönderilir? (2026 Güncel Rehber)';
    const sections: any[] = (cms?.sections && cms.sections.length > 0) ? cms.sections : DEFAULT_SECTIONS;

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="yurtdisi-gonderim-rehberi" />
            <Navbar />
            <main className="flex-grow pt-20">
                <section className="text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #102477 0%, #1a3a9e 50%, #102477 100%)', paddingTop: '28px', paddingBottom: '24px' }}>
                    <div className="absolute inset-0 opacity-10"><div className="absolute top-0 right-0 w-96 h-96 bg-[#4DB848] rounded-full blur-[120px] -mr-48 -mt-48"></div></div>
                    <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                        <nav className="flex items-center gap-2 text-sm opacity-60 mb-6"><Link to="/" className="hover:opacity-100">Anasayfa</Link><span>/</span><span>{title}</span></nav>
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
                        <h2 className="text-3xl font-bold tracking-tight mb-4">En Kolay Yurtdışı Kargo Yöntemi</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">AdorelGo ile yurtdışı kargo göndermek hiç bu kadar kolay olmamıştı.</p>
                        <a href="https://app.adorelgo.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#4DB848] hover:bg-[#3da33a] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105">Hemen Başla<i className="fas fa-arrow-right"></i></a>
                    </div>
                </section>
            </main>
            <Footer /><WhatsAppButton />
        </div>
    );
};
export default IntlShippingGuide;
