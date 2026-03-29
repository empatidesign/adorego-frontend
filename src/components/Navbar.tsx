import React, { useState, useEffect, useRef } from 'react';
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

const ChevronDownIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    fill="none" stroke="currentColor" viewBox="0 0 24 24"
  >
    <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserPlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="7" r="4" strokeWidth="2" />
    <line x1="19" y1="8" x2="19" y2="14" strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="11" x2="16" y2="11" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Default fallback menu items if API returns nothing
const defaultMenuItems = [
  {
    id: 'd1', label: 'Hizmetlerimiz', type: 'dropdown', order: 0, isActive: true,
    children: [
      { id: 'c1', label: 'Yurtdışı Kargo', link: '/yurtdisi-kargo' },
      { id: 'c2', label: 'Yurtiçi Kargo', link: '/yurtici-kargo' },
      { id: 'c3', label: 'Alıcı Ödemeli Lojistik', link: '/alici-odemeli-kargo' },
    ],
  },
  { id: 'd2', label: 'Nasıl Gönderirim?', link: '/nasil-gonderirim', type: 'link', order: 1, isActive: true },
  { id: 'd3', label: 'Gönderi Takip', link: '/gonderi-takibi', type: 'link', order: 2, isActive: true },
  { id: 'd4', label: 'İletişim', link: '/iletisim', type: 'link', order: 3, isActive: true },
];

const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hizmetlerOpen, setHizmetlerOpen] = useState(false);
  const [mobileHizmetlerOpen, setMobileHizmetlerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [navbarData, setNavbarData] = useState<any>({
    logo: "",
    brandName: "AdorelGo",
    menuItems: [],
    ctaButtons: [
      { id: "2", label: "Üye Ol / Giriş", link: "#", style: "primary" },
    ]
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const role = localStorage.getItem('user_role');
    setIsAdmin(!!token && role === 'admin');

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

    axios.get(`${API_BASE_URL}/content/settings/general?lang=${language}`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setNavbarData((prev: any) => ({
            ...prev,
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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setHizmetlerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    setHizmetlerOpen(false);

    if (!href) return;

    if (href.startsWith('http')) {
      window.location.href = href;
      return;
    }

    if (href.startsWith('/') && !href.includes('#')) {
      navigate(href);
      return;
    }

    const anchor = href.includes('#') ? href.substring(href.indexOf('#')) : (href.startsWith('#') ? href : null);

    if (anchor) {
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

  const menuItems = ((navbarData?.menuItems?.length ? navbarData.menuItems : defaultMenuItems) as any[])
    .filter((item: any) => item.isActive !== false)
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
          {/* Logo */}
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

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {menuItems.map((item: any) => item.type === 'dropdown' ? (
              <div key={item.id} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setHizmetlerOpen(prev => !prev)}
                  className={`flex items-center gap-1.5 text-[13px] font-semibold transition-all whitespace-nowrap ${hizmetlerOpen ? 'text-[#102477]' : 'text-slate-600 hover:text-[#102477]'}`}
                >
                  {item.label}
                  <ChevronDownIcon open={hizmetlerOpen} />
                </button>
                {hizmetlerOpen && (
                  <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-xl shadow-black/10 border border-slate-100 py-2 z-50 animate-fadeIn">
                    {(item.children || []).map((child: any) => (
                      <button
                        key={child.id || child.link}
                        onClick={() => handleLinkClick(child.link)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-slate-700 hover:bg-slate-50 hover:text-[#102477] transition-colors text-left"
                      >
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.link)}
                className="text-[13px] font-semibold text-slate-600 hover:text-[#102477] transition-all whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>
          </div>{/* end left group */}

          {/* Right side: CTA + Lang */}
          <div className="hidden lg:flex items-center space-x-4">
            {ctaButtons.map((button: any) => (
              <button
                key={button.id}
                onClick={() => handleLinkClick(button.link)}
                className={`${button.style === 'primary'
                  ? 'bg-[#4DB848] text-white hover:bg-[#3da339]'
                  : 'border border-[#102477] text-[#102477] hover:bg-slate-50'}
                  px-5 py-2.5 rounded-[10px] text-[13px] font-bold tracking-[0.02em] transition-all whitespace-nowrap flex items-center gap-2`}
              >
                {button.style === 'primary' ? <UserPlusIcon /> : (button.icon && <i className={`fas ${button.icon}`}></i>)}
                {button.label}
              </button>
            ))}

            {/* Language switcher */}
            <div className="flex items-center gap-1 border-l border-slate-200 pl-4">
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

          {/* Mobile hamburger */}
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
            <div className="flex flex-col space-y-1">
              {menuItems.map((item: any) => item.type === 'dropdown' ? (
                <div key={item.id}>
                  <button
                    onClick={() => setMobileHizmetlerOpen((p: boolean) => !p)}
                    className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-600 hover:text-[#102477] transition-all py-2.5 px-1"
                  >
                    {item.label}
                    <ChevronDownIcon open={mobileHizmetlerOpen} />
                  </button>
                  {mobileHizmetlerOpen && (
                    <div className="pl-4 pb-1 space-y-1">
                      {(item.children || []).map((child: any) => (
                        <button
                          key={child.id || child.link}
                          onClick={() => handleLinkClick(child.link)}
                          className="w-full flex items-center gap-3 py-2.5 px-2 text-sm font-medium text-slate-600 hover:text-[#102477] transition-colors text-left rounded-lg hover:bg-slate-50"
                        >
                          <span className="flex-shrink-0 w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.link)}
                  className="text-left text-sm font-bold text-slate-600 hover:text-[#102477] transition-all py-2.5 px-1"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-3 border-t border-slate-200 space-y-2">
                {ctaButtons.map((button: any) => (
                  <button
                    key={button.id}
                    onClick={() => handleLinkClick(button.link)}
                    className={`w-full text-[13px] font-bold tracking-[0.02em] transition-colors flex items-center justify-center gap-2 py-2.5 ${button.style === 'primary'
                      ? 'bg-[#4DB848] text-white rounded-[10px] hover:bg-[#3da339]'
                      : 'text-slate-500 hover:text-[#102477]'
                      }`}
                  >
                    {button.style === 'primary' ? <UserPlusIcon /> : (button.icon && <i className={`fas ${button.icon}`}></i>)}
                    {button.label}
                  </button>
                ))}

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
