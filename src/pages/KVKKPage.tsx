import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';
import { API_BASE_URL } from '../api-config';
import { useLanguage } from '../contexts/LanguageContext';

const DEFAULT_SECTIONS = [
    {
        type: 'text',
        content: `<p>İşbu metin, ADOREL LOJİSTİK KARGO TELEKOMÜNİKASYON BİLİŞİM YAZILIM İÇ VE DIŞ TİCARET A.Ş. – "app.adorelgo.com" kullanıcılarının KVKK'ya uygun olarak kişisel verilerinin işlenmesine ilişkin açık rızalarını almak amacıyla hazırlanmıştır.</p>`
    },
    { type: 'heading', content: '1. KİŞİSEL VERİLERİN KORUNMASI' },
    { type: 'heading', content: '1.1 Veri Sorumlusu' },
    { type: 'text', content: `<p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu olarak ADOREL LOJİSTİK KARGO TELEKOMÜNİKASYON BİLİŞİM YAZILIM İÇ VE DIŞ TİCARET A.Ş. tarafından aşağıda açıklanan kapsamda işlenebilecektir.</p>` },
    { type: 'heading', content: '1.2 Kişisel Verilerin İşlenme Amacı' },
    { type: 'text', content: `<p>Kişisel verileriniz; hizmetlerimizin sunulması, sözleşme süreçlerinin yürütülmesi, müşteri ilişkileri yönetimi, lojistik ve kargo operasyonlarının gerçekleştirilmesi, yasal yükümlülüklerin yerine getirilmesi, fatura ve ödeme işlemlerinin yürütülmesi, iletişim faaliyetlerinin gerçekleştirilmesi amaçlarıyla işlenmektedir.</p>` },
    { type: 'heading', content: '1.3 İşlenen Kişisel Veriler' },
    { type: 'text', content: `<p>Ad, soyad, T.C. kimlik numarası, adres, telefon numarası, e-posta adresi, vergi numarası, banka hesap bilgileri, gönderi bilgileri, IP adresi, çerez verileri ve platform üzerindeki kullanım verileri işlenebilmektedir.</p>` },
    { type: 'heading', content: '1.4 Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi' },
    { type: 'text', content: `<p>Kişisel verileriniz; web sitemiz, mobil uygulamamız, çağrı merkezimiz, e-posta ve fiziksel formlar aracılığıyla toplanmaktadır. Bu veriler KVKK'nın 5. ve 6. maddelerinde belirtilen sözleşmenin ifası, hukuki yükümlülük, meşru menfaat ve açık rıza hukuki sebeplerine dayanılarak işlenmektedir.</p>` },
    { type: 'heading', content: '1.5 Kişisel Verilerin Aktarılması' },
    { type: 'text', content: `<p>Kişisel verileriniz; kargo ve lojistik iş ortaklarımıza, yasal zorunluluk halinde kamu kurum ve kuruluşlarına, ödeme hizmeti sağlayıcılarına, hukuki danışmanlarımıza ve denetim firmalarına KVKK'nın 8. ve 9. maddelerinde belirtilen şartlara uygun olarak aktarılabilmektedir.</p>` },
    { type: 'heading', content: '1.6 Kişisel Verilerin Saklanma Süresi' },
    { type: 'text', content: `<p>Kişisel verileriniz, işlenme amaçlarının gerektirdiği süre boyunca ve yasal saklama süreleri dahilinde muhafaza edilmektedir. Saklama süresinin sona ermesinin ardından kişisel veriler silinir, yok edilir veya anonim hale getirilir.</p>` },
    { type: 'heading', content: '1.7 Veri Güvenliği' },
    { type: 'text', content: `<p>Şirketimiz, kişisel verilerin hukuka aykırı olarak işlenmesini ve erişilmesini önlemek ile verilerin muhafazasını sağlamak amacıyla uygun güvenlik düzeyini temin etmeye yönelik gerekli teknik ve idari tedbirleri almaktadır.</p>` },
    { type: 'heading', content: '1.8 Veri Sahibinin Hakları' },
    { type: 'text', content: `<p>KVKK'nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme haklarına sahipsiniz.</p>` },
    { type: 'heading', content: '1.9 Başvuru Yöntemi' },
    { type: 'text', content: `<p>Yukarıda belirtilen haklarınızı kullanmak için kimliğinizi tespit edici gerekli bilgiler ile birlikte talebinizi yazılı olarak veya Kişisel Verileri Koruma Kurulu tarafından belirlenen diğer yöntemlerle şirketimize iletebilirsiniz.</p>` },
    { type: 'heading', content: '2. GİZLİLİK VE SIR SAKLAMA YÜKÜMLÜLÜĞÜ' },
    { type: 'heading', content: '2.1 Gizlilik Taahhüdü' },
    { type: 'text', content: `<p>Şirketimiz, kullanıcılarına ait tüm kişisel ve ticari bilgileri gizli tutmayı taahhüt eder. Bu bilgiler, kullanıcının açık rızası olmaksızın üçüncü kişilerle paylaşılmaz.</p>` },
    { type: 'heading', content: '2.9 İletişim' },
    { type: 'text', content: `<p>KVKK kapsamındaki talepleriniz ve sorularınız için aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz.</p><br/><p><strong>ADOREL LOJİSTİK KARGO TELEKOMÜNİKASYON BİLİŞİM YAZILIM İÇ VE DIŞ TİCARET A.Ş.</strong><br/>Bahçelievler Mah. 232. Sok. No: 6 Gölbaşı / Ankara – Türkiye<br/>Tel: 0312 320 26 26<br/>E-posta: info@adorelgo.com</p>` },
];

