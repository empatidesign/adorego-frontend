
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../api-config';

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
            { number: '01', text: 'Yurtdışı gönderi yap → sistem seni tanır' },
            { number: '02', text: 'Yurtiçi fiyatların otomatik düşer' },
            { number: '03', text: 'Gönderdikçe avantajın artar' }
          ],
          bottomText: 'Başvuru yok. Pazarlık yok. Sistem kendisi uygular.',
          buttons: [
            { text: 'Yurtdışı Gönder', link: '/yurtdisi-kargo', style: 'primary' },
            { text: 'Yurtiçi Fiyatları İste', link: '/yurtici-kargo', style: 'secondary' }
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
          title: 'Kargon güvende,',
          highlightedTitle: 'süreç kontrol altında',
          points: [
            { title: '35+ Yıl Tecrübe', desc: '35+ yıl yazılım ve teknoloji tecrübesi' },
            { title: 'Net Fiyat', desc: 'Fiyatlar baştan net, sürpriz yok' },
            { title: 'Anlık Takip', desc: 'Tüm gönderiler panelden anlık takip edilir' },
            { title: 'Kontrollü Süreç', desc: 'İade ve sorunlu gönderiler kontrol altında' }
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
            { number: '01', text: 'Ship internationally → system recognizes you' },
            { number: '02', text: 'Your domestic prices drop automatically' },
            { number: '03', text: 'Your advantage grows as you ship more' }
          ],
          bottomText: 'No application. No negotiation. The system applies it automatically.',
          buttons: [
            { text: 'Ship Abroad', link: '/yurtdisi-kargo', style: 'primary' },
            { text: 'Get Domestic Prices', link: '/yurtici-kargo', style: 'secondary' }
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
          title: 'Your cargo is safe,',
          highlightedTitle: 'process under control',
          points: [
            { title: '35+ Years Experience', desc: '35+ years of software and technology expertise' },
            { title: 'Transparent Pricing', desc: 'Prices are clear upfront, no surprises' },
            { title: 'Live Tracking', desc: 'Track all shipments instantly from the panel' },
            { title: 'Controlled Process', desc: 'Returns and problematic shipments under control' }
          ]
        }
      };
    }
  };

  const [content, setContent] = useState<any>(getDefaultContent(currentLang));

  useEffect(() => {
    axios.get(`${API_BASE_URL}/content/target-audience?lang=${currentLang}`)
      .then(res => {
        if (res.data && res.data.earnSection) setContent(res.data);
        else setContent(getDefaultContent(currentLang));
      })
      .catch(() => setContent(getDefaultContent(currentLang)));
  }, [currentLang]);

  const trustPoints = content.trustSection?.points || [];

  return (
    <>
      {/* Gri Zemin - Yurtdışı Gönder Yurtiçi Ucuzlasın Bölümü */}
      <section className="py-8 md:py-24 bg-slate-100 text-[#102477] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4DB848]/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="lg:flex items-center justify-between gap-16">
            <div className="lg:w-1/2">
              <span className="text-[#4DB848] font-bold text-sm uppercase tracking-[0.2em] mb-4 block">{content.earnSection?.badge}</span>
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

              {/* Alt Yazı ve Butonlar */}
              <div className="mt-10">
                <p className="text-slate-500 text-sm font-medium mb-6">{content.earnSection?.bottomText}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {content.earnSection?.buttons?.map((button: any, idx: number) => (
                    <a
                      key={idx}
                      href={button.link}
                      className={`font-bold text-base flex items-center justify-center gap-2 px-8 py-4 rounded-xl transition-all hover:-translate-y-1 ${
                        button.style === 'primary'
                          ? 'bg-[#102477] text-white hover:bg-[#0a1a5a] shadow-lg'
                          : 'bg-white text-[#102477] border-2 border-gray-200 hover:border-[#102477]'
                      }`}
                    >
                      {button.text}
                      <i className={`fas fa-arrow-right ${button.style === 'secondary' ? 'text-[#4DB848]' : ''}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Sağ Taraf - Resim Alanı */}
            <div className="hidden lg:block lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative bg-gradient-to-br from-[#102477] via-[#1a3a9e] to-[#102477] rounded-xl shadow-lg min-h-[600px] flex items-center justify-center overflow-hidden">
                {content.earnSection?.card?.image ? (
                  <img src={content.earnSection.card.image.startsWith('http') ? content.earnSection.card.image : `${API_BASE_URL}${content.earnSection.card.image}`} alt="" className="w-full h-full object-cover absolute inset-0" />
                ) : (
                  <div className="text-center p-10">
                    <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <i className="fas fa-image text-white/40 text-4xl"></i>
                    </div>
                    <p className="text-white/40 text-sm font-medium">Görsel Alanı</p>
                    <p className="text-white/30 text-xs mt-2">Admin panelden resim ekleyebilirsiniz</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beyaz Zemin - Neden Bize Güvenmelisiniz Bölümü */}
      <section className="pb-8 md:pb-24 pt-14 bg-white text-[#102477]">
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
