import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ContentTab from './tabs/ContentTab';
import BlogTab from './tabs/BlogTab';
import MessagesTab from './tabs/MessagesTab';
import SettingsTab from './tabs/SettingsTab';
import PriceTableTab from './tabs/PriceTableTab';
import PagesListTab from './tabs/PagesListTab';
import OverviewTab from './tabs/OverviewTab';

const CONTENT_PAGES = [
  { id: 'home', label: 'Ana Sayfa' },
  { id: 'international', label: 'Yurtdışı Kargo' },
  { id: 'domestic', label: 'Yurtiçi Kargo' },
  { id: 'tracking', label: 'Gönderi Takibi' },
  { id: 'howtosend', label: 'Nasıl Gönderirim' },
  { id: 'about', label: 'Hakkımızda' },
  { id: 'contact', label: 'İletişim' },
  { id: 'navbar', label: 'Navbar' },
  { id: 'footer', label: 'Footer' },
  { id: 'kvkk', label: 'KVKK' },
  { id: 'yurtdisindan-turkiye', label: 'Yurtdışından Türkiye\'ye' },
  { id: 'sikca-sorulan-sorular', label: 'Sıkça Sorulan Sorular' },
  { id: 'alici-odemeli-kargo', label: 'Alıcı Ödemeli Kargo' },
  { id: 'kapidan-alim-kapiya-teslimat', label: 'Kapıdan Alım – Kapıya Teslim' },
  { id: 'ilk-kez-yurtdisina-gondermek', label: 'İlk Kez Yurtdışına Gönderenler' },
  { id: 'gumruk-evrak-rehberi', label: 'Gümrük & Evrak Rehberi' },
  { id: 'yurtdisi-iade-geri-gonderi', label: 'Yurtdışı İade & Geri Gönderim' },
  { id: 'almanyaya-kargo', label: 'Almanya\'ya Kargo' },
  { id: 'amerikaya-kargo', label: 'Amerika\'ya Kargo' },
  { id: 'yurtdisi-kargo-fiyatlari', label: 'Yurtdışı Kargo Fiyatları' },
  { id: 'yurtdisina-kargo-nasil-gonderilir', label: 'Yurtdışına Kargo Nasıl Gönderilir' },
  { id: 'en-ucuz-yurtdisi-kargo', label: 'En Ucuz Yurtdışı Kargo' },
  { id: 'yurtdisi-gonderim-rehberi', label: 'Yurtdışı Gönderim Rehberi' },
  { id: 'shopify-entegrasyonu', label: 'Shopify Entegrasyonu' },
  { id: 'etsy-entegrasyonu', label: 'Etsy Entegrasyonu' },
  { id: 'amazon-entegrasyonu', label: 'Amazon Entegrasyonu' },
  { id: 'woocommerce-entegrasyonu', label: 'WooCommerce Entegrasyonu' },
  { id: 'ozel-site-api', label: 'Özel Site / API' },
  { id: 'blog', label: 'Blog' },
  { id: 'content-pages', label: 'Diğer Sayfalar' },
];

const SETTINGS_SECTIONS = [
  { id: 'password', label: 'Şifre Değiştir' },
];

