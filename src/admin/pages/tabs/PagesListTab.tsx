import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const STATIC_PAGES = [
  { url: '/', label: 'Ana Sayfa' },
  { url: '/yurtdisi-kargo', label: 'Yurtdışı Kargo' },
  { url: '/yurtici-kargo', label: 'Yurtiçi Kargo' },
  { url: '/alici-odemeli-kargo', label: 'Alıcı Ödemeli Kargo' },
  { url: '/nasil-gonderirim', label: 'Nasıl Gönderirim' },
  { url: '/gonderi-takibi', label: 'Gönderi Takibi' },
  { url: '/iletisim', label: 'İletişim' },
  { url: '/hakkimizda', label: 'Hakkımızda' },
  { url: '/kvkk', label: 'KVKK' },
  { url: '/yurtdisindan-turkiye', label: 'Yurtdışından Türkiye' },
  { url: '/yurtici-kargo#alici-odemeli', label: 'Alıcı Ödemeli Lojistik' },
  { url: '/kapidan-alim-kapiya-teslimat', label: 'Kapıdan Alım – Kapıya Teslim' },
  { url: '/ilk-kez-yurtdisina-gondermek', label: 'İlk Kez Yurtdışına Gönderenler' },
  { url: '/gumruk-evrak-rehberi', label: 'Gümrük & Evrak Rehberi' },
  { url: '/yurtdisi-iade-geri-gonderi', label: 'Yurtdışı İade & Geri Gönderim' },
  { url: '/almanyaya-kargo', label: 'Almanya\'ya Kargo' },
  { url: '/amerikaya-kargo', label: 'Amerika\'ya Kargo' },
  { url: '/yurtdisi-kargo-fiyatlari', label: 'Yurtdışı Kargo Fiyatları' },
  { url: '/yurtdisina-kargo-nasil-gonderilir', label: 'Yurtdışına Kargo Nasıl Gönderilir' },
  { url: '/en-ucuz-yurtdisi-kargo', label: 'En Ucuz Yurtdışı Kargo' },
  { url: '/blog', label: 'Blog' },
  { url: '/sikca-sorulan-sorular', label: 'Sıkça Sorulan Sorular' },
  { url: '/yurtdisi-gonderim-rehberi', label: 'Yurtdışı Gönderim Rehberi' },
  { url: '/shopify-entegrasyonu', label: 'Shopify Entegrasyonu' },
  { url: '/etsy-entegrasyonu', label: 'Etsy Entegrasyonu' },
  { url: '/amazon-entegrasyonu', label: 'Amazon Entegrasyonu' },
  { url: '/woocommerce-entegrasyonu', label: 'WooCommerce Entegrasyonu' },
  { url: '/ozel-site-api', label: 'Özel Site / API' },
];

const BASE_URL = 'http://localhost:5173';

const PagesListTab: React.FC = () => {
  const [dynamicPages, setDynamicPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/content/pages')
      .then(r => setDynamicPages(Array.isArray(r.data) ? r.data : []))
      .catch(() => setDynamicPages([]))
      .finally(() => setLoading(false));
  }, []);

  const allPages = [
    ...STATIC_PAGES,
    ...dynamicPages.map(p => ({ url: `/${p.slug}`, label: p.title || p.slug })),
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Toplam <span className="font-semibold text-gray-800">{loading ? '...' : allPages.length}</span> sayfa
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide w-8">#</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Sayfa Adı</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">URL</th>
              <th className="px-5 py-3 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {allPages.map((page, i) => (
              <tr key={page.url} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 text-gray-300 text-xs">{i + 1}</td>
                <td className="px-5 py-3 font-medium text-gray-800">{page.label}</td>
                <td className="px-5 py-3">
                  <span className="font-mono text-xs text-gray-500">{BASE_URL}{page.url}</span>
                </td>
                <td className="px-5 py-3 text-right">
                  <a
                    href={`${BASE_URL}${page.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 text-xs font-medium"
                  >
                    Aç ↗
                  </a>
                </td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan={4} className="px-5 py-4 text-center text-gray-400 text-xs">Dinamik sayfalar yükleniyor...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PagesListTab;
