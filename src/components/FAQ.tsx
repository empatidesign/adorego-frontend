
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../api-config';

const FAQ: React.FC = () => {
  const { currentLang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
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
        {
          id: "1",
          question: "Kargo ücreti nasıl hesaplanır?",
          answer: "Kargo ücretleri ağırlık, hacim ve gönderim ülkesine göre değişmektedir. Fiyat hesaplama aracımızı kullanarak anında fiyat teklifi alabilirsiniz."
        },
        {
          id: "2",
          question: "Teslimat süresi ne kadar?",
          answer: "Teslimat süreleri ülkeye ve seçilen kargo servisine göre 2-7 iş günü arasında değişmektedir."
        },
        {
          id: "3",
          question: "Paketlerim sigortalı mı?",
          answer: "Evet, tüm gönderi paketleriniz otomatik olarak sigortalanmaktadır. Ek sigorta da tercih edebilirsiniz."
        },
        {
          id: "4",
          question: "Hangi ülkelere gönderim yapabiliyorum?",
          answer: "220'den fazla ülkeye kargo gönderimi yapabiliyoruz. Detaylı liste için popüler destinasyonlar bölümünü inceleyebilirsiniz."
        }
      ];
    } else {
      return [
        {
          id: "1",
          question: "How is the shipping cost calculated?",
          answer: "Shipping costs vary depending on weight, volume, and destination country. You can get an instant quote using our price calculator."
        },
        {
          id: "2",
          question: "How long is the delivery time?",
          answer: "Delivery times vary between 2-7 business days depending on the country and selected shipping service."
        },
        {
          id: "3",
          question: "Are my packages insured?",
          answer: "Yes, all your shipping packages are automatically insured. You can also opt for additional insurance."
        },
        {
          id: "4",
          question: "Which countries can I ship to?",
          answer: "We can ship to over 220 countries. Please check the popular destinations section for a detailed list."
        }
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
    <section className="py-24" id="sss">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="max-w-3xl mx-auto px-6">
        <header className="text-center mb-12">
          <span className="text-[#4DB848] font-bold text-[9px] uppercase tracking-[0.2em] mb-3 block">{header.badge}</span>
          <h2 className="text-3xl font-bold text-[#102477] tracking-tight">{header.title}</h2>
        </header>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <article key={faq.id} className="border border-slate-100 rounded-[10px] overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={openIndex === idx}
              >
                <h3 className="font-bold text-[#102477] text-sm">{faq.question}</h3>
                <i className={`fas fa-chevron-down text-[#4DB848] text-xs transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}></i>
              </button>
              {openIndex === idx && (
                <div className="p-5 bg-slate-50/50 text-slate-500 font-medium text-[13px] border-t border-slate-100 animate-fade-in">
                  <p>{faq.answer}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
