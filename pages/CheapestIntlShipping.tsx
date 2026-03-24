import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';

const CheapestIntlShipping: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO
                page="en-ucuz-yurtdisi-kargo"
                customTitle="En Ucuz Yurtdışı Kargo Firması Hangisi? (2026) | AdoreGo"
                customDescription="DHL, FedEx, UPS karşılaştırması. Hız, fiyat ve güven açısından en ucuz yurtdışı kargo firmasını bulun."
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
                            <span>En Ucuz Yurtdışı Kargo</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">En Ucuz Yurtdışı Kargo Firması Hangisi?</h1>
                        <p className="text-white/70 text-lg max-w-2xl">DHL, FedEx, UPS detaylı karşılaştırma rehberi</p>
                    </div>
                </section>

                {/* Hız Karşılaştırması */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-[#102477] tracking-tight mb-8">
                                <i className="fas fa-clock text-blue-500 mr-3"></i>Hız Karşılaştırması
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                                <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100 text-center">
                                    <div className="text-2xl font-bold text-[#102477] mb-2">DHL</div>
                                    <div className="text-3xl font-bold text-yellow-600 mb-1">2-3 gün</div>
                                    <p className="text-gray-500 text-sm">Express teslimat</p>
                                </div>
                                <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100 text-center">
                                    <div className="text-2xl font-bold text-[#102477] mb-2">FedEx</div>
                                    <div className="text-3xl font-bold text-purple-600 mb-1">2-4 gün</div>
                                    <p className="text-gray-500 text-sm">Priority teslimat</p>
                                </div>
                                <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 text-center">
                                    <div className="text-2xl font-bold text-[#102477] mb-2">UPS</div>
                                    <div className="text-3xl font-bold text-orange-600 mb-1">2-4 gün</div>
                                    <p className="text-gray-500 text-sm">Express Saver</p>
                                </div>
                            </div>

                            {/* Fiyat Karşılaştırması */}
                            <h2 className="text-3xl font-bold text-[#102477] tracking-tight mb-8">
                                <i className="fas fa-tags text-[#4DB848] mr-3"></i>Fiyat Karşılaştırması
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                                <div className="bg-green-50 rounded-2xl p-6 border border-green-100 text-center">
                                    <div className="text-2xl font-bold text-[#102477] mb-2">UPS</div>
                                    <div className="text-lg font-bold text-[#4DB848] mb-1">Uygun Fiyat</div>
                                    <p className="text-gray-500 text-sm">Genel olarak en ekonomik</p>
                                </div>
                                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 text-center">
                                    <div className="text-2xl font-bold text-[#102477] mb-2">FedEx</div>
                                    <div className="text-lg font-bold text-blue-600 mb-1">Orta Segment</div>
                                    <p className="text-gray-500 text-sm">Fiyat-performans dengesi</p>
                                </div>
                                <div className="bg-red-50 rounded-2xl p-6 border border-red-100 text-center">
                                    <div className="text-2xl font-bold text-[#102477] mb-2">DHL</div>
                                    <div className="text-lg font-bold text-red-500 mb-1">Premium Fiyat</div>
                                    <p className="text-gray-500 text-sm">Hız ve güven primi</p>
                                </div>
                            </div>

                            {/* Güven & Performans */}
                            <h2 className="text-3xl font-bold text-[#102477] tracking-tight mb-8">
                                <i className="fas fa-shield-halved text-purple-500 mr-3"></i>Güven & Performans
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                                <div className="bg-slate-50 rounded-2xl p-6 border border-gray-100">
                                    <div className="text-xl font-bold text-[#102477] mb-3">DHL</div>
                                    <p className="text-gray-600 text-sm leading-relaxed">Global ağda en geniş kapsama. 220+ ülkeye teslimat. En güvenilir takip sistemi.</p>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-6 border border-gray-100">
                                    <div className="text-xl font-bold text-[#102477] mb-3">FedEx</div>
                                    <p className="text-gray-600 text-sm leading-relaxed">Amerika kıtasında en güçlü altyapı. ABD gönderimlerinde en yüksek performans.</p>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-6 border border-gray-100">
                                    <div className="text-xl font-bold text-[#102477] mb-3">UPS</div>
                                    <p className="text-gray-600 text-sm leading-relaxed">Avrupa ağında güçlü altyapı. Uygun fiyat ve güvenilir teslimat dengesi.</p>
                                </div>
                            </div>

                            {/* Bölgesel Avantaj */}
                            <h2 className="text-3xl font-bold text-[#102477] tracking-tight mb-8">
                                <i className="fas fa-globe text-blue-500 mr-3"></i>Bölgesel Avantaj
                            </h2>
                            <div className="bg-slate-50 rounded-2xl p-8 border border-gray-100 mb-16">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
                                            <i className="fas fa-earth-europe text-white text-sm"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#102477] mb-1">Avrupa Gönderileri</h4>
                                            <p className="text-gray-600 text-sm">UPS ve DHL en avantajlı seçenekler</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center shrink-0">
                                            <i className="fas fa-earth-americas text-white text-sm"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#102477] mb-1">Amerika Gönderileri</h4>
                                            <p className="text-gray-600 text-sm">FedEx ve UPS en avantajlı seçenekler</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-[#4DB848] rounded-lg flex items-center justify-center shrink-0">
                                            <i className="fas fa-earth-asia text-white text-sm"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#102477] mb-1">Global Gönderiler</h4>
                                            <p className="text-gray-600 text-sm">DHL en geniş kapsama alanı</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sonuç */}
                            <h2 className="text-3xl font-bold text-[#102477] tracking-tight mb-8">
                                <i className="fas fa-trophy text-yellow-500 mr-3"></i>Sonuç
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200 text-center">
                                    <div className="text-sm font-semibold text-yellow-600 mb-2">En Hızlı</div>
                                    <div className="text-2xl font-bold text-[#102477]">DHL</div>
                                </div>
                                <div className="bg-green-50 rounded-2xl p-6 border border-green-200 text-center">
                                    <div className="text-sm font-semibold text-[#4DB848] mb-2">En Uygun</div>
                                    <div className="text-2xl font-bold text-[#102477]">UPS</div>
                                </div>
                                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 text-center">
                                    <div className="text-sm font-semibold text-blue-600 mb-2">Dengeli</div>
                                    <div className="text-2xl font-bold text-[#102477]">FedEx</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gerçek */}
                <section className="py-16 bg-slate-50">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <div className="bg-white rounded-2xl p-10 border border-red-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                                    <i className="fas fa-exclamation-triangle text-white"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-[#102477]">GERÇEK</h3>
                            </div>
                            <p className="text-gray-700 text-base leading-relaxed mb-6">
                                Her gönderide en iyi firma değişir. Ağırlık, boyut, hedef ülke ve zamanlama gibi faktörler fiyatı doğrudan etkiler. <strong className="text-[#102477]">Tek firmaya bağlı kalmak yanlıştır.</strong>
                            </p>
                            <div className="bg-[#102477] rounded-xl p-6 text-white">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 bg-[#4DB848] rounded-lg flex items-center justify-center">
                                        <i className="fas fa-lightbulb text-white text-sm"></i>
                                    </div>
                                    <h4 className="text-lg font-bold">EN DOĞRU YÖNTEM</h4>
                                </div>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    Tüm kargo firmalarının fiyatlarını, teslimat sürelerini ve hizmet kalitesini tek bir yerden karşılaştıran bir sistem kullanmak. <strong className="text-[#4DB848]">AdoreGo tam olarak bunu yapar.</strong> Her gönderide en uygun seçeneği otomatik olarak bulur.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Tüm firmaları karşılaştırın, en uygununu bulun</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                            Ücretsiz üye olun, gönderi bilgilerinizi girin ve en ucuz seçeneği anında görün.
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

export default CheapestIntlShipping;
