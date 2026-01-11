import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, TextArea, Button, Select } from '../../components/forms/FormComponents';
import ImageUpload from '../../components/forms/ImageUpload';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';

const SEOEditor: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [seoDataTR, setSeoDataTR] = useState({
    title: 'adoreGo - Yurtdışı ve Yurtiçi Kargo | Akıllı Lojistik Platformu',
    description: 'E-ticaret işletmeleri için yurtdışı kargo, yurtiçi kargo ve lojistik çözümleri. Ekonomik fiyatlar, hızlı teslimat, kolay entegrasyon. Shopify, Etsy, Amazon entegrasyonu.',
    keywords: 'yurtdışı kargo, uluslararası kargo, yurtiçi kargo, mikro ihracat, e-ticaret lojistik, kargo entegrasyonu, shopify kargo, etsy kargo, amazon kargo, express kargo, ekonomik kargo',
    ogTitle: 'adoreGo - E-Ticaret için Akıllı Lojistik Çözümleri',
    ogDescription: 'Yurtdışı ve yurtiçi kargo gönderimlerinizi tek platformdan yönetin. E-ticaret sitenize kolayca entegre edin, avantajlı fiyatlarla gönderin.',
    ogImage: '',
    twitterCard: 'summary_large_image',
    twitterTitle: 'adoreGo - E-Ticaret Lojistik Platformu',
    twitterDescription: 'Yurtdışı ve yurtiçi kargo çözümleri. Shopify, Etsy, Amazon entegrasyonu. Hızlı, güvenli, ekonomik.',
    twitterImage: '',
    canonical: 'https://adorego.com',
    robots: 'index, follow',
    author: 'adoreGo',
    language: 'tr',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "adoreGo",
      "description": "E-ticaret işletmeleri için yurtdışı ve yurtiçi kargo lojistik platformu",
      "url": "https://adorego.com",
      "logo": "https://adorego.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["Turkish", "English"]
      },
      "sameAs": [
        "https://www.instagram.com/adorego",
        "https://www.linkedin.com/company/adorego"
      ],
      "offers": {
        "@type": "AggregateOffer",
        "description": "Yurtdışı ve yurtiçi kargo hizmetleri"
      }
    }
  });

  const [seoDataEN, setSeoDataEN] = useState({
    title: 'adoreGo - International & Domestic Shipping | Smart Logistics Platform',
    description: 'International and domestic shipping solutions for e-commerce businesses. Affordable prices, fast delivery, easy integration. Shopify, Etsy, Amazon integration.',
    keywords: 'international shipping, overseas cargo, domestic shipping, micro export, e-commerce logistics, shipping integration, shopify shipping, etsy shipping, amazon shipping, express shipping',
    ogTitle: 'adoreGo - Smart Logistics Solutions for E-Commerce',
    ogDescription: 'Manage your international and domestic shipments from a single platform. Easy integration with your e-commerce site, ship at competitive prices.',
    ogImage: '',
    twitterCard: 'summary_large_image',
    twitterTitle: 'adoreGo - E-Commerce Logistics Platform',
    twitterDescription: 'International and domestic shipping solutions. Shopify, Etsy, Amazon integration. Fast, secure, affordable.',
    twitterImage: '',
    canonical: 'https://adorego.com',
    robots: 'index, follow',
    author: 'adoreGo',
    language: 'en',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "adoreGo",
      "description": "International and domestic shipping logistics platform for e-commerce businesses",
      "url": "https://adorego.com",
      "logo": "https://adorego.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["Turkish", "English"]
      },
      "sameAs": [
        "https://www.instagram.com/adorego",
        "https://www.linkedin.com/company/adorego"
      ],
      "offers": {
        "@type": "AggregateOffer",
        "description": "International and domestic shipping services"
      }
    }
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const dataTR = await contentAPI.getSeo(currentPage, 'tr');
      const dataEN = await contentAPI.getSeo(currentPage, 'en');

      if (Object.keys(dataTR).length > 0) setSeoDataTR(dataTR);
      if (Object.keys(dataEN).length > 0) setSeoDataEN(dataEN);
    } catch (error) {
      setMessage({ type: 'error', text: 'Veri yüklenemedi' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await contentAPI.updateSeo(currentPage, seoDataTR, 'tr');
      await contentAPI.updateSeo(currentPage, seoDataEN, 'en');
      setMessage({ type: 'success', text: 'SEO ayarları her iki dil için başarıyla güncellendi!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Güncelleme başarısız' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    loadData();
    setMessage({ type: '', text: '' });
  };

  const currentSeoData = currentLang === 'tr' ? seoDataTR : seoDataEN;
  const setCurrentSeoData = currentLang === 'tr' ? setSeoDataTR : setSeoDataEN;

  const updateStructuredData = (field: string, value: any) => {
    setCurrentSeoData((prev: any) => ({
      ...prev,
      structuredData: {
        ...prev.structuredData,
        [field]: value
      }
    }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Yükleniyor...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">SEO Yönetimi</h1>
        <p className="text-gray-600 mb-8">Tüm meta tag'leri, Open Graph ve yapılandırılmış verileri yönetin</p>

        {/* Sayfa Seçici */}
        <div className="mb-6 bg-white rounded-xl shadow-md p-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">Sayfa Seçin</label>
          <Select
            value={currentPage}
            onChange={setCurrentPage}
            options={[
              { label: '🏠 Ana Sayfa', value: 'home' },
              { label: '💰 Fiyatlar', value: 'pricing' },
              { label: '📖 Nasıl Gönderirim?', value: 'how-to-send' },
              { label: '📋 Hakkımızda', value: 'about' },
              { label: '📞 İletişim', value: 'contact' },
              { label: '💼 Hizmetler', value: 'services' },
            ]}
          />
        </div>

        {/* Dil Sekmeleri */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setCurrentLang('tr')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${currentLang === 'tr'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            🇹🇷 Türkçe
          </button>
          <button
            onClick={() => setCurrentLang('en')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${currentLang === 'en'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            🇬🇧 English
          </button>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
            {message.text}
          </div>
        )}

        {/* Temel Meta Tag'ler */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-tag text-blue-500"></i>
            Temel Meta Tag'ler
          </h3>

          <Input
            label="Sayfa Başlığı (Title)"
            value={currentSeoData.title}
            onChange={(val) => setCurrentSeoData({ ...currentSeoData, title: val })}
            placeholder={currentLang === 'tr' ? "adoreGo - Yurtdışı Kargo ve Lojistik Çözümleri" : "adoreGo - International Shipping Solutions"}
          />
          <p className="text-xs text-gray-500 mb-4">Önerilen uzunluk: 50-60 karakter</p>

          <TextArea
            label="Meta Açıklama (Description)"
            value={currentSeoData.description}
            onChange={(val) => setCurrentSeoData({ ...currentSeoData, description: val })}
            placeholder={currentLang === 'tr' ? "E-ticaret siteleriniz için yurtdışı kargo..." : "Global shipping solutions for e-commerce..."}
            rows={3}
          />
          <p className="text-xs text-gray-500 mb-4">Önerilen uzunluk: 150-160 karakter</p>

          <Input
            label="Anahtar Kelimeler (Keywords)"
            value={currentSeoData.keywords}
            onChange={(val) => setCurrentSeoData({ ...currentSeoData, keywords: val })}
            placeholder="yurtdışı kargo, uluslararası kargo, mikro ihracat"
          />
          <p className="text-xs text-gray-500 mb-4">Virgülle ayırarak yazın</p>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Canonical URL"
              value={currentSeoData.canonical}
              onChange={(val) => setCurrentSeoData({ ...currentSeoData, canonical: val })}
              placeholder="https://adorego.com"
            />
            <Select
              label="Robots"
              value={currentSeoData.robots}
              onChange={(val) => setCurrentSeoData({ ...currentSeoData, robots: val })}
              options={[
                { label: 'Index, Follow', value: 'index, follow' },
                { label: 'Index, Nofollow', value: 'index, nofollow' },
                { label: 'Noindex, Follow', value: 'noindex, follow' },
                { label: 'Noindex, Nofollow', value: 'noindex, nofollow' },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              label="Yazar (Author)"
              value={currentSeoData.author}
              onChange={(val) => setCurrentSeoData({ ...currentSeoData, author: val })}
              placeholder="adoreGo"
            />
            <Input
              label="Dil Kodu"
              value={currentSeoData.language}
              onChange={(val) => setCurrentSeoData({ ...currentSeoData, language: val })}
              placeholder="tr"
              disabled
            />
          </div>
        </div>

        {/* Open Graph (Facebook) */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fab fa-facebook text-blue-600"></i>
            Open Graph (Facebook, LinkedIn)
          </h3>

          <Input
            label="OG Başlık"
            value={currentSeoData.ogTitle}
            onChange={(val) => setCurrentSeoData({ ...currentSeoData, ogTitle: val })}
            placeholder={currentSeoData.title}
          />

          <TextArea
            label="OG Açıklama"
            value={currentSeoData.ogDescription}
            onChange={(val) => setCurrentSeoData({ ...currentSeoData, ogDescription: val })}
            placeholder={currentSeoData.description}
            rows={2}
          />

          <ImageUpload
            label="OG Görsel (1200x630px önerilir)"
            currentImage={currentSeoData.ogImage}
            onImageUploaded={(url) => setCurrentSeoData({ ...currentSeoData, ogImage: url })}
          />
        </div>

        {/* Twitter Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fab fa-twitter text-blue-400"></i>
            Twitter Card
          </h3>

          <Select
            label="Twitter Card Tipi"
            value={currentSeoData.twitterCard}
            onChange={(val) => setCurrentSeoData({ ...currentSeoData, twitterCard: val })}
            options={[
              { label: 'Summary Large Image', value: 'summary_large_image' },
              { label: 'Summary', value: 'summary' },
            ]}
          />

          <Input
            label="Twitter Başlık"
            value={currentSeoData.twitterTitle}
            onChange={(val) => setCurrentSeoData({ ...currentSeoData, twitterTitle: val })}
            placeholder={currentSeoData.title}
          />

          <TextArea
            label="Twitter Açıklama"
            value={currentSeoData.twitterDescription}
            onChange={(val) => setCurrentSeoData({ ...currentSeoData, twitterDescription: val })}
            placeholder={currentSeoData.description}
            rows={2}
          />

          <ImageUpload
            label="Twitter Görsel"
            currentImage={currentSeoData.twitterImage}
            onImageUploaded={(url) => setCurrentSeoData({ ...currentSeoData, twitterImage: url })}
          />
        </div>

        {/* Structured Data (JSON-LD) */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-code text-purple-500"></i>
            Yapılandırılmış Veri (Schema.org)
          </h3>

          <TextArea
            label="Structured Data (JSON-LD)"
            value={JSON.stringify(currentSeoData.structuredData, null, 2)}
            onChange={(val) => {
              try {
                const parsed = JSON.parse(val);
                setCurrentSeoData({ ...currentSeoData, structuredData: parsed });
              } catch (e) {
                // Geçersiz JSON - kullanıcı yazıyor olabilir
              }
            }}
            rows={10}
          />
          <p className="text-xs text-gray-500 mt-2">
            Schema.org formatında JSON-LD verisini buraya girin.
            <a href="https://schema.org" target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-1">
              Daha fazla bilgi →
            </a>
          </p>
        </div>

        {/* Önizleme */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-eye text-green-500"></i>
            Google Arama Önizlemesi
          </h3>

          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="text-xs text-gray-500 mb-1">{currentSeoData.canonical || 'https://adorego.com'}</div>
            <div className="text-blue-600 text-xl mb-1 hover:underline cursor-pointer">
              {currentSeoData.title || 'Sayfa Başlığı'}
            </div>
            <div className="text-sm text-gray-700">
              {currentSeoData.description || 'Meta açıklama burada görünecek...'}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (currentLang === 'tr' ? 'Kaydediliyor...' : 'Saving...') : (currentLang === 'tr' ? 'Değişiklikleri Kaydet' : 'Save Changes')}
          </Button>
          <Button onClick={handleCancel} variant="secondary">
            {currentLang === 'tr' ? 'İptal' : 'Cancel'}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SEOEditor;
