import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';

const HowToShipAbroad: React.FC = () => {
    const steps = [
        {
            number: '01',
            title: 'Ücretsiz üye olun',
            description: 'AdoreGo\'ya ücretsiz kayıt olun. Herhangi bir taahhüt veya ücret yok.',
            icon: 'fas fa-user-plus',
            color: 'bg-blue-500',
        },
        {
            number: '02',
            title: 'Gönderi bilgilerini girin',
            description: 'Alıcı adresi, paket ağırlığı ve boyutlarını girin.',
            icon: 'fas fa-edit',
            color: 'bg-[#4DB848]',
        },
        {
            number: '03',
            title: 'En uygun seçeneği seçin',
            description: 'Sistem tüm kargo firmalarının fiyatlarını karşılaştırır. Size en uygun olanı seçin.',
            icon: 'fas fa-balance-scale',
            color: 'bg-purple-500',
        },
        {
            number: '04',
            title: 'Kapıdan alım ile teslim edin',
            description: 'Kargo firması paketiyi adresinizden alır ve alıcıya teslim eder.',
            icon: 'fas fa-truck',
            color: 'bg-orange-500',
        },
    ];

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO
                page="yurtdisina-kargo-nasil-gonderilir"
                customTitle="Yurtdışına Kargo Nasıl Gönderilir? | AdoreGo"
                customDescription="Yurtdışına kargo göndermek için adım adım rehber. Üye ol, bilgileri gir, fiyat karşılaştır, kapıdan alımla gönder."
            />
            <Navbar />
            <main className="flex-grow pt-20">
                {/* Hero Header */}
                <section className="text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #102477 0%, #1a3a9e 50%, #102477 100%)', paddingTop: '100px', paddingBottom: '80px' }}>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4DB848] rounded-full blur-[120px] -mr-48 -mt-48"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                        <nav className="flex items-center gap-2 text-sm opacity-60 mb-6">
                            <Link to="/" className="hover:opacity-100">Anasayfa</Link>
                            <span>/</span>
                            <span>Yurtdışına Kargo Nasıl Gönderilir?</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Yurtdışına Kargo Nasıl Gönderilir?</h1>
                        <p className="text-white/70 text-lg max-w-2xl">Adım adım yurtdışı kargo gönderim rehberi</p>
                    </div>
                </section>

                {/* Steps */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-14">
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight mb-6">
                                Adım Adım <span className="text-[#4DB848]">Yurtdışı Kargo Gönderimi</span>
                            </h2>
                            <p className="text-gray-600 text-base leading-relaxed">
                                Yurtdışına kargo göndermek karmaşık olmak zorunda değil. AdoreGo ile sadece 4 adımda kargonuzu yola çıkarın.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {steps.map((step) => (
                                <div key={step.number} className="bg-slate-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all relative">
                                    <div className="absolute top-6 right-6 text-4xl font-bold text-gray-100">{step.number}</div>
                                    <div className={`w-14 h-14 ${step.color} rounded-xl flex items-center justify-center mb-6`}>
                                        <i className={`${step.icon} text-white text-xl`}></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#102477] mb-3">{step.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Hemen ilk kargonuzu gönderin</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                            Ücretsiz üye olun ve yurtdışına kargo göndermeye başlayın.
                        </p>
                        <a
                            href="https://app.adorelgo.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#4DB848] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3da03a] transition-all hover:-translate-y-1 shadow-lg text-base"
                        >
                            Ücretsiz Üye Ol
                            <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default HowToShipAbroad;
