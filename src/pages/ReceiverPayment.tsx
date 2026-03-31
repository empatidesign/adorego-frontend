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

const getReceiverPaymentDefaults = (lang: 'tr' | 'en') => {
    if (lang === 'en') {
        return {
            title: 'Receiver Payment Shipping',
            description: 'Let the receiver pay the shipping fee while you simply send the shipment.',
            breadcrumbLabel: 'Home',
            sections: [
                { type: 'heading', content: 'What Is Receiver Payment Shipping? How Does It Work?' },
                { type: 'text', content: '<p>Receiver payment shipping means the shipping fee is paid by the recipient instead of the sender.</p>' },
                {
                    type: 'card-grid',
                    cards: [
                        { icon: 'fa-wallet', title: 'Ship without paying upfront', description: 'You do not pay the shipping fee. The entire cost is paid by the receiver.' },
                        { icon: 'fa-money-bill-wave', title: 'Cash collection at delivery', description: 'The receiver pays the shipping fee in cash when the shipment is delivered.' },
                        { icon: 'fa-box', title: 'Sell first, leave shipping to the receiver', description: 'Complete your sale and reflect the shipping cost to the receiver.' },
                    ]
                },
            ],
            ctaTitle: 'Start shipping with receiver payment today',
            ctaDescription: 'Sign up for free and start using the receiver payment shipping option.',
            ctaButtonText: 'Sign Up Free',
            seo: {
                metaTitle: 'What Is Receiver Payment Shipping? How Does It Work? | AdorelGo',
                metaDescription: 'What is receiver payment shipping and how does it work? Manage receiver-paid shipments easily with AdorelGo.',
                keywords: 'receiver payment shipping, receiver pays shipping fee, collect shipping fee on delivery',
            },
        };
    }

    return {
        title: 'Alıcı Ödemeli Kargo',
        description: 'Gönderi ücretini alıcı ödesin, siz sadece gönderin.',
        breadcrumbLabel: 'Anasayfa',
        sections: [
            { type: 'heading', content: 'Alıcı Ödemeli Kargo Nedir? Nasıl Çalışır?' },
            { type: 'text', content: '<p>Alıcı ödemeli kargo, gönderi ücretinin gönderen tarafından değil, alıcı tarafından ödenmesi anlamına gelir.</p>' },
            {
                type: 'card-grid',
                cards: [
                    { icon: 'fa-wallet', title: 'Cepten ödeme yapmadan gönderim', description: 'Kargo ücretini siz ödemezsiniz. Tüm masraf alıcıya aittir.' },
                    { icon: 'fa-money-bill-wave', title: 'Kapıda nakit tahsilat', description: 'Alıcı, teslimat anında kargo ücretini nakit olarak öder.' },
                    { icon: 'fa-box', title: 'Satışı yap, ödemeyi alıcıya bırak', description: 'Ürününüzü satın, kargo maliyetini alıcıya yansıtın.' },
                ]
            },
        ],
        ctaTitle: 'Alıcı ödemeli kargo ile hemen gönderin',
        ctaDescription: 'Ücretsiz üye olun ve alıcı ödemeli kargo seçeneğini kullanmaya başlayın.',
        ctaButtonText: 'Ücretsiz Üye Ol',
        seo: {
            metaTitle: 'Alıcı Ödemeli Kargo Nedir? Nasıl Çalışır? | AdorelGo',
            metaDescription: 'Alıcı ödemeli kargo nedir ve nasıl çalışır? AdorelGo ile alıcı ödemeli gönderileri kolayca yönetin.',
            keywords: 'alıcı ödemeli kargo, alıcı kargo ücretini öder, kapıda kargo ücreti tahsilatı',
        },
    };
};

const ReceiverPayment: React.FC = () => {
    const { currentLang } = useLanguage();
    const [cms, setCms] = useState<any>(null);
    useEffect(() => { axios.get(`${API_BASE_URL}/content/page/alici-odemeli-kargo?lang=${currentLang}`).then(r => { if (r.data && Object.keys(r.data).length > 0) setCms(r.data); }).catch(() => {}); }, [currentLang]);

    const defaults = getReceiverPaymentDefaults(currentLang);
    const title = cms?.title || defaults.title;
    const subtitle = cms?.description || defaults.description;
    const sections = (cms?.sections && cms.sections.length > 0) ? cms.sections : defaults.sections;

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO
                page="alici-odemeli-kargo"
                customTitle={defaults.seo.metaTitle}
                customDescription={defaults.seo.metaDescription}
                keywords={defaults.seo.keywords}
            />
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
                        <div className="max-w-3xl mx-auto"><CmsSections sections={sections} /></div>
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
export default ReceiverPayment;
