import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';

const FromAbroadToTurkey: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="yurtdisindan-turkiye" />
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
                            <span>Yurtdışından Türkiye'ye Kargo</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Yurtdışından Türkiye'ye Kargo</h1>
                        <p className="text-white/70 text-lg max-w-2xl">Yurtdışındaki adresinden, Türkiye'deki adrese kargo gönderebilirsin.</p>
                    </div>
                </section>

                {/* Cards */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <div className="bg-slate-50 rounded-2xl p-10 border border-gray-100 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-[#102477] rounded-xl flex items-center justify-center mb-6">
                                    <i className="fas fa-globe text-white text-xl"></i>
                                </div>
                                <h2 className="text-2xl font-bold text-[#102477] mb-3 tracking-tight">Yurtdışından Türkiye'ye Gönder</h2>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Dünyanın birçok noktasından Türkiye'ye kolayca kargo gönderebilirsin. Gönderici ve alıcı bilgilerini gir, fiyatını öğren ve hemen gönder.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-slate-50 rounded-2xl p-10 border border-gray-100 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-[#4DB848] rounded-xl flex items-center justify-center mb-6">
                                    <i className="fas fa-truck text-white text-xl"></i>
                                </div>
                                <h2 className="text-2xl font-bold text-[#102477] mb-3 tracking-tight">Kapıdan Alım – Kapıya Teslim</h2>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Kargon bulunduğun adresten alınır ve Türkiye'deki alıcının kapısına kadar teslim edilir. Süreç boyunca takip edebilirsin.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-slate-50 rounded-2xl p-10 border border-gray-100 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                                    <i className="fas fa-calculator text-white text-xl"></i>
                                </div>
                                <h2 className="text-2xl font-bold text-[#102477] mb-3 tracking-tight">Fiyatı Baştan Gör</h2>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Gönderi bilgilerini girdikten sonra tahmini kargo ücretini anında görürsün. Sürpriz maliyetler yok, şeffaf fiyatlandırma var.
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center mt-16">
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

export default FromAbroadToTurkey;
