import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';
import { API_BASE_URL } from '../api-config';
import { useLanguage } from '../contexts/LanguageContext';

const DEFAULT_GROUPS_TR = [
  { label: 'Üyelik & Ücretlendirme', ids: ['1','2','3','4','5'] },
  { label: 'Nasıl Gönderirim?', ids: ['6','7','8','9'] },
  { label: 'Kapıdan Alım – Kapıya Teslim', ids: ['10','11','12','13'] },
  { label: 'İlk Kez Yurtdışına Gönderenler', ids: ['14','15','16','17'] },
  { label: 'Gümrük & Evrak Rehberi', ids: ['18','19','20','21'] },
  { label: 'Büyük Paket (XL & Lojistik Gönderiler)', ids: ['22','23','24'] },
  { label: 'Alıcı Ödemeli Gönderi', ids: ['25','26','27'] },
  { label: 'İade & Geri Gönderim', ids: ['28','29','30','31'] },
  { label: 'Entegrasyon & Kullanım', ids: ['32','33','34'] },
  { label: 'Güven & Operasyon', ids: ['35','36','37','38'] },
];

const DEFAULT_GROUPS_EN = [
  { label: 'Membership & Pricing', ids: ['1','2','3','4','5'] },
  { label: 'How to Ship?', ids: ['6','7','8','9'] },
  { label: 'Door Pickup – Door Delivery', ids: ['10','11','12','13'] },
  { label: 'First-Time International Shippers', ids: ['14','15','16','17'] },
  { label: 'Customs & Document Guide', ids: ['18','19','20','21'] },
  { label: 'Large Packages (XL & Logistics)', ids: ['22','23','24'] },
  { label: 'Receiver-Pays Shipments', ids: ['25','26','27'] },
  { label: 'Returns & Reshipping', ids: ['28','29','30','31'] },
  { label: 'Integration & Usage', ids: ['32','33','34'] },
  { label: 'Trust & Operations', ids: ['35','36','37','38'] },
];

