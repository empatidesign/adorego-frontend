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
    title: 'Gümrük & Evrak Rehberi',
    subtitle: 'Gümrük artık korku değil, rahatlama. Bilmen gereken kadarını bil, gerisini sisteme bırak.',
  },
  intro: {
    title: 'Gümrük = Korku Değil Rahatlama',
    text: 'Karmaşık evraklar, yanlış ürünler, eksik bilgiler… Sistem gerekli olanı sana sorar, gerisini biz takip ederiz. Sen sadece ürün bilgilerini doğru gir.',
  },
  documents: {
    title: 'Hangi Evraklar Gerekli?',
    items: [
      { icon: 'fa-file-invoice', title: 'Ticari Fatura (Commercial Invoice)', desc: 'Gönderilen ürünlerin listesi, değeri ve miktarını gösterir. Sistem bu formu otomatik oluşturur.' },
      { icon: 'fa-file-lines', title: 'Ambalaj Listesi (Packing List)', desc: 'Paketin içeriğini detaylandıran belgedir. Ticari gönderimler için zorunludur.' },
      { icon: 'fa-passport', title: 'Kimlik / Pasaport Fotokopisi', desc: 'Bazı ülkelere gönderimde gönderici kimlik bilgisi istenebilir. Sistem seni bilgilendirir.' },
      { icon: 'fa-certificate', title: 'Menşe Şahadetnamesi', desc: 'Ürünün üretildiği ülkeyi belgeler. Özellikle ticari gönderimler için bazı ülkeler talep eder.' },
    ],
  },
  systemHelp: {
    title: 'Sistem Seni Nasıl Yönlendirir?',
    items: [
      { icon: 'fa-magnifying-glass', title: 'Ürün Kontrolü', desc: 'Girdiğin ürünün hedef ülkeye girip giremeyeceğini sistem otomatik kontrol eder.' },
      { icon: 'fa-file-circle-check', title: 'Otomatik Form', desc: 'Gümrük beyan formları sistem tarafından otomatik doldurulur, hata riski en aza iner.' },
      { icon: 'fa-bell', title: 'Anlık Bildirim', desc: 'Kargon gümrükte bekletilirse anında bildirim alırsın, süreci biz takip ederiz.' },
    ],
  },
  faq: {
    title: 'Gümrük Hakkında Sık Sorulan Sorular',
    items: [
      { q: 'Her ülkeye her ürünü gönderebilir miyim?', a: 'Hayır. Bazı ülkelerin yasak ve kısıtlı ürün listeleri vardır. Sistem gönderdiğin ürünü kontrol eder ve seni uyarır.' },
      { q: 'Gümrük vergisini kim öder?', a: 'Genellikle alıcı öder. Ancak bazı gönderim tiplerinde vergiyi gönderici üstlenebilir. Bunu sistem sana sunar.' },
      { q: 'Beyan değerini düşük yazarsam ne olur?', a: 'Yanlış beyan ciddi yaptırımlar ve kargo iadesiyle sonuçlanabilir. Doğru değer girmek hem yasal hem de senin yararına.' },
      { q: 'Gümrükte sorun çıkarsa ne yapacağım?', a: 'Biz seni bilgilendiririz ve süreci sizin adınıza takip ederiz. Ekstra ücretsiz destek verilir.' },
    ],
  },
  cta: {
    title: 'Gümrüğü Bize Bırak',
    subtitle: 'Sisteme gir, ürün bilgilerini gir, gerisini biz halledelim.',
    buttonText: 'Hemen Başla',
    buttonUrl: 'https://app.adorelgo.com',
  },
};

const docColors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500'];
const sysColors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500'];

const CustomsGuidePage: React.FC = () => {
  const [data, setData] = useState<any>(DEFAULT);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/content/page/gumruk-evrak-rehberi`)
      .then(res => { if (res.data) setData(deepMerge(DEFAULT, res.data)); })
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <SEO page="gumruk-evrak-rehberi" />
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
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-file-shield text-green-600 text-2xl"></i>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight mb-4">{data.intro.title}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{data.intro.text}</p>
          </div>
        </section>

        {/* Evraklar */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#102477] text-center mb-10">{data.documents.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data.documents.items || []).map((item: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-5 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 ${docColors[i % docColors.length]} rounded-xl flex items-center justify-center flex-shrink-0`}>
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

        {/* Sistem */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#102477] text-center mb-10">{data.systemHelp.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(data.systemHelp.items || []).map((item: any, i: number) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-8 border border-gray-100 text-center hover:shadow-lg transition-all">
                  <div className={`w-12 h-12 ${sysColors[i % sysColors.length]} rounded-xl flex items-center justify-center mx-auto mb-5`}>
                    <i className={`fas ${item.icon} text-white text-lg`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-[#102477] mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SSS */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#102477] text-center mb-10">{data.faq.title}</h2>
            <div className="space-y-4">
              {(data.faq.items || []).map((item: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
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

export default CustomsGuidePage;
