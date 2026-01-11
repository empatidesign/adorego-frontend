
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../src/api-config';

const HowItWorks: React.FC = () => {
  const { currentLang } = useLanguage();
  const navigate = useNavigate();
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
        icon: "fa-home",
        title: currentLang === 'tr' ? "Kapından alıp, kapıya teslim ederiz" : "Door-to-Door Delivery",
        description: currentLang === 'tr' ? "Gönderin adresinden alınır, alıcının kapısına teslim edilir. Tüm süreç tek panelden takip edilir." : "Your shipment is picked up from your address and delivered to the recipient's door. Track the entire process from a single panel.",
        color: "bg-blue-500",
        image: "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=400&h=400&fit=crop",
        order: 2
      }
    ],
    buttons: [
      {
        id: 1,
        text: currentLang === 'tr' ? 'Fiyatı Gör' : 'Get Price',
        link: '/fiyatlar',
        style: 'primary',
        icon: '',
        order: 0
      },
      {
        id: 2,
        text: currentLang === 'tr' ? 'Nasıl Gönderirim?' : 'How to Send?',
        link: '/nasil-gonderirim',
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
          const updatedContent = {
            ...res.data
          };
          setContent(updatedContent);
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

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(content.steps?.length || 3, 4)} gap-8 mb-12`}>
          {content.steps?.map((step, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
              {/* Resim Bölümü */}
              <div className="relative h-56 overflow-hidden bg-gray-50">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                {/* İkon - Sol Üst */}
                <div className={`absolute top-4 left-4 w-12 h-12 ${step.color} rounded-full flex items-center justify-center shadow-md`}>
                  <i className={`fas ${step.icon} text-white text-lg`}></i>
                </div>
                {/* Numara - Sağ Alt */}
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-[#102477] text-base shadow-sm">
                  {idx + 1}
                </div>
              </div>

              {/* İçerik Bölümü */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#102477] mb-3 tracking-tight leading-snug">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 pb-12">
          {content.buttons?.map((button: any, idx: number) => {
            const btnText = button.text?.toLowerCase() || '';
            let targetLink = button.link || '#';

            // Linkleri zorla
            if (btnText.includes('fiyat')) targetLink = '/fiyatlar';
            else if (btnText.includes('nasıl') || btnText.includes('gönder')) targetLink = '/nasil-gonderirim';

            const isRelative = targetLink.startsWith('/') && !targetLink.startsWith('//');

            return (
              <Link
                key={button.id || idx}
                to={targetLink}
                className={`font-bold text-base flex items-center gap-3 transition-all px-10 py-4 rounded-xl shadow-lg hover:-translate-y-1 cursor-pointer ${button.style === 'primary'
                    ? 'bg-[#102477] text-white hover:bg-[#0a1a5a]'
                    : 'bg-white text-[#102477] border-2 border-gray-100 hover:border-[#102477]'
                  }`}
              >
                {button.text}
                <i className={`fas ${button.icon || (button.style === 'primary' ? 'fa-calculator' : 'fa-arrow-right')} ${button.style === 'secondary' ? 'text-[#4DB848]' : ''}`}></i>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
