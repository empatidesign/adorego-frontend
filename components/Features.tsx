
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../src/api-config';

const Features: React.FC = () => {
  const { currentLang } = useLanguage();
  
  const getDefaultCta = (lang: string) => {
    if (lang === 'tr') {
      return {
        title: 'Yurtdışına Açılmanın En Kolay Yolu.',
        subtitle: 'Hemen kayıt olun, ilk gönderinizde adoreGo farkını yaşayın.',
        buttonText: 'ÜCRETSİZ KAYIT',
        buttonLink: '#',
        backgroundImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop'
      };
    } else {
      return {
        title: 'The Easiest Way to Go International.',
        subtitle: 'Sign up now and experience the adoreGo difference with your first shipment.',
        buttonText: 'FREE SIGN UP',
        buttonLink: '#',
        backgroundImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop'
      };
    }
  };
  
  const [cta, setCta] = useState(getDefaultCta(currentLang));
  
  const getDefaultFeatures = (lang: string) => {
    if (lang === 'tr') {
      return [
        {
          icon: "fa-rocket",
          color: "bg-gradient-to-br from-blue-500 to-blue-600",
          title: "Hızlı Entegrasyon",
          description: "Pazaryeri mağazalarınızı dakikalar içinde bağlayın, gönderilerinizi otomatik yönetin."
        },
        {
          icon: "fa-shield-halved",
          color: "bg-gradient-to-br from-green-500 to-green-600",
          title: "Tam Güvence",
          description: "adoreGo ile tüm paketleriniz sigortalı ve uçtan uca takip sistemimizle koruma altında."
        },
        {
          icon: "fa-map-location-dot",
          color: "bg-gradient-to-br from-purple-500 to-purple-600",
          title: "Global Takip",
          description: "Dünyanın neresinde olursa olsun kargonuzu canlı harita üzerinden takip edin."
        },
        {
          icon: "fa-hand-holding-dollar",
          color: "bg-gradient-to-br from-orange-500 to-orange-600",
          title: "Rekabetçi Fiyat",
          description: "Hacminiz ne olursa olsun, en uygun birim fiyat garantisi ile lojistik maliyetlerinizi düşürün."
        }
      ];
    } else {
      return [
        {
          icon: "fa-rocket",
          color: "bg-gradient-to-br from-blue-500 to-blue-600",
          title: "Fast Integration",
          description: "Connect your marketplace stores in minutes and manage your shipments automatically."
        },
        {
          icon: "fa-shield-halved",
          color: "bg-gradient-to-br from-green-500 to-green-600",
          title: "Full Protection",
          description: "All your packages are insured with adoreGo and protected by our end-to-end tracking system."
        },
        {
          icon: "fa-map-location-dot",
          color: "bg-gradient-to-br from-purple-500 to-purple-600",
          title: "Global Tracking",
          description: "Track your shipment on a live map, wherever it is in the world."
        },
        {
          icon: "fa-hand-holding-dollar",
          color: "bg-gradient-to-br from-orange-500 to-orange-600",
          title: "Competitive Pricing",
          description: "Reduce your logistics costs with the best unit price guarantee, regardless of your volume."
        }
      ];
    }
  };
  
  const [features, setFeatures] = useState<any[]>(getDefaultFeatures(currentLang));

  useEffect(() => {
    // Features yükle
    axios.get(`${API_BASE_URL}/content/features?lang=${currentLang}`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setFeatures(res.data);
        } else {
          setFeatures(getDefaultFeatures(currentLang));
        }
      })
      .catch(err => {
        console.error('Features content yüklenemedi:', err);
        setFeatures(getDefaultFeatures(currentLang));
      });
    
    // CTA Banner yükle
    axios.get(`${API_BASE_URL}/content/cta?lang=${currentLang}`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setCta(res.data);
        } else {
          setCta(getDefaultCta(currentLang));
        }
      })
      .catch(err => {
        console.error('CTA content yüklenemedi:', err);
        setCta(getDefaultCta(currentLang));
      });
  }, [currentLang]);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <span className="text-[#4DB848] font-bold text-[9px] uppercase tracking-[0.2em] mb-3 block">ADOREGO TEKNOLOJİ</span>
          <h2 className="text-3xl lg:text-[40px] font-bold text-[#102477] mb-5 tracking-tight leading-tight">
            Lojistiği Akıllı <span className="text-[#4DB848]">Teknolojiyle</span> Birleştirdik.
          </h2>
          <p className="text-md text-slate-500 font-medium max-w-xl mx-auto">
            Gönderi sürecini basitleştiriyor, hızlandırıyor ve daha ekonomik hale getiriyoruz.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            // Daha canlı ve kontrast renk paleti
            const colors = [
              { bg: 'bg-gradient-to-br from-blue-500 to-blue-600', shadow: 'shadow-blue-500/30' },
              { bg: 'bg-gradient-to-br from-green-500 to-green-600', shadow: 'shadow-green-500/30' },
              { bg: 'bg-gradient-to-br from-purple-500 to-purple-600', shadow: 'shadow-purple-500/30' },
              { bg: 'bg-gradient-to-br from-orange-500 to-orange-600', shadow: 'shadow-orange-500/30' }
            ];
            const colorScheme = colors[idx % colors.length];
            
            return (
              <div 
                key={idx} 
                className="group bg-white p-8 rounded-[16px] hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-slate-200 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 ${colorScheme.bg} rounded-[14px] flex items-center justify-center mb-6 text-white shadow-xl ${colorScheme.shadow} group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`fas ${feature.icon} text-2xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-[#102477] mb-3 tracking-tight group-hover:text-[#4DB848] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 relative rounded-[10px] overflow-hidden min-h-[250px] flex items-center shadow-lg">
           <img 
            src={cta.backgroundImage} 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="CTA Background"
           />
           <div className="absolute inset-0 bg-[#102477]/90 backdrop-blur-[2px]"></div>
           <div className="relative z-10 p-10 lg:p-16 w-full lg:flex items-center justify-between gap-10">
              <div>
                <h3 className="text-2xl lg:text-[32px] font-bold text-white mb-4 tracking-tight">{cta.title}</h3>
                <p className="text-white/70 text-md font-medium max-w-lg">{cta.subtitle}</p>
              </div>
              <div className="mt-8 lg:mt-0 flex-shrink-0">
                <button 
                  onClick={() => window.location.href = cta.buttonLink}
                  className="bg-[#4DB848] text-white px-8 py-3 rounded-[10px] font-bold text-md hover:bg-[#3da339] transition-all"
                >
                  {cta.buttonText}
                </button>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
