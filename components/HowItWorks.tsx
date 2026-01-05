
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../src/api-config';

const HowItWorks: React.FC = () => {
  const { currentLang } = useLanguage();
  const [content, setContent] = useState<any>({
    badge: currentLang === 'tr' ? 'SÜREÇ' : 'PROCESS',
    title: currentLang === 'tr' ? 'Yurtdışı Kargo' : 'International Shipping',
    titleHighlight: currentLang === 'tr' ? 'Nasıl Çalışır?' : 'How It Works?',
    steps: [
      {
        id: 1,
        icon: "fa-search-dollar",
        title: currentLang === 'tr' ? "En Uygun Fiyatı Anında Görürsün" : "Get the Best Price Instantly",
        description: currentLang === 'tr' ? "Göndereceğin ülkeyi ve paketin bilgilerini girersin. Sistem sana en uygun fiyatı anında gösterir." : "Enter your destination country and package details. The system shows you the best price instantly.",
        color: "bg-blue-500",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=400&fit=crop",
        order: 0
      },
      {
        id: 2,
        icon: "fa-shipping-fast",
        title: currentLang === 'tr' ? "Biz Senin İçin Kargoyu Seçeriz" : "We Choose the Carrier for You",
        description: currentLang === 'tr' ? "Kargo firması seçmek zorunda kalmazsın. Gönderine en uygun seçenek otomatik belirlenir." : "You don't have to choose a shipping company. The most suitable option for your shipment is automatically determined.",
        color: "bg-[#4DB848]",
        image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=400&fit=crop",
        order: 1
      },
      {
        id: 3,
        icon: "fa-door-open",
        title: currentLang === 'tr' ? "Kapından alıp, kapıya teslim ederiz" : "Door-to-Door Delivery",
        description: currentLang === 'tr' ? "Gönderin adresinden alınır, alıcının kapısına teslim edilir. Tüm süreç tek panelden takip edilir." : "Your shipment is picked up from your address and delivered to the recipient's door. Track the entire process from a single panel.",
        color: "bg-[#102477]",
        image: "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=400&h=400&fit=crop",
        order: 2
      }
    ],
    buttons: [
      {
        id: 1,
        text: currentLang === 'tr' ? 'Fiyatı Gör' : 'Get Price',
        link: '#fiyat',
        style: 'primary',
        icon: '',
        order: 0
      },
      {
        id: 2,
        text: currentLang === 'tr' ? 'Nasıl Gönderirim?' : 'How to Send?',
        link: '#',
        style: 'secondary',
        icon: 'fa-arrow-right',
        order: 1
      }
    ]
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/content/howitworks?lang=${currentLang}`)
      .then(res => {
        if (res.data && res.data.steps && res.data.steps.length > 0) {
          setContent(res.data);
        }
      })
      .catch(err => console.error('HowItWorks content yüklenemedi:', err));
  }, [currentLang]);

  return (
    <section id="nasil-calisir" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="text-[#4DB848] font-bold text-[9px] uppercase tracking-[0.2em] mb-3 block">{content.badge}</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight">
            {content.title} <span className="text-[#4DB848]">{content.titleHighlight}</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.steps?.map((step, idx) => (
            <div key={idx} className="bg-white rounded-[10px] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Resim Bölümü */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute top-4 left-4 w-14 h-14 ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                  <i className={`fas ${step.icon} text-white text-xl`}></i>
                </div>
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center font-bold text-[#102477] text-lg">
                  {idx + 1}
                </div>
              </div>
              
              {/* İçerik Bölümü */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#102477] mb-3 tracking-tight leading-snug">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row items-center gap-6 justify-center">
          {content.buttons?.map((button, idx) => (
            <button
              key={button.id || idx}
              onClick={() => button.link && (window.location.href = button.link)}
              className={`font-bold text-sm flex items-center gap-2 transition-all ${
                button.style === 'primary'
                  ? 'bg-[#102477] text-white px-8 py-3.5 rounded-[10px] hover:bg-black shadow-lg'
                  : 'text-[#102477] hover:gap-3'
              }`}
            >
              {button.text}
              {button.icon && <i className={`fas ${button.icon} text-[10px]`}></i>}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
