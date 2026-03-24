import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';

const IntlShippingPrices: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO
                page="yurtdisi-kargo-fiyatlari"
                customTitle="Yurtdışı Kargo Fiyatları 2026 | AdoreGo"
                customDescription="Yurtdışı kargo fiyatları 2026 güncel liste. Ülke, ağırlık ve teslim süresine göre en uygun fiyatları karşılaştırın."
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
                            <span>Yurtdışı Kargo Fiyatları</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Yurtdışı Kargo Fiyatları</h1>
                        <p className="text-white/70 text-lg max-w-2xl">2026 güncel yurtdışı kargo fiyatlarını karşılaştırın</p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-14">
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight mb-6">
                                Yurtdışı Kargo Fiyatları 2026 <span className="text-[#4DB848]">(Güncel Liste)</span>
                            </h2>
                            <p className="text-gray-600 text-base leading-relaxed">
                                Yurtdışı kargo fiyatları; gönderim yapılacak ülkeye, paketin ağırlığına ve seçilen teslim süresine göre değişiklik gösterir. AdoreGo ile tüm seçenekleri tek ekranda karşılaştırabilir, size en uygun olanı seçebilirsiniz.
                            </p>
                        </div>

                        {/* 3 Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* En Uygun */}
                            <div className="bg-slate-50 rounded-2xl p-8 border border-blue-100 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                                    <i className="fas fa-coins text-white text-xl"></i>
                                </div>
                                <h3 className="text-xl font-bold text-[#102477] mb-3">En Uygun</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Bütçenize en uygun kargo seçeneğini bulun. Ekonomik gönderim alternatifleriyle maliyetlerinizi düşürün.
                                </p>
                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <p className="text-[#102477] font-semibold text-sm">Fiyat odaklı karşılaştırma</p>
                                </div>
                            </div>

                            {/* En Hızlı */}
                            <div className="bg-slate-50 rounded-2xl p-8 border border-green-100 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-[#4DB848] rounded-xl flex items-center justify-center mb-6">
                                    <i className="fas fa-bolt text-white text-xl"></i>
                                </div>
                                <h3 className="text-xl font-bold text-[#102477] mb-3">En Hızlı</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Acil gönderileriniz için express kargo seçenekleri. En kısa sürede teslim garantisi.
                                </p>
                                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                                    <p className="text-[#102477] font-semibold text-sm">Hız odaklı karşılaştırma</p>
                                </div>
                            </div>

                            {/* En Sorunsuz */}
                            <div className="bg-slate-50 rounded-2xl p-8 border border-purple-100 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                                    <i className="fas fa-shield-halved text-white text-xl"></i>
                                </div>
                                <h3 className="text-xl font-bold text-[#102477] mb-3">En Sorunsuz</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Güvenilir teslimat, takip kolaylığı ve minimum sorun. Gönül rahatlığıyla gönderin.
                                </p>
                                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                                    <p className="text-[#102477] font-semibold text-sm">Güven odaklı karşılaştırma</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">En uygun yurtdışı kargo fiyatını bulun</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                            Ücretsiz üye olun, gönderi bilgilerinizi girin ve tüm fiyatları anında karşılaştırın.
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

export default IntlShippingPrices;
