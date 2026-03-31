import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';
import { API_BASE_URL } from '../api-config';
import { useLanguage } from '../contexts/LanguageContext';

function deepMerge(defaults: any, override: any): any {
  if (override === null || override === undefined) return defaults;
  if (Array.isArray(defaults)) return Array.isArray(override) && override.length > 0 ? override : defaults;
  if (typeof override === 'string') return override !== '' ? override : (defaults ?? override);
  if (typeof override !== 'object' || typeof defaults !== 'object') return override ?? defaults;
  const result = { ...defaults };
  for (const key of Object.keys(override)) {
    if (override[key] !== null && override[key] !== undefined) {
      result[key] = deepMerge(defaults[key], override[key]);
    }
  }
  return result;
}

const getFirstTimeAbroadDefaults = (lang: 'tr' | 'en') => (
  lang === 'tr'
    ? {
        breadcrumbHome: 'Anasayfa',
        breadcrumbParent: 'Yurtdışı Kargo',
        stepLabel: 'Adım',
        hero: {
          title: 'İlk Kez Yurtdışına Gönderenler',
          subtitle: 'Daha önce hiç yurtdışına göndermeyenler için adım adım rehber. Sistem seni yönlendirir, sen sadece paketi hazırla.',
        },
        intro: {
          title: 'İlk Gönderim En Kolayıdır',
          text: 'Adorelgo ile yurtdışına ilk gönderimin adım adım nasıl yapıldığını öğren. Büyük firma olman gerekmez, karmaşık süreçlerle uğraşman da.',
        },
        steps: {
          title: 'İlk Gönderimin Adımları',
          items: [
            { icon: 'fa-user-plus', title: 'Üye Ol', desc: 'Birkaç dakikada ücretsiz hesabını oluştur. Herhangi bir evrak ya da onay süreci gerekmez.' },
            { icon: 'fa-box', title: 'Paketini Hazırla', desc: 'Ne gönderdiğini sisteme gir. Hangi ambalajın uygun olduğunu sistem sana söyler.' },
            { icon: 'fa-file-alt', title: 'Bilgileri Gir', desc: 'Alıcı adresini ve içerik bilgilerini gir. Gümrük için gereken evrakları sistem otomatik oluşturur.' },
            { icon: 'fa-credit-card', title: 'Ödeme Yap', desc: 'Kargo ücretini öde. Fiyat önceden nettir, gizli ücret yoktur.' },
            { icon: 'fa-truck', title: 'Kargonu Ver', desc: 'En yakın şubeye götür ya da kapıdan alım seç.' },
          ],
        },
        faq: {
          title: 'İlk Kez Gönderenler Ne Sorar?',
          items: [
            { q: 'Her şeyi yurtdışına gönderebilir miyim?', a: 'Yasak ve kısıtlı ürünler dışında evet. Sistem gönderdiğin ürünün yasak olup olmadığını kontrol eder.' },
            { q: 'Gümrük çok karmaşık değil mi?', a: 'Artık değil. Sistem gerekli beyan formlarını senin için doldurur.' },
            { q: 'Ne kadar sürer?', a: 'Ekonomik kargolar 5-15 iş günü, express kargolar 2-5 iş günü içinde teslim edilir.' },
            { q: 'Paketin kaybolursa ne olur?', a: 'Tüm gönderiler sigorta kapsamındadır. Kayıp ya da hasar durumunda tazminat sürecini biz yönetiriz.' },
          ],
        },
        cta: {
          title: 'İlk Gönderini Şimdi Yap',
          subtitle: 'Üye ol, sisteme gir ve ilk gönderini dakikalar içinde oluştur.',
          buttonText: 'Hemen Başla',
          buttonUrl: 'https://app.adorelgo.com',
        },
      }
    : {
        breadcrumbHome: 'Home',
        breadcrumbParent: 'International Shipping',
        stepLabel: 'Step',
        hero: {
          title: 'Sending Abroad for the First Time',
          subtitle: 'A step-by-step guide for first-time international senders. The system guides you, you just prepare the package.',
        },
        intro: {
          title: 'Your First Shipment Is the Easiest',
          text: 'Learn how to create your first international shipment step by step with AdorelGo. You do not need to be a big company or deal with complex processes.',
        },
        steps: {
          title: 'Steps for Your First Shipment',
          items: [
            { icon: 'fa-user-plus', title: 'Sign Up', desc: 'Create your free account in just a few minutes. No paperwork or approval process is required.' },
            { icon: 'fa-box', title: 'Prepare Your Package', desc: 'Enter what you are sending into the system. It helps you choose the right packaging.' },
            { icon: 'fa-file-alt', title: 'Enter the Details', desc: 'Add the recipient address and shipment details. The system automatically prepares the required customs documents.' },
            { icon: 'fa-credit-card', title: 'Make Payment', desc: 'Pay the shipping fee. The price is clear in advance, with no hidden charges.' },
            { icon: 'fa-truck', title: 'Hand Over the Shipment', desc: 'Drop it off at the nearest branch or choose door pickup.' },
          ],
        },
        faq: {
          title: 'What Do First-Time Senders Ask?',
          items: [
            { q: 'Can I send anything abroad?', a: 'Yes, except prohibited and restricted items. The system checks whether your item is allowed.' },
            { q: 'Is customs very complicated?', a: 'Not anymore. The system fills in the required declaration forms for you.' },
            { q: 'How long does it take?', a: 'Economy shipments are usually delivered within 5-15 business days, while express shipments take 2-5 business days.' },
            { q: 'What if the package gets lost?', a: 'All shipments are covered by insurance. We manage the compensation process in case of loss or damage.' },
          ],
        },
        cta: {
          title: 'Create Your First Shipment Now',
          subtitle: 'Sign up, enter your shipment details, and create your first shipment within minutes.',
          buttonText: 'Get Started',
          buttonUrl: 'https://app.adorelgo.com',
        },
      }
);

