
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../src/api-config';

const TargetAudience: React.FC = () => {
  const { currentLang } = useLanguage();

  const getDefaultContent = (lang: string) => {
    if (lang === 'tr') {
      return {
        earnSection: {
          badge: 'GÖNDERDİKÇE KAZAN',
          title: 'Yurtdışı Gönder',
          highlightedTitle: 'Yurtiçi Ucuzlasın.',
          description: 'Yurtdışı gönderi yaptığınızda sistem sizi aktif kullanıcı olarak tanır ve yurtiçi kargo fiyatlarınız otomatik olarak avantajlı hale gelir.',
          benefits: [
            'Sistem sizi otomatik tanır, başvuru gerekmez.',
            'Gönderi sayınız arttıkça fiyatlar kendiliğinden düşer.'
          ],
          card: {
            topBadge: 'Akıllı Fiyatlandırma',
            statusBadge: 'AKTİF',
            fromLabel: 'Standart',
            toLabel: 'Avantajlı Plus',
            discount: '-%40',
            discountLabel: 'Yurtiçi Kargo İndirimi',
            miniCards: [
              { icon: 'fa-shipping-fast', label: 'Hızlı Teslimat' },
              { icon: 'fa-chart-line', label: 'Otomatik İndirim' }
            ]
          }
        },
        trustSection: {
          title: 'Neden bize',
          highlightedTitle: 'Güvenmelisiniz?',
          points: [
            { title: '35 Yıllık Tecrübe', desc: 'Yazılım ve teknoloji alanındaki derin birikimimizle yanınızdayız.' },
            { title: 'Net Fiyat Garantisi', desc: 'Fiyatlar baştan nettir, sonradan sürpriz masraf çıkmaz.' },
            { title: 'Kontrollü Süreç', desc: 'Teslim edilemeyen gönderiler dahil her an kontrol altındadır.' },
            { title: 'Tek Nokta Destek', desc: 'Tüm süreçleriniz için tek bir muhatap ve hızlı çözüm.' }
          ]
        }
      };
    } else {
      return {
        earnSection: {
          badge: 'EARN AS YOU SHIP',
          title: 'Ship Abroad',
          highlightedTitle: 'Domestic Gets Cheaper.',
          description: 'When you make international shipments, the system recognizes you as an active user and your domestic cargo prices automatically become advantageous.',
          benefits: [
            'System recognizes you automatically, no application required.',
            'Prices decrease automatically as your shipment count increases.'
          ],
          card: {
            topBadge: 'Smart Pricing',
            statusBadge: 'ACTIVE',
            fromLabel: 'Standard',
            toLabel: 'Advantageous Plus',
            discount: '-%40',
            discountLabel: 'Domestic Cargo Discount',
            miniCards: [
              { icon: 'fa-shipping-fast', label: 'Fast Delivery' },
              { icon: 'fa-chart-line', label: 'Auto Discount' }
            ]
          }
        },
        trustSection: {
          title: 'Why should you',
          highlightedTitle: 'Trust us?',
          points: [
            { title: '35 Years Experience', desc: 'We are with you with our deep knowledge in software and technology.' },
            { title: 'Net Price Guarantee', desc: 'Prices are net from the start, no surprise costs later.' },
            { title: 'Controlled Process', desc: 'Everything is under control at all times, including undeliverable shipments.' },
            { title: 'Single Point Support', desc: 'One contact and quick solution for all your processes.' }
          ]
        }
      };
    }
  };

  const [content, setContent] = useState<any>(getDefaultContent(currentLang));

  useEffect(() => {
    // API'den yükle
    axios.get(`${API_BASE_URL}/content/target-audience?lang=${currentLang}`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          // API'den gelen veriyi default ile merge et (eksik alanları doldur)
          const defaultData = getDefaultContent(currentLang);
          const mergedData = {
            earnSection: {
              ...defaultData.earnSection,
              ...res.data.earnSection,
              card: {
                ...defaultData.earnSection.card,
                ...res.data.earnSection?.card,
                miniCards: res.data.earnSection?.card?.miniCards?.length > 0 
                  ? res.data.earnSection.card.miniCards 
                  : defaultData.earnSection.card.miniCards
              },
              benefits: res.data.earnSection?.benefits?.length > 0 
                ? res.data.earnSection.benefits 
                : defaultData.earnSection.benefits
            },
            trustSection: {
              ...defaultData.trustSection,
              ...res.data.trustSection,
              points: res.data.trustSection?.points?.length > 0 
                ? res.data.trustSection.points 
                : defaultData.trustSection.points
            }
          };
          setContent(mergedData);
        } else {
          setContent(getDefaultContent(currentLang));
        }
      })
      .catch(err => {
        console.error('Target Audience content yüklenemedi:', err);
        setContent(getDefaultContent(currentLang));
      });
  }, [currentLang]);

  const trustPoints = content.trustSection?.points || [];

  return (
    <>
      {/* Gri Zemin - Yurtdışı Gönder Yurtiçi Ucuzlasın Bölümü */}
      <section className="py-24 bg-slate-100 text-[#102477] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4DB848]/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="lg:flex items-center justify-between gap-16">
            <div className="lg:w-1/2">
              <span className="text-[#4DB848] font-bold text-[9px] uppercase tracking-[0.2em] mb-4 block">{content.earnSection?.badge}</span>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 tracking-tight leading-tight">
                {content.earnSection?.title} <br />
                <span className="text-[#4DB848]">{content.earnSection?.highlightedTitle}</span>
              </h2>
              <p className="text-slate-600 text-lg font-medium mb-10 max-w-lg leading-relaxed">
                {content.earnSection?.description}
              </p>
              <div className="flex flex-col gap-4">
                {content.earnSection?.benefits?.map((benefit: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-[10px] shadow-sm border border-slate-200">
                    <div className="w-8 h-8 bg-[#4DB848] rounded-[5px] flex items-center justify-center font-bold text-xs text-white">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <p className="font-semibold text-[13px] text-slate-700 tracking-tight">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative bg-gradient-to-br from-[#102477] via-[#1a3a9e] to-[#4DB848] rounded-[20px] shadow-2xl p-8">
                {/* Üst Badge */}
                <div className="flex justify-between items-center mb-8">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[9px] font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-white/30">
                    {content.earnSection?.card?.topBadge}
                  </span>
                  <span className="bg-[#4DB848] text-white text-[9px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                    {content.earnSection?.card?.statusBadge}
                  </span>
                </div>

                {/* Ana İçerik - Ortada */}
                <div className="text-center my-12">
                  <div className="bg-white/10 backdrop-blur-md rounded-[20px] px-10 py-12 border border-white/30">
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-4">{content.earnSection?.card?.fromLabel}</p>
                    
                    <div className="flex items-center justify-center gap-6 my-8">
                      <div className="w-20 h-1.5 bg-white/40 rounded-full"></div>
                      <i className="fas fa-arrow-right text-white text-3xl"></i>
                      <div className="w-20 h-1.5 bg-[#4DB848] rounded-full shadow-lg shadow-green-500/50"></div>
                    </div>
                    
                    <p className="text-white text-sm font-bold uppercase tracking-widest mb-12">{content.earnSection?.card?.toLabel}</p>
                    
                    <div className="pt-8 border-t border-white/30">
                      <p className="text-6xl font-black text-white mb-3 drop-shadow-lg">{content.earnSection?.card?.discount}</p>
                      <p className="text-[#4DB848] text-xs font-bold uppercase tracking-widest">
                        {content.earnSection?.card?.discountLabel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Alt Mini Kartlar */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {content.earnSection?.card?.miniCards?.map((card: any, idx: number) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-md rounded-[16px] p-5 border border-white/30 text-center">
                      <i className={`fas ${card.icon} text-[#4DB848] text-3xl mb-3`}></i>
                      <p className="text-white text-xs font-bold">{card.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beyaz Zemin - Neden Bize Güvenmelisiniz Bölümü */}
      <section className="py-24 bg-white text-[#102477]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#102477]">
              {content.trustSection?.title} <span className="text-[#4DB848]">{content.trustSection?.highlightedTitle}</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((point, idx) => {
              const icons = ["fa-award", "fa-tags", "fa-shield-halved", "fa-headset"];
              const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"];
              return (
                <div 
                  key={idx} 
                  className="bg-white p-8 rounded-[16px] shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-slate-200 hover:-translate-y-2 group"
                >
                  <div className={`w-14 h-14 ${colors[idx]} rounded-[12px] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`fas ${icons[idx]} text-white text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-bold mb-3 tracking-tight text-[#102477] group-hover:text-[#4DB848] transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default TargetAudience;
