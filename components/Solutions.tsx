
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../src/api-config';

const Solutions: React.FC = () => {
  const { currentLang } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const getDefaultContent = () => ({
    badge: currentLang === 'tr' ? 'ÖZEL ÇÖZÜMLER' : 'SPECIAL SOLUTIONS',
    title: currentLang === 'tr' ? 'İhtiyacına Göre' : 'Smart Shipping',
    highlightedTitle: currentLang === 'tr' ? 'Akıllı Gönderim.' : 'Based on Your Needs.',
    buttonText: currentLang === 'tr' ? 'HEMEN BAŞLA' : 'GET STARTED',
    buttonLink: '#kayit',
    services: [
      {
        id: '1',
        title: currentLang === 'tr' ? 'Mikro İhracat Satış Amaçlı Gönderimler' : 'Micro Export for Sales Purposes',
        desc: currentLang === 'tr' 
          ? 'Yurtdışına ürün satışı yapıyorsan, kargonu mikro ihracata uygun gönder. Büyük firma olman gerekmez, küçük adetli satışlar yapılabilir.'
          : "If you're selling products abroad, send your cargo suitable for micro export. You don't need to be a large company, small quantity sales are possible.",
        icon: 'fa-box-open',
        color: 'bg-blue-500',
        bgColor: 'bg-blue-50',
        order: 0
      },
      {
        id: '2',
        title: currentLang === 'tr' ? 'Büyük Desi + Alıcı Ödemeli' : 'Large Volume + Receiver Payment',
        desc: currentLang === 'tr'
          ? 'Desisi yüksek gönderilerde kapıda nakit & kart tahsilat. Kargo ücretini alıcı ödemeli gönderebilirsin.'
          : 'Cash & card collection at the door for high volume shipments. You can send the cargo with receiver payment.',
        icon: 'fa-truck-loading',
        color: 'bg-purple-500',
        bgColor: 'bg-purple-50',
        order: 1
      },
      {
        id: '3',
        title: currentLang === 'tr' ? 'Alıcı Ödemeli Kargo (Yurtiçi)' : 'Receiver Payment Cargo (Domestic)',
        desc: currentLang === 'tr'
          ? 'Kargo ücreti satıcıdan değil, teslimatta alıcıdan tahsil edilir. Alıcı nakit veya kredi kartı ile ödeyebilir.'
          : 'Cargo fee is collected from the receiver on delivery, not from the sender. Receiver can pay by cash or credit card.',
        icon: 'fa-hand-holding-dollar',
        color: 'bg-green-500',
        bgColor: 'bg-green-50',
        order: 2
      },
      {
        id: '4',
        title: currentLang === 'tr' ? "Yurtdışından Türkiye'ye Kargo" : 'From Abroad to Turkey Cargo',
        desc: currentLang === 'tr'
          ? "Yurtdışındaki adresinden Türkiye'deki adrese kargo gönderebilirsin. Kapıdan alım, kapıya teslim."
          : 'You can send cargo from your address abroad to an address in Turkey. Door-to-door pickup and delivery.',
        icon: 'fa-plane-arrival',
        color: 'bg-orange-500',
        bgColor: 'bg-orange-50',
        order: 3
      }
    ],
    shippingOptions: [
      {
        id: '1',
        title: currentLang === 'tr' ? 'Ekonomik Kargo' : 'Economy Shipping',
        subtitle: currentLang === 'tr' ? 'Fiyat Öncelikliyse' : 'If Price is Priority',
        icon: 'fa-coins',
        color: 'bg-green-500',
        description: currentLang === 'tr'
          ? 'Maliyetinizi düşürün. Zaman esnekliğiniz varsa en uygun fiyatlarla standart teslimat süresi ile gönderin.'
          : 'Reduce your costs. If you have time flexibility, ship with the most affordable prices and standard delivery time.',
        features: currentLang === 'tr' 
          ? ['En uygun fiyat', '5-7 iş günü teslimat', 'Güvenli taşıma']
          : ['Best price', '5-7 business days delivery', 'Safe transport'],
        order: 0
      },
      {
        id: '2',
        title: currentLang === 'tr' ? 'Express Kargo' : 'Express Shipping',
        subtitle: currentLang === 'tr' ? 'Hız Öncelikliyse' : 'If Speed is Priority',
        icon: 'fa-bolt',
        color: 'bg-yellow-500',
        description: currentLang === 'tr'
          ? 'Acil gönderimleriniz için hızlı teslimat. 2-3 iş günü içinde adrese teslim garantisi.'
          : 'Fast delivery for your urgent shipments. Guaranteed address delivery within 2-3 business days.',
        features: currentLang === 'tr'
          ? ['Hızlı teslimat', '2-3 iş günü', 'Öncelikli işlem']
          : ['Fast delivery', '2-3 business days', 'Priority processing'],
        order: 1
      },
      {
        id: '3',
        title: currentLang === 'tr' ? 'Mikro İhracat' : 'Micro Export',
        subtitle: currentLang === 'tr' ? 'Satış Amaçlıysa' : 'If For Sales Purpose',
        icon: 'fa-store',
        color: 'bg-blue-500',
        description: currentLang === 'tr'
          ? 'E-ticaret satışlarınız için özel çözüm. Gümrük işlemleri dahil, ticari gönderi avantajları.'
          : 'Special solution for your e-commerce sales. Customs procedures included, commercial shipment advantages.',
        features: currentLang === 'tr'
          ? ['Gümrük kolaylığı', 'Ticari fatura', 'Düşük vergi oranı']
          : ['Customs facilitation', 'Commercial invoice', 'Low tax rate'],
        order: 2
      }
    ]
  });

  const [content, setContent] = useState<any>(getDefaultContent());

  useEffect(() => {
    // Önce default content'i güncelle (dil değişiminde)
    setContent(getDefaultContent());
    
    // Sonra API'den yükle
    axios.get(`${API_BASE_URL}/content/solutions?lang=${currentLang}`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setContent(res.data);
        }
      })
      .catch(err => {
        console.error('Solutions content yüklenemedi:', err);
        // Default zaten ayarlandı
      });
  }, [currentLang]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#4DB848] font-bold text-[9px] uppercase tracking-[0.2em] mb-3 block">{content.badge}</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] mb-4 tracking-tight leading-tight">
            {content.title} <span className="text-[#4DB848]">{content.highlightedTitle}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Sol Taraf - Servisler */}
          <div className="space-y-5">
            {content.services?.sort((a: any, b: any) => a.order - b.order).map((service: any, idx: number) => (
              <div 
                key={idx} 
                className="group bg-white rounded-[16px] p-6 border-2 border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex gap-5">
                  <div className={`w-16 h-16 ${service.color} rounded-[14px] flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`fas ${service.icon} text-2xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-[#102477] mb-2 group-hover:text-[#4DB848] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Sağ Taraf - Kart Önerisi */}
          <div className="relative lg:sticky lg:top-24">
            <div className="bg-gradient-to-br from-[#102477] via-[#1a3a9e] to-[#102477] rounded-[20px] p-10 text-white relative overflow-hidden shadow-2xl">
              {/* Dekoratif Elementler */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#4DB848]/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 tracking-tight">Hangi Gönderim Bana Uygun?</h3>
                <p className="text-white/70 text-sm mb-8 font-medium leading-relaxed">
                  Kararsızsan sorun değil. Sistem, gönderinin aciliyet ve önceliğine göre en uygun gönderimi seçer.
                </p>
                
                <div className="space-y-3 mb-10">
                  {content.shippingOptions?.sort((a: any, b: any) => a.order - b.order).map((option: any) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedOption(selectedOption === option.id ? null : option.id)}
                      className={`w-full text-left transition-all duration-300 ${
                        selectedOption === option.id ? 'bg-white/20' : 'bg-white/10'
                      } backdrop-blur-sm rounded-[14px] border border-white/20 hover:bg-white/15`}
                    >
                      <div className="flex items-center gap-4 p-5">
                        <div className={`w-10 h-10 ${option.color || 'bg-[#4DB848]'} rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-110`}>
                          <i className={`fas ${option.icon} text-white text-lg`}></i>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-white/60 mb-1">{option.subtitle}</p>
                          <p className="text-sm font-bold">{option.title}</p>
                        </div>
                        <i className={`fas ${selectedOption === option.id ? 'fa-chevron-up' : 'fa-chevron-down'} text-white/40 transition-all`}></i>
                      </div>
                      
                      {/* Açılır İçerik */}
                      {selectedOption === option.id && (
                        <div className="px-5 pb-5 pt-2 border-t border-white/10">
                          <p className="text-sm text-white/80 mb-3 leading-relaxed">{option.description}</p>
                          <ul className="space-y-2">
                            {option.features?.map((feature: string, idx: number) => (
                              <li key={idx} className="flex items-center gap-2 text-xs text-white/70">
                                <i className="fas fa-check text-[#4DB848]"></i>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                <a 
                  href={content.buttonLink || '#'} 
                  className="block w-full bg-[#4DB848] text-white py-4 rounded-[14px] font-bold hover:bg-[#3da339] transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] duration-300 text-center"
                >
                  {content.buttonText || 'HEMEN BAŞLA'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
