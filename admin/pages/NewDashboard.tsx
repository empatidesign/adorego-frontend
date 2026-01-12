import React from 'react';
import { Link } from 'react-router-dom';
import NewLayout from '../components/NewLayout';

const NewDashboard: React.FC = () => {
  const pages = [
    {
      title: 'Ana Sayfa',
      path: '/admin/page-home',
      icon: 'fa-home',
      color: 'from-blue-500 to-blue-600',
      url: '/',
      sections: ['Hero Banner', 'Partnerler', 'Popüler Ülkeler', 'FAQ', 'CTA Banner']
    },
    {
      title: 'Yurtdışı Kargo',
      path: '/admin/page-international',
      icon: 'fa-plane',
      color: 'from-purple-500 to-purple-600',
      url: '/yurtdisi-kargo',
      sections: ['Nasıl Çalışır', 'Özellikler']
    },
    {
      title: 'Yurtiçi Kargo',
      path: '/admin/page-domestic',
      icon: 'fa-truck',
      color: 'from-green-500 to-green-600',
      url: '/yurtici-kargo',
      sections: ['Akıllı Gönderim', 'Gönderdiğe Kazan']
    },
    {
      title: 'Header & Footer',
      path: '/admin/header-footer',
      icon: 'fa-bars',
      color: 'from-slate-600 to-slate-700',
      url: 'Tüm Sayfalar',
      sections: ['Logo', 'Menü Sekmeleri', 'Footer CTA', 'Alt Bölüm', 'Sosyal Medya']
    },
    {
      title: 'Fiyatlar',
      path: '/admin/page-pricing',
      icon: 'fa-tag',
      color: 'from-orange-500 to-orange-600',
      url: '/fiyatlar',
      sections: ['Sayfa Başlığı', 'Ülkeler ve Fiyatlar']
    },
    {
      title: 'Gönderi Takibi',
      path: '/admin/page-tracking',
      icon: 'fa-search-location',
      color: 'from-cyan-500 to-cyan-600',
      url: '/gonderi-takibi',
      sections: ['Sayfa Başlığı', 'Form Metinleri', 'Bilgi Kutusu']
    },
    {
      title: 'Nasıl Gönderirim',
      path: '/admin/page-howtosend',
      icon: 'fa-circle-info',
      color: 'from-cyan-500 to-cyan-600',
      url: '/nasil-gonderirim',
      sections: ['Adım Adım Rehber']
    },
    {
      title: 'Blog',
      path: '/admin/blog',
      icon: 'fa-newspaper',
      color: 'from-pink-500 to-pink-600',
      url: '/blog',
      sections: ['Blog Yazıları Listesi']
    },
    {
      title: 'Newsletter',
      path: '/admin/newsletter',
      icon: 'fa-envelope',
      color: 'from-red-500 to-red-600',
      url: 'Bülten Aboneleri',
      sections: ['Abone Listesi', 'İstatistikler', 'CSV İndirme']
    },
    {
      title: 'İletişim',
      path: '/admin/page-contact',
      icon: 'fa-address-book',
      color: 'from-teal-500 to-teal-600',
      url: '/iletisim',
      sections: ['Form Ayarları', 'İletişim Bilgileri', 'WhatsApp', 'Harita']
    },
    {
      title: 'Gelen Mesajlar',
      path: '/admin/contact-messages',
      icon: 'fa-inbox',
      color: 'from-purple-500 to-purple-600',
      url: 'İletişim Formu',
      sections: ['Mesaj Listesi', 'Detaylar', 'Yanıtlama']
    },
    {
      title: 'Diğer Sayfalar',
      path: '/admin/content-pages',
      icon: 'fa-file-alt',
      color: 'from-indigo-500 to-indigo-600',
      url: '/hakkimizda, /iletisim',
      sections: ['Hakkımızda', 'İletişim', 'Özel Sayfalar']
    },
    {
      title: 'Genel Ayarlar',
      path: '/admin/general-settings',
      icon: 'fa-cog',
      color: 'from-gray-600 to-gray-700',
      url: 'Tüm Sayfalar',
      sections: ['Menü', 'Footer', 'SEO', 'Site Ayarları']
    },
  ];

  return (
    <NewLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Hoş Geldiniz 👋
          </h1>
          <p className="text-gray-600">
            Düzenlemek istediğiniz sayfayı seçin
          </p>
        </div>

        {/* Page Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${page.color} p-6 text-white`}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <i className={`fas ${page.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{page.title}</h3>
                    <p className="text-sm opacity-90 font-mono mt-1">{page.url}</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-3 font-semibold">İçerikler:</p>
                <ul className="space-y-2">
                  {page.sections.map((section, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="fas fa-check-circle text-green-500 text-xs"></i>
                      {section}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between text-sm font-semibold text-gray-400 group-hover:text-blue-600 transition-colors">
                  <span>Düzenle</span>
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </NewLayout>
  );
};

export default NewDashboard;
