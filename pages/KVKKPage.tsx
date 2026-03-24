import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';

const KVKKPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="kvkk" />
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
                            <span>KVKK Aydınlatma Metni</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">KVKK Aydınlatma Metni</h1>
                        <p className="text-white/70 text-lg max-w-2xl">Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni</p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <div className="prose prose-gray max-w-none">
                            <p className="text-gray-600 text-base leading-relaxed mb-10">
                                İşbu metin, ADOREL LOJİSTİK KARGO TELEKOMÜNİKASYON BİLİŞİM YAZILIM İÇ VE DIŞ TİCARET A.Ş. – "app.adorelgo.com" kullanıcılarının KVKK'ya uygun olarak kişisel verilerinin işlenmesine ilişkin açık rızalarını almak amacıyla hazırlanmıştır.
                            </p>

                            {/* Section 1 */}
                            <h2 className="text-2xl font-bold text-[#102477] mb-6">1. KİŞİSEL VERİLERİN KORUNMASI</h2>

                            <div className="space-y-6 mb-12">
                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">1.1 Veri Sorumlusu</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu olarak ADOREL LOJİSTİK KARGO TELEKOMÜNİKASYON BİLİŞİM YAZILIM İÇ VE DIŞ TİCARET A.Ş. tarafından aşağıda açıklanan kapsamda işlenebilecektir.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">1.2 Kişisel Verilerin İşlenme Amacı</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        Kişisel verileriniz; hizmetlerimizin sunulması, sözleşme süreçlerinin yürütülmesi, müşteri ilişkileri yönetimi, lojistik ve kargo operasyonlarının gerçekleştirilmesi, yasal yükümlülüklerin yerine getirilmesi, fatura ve ödeme işlemlerinin yürütülmesi, iletişim faaliyetlerinin gerçekleştirilmesi amaçlarıyla işlenmektedir.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">1.3 İşlenen Kişisel Veriler</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        Ad, soyad, T.C. kimlik numarası, adres, telefon numarası, e-posta adresi, vergi numarası, banka hesap bilgileri, gönderi bilgileri, IP adresi, çerez verileri ve platform üzerindeki kullanım verileri işlenebilmektedir.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">1.4 Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        Kişisel verileriniz; web sitemiz, mobil uygulamamız, çağrı merkezimiz, e-posta ve fiziksel formlar aracılığıyla toplanmaktadır. Bu veriler KVKK'nın 5. ve 6. maddelerinde belirtilen sözleşmenin ifası, hukuki yükümlülük, meşru menfaat ve açık rıza hukuki sebeplerine dayanılarak işlenmektedir.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">1.5 Kişisel Verilerin Aktarılması</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        Kişisel verileriniz; kargo ve lojistik iş ortaklarımıza, yasal zorunluluk halinde kamu kurum ve kuruluşlarına, ödeme hizmeti sağlayıcılarına, hukuki danışmanlarımıza ve denetim firmalarına KVKK'nın 8. ve 9. maddelerinde belirtilen şartlara uygun olarak aktarılabilmektedir.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">1.6 Kişisel Verilerin Saklanma Süresi</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        Kişisel verileriniz, işlenme amaçlarının gerektirdiği süre boyunca ve yasal saklama süreleri dahilinde muhafaza edilmektedir. Saklama süresinin sona ermesinin ardından kişisel veriler silinir, yok edilir veya anonim hale getirilir.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">1.7 Veri Güvenliği</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        Şirketimiz, kişisel verilerin hukuka aykırı olarak işlenmesini ve erişilmesini önlemek ile verilerin muhafazasını sağlamak amacıyla uygun güvenlik düzeyini temin etmeye yönelik gerekli teknik ve idari tedbirleri almaktadır.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">1.8 Veri Sahibinin Hakları</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        KVKK'nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme haklarına sahipsiniz.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">1.9 Başvuru Yöntemi</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        Yukarıda belirtilen haklarınızı kullanmak için kimliğinizi tespit edici gerekli bilgiler ile birlikte talebinizi yazılı olarak veya Kişisel Verileri Koruma Kurulu tarafından belirlenen diğer yöntemlerle şirketimize iletebilirsiniz.
                                    </p>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <h2 className="text-2xl font-bold text-[#102477] mb-6">2. GİZLİLİK VE SIR SAKLAMA YÜKÜMLÜLÜĞÜ</h2>

                            <div className="space-y-6 mb-12">
                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">2.1 Gizlilik Taahhüdü</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        Şirketimiz, kullanıcılarına ait tüm kişisel ve ticari bilgileri gizli tutmayı taahhüt eder. Bu bilgiler, kullanıcının açık rızası olmaksızın üçüncü kişilerle paylaşılmaz.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">2.2 Çalışan Gizliliği</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        Şirket çalışanları, kullanıcı verilerine erişim yetkisi dahilinde gizlilik sözleşmesi imzalar ve bu bilgileri yalnızca iş süreçlerinin gerektirdiği ölçüde kullanır.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">2.3 Üçüncü Taraf Gizliliği</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        Hizmet sunumu kapsamında iş birliği yapılan üçüncü taraflar da gizlilik yükümlülüklerine tabidir ve bu yükümlülükler sözleşmelerle güvence altına alınmıştır.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">2.4 Veri Paylaşım Sınırları</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        Kullanıcı verileri, yalnızca hizmetin ifası için zorunlu olan hallerde ve yasal düzenlemeler çerçevesinde ilgili taraflarla paylaşılır.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">2.5 Bilgi Güvenliği Önlemleri</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        Şirketimiz, bilgi güvenliğini sağlamak amacıyla SSL şifreleme, güvenlik duvarı, erişim kontrolü ve düzenli güvenlik denetimleri gibi teknik önlemler uygulamaktadır.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">2.6 Veri İhlali Bildirimi</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        Olası bir veri ihlali durumunda, şirketimiz KVKK'nın 12. maddesi uyarınca en kısa sürede Kişisel Verileri Koruma Kurulu'na ve ilgili kişilere bildirimde bulunur.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">2.7 Çerez Politikası</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        Web sitemizde kullanılan çerezler hakkında detaylı bilgi çerez politikamızda yer almaktadır. Kullanıcılar, tarayıcı ayarları üzerinden çerez tercihlerini yönetebilir.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">2.8 Politika Güncellemeleri</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        İşbu aydınlatma metni, yasal düzenlemeler veya şirket politikalarındaki değişiklikler doğrultusunda güncellenebilir. Güncellemeler web sitemizde yayımlanarak kullanıcıların bilgisine sunulur.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-[#102477] mb-2">2.9 İletişim</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        KVKK kapsamındaki talepleriniz ve sorularınız için aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz.
                                    </p>
                                </div>
                            </div>

                            {/* Company Info */}
                            <div className="bg-slate-50 rounded-2xl p-10 border border-gray-100">
                                <h3 className="text-lg font-bold text-[#102477] mb-4">Şirket Bilgileri</h3>
                                <div className="space-y-2 text-gray-600 text-base">
                                    <p className="font-semibold text-[#102477]">ADOREL LOJİSTİK KARGO TELEKOMÜNİKASYON BİLİŞİM YAZILIM İÇ VE DIŞ TİCARET A.Ş.</p>
                                    <p>Bahçelievler Mah. 232. Sok. No: 6 Gölbaşı / Ankara – Türkiye</p>
                                    <p>
                                        <i className="fas fa-phone text-[#4DB848] mr-2"></i>
                                        0312 320 26 26
                                    </p>
                                    <p>
                                        <i className="fas fa-envelope text-[#4DB848] mr-2"></i>
                                        info@adorelgo.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default KVKKPage;
