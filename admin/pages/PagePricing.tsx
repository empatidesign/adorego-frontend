import React, { useState, useEffect } from 'react';
import NewLayout from '../components/NewLayout';
import SEOForm from '../components/SEOForm';
import { contentAPI } from '../services/api';

type Language = 'tr' | 'en';

const PagePricing: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [pricingTR, setPricingTR] = useState<any>({ badge: '', title: '', description: '', countries: [] });
  const [pricingEN, setPricingEN] = useState<any>({ badge: '', title: '', description: '', countries: [] });
  
  // SEO states
  const [seoTR, setSeoTR] = useState<any>({
    title: 'Kargo Fiyatları | adoreGo',
    description: 'Ülkelere göre güncel kargo fiyatlarımızı inceleyin.',
    keywords: 'kargo fiyatları, uluslararası kargo fiyat, yurtdışı kargo ücretleri',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  });
  const [seoEN, setSeoEN] = useState<any>({
    title: 'Shipping Prices | adoreGo',
    description: 'Check our current shipping prices by country.',
    keywords: 'shipping prices, international shipping cost, overseas cargo rates',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [priceTR, priceEN, seoTRRes, seoENRes] = await Promise.all([
        contentAPI.getPricing('tr'),
        contentAPI.getPricing('en'),
        fetch(`http://localhost:3001/api/content/seo/pricing?lang=tr`).then(r => r.json()),
        fetch(`http://localhost:3001/api/content/seo/pricing?lang=en`).then(r => r.json()),
      ]);

      setPricingTR(priceTR || { badge: 'FİYAT LİSTESİ', title: 'Ülkelere Göre Kargo Fiyatları', description: '', countries: [] });
      setPricingEN(priceEN || { badge: 'PRICE LIST', title: 'Shipping Prices by Country', description: '', countries: [] });
      
      if (seoTRRes && Object.keys(seoTRRes).length > 0) {
        setSeoTR(seoTRRes);
      }
      if (seoENRes && Object.keys(seoENRes).length > 0) {
        setSeoEN(seoENRes);
      }
    } catch (error) {
      console.error('Veri yüklenirken hata:', error);
      setMessage({ type: 'error', text: 'Veriler yüklenemedi!' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('admin_token');
      
      await Promise.all([
        contentAPI.updatePricing(pricingTR, 'tr'),
        contentAPI.updatePricing(pricingEN, 'en'),
        fetch(`http://localhost:3001/api/content/seo/pricing`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ data: seoTR, lang: 'tr' })
        }),
        fetch(`http://localhost:3001/api/content/seo/pricing`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ data: seoEN, lang: 'en' })
        }),
      ]);

      setMessage({ type: 'success', text: 'Fiyatlar sayfası başarıyla kaydedildi!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      setMessage({ type: 'error', text: 'Kaydetme sırasında hata oluştu!' });
    } finally {
      setSaving(false);
    }
  };

  const currentPricing = currentLang === 'tr' ? pricingTR : pricingEN;
  const currentSeo = currentLang === 'tr' ? seoTR : seoEN;

  const updatePricing = (updates: any) => {
    if (currentLang === 'tr') {
      setPricingTR({ ...pricingTR, ...updates });
    } else {
      setPricingEN({ ...pricingEN, ...updates });
    }
  };

  const updateSeo = (updates: any) => {
    if (currentLang === 'tr') {
      setSeoTR({ ...seoTR, ...updates });
    } else {
      setSeoEN({ ...seoEN, ...updates });
    }
  };

  if (loading) {
    return (
      <NewLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
            <p className="text-gray-600">Yükleniyor...</p>
          </div>
        </div>
      </NewLayout>
    );
  }

  return (
    <NewLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Fiyatlar Sayfası</h1>
            <p className="text-gray-600">Sayfa: /fiyatlar</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentLang('tr')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                currentLang === 'tr' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              🇹🇷 Türkçe
            </button>
            <button
              onClick={() => setCurrentLang('en')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                currentLang === 'en' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'content'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="fas fa-file-alt mr-2"></i>
            İçerik
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'seo'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="fas fa-search mr-2"></i>
            SEO Ayarları
          </button>
        </div>

        {activeTab === 'content' && (
          <div className="space-y-6">
          {/* Sayfa Başlığı ve Açıklama */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-heading text-orange-600"></i>
              Sayfa Başlığı ve Açıklama
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rozet (Badge)</label>
                <input
                  type="text"
                  value={currentPricing.badge || ''}
                  onChange={(e) => updatePricing({ badge: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="FİYAT LİSTESİ"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ana Başlık</label>
                <input
                  type="text"
                  value={currentPricing.title || ''}
                  onChange={(e) => updatePricing({ title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ülkelere Göre Kargo Fiyatları"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Açıklama</label>
                <textarea
                  value={currentPricing.description || ''}
                  onChange={(e) => updatePricing({ description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Güncel kargo fiyatlarımızı ülke bazlı inceleyebilirsiniz."
                />
              </div>
            </div>
          </div>

          {/* Ülkeler ve Fiyatlar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <i className="fas fa-globe text-orange-600"></i>
                Ülkeler ve Fiyatlar
              </h2>
              <button
                onClick={() => {
                  const newCountry = {
                    name: 'Yeni Ülke',
                    price: '0.00',
                    currency: '€',
                    time: '3-5 gün'
                  };
                  updatePricing({ countries: [...(currentPricing.countries || []), newCountry] });
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <i className="fas fa-plus mr-2"></i>
                Ülke Ekle
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">Toplam ülke sayısı: {(currentPricing.countries || []).length}</p>

            <div className="space-y-3">
              {(currentPricing.countries || []).map((country: any, index: number) => (
                <div key={index} className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50 relative">
                  <button
                    onClick={() => {
                      const updated = currentPricing.countries.filter((_: any, i: number) => i !== index);
                      updatePricing({ countries: updated });
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs z-10"
                  >
                    ×
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pr-8">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Ülke Adı</label>
                      <input
                        type="text"
                        value={country.name || ''}
                        onChange={(e) => {
                          const updated = [...currentPricing.countries];
                          updated[index] = { ...updated[index], name: e.target.value };
                          updatePricing({ countries: updated });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold"
                        placeholder="Almanya"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Fiyat</label>
                      <input
                        type="text"
                        value={country.price || ''}
                        onChange={(e) => {
                          const updated = [...currentPricing.countries];
                          updated[index] = { ...updated[index], price: e.target.value };
                          updatePricing({ countries: updated });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="12.50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Para Birimi</label>
                      <input
                        type="text"
                        value={country.currency || ''}
                        onChange={(e) => {
                          const updated = [...currentPricing.countries];
                          updated[index] = { ...updated[index], currency: e.target.value };
                          updatePricing({ countries: updated });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="€"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Teslimat Süresi</label>
                      <input
                        type="text"
                        value={country.time || ''}
                        onChange={(e) => {
                          const updated = [...currentPricing.countries];
                          updated[index] = { ...updated[index], time: e.target.value };
                          updatePricing({ countries: updated });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="3-5 gün"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}

        {activeTab === 'seo' && (
          <SEOForm seo={currentSeo} onUpdate={updateSeo} />
        )}

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {saving ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Kaydediliyor...
              </>
            ) : (
              <>
                <i className="fas fa-save mr-2"></i>
                Tüm Değişiklikleri Kaydet
              </>
            )}
          </button>
        </div>
      </div>
    </NewLayout>
  );
};

export default PagePricing;
