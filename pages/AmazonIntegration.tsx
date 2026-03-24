import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';

const AmazonIntegration: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="amazon-entegrasyonu" />
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
                            <Link to="/entegrasyonlar" className="hover:opacity-100">Entegrasyonlar</Link>
                            <span>/</span>
                            <span>Amazon</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Amazon Entegrasyonu</h1>
                        <p className="text-white/70 text-lg max-w-2xl">Amazon mağazanızı entegre edin, FBA ve FBM siparişlerinizi tek panelden yönetin.</p>
                    </div>
                </section>

                {/* Features */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: 'fa-sync-alt', title: 'Otomatik Sipariş Senkronizasyonu', desc: 'Amazon mağazanızdaki FBA ve FBM siparişler otomatik olarak AdoreGo paneline aktarılır.' },
                                { icon: 'fa-mouse-pointer', title: 'Tek Tıkla Gönderi Oluşturma', desc: 'Siparişlerinizi tek bir tıklamayla kargoya verin. Etiket oluşturma ve kargo firması seçimi saniyeler içinde.' },
                                { icon: 'fa-truck', title: 'Takip Numarası Otomatik Güncelleme', desc: 'Kargo takip numaraları otomatik olarak Amazon mağazanıza ve müşterilerinize iletilir.' },
                            ].map((feature, index) => (
                                <div key={index} className="bg-slate-50 rounded-2xl p-8 border border-gray-100 text-center hover:shadow-lg transition-all">
                                    <div className="w-14 h-14 bg-[#102477] rounded-xl flex items-center justify-center mx-auto mb-6">
                                        <i className={`fas ${feature.icon} text-white text-xl`}></i>
                                    </div>
                                    <h3 className="font-bold text-[#102477] text-lg mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                            <i className="fab fa-amazon text-[#4DB848] text-2xl"></i>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Amazon Mağazanızı Hemen Bağlayın</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                            Ücretsiz üye olun ve Amazon entegrasyonunu dakikalar içinde aktif edin.
                        </p>
                        <a
                            href="https://app.adorelgo.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#4DB848] hover:bg-[#3da33a] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
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

export default AmazonIntegration;
