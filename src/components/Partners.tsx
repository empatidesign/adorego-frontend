
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../api-config';

const Partners: React.FC = () => {
  const { currentLang } = useLanguage();

  const getDefaultStats = (lang: string) => [
    { value: '50.000+', label: lang === 'tr' ? 'gönderi / ay' : 'shipments / month' },
    { value: '220+', label: lang === 'tr' ? 'ülkeye gönderim' : 'countries served' },
    { value: '%80', label: lang === 'tr' ? 'aktif kullanım' : 'active usage' },
  ];

  const getDefaultSocialProof = (lang: string) => ({
    title: lang === 'tr' ? 'E-ticaret satıcıları tarafından' : 'Actively used by',
    highlightedTitle: lang === 'tr' ? 'aktif olarak kullanılmaktadır' : 'e-commerce sellers',
    testimonials: [
      { quote: lang === 'tr' ? '"Fiyat ve hız konusunda en iyi çözüm."' : '"The best solution for price and speed."', author: lang === 'tr' ? '— E-ticaret satıcısı' : '— E-commerce seller' },
      { quote: lang === 'tr' ? '"Tek panelden tüm kargoları yönetiyoruz."' : '"We manage all shipments from a single panel."', author: lang === 'tr' ? '— Mağaza sahibi' : '— Store owner' },
    ],
    ctaText: lang === 'tr' ? 'Sen de gönderine başla' : 'Start shipping now',
    ctaLink: 'https://app.adorelgo.com',
  });

  const [statsTitle, setStatsTitle] = useState(currentLang === 'tr' ? 'Binlerce satıcı' : 'Thousands of sellers');
  const [statsHighlight, setStatsHighlight] = useState(currentLang === 'tr' ? 'AdorelGo ile gönderiyor' : 'ship with AdorelGo');
  const [stats, setStats] = useState<any[]>(getDefaultStats(currentLang));

  const [carriers, setCarriers] = useState<any[]>([
    { name: "DHL", logo: "", color: "bg-gradient-to-br from-yellow-400 to-red-500" },
    { name: "FedEx", logo: "", color: "bg-gradient-to-br from-purple-500 to-orange-500" },
    { name: "UPS", logo: "", color: "bg-gradient-to-br from-yellow-600 to-yellow-700" },
    { name: "TNT", logo: "", color: "bg-gradient-to-br from-orange-500 to-red-600" }
  ]);
  const [socialProof, setSocialProof] = useState<any>(() => getDefaultSocialProof(currentLang));

  useEffect(() => {
    setStatsTitle(currentLang === 'tr' ? 'Binlerce satıcı' : 'Thousands of sellers');
    setStatsHighlight(currentLang === 'tr' ? 'AdorelGo ile gönderiyor' : 'ship with AdorelGo');
    setStats(getDefaultStats(currentLang));
    setSocialProof(getDefaultSocialProof(currentLang));

    axios.get(`${API_BASE_URL}/content/partners?lang=${currentLang}`)
      .then(res => {
        const raw = res.data;
        const carriersData = Array.isArray(raw) ? raw : raw?.carriers;
        if (Array.isArray(carriersData) && carriersData.length > 0) {
          setCarriers((prev: any[]) => carriersData.map((item: any, i: number) => ({
            ...prev[i],
            ...item,
            color: item.color || prev[i]?.color || 'bg-gradient-to-br from-blue-500 to-blue-600'
          })));
        }
        if (raw?.socialProof?.title) setSocialProof(raw.socialProof);
      })
      .catch(() => {});

    axios.get(`${API_BASE_URL}/content/target-audience?lang=${currentLang}`)
      .then(res => {
        if (res.data?.statsTitle) setStatsTitle(res.data.statsTitle);
        if (res.data?.statsHighlight) setStatsHighlight(res.data.statsHighlight);
        if (res.data?.stats?.length > 0) setStats(res.data.stats);
        else setStats(getDefaultStats(currentLang));
      })
      .catch(() => setStats(getDefaultStats(currentLang)));
  }, [currentLang]);

  const marketplaceLogos = [
    { name: "Amazon", icon: "fab fa-amazon" },
    { name: "Etsy", icon: "fab fa-etsy" },
    { name: "Shopify", icon: "fab fa-shopify" },
    { name: "Trendyol", icon: "fas fa-shopping-bag" },
    { name: "WooCommerce", icon: "fab fa-wordpress" },
    { name: "İkas", icon: "fas fa-bolt" },
    { name: "Hepsiburada", icon: "fas fa-store" }
  ];

  return (
    <section className="pb-16 pt-4 bg-white">
      {/* Carrier Section - API'den gelen partnerler */}
      <div className="py-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-200" />
            <p className="inline-block text-center text-3xl lg:text-4xl font-bold tracking-tight leading-tight bg-gray-100 px-8 py-3 rounded-2xl">
              <span style={{ color: '#102477' }}>{currentLang === 'tr' ? "Dünyanın en güçlü kargo firmalarıyla" : "We work with the world's most powerful"}</span>
              {' '}<span style={{ color: '#4DB848' }}>{currentLang === 'tr' ? "çalışıyoruz" : "cargo companies"}</span>
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-200" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {carriers.map((carrier, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                {carrier.logo ? (
                  <div className="h-20 w-full flex items-center justify-center mb-3">
                    <img
                      src={carrier.logo.startsWith('http') ? carrier.logo : `${API_BASE_URL}${carrier.logo}`}
                      alt={carrier.name}
                      className="max-h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      onError={(e) => {
                        // Logo yüklenemezse fallback göster
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="${carrier.color || 'bg-gradient-to-br from-blue-500 to-blue-600'} h-16 w-24 rounded flex items-center justify-center"><span class="text-white font-black text-lg">${carrier.name}</span></div>`;
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className={`${carrier.color || 'bg-gradient-to-br from-blue-500 to-blue-600'} h-16 w-24 rounded flex items-center justify-center mb-3`}>
                    <span className="text-white font-black text-lg">{carrier.name}</span>
                  </div>
                )}
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Global Partner</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sayısal Kutular - Binlerce Satıcı */}
      <div className="pb-12 md:pb-16 pt-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="inline-block text-3xl lg:text-4xl font-bold text-[#102477] mb-4 tracking-tight bg-gray-100 px-8 py-3 rounded-2xl">
            {statsTitle}{' '}
            <span className="text-[#4DB848]">{statsHighlight}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {stats.map((stat: any, idx: number) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-8 border border-gray-100">
                <p className={`text-4xl lg:text-5xl font-black mb-2 ${idx === 1 ? 'text-[#4DB848]' : 'text-[#102477]'}`}>{stat.value}</p>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marketplace Section */}
      <div className="pb-12 pt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-200" />
            <p className="inline-block text-center text-3xl lg:text-4xl font-bold tracking-tight leading-tight bg-gray-100 px-8 py-3 rounded-2xl">
              <span style={{ color: '#102477' }}>{currentLang === 'tr' ? 'E-Ticaret' : 'E-Commerce'}</span>
              {' '}<span style={{ color: '#4DB848' }}>{currentLang === 'tr' ? 'Entegrasyonları' : 'Integrations'}</span>
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-200" />
          </div>
          <div className="relative flex overflow-x-hidden">
            <div className="flex animate-marquee whitespace-nowrap items-center">
              {marketplaceLogos.map((p, i) => (
                <div key={i} className="mx-12 flex items-center gap-3 text-gray-300 hover:text-[#102477] transition-all cursor-default">
                  <i className={`${p.icon} text-2xl`}></i>
                  <span className="text-xl font-bold uppercase tracking-tighter">{p.name}</span>
                </div>
              ))}
              {marketplaceLogos.map((p, i) => (
                <div key={i + 10} className="mx-12 flex items-center gap-3 text-gray-300 hover:text-[#102477] transition-all cursor-default">
                  <i className={`${p.icon} text-2xl`}></i>
                  <span className="text-xl font-bold uppercase tracking-tighter">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sosyal Kanıt + CTA */}
      <div className="py-6 md:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="inline-block text-3xl lg:text-4xl font-bold text-[#102477] mb-4 tracking-tight bg-gray-100 px-8 py-3 rounded-2xl">
            {socialProof.title}
            {' '}<span className="text-[#4DB848]">{socialProof.highlightedTitle}</span>
          </h3>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10 mb-12">
            {(socialProof.testimonials || []).map((t: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl px-8 py-6 border border-gray-100 shadow-md flex-1 max-w-sm relative">
                <div className={`absolute -top-3 left-6 w-8 h-8 ${i % 2 === 0 ? 'bg-[#4DB848]' : 'bg-[#102477]'} rounded-full flex items-center justify-center`}>
                  <i className="fas fa-quote-left text-white text-xs"></i>
                </div>
                <p className="text-[#102477] font-semibold text-base mt-2">{t.quote}</p>
                <p className="text-gray-400 text-xs mt-3 font-medium">{t.author}</p>
              </div>
            ))}
          </div>

          <a
            href={socialProof.ctaLink || 'https://app.adorelgo.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#102477] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#0a1a5a] transition-all hover:-translate-y-1 shadow-lg text-base"
          >
            {socialProof.ctaText}
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Partners;
