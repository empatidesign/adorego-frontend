import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('user_role');
    navigate('/admin');
  };

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'fa-gauge' },
    { path: '/admin/navbar', label: 'Navigasyon ve Footer', icon: 'fa-layer-group' },
    { path: '/admin/hero', label: 'Hero Bölümü', icon: 'fa-rocket' },
    { path: '/admin/howitworks', label: 'Nasıl Çalışır?', icon: 'fa-list-check' },
    { path: '/admin/features', label: 'Özellikler', icon: 'fa-star' },
    { path: '/admin/partners', label: 'Partnerler', icon: 'fa-handshake' },
    { path: '/admin/solutions', label: 'Akıllı Gönderim', icon: 'fa-shipping-fast' },
    { path: '/admin/target-audience', label: 'Gönderdiğe Kazan', icon: 'fa-gift' },
    { path: '/admin/popular-destinations', label: 'Popüler Ülkeler', icon: 'fa-globe' },
    { path: '/admin/pricing', label: 'Fiyat Listesi', icon: 'fa-tag' },
    { path: '/admin/howtosend', label: 'Nasıl Gönderirim?', icon: 'fa-circle-info' },
    { path: '/admin/content-pages', label: 'İçerik Sayfaları', icon: 'fa-file-alt' },
    { path: '/admin/blog', label: 'Blog Yazıları', icon: 'fa-newspaper' },
    { path: '/admin/cta', label: 'CTA Banner', icon: 'fa-bullhorn' },
    { path: '/admin/faq', label: 'S.S.S (FAQ)', icon: 'fa-circle-question' },
    { path: '/admin/seo', label: 'SEO Ayarları', icon: 'fa-search' },
    { path: '/admin/settings', label: 'Site Ayarları', icon: 'fa-cog' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#102477] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">adoreGo Admin</h1>
          <p className="text-xs text-white/60 mt-1">Yönetim Paneli</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                ? 'bg-[#4DB848] text-white'
                : 'text-white/80 hover:bg-white/10'
                }`}
            >
              <i className={`fas ${item.icon} text-sm`}></i>
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-red-500/20 hover:text-red-300 transition-colors"
          >
            <i className="fas fa-sign-out-alt text-sm"></i>
            <span className="font-medium">Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

