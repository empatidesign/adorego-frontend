
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
            { number: '01', text: 'Sistem sizi otomatik tanır, başvuru gerekmez.' },
            { number: '02', text: 'Gönderi sayınız arttıkça fiyatlar kendiliğinden düşer.' }
          ],
          card: {
            topBadge: 'AKILLI FİYATLANDIRMA',
            statusBadge: 'AKTİF',
            fromLabel: 'Standart',
            toLabel: 'Avantajlı Plus',
            discount: '-%40',
            discountLabel: 'YURTİÇİ KARGO İNDİRİMİ',
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
              <p className="text-slate-600 text-base font-normal mb-10 max-w-lg leading-relaxed">
                {content.earnSection?.description}
              </p>
              <div className="flex flex-col gap-4">
                {content.earnSection?.benefits?.map((benefit: any, idx: number) => {
                  const benefitText = typeof benefit === 'string' ? benefit : benefit.text;
                  const benefitNumber = typeof benefit === 'string' ? String(idx + 1).padStart(2, '0') : benefit.number || String(idx + 1).padStart(2, '0');
                  return (
                    <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <div className="w-10 h-10 bg-[#4DB848] rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0">
                        {benefitNumber}
                      </div>
                      <p className="font-medium text-sm text-gray-700">{benefitText}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative bg-gradient-to-br from-[#102477] via-[#1a3a9e] to-[#102477] rounded-xl shadow-lg p-10 min-h-[600px] flex flex-col justify-between">
                {/* Üst Badge */}
                <div className="flex justify-between items-center mb-10">
                  <span className="bg-white/10 backdrop-blur-sm text-white text-[9px] font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-white/20">
                    {content.earnSection?.card?.topBadge}
                  </span>
                  <span className="bg-[#4DB848] text-white text-[9px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                    {content.earnSection?.card?.statusBadge}
                  </span>
                </div>

                {/* Orta Bölüm - Fiyatlandırma ve İndirim */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* Fiyatlandırma Göstergesi */}
                  <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-white text-sm font-medium">{content.earnSection?.card?.fromLabel}</p>
                      <div className="flex-1 mx-4 relative h-2.5">
                        <div className="h-full bg-gray-300/30 rounded-full overflow-hidden">
                          <div className="h-full relative">
                            <div className="absolute left-0 top-0 w-1/2 h-full bg-gray-400/50 rounded-l-full"></div>
                            <div className="absolute left-1/2 top-0 w-1/2 h-full bg-[#4DB848] rounded-r-full"></div>
                            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                              <i className="fas fa-arrow-right text-[#4DB848] text-xs"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-white text-sm font-medium">{content.earnSection?.card?.toLabel}</p>
                    </div>
                  </div>
                  
                  {/* İndirim */}
                  <div className="text-center mb-12">
                    <p className="text-[120px] font-black mb-4 leading-none bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                      {content.earnSection?.card?.discount}
                    </p>
                    <p className="text-white text-[11px] font-bold uppercase tracking-[0.15em]">
                      {content.earnSection?.card?.discountLabel}
                    </p>
                  </div>
                </div>

                {/* Alt Mini Kartlar */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {content.earnSection?.card?.miniCards?.map((card: any, idx: number) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/20 text-center">
                      <i className={`fas ${card.icon} text-[#4DB848] text-2xl mb-3 block`}></i>
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
              // Default değerler
              const defaultIcons = ["fa-award", "fa-tags", "fa-shield-halved", "fa-headset"];
              const defaultColors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"];
              
              // Admin panelden gelen değerleri kullan, yoksa default kullan
              const icon = point.icon || defaultIcons[idx] || "fa-star";
              const color = point.color || defaultColors[idx] || "bg-blue-500";
              
              return (
                <div 
                  key={idx} 
                  className="bg-white p-8 rounded-[16px] shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-slate-200 hover:-translate-y-2 group"
                >
                  <div className={`w-14 h-14 ${color} rounded-[12px] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`fas ${icon} text-white text-xl`}></i>
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
