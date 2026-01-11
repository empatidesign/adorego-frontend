import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/Layout';
import { Button } from '../components/forms/FormComponents';

// All available pages with metadata
const ALL_PAGES = [
    // Services
    { slug: 'yurtdisi-kargo', title: 'Yurtdışı Kargo', category: 'Hizmetlerimiz', icon: '💰' },
    { slug: 'ekonomik-kargo', title: 'Ekonomik Kargo', category: 'Hizmetlerimiz', icon: '💰' },
    { slug: 'express-kargo', title: 'Express Kargo', category: 'Hizmetlerimiz', icon: '⚡' },
    { slug: 'yurtdisindan-turkiyeye', title: 'Yurtdışından Türkiye\'ye', category: 'Hizmetlerimiz', icon: '🇹🇷' },
    { slug: 'yurtici-avantajlar', title: 'Yurtiçi Avantajlar', category: 'Hizmetlerimiz', icon: '🏠' },
    { slug: 'alici-odemeli-kargo', title: 'Alıcı Ödemeli Kargo', category: 'Hizmetlerimiz', icon: '🎁' },
    { slug: 'kapida-odemeli-kargo', title: 'Kapıda Ödemeli Kargo', category: 'Hizmetlerimiz', icon: '🚪' },
    { slug: 'buyuk-desi-gonderimler', title: 'Büyük Desi Gönderimler', category: 'Hizmetlerimiz', icon: '📦' },

    // How It Works
    { slug: 'kapidan-alim-teslim', title: 'Kapıdan Alım – Teslim', category: 'Nasıl Çalışır', icon: '🚚' },
    { slug: 'ilk-kez-gonderenler', title: 'İlk Kez Gönderenler', category: 'Nasıl Çalışır', icon: '🆕' },
    { slug: 'gumruk-evrak-rehberi', title: 'Gümrük & Evrak Rehberi', category: 'Nasıl Çalışır', icon: '📋' },
    { slug: 'yurtdisi-iade-geri', title: 'Yurtdışı İade & Geri', category: 'Nasıl Çalışır', icon: '↩️' },
    { slug: 'hangi-gonderim-uygun', title: 'Hangi Gönderim Uygun?', category: 'Nasıl Çalışır', icon: '❓' },

    // Resources
    { slug: 'lojistik-blog', title: 'Lojistik Blog', category: 'Bilgi & Kaynaklar', icon: '📝' },
    { slug: 'sikca-sorulan-sorular', title: 'Sıkça Sorulan Sorular', category: 'Bilgi & Kaynaklar', icon: '❓' },
    { slug: 'yurtdisi-kargo-rehberi', title: 'Yurtdışı Kargo Rehberi', category: 'Bilgi & Kaynaklar', icon: '📖' },
    { slug: 'mikro-ihracat-rehberi', title: 'Mikro İhracat Rehberi', category: 'Bilgi & Kaynaklar', icon: '🌍' },
    { slug: 'gumruk-rehberi', title: 'Gümrük Rehberi', category: 'Bilgi & Kaynaklar', icon: '🛃' },
    { slug: 'guncel-duyurular', title: 'Güncel Duyurular', category: 'Bilgi & Kaynaklar', icon: '📢' },

    // Integrations
    { slug: 'shopify-entegrasyonu', title: 'Shopify Entegrasyonu', category: 'Entegrasyonlar', icon: '🛍️' },
    { slug: 'etsy-entegrasyonu', title: 'Etsy Entegrasyonu', category: 'Entegrasyonlar', icon: '🎨' },
    { slug: 'amazon-entegrasyonu', title: 'Amazon Entegrasyonu', category: 'Entegrasyonlar', icon: '📦' },
    { slug: 'woocommerce', title: 'WooCommerce', category: 'Entegrasyonlar', icon: '🛒' },
    { slug: 'ozel-site-kargo-api', title: 'Özel Site Kargo API', category: 'Entegrasyonlar', icon: '⚙️' },

    // Corporate
    { slug: 'hakkimizda', title: 'Hakkımızda', category: 'Kurumsal', icon: '🏢' },
    { slug: 'iletisim', title: 'İletişim', category: 'Kurumsal', icon: '📞' },
    { slug: 'destek', title: 'Destek', category: 'Kurumsal', icon: '💬' },
    { slug: 'gizlilik-politikasi', title: 'Gizlilik Politikası', category: 'Kurumsal', icon: '🔒' },
    { slug: 'kullanim-sartlari', title: 'Kullanım Şartları', category: 'Kurumsal', icon: '📄' },
    { slug: 'kvkk-aydinlatma', title: 'KVKK Aydınlatma', category: 'Kurumsal', icon: '⚖️' },
];

const ContentPagesList: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', 'Hizmetlerimiz', 'Nasıl Çalışır', 'Bilgi & Kaynaklar', 'Entegrasyonlar', 'Kurumsal'];

    const filteredPages = ALL_PAGES.filter(page => {
        const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <AdminLayout>
            <div className="max-w-7xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">İçerik Sayfaları</h1>
                        <p className="text-gray-600 mt-1">Tüm içerik sayfalarını yönetin</p>
                    </div>
                    <Button onClick={() => navigate('/admin/content-pages/new')}>
                        <i className="fas fa-plus mr-2"></i>
                        Yeni Sayfa Ekle
                    </Button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                    <div className="flex gap-4 items-center">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Sayfa ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div className="flex gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat === 'all' ? 'Tümü' : cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pages Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Sayfa
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Kategori
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Slug
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    İşlemler
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredPages.map((page) => (
                                <tr key={page.slug} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {page.icon && (
                                                typeof page.icon === 'string' && page.icon.startsWith('http') ? (
                                                    <img src={page.icon} alt={page.title} className="w-8 h-8 object-contain" />
                                                ) : (
                                                    <span className="text-2xl">{page.icon}</span>
                                                )
                                            )}
                                            <div>
                                                <div className="font-medium text-gray-900">{page.title}</div>
                                                <div className="text-sm text-gray-500">/{page.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {page.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                            {page.slug}
                                        </code>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => navigate(`/admin/content-pages/edit/${page.slug}`)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                            >
                                                <i className="fas fa-edit mr-2"></i>
                                                Düzenle
                                            </button>
                                            <a
                                                href={`/${page.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                                            >
                                                <i className="fas fa-external-link-alt"></i>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredPages.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <i className="fas fa-search text-4xl mb-4 opacity-50"></i>
                            <p>Sayfa bulunamadı</p>
                        </div>
                    )}
                </div>

                <div className="mt-4 text-sm text-gray-600">
                    Toplam {filteredPages.length} sayfa gösteriliyor
                </div>
            </div>
        </AdminLayout>
    );
};

export default ContentPagesList;