const DEFAULT_FAQS_TR = [
  { id: "1", question: "AdorelGO üyelik ücretli mi?", answer: "Hayır. Üyelik tamamen ücretsizdir." },
  { id: "2", question: "Aylık veya yıllık ücret var mı?", answer: "Hayır. Herhangi bir sabit ücret yoktur." },
  { id: "3", question: "Sadece gönderi yaptıkça mı ödeme yaparım?", answer: "Evet. Sadece kullandığınız gönderi kadar ödeme yaparsınız." },
  { id: "4", question: "Gizli ücret veya ekstra kesinti var mı?", answer: "Hayır. Tüm ücretler panelde şeffaf şekilde gösterilir." },
  { id: "5", question: "Fiyatlar neye göre belirlenir?", answer: "Desi, ağırlık, ülke ve kargo firmasına göre belirlenir." },
  { id: "6", question: "Yurtdışına nasıl kargo gönderirim?", answer: "AdorelGO paneline giriş yaparak ülke, ürün ve ağırlık bilgilerini girmeniz yeterlidir. Sistem size en uygun kargo seçeneklerini anında sunar." },
  { id: "7", question: "Gönderi oluşturmak ne kadar sürer?", answer: "Ortalama 1–2 dakika içinde gönderinizi oluşturabilirsiniz." },
  { id: "8", question: "Kargo firması seçmem gerekiyor mu?", answer: "Hayır. Sistem sizin için en uygun fiyat ve süreye sahip kargo firmasını otomatik önerir." },
  { id: "9", question: "Aynı anda birden fazla gönderi oluşturabilir miyim?", answer: "Evet. Toplu gönderi özelliği ile yüzlerce gönderiyi tek seferde oluşturabilirsiniz." },
  { id: "10", question: "Kargo kapıdan alınıyor mu?", answer: "Evet. Kargolarınız adresinizden alınır ve alıcının adresine teslim edilir." },
  { id: "11", question: "Şubeye gitmem gerekiyor mu?", answer: "Hayır. Tüm süreç kapınızdan yönetilir." },
  { id: "12", question: "Türkiye'nin her yerinden alım var mı?", answer: "Evet. Türkiye genelinde kapıdan alım yapılabilir." },
  { id: "13", question: "Aynı gün alım yapılır mı?", answer: "Yoğunluğa bağlı olarak aynı gün alım mümkündür." },
  { id: "14", question: "İlk kez gönderim yapıyorum, zor mu?", answer: "Hayır. Sistem sizi adım adım yönlendirir ve tüm süreci kolaylaştırır." },
  { id: "15", question: "Deneyimim yok, yine de gönderebilir miyim?", answer: "Evet. Hiç deneyiminiz olmasa bile birkaç dakika içinde gönderi oluşturabilirsiniz." },
  { id: "16", question: "Destek alabilir miyim?", answer: "Evet. Müşteri hizmetleri ve canlı destek ile süreç boyunca destek alabilirsiniz." },
  { id: "17", question: "Hangi ülkelere gönderim yapabilirim?", answer: "200'den fazla ülkeye gönderim yapabilirsiniz." },
  { id: "18", question: "Yurtdışı gönderimde hangi evraklar gerekir?", answer: "Genellikle fatura, ürün açıklaması ve değer bilgisi gereklidir." },
  { id: "19", question: "Evrakları kendim mi hazırlamalıyım?", answer: "Hayır. AdorelGO gerekli evrakları otomatik oluşturur." },
  { id: "20", question: "Gümrük işlemlerini kim yapar?", answer: "Kargo firması ve gümrük sistemi tarafından yürütülür." },
  { id: "21", question: "GTİP bilgisi gerekli mi?", answer: "Bazı ürünlerde gereklidir. Sistem bu konuda sizi yönlendirir." },
  { id: "22", question: "Büyük ve ağır ürün gönderimi yapabilir miyim?", answer: "Evet. 30 desi üzeri büyük (XL) gönderiler yapılabilir." },
  { id: "23", question: "Paletli veya hacimli yük gönderebilir miyim?", answer: "Evet. Lojistik taşımalar için özel çözümler sunulmaktadır." },
  { id: "24", question: "Mobilya, beyaz eşya gibi ürünler gönderilebilir mi?", answer: "Evet. Büyük hacimli ürünler gönderilebilir." },
  { id: "25", question: "Alıcı ödemeli gönderi yapabilir miyim?", answer: "Evet. Alıcı ödemeli kargo seçeneği mevcuttur." },
  { id: "26", question: "Yurtdışında alıcı ödeme var mı?", answer: "Bazı ülke ve hizmetlerde mümkündür." },
  { id: "27", question: "Alıcı ödeme nasıl çalışır?", answer: "Kargo ücreti teslim sırasında alıcı tarafından ödenir." },
  { id: "28", question: "Yurtdışı gönderiler iade olabilir mi?", answer: "Evet. Alıcı teslim almazsa gönderi iade edilir." },
  { id: "29", question: "İade sürecini nasıl takip ederim?", answer: "Panel üzerinden tüm süreçleri anlık takip edebilirsiniz." },
  { id: "30", question: "İade kargo ücreti kime aittir?", answer: "Genellikle göndericiye aittir." },
  { id: "31", question: "İade edilen ürün tekrar gönderilebilir mi?", answer: "Evet. Tekrar gönderim yapılabilir." },
  { id: "32", question: "E-ticaret sitem ile entegrasyon var mı?", answer: "Evet. Shopify, WooCommerce, İkas, Ticimax ve pazaryerleri ile entegrasyon vardır." },
  { id: "33", question: "Toplu gönderi oluşturabilir miyim?", answer: "Evet. Excel veya toplu yükleme ile gönderi oluşturabilirsiniz." },
  { id: "34", question: "Raporlama yapabilir miyim?", answer: "Evet. Gönderi ve tahsilat raporlarına ulaşabilirsiniz." },
  { id: "35", question: "Kargom kaybolursa ne olur?", answer: "Kargo firması tarafından tazmin süreci başlatılır." },
  { id: "36", question: "Kargom hasar görürse ne olur?", answer: "Hasar tutanağı ile tazmin işlemi yapılır." },
  { id: "37", question: "Gönderiler sigortalı mı?", answer: "Evet. Kargo firmalarının sigorta kapsamındadır." },
  { id: "38", question: "Kargoyu takip edebilir miyim?", answer: "Evet. Tüm gönderilerinizi anlık olarak takip edebilirsiniz." },
];

