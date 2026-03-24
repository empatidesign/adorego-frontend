import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';

const InternationalShipping: React.FC = () => {
    const { currentLang } = useLanguage();

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="yurtdisi-kargo" />
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
                            <span>Yurtdışı Kargo</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Yurtdışı Kargo</h1>
                        <p className="text-white/70 text-lg max-w-2xl">Dünyaya gönderim yapmanın en kolay ve güvenilir yolu</p>
                    </div>
                </section>

                {/* Ekonomik & Express Kargo */}
                <section id="nasil-gonderirim" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Ekonomik Kargo */}
                            <div className="bg-slate-50 rounded-2xl p-10 border border-gray-100 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                                    <i className="fas fa-coins text-white text-xl"></i>
                                </div>
                                <h2 className="text-2xl font-bold text-[#102477] mb-2 tracking-tight">Ekonomik Kargo</h2>
                                <p className="text-[#4DB848] font-semibold text-sm mb-4">Uygun Fiyatlı Yurtdışı Gönderim</p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Acil olmayan gönderiler için en düşük maliyetli yurtdışı kargo seçeneği.
                                </p>
                                <div className="bg-white rounded-xl p-4 border border-gray-100">
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Ekonomik Kargo ile yurtdışı gönderi yapanlar,<br />
                                        <span className="text-[#102477] font-semibold">yurtiçi kargolarında daha avantajlı fiyatlar görür.</span>
                                    </p>
                                </div>
                            </div>

                            {/* Express Kargo */}
                            <div className="bg-slate-50 rounded-2xl p-10 border border-gray-100 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-[#4DB848] rounded-xl flex items-center justify-center mb-6">
                                    <i className="fas fa-bolt text-white text-xl"></i>
                                </div>
                                <h2 className="text-2xl font-bold text-[#102477] mb-2 tracking-tight">Express Kargo</h2>
                                <p className="text-[#4DB848] font-semibold text-sm mb-4">Zaman senin için önemliyse</p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Yurtdışı gönderini en hızlı şekilde ulaştıran seçenek.
                                </p>
                                <div className="bg-white rounded-xl p-4 border border-gray-100">
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        <span className="text-[#102477] font-semibold">Zamanı öncelikleyen, değerli ve acil gönderiler için idealdir.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Kapıdan Alım – Kapıya Teslim */}
                <section id="kapidan-alim" className="py-20 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                            <i className="fas fa-truck text-[#4DB848] text-2xl"></i>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Kapıdan Alım – Kapıya Teslim</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
                            Yurtdışına satış yapanlar için kapıdan alım – kapıya teslim,<br />
                            uygun fiyatlı ve sorunsuz kargo çözümleri.
                        </p>
                    </div>
                </section>

                {/* İlk Kez Yurtdışına Gönderenler */}
                <section id="ilk-kez" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight mb-3">
                                İlk Kez Yurtdışına <span className="text-[#4DB848]">Gönderenler</span>
                            </h2>
                            <p className="text-gray-500 text-base max-w-xl mx-auto">
                                Daha önce hiç yurtdışına göndermeyenler rahatça kullanabilir.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* İlk Gönderim */}
                            <div className="bg-slate-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-5">
                                    <i className="fas fa-play text-white text-lg"></i>
                                </div>
                                <h3 className="text-lg font-bold text-[#102477] mb-3">İlk gönderim en kolayıdır.</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    İlk kez gönderiyorsan, sistem seni adım adım yönlendirir.
                                </p>
                            </div>

                            {/* Gümrük & Evrak */}
                            <div id="gumruk-evrak" className="bg-slate-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-[#4DB848] rounded-xl flex items-center justify-center mb-5">
                                    <i className="fas fa-file-shield text-white text-lg"></i>
                                </div>
                                <h3 className="text-lg font-bold text-[#102477] mb-3">Gümrük & Evrak = Korku Değil Rahatlama</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Bilmen gereken kadarını bil, gerisini sisteme bırak.
                                    Karmaşık evraklar, yanlış ürünler, eksik bilgiler…
                                    Sistem gerekli olanı sana sorar, gerisini biz takip ederiz.
                                </p>
                            </div>

                            {/* İade & Geri Gönderim */}
                            <div id="iade-geri" className="bg-slate-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-5">
                                    <i className="fas fa-rotate-left text-white text-lg"></i>
                                </div>
                                <h3 className="text-lg font-bold text-[#102477] mb-3">Yurtdışı İade & Geri Gönderim</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Teslim edilemeyen yurtdışı gönderilerde iade ve geri gönderim süreci kontrol altındadır.
                                    İade veya geri dönüş durumları panelden takip edilir.
                                    Gönderin yolda kalırsa, süreci biz yönetiriz.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mikro İhracat */}
                <section className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="lg:flex items-center gap-16">
                            <div className="lg:w-1/2 mb-10 lg:mb-0">
                                <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                                    <i className="fas fa-store text-white text-xl"></i>
                                </div>
                                <h2 className="text-3xl font-bold text-[#102477] mb-4 tracking-tight">
                                    Mikro İhracat <span className="text-[#4DB848]">Satış Amaçlı Gönderimler</span>
                                </h2>
                                <p className="text-gray-600 text-base leading-relaxed mb-6">
                                    Yurtdışına ürün satışı yapıyorsan, kargonu mikro ihracata uygun olarak gönder.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-check text-[#4DB848]"></i>
                                        <p className="text-gray-700 text-sm font-medium">Büyük firma olman gerekmez.</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <i className="fas fa-check text-[#4DB848]"></i>
                                        <p className="text-gray-700 text-sm font-medium">Küçük adetli satışlar için de mikro ihracat yapılabilir.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/2">
                                <div className="bg-gradient-to-br from-[#102477] to-[#1a3a9e] rounded-2xl p-10 min-h-[300px] flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <i className="fas fa-image text-white/40 text-3xl"></i>
                                        </div>
                                        <p className="text-white/40 text-sm">Görsel Alanı</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hangi Gönderim Bana Uygun? */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight mb-3">
                                Hangi Gönderim <span className="text-[#4DB848]">Bana Uygun?</span>
                            </h2>
                            <p className="text-gray-500 text-base max-w-xl mx-auto">
                                Kararsızsan sorun değil. Sistem, gönderinin aciliyet ve önceliğine göre en uygun gönderimi seçer.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-slate-50 rounded-2xl p-8 text-center border border-gray-100 hover:shadow-lg hover:border-[#4DB848]/30 transition-all">
                                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-5">
                                    <i className="fas fa-coins text-white text-xl"></i>
                                </div>
                                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Fiyat Öncelikliyse</p>
                                <h3 className="text-xl font-bold text-[#102477]">Ekonomik Kargo</h3>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-8 text-center border border-gray-100 hover:shadow-lg hover:border-[#4DB848]/30 transition-all">
                                <div className="w-14 h-14 bg-[#4DB848] rounded-xl flex items-center justify-center mx-auto mb-5">
                                    <i className="fas fa-bolt text-white text-xl"></i>
                                </div>
                                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Hız Öncelikliyse</p>
                                <h3 className="text-xl font-bold text-[#102477]">Express Kargo</h3>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-8 text-center border border-gray-100 hover:shadow-lg hover:border-[#4DB848]/30 transition-all">
                                <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-5">
                                    <i className="fas fa-store text-white text-xl"></i>
                                </div>
                                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Satış Amaçlıysa</p>
                                <h3 className="text-xl font-bold text-[#102477]">Mikro İhracat Gönderimi</h3>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-gray-500 text-sm mb-6">Seçmek zorunda değilsin. İhtiyacını söyle, gerisini bize bırak.</p>
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

export default InternationalShipping;
