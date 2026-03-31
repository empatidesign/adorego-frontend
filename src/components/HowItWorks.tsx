
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../api-config';

const StepIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactNode> = {
    signup: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="16" y1="11" x2="22" y2="11" />
      </svg>
    ),
    upload: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <polyline points="9 15 12 12 15 15" />
      </svg>
    ),
    create: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M7 8h2m2 0h4M7 12h8" />
      </svg>
    ),
    pickup: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  };
  return <>{icons[type] || icons.signup}</>;
};

const getDefaultContent = (lang: string) => ({
  badge: lang === 'tr' ? 'SÜREÇ' : 'PROCESS',
  title: lang === 'tr' ? 'Yurtdışına' : 'How to',
  titleHighlight: lang === 'tr' ? 'Nasıl Gönderirim?' : 'Send Internationally?',
  steps: [
    {
      id: 1, iconType: "signup",
      title: lang === 'tr' ? "Ücretsiz Üye Ol" : "Sign Up for Free",
      description: lang === 'tr' ? "adorelgo.com'a ücretsiz üye ol, hemen gönderim yapmaya başla." : "Sign up for free at adorelgo.com and start shipping right away.",
      color: "bg-blue-500", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=400&fit=crop", order: 0
    },
    {
      id: 2, iconType: "upload",
      title: lang === 'tr' ? "Belgelerini Yükle" : "Upload Your Documents",
      description: lang === 'tr' ? "Gönderim için gerekli belgelerini sisteme yükle. Hızlı ve güvenli." : "Upload the required documents for shipping. Fast and secure.",
      color: "bg-[#4DB848]", image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=400&fit=crop", order: 1
    },
    {
      id: 3, iconType: "create",
      title: lang === 'tr' ? "Gönderini Oluştur" : "Create Your Shipment",
      description: lang === 'tr' ? "Paket bilgilerini gir, alıcı adresini ekle ve gönderini oluştur." : "Enter package details, add recipient address and create your shipment.",
      color: "bg-blue-500", image: "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=400&h=400&fit=crop", order: 2
    },
    {
      id: 4, iconType: "pickup",
      title: lang === 'tr' ? "Kapından Alalım" : "We Pick Up from Your Door",
      description: lang === 'tr' ? "Gönderin adresinden alınır, alıcının kapısına teslim edilir. Tüm süreç tek panelden takip edilir." : "Your shipment is picked up from your address and delivered to the recipient's door.",
      color: "bg-[#4DB848]", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=400&fit=crop", order: 3
    }
  ],
  buttons: [
    { id: 1, text: lang === 'tr' ? 'Nasıl Gönderirim?' : 'How to Send?', link: '/nasil-gonderirim', style: 'secondary', icon: 'fa-arrow-right', order: 0 },
    { id: 2, text: lang === 'tr' ? 'Ücretsiz Üye Ol' : 'Sign Up Free', link: 'https://app.adorelgo.com', style: 'primary', icon: '', order: 1, external: true }
  ]
});

const HowItWorks: React.FC = () => {
  const { currentLang } = useLanguage();
  const navigate = useNavigate();
  const [content, setContent] = useState<any>(() => getDefaultContent(currentLang));

  useEffect(() => {
    setContent(getDefaultContent(currentLang));
    axios.get(`${API_BASE_URL}/content/howitworks?lang=${currentLang}`)
      .then(res => {
        if (res.data && res.data.steps && res.data.steps.length > 0) {
          setContent((prev: any) => ({ ...prev, ...res.data }));
        }
      })
      .catch(() => {});
  }, [currentLang]);

  return (
    <section id="nasil-calisir" className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="inline-block text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight bg-gray-100 px-8 py-3 rounded-2xl">
            {content.title} <span className="text-[#4DB848]">{content.titleHighlight}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {content.steps?.map((step, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-8 text-center group border border-gray-100 hover:border-[#4DB848]/30">
              {/* İkon */}
              <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {step.iconType ? <StepIcon type={step.iconType} /> : <i className={`fas ${step.icon} text-white text-xl`}></i>}
              </div>

              {/* İçerik */}
              <h3 className="text-lg font-bold text-[#102477] mb-3 tracking-tight leading-snug">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 pb-12">
          {content.buttons?.map((button: any, idx: number) => {
            const isExternal = button.external || (button.link && button.link.startsWith('http'));
            const btnClass = `font-bold text-base flex items-center gap-3 transition-all px-10 py-4 rounded-xl shadow-lg hover:-translate-y-1 cursor-pointer ${button.style === 'primary'
                ? 'bg-[#4DB848] text-white hover:bg-[#3da03a]'
                : 'bg-white text-[#102477] border-2 border-gray-100 hover:border-[#102477]'
              }`;

            if (isExternal) {
              return (
                <a
                  key={button.id || idx}
                  href={button.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnClass}
                >
                  {button.text}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="16" y1="11" x2="22" y2="11" />
                  </svg>
                </a>
              );
            }

            return (
              <Link
                key={button.id || idx}
                to={button.link || '#'}
                className={btnClass}
              >
                {button.text}
                <i className={`fas ${button.icon || 'fa-arrow-right'} ${button.style === 'secondary' ? 'text-[#4DB848]' : ''}`}></i>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
