import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../components/Layout';

const Dashboard: React.FC = () => {
  const sections = [
    {
      title: 'Menü Yönetimi',
      description: 'Üst menü, logo ve navigasyon linklerini düzenleyin',
      icon: 'fa-bars',
      color: 'bg-indigo-500',
      link: '/admin/navbar',
    },
    {
      title: 'Hero Bölümü',
      description: 'Ana sayfa başlığı, görseller ve butonları düzenleyin',
      icon: 'fa-rocket',
      color: 'bg-blue-500',
      link: '/admin/hero',
    },
    {
      title: 'Nasıl Çalışır?',
      description: 'Süreç adımlarını ekleyin, düzenleyin ve sıralayın',
      icon: 'fa-list-check',
      color: 'bg-cyan-500',
      link: '/admin/howitworks',
    },
    {
      title: 'Özellikler',
      description: '4 özellik kartını düzenleyin (ikon, başlık, açıklama)',
      icon: 'fa-star',
      color: 'bg-yellow-500',
      link: '/admin/features',
    },
    {
      title: 'Partnerler',
      description: 'Partner logolarını yönetin',
      icon: 'fa-handshake',
      color: 'bg-green-500',
      link: '/admin/partners',
    },
    {
      title: 'Akıllı Gönderim',
      description: 'Özel çözümler ve gönderim seçeneklerini yönetin',
      icon: 'fa-shipping-fast',
      color: 'bg-teal-500',
      link: '/admin/solutions',
    },
    {
      title: 'CTA Banner',
      description: 'Çağrı banner\'ını düzenleyin (Alt kısımdaki kayıt banner\'ı)',
      icon: 'fa-bullhorn',
      color: 'bg-orange-500',
      link: '/admin/cta',
    },
    {
      title: 'S.S.S (FAQ)',
      description: 'Sık sorulan soruları ekleyin, düzenleyin veya silin',
      icon: 'fa-circle-question',
      color: 'bg-purple-500',
      link: '/admin/faq',
    },
    {
      title: 'SEO Ayarları',
      description: 'Meta tag\'ler, Open Graph ve yapılandırılmış veri yönetimi',
      icon: 'fa-search',
      color: 'bg-pink-500',
      link: '/admin/seo',
    },
    {
      title: 'Site Ayarları',
      description: 'Genel ayarlar, iletişim, sosyal medya ve şirket bilgileri',
      icon: 'fa-cog',
      color: 'bg-indigo-500',
      link: '/admin/settings',
    },
  ];

  return (
    <AdminLayout>
      <Helmet>
        <title>Dashboard - adoreGo Admin Panel</title>
        <meta name="description" content="adoreGo Admin Panel - İçerik Yönetimi" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">İçerik yönetimi için bir bölüm seçin</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <Link
              key={section.link}
              to={section.link}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                  <i className={`fas ${section.icon} text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{section.title}</h3>
                  <p className="text-gray-600 text-sm">{section.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <i className="fas fa-info-circle text-blue-500 text-xl mt-0.5"></i>
            <div>
              <h4 className="font-bold text-blue-900 mb-2">Bilgilendirme</h4>
              <p className="text-blue-800 text-sm">
                Yaptığınız değişiklikler kaydedildiğinde anında ana sitede görünecektir. 
                Değişiklikleri kaydetmeden önce kontrol ettiğinizden emin olun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

