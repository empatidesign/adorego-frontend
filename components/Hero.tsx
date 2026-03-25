
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../src/api-config';

const Hero: React.FC = () => {
  const { currentLang } = useLanguage();
  const [content, setContent] = useState<any>({
    title: currentLang === 'tr' ? "Kazanç\nYurtdışında.\nEn Uygun Kargo Bizde." : "Profit\nAbroad.\nBest Shipping Rates Here.",
    subtitle: currentLang === 'tr' ? "Yurtdışına kargo gönderimi yapan e-ticaret siteleri için kapıdan alım, mikro ihracat ve hızlı teslimat çözümleri adoreGo'da." : "Door-to-door pickup, micro export, and fast delivery solutions for e-commerce sites shipping internationally with adoreGo.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    buttons: [
      { text: currentLang === 'tr' ? "Ücretsiz Üye Ol" : "Free Sign Up", icon: "fa-user-plus", style: "success" }
    ],
    badges: [
      { text: currentLang === 'tr' ? "BAŞVURU GEREKMEZ" : "NO APPLICATION REQUIRED", icon: "fa-check", color: "blue" },
      { text: currentLang === 'tr' ? "SABİT FİYAT GARANTİSİ" : "FIXED PRICE GUARANTEE", icon: "fa-check", color: "green" }
    ],
    stats: [
      { value: "220+", label: currentLang === 'tr' ? "GLOBAL ÜLKE AĞI" : "GLOBAL NETWORK", icon: "fa-globe-africa" },
      { value: currentLang === 'tr' ? "35 Yıl" : "35 Years", label: currentLang === 'tr' ? "SEKTÖREL TECRÜBE" : "INDUSTRY EXPERIENCE", icon: "fa-award" }
    ]
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/content/hero?lang=${currentLang}`)
      .then(res => {
        console.log('Hero API Response:', res.data);
        if (res.data && Object.keys(res.data).length > 0) {
          setContent((prev: any) => ({ ...prev, ...res.data }));
        }
      })
      .catch(err => {
        console.error('Hero content yüklenemedi:', err);
        // Hata durumunda default değerler zaten yüklü
      });
  }, [currentLang]);

  const titleLines = content?.title?.split('\n') || [];

  return (
    <header className="relative min-h-[80vh] flex items-center overflow-hidden pt-20 bg-gradient-to-br from-[#102477] via-[#1a3a9e] to-[#102477]">
      {/* Dekoratif Elementler */}
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-[#4DB848]/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute right-0 top-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute left-1/4 bottom-1/4 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl z-0"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          
          <div className="text-left py-10 lg:py-0">
            <h1 className="text-[38px] lg:text-[58px] font-bold leading-[1.1] mt-[20px] mb-6 tracking-[-0.03em] text-white">
              {titleLines.map((line: string, i: number) => (
                <React.Fragment key={i}>
                  {i === titleLines.length - 1 ? (
                    <span className="text-[#4DB848]">{line}</span>
                  ) : (
                    line
                  )}
                  {i < titleLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-lg font-medium leading-relaxed tracking-tight">
              {content.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {content.buttons?.filter((button: any) => button.text !== "Fiyatı Anında Gör").map((button: any, index: number) => (
                <button 
                  key={index}
                  className="bg-[#4DB848] hover:bg-[#3da339] text-white px-8 py-3.5 rounded-[10px] font-bold text-[14px] transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
                >
                  <i className={`fas ${button.icon} text-[10px]`}></i>
                  {button.text}
              </button>
              ))}
            </div>

            <div className="flex items-center gap-8">
              {content.badges?.map((badge: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-sm ${badge.color === 'blue' ? 'bg-blue-400' : 'bg-green-400'} flex items-center justify-center shadow-md`}>
                    <i className={`fas ${badge.icon} text-[7px] text-white`}></i>
                  </div>
                  <span className="text-[9px] font-bold text-white/70 uppercase tracking-[0.15em]">{badge.text}</span>
               </div>
              ))}
            </div>
          </div>
          
          <div className="relative flex justify-center items-center py-10 lg:py-0">
            <div className="relative w-full max-w-md">
              {/* Görsel */}
              <div className="relative z-10 overflow-hidden rounded-[20px] shadow-2xl mb-6">
                <img 
                  src={content.image} 
                  alt="adoreGo Global Lojistik ve Yurtdışı Kargo Çözümleri" 
                  className="w-full aspect-video object-cover"
                />
              </div>
              
              {/* Stat Kartları - Yan Yana */}
              <div className="relative z-10 grid grid-cols-2 gap-4">
                {content.stats?.map((stat: any, index: number) => (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-md text-white px-5 py-6 rounded-[16px] border border-white/30 flex flex-col items-center text-center hover:bg-white/20 transition-all animate-float shadow-xl"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <div className="w-14 h-14 bg-[#4DB848] rounded-full flex items-center justify-center mb-3 shadow-lg">
                      <i className={`fas ${stat.icon} text-xl text-white`} aria-hidden="true"></i>
                    </div>
                    <p className="text-3xl font-black tracking-tight mb-1">{stat.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/80 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Hero;
