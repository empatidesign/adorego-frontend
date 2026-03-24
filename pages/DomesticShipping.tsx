import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';

const DomesticShipping: React.FC = () => {
    const { currentLang } = useLanguage();

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="yurtici-kargo" />
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
                            <span>Yurtiçi Kargo</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Yurtiçi Kargo</h1>
                        <p className="text-white/70 text-lg max-w-2xl">En uygun fiyatla, en hızlı şekilde yurtiçi gönderim</p>
                    </div>
                </section>

                {/* Alıcı Ödemeli & Kapıda Ödemeli */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Alıcı Ödemeli */}
                            <div id="alici-odemeli" className="bg-slate-50 rounded-2xl p-10 border border-gray-100 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                                    <i className="fas fa-hand-holding-dollar text-white text-xl"></i>
                                </div>
                                <h2 className="text-2xl font-bold text-[#102477] mb-2 tracking-tight">Alıcı Ödemeli Lojistik</h2>
                                <p className="text-[#4DB848] font-semibold text-sm mb-4">Büyük Paketleri Cepten Ödeme Alıcı Ödesin</p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Mobilya, beyaz eşya, ağır ürünler için ideal çözüm.
                                    Yüksek maliyetli gönderimlerde cebinden ödeme yapmazsın.
                                </p>
                                <div className="bg-white rounded-xl p-4 border border-gray-100">
                                    <p className="text-[#102477] font-semibold text-sm">
                                        Satışı yapar, kargo ücretini alıcıya bırakırsın.
                                    </p>
                                </div>
                            </div>

                            {/* Kapıda Ödemeli */}
                            <div id="kapida-odemeli" className="bg-slate-50 rounded-2xl p-10 border border-gray-100 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-[#4DB848] rounded-xl flex items-center justify-center mb-6">
                                    <i className="fas fa-money-bill-wave text-white text-xl"></i>
                                </div>
                                <h2 className="text-2xl font-bold text-[#102477] mb-2 tracking-tight">Kapıda Ödemeli Kargo</h2>
                                <p className="text-[#4DB848] font-semibold text-sm mb-4">Ürün Bedelini Teslimatta Tahsil Et</p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Gönderini kapıda ödemeli gönder.
                                    Ürün bedeli teslimat sırasında alıcıdan tahsil edilir.
                                </p>
                                <div className="bg-white rounded-xl p-4 border border-gray-100">
                                    <p className="text-[#102477] font-semibold text-sm">
                                        Alıcı, teslimat sırasında nakit veya kredi kartı ile ödeme yapabilir.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Yurtdışı Gönderenlere Özel */}
                <section className="py-20 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                            <i className="fas fa-tags text-[#4DB848] text-2xl"></i>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Yurtdışı Gönderenlere Özel Yurtiçi Fiyatlar</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
                            Yurtdışı gönderi yapan kullanıcılar, yurtiçi kargolarında otomatik olarak daha uygun fiyatlar görür.
                        </p>
                        <p className="text-white/50 text-sm font-medium">
                            Başvuru yok. Pazarlık yok. Sistem kendisi uygular.
                        </p>
                    </div>
                </section>

                {/* Avantajlar Grid */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Otomatik En Ucuz */}
                            <div className="bg-slate-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-5">
                                    <i className="fas fa-robot text-white text-lg"></i>
                                </div>
                                <h3 className="text-lg font-bold text-[#102477] mb-3">Otomatik En Ucuz Yurtiçi Seçimi</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                    Yurtiçi gönderilerde kargo firması seçmezsin. Sistem en uygun fiyatlı seçeneği otomatik belirler.
                                </p>
                                <p className="text-gray-400 text-xs">
                                    PTT / Sürat / diğerleri — Arkada çalışır, önde fiyat görünür.
                                </p>
                            </div>

                            {/* Aynı Gün Avantajı */}
                            <div className="bg-slate-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-[#4DB848] rounded-xl flex items-center justify-center mb-5">
                                    <i className="fas fa-calendar-check text-white text-lg"></i>
                                </div>
                                <h3 className="text-lg font-bold text-[#102477] mb-3">Yurtiçi + Yurtdışı Aynı Gün Avantajı</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                    Aynı gün hem yurtdışı hem yurtiçi gönderim yapanlar, yurtiçi gönderilerde ekstra avantaj görür.
                                </p>
                                <p className="text-gray-400 text-xs italic">
                                    "Zaten açmışken bir tane daha" etkisi.
                                </p>
                            </div>

                            {/* Stabil Fiyat */}
                            <div className="bg-slate-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-5">
                                    <i className="fas fa-chart-line text-white text-lg"></i>
                                </div>
                                <h3 className="text-lg font-bold text-[#102477] mb-3">Günlük Gönderiler İçin Stabil Fiyat</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                    Her gün gönderim yapan satıcılar için yurtiçi fiyatlar daha stabil ve öngörülebilir olur.
                                </p>
                                <p className="text-gray-400 text-xs">
                                    Bugün kaç çıkacak derdi yok.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Öncelikli Destek */}
                <section className="py-16 bg-slate-50">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
                            <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
                                <i className="fas fa-headset text-white text-2xl"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#102477] mb-2">Öncelikli Destek</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Yurtdışı + yurtiçi aktif kullanıcıların destek talepleri öncelikli olarak ele alınır.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Yurtdışından Türkiye */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight mb-3">
                                Yurtdışından <span className="text-[#4DB848]">Türkiye'ye Kargo</span>
                            </h2>
                            <p className="text-gray-500 text-base max-w-xl mx-auto">
                                Yurtdışındaki adresinden, Türkiye'deki adrese kargo gönderebilirsin.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-slate-50 rounded-2xl p-8 text-center border border-gray-100">
                                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-5">
                                    <i className="fas fa-globe text-white text-lg"></i>
                                </div>
                                <h3 className="text-lg font-bold text-[#102477] mb-2">Yurtdışından Türkiye'ye Gönder</h3>
                                <p className="text-gray-600 text-sm">Yurtdışındaki adresinden, Türkiye'deki adrese kargo gönderebilirsin.</p>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-8 text-center border border-gray-100">
                                <div className="w-12 h-12 bg-[#4DB848] rounded-xl flex items-center justify-center mx-auto mb-5">
                                    <i className="fas fa-truck text-white text-lg"></i>
                                </div>
                                <h3 className="text-lg font-bold text-[#102477] mb-2">Kapıdan Alım – Kapıya Teslim</h3>
                                <p className="text-gray-600 text-sm">Gönderi yurtdışındaki adresten alınır, Türkiye'de alıcının kapısına teslim edilir.</p>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-8 text-center border border-gray-100">
                                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-5">
                                    <i className="fas fa-receipt text-white text-lg"></i>
                                </div>
                                <h3 className="text-lg font-bold text-[#102477] mb-2">Fiyatı Baştan Gör</h3>
                                <p className="text-gray-600 text-sm">Gönderim öncesinde net fiyatı görürsün. Sonradan sürpriz masraf çıkmaz.</p>
                            </div>
                        </div>

                        <div className="text-center mt-12">
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

export default DomesticShipping;
