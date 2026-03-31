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

const getFromAbroadToTurkeyDefaults = (lang: 'tr' | 'en') => (
    lang === 'tr'
        ? {
            title: "Yurtdışından Türkiye'ye Kargo",
            description: "Yurtdışındaki adresinden, Türkiye'deki adrese kargo gönderebilirsin.",
            breadcrumbLabel: 'Anasayfa',
            ctaText: 'Hemen Başla',
            sections: [
                {
                    type: 'card-grid',
                    cards: [
                        { icon: 'fa-globe', title: "Yurtdışından Türkiye'ye Gönder", description: "Dünyanın birçok noktasından Türkiye'ye kolayca kargo gönderebilirsin." },
                        { icon: 'fa-truck', title: 'Kapıdan Alım – Kapıya Teslim', description: "Kargon bulunduğun adresten alınır ve Türkiye'deki alıcının kapısına kadar teslim edilir." },
                        { icon: 'fa-calculator', title: 'Fiyatı Baştan Gör', description: 'Gönderi bilgilerini girdikten sonra tahmini kargo ücretini anında görürsün.' },
                    ]
                },
            ],
        }
        : {
            title: 'Shipping from Abroad to Turkey',
            description: 'You can send shipments from your address abroad to an address in Turkey.',
            breadcrumbLabel: 'Home',
            ctaText: 'Get Started',
            sections: [
                {
                    type: 'card-grid',
                    cards: [
                        { icon: 'fa-globe', title: 'Send from Abroad to Turkey', description: 'Easily ship to Turkey from many locations around the world.' },
                        { icon: 'fa-truck', title: 'Door Pickup - Door Delivery', description: "Your shipment is collected from your address and delivered to the recipient's door in Turkey." },
                        { icon: 'fa-calculator', title: 'See the Price Upfront', description: 'Enter your shipment details and instantly view the estimated shipping cost.' },
                    ]
                },
            ],
        }
);

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

    const defaults = getFromAbroadToTurkeyDefaults(currentLang);
    const title = cms?.title || defaults.title;
    const subtitle = cms?.description || defaults.description;
    const sections: any[] = (cms?.sections && cms.sections.length > 0) ? cms.sections : defaults.sections;

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="yurtdisindan-turkiye" />
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
                        <div className="text-center mt-16">
                            <a href="https://app.adorelgo.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#4DB848] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3da03a] transition-all hover:-translate-y-1 shadow-lg text-base">{defaults.ctaText}<i className="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer /><WhatsAppButton />
        </div>
    );
};
export default FromAbroadToTurkey;