const stepColors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500', 'bg-red-500'];

const FirstTimeAbroadPage: React.FC = () => {
  const { currentLang } = useLanguage();
  const defaults = getFirstTimeAbroadDefaults(currentLang);
  const [data, setData] = useState<any>(defaults);

  useEffect(() => {
    setData(defaults);
    axios.get(`${API_BASE_URL}/content/page/ilk-kez-yurtdisina-gondermek?lang=${currentLang}`)
      .then(res => { if (res.data) setData(deepMerge(defaults, res.data)); })
      .catch(() => {});
  }, [currentLang]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <SEO page="ilk-kez-yurtdisina-gondermek" />
      <Navbar />
      <main className="flex-grow pt-20">

        {/* Hero */}
        <section className="text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #102477 0%, #1a3a9e 50%, #102477 100%)', paddingTop: '28px', paddingBottom: '24px' }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4DB848] rounded-full blur-[120px] -mr-48 -mt-48"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
            <nav className="flex items-center gap-2 text-sm opacity-60 mb-6">
              <Link to="/" className="hover:opacity-100">{defaults.breadcrumbHome}</Link>
              <span>/</span>
              <Link to="/yurtdisi-kargo" className="hover:opacity-100">{defaults.breadcrumbParent}</Link>
              <span>/</span>
              <span>{data.hero.title}</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{data.hero.title}</h1>
            <p className="text-white/70 text-lg max-w-2xl">{data.hero.subtitle}</p>
          </div>
        </section>

        {/* Giriş */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-play text-green-600 text-2xl"></i>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight mb-4">{data.intro.title}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{data.intro.text}</p>
          </div>
        </section>

        {/* Adımlar */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#102477] text-center mb-10">{data.steps.title}</h2>
            <div className="space-y-6">
              {(data.steps.items || []).map((item: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-5 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 ${stepColors[i % stepColors.length]} rounded-xl flex items-center justify-center flex-shrink-0 mt-1`}>
                    <i className={`fas ${item.icon} text-white text-lg`}></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{defaults.stepLabel} {i + 1}</div>
                    <h3 className="font-bold text-[#102477] text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#102477] text-center mb-10">{data.faq.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data.faq.items || []).map((item: any, i: number) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-[#102477] mb-2 flex items-start gap-2">
                    <i className="fas fa-circle-question text-[#4DB848] mt-0.5 flex-shrink-0"></i>
                    {item.q}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed pl-6">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-6 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">{data.cta.title}</h2>
            <p className="text-white/70 text-lg mb-8">{data.cta.subtitle}</p>
            <a href={data.cta.buttonUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#4DB848] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3da03a] transition-all hover:-translate-y-1 shadow-lg text-base">
              {data.cta.buttonText}
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

export default FirstTimeAbroadPage;