const KVKKPage: React.FC = () => {
    const { currentLang } = useLanguage();
    const [cms, setCms] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/content/page/kvkk?lang=${currentLang}`)
            .then(r => { if (r.data && Object.keys(r.data).length > 0) setCms(r.data); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [currentLang]);

    const title = cms?.title || 'KVKK Aydınlatma Metni';
    const subtitle = cms?.description || 'Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni';
    const sections: any[] = (cms?.sections && cms.sections.length > 0) ? cms.sections : DEFAULT_SECTIONS;

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <SEO page="kvkk" />
            <Navbar />
            <main className="flex-grow pt-20">
                {/* Hero */}
                <section className="text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #102477 0%, #1a3a9e 50%, #102477 100%)', paddingTop: '100px', paddingBottom: '80px' }}>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4DB848] rounded-full blur-[120px] -mr-48 -mt-48"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                        <nav className="flex items-center gap-2 text-sm opacity-60 mb-6">
                            <Link to="/" className="hover:opacity-100">Anasayfa</Link>
                            <span>/</span>
                            <span>{title}</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{title}</h1>
                        <p className="text-white/70 text-lg max-w-2xl">{subtitle}</p>
                    </div>
                </section>

                {/* İçerik */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-6 h-6 border-2 border-[#102477] border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {sections.map((section: any, idx: number) => (
                                    <div key={idx}>
                                        {section.type === 'heading' && (
                                            <h2 className="text-xl font-bold text-[#102477] mt-8 mb-2">{section.content}</h2>
                                        )}
                                        {section.type === 'text' && (
                                            <div className="text-gray-600 leading-relaxed prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
                                        )}
                                        {section.type === 'list' && (
                                            <ul className="space-y-3 ml-2">
                                                {section.items?.map((item: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-3 text-gray-600">
                                                        <i className="fas fa-check-circle text-[#4DB848] mt-1 shrink-0"></i>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {section.type === 'card-grid' && (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
                                                {section.cards?.map((card: any, i: number) => (
                                                    <div key={i} className="bg-slate-50 rounded-xl p-6 border border-gray-100">
                                                        {card.icon && <div className="w-10 h-10 bg-[#102477]/10 rounded-lg flex items-center justify-center mb-3"><i className={`fas ${card.icon} text-[#102477]`}></i></div>}
                                                        <h3 className="font-bold text-[#102477] mb-2">{card.title}</h3>
                                                        <p className="text-gray-600 text-sm">{card.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default KVKKPage;
