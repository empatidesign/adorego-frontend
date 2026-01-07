
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
    <div>
      {/* Carrier Section - API'den gelen partnerler */}
      <div className="py-16 border-y border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {carriers.map((carrier, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                {carrier.logo ? (
                  <img 
                    src={carrier.logo} 
                    alt={carrier.name}
                    className="h-20 w-32 object-contain rounded-xl p-4 bg-white shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300"
                  />
                ) : (
                  <div className={`${carrier.color || 'bg-gradient-to-br from-blue-500 to-blue-600'} h-20 w-32 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300`}>
                    <span className="text-white font-black text-2xl tracking-tight">{carrier.name}</span>
                  </div>
                )}
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-3">Global Partner</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marketplace Section (Page 5 PDF) */}
      <div className="py-12 overflow-hidden">
  Yeni Nesil Akıllı Lojistik Teknolojileri Platformu
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

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Partners;
