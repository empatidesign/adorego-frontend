import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../api-config';

const Logo: React.FC<{ className?: string; src?: string; brandName?: string }> = ({
  className = "h-8",
  src,
  brandName = "AdorelGo"
}) => {
  if (src) {
    return (
      <div className={`flex items-center ${className} select-none`}>
        <img src={src} alt={brandName} className="h-full w-auto object-contain" />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className} select-none`}>
      <svg viewBox="0 0 240 60" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="45" fill="#102477" style={{ font: 'bold 44px Outfit, sans-serif', letterSpacing: '-2px' }}>adore</text>
        <path d="M145 45.5C136.5 45.5 129.5 38.5 129.5 30C129.5 21.5 136.5 14.5 145 14.5C153.5 14.5 160.5 21.5 160.5 30C160.5 31.5 160.2 33 159.7 34.3" stroke="#4DB848" strokeWidth="8" strokeLinecap="round" />
        <path d="M152 45L162 45L162 35" stroke="#4DB848" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="168" y="45" fill="#4DB848" style={{ font: 'bold 44px Outfit, sans-serif', letterSpacing: '-1px' }}>o</text>
      </svg>
      <span className="sr-only">{brandName}</span>
    </div>
  );
};

const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [navbarData, setNavbarData] = useState<any>({
    logo: "",
    brandName: "AdorelGo",
    menuItems: [
      { id: "1", label: "Yurtdışı Kargo", link: "/yurtdisi-kargo", type: "link" },
      { id: "2", label: "Yurtiçi Kargo", link: "/yurtici-kargo", type: "link" },
      { id: "3", label: "Fiyatlar", link: "/fiyatlar", type: "link" },
      { id: "4", label: "Nasıl Gönderirim?", link: "/nasil-gonderirim", type: "link" },
      { id: "5", label: "Gönderi Takibi", link: "/gonderi-takibi", type: "link" },
      { id: "6", label: "İletişim", link: "/iletisim", type: "link" },
    ],
    ctaButtons: [
      { id: "2", label: "ÜYE OL", link: "#", style: "primary" },
    ]
  });

  useEffect(() => {
    // Session kontrolü
    const token = localStorage.getItem('admin_token');
    const role = localStorage.getItem('user_role');
    setIsAdmin(!!token && role === 'admin');

    // Navbar menülerini ve logoyu yükle
    axios.get(`${API_BASE_URL}/content/navbar?lang=${language}`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setNavbarData((prev: any) => ({
            ...prev,
            logo: res.data.logo ? (res.data.logo.startsWith('http') ? res.data.logo : `${API_BASE_URL}${res.data.logo}`) : prev.logo,
            menuItems: res.data.menuItems || prev.menuItems,
            ctaButtons: res.data.ctaButtons || prev.ctaButtons
          }));
        }
      })
      .catch(err => {
        console.error('Navbar content yüklenemedi:', err);
      });

    // Marka adını genel ayarlardan yükle (fallback)
    axios.get(`${API_BASE_URL}/content/settings/general?lang=${language}`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setNavbarData((prev: any) => ({
            ...prev,
            // Sadece navbar'dan logo gelmemişse genel ayarlardan al
            logo: prev.logo || res.data.headerLogo || '',
            brandName: res.data.siteName || prev.brandName
          }));
        }
      })
      .catch(err => {
        console.error('Site settings yüklenemedi:', err);
      });
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);

    if (!href) return;

    // Eğer external link ise
    if (href.startsWith('http')) {
      window.location.href = href;
      return;
    }

    // Eğer internal route ise (Anchor değilse)
    if (href.startsWith('/') && !href.includes('#')) {
      navigate(href);
      return;
    }

    // Anchor link ise
    const anchor = href.includes('#') ? href.substring(href.indexOf('#')) : (href.startsWith('#') ? href : null);

    if (anchor) {
      // Eğer ana sayfada değilsek veya sadece /#anchor ise önce ana sayfaya git
      if (window.location.pathname !== '/' || (href.startsWith('/') && href.includes('#'))) {
        navigate(href);
        return;
      }

      try {
        const element = document.querySelector(anchor);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } catch (e) {
        console.error('Scroll error:', e);
      }
    } else if (href.startsWith('/')) {
      navigate(href);
    }
  };

  const navLinks = (navbarData?.menuItems || [])
    .filter((item: any) => item.isActive !== false && (!item.position || item.position === 'header'))
    .filter((item: any) => {
      const label = item.label?.toUpperCase();
      return label !== 'PANEL' && label !== 'ÜYE OL' && label !== 'SIGN UP';
    })
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  const ctaButtons = (navbarData?.ctaButtons || [])
    .filter((btn: any) => {
      if (btn.label?.toUpperCase() === 'PANEL') return isAdmin;
      return true;
    });

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 bg-white/95 backdrop-blur-md shadow-lg shadow-black/10 ${scrolled ? 'py-2 border-b border-slate-100' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-10">
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <Logo
                className="h-9"
                src={navbarData.logo}
                brandName={navbarData.brandName}
              />
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {navLinks.map((link: any) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.link || link.href)}
                  className="text-[12px] font-bold tracking-[0.05em] text-slate-500 hover:text-[#102477] transition-all whitespace-nowrap"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-5">
            {ctaButtons.map((button: any) => (
              <button
                key={button.id}
                onClick={() => handleLinkClick(button.link)}
                className={`${button.style === 'primary'
                  ? 'bg-[#4DB848] text-white hover:bg-[#3da339]'
                  : 'border border-[#102477] text-[#102477] hover:bg-slate-50'} 
                  px-5 py-2 rounded-[8px] text-[12px] font-bold tracking-[0.05em] transition-all whitespace-nowrap flex items-center gap-2`}
              >
                {button.icon && <i className={`fas ${button.icon}`}></i>}
                {button.label}
              </button>
            ))}

            {/* Dil Değiştirme Butonları */}
            <div className="flex items-center gap-1 border-l border-slate-200 pl-5">
              <button
                onClick={() => setLanguage('tr')}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-[6px] transition-all ${language === 'tr'
                  ? 'bg-[#102477] text-white'
                  : 'text-slate-500 hover:text-[#102477] hover:bg-slate-100'
                  }`}
              >
                TR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-[6px] transition-all ${language === 'en'
                  ? 'bg-[#102477] text-white'
                  : 'text-slate-500 hover:text-[#102477] hover:bg-slate-100'
                  }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-[#102477] hover:bg-slate-100 focus:outline-none transition-colors"
          >
            <span className="sr-only">Menüyü aç</span>
            {isOpen ? (
              <i className="fas fa-times text-xl"></i>
            ) : (
              <i className="fas fa-bars text-xl"></i>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link: any) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.link || link.href)}
                  className="text-left text-sm font-bold tracking-[0.05em] text-slate-500 hover:text-[#102477] transition-all py-2"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                {ctaButtons.map((button: any) => (
                  <button
                    key={button.id}
                    onClick={() => handleLinkClick(button.link)}
                    className={`w-full text-[12px] font-bold tracking-[0.05em] transition-colors flex items-center justify-center gap-2 py-2 ${button.style === 'primary'
                      ? 'bg-[#4DB848] text-white rounded-[8px] hover:bg-[#3da339]'
                      : 'text-slate-500 hover:text-[#102477]'
                      }`}
                  >
                    {button.icon && <i className={`fas ${button.icon}`}></i>}
                    {button.label}
                  </button>
                ))}

                {/* Mobil Dil Değiştirme */}
                <div className="flex items-center gap-2 justify-center pt-2">
                  <button
                    onClick={() => setLanguage('tr')}
                    className={`text-[11px] font-bold px-4 py-2 rounded-[6px] transition-all flex-1 ${language === 'tr'
                      ? 'bg-[#102477] text-white'
                      : 'text-slate-500 hover:text-[#102477] bg-slate-100'
                      }`}
                  >
                    Türkçe
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`text-[11px] font-bold px-4 py-2 rounded-[6px] transition-all flex-1 ${language === 'en'
                      ? 'bg-[#102477] text-white'
                      : 'text-slate-500 hover:text-[#102477] bg-slate-100'
                      }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