const DEFAULT_FAQS_EN = [
  { id: "1", question: "Is AdorelGO membership paid?", answer: "No. Membership is completely free." },
  { id: "2", question: "Is there a monthly or annual fee?", answer: "No. There are no fixed fees." },
  { id: "3", question: "Do I only pay when I ship?", answer: "Yes. You only pay for the shipments you use." },
  { id: "4", question: "Are there hidden fees or extra charges?", answer: "No. All fees are displayed transparently in the panel." },
  { id: "5", question: "How are prices determined?", answer: "Based on volumetric weight, actual weight, country, and carrier." },
  { id: "6", question: "How do I ship internationally?", answer: "Simply log in to the AdorelGO panel and enter the country, product, and weight details." },
  { id: "7", question: "How long does it take to create a shipment?", answer: "You can create your shipment in an average of 1–2 minutes." },
  { id: "8", question: "Do I need to choose a carrier?", answer: "No. The system automatically recommends the best carrier for you." },
  { id: "9", question: "Can I create multiple shipments at once?", answer: "Yes. With the bulk shipment feature, you can create hundreds of shipments at once." },
  { id: "10", question: "Is cargo picked up from the door?", answer: "Yes. Your shipments are picked up from your address and delivered to the recipient's address." },
  { id: "11", question: "Do I need to go to a branch?", answer: "No. The entire process is managed from your door." },
  { id: "12", question: "Is pickup available from anywhere in Turkey?", answer: "Yes. Door pickup is available throughout Turkey." },
  { id: "13", question: "Is same-day pickup possible?", answer: "Same-day pickup is possible depending on availability." },
  { id: "14", question: "I'm shipping for the first time, is it difficult?", answer: "No. The system guides you step by step." },
  { id: "15", question: "I have no experience, can I still ship?", answer: "Yes. Even without any experience, you can create a shipment in just a few minutes." },
  { id: "16", question: "Can I get support?", answer: "Yes. Customer service and live chat support are available." },
  { id: "17", question: "Which countries can I ship to?", answer: "You can ship to over 200 countries." },
  { id: "18", question: "What documents are required for international shipping?", answer: "Generally an invoice, product description, and value information are required." },
  { id: "19", question: "Do I need to prepare the documents myself?", answer: "No. AdorelGO automatically generates the required documents." },
  { id: "20", question: "Who handles customs procedures?", answer: "Handled by the carrier and customs system." },
  { id: "21", question: "Is HS code required?", answer: "Required for some products. The system will guide you." },
  { id: "22", question: "Can I ship large and heavy items?", answer: "Yes. Large (XL) shipments over 30 desi can be made." },
  { id: "23", question: "Can I ship palletized or bulky cargo?", answer: "Yes. Special solutions are available for logistics transport." },
  { id: "24", question: "Can furniture or home appliances be shipped?", answer: "Yes. Large volumetric items can be shipped." },
  { id: "25", question: "Can I send receiver-pays shipments?", answer: "Yes. The receiver-pays shipping option is available." },
  { id: "26", question: "Is receiver payment available internationally?", answer: "It is possible in some countries and services." },
  { id: "27", question: "How does receiver payment work?", answer: "The shipping fee is paid by the recipient upon delivery." },
  { id: "28", question: "Can international shipments be returned?", answer: "Yes. If the recipient does not accept delivery, the shipment is returned." },
  { id: "29", question: "How do I track the return process?", answer: "You can track all processes in real time through the panel." },
  { id: "30", question: "Who pays for the return shipping?", answer: "Generally the sender." },
  { id: "31", question: "Can a returned item be reshipped?", answer: "Yes. Reshipping is possible." },
  { id: "32", question: "Is there integration with my e-commerce site?", answer: "Yes. Integration with Shopify, WooCommerce, İkas, Ticimax, and marketplaces." },
  { id: "33", question: "Can I create bulk shipments?", answer: "Yes. You can create shipments via Excel or bulk upload." },
  { id: "34", question: "Can I generate reports?", answer: "Yes. Shipment and collection reports are available." },
  { id: "35", question: "What if my shipment is lost?", answer: "A compensation process is initiated by the carrier." },
  { id: "36", question: "What if my shipment is damaged?", answer: "Compensation is processed with a damage report." },
  { id: "37", question: "Are shipments insured?", answer: "Yes. Covered by the carriers' insurance." },
  { id: "38", question: "Can I track my shipment?", answer: "Yes. You can track all your shipments in real time." },
];

