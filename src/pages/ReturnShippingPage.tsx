import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';
import { API_BASE_URL } from '../api-config';

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

const DEFAULT = {
  hero: {
    title: 'Yurtdışı İade & Geri Gönderim',
    subtitle: 'Teslim edilemeyen ya da iade edilen yurtdışı gönderilerinde süreci biz yönetiriz. Paniklemene gerek yok.',
  },
  intro: {
    title: 'İade Süreci Kontrol Altında',
    text: 'Teslim edilemeyen yurtdışı gönderilerde iade ve geri gönderim süreci adım adım takip edilir. İade veya geri dönüş durumları panelden görülebilir.',
  },
  scenarios: {
    title: 'Hangi Durumlarda İade Olur?',
    items: [
      { icon: 'fa-user-xmark', title: 'Alıcı Bulunamadı', desc: 'Alıcıya ulaşılamaz ya da teslim almazsa, kargo belirli süre sonra iade edilir.' },
      { icon: 'fa-ban', title: 'Gümrükte Ret', desc: 'Hedef ülke gümrüğünde kargo kabul edilmezse sistem seni bilgilendirir ve iade sürecini başlatır.' },
      { icon: 'fa-house-circle-xmark', title: 'Yanlış Adres', desc: 'Adres hatalıysa kargo teslim edilemez. Adres düzeltme veya iade seçenekleri sunulur.' },
      { icon: 'fa-rotate-left', title: 'Alıcı İadesi', desc: 'Alıcı ürünü iade etmek isterse, yurtdışından Türkiye\'ye geri gönderim süreci panelden yönetilir.' },
    ],
  },
  process: {
    title: 'İade Süreci Nasıl İşler?',
    steps: [
      { icon: 'fa-bell', title: 'Bildirim Al', desc: 'Kargon teslim edilemediğinde sana otomatik bildirim gönderilir.' },
      { icon: 'fa-list-check', title: 'Seçenek Sun', desc: 'Yeni adrese yönlendirme, bekleme süresi uzatma veya iade — seçenekler sunulur.' },
      { icon: 'fa-map-location-dot', title: 'Takip Et', desc: 'İade kargosu yola çıktığında panelden anlık olarak takip edebilirsin.' },
      { icon: 'fa-box-open', title: 'Teslim Al', desc: 'Kargo Türkiye\'deki adresine ulaştığında bildirim alırsın.' },
    ],
  },
  guarantees: {
    title: 'Güvenceler',
    items: [
      { icon: 'fa-shield-halved', title: 'Sigorta Kapsamı', desc: 'Tüm gönderiler sigortalıdır. İade sürecinde de sigorta geçerliliğini korur.' },
      { icon: 'fa-headset', title: '7/24 Destek', desc: 'İade sürecinde sorularını 7/24 destek hattımıza iletebilirsin.' },
      { icon: 'fa-clock-rotate-left', title: 'Hızlı İşlem', desc: 'İade taleplerinde en hızlı şekilde işlem başlatılır.' },
    ],
  },
  cta: {
    title: 'Sorun Çıkarsa Biz Varız',
    subtitle: 'İade ve geri gönderim süreçlerinde destek almak için bize ulaş.',
    buttonText: 'Panele Git',
    buttonUrl: 'https://app.adorelgo.com',
  },
};

const scenarioColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-purple-500'];
const processColors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500'];
const guaranteeColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'];

const ReturnShippingPage: React.FC = () => {
  const [data, setData] = useState<any>(DEFAULT);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/content/page/yurtdisi-iade-geri-gonderi`)
      .then(res => { if (res.data) setData(deepMerge(DEFAULT, res.data)); })
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <SEO page="yurtdisi-iade-geri-gonderi" />
      <Navbar />
      <main className="flex-grow pt-20">

        {/* Hero */}
        <section className="text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #102477 0%, #1a3a9e 50%, #102477 100%)', paddingTop: '28px', paddingBottom: '24px' }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4DB848] rounded-full blur-[120px] -mr-48 -mt-48"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
            <nav className="flex items-center gap-2 text-sm opacity-60 mb-6">
              <Link to="/" className="hover:opacity-100">Anasayfa</Link>
              <span>/</span>
              <Link to="/yurtdisi-kargo" className="hover:opacity-100">Yurtdışı Kargo</Link>
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
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-rotate-left text-purple-600 text-2xl"></i>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight mb-4">{data.intro.title}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{data.intro.text}</p>
          </div>
        </section>

        {/* Senaryolar */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#102477] text-center mb-10">{data.scenarios.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data.scenarios.items || []).map((item: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-5 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 ${scenarioColors[i % scenarioColors.length]} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <i className={`fas ${item.icon} text-white text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#102477] mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Süreç */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#102477] text-center mb-10">{data.process.title}</h2>
            <div className="space-y-6">
              {(data.process.steps || []).map((item: any, i: number) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-gray-100 flex gap-5 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 ${processColors[i % processColors.length]} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <i className={`fas ${item.icon} text-white text-lg`}></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Adım {i + 1}</div>
                    <h3 className="font-bold text-[#102477] text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Güvenceler */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#102477] text-center mb-10">{data.guarantees.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(data.guarantees.items || []).map((item: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 text-center hover:shadow-lg transition-all">
                  <div className={`w-12 h-12 ${guaranteeColors[i % guaranteeColors.length]} rounded-xl flex items-center justify-center mx-auto mb-5`}>
                    <i className={`fas ${item.icon} text-white text-lg`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-[#102477] mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">{data.cta.title}</h2>
            <p className="text-white/70 text-lg mb-8">{data.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={data.cta.buttonUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#4DB848] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3da03a] transition-all hover:-translate-y-1 shadow-lg text-base">
                {data.cta.buttonText}
                <i className="fas fa-arrow-right"></i>
              </a>
              <Link to="/iletisim"
                className="inline-flex items-center justify-center gap-3 bg-white/10 text-white font-bold px-10 py-4 rounded-xl hover:bg-white/20 transition-all text-base">
                İletişime Geç
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ReturnShippingPage;
