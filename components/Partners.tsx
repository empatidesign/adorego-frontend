
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../src/api-config';

const Partners: React.FC = () => {
  const { currentLang } = useLanguage();
  const [carriers, setCarriers] = useState<any[]>([
    { name: "DHL", logo: "", color: "bg-gradient-to-br from-yellow-400 to-red-500" },
    { name: "FedEx", logo: "", color: "bg-gradient-to-br from-purple-500 to-orange-500" },
    { name: "UPS", logo: "", color: "bg-gradient-to-br from-yellow-600 to-yellow-700" },
    { name: "TNT", logo: "", color: "bg-gradient-to-br from-orange-500 to-red-600" }
  ]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/content/partners?lang=${currentLang}`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setCarriers(res.data);
        }
      })
      .catch(err => {
        console.error('Partners content yüklenemedi:', err);
        // Default değerler zaten yüklü
      });
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
    <section className="py-16 bg-white">
      {/* Carrier Section - API'den gelen partnerler */}
      <div className="border-y border-gray-100/50 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 font-medium mb-8">
            {currentLang === 'tr' ? "Dünyanın en güçlü kargo firmalarıyla çalışıyoruz" : "We work with the world's most powerful cargo companies"}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {carriers.map((carrier, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                {carrier.logo ? (
                  <div className="h-20 w-full flex items-center justify-center mb-3">
                    <img 
                      src={carrier.logo} 
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

      {/* Marketplace Section */}
      <div className="py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 font-medium mb-8">E-Ticaret Entegrasyonları</p>
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
      <div className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-[#102477] mb-4 tracking-tight">
            {currentLang === 'tr' ? 'E-ticaret satıcıları tarafından' : 'Actively used by'}
            {' '}<span className="text-[#4DB848]">{currentLang === 'tr' ? 'aktif olarak kullanılmaktadır' : 'e-commerce sellers'}</span>
          </h3>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10 mb-12">
            <div className="bg-white rounded-2xl px-8 py-6 border border-gray-100 shadow-md flex-1 max-w-sm relative">
              <div className="absolute -top-3 left-6 w-8 h-8 bg-[#4DB848] rounded-full flex items-center justify-center">
                <i className="fas fa-quote-left text-white text-xs"></i>
              </div>
              <p className="text-[#102477] font-semibold text-base mt-2">
                {currentLang === 'tr' ? '"Fiyat ve hız konusunda en iyi çözüm."' : '"The best solution for price and speed."'}
              </p>
              <p className="text-gray-400 text-xs mt-3 font-medium">{currentLang === 'tr' ? '— E-ticaret satıcısı' : '— E-commerce seller'}</p>
            </div>
            <div className="bg-white rounded-2xl px-8 py-6 border border-gray-100 shadow-md flex-1 max-w-sm relative">
              <div className="absolute -top-3 left-6 w-8 h-8 bg-[#102477] rounded-full flex items-center justify-center">
                <i className="fas fa-quote-left text-white text-xs"></i>
              </div>
              <p className="text-[#102477] font-semibold text-base mt-2">
                {currentLang === 'tr' ? '"Tek panelden tüm kargoları yönetiyoruz."' : '"We manage all shipments from a single panel."'}
              </p>
              <p className="text-gray-400 text-xs mt-3 font-medium">{currentLang === 'tr' ? '— Mağaza sahibi' : '— Store owner'}</p>
            </div>
          </div>

          <a
            href="https://app.adorelgo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#102477] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#0a1a5a] transition-all hover:-translate-y-1 shadow-lg text-base"
          >
            {currentLang === 'tr' ? 'Sen de gönderine başla' : 'Start shipping now'}
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
