import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';
import axios from 'axios';
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

const getDefault = (lang: string) => ({
  hero: {
    title: lang === 'tr' ? 'Yurtdışı Kargo' : 'International Shipping',
    subtitle: lang === 'tr' ? 'Dünyaya gönderim yapmanın en kolay ve güvenilir yolu' : 'The easiest and most reliable way to ship worldwide',
  },
  kargoTypes: [
    {
      id: '1', title: 'Ekonomik Kargo', subtitle: 'Uygun Fiyatlı Yurtdışı Gönderim',
      description: 'Acil olmayan gönderiler için en düşük maliyetli yurtdışı kargo seçeneği.',
      highlight: 'Ekonomik Kargo ile yurtdışı gönderi yapanlar, yurtiçi kargolarında daha avantajlı fiyatlar görür.',
      icon: 'fa-coins', color: 'bg-blue-500',
    },
    {
      id: '2', title: 'Express Kargo', subtitle: 'Zaman senin için önemliyse',
      description: 'Yurtdışı gönderini en hızlı şekilde ulaştıran seçenek.',
      highlight: 'Zamanı öncelikleyen, değerli ve acil gönderiler için idealdir.',
      icon: 'fa-bolt', color: 'bg-green-500',
    },
  ],
  doorToDoor: {
    title: 'Kapıdan Alım – Kapıya Teslim',
    description: 'Yurtdışına satış yapanlar için kapıdan alım – kapıya teslim, uygun fiyatlı ve sorunsuz kargo çözümleri.',
  },
  firstTimers: {
    title: 'İlk Kez Yurtdışına',
    titleHighlight: 'Gönderenler',
    subtitle: 'Daha önce hiç yurtdışına göndermeyenler rahatça kullanabilir.',
    cards: [
      { id: '1', title: 'İlk gönderim en kolayıdır.', description: 'İlk kez gönderiyorsan, sistem seni adım adım yönlendirir.', icon: 'fa-play', color: 'bg-blue-500' },
      { id: '2', title: 'Gümrük & Evrak = Korku Değil Rahatlama', description: 'Bilmen gereken kadarını bil, gerisini sisteme bırak. Karmaşık evraklar, yanlış ürünler, eksik bilgiler… Sistem gerekli olanı sana sorar, gerisini biz takip ederiz.', icon: 'fa-file-shield', color: 'bg-green-500' },
      { id: '3', title: 'Yurtdışı İade & Geri Gönderim', description: 'Teslim edilemeyen yurtdışı gönderilerde iade ve geri gönderim süreci kontrol altındadır. İade veya geri dönüş durumları panelden takip edilir. Gönderin yolda kalırsa, süreci biz yönetiriz.', icon: 'fa-rotate-left', color: 'bg-purple-500' },
    ],
  },
  microExport: {
    title: 'Mikro İhracat',
    titleHighlight: 'Satış Amaçlı Gönderimler',
    description: 'Yurtdışına ürün satışı yapıyorsan, kargonu mikro ihracata uygun olarak gönder.',
    bullets: ['Büyük firma olman gerekmez.', 'Küçük adetli satışlar için de mikro ihracat yapılabilir.'],
    image: '',
  },
  whichShipping: {
    title: 'Hangi Gönderim',
    titleHighlight: 'Bana Uygun?',
    subtitle: 'Kararsızsan sorun değil. Sistem, gönderinin aciliyet ve önceliğine göre en uygun gönderimi seçer.',
    options: [
      { id: '1', label: 'Fiyat Öncelikliyse', title: 'Ekonomik Kargo', icon: 'fa-coins', color: 'bg-blue-500' },
      { id: '2', label: 'Hız Öncelikliyse', title: 'Express Kargo', icon: 'fa-bolt', color: 'bg-green-500' },
      { id: '3', label: 'Satış Amaçlıysa', title: 'Mikro İhracat Gönderimi', icon: 'fa-store', color: 'bg-orange-500' },
    ],
    bottomText: 'Seçmek zorunda değilsin. İhtiyacını söyle, gerisini bize bırak.',
    ctaText: 'Hemen Başla',
    ctaLink: 'https://app.adorelgo.com',
  },
});

