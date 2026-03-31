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

const getIntlShippingPricesDefaults = (lang: 'tr' | 'en') => (
    lang === 'tr'
        ? {
            title: 'Yurtdışı Kargo Fiyatları',
            description: '2026 güncel yurtdışı kargo fiyatlarını karşılaştırın',
            breadcrumbLabel: 'Anasayfa',
            ctaTitle: 'En uygun yurtdışı kargo fiyatını bulun',
            ctaDescription: 'Ücretsiz üye olun, gönderi bilgilerinizi girin ve tüm fiyatları anında karşılaştırın.',
            ctaButtonText: 'Ücretsiz Üye Ol',
            seoTitle: 'Yurtdışı Kargo Fiyatları 2026 | AdorelGo',
            seoDescription: 'Yurtdışı kargo fiyatları 2026 güncel liste.',
            sections: [
                {
                    type: 'text',
                    content: `<h2>Yurtdışı Kargo Fiyatları 2026 <span style="color:#4DB848">(Güncel Liste)</span></h2><p>Yurtdışı kargo fiyatları; gönderim yapılacak ülkeye, paketin ağırlığına ve seçilen teslim süresine göre değişiklik gösterir.</p>`
                },
                {
                    type: 'card-grid',
                    cards: [
                        { icon: 'fa-coins', title: 'En Uygun', description: 'Bütçenize en uygun kargo seçeneğini bulun.' },
                        { icon: 'fa-bolt', title: 'En Hızlı', description: 'Acil gönderileriniz için express kargo seçenekleri.' },
                        { icon: 'fa-shield-alt', title: 'En Sorunsuz', description: 'Güvenilir teslimat, takip kolaylığı ve minimum sorun.' },
                    ]
                },
            ],
        }
        : {
            title: 'International Shipping Prices',
            description: 'Compare updated international shipping prices for 2026',
            breadcrumbLabel: 'Home',
            ctaTitle: 'Find the best international shipping price',
            ctaDescription: 'Sign up for free, enter your shipment details, and compare all prices instantly.',
            ctaButtonText: 'Sign Up Free',
            seoTitle: 'International Shipping Prices 2026 | AdorelGo',
            seoDescription: 'Updated 2026 international shipping price list.',
            sections: [
                {
                    type: 'text',
                    content: `<h2>International Shipping Prices 2026 <span style="color:#4DB848">(Updated List)</span></h2><p>International shipping prices vary depending on the destination country, the package weight, and the selected delivery time.</p>`
                },
                {
                    type: 'card-grid',
                    cards: [
                        { icon: 'fa-coins', title: 'Best Price', description: 'Find the shipping option that best fits your budget.' },
                        { icon: 'fa-bolt', title: 'Fastest', description: 'Express shipping options for your urgent shipments.' },
                        { icon: 'fa-shield-alt', title: 'Most Reliable', description: 'Reliable delivery, easier tracking, and fewer issues.' },
                    ]
                },
            ],
        }
);

const IntlShippingPrices: React.FC = () => {
    const { currentLang } = useLanguage();
    const [cms, setCms] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/content/page/yurtdisi-kargo-fiyatlari?lang=${currentLang}`)
            .then(r => { if (r.data && Object.keys(r.data).length > 0) setCms(r.data); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [currentLang]);

    const defaults = getIntlShippingPricesDefaults(currentLang);
    const title = cms?.title || defaults.title;
    const subtitle = cms?.description || defaults.description;
    const sections: any[] = (cms?.sections && cms.sections.length > 0) ? cms.sections : defaults.sections;

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="yurtdisi-kargo-fiyatlari" customTitle={defaults.seoTitle} customDescription={defaults.seoDescription} />
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
export default IntlShippingPrices;
