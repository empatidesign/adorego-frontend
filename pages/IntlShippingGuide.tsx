import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';

const IntlShippingGuide: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="yurtdisi-gonderim-rehberi" />
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
                            <span>Yurtdışı Gönderim Rehberi</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Yurtdışı Gönderim Rehberi</h1>
                        <p className="text-white/70 text-lg max-w-2xl">Yurtdışı Kargo Nasıl Gönderilir? (2026 Güncel Rehber)</p>
                    </div>
                </section>

                {/* Yurtdışına Kargo Nasıl Gönderilir? */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-[#102477] rounded-xl flex items-center justify-center">
                                <i className="fas fa-paper-plane text-white text-xl"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-[#102477] tracking-tight">Yurtdışına Kargo Nasıl Gönderilir?</h2>
                        </div>
                        <p className="text-gray-600 mb-8 leading-relaxed">Yurtdışına kargo göndermek artık çok kolay. AdoreGo ile 4 basit adımda gönderiminizi oluşturabilirsiniz:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { step: '1', title: 'Ücretsiz Üye Olun', desc: 'AdoreGo paneline ücretsiz kayıt olun ve hesabınızı oluşturun.' },
                                { step: '2', title: 'Gönderi Bilgilerini Girin', desc: 'Alıcı adres bilgileri, paket boyutu ve ağırlığını girin.' },
                                { step: '3', title: 'Kargo Firmasını Seçin', desc: 'Size en uygun fiyat ve süre seçeneğini karşılaştırarak seçin.' },
                                { step: '4', title: 'Kargonuzu Gönderin', desc: 'Kapıdan alım veya teslim noktasına bırakarak gönderiminizi başlatın.' },
                            ].map((item) => (
                                <div key={item.step} className="bg-slate-50 rounded-2xl p-6 border border-gray-100 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[#4DB848] rounded-full flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-check text-white text-sm"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#102477] mb-1">Adım {item.step}: {item.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Yurtdışı Kargo Fiyatları Nasıl Hesaplanır? */}
                <section className="py-20 bg-slate-50">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-[#4DB848] rounded-xl flex items-center justify-center">
                                <i className="fas fa-calculator text-white text-xl"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-[#102477] tracking-tight">Yurtdışı Kargo Fiyatları Nasıl Hesaplanır?</h2>
                        </div>
                        <p className="text-gray-600 mb-8 leading-relaxed">Yurtdışı kargo fiyatları birçok kritere göre belirlenir. İşte fiyatı etkileyen 4 temel faktör:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { icon: 'fa-weight-hanging', title: 'Ağırlık (Desi)', desc: 'Paketinizin fiziksel ve hacimsel ağırlığından büyük olanı baz alınır.' },
                                { icon: 'fa-globe-americas', title: 'Hedef Ülke', desc: 'Gönderim yapılacak ülkenin uzaklığı ve bölgesi fiyatı doğrudan etkiler.' },
                                { icon: 'fa-shipping-fast', title: 'Kargo Hızı', desc: 'Ekonomik veya express seçenekler arasında fiyat farkı oluşur.' },
                                { icon: 'fa-box-open', title: 'Paket Boyutu', desc: 'Paketinizin en, boy ve yükseklik ölçüleri hacimsel ağırlığı belirler.' },
                            ].map((item, index) => (
                                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[#102477]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i className={`fas ${item.icon} text-[#102477] text-sm`}></i>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#102477] mb-1">{item.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* En Uygun Yurtdışı Kargo Nasıl Seçilir? */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-[#102477] rounded-xl flex items-center justify-center">
                                <i className="fas fa-balance-scale text-white text-xl"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-[#102477] tracking-tight">En Uygun Yurtdışı Kargo Nasıl Seçilir?</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: 'fa-coins', color: '#4DB848', title: 'En Uygun', desc: 'Bütçenize en uygun kargo seçeneğini karşılaştırmalı olarak görün. Ekonomik gönderim ile maliyetlerinizi minimumda tutun.' },
                                { icon: 'fa-bolt', color: '#102477', title: 'En Hızlı', desc: 'Acil gönderileriniz için express kargo seçeneklerini değerlendirin. 1-3 iş gününde teslimat imkanı.' },
                                { icon: 'fa-shield-alt', color: '#4DB848', title: 'En Sorunsuz', desc: 'Sigortalı, takipli ve güvenilir kargo firmalarıyla gönül rahatlığıyla gönderin. Gümrük süreçlerinde destek alın.' },
                            ].map((item, index) => (
                                <div key={index} className="bg-slate-50 rounded-2xl p-8 border border-gray-100 text-center hover:shadow-lg transition-all">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: item.color }}>
                                        <i className={`fas ${item.icon} text-white text-xl`}></i>
                                    </div>
                                    <h3 className="font-bold text-[#102477] text-lg mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mikro İhracat Nedir? */}
                <section className="py-20 bg-slate-50">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-[#4DB848] rounded-xl flex items-center justify-center">
                                <i className="fas fa-store text-white text-xl"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-[#102477] tracking-tight">Mikro İhracat Nedir?</h2>
                        </div>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Mikro ihracat, 300 kg ve 15.000 EUR altındaki gönderilerin basitleştirilmiş gümrük işlemleriyle yurtdışına gönderilmesidir. E-ticaret satıcıları için büyük avantajlar sunar:
                        </p>
                        <div className="space-y-4">
                            {[
                                'KDV istisnası ile vergi avantajı sağlarsınız.',
                                'Gümrük müşaviri gerektirmeden kolay ihracat yapabilirsiniz.',
                                'ETGB (Elektronik Ticaret Gümrük Beyannamesi) ile hızlı işlem.',
                            ].map((text, index) => (
                                <div key={index} className="bg-white rounded-xl p-5 border border-gray-100 flex items-center gap-4">
                                    <div className="w-8 h-8 bg-[#4DB848] rounded-full flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-check text-white text-xs"></i>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Gümrük ve Evrak Süreci */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-[#102477] rounded-xl flex items-center justify-center">
                                <i className="fas fa-file-alt text-white text-xl"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-[#102477] tracking-tight">Gümrük ve Evrak Süreci</h2>
                        </div>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Yurtdışı gönderimlerinizde gümrük işlemleri AdoreGo tarafından kolaylaştırılır. Sizin için gerekli evrakları hazırlıyoruz:
                        </p>
                        <div className="space-y-4">
                            {[
                                'Proforma fatura ve ticari fatura otomatik oluşturulur.',
                                'Gümrük beyannamesi (ETGB) süreçleri sizin adınıza yürütülür.',
                                'Yasak ve kısıtlı ürün kontrolleri gönderim öncesi yapılır.',
                            ].map((text, index) => (
                                <div key={index} className="bg-slate-50 rounded-xl p-5 border border-gray-100 flex items-center gap-4">
                                    <div className="w-8 h-8 bg-[#4DB848] rounded-full flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-check text-white text-xs"></i>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Yurtdışı Kargo İade Süreci */}
                <section className="py-20 bg-slate-50">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-[#4DB848] rounded-xl flex items-center justify-center">
                                <i className="fas fa-undo-alt text-white text-xl"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-[#102477] tracking-tight">Yurtdışı Kargo İade Süreci</h2>
                        </div>
                        <div className="space-y-4">
                            {[
                                'İade kargo etiketi oluşturarak müşterinize kolay iade imkanı sunabilirsiniz.',
                                'İade gönderileri takip numarasıyla anlık olarak izlenebilir.',
                                'İade edilen ürünler Türkiye\'deki adresinize veya yurtdışı depoya yönlendirilebilir.',
                            ].map((text, index) => (
                                <div key={index} className="bg-white rounded-xl p-5 border border-gray-100 flex items-start gap-4">
                                    <div className="w-2 h-2 bg-[#102477] rounded-full flex-shrink-0 mt-2"></div>
                                    <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Hangi Ülkelere Kargo Gönderilir? */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-[#102477] rounded-xl flex items-center justify-center">
                                <i className="fas fa-globe text-white text-xl"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-[#102477] tracking-tight">Hangi Ülkelere Kargo Gönderilir?</h2>
                        </div>
                        <p className="text-gray-600 mb-8 leading-relaxed">AdoreGo ile 220'den fazla ülkeye kargo gönderebilirsiniz. En çok gönderim yapılan ülkeler:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                            {[
                                { flag: '🇺🇸', name: 'Amerika (ABD)' },
                                { flag: '🇬🇧', name: 'İngiltere' },
                                { flag: '🇩🇪', name: 'Almanya' },
                                { flag: '🇫🇷', name: 'Fransa' },
                                { flag: '🇳🇱', name: 'Hollanda' },
                            ].map((country, index) => (
                                <div key={index} className="bg-slate-50 rounded-xl p-5 border border-gray-100 text-center">
                                    <span className="text-3xl mb-2 block">{country.flag}</span>
                                    <p className="text-[#102477] font-semibold text-sm">{country.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Dikkat Edilmesi Gerekenler */}
                <section className="py-20 bg-slate-50">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-[#4DB848] rounded-xl flex items-center justify-center">
                                <i className="fas fa-exclamation-triangle text-white text-xl"></i>
                            </div>
                            <h2 className="text-3xl font-bold text-[#102477] tracking-tight">Dikkat Edilmesi Gerekenler</h2>
                        </div>
                        <div className="space-y-4">
                            {[
                                'Göndereceğiniz ürünün hedef ülkede yasaklı veya kısıtlı olmadığından emin olun.',
                                'Paketleme standartlarına uygun ambalaj kullanın; hasarlı gönderimlerden kaçının.',
                                'Gümrük beyanı için ürün değerini doğru ve eksiksiz beyan edin.',
                                'Alıcının telefon numarası ve e-posta adresini eksiksiz girin; teslimat sorunlarını önleyin.',
                            ].map((text, index) => (
                                <div key={index} className="bg-white rounded-xl p-5 border border-gray-100 flex items-start gap-4">
                                    <div className="w-2 h-2 bg-[#4DB848] rounded-full flex-shrink-0 mt-2"></div>
                                    <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* En Kolay Yurtdışı Kargo Yöntemi + CTA */}
                <section className="py-20 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                            <i className="fas fa-rocket text-[#4DB848] text-2xl"></i>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight mb-4">En Kolay Yurtdışı Kargo Yöntemi</h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                            AdoreGo ile yurtdışı kargo göndermek hiç bu kadar kolay olmamıştı. Hemen ücretsiz üye olun, dakikalar içinde ilk gönderinizi oluşturun.
                        </p>
                        <a
                            href="https://app.adorelgo.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#4DB848] hover:bg-[#3da33a] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
                        >
                            Hemen Başla
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

export default IntlShippingGuide;
