
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../src/api-config';

const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <div className={`flex items-center ${className} select-none`}>
    <svg viewBox="0 0 240 60" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="45" fill="#102477" style={{ font: 'bold 44px Outfit, sans-serif', letterSpacing: '-2px' }}>adore</text>
      <path d="M145 45.5C136.5 45.5 129.5 38.5 129.5 30C129.5 21.5 136.5 14.5 145 14.5C153.5 14.5 160.5 21.5 160.5 30C160.5 31.5 160.2 33 159.7 34.3" stroke="#4DB848" strokeWidth="8" strokeLinecap="round" />
      <path d="M152 45L162 45L162 35" stroke="#4DB848" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
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
        subtitle: 'Destek ekibimiz yardımcı olsun.',
        button1Text: 'İletişime Geç',
        button1Link: '/iletisim',
        button2Text: 'Ücretsiz Üye Ol',
        button2Link: 'https://app.adorelgo.com'
      };
    } else {
      return {
        title: 'Having problems? Undecided?',
        subtitle: 'Let our support team help you.',
        button1Text: 'Contact Us',
        button1Link: '/iletisim',
        button2Text: 'Free Sign Up',
        button2Link: 'https://app.adorelgo.com'
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
        corporateTitle: 'Kurumsal',
        corporateLinks: [
          { name: 'Hakkımızda', url: '/hakkimizda' },
          { name: 'İletişim', url: '/iletisim' },
          { name: 'Destek', url: '/iletisim' },
          { name: 'KVKK Aydınlatma Metni', url: '/kvkk' }
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
        corporateTitle: 'Corporate',
        corporateLinks: [
          { name: 'About Us', url: '/hakkimizda' },
          { name: 'Contact', url: '/iletisim' },
          { name: 'Support', url: '/iletisim' },
          { name: 'GDPR Notice', url: '/kvkk' }
        ],
        copyrightText: '© 2024 adoreGo. This site is not a cargo company showcase, but a technology logistics platform.'
      };
    }
  };

  const getDefaultSections = (lang: string) => {
    if (lang === 'tr') {
      return [
        {
          title: "Hizmetlerimiz",
          links: [
            { n: "Yurtdışı Kargo", h: "/yurtdisi-kargo" },
            { n: "Yurtiçi Kargo", h: "/yurtici-kargo" },
            { n: "Yurtdışından Türkiye'ye Kargo", h: "/yurtdisindan-turkiye" },
            { n: "Alıcı Ödemeli Lojistik", h: "/yurtici-kargo#alici-odemeli" },
            { n: "Kapıda Ödemeli Kargo", h: "/yurtici-kargo#kapida-odemeli" }
          ]
        },
        {
          title: "Nasıl Gönderirim?",
          links: [
            { n: "Nasıl Gönderirim?", h: "/yurtdisi-kargo#nasil-gonderirim" },
            { n: "Kapıdan Alım – Kapıya Teslim", h: "/yurtdisi-kargo#kapidan-alim" },
            { n: "İlk Kez Yurtdışına Gönderenler", h: "/yurtdisi-kargo#ilk-kez" },
            { n: "Gümrük & Evrak Rehberi", h: "/yurtdisi-kargo#gumruk-evrak" },
            { n: "Yurtdışı İade & Geri Gönderim", h: "/yurtdisi-kargo#iade-geri" }
          ]
        },
        {
          title: "Gönderi & Araçlar",
          links: [
            { n: "Gönderi Oluştur", h: "/iletisim" },
            { n: "Gönderi Takip", h: "/gonderi-takibi" },
            { n: "Almanya'ya Kargo", h: "/almanyaya-kargo" },
            { n: "Amerika'ya Kargo", h: "/amerikaya-kargo" },
            { n: "Yurtdışı Kargo Fiyatları", h: "/yurtdisi-kargo-fiyatlari" },
            { n: "Yurtdışına Nasıl Gönderilir", h: "/yurtdisina-kargo-nasil-gonderilir" },
            { n: "Alıcı Ödemeli Kargo", h: "/alici-odemeli-kargo" },
            { n: "En Ucuz Yurtdışı Kargo", h: "/en-ucuz-yurtdisi-kargo" }
          ]
        },
        {
          title: "Kaynaklar",
          links: [
            { n: "Blog", h: "/blog" },
            { n: "Sıkça Sorulan Sorular", h: "/sikca-sorulan-sorular" },
            { n: "Yurtdışı Gönderim Rehberi", h: "/yurtdisi-gonderim-rehberi" }
          ]
        },
        {
          title: "Entegrasyonlar",
          links: [
            { n: "Shopify Entegrasyonu", h: "/shopify-entegrasyonu" },
            { n: "Etsy Entegrasyonu", h: "/etsy-entegrasyonu" },
            { n: "Amazon Entegrasyonu", h: "/amazon-entegrasyonu" },
            { n: "WooCommerce", h: "/woocommerce-entegrasyonu" },
            { n: "Özel Site Entegrasyonu (API)", h: "/ozel-site-api" }
          ]
        }
      ];
    } else {
      return [
        {
          title: "Our Services",
          links: [
            { n: "International Shipping", h: "/yurtdisi-kargo" },
            { n: "Domestic Shipping", h: "/yurtici-kargo" },
            { n: "From Abroad to Turkey", h: "/yurtdisindan-turkiye" },
            { n: "Receiver Payment Logistics", h: "/yurtici-kargo#alici-odemeli" },
            { n: "Cash on Delivery", h: "/yurtici-kargo#kapida-odemeli" }
          ]
        },
        {
          title: "How to Send?",
          links: [
            { n: "How to Send?", h: "/yurtdisi-kargo#nasil-gonderirim" },
            { n: "Door-to-Door Delivery", h: "/yurtdisi-kargo#kapidan-alim" },
            { n: "First Time Shippers", h: "/yurtdisi-kargo#ilk-kez" },
            { n: "Customs & Documents", h: "/yurtdisi-kargo#gumruk-evrak" },
            { n: "International Returns", h: "/yurtdisi-kargo#iade-geri" }
          ]
        },
        {
          title: "Shipping & Tools",
          links: [
            { n: "Create Shipment", h: "/iletisim" },
            { n: "Track Shipment", h: "/gonderi-takibi" },
            { n: "Ship to Germany", h: "/almanyaya-kargo" },
            { n: "Ship to USA", h: "/amerikaya-kargo" },
            { n: "Intl Shipping Prices", h: "/yurtdisi-kargo-fiyatlari" },
            { n: "How to Ship Abroad", h: "/yurtdisina-kargo-nasil-gonderilir" },
            { n: "Receiver Payment", h: "/alici-odemeli-kargo" },
            { n: "Cheapest Intl Shipping", h: "/en-ucuz-yurtdisi-kargo" }
          ]
        },
        {
          title: "Resources",
          links: [
            { n: "Blog", h: "/blog" },
            { n: "FAQ", h: "/sikca-sorulan-sorular" },
            { n: "Intl Shipping Guide", h: "/yurtdisi-gonderim-rehberi" }
          ]
        },
        {
          title: "Integrations",
          links: [
            { n: "Shopify", h: "/shopify-entegrasyonu" },
            { n: "Etsy", h: "/etsy-entegrasyonu" },
            { n: "Amazon", h: "/amazon-entegrasyonu" },
            { n: "WooCommerce", h: "/woocommerce-entegrasyonu" },
            { n: "Custom API", h: "/ozel-site-api" }
          ]
        }
      ];
    }
  };

  const [sections, setSections] = useState<any[]>(getDefaultSections(currentLang));
  const [cta, setCta] = useState<any>(getDefaultCta(currentLang));
  const [bottomSection, setBottomSection] = useState<any>(getDefaultBottomSection(currentLang));
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [navbarFooterLogo, setNavbarFooterLogo] = useState('');
  const [footerLogoError, setFooterLogoError] = useState(false);

  useEffect(() => {
    // Site ayarlarını yükle (footer logo için)
    axios.get(`${API_BASE_URL}/content/settings/general?lang=${currentLang}`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setSiteSettings(res.data);
        }
      })
      .catch(err => {
        console.error('Site settings yüklenemedi:', err);
      });

    // Footer içeriğini DB'den yükle
    axios.get(`${API_BASE_URL}/content/footer?lang=${currentLang}`)
      .then(res => {
        if (res.data) {
          if (res.data.sections?.length) setSections(res.data.sections);
          if (res.data.cta && Object.keys(res.data.cta).length) setCta(res.data.cta);
          if (res.data.bottomSection && Object.keys(res.data.bottomSection).length) setBottomSection(res.data.bottomSection);
        }
      })
      .catch(() => {
        setSections(getDefaultSections(currentLang));
        setCta(getDefaultCta(currentLang));
        setBottomSection(getDefaultBottomSection(currentLang));
      });
  }, [currentLang]);

  // Footer logo'yu belirle: Önce footer content'teki logoUrl, sonra site ayarlarındaki footerLogo (fallback)
  const footerLogoUrl = (bottomSection?.logoUrl || siteSettings?.footerLogo || navbarFooterLogo || '').trim();

  // Footer logo URL değiştiğinde hata flag'ini sıfırla
  useEffect(() => {
    setFooterLogoError(false);
  }, [footerLogoUrl]);

  return (
    <>
      {/* Menü Bölümü - Tam Sayfa Genişliği */}
      <div className="w-full bg-slate-50/50 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {sections.map((section, idx) => (
              <nav key={idx} aria-label={section.title}>
                <h4 className="font-bold text-[#102477] text-xs mb-8 tracking-[0.1em] border-l-4 border-[#4DB848] pl-3">
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
                {footerLogoUrl && !footerLogoError ? (
                  <img
                    src={footerLogoUrl}
                    alt="Logo"
                    className="h-10 object-contain"
                    onError={() => {
                      // Resim yüklenemezse hata flag'ini set et
                      setFooterLogoError(true);
                    }}
                  />
                ) : (
                  <Logo className="h-10" />
                )}
              </div>
              <p className="text-slate-400 text-xs font-bold leading-relaxed mb-6 tracking-wider">{bottomSection.tagline}</p>
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
              <h4 className="font-bold text-[#102477] text-xs mb-8 tracking-[0.1em]">{bottomSection.corporateTitle}</h4>
              <ul className="flex flex-wrap gap-x-8 gap-y-4 text-slate-400 font-bold text-[11px] tracking-widest">
                {bottomSection.corporateLinks?.map((link: any, idx: number) => (
                  <li key={idx}>
                    <a href={link.url} className="hover:text-[#102477]" title={link.name}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-300 text-[10px] font-bold tracking-widest">{bottomSection.copyrightText || '© 2024 adoreGo. Site kargo firması vitrini değil, teknoloji lojistik platformudur.'}</p>
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