const InternationalShipping: React.FC = () => {
  const { currentLang } = useLanguage();
  const [data, setData] = useState<any>(getDefault(currentLang));

  useEffect(() => {
    axios.get(`${API_BASE_URL}/content/international?lang=${currentLang}`)
      .then(res => {
        if (res.data && res.data.hero) setData(deepMerge(getDefault(currentLang), res.data));
        else setData(getDefault(currentLang));
      })
      .catch(() => setData(getDefault(currentLang)));
  }, [currentLang]);

  const imgUrl = (url: string) => url ? (url.startsWith('http') ? url : `${API_BASE_URL}${url}`) : '';

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <SEO page="yurtdisi-kargo" />
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
              <span>{data.hero.title}</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{data.hero.title}</h1>
            <p className="text-white/70 text-lg max-w-2xl">{data.hero.subtitle}</p>
          </div>
        </section>

        {/* Kargo Tipleri */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {(data.kargoTypes || []).map((k: any) => (
                <div key={k.id} className="bg-slate-50 rounded-2xl p-10 border border-gray-100 hover:shadow-lg transition-all">
                  <div className={`w-14 h-14 ${k.color || 'bg-blue-500'} rounded-xl flex items-center justify-center mb-6`}>
                    <i className={`fas ${k.icon} text-white text-xl`}></i>
                  </div>
                  <h2 className="text-2xl font-bold text-[#102477] mb-2 tracking-tight">{k.title}</h2>
                  <p className="text-[#4DB848] font-semibold text-sm mb-4">{k.subtitle}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{k.description}</p>
                  {k.highlight && (
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <p className="text-gray-500 text-sm leading-relaxed">{k.highlight}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kapıdan Alım */}
        <section className="py-20 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <i className="fas fa-truck text-[#4DB848] text-2xl"></i>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">{data.doorToDoor?.title}</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">{data.doorToDoor?.description}</p>
          </div>
        </section>

        {/* İlk Kez Gönderenler */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight mb-3">
                {data.firstTimers?.title} <span className="text-[#4DB848]">{data.firstTimers?.titleHighlight}</span>
              </h2>
              <p className="text-gray-500 text-base max-w-xl mx-auto">{data.firstTimers?.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(data.firstTimers?.cards || []).map((c: any) => (
                <div key={c.id} className="bg-slate-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all">
                  <div className={`w-12 h-12 ${c.color || 'bg-blue-500'} rounded-xl flex items-center justify-center mb-5`}>
                    <i className={`fas ${c.icon} text-white text-lg`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-[#102477] mb-3">{c.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.description}</p>
                </div>
              ))}
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
                  {data.microExport?.title} <span className="text-[#4DB848]">{data.microExport?.titleHighlight}</span>
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6">{data.microExport?.description}</p>
                <div className="space-y-3">
                  {(data.microExport?.bullets || []).map((b: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <i className="fas fa-check text-[#4DB848]"></i>
                      <p className="text-gray-700 text-sm font-medium">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                {imgUrl(data.microExport?.image) ? (
                  <img src={imgUrl(data.microExport?.image)} alt="" className="w-full rounded-2xl object-cover" />
                ) : (
                  <div className="bg-gradient-to-br from-[#102477] to-[#1a3a9e] rounded-2xl p-10 min-h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-image text-white/40 text-3xl"></i>
                      </div>
                      <p className="text-white/40 text-sm">Görsel Alanı</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Hangi Gönderim */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight mb-3">
                {data.whichShipping?.title} <span className="text-[#4DB848]">{data.whichShipping?.titleHighlight}</span>
              </h2>
              <p className="text-gray-500 text-base max-w-xl mx-auto">{data.whichShipping?.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {(data.whichShipping?.options || []).map((opt: any) => (
                <div key={opt.id} className="bg-slate-50 rounded-2xl p-8 text-center border border-gray-100 hover:shadow-lg hover:border-[#4DB848]/30 transition-all">
                  <div className={`w-14 h-14 ${opt.color || 'bg-blue-500'} rounded-xl flex items-center justify-center mx-auto mb-5`}>
                    <i className={`fas ${opt.icon} text-white text-xl`}></i>
                  </div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{opt.label}</p>
                  <h3 className="text-xl font-bold text-[#102477]">{opt.title}</h3>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-6">{data.whichShipping?.bottomText}</p>
              <a href={data.whichShipping?.ctaLink || 'https://app.adorelgo.com'} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#4DB848] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3da03a] transition-all hover:-translate-y-1 shadow-lg text-base">
                {data.whichShipping?.ctaText || 'Hemen Başla'}
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