const FAQPage: React.FC = () => {
    const { currentLang } = useLanguage();
    const [header, setHeader] = useState<any>({ badge: 'BİLGİ MERKEZİ', title: 'Sıkça Sorulan Sorular', groups: null });
    const [faqs, setFaqs] = useState<any[]>([]);
    const [openGroup, setOpenGroup] = useState<number | null>(0);
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    useEffect(() => {
        setHeader(currentLang === 'tr'
            ? { badge: 'BİLGİ MERKEZİ', title: 'Sıkça Sorulan Sorular', groups: null }
            : { badge: 'INFORMATION CENTER', title: 'Frequently Asked Questions', groups: null });
        setFaqs([]);
        setOpenGroup(0);
        setOpenIndex(null);

        axios.get(`${API_BASE_URL}/content/faq-header?lang=${currentLang}`)
            .then(r => { if (r.data && Object.keys(r.data).length > 0) setHeader(r.data); })
            .catch(() => {});

        axios.get(`${API_BASE_URL}/content/faq?lang=${currentLang}`)
            .then(r => { if (r.data && Array.isArray(r.data) && r.data.length > 0) setFaqs(r.data); })
            .catch(() => {});
    }, [currentLang]);

    const allFaqs = faqs.length > 0 ? faqs : (currentLang === 'tr' ? DEFAULT_FAQS_TR : DEFAULT_FAQS_EN);
    const groups = header.groups || (currentLang === 'tr' ? DEFAULT_GROUPS_TR : DEFAULT_GROUPS_EN);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": allFaqs.map((f: any) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
    };

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            <SEO page="sikca-sorulan-sorular" />
            <Navbar />
            <main className="flex-grow pt-20">
                {/* Hero */}
                <section className="text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #102477 0%, #1a3a9e 50%, #102477 100%)', paddingTop: '28px', paddingBottom: '32px' }}>
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4DB848] rounded-full blur-[120px] -mr-48 -mt-48"></div>
                    </div>
                    <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
                        <nav className="flex items-center gap-2 text-sm opacity-60 mb-6">
                            <Link to="/" className="hover:opacity-100">{currentLang === 'tr' ? 'Anasayfa' : 'Home'}</Link>
                            <span>/</span>
                            <span>{header.title}</span>
                        </nav>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-[#4DB848] font-bold text-xs uppercase tracking-[0.2em]">{header.badge}</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{header.title}</h1>
                        <p className="text-white/60 text-base">
                            {currentLang === 'tr' ? `${groups.length} kategori · ${allFaqs.length} soru` : `${groups.length} categories · ${allFaqs.length} questions`}
                        </p>
                    </div>
                </section>

                {/* FAQ İçerik */}
                <section className="py-16 bg-white">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <div className="space-y-3">
                            {groups.map((g: any, gi: number) => {
                                const groupFaqs = allFaqs.filter((f: any) => g.ids.includes(f.id));
                                if (groupFaqs.length === 0) return null;
                                const isGroupOpen = openGroup === gi;
                                return (
                                    <div key={gi} className={`rounded-2xl overflow-hidden border transition-all duration-200 ${isGroupOpen ? 'border-[#102477]/20 shadow-md' : 'border-slate-100 shadow-sm'}`}>
                                        <button
                                            onClick={() => setOpenGroup(isGroupOpen ? null : gi)}
                                            className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors ${isGroupOpen ? 'bg-[#102477]' : 'bg-white hover:bg-slate-50'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${isGroupOpen ? 'bg-[#4DB848]' : 'bg-slate-300'}`} />
                                                <span className={`font-bold text-sm ${isGroupOpen ? 'text-white' : 'text-[#102477]'}`}>{g.label}</span>
                                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isGroupOpen ? 'bg-white/20 text-white/80' : 'bg-slate-100 text-slate-400'}`}>{groupFaqs.length}</span>
                                            </div>
                                            <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${isGroupOpen ? 'rotate-180 text-white/60' : 'text-slate-400'}`}></i>
                                        </button>
                                        {isGroupOpen && (
                                            <div className="bg-white">
                                                {groupFaqs.map((faq: any, fi: number) => (
                                                    <article key={faq.id} className={fi > 0 ? 'border-t border-slate-50' : ''}>
                                                        <button
                                                            onClick={() => setOpenIndex(openIndex === faq.id ? null : faq.id)}
                                                            className="w-full flex items-start justify-between px-6 py-4 text-left hover:bg-slate-50/80 transition-colors group"
                                                        >
                                                            <h3 className={`font-semibold text-sm pr-6 leading-snug transition-colors ${openIndex === faq.id ? 'text-[#4DB848]' : 'text-slate-700 group-hover:text-[#102477]'}`}>
                                                                {faq.question}
                                                            </h3>
                                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${openIndex === faq.id ? 'bg-[#4DB848]' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
                                                                <i className={`fas fa-chevron-down text-[9px] transition-transform duration-200 ${openIndex === faq.id ? 'rotate-180 text-white' : 'text-slate-400'}`}></i>
                                                            </div>
                                                        </button>
                                                        {openIndex === faq.id && (
                                                            <div className="px-6 pb-5 -mt-1">
                                                                <div className="text-slate-500 text-[13px] leading-relaxed border-l-2 border-[#4DB848]/30 pl-4">
                                                                    {faq.answer}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </article>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA */}
                        <div className="mt-16 bg-gradient-to-r from-[#102477] to-[#1a3a9e] rounded-2xl p-10 text-center text-white">
                            <h3 className="text-2xl font-bold mb-3">
                                {currentLang === 'tr' ? 'Aradığınız cevabı bulamadınız mı?' : "Couldn't find the answer?"}
                            </h3>
                            <p className="text-white/70 mb-8">
                                {currentLang === 'tr' ? 'Destek ekibimiz size yardımcı olmaktan memnuniyet duyar.' : 'Our support team is happy to help you.'}
                            </p>
                            <Link to="/iletisim" className="inline-flex items-center gap-3 bg-[#4DB848] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3da03a] transition-all hover:-translate-y-1 shadow-lg text-base">
                                {currentLang === 'tr' ? 'İletişime Geç' : 'Contact Us'}
                                <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer /><WhatsAppButton />
        </div>
    );
};

export default FAQPage;
