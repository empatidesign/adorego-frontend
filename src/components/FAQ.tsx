
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../api-config';

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

const FAQ: React.FC = () => {
  const { currentLang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<number | null>(0);
  
  const getDefaultHeader = (lang: string) => {
    if (lang === 'tr') {
      return {
        badge: 'BİLGİ MERKEZİ',
        title: 'Sıkça Sorulan Sorular'
      };
    } else {
      return {
        badge: 'INFORMATION CENTER',
        title: 'Frequently Asked Questions'
      };
    }
  };

  const [header, setHeader] = useState(getDefaultHeader(currentLang));
  
  const getDefaultFaqs = () => {
    if (currentLang === 'tr') {
      return [
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
        { id: "38", question: "Kargoyu takip edebilir miyim?", answer: "Evet. Tüm gönderilerinizi anlık olarak takip edebilirsiniz." }
      ];
    } else {
      return [
        { id: "1", question: "Is AdorelGO membership paid?", answer: "No. Membership is completely free." },
        { id: "2", question: "Is there a monthly or annual fee?", answer: "No. There are no fixed fees." },
        { id: "3", question: "Do I only pay when I ship?", answer: "Yes. You only pay for the shipments you use." },
        { id: "4", question: "Are there hidden fees or extra charges?", answer: "No. All fees are displayed transparently in the panel." },
        { id: "5", question: "How are prices determined?", answer: "Based on volumetric weight, actual weight, country, and carrier." },
        { id: "6", question: "How do I ship internationally?", answer: "Simply log in to the AdorelGO panel and enter the country, product, and weight details. The system instantly presents you with the best shipping options." },
        { id: "7", question: "How long does it take to create a shipment?", answer: "You can create your shipment in an average of 1–2 minutes." },
        { id: "8", question: "Do I need to choose a carrier?", answer: "No. The system automatically recommends the carrier with the best price and delivery time for you." },
        { id: "9", question: "Can I create multiple shipments at once?", answer: "Yes. With the bulk shipment feature, you can create hundreds of shipments at once." },
        { id: "10", question: "Is cargo picked up from the door?", answer: "Yes. Your shipments are picked up from your address and delivered to the recipient's address." },
        { id: "11", question: "Do I need to go to a branch?", answer: "No. The entire process is managed from your door." },
        { id: "12", question: "Is pickup available from anywhere in Turkey?", answer: "Yes. Door pickup is available throughout Turkey." },
        { id: "13", question: "Is same-day pickup possible?", answer: "Same-day pickup is possible depending on availability." },
        { id: "14", question: "I'm shipping for the first time, is it difficult?", answer: "No. The system guides you step by step and simplifies the entire process." },
        { id: "15", question: "I have no experience, can I still ship?", answer: "Yes. Even without any experience, you can create a shipment in just a few minutes." },
        { id: "16", question: "Can I get support?", answer: "Yes. You can get support throughout the process via customer service and live chat." },
        { id: "17", question: "Which countries can I ship to?", answer: "You can ship to over 200 countries." },
        { id: "18", question: "What documents are required for international shipping?", answer: "Generally an invoice, product description, and value information are required." },
        { id: "19", question: "Do I need to prepare the documents myself?", answer: "No. AdorelGO automatically generates the required documents." },
        { id: "20", question: "Who handles customs procedures?", answer: "Handled by the carrier and customs system." },
        { id: "21", question: "Is HS code required?", answer: "Required for some products. The system will guide you on this." },
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
        { id: "32", question: "Is there integration with my e-commerce site?", answer: "Yes. Integration is available with Shopify, WooCommerce, İkas, Ticimax, and marketplaces." },
        { id: "33", question: "Can I create bulk shipments?", answer: "Yes. You can create shipments via Excel or bulk upload." },
        { id: "34", question: "Can I generate reports?", answer: "Yes. Shipment and collection reports are available." },
        { id: "35", question: "What if my shipment is lost?", answer: "A compensation process is initiated by the carrier." },
        { id: "36", question: "What if my shipment is damaged?", answer: "Compensation is processed with a damage report." },
        { id: "37", question: "Are shipments insured?", answer: "Yes. Covered by the carriers' insurance." },
        { id: "38", question: "Can I track my shipment?", answer: "Yes. You can track all your shipments in real time." }
      ];
    }
  };
  
  const [faqs, setFaqs] = useState<any[]>(getDefaultFaqs());

  useEffect(() => {
    // FAQ Header yükle
    axios.get(`${API_BASE_URL}/content/faq-header?lang=${currentLang}`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setHeader(res.data);
        } else {
          setHeader(getDefaultHeader(currentLang));
        }
      })
      .catch(err => {
        console.error('FAQ header yüklenemedi:', err);
        setHeader(getDefaultHeader(currentLang));
      });

    // FAQ items yükle
    axios.get(`${API_BASE_URL}/content/faq?lang=${currentLang}`)
      .then(res => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setFaqs(res.data);
        } else {
          setFaqs(getDefaultFaqs());
        }
      })
      .catch(err => {
        console.error('FAQ content yüklenemedi:', err);
        setFaqs(getDefaultFaqs());
      });
  }, [currentLang]);

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-8 md:py-24" id="sss">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="max-w-3xl mx-auto px-6">
        <header className="text-center mb-12">
          <span className="text-[#4DB848] font-bold text-[9px] uppercase tracking-[0.2em] mb-3 block">{header.badge}</span>
          <h2 className="inline-block text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight bg-gray-100 px-8 py-3 rounded-2xl">{header.title}</h2>
        </header>
        <div className="space-y-3">
          {(header.groups || (currentLang === 'tr' ? DEFAULT_GROUPS_TR : DEFAULT_GROUPS_EN)).map((g: any, gi: number) => {
            const groupFaqs = faqs.filter((f: any) => g.ids.includes(f.id));
            if (groupFaqs.length === 0) return null;
            const isGroupOpen = openGroup === gi;
            return (
              <div key={gi} className={`rounded-2xl overflow-hidden border transition-all duration-200 ${isGroupOpen ? 'border-[#102477]/20 shadow-md' : 'border-slate-100 shadow-sm'}`}>
                {/* Grup Başlığı */}
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

                {/* Sorular */}
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
                            <div className="pl-0 text-slate-500 text-[13px] leading-relaxed border-l-2 border-[#4DB848]/30 pl-4">
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
      </div>
    </section>
  );
};

export default FAQ;
