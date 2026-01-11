
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../src/api-config';

const Features: React.FC = () => {
  const { currentLang } = useLanguage();
  
  const getDefaultHeader = (lang: string) => {
    if (lang === 'tr') {
      return {
        badge: '',
        title: 'Neden adoreGo?',
        subtitle: 'Yurtdışı kargo gönderiminde en iyi deneyim için ihtiyacınız olan her şey'
      };
    } else {
      return {
        badge: '',
        title: 'Why adoreGo?',
        subtitle: 'Everything you need for the best experience in international shipping'
      };
    }
  };

  const [header, setHeader] = useState(getDefaultHeader(currentLang));
  
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
    // Features Header yükle
    axios.get(`${API_BASE_URL}/content/features-header?lang=${currentLang}`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0 && res.data.title) {
          setHeader(res.data);
        } else {
          setHeader(getDefaultHeader(currentLang));
        }
      })
      .catch(err => {
        console.error('Features header yüklenemedi:', err);
        setHeader(getDefaultHeader(currentLang));
      });

    // Features yükle - API'den gelen veriyi kullan ama ikonları görseldeki gibi düzelt
    axios.get(`${API_BASE_URL}/content/features?lang=${currentLang}`)
      .then(res => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          // API'den gelen veriyi kullan ama ikon renklerini görseldeki gibi ayarla
          const updatedFeatures = res.data.map((feature: any, idx: number) => {
            const colors = ['blue-500', 'green-500', 'purple-500', 'orange-500'];
            return {
              ...feature,
              color: `bg-${colors[idx % colors.length]}`
            };
          });
          setFeatures(updatedFeatures);
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
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#102477] mb-4 tracking-tight">
            {header.title}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto font-normal">
            {header.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            // Görseldeki renk paleti: mavi, yeşil, mor, turuncu
            const colors = [
              'bg-blue-500',
              'bg-green-500',
              'bg-purple-500',
              'bg-orange-500'
            ];
            const iconBg = feature.color || colors[idx % colors.length];
            
            return (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className={`w-16 h-16 ${iconBg} rounded-lg flex items-center justify-center mb-6 text-white`}>
                  <i className={`fas ${feature.icon} text-2xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-[#102477] mb-3 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
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
