import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api-config';

const getDefaultHowToSendContent = (lang: 'tr' | 'en') => (
    lang === 'tr'
        ? {
            badge: 'REHBER',
            title: 'Nasıl Gönderirim?',
            description: 'Yurtdışı kargo gönderimi için adım adım rehberimiz.',
            introText: 'Adorelgo ile yurtdışına kargo göndermek hiç bu kadar kolay olmamıştı. Aşağıdaki adımları takip ederek dakikalar içinde gönderinizi oluşturabilirsiniz.',
            sectionTitle: 'Adım Adım Gönderim',
            ctaText: 'Hemen Gönderi Oluştur',
            steps: [
                { title: 'Üye Ol & Giriş Yap', content: 'adorelgo.com üzerinden ücretsiz hesabını oluştur ve panele giriş yap. Kayıt işlemi birkaç dakika sürer.' },
                { title: 'Gönderi Oluştur', content: 'Alıcı bilgilerini, paket ağırlığını ve içeriğini gir. Sistem sana uygun kargo seçeneklerini gösterir.' },
                { title: 'Ödeme Yap', content: 'Beğendiğin kargo seçeneğini seç ve ödemeyi tamamla. Tüm fiyatlar önceden nettir, gizli ücret yoktur.' },
                { title: 'Kargonu Teslim Et', content: 'En yakın kargo şubesine götür ya da kapıdan alım seçeneğini kullan. Kuryemiz adresine gelir.' },
                { title: 'Takip Et', content: 'Kargo yola çıktıktan itibaren her adımı panelden ve e-posta bildirimleriyle takip edebilirsin.' },
                { title: 'Teslim Edildi', content: 'Alıcı kargosunu teslim aldığında sen de bildirim alırsın. Gönderi tamamlanmış olur.' },
            ]
        }
        : {
            badge: 'GUIDE',
            title: 'How to Send?',
            description: 'Our step-by-step guide for international shipping.',
            introText: 'International shipping has never been easier with Adorelgo. Follow the steps below to create your shipment within minutes.',
            sectionTitle: 'Step-by-Step Shipping',
            ctaText: 'Create Shipment Now',
            steps: [
                { title: 'Sign Up & Log In', content: 'Create your free account on adorelgo.com and log in to the panel. Registration only takes a few minutes.' },
                { title: 'Create Your Shipment', content: 'Enter recipient details, package weight and shipment contents. The system shows the best shipping options for you.' },
                { title: 'Make Payment', content: 'Choose the shipping option you like and complete payment. All prices are shown upfront with no hidden fees.' },
                { title: 'Hand Over Your Package', content: 'Drop it off at the nearest branch or use door pickup. Our courier can come to your address.' },
                { title: 'Track It', content: 'After the shipment is on the way, you can follow every step from the panel and email notifications.' },
                { title: 'Delivered', content: 'You are notified once the recipient receives the shipment. Your delivery process is then complete.' },
            ]
        }
);

const normalizeHowToSendContent = (data: any, lang: 'tr' | 'en') => {
    const defaults = getDefaultHowToSendContent(lang);
    const steps = Array.isArray(data?.steps) && data.steps.length > 0
        ? data.steps.map((step: any, idx: number) => ({
            ...step,
            title: step?.title || defaults.steps[idx]?.title || '',
            content: step?.content || step?.description || defaults.steps[idx]?.content || '',
        }))
        : defaults.steps;

    return {
        ...defaults,
        ...data,
        description: data?.description || data?.subtitle || defaults.description,
        introText: data?.introText || defaults.introText,
        sectionTitle: data?.sectionTitle || defaults.sectionTitle,
        ctaText: data?.ctaText || defaults.ctaText,
        steps,
    };
};

const HowToSend: React.FC = () => {
    const { currentLang } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState<any>(() => getDefaultHowToSendContent(currentLang));

    useEffect(() => {
        setLoading(true);
        setContent(getDefaultHowToSendContent(currentLang));
        axios.get(`${API_BASE_URL}/content/howtosend?lang=${currentLang}`)
            .then(res => {
                setContent(normalizeHowToSendContent(res.data, currentLang));
            })
            .catch(err => console.error('HowToSend content yüklenemedi:', err))
            .finally(() => setLoading(false));
    }, [currentLang]);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <SEO page="nasil-gonderirim" />
            <Navbar />
            <main className="flex-grow pt-20">
                {/* Compact Professional Header */}
                <section className="text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #102477 0%, #1a3a9e 50%, #102477 100%)', paddingTop: '28px', paddingBottom: '24px' }}>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4DB848] rounded-full blur-[120px] -mr-48 -mt-48"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                        <nav className="flex items-center gap-2 text-sm opacity-60 mb-6">
                            <Link to="/" className="hover:opacity-100">{currentLang === 'tr' ? 'Anasayfa' : 'Home'}</Link>
                            <span>/</span>
                            <span>{content.title}</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{content.title}</h1>
                        <p className="text-white/70 text-lg max-w-2xl">{content.description}</p>
                    </div>
                </section>

                {/* Steps */}
                <div className="py-20 bg-slate-50">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight mb-3">{content.sectionTitle}</h2>
                            <p className="text-gray-500 text-lg">{content.introText}</p>
                        </div>
                        <div className="relative">
                            {/* Vertical line */}
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#102477] via-[#4DB848] to-[#4DB848]/20 hidden md:block"></div>
                            <div className="space-y-6">
                                {content.steps?.map((step: any, idx: number) => (
                                    <div key={idx} className="relative flex gap-6 group">
                                        {/* Step number bubble */}
                                        <div className="relative z-10 flex-shrink-0">
                                            <div className="w-12 h-12 rounded-2xl bg-[#4DB848] text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:bg-[#102477] transition-colors duration-300">
                                                {idx + 1}
                                            </div>
                                        </div>
                                        {/* Content card */}
                                        <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#4DB848]/30 transition-all duration-300 mb-0">
                                            <h3 className="text-lg font-bold text-[#102477] mb-2 group-hover:text-[#4DB848] transition-colors duration-300">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">{step.content || step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-14 text-center">
                            <a href="https://app.adorelgo.com" target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#4DB848] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3da03a] transition-all hover:-translate-y-1 shadow-lg text-base">
                                {content.ctaText}
                                <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HowToSend;
