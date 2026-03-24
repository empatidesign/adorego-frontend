
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../src/api-config';

const PopularDestinations: React.FC = () => {
  const { currentLang } = useLanguage();

  const getDefaultContent = (lang: string) => {
    if (lang === 'tr') {
      return {
        badge: 'POPÜLER ÜLKELER',
        title: 'Dünyaya Bizimle Ulaşın.',
        destinations: [
          {
            image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070",
            name: "Almanya",
            price: "12.50",
            currency: "€",
            tag: "Express Servis",
            priceLabel: "Başlangıç"
          },
          {
            image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2070",
            name: "ABD",
            price: "24.90",
            currency: "€",
            tag: "Ekonomik",
            priceLabel: "Başlangıç"
          },
          {
            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070",
            name: "İngiltere",
            price: "18.00",
            currency: "€",
            tag: "Sık Gönderilen",
            priceLabel: "Başlangıç"
          },
          {
            image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2070",
            name: "Hollanda",
            price: "11.20",
            currency: "€",
            tag: "Kolay Gümrük",
            priceLabel: "Başlangıç"
          }
        ]
      };
    } else {
      return {
        badge: 'POPULAR COUNTRIES',
        title: 'Reach the World with Us.',
        destinations: [
          {
            image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070",
            name: "Germany",
            price: "12.50",
            currency: "€",
            tag: "Express Service",
            priceLabel: "Starting from"
          },
          {
            image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2070",
            name: "USA",
            price: "24.90",
            currency: "€",
            tag: "Economical",
            priceLabel: "Starting from"
          },
          {
            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070",
            name: "UK",
            price: "18.00",
            currency: "€",
            tag: "Frequently Sent",
            priceLabel: "Starting from"
          },
          {
            image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2070",
            name: "Netherlands",
            price: "11.20",
            currency: "€",
            tag: "Easy Customs",
            priceLabel: "Starting from"
          }
        ]
      };
    }
  };

  const [content, setContent] = useState<any>(getDefaultContent(currentLang));

  useEffect(() => {
    // API'den yükle
    axios.get(`${API_BASE_URL}/content/popular-destinations?lang=${currentLang}`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          // API'den gelen veriyi default ile merge et
          const defaultData = getDefaultContent(currentLang);
          const mergedData = {
            badge: res.data.badge || defaultData.badge,
            title: res.data.title || defaultData.title,
            destinations: (res.data.destinations && res.data.destinations.length > 0) 
              ? res.data.destinations 
              : defaultData.destinations
          };
          setContent(mergedData);
        } else {
          setContent(getDefaultContent(currentLang));
        }
      })
      .catch(err => {
        console.error('Popular Destinations content yüklenemedi:', err);
        setContent(getDefaultContent(currentLang));
      });
  }, [currentLang]);

  const destinations = content.destinations || [];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#4DB848] font-bold text-[9px] uppercase tracking-[0.2em] mb-3 block">{content.badge}</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight">{content.title}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest: any, idx: number) => (
            <div key={idx} className="group relative h-[380px] rounded-[10px] overflow-hidden cursor-pointer shadow-md bg-white">
              <img src={dest.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" alt={dest.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102477] via-[#102477]/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-6 w-full z-10">
                <span className="bg-[#4DB848] text-white text-[8px] font-bold px-2.5 py-1 rounded-[5px] uppercase tracking-wider mb-2 inline-block">
                  {dest.tag}
                </span>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold text-white tracking-tight uppercase">{dest.name}</h3>
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-[5px] flex items-center justify-center text-white">
                    <i className="fas fa-arrow-right text-[10px]"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
