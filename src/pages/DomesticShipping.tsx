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

const getDefault = () => ({
  hero: {
    title: 'Yurtiçi Kargo',
    subtitle: 'En uygun fiyatla, en hızlı şekilde yurtiçi gönderim',
  },
  kargoTypes: [
    {
      id: '1', title: 'Alıcı Ödemeli Lojistik', subtitle: 'Büyük Paketleri Cepten Ödeme Alıcı Ödesin',
      description: 'Mobilya, beyaz eşya, ağır ürünler için ideal çözüm. Yüksek maliyetli gönderimlerde cebinden ödeme yapmazsın.',
      highlight: 'Satışı yapar, kargo ücretini alıcıya bırakırsın.', icon: 'fa-hand-holding-dollar', color: 'bg-blue-500',
    },
    {
      id: '2', title: 'Kapıda Ödemeli Kargo', subtitle: 'Ürün Bedelini Teslimatta Tahsil Et',
      description: 'Gönderini kapıda ödemeli gönder. Ürün bedeli teslimat sırasında alıcıdan tahsil edilir.',
      highlight: 'Alıcı, teslimat sırasında nakit veya kredi kartı ile ödeme yapabilir.', icon: 'fa-money-bill-wave', color: 'bg-green-500',
    },
  ],
  specialPricing: {
    title: 'Yurtdışı Gönderenlere Özel Yurtiçi Fiyatlar',
    description: 'Yurtdışı gönderi yapan kullanıcılar, yurtiçi kargolarında otomatik olarak daha uygun fiyatlar görür.',
    note: 'Başvuru yok. Pazarlık yok. Sistem kendisi uygular.',
  },
  advantages: [
    { id: '1', title: 'Otomatik En Ucuz Yurtiçi Seçimi', description: 'Yurtiçi gönderilerde kargo firması seçmezsin. Sistem en uygun fiyatlı seçeneği otomatik belirler.', note: 'PTT / Sürat / diğerleri — Arkada çalışır, önde fiyat görünür.', icon: 'fa-robot', color: 'bg-blue-500' },
    { id: '2', title: 'Yurtiçi + Yurtdışı Aynı Gün Avantajı', description: 'Aynı gün hem yurtdışı hem yurtiçi gönderim yapanlar, yurtiçi gönderilerde ekstra avantaj görür.', note: '"Zaten açmışken bir tane daha" etkisi.', icon: 'fa-calendar-check', color: 'bg-green-500' },
    { id: '3', title: 'Günlük Gönderiler İçin Stabil Fiyat', description: 'Her gün gönderim yapan satıcılar için yurtiçi fiyatlar daha stabil ve öngörülebilir olur.', note: 'Bugün kaç çıkacak derdi yok.', icon: 'fa-chart-line', color: 'bg-purple-500' },
  ],
  support: {
    title: 'Öncelikli Destek',
    description: 'Yurtdışı + yurtiçi aktif kullanıcıların destek talepleri öncelikli olarak ele alınır.',
  },
  fromAbroad: {
    title: 'Yurtdışından',
    titleHighlight: "Türkiye'ye Kargo",
    subtitle: "Yurtdışındaki adresinden, Türkiye'deki adrese kargo gönderebilirsin.",
    cards: [
      { id: '1', title: "Yurtdışından Türkiye'ye Gönder", description: "Yurtdışındaki adresinden, Türkiye'deki adrese kargo gönderebilirsin.", icon: 'fa-globe', color: 'bg-blue-500' },
      { id: '2', title: 'Kapıdan Alım – Kapıya Teslim', description: "Gönderi yurtdışındaki adresten alınır, Türkiye'de alıcının kapısına teslim edilir.", icon: 'fa-truck', color: 'bg-green-500' },
      { id: '3', title: 'Fiyatı Baştan Gör', description: 'Gönderim öncesinde net fiyatı görürsün. Sonradan sürpriz masraf çıkmaz.', icon: 'fa-receipt', color: 'bg-purple-500' },
    ],
    ctaText: 'Hemen Başla',
    ctaLink: 'https://app.adorelgo.com',
  },
});

const DomesticShipping: React.FC = () => {
  const { currentLang } = useLanguage();
  const [data, setData] = useState<any>(getDefault());

  useEffect(() => {
    axios.get(`${API_BASE_URL}/content/domestic?lang=${currentLang}`)
      .then(res => {
        if (res.data && res.data.hero) setData(deepMerge(getDefault(), res.data));
        else setData(getDefault());
      })
      .catch(() => setData(getDefault()));
  }, [currentLang]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <SEO page="yurtici-kargo" />
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
                <div key={k.id} className="bg-slate-50 rounded-2xl p-10 border border-gray-100 hover:shadow-lg transition-all flex flex-col items-center text-center">
                  <div className={`w-14 h-14 ${k.color || 'bg-blue-500'} rounded-xl flex items-center justify-center mb-6`}>
                    <i className={`fas ${k.icon} text-white text-xl`}></i>
                  </div>
                  <h2 className="text-2xl font-bold text-[#102477] mb-2 tracking-tight">{k.title}</h2>
                  <p className="text-[#4DB848] font-semibold text-sm mb-4">{k.subtitle}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{k.description}</p>
                  {k.highlight && (
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <p className="text-[#102477] font-semibold text-sm">{k.highlight}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Özel Fiyatlar Bandı */}
        <section className="py-20 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <i className="fas fa-tags text-[#4DB848] text-2xl"></i>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">{data.specialPricing?.title}</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-6">{data.specialPricing?.description}</p>
            <p className="text-white/50 text-sm font-medium">{data.specialPricing?.note}</p>
          </div>
        </section>

        {/* Avantajlar */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(data.advantages || []).map((a: any) => (
                <div key={a.id} className="bg-slate-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all flex flex-col items-center text-center">
                  <div className={`w-12 h-12 ${a.color || 'bg-blue-500'} rounded-xl flex items-center justify-center mb-5`}>
                    <i className={`fas ${a.icon} text-white text-lg`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-[#102477] mb-3">{a.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{a.description}</p>
                  {a.note && <p className="text-gray-400 text-xs italic">{a.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Öncelikli Destek */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
                <i className="fas fa-headset text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#102477] mb-2">{data.support?.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{data.support?.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Yurtdışından Türkiye'ye */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight mb-3">
                {data.fromAbroad?.title} <span className="text-[#4DB848]">{data.fromAbroad?.titleHighlight}</span>
              </h2>
              <p className="text-gray-500 text-base max-w-xl mx-auto">{data.fromAbroad?.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(data.fromAbroad?.cards || []).map((c: any) => (
                <div key={c.id} className="bg-slate-50 rounded-2xl p-8 text-center border border-gray-100">
                  <div className={`w-12 h-12 ${c.color || 'bg-blue-500'} rounded-xl flex items-center justify-center mx-auto mb-5`}>
                    <i className={`fas ${c.icon} text-white text-lg`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-[#102477] mb-2">{c.title}</h3>
                  <p className="text-gray-600 text-sm">{c.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <a
                href={data.fromAbroad?.ctaLink || 'https://app.adorelgo.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#4DB848] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3da03a] transition-all hover:-translate-y-1 shadow-lg text-base"
              >
                {data.fromAbroad?.ctaText || 'Hemen Başla'}
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

export default DomesticShipping;
