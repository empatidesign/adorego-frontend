import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const NewLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('user_role');
    navigate('/admin');
  };

  const menuItems = [
    {
      path: '/admin/new-dashboard',
      label: 'Dashboard',
      icon: 'fa-gauge',
      page: ''
    },
    {
      path: '/admin/page-home',
      label: 'Ana Sayfa',
      icon: 'fa-home',
      page: '/'
    },
    {
      path: '/admin/page-international',
      label: 'Yurtdışı Kargo',
      icon: 'fa-plane',
      page: '/yurtdisi-kargo'
    },
    {
      path: '/admin/page-domestic',
      label: 'Yurtiçi Kargo',
      icon: 'fa-truck',
      page: '/yurtici-kargo'
    },
    {
      path: '/admin/header-footer',
      label: 'Header & Footer',
      icon: 'fa-bars',
      page: 'Tüm Sayfalar'
    },
    {
      path: '/admin/page-pricing',
      label: 'Fiyatlar',
      icon: 'fa-tag',
      page: '/fiyatlar'
    },
    {
      path: '/admin/page-tracking',
      label: 'Gönderi Takibi',
      icon: 'fa-search-location',
      page: '/gonderi-takibi'
    },
    {
      path: '/admin/blog',
      label: 'Blog Yazıları',
      icon: 'fa-newspaper',
      page: '/blog (Yazılar)'
    },
    {
      path: '/admin/newsletter',
      label: 'Newsletter',
      icon: 'fa-envelope',
      page: 'Bülten Aboneleri'
    },
    {
      path: '/admin/page-contact',
      label: 'İletişim',
      icon: 'fa-address-book',
      page: '/iletisim'
    },
    {
      path: '/admin/contact-messages',
      label: 'Gelen Mesajlar',
      icon: 'fa-inbox',
      page: 'İletişim Formu'
    },
    {
      path: '/admin/content-pages',
      label: 'İçerik Sayfaları',
      icon: 'fa-file-alt',
      page: 'Footer İçerikleri'
    },
    {
      path: '/admin/seo',
      label: 'SEO Ayarları',
      icon: 'fa-search',
      page: 'Meta & SEO'
    },
    {
      path: '/admin/settings',
      label: 'Genel Ayarlar',
      icon: 'fa-cog',
      page: 'Site Ayarları'
    },

  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-[#102477] to-[#0a1850] text-white flex flex-col shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">adoreGo</h1>
          <p className="text-sm text-white/70 mt-1">Yönetim Paneli</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-xl transition-all ${isActive
                  ? 'bg-[#4DB848] text-white shadow-lg scale-105'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <i className={`fas ${item.icon} text-lg w-5`}></i>
                  <span className="font-semibold text-sm">{item.label}</span>
                </div>
                {item.page && (
                  <div className="text-xs opacity-70 mt-1 ml-8 font-mono">
                    {item.page}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-red-500/20 hover:text-red-300 transition-all"
          >
            <i className="fas fa-sign-out-alt text-lg w-5"></i>
            <span className="font-semibold text-sm">Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default NewLayout;