type TopSection = 'overview' | 'content' | 'blog' | 'messages' | 'settings' | 'pricetable' | 'pages';

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="14" height="14" fill="none" viewBox="0 0 24 24"
    stroke="currentColor" strokeWidth={2}
    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<TopSection>('overview');
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    api.get('/content/contact/messages')
      .then(r => {
        const msgs = Array.isArray(r.data) ? r.data : [];
        setUnreadCount(msgs.filter((m: any) => !m.read).length);
      })
      .catch(() => {});
  }, []);

  const [openAccordion, setOpenAccordion] = useState<TopSection | null>(null);
  const [activeContentPage, setActiveContentPage] = useState<string>('home');
  const [activeSettingsSection, setActiveSettingsSection] = useState<string>('navbar');

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('user_role');
    navigate('/admin');
  };

  const toggleAccordion = (section: TopSection) => {
    setOpenAccordion(prev => prev === section ? null : section);
    setActiveSection(section);
  };

  const handleContentPageClick = (pageId: string) => {
    setActiveContentPage(pageId);
    setActiveSection('content');
  };

  const handleSettingsSectionClick = (sectionId: string) => {
    setActiveSettingsSection(sectionId);
    setActiveSection('settings');
  };

  const NavItem = ({
    id,
    label,
    icon,
    hasChildren,
    children,
    onActivate,
  }: {
    id: TopSection;
    label: React.ReactNode;
    icon: React.ReactNode;
    hasChildren?: boolean;
    children?: React.ReactNode;
    onActivate?: () => void;
  }) => {
    const isOpen = openAccordion === id;
    const isActive = activeSection === id;

    return (
      <div>
        <button
          onClick={() => { onActivate?.(); hasChildren ? toggleAccordion(id) : (setActiveSection(id), setOpenAccordion(null)); }}
          className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            isActive ? 'bg-indigo-500/20 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={isActive ? 'text-indigo-400' : 'text-slate-500'}>{icon}</span>
            {label}
          </div>
          {hasChildren && (
            <span className={isActive ? 'text-indigo-400' : 'text-slate-600'}>
              <ChevronIcon open={isOpen} />
            </span>
          )}
        </button>
        {hasChildren && isOpen && (
          <div className="mt-0.5 ml-4 pl-3 border-l border-white/10 space-y-0.5">
            {children}
          </div>
        )}
      </div>
    );
  };

  const SubItem = ({
    label,
    active,
    onClick,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
    [key: string]: any;
  }) => (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
        active ? 'bg-indigo-500/20 text-white font-medium' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
      }`}
    >
      {label}
    </button>
  );

  const pageTitle = () => {
    if (activeSection === 'overview') return 'Genel Bakış';
    if (activeSection === 'content') {
      return CONTENT_PAGES.find(p => p.id === activeContentPage)?.label || 'İçerik';
    }
    if (activeSection === 'settings') {
      return SETTINGS_SECTIONS.find(s => s.id === activeSettingsSection)?.label || 'Ayarlar';
    }
    if (activeSection === 'blog') return 'Blog';
    if (activeSection === 'messages') return 'Mesajlar';
    if (activeSection === 'pricetable') return 'Fiyat Tablosu';
    if (activeSection === 'pages') return 'Sayfalar';
    return '';
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-60 flex flex-col fixed inset-y-0 left-0 z-10" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)' }}>
        {/* Logo */}
        <div className="h-16 flex items-center px-5 shrink-0 border-b border-white/5 gap-2.5">
          <img src="/logo.png" alt="AdorelGo" className="h-7 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
          <span className="text-xs text-slate-500 font-medium bg-white/5 px-1.5 py-0.5 rounded">Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {/* Genel Bakış */}
          <NavItem
            id="overview"
            label="Genel Bakış"
            icon={
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            }
          />

          {/* İçerik */}
          <NavItem
            id="content"
            label="İçerik"
            hasChildren
            icon={
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L8.5 18.81l-4 1 1-4 11.362-11.323z" />
              </svg>
            }
          >
            {CONTENT_PAGES.map(p => (
              <SubItem
                key={p.id}
                label={p.label}
                active={activeSection === 'content' && activeContentPage === p.id}
                onClick={() => handleContentPageClick(p.id)}
              />
            ))}
          </NavItem>

          {/* Sayfalar */}
          <NavItem
            id="pages"
            label="Sayfalar"
            icon={
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
            }
          />

          {/* Fiyat Tablosu */}
          <NavItem
            id="pricetable"
            label="Fiyat Tablosu"
            icon={
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75z" />
              </svg>
            }
          />

          {/* Blog */}
          <NavItem
            id="blog"
            label="Blog"
            icon={
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z" />
              </svg>
            }
          />

          {/* Mesajlar */}
          <NavItem
            id="messages"
            label={
              <span className="flex items-center gap-2">
                Mesajlar
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none min-w-[18px] text-center">
                    {unreadCount}
                  </span>
                )}
              </span>
            }
            icon={
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            }
            onActivate={() => setUnreadCount(0)}
          />

          {/* Ayarlar */}
          <NavItem
            id="settings"
            label="Ayarlar"
            hasChildren
            icon={
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              </svg>
            }
          >
            {SETTINGS_SECTIONS.map(s => (
              <SubItem
                key={s.id}
                label={s.label}
                active={activeSection === 'settings' && activeSettingsSection === s.id}
                onClick={() => handleSettingsSectionClick(s.id)}
              />
            ))}
          </NavItem>
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/5 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-white/5 hover:text-slate-300 transition-all"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} className="text-slate-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 shrink-0">
          <h1 className="text-base font-semibold text-slate-800">{pageTitle()}</h1>
        </header>

        {/* Content */}
        <main className="flex-1 px-8 py-8 max-w-5xl w-full">
          {activeSection === 'overview' && <OverviewTab />}
          {activeSection === 'content' && (
            <ContentTab selectedPage={activeContentPage} />
          )}
          {activeSection === 'pages' && <PagesListTab />}
          {activeSection === 'pricetable' && <PriceTableTab />}
          {activeSection === 'blog' && <BlogTab />}
          {activeSection === 'messages' && <MessagesTab onRead={() => setUnreadCount(c => Math.max(0, c - 1))} />}
          {activeSection === 'settings' && (
            <SettingsTab selectedSection={activeSettingsSection} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
