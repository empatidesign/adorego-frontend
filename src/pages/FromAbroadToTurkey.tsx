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
        type: 'card-grid',
        cards: [
            { icon: 'fa-globe', title: "Yurtdışından Türkiye'ye Gönder", description: "Dünyanın birçok noktasından Türkiye'ye kolayca kargo gönderebilirsin." },
            { icon: 'fa-truck', title: 'Kapıdan Alım – Kapıya Teslim', description: "Kargon bulunduğun adresten alınır ve Türkiye'deki alıcının kapısına kadar teslim edilir." },
            { icon: 'fa-calculator', title: 'Fiyatı Baştan Gör', description: 'Gönderi bilgilerini girdikten sonra tahmini kargo ücretini anında görürsün.' },
        ]
    },
];

const FromAbroadToTurkey: React.FC = () => {
    const { currentLang } = useLanguage();
    const [cms, setCms] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/content/page/yurtdisindan-turkiye?lang=${currentLang}`)
            .then(r => { if (r.data && Object.keys(r.data).length > 0) setCms(r.data); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [currentLang]);

    const title = cms?.title || "Yurtdışından Türkiye'ye Kargo";
    const subtitle = cms?.description || "Yurtdışındaki adresinden, Türkiye'deki adrese kargo gönderebilirsin.";
    const sections: any[] = (cms?.sections && cms.sections.length > 0) ? cms.sections : DEFAULT_SECTIONS;

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="yurtdisindan-turkiye" />
            <Navbar />
            <main className="flex-grow pt-20">
                <section className="text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #102477 0%, #1a3a9e 50%, #102477 100%)', paddingTop: '100px', paddingBottom: '80px' }}>
                    <div className="absolute inset-0 opacity-10"><div className="absolute top-0 right-0 w-96 h-96 bg-[#4DB848] rounded-full blur-[120px] -mr-48 -mt-48"></div></div>
                    <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                        <nav className="flex items-center gap-2 text-sm opacity-60 mb-6"><Link to="/" className="hover:opacity-100">Anasayfa</Link><span>/</span><span>{title}</span></nav>
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
                        <div className="text-center mt-16">
                            <a href="https://app.adorelgo.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#4DB848] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3da03a] transition-all hover:-translate-y-1 shadow-lg text-base">Hemen Başla<i className="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer /><WhatsAppButton />
        </div>
    );
};
export default FromAbroadToTurkey;
