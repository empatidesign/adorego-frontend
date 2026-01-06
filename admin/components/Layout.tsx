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
    { path: '/admin/navbar', label: 'Menü Yönetimi', icon: 'fa-bars' },
    { path: '/admin/hero', label: 'Hero Bölümü', icon: 'fa-rocket' },
    { path: '/admin/features', label: 'Özellikler', icon: 'fa-star' },
    { path: '/admin/partners', label: 'Partnerler', icon: 'fa-handshake' },
    { path: '/admin/faq', label: 'S.S.S', icon: 'fa-circle-question' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#102477] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">adoreGo Admin</h1>
          <p className="text-xs text-white/60 mt-1">Yönetim Paneli</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-[#4DB848] text-white'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <i className={`fas ${item.icon} text-sm`}></i>
              <span className="font-medium">{item.label}</span>
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

