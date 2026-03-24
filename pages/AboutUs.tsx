import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';

const AboutUs: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="hakkimizda" />
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
                            <span>Hakkımızda</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Hakkımızda</h1>
                        <p className="text-white/70 text-lg max-w-2xl">AdoreGo'yu yakından tanıyın</p>
                    </div>
                </section>

                {/* Tanıtım */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <p className="text-gray-600 text-lg leading-relaxed mb-10">
                            AdoreGo, e-ticaret yapan işletmelerin ve bireysel kullanıcıların yurtiçi ve yurtdışı kargo süreçlerini kolaylaştırmak için geliştirilmiş bir lojistik teknolojileri platformudur.
                        </p>

                        {/* Ne Yapıyoruz? */}
                        <h2 className="text-3xl font-bold text-[#102477] tracking-tight mb-6">Ne Yapıyoruz?</h2>
                        <div className="space-y-4 mb-16">
                            {[
                                'Yurtiçi ve yurtdışı kargo gönderimlerini tek panelden yönetiyoruz.',
                                'Farklı kargo firmalarının fiyatlarını karşılaştırıp en uygun seçeneği sunuyoruz.',
                                'E-ticaret entegrasyonları ile sipariş süreçlerini otomatikleştiriyoruz.',
                                'Mikro ihracat süreçlerini kolaylaştırıyoruz.',
                                'Kapıdan alım ve kapıya teslim hizmeti sağlıyoruz.',
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <i className="fas fa-check text-[#4DB848] mt-1"></i>
                                    <p className="text-gray-700 text-base">{item}</p>
                                </div>
                            ))}
                        </div>

                        {/* Vizyon & Misyon */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            <div className="bg-slate-50 rounded-2xl p-10 border border-gray-100">
                                <div className="w-14 h-14 bg-[#102477] rounded-xl flex items-center justify-center mb-6">
                                    <i className="fas fa-eye text-white text-xl"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-[#102477] mb-3">Vizyonumuz</h3>
                                <p className="text-gray-600 text-base leading-relaxed">
                                    Kargo süreçlerini herkes için erişilebilir hale getirmek.
                                </p>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-10 border border-gray-100">
                                <div className="w-14 h-14 bg-[#4DB848] rounded-xl flex items-center justify-center mb-6">
                                    <i className="fas fa-bullseye text-white text-xl"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-[#102477] mb-3">Misyonumuz</h3>
                                <p className="text-gray-600 text-base leading-relaxed">
                                    Kullanıcıların kargo süreçlerinde zaman, maliyet ve operasyon yükünü azaltmak.
                                </p>
                            </div>
                        </div>

                        {/* Neden AdoreGo? */}
                        <h2 className="text-3xl font-bold text-[#102477] tracking-tight mb-6">Neden AdoreGo?</h2>
                        <div className="space-y-4 mb-16">
                            {[
                                '35+ yıl lojistik tecrübesi',
                                'Şeffaf fiyatlandırma',
                                'Tek panel ile tüm kargo süreçlerini yönetme',
                                'Güçlü e-ticaret entegrasyonları',
                                'Global kargo ortaklıkları',
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <i className="fas fa-check text-[#4DB848] mt-1"></i>
                                    <p className="text-gray-700 text-base">{item}</p>
                                </div>
                            ))}
                        </div>

                        {/* Bizim Farkımız */}
                        <div className="bg-gradient-to-r from-[#102477] to-[#1a3a9e] rounded-2xl p-10 text-white mb-16">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Bizim Farkımız</h2>
                            <p className="text-white/80 text-base leading-relaxed">
                                AdoreGo, akıllı sistemi sayesinde kullanıcıların ihtiyacına göre en doğru kargo seçeneğini otomatik olarak belirler. Fiyat, hız, güvenilirlik ve teslimat süresi gibi kriterleri analiz ederek size en uygun çözümü sunar.
                            </p>
                        </div>

                        {/* Geleceğe Bakış */}
                        <h2 className="text-3xl font-bold text-[#102477] tracking-tight mb-6">Geleceğe Bakış</h2>
                        <p className="text-gray-600 text-base leading-relaxed mb-16">
                            AdoreGo olarak, lojistik sektöründe dijital dönüşümün öncüsü olmayı hedefliyoruz. Yapay zeka destekli rota optimizasyonu, otomatik gümrük süreçleri ve genişleyen global ağımız ile kullanıcılarımıza her geçen gün daha iyi bir deneyim sunmak için çalışıyoruz.
                        </p>

                        {/* CTA */}
                        <div className="text-center">
                            <a
                                href="https://app.adorelgo.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#4DB848] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3da03a] transition-all hover:-translate-y-1 shadow-lg text-base"
                            >
                                Hemen Başla
                                <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default AboutUs;
