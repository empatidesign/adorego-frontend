
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
