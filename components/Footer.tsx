
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../src/api-config';

const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <div className={`flex items-center ${className} select-none`}>
    <svg viewBox="0 0 240 60" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="45" fill="#102477" style={{ font: 'bold 44px Outfit, sans-serif', letterSpacing: '-2px' }}>adore</text>
      <path d="M145 45.5C136.5 45.5 129.5 38.5 129.5 30C129.5 21.5 136.5 14.5 145 14.5C153.5 14.5 160.5 21.5 160.5 30C160.5 31.5 160.2 33 159.7 34.3" stroke="#4DB848" strokeWidth="8" strokeLinecap="round"/>
      <path d="M152 45L162 45L162 35" stroke="#4DB848" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="168" y="45" fill="#4DB848" style={{ font: 'bold 44px Outfit, sans-serif', letterSpacing: '-1px' }}>o</text>
    </svg>
  </div>
);

const Footer: React.FC = () => {
  const { currentLang } = useLanguage();

  const getDefaultCta = (lang: string) => {
    if (lang === 'tr') {
      return {
        title: 'Sorun mu var? Kararsız mı kaldın?',
        subtitle: 'Destek ekibimiz e-ticaret lojistik süreçlerinizde her adımda yanınızda.',
        button1Text: 'İletişime Geç',
        button1Link: '#',
        button2Text: 'Ücretsiz Kayıt Ol',
        button2Link: '#'
      };
    } else {
      return {
        title: 'Having problems? Undecided?',
        subtitle: 'Our support team is with you at every step of your e-commerce logistics processes.',
        button1Text: 'Contact Us',
        button1Link: '#',
        button2Text: 'Free Sign Up',
        button2Link: '#'
      };
    }
  };

  const getDefaultBottomSection = (lang: string) => {
    if (lang === 'tr') {
      return {
        logoUrl: '', // Boş ise default SVG logo gösterilir
        tagline: 'Yeni Nesil Akıllı Lojistik Teknolojileri Platformu',
        socialLinks: [
          { platform: 'instagram', url: '#', icon: 'fa-instagram' },
          { platform: 'linkedin', url: '#', icon: 'fa-linkedin-in' }
        ],
        corporateTitle: 'Kurumsal Bağlantılar',
        corporateLinks: [
          { name: 'Hakkımızda', url: '#' },
          { name: 'İletişim', url: '#' },
          { name: 'Destek', url: '#' },
          { name: 'Gizlilik Politikası', url: '#' },
          { name: 'Kullanım Şartları', url: '#' },
          { name: 'KVKK Aydınlatma', url: '#' }
        ],
        copyrightText: '© 2024 adoreGo. Site kargo firması vitrini değil, teknoloji lojistik platformudur.'
      };
    } else {
      return {
        logoUrl: '', // Boş ise default SVG logo gösterilir
        tagline: 'Next Generation Smart Logistics Technology Platform',
        socialLinks: [
          { platform: 'instagram', url: '#', icon: 'fa-instagram' },
          { platform: 'linkedin', url: '#', icon: 'fa-linkedin-in' }
        ],
        corporateTitle: 'Corporate Links',
        corporateLinks: [
          { name: 'About Us', url: '#' },
          { name: 'Contact', url: '#' },
          { name: 'Support', url: '#' },
          { name: 'Privacy Policy', url: '#' },
          { name: 'Terms of Use', url: '#' },
          { name: 'GDPR Notice', url: '#' }
        ],
        copyrightText: '© 2024 adoreGo. This site is not a cargo company showcase, but a technology logistics platform.'
      };
    }
  };

  const getDefaultSections = (lang: string) => {
    if (lang === 'tr') {
      return [
        {
          title: "1-Hizmetlerimiz",
          links: [
            { n: "Yurtdışı Kargo", h: "#yurtdisi" },
            { n: "Ekonomik Kargo", h: "#yurtdisi" },
            { n: "Express Kargo", h: "#yurtdisi" },
            { n: "Yurtdışından Türkiye'ye", h: "#yurtdisi" },
            { n: "Yurtiçi Avantajlar", h: "#yurtici" },
            { n: "Alıcı Ödemeli Kargo", h: "#yurtici" },
            { n: "Kapıda Ödemeli Kargo", h: "#yurtici" },
            { n: "Büyük Desi Gönderimler", h: "#yurtici" }
          ]
        },
        {
          title: "2-Nasıl Çalışır?",
          links: [
            { n: "Nasıl Gönderirim?", h: "#nasil-calisir" },
            { n: "Kapıdan Alım – Teslim", h: "#nasil-calisir" },
            { n: "İlk Kez Gönderenler", h: "#nasil-calisir" },
            { n: "Gümrük & Evrak Rehberi", h: "#nasil-calisir" },
            { n: "Yurtdışı İade & Geri", h: "#nasil-calisir" },
            { n: "Hangi Gönderim Uygun?", h: "#nasil-calisir" }
          ]
        },
        {
          title: "3-Bilgi & Kaynaklar",
          links: [
            { n: "Lojistik Blog", h: "#" },
            { n: "Sıkça Sorulan Sorular", h: "#sss" },
            { n: "Yurtdışı Kargo Rehberi", h: "#" },
            { n: "Mikro İhracat Rehberi", h: "#" },
            { n: "Gümrük Rehberi", h: "#" },
            { n: "Güncel Duyurular", h: "#" }
          ]
        },
        {
          title: "4-Entegrasyonlar",
          links: [
            { n: "Shopify Entegrasyonu", h: "#" },
            { n: "Etsy Entegrasyonu", h: "#" },
            { n: "Amazon Entegrasyonu", h: "#" },
            { n: "WooCommerce", h: "#" },
            { n: "Özel Site Kargo API", h: "#" }
          ]
        }
      ];
    } else {
      return [
        {
          title: "1-Our Services",
          links: [
            { n: "International Shipping", h: "#yurtdisi" },
            { n: "Economy Shipping", h: "#yurtdisi" },
            { n: "Express Shipping", h: "#yurtdisi" },
            { n: "From Abroad to Turkey", h: "#yurtdisi" },
            { n: "Domestic Advantages", h: "#yurtici" },
            { n: "Receiver Payment", h: "#yurtici" },
            { n: "Cash on Delivery", h: "#yurtici" },
            { n: "Large Volume Shipments", h: "#yurtici" }
          ]
        },
        {
          title: "2-How It Works?",
          links: [
            { n: "How to Ship?", h: "#nasil-calisir" },
            { n: "Door to Door", h: "#nasil-calisir" },
            { n: "First Time Shippers", h: "#nasil-calisir" },
            { n: "Customs & Documents Guide", h: "#nasil-calisir" },
            { n: "International Returns", h: "#nasil-calisir" },
            { n: "Which Shipping is Right?", h: "#nasil-calisir" }
          ]
        },
        {
          title: "3-Info & Resources",
          links: [
            { n: "Logistics Blog", h: "#" },
            { n: "FAQ", h: "#sss" },
            { n: "International Shipping Guide", h: "#" },
            { n: "Micro Export Guide", h: "#" },
            { n: "Customs Guide", h: "#" },
            { n: "Latest Announcements", h: "#" }
          ]
        },
        {
          title: "4-Integrations",
          links: [
            { n: "Shopify Integration", h: "#" },
            { n: "Etsy Integration", h: "#" },
            { n: "Amazon Integration", h: "#" },
            { n: "WooCommerce", h: "#" },
            { n: "Custom Site Shipping API", h: "#" }
          ]
        }
      ];
    }
  };

  const [sections, setSections] = useState<any[]>(getDefaultSections(currentLang));
  const [cta, setCta] = useState<any>(getDefaultCta(currentLang));
  const [bottomSection, setBottomSection] = useState<any>(getDefaultBottomSection(currentLang));

  useEffect(() => {
    // API'den yükle
    axios.get(`${API_BASE_URL}/content/footer?lang=${currentLang}`)
      .then(res => {
        console.log('Footer API Response:', res.data); // DEBUG
        if (res.data && Object.keys(res.data).length > 0) {
          // Sections
          if (res.data.sections && res.data.sections.length > 0) {
            setSections(res.data.sections);
          } else {
            setSections(getDefaultSections(currentLang));
          }
          // CTA
          if (res.data.cta && Object.keys(res.data.cta).length > 0) {
            setCta(res.data.cta);
          } else {
            setCta(getDefaultCta(currentLang));
          }
          // Bottom Section
          if (res.data.bottomSection && Object.keys(res.data.bottomSection).length > 0) {
            console.log('Bottom Section from API:', res.data.bottomSection); // DEBUG
            console.log('Logo URL:', res.data.bottomSection.logoUrl); // DEBUG
            setBottomSection(res.data.bottomSection);
          } else {
            console.log('Using default bottom section'); // DEBUG
            setBottomSection(getDefaultBottomSection(currentLang));
          }
        } else {
          setSections(getDefaultSections(currentLang));
          setCta(getDefaultCta(currentLang));
          setBottomSection(getDefaultBottomSection(currentLang));
        }
      })
      .catch(err => {
        console.error('Footer content yüklenemedi:', err);
        setSections(getDefaultSections(currentLang));
        setCta(getDefaultCta(currentLang));
        setBottomSection(getDefaultBottomSection(currentLang));
      });
  }, [currentLang]);

  return (
    <>
      {/* Menü Bölümü - Tam Sayfa Genişliği */}
      <div className="w-full bg-slate-50/50 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {sections.map((section, idx) => (
              <nav key={idx} aria-label={section.title}>
                <h4 className="font-bold text-[#102477] text-xs mb-8 uppercase tracking-[0.1em] border-l-4 border-[#4DB848] pl-3">
                  {section.title}
                </h4>
                <ul className="space-y-4 text-slate-500 font-bold text-[12px]">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a href={link.h} className="hover:text-[#4DB848] transition-colors inline-block" title={link.n}>
                        {link.n}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-white text-[#102477] pt-12 pb-12 border-t border-slate-100" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <section className="bg-slate-50 p-8 rounded-[10px] mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="font-bold text-[#102477] text-lg mb-2">{cta.title}</h4>
              <p className="text-slate-500 text-sm font-medium">{cta.subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.location.href = cta.button1Link}
                className="bg-[#102477] text-white px-8 py-3 rounded-[10px] font-bold text-sm flex items-center gap-2 hover:bg-black transition-colors"
              >
                <i className="fas fa-comment-dots" aria-hidden="true"></i> {cta.button1Text}
              </button>
              <button 
                onClick={() => window.location.href = cta.button2Link}
                className="bg-[#4DB848] text-white px-8 py-3 rounded-[10px] font-bold text-sm hover:bg-[#3da339] transition-colors shadow-lg shadow-green-500/10"
              >
                {cta.button2Text}
              </button>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 border-b border-slate-50 pb-12">
            <div className="lg:col-span-1">
              <div className="flex-shrink-0 flex items-center mb-6">
                {bottomSection.logoUrl ? (
                  <img src={bottomSection.logoUrl} alt="Logo" className="h-10" />
                ) : (
                  <Logo className="h-10" />
                )}
              </div>
              <p className="text-slate-400 text-xs font-bold leading-relaxed mb-6 uppercase tracking-wider">{bottomSection.tagline}</p>
              <div className="flex gap-3">
                {bottomSection.socialLinks?.map((social: any, idx: number) => (
                  <a 
                    key={idx}
                    href={social.url} 
                    className="w-8 h-8 rounded-[10px] bg-slate-100 flex items-center justify-center hover:bg-[#102477] hover:text-white transition-all" 
                    aria-label={social.platform}
                  >
                    <i className={`fab ${social.icon} text-xs`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <h4 className="font-bold text-[#102477] text-xs mb-8 uppercase tracking-[0.1em]">{bottomSection.corporateTitle}</h4>
              <ul className="flex flex-wrap gap-x-8 gap-y-4 text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                {bottomSection.corporateLinks?.map((link: any, idx: number) => (
                  <li key={idx}>
                    <a href={link.url} className="hover:text-[#102477]" title={link.name}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">{bottomSection.copyrightText || '© 2024 adoreGo. Site kargo firması vitrini değil, teknoloji lojistik platformudur.'}</p>
            <div className="flex items-center gap-6 opacity-20">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="Güvenli Ödeme - Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Güvenli Ödeme - Mastercard" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
