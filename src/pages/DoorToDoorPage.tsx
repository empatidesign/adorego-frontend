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
    title: 'Kapıdan Alım – Kapıya Teslim',
    subtitle: 'Kargonu biz alıyoruz, alıcının kapısına kadar biz teslim ediyoruz. Sen sadece gönder.',
  },
  howItWorks: {
    title: 'Nasıl Çalışır?',
    subtitle: 'Kargonu hazırla, biz gerisini halledelim.',
    steps: [
      { step: '1', icon: 'fa-box', title: 'Paketini Hazırla', desc: 'Göndereceklerini paketle. Sistem sana doğru ambalaj önerisinde bulunur.' },
      { step: '2', icon: 'fa-calendar-check', title: 'Randevu Al', desc: 'Uygun bir gün ve saat seç. Kuryemiz adresine gelir, kargonu teslim alır.' },
      { step: '3', icon: 'fa-location-dot', title: 'Teslimatı Takip Et', desc: 'Kargon yola çıktıktan itibaren alıcının kapısına kadar her adımı panelden takip edebilirsin.' },
    ],
  },
  advantages: {
    title: 'Neden Kapıdan Alım?',
    items: [
      { icon: 'fa-clock', title: 'Zamandan Tasarruf', desc: 'Kargo şubesine gitme zahmeti yok. Kuryemiz istediğin saatte kapına gelir.' },
      { icon: 'fa-shield-halved', title: 'Güvenli Paketleme', desc: 'Kuryemiz teslim alırken paket durumunu kontrol eder, güvenli taşıma sağlanır.' },
      { icon: 'fa-map-location-dot', title: 'Kapıya Kadar Takip', desc: 'Kargon nereden nereye gideceği gerçek zamanlı olarak takip edilebilir.' },
      { icon: 'fa-hand-holding-dollar', title: 'Uygun Fiyat', desc: 'Kapıdan alım hizmeti ekstra ücret gerektirmez, standart kargo ücretine dahildir.' },
    ],
  },
  cta: {
    title: 'Hemen Gönderi Oluştur',
    subtitle: 'Kapıdan alım ile yurtdışı gönderimin dakikalar içinde hazır.',
    buttonText: 'Hemen Başla',
    buttonUrl: 'https://app.adorelgo.com',
  },
};

const stepColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];
const advColors = ['bg-[#4DB848]', 'bg-[#102477]', 'bg-orange-500', 'bg-purple-500'];

const DoorToDoorPage: React.FC = () => {
  const [data, setData] = useState<any>(DEFAULT);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/content/page/kapidan-alim-kapiya-teslimat`)
      .then(res => { if (res.data) setData(deepMerge(DEFAULT, res.data)); })
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <SEO page="kapidan-alim-kapiya-teslimat" />
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

        {/* Nasıl Çalışır */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-truck text-[#102477] text-2xl"></i>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight mb-4">{data.howItWorks.title}</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">{data.howItWorks.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(data.howItWorks.steps || []).map((item: any, i: number) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-8 border border-gray-100 text-center hover:shadow-lg transition-all">
                  <div className={`w-12 h-12 ${stepColors[i % stepColors.length]} rounded-xl flex items-center justify-center mx-auto mb-5`}>
                    <i className={`fas ${item.icon} text-white text-lg`}></i>
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Adım {i + 1}</div>
                  <h3 className="text-lg font-bold text-[#102477] mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Avantajlar */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#102477] text-center mb-12">{data.advantages.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(data.advantages.items || []).map((item: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-5 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 ${advColors[i % advColors.length]} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <i className={`fas ${item.icon} text-white text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#102477] mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
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

export default DoorToDoorPage;
