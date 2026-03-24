import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';

const USAShipping: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO
                page="amerikaya-kargo"
                customTitle="Amerika'ya Kargo Gönderimi | AdoreGo"
                customDescription="Amerika'ya kargo kaç TL? Nasıl gönderilir? Ortalama 2-5 gün teslim, farklı kargo firmaları tek panelde."
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
                            <span>Amerika'ya Kargo</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Amerika'ya Kargo</h1>
                        <p className="text-white/70 text-lg max-w-2xl">Türkiye'den ABD'ye hızlı, güvenli ve uygun fiyatlı kargo gönderimi</p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight mb-6">
                                Amerika'ya Kargo Kaç TL? <span className="text-[#4DB848]">Nasıl Gönderilir?</span>
                            </h2>
                            <p className="text-gray-600 text-base leading-relaxed mb-6">
                                Amerika'ya kargo fiyatları ağırlık, boyut ve seçilen hizmet türüne göre değişir. AdoreGo ile tüm kargo firmalarının fiyatlarını tek ekranda karşılaştırabilir, en uygun seçeneği kolayca bulabilirsiniz.
                            </p>
                            <p className="text-gray-600 text-base leading-relaxed mb-10">
                                DHL, FedEx, UPS gibi dünya devleriyle çalışarak ABD'nin her eyaletine güvenli teslimat sağlıyoruz.
                            </p>

                            <div className="space-y-5 mb-12">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-[#4DB848] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <i className="fas fa-check text-white text-sm"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#102477] mb-1">Ortalama 2–5 gün teslim</h3>
                                        <p className="text-gray-600 text-sm">Express seçeneklerle ABD'ye hızlı teslimat imkanı.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-[#4DB848] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <i className="fas fa-check text-white text-sm"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#102477] mb-1">Farklı kargo firmaları tek panelde</h3>
                                        <p className="text-gray-600 text-sm">DHL, FedEx, UPS ve daha fazlasını tek yerden karşılaştırın.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-[#4DB848] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <i className="fas fa-check text-white text-sm"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#102477] mb-1">Otomatik fiyat karşılaştırma</h3>
                                        <p className="text-gray-600 text-sm">Gönderi bilgilerinizi girin, sistem en uygun fiyatı otomatik bulsun.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Amerika'ya kargo göndermek için hemen başlayın</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                            Ücretsiz üye olun, fiyatları karşılaştırın ve kargonuzu ABD'ye gönderin.
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

export default USAShipping;
