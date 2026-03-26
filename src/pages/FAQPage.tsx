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

const FAQPage: React.FC = () => {
    const { currentLang } = useLanguage();
    const [cms, setCms] = useState<any>(null);
    useEffect(() => { axios.get(`${API_BASE_URL}/content/page/sikca-sorulan-sorular?lang=${currentLang}`).then(r => { if (r.data && Object.keys(r.data).length > 0) setCms(r.data); }).catch(() => {}); }, [currentLang]);

    const title = cms?.title || 'Sıkça Sorulan Sorular';
    const subtitle = cms?.description || 'En çok merak edilen sorular ve cevapları';
    const sections = cms?.sections;

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="sikca-sorulan-sorular" />
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
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                        {sections && sections.length > 0 ? (
                            <CmsSections sections={sections} />
                        ) : (
                            <div className="text-center">
                                <div className="bg-slate-50 rounded-2xl p-16 border border-gray-100">
                                    <div className="w-20 h-20 bg-[#102477]/10 rounded-2xl flex items-center justify-center mx-auto mb-8"><i className="fas fa-question-circle text-[#102477] text-3xl"></i></div>
                                    <p className="text-gray-500 text-lg mb-8">Sorular yakında eklenecektir. Merak ettiğiniz konular için bize ulaşın.</p>
                                    <Link to="/iletisim" className="inline-flex items-center gap-3 bg-[#4DB848] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3da03a] transition-all hover:-translate-y-1 shadow-lg text-base">İletişime Geç<i className="fas fa-arrow-right"></i></Link>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer /><WhatsAppButton />
        </div>
    );
};
export default FAQPage;
