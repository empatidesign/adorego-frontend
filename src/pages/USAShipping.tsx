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

const getUsaShippingDefaults = (lang: 'tr' | 'en') => (
    lang === 'tr'
        ? {
            title: "Amerika'ya Kargo",
            description: "Türkiye'den ABD'ye hızlı, güvenli ve uygun fiyatlı kargo gönderimi",
            breadcrumbLabel: 'Anasayfa',
            ctaTitle: "Amerika'ya kargo göndermek için hemen başlayın",
            ctaDescription: "Ücretsiz üye olun, fiyatları karşılaştırın ve kargonuzu ABD'ye gönderin.",
            ctaButtonText: 'Ücretsiz Üye Ol',
            seoTitle: "Amerika'ya Kargo Gönderimi | AdorelGo",
            seoDescription: "Amerika'ya kargo kaç TL? Nasıl gönderilir? Ortalama 2-5 gün teslim, farklı kargo firmaları tek panelde.",
            sections: [
                {
                    type: 'text',
                    content: `<h2>Amerika'ya Kargo Kaç TL? <span style="color:#4DB848">Nasıl Gönderilir?</span></h2><p>Amerika'ya kargo fiyatları ağırlık, boyut ve seçilen hizmet türüne göre değişir. AdorelGo ile tüm kargo firmalarının fiyatlarını tek ekranda karşılaştırabilir, en uygun seçeneği kolayca bulabilirsiniz.</p><p>DHL, FedEx, UPS gibi dünya devleriyle çalışarak ABD'nin her eyaletine güvenli teslimat sağlıyoruz.</p>`
                },
                {
                    type: 'list',
                    items: [
                        "Ortalama 2–5 gün teslim: Express seçeneklerle ABD'ye hızlı teslimat imkanı.",
                        'Farklı kargo firmaları tek panelde: DHL, FedEx, UPS ve daha fazlasını tek yerden karşılaştırın.',
                        'Otomatik fiyat karşılaştırma: Gönderi bilgilerinizi girin, sistem en uygun fiyatı otomatik bulsun.',
                    ]
                },
            ],
        }
        : {
            title: 'Shipping to the USA',
            description: 'Fast, secure, and affordable shipping from Turkey to the United States',
            breadcrumbLabel: 'Home',
            ctaTitle: 'Start shipping to the USA today',
            ctaDescription: 'Sign up for free, compare prices, and ship your package to the United States.',
            ctaButtonText: 'Sign Up Free',
            seoTitle: 'Shipping to the USA | AdorelGo',
            seoDescription: 'How much does shipping to the USA cost? Compare average 2-5 day delivery and multiple carriers in one panel.',
            sections: [
                {
                    type: 'text',
                    content: `<h2>How Much Does Shipping to the USA Cost? <span style="color:#4DB848">How Does It Work?</span></h2><p>Shipping prices to the USA vary based on weight, dimensions, and the selected service type. With AdorelGo, you can compare rates from multiple carriers on one screen and easily find the best option.</p><p>We work with global carriers like DHL, FedEx, and UPS to provide secure delivery across every state in the United States.</p>`
                },
                {
                    type: 'list',
                    items: [
                        'Average delivery in 2-5 days: Fast delivery to the USA with express options.',
                        'Multiple carriers in one panel: Compare DHL, FedEx, UPS, and more in one place.',
                        'Automatic price comparison: Enter your shipment details and let the system find the best rate instantly.',
                    ]
                },
            ],
        }
);

const USAShipping: React.FC = () => {
    const { currentLang } = useLanguage();
    const [cms, setCms] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/content/page/amerikaya-kargo?lang=${currentLang}`)
            .then(r => { if (r.data && Object.keys(r.data).length > 0) setCms(r.data); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [currentLang]);

    const defaults = getUsaShippingDefaults(currentLang);
    const title = cms?.title || defaults.title;
    const subtitle = cms?.description || defaults.description;
    const sections: any[] = (cms?.sections && cms.sections.length > 0) ? cms.sections : defaults.sections;

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="amerikaya-kargo" customTitle={defaults.seoTitle} customDescription={defaults.seoDescription} />
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
                            <div className="max-w-3xl mx-auto">
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
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default USAShipping;
