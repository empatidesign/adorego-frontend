
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../api-config';

const Features: React.FC = () => {
  const { currentLang } = useLanguage();
  
  const getDefaultHeader = (lang: string) => {
    if (lang === 'tr') {
      return {
        badge: '',
        title: 'Sistem en doğrusunu seçer.',
        subtitle: 'Gönderiniz için en uygun kargo firmasını, en hızlı rotayı ve en güvenli seçeneği sistem otomatik belirler.'
      };
    } else {
      return {
        badge: '',
        title: 'The system picks the best.',
        subtitle: 'The system automatically determines the most affordable carrier, fastest route, and safest option for your shipment.'
      };
    }
  };

  const [header, setHeader] = useState(getDefaultHeader(currentLang));
  
  const getDefaultCta = (lang: string) => {
    if (lang === 'tr') {
      return {
        title: 'Yurtdışına Açılmanın En Kolay Yolu.',
        subtitle: 'Hemen kayıt olun, ilk gönderinizde AdorelGo farkını yaşayın.',
        buttonText: 'ÜCRETSİZ KAYIT',
        buttonLink: '#',
        backgroundImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop'
      };
    } else {
      return {
        title: 'The Easiest Way to Go International.',
        subtitle: 'Sign up now and experience the AdorelGo difference with your first shipment.',
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
          icon: "fa-coins",
          color: "bg-gradient-to-br from-blue-500 to-blue-600",
          title: "En Uygun",
          description: "En düşük maliyetle gönder"
        },
        {
          icon: "fa-bolt",
          color: "bg-gradient-to-br from-green-500 to-green-600",
          title: "En Hızlı",
          description: "En kısa sürede teslim et"
        },
        {
          icon: "fa-shield-halved",
          color: "bg-gradient-to-br from-purple-500 to-purple-600",
          title: "En Sorunsuz",
          description: "Risk almadan gönder"
        }
      ];
    } else {
      return [
        {
          icon: "fa-coins",
          color: "bg-gradient-to-br from-blue-500 to-blue-600",
          title: "Most Affordable",
          description: "Ship at the lowest cost"
        },
        {
          icon: "fa-bolt",
          color: "bg-gradient-to-br from-green-500 to-green-600",
          title: "Fastest",
          description: "Deliver in the shortest time"
        },
        {
          icon: "fa-shield-halved",
          color: "bg-gradient-to-br from-purple-500 to-purple-600",
          title: "Most Reliable",
          description: "Ship without risk"
        }
      ];
    }
  };
  
  const [features, setFeatures] = useState<any[]>(getDefaultFeatures(currentLang));

  useEffect(() => {
    axios.get(`${API_BASE_URL}/content/features-header?lang=${currentLang}`)
      .then(res => {
        if (res.data && res.data.title) setHeader(res.data);
        else setHeader(getDefaultHeader(currentLang));
        if (res.data?.miniCards?.length > 0) setFeatures(res.data.miniCards);
        else setFeatures(getDefaultFeatures(currentLang));
      })
      .catch(() => {
        setHeader(getDefaultHeader(currentLang));
        setFeatures(getDefaultFeatures(currentLang));
      });

    axios.get(`${API_BASE_URL}/content/cta?lang=${currentLang}`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setCta({
            ...res.data,
            backgroundImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop'
          });
        } else {
          setCta(getDefaultCta(currentLang));
        }
      })
      .catch(() => setCta(getDefaultCta(currentLang)));
  }, [currentLang]);

  return (
    <section className="pb-8 md:pb-12 pt-0 -mt-10 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#102477] mb-4 tracking-tight">
            {header.title}
          </h2>
          <p className="text-lg text-gray-700 mx-auto font-normal whitespace-nowrap">
            {header.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
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

        <div className="mt-10 text-center">
          <p className="text-2xl lg:text-3xl font-bold text-[#102477]">
            Kargo firması seçmezsin{' '}
            <span className="text-[#4DB848]">sonuç seçersin.</span>
          </p>
        </div>

        <div className="mt-10 relative rounded-[10px] overflow-hidden min-h-[250px] flex items-center shadow-lg">
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
