import React, { useState, useEffect } from 'react';
import NewLayout from '../components/NewLayout';
import SEOForm from '../components/SEOForm';
import { contentAPI } from '../services/api';
import { API_BASE_URL } from '../../src/api-config';

type Language = 'tr' | 'en';

const PageHome: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Data states
  const [heroTR, setHeroTR] = useState<any>({});
  const [heroEN, setHeroEN] = useState<any>({});
  const [partnersTR, setPartnersTR] = useState<any[]>([]);
  const [partnersEN, setPartnersEN] = useState<any[]>([]);
  const [destinationsTR, setDestinationsTR] = useState<any>({});
  const [destinationsEN, setDestinationsEN] = useState<any>({});
  const [faqTR, setFaqTR] = useState<any[]>([]);
  const [faqEN, setFaqEN] = useState<any[]>([]);

  // SEO states
  const [seoTR, setSeoTR] = useState<any>({
    title: 'adoreGo - Yurtdışı ve Yurtiçi Kargo | Akıllı Lojistik Platformu',
    description: 'E-ticaret işletmeleri için yurtdışı kargo, yurtiçi kargo ve lojistik çözümleri. Ekonomik fiyatlar, hızlı teslimat.',
    keywords: 'yurtdışı kargo, yurtiçi kargo, uluslararası kargo, e-ticaret lojistik, kargo gönderimi',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  });
  const [seoEN, setSeoEN] = useState<any>({
    title: 'adoreGo - International & Domestic Shipping | Smart Logistics Platform',
    description: 'International and domestic shipping solutions for e-commerce businesses. Affordable prices, fast delivery.',
    keywords: 'international shipping, domestic shipping, overseas cargo, e-commerce logistics, shipping',
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
      
      // Load all home page content
      const [heroTRRes, heroENRes, partnersTRRes, partnersENRes, destTRRes, destENRes, faqTRRes, faqENRes, seoTRRes, seoENRes] = await Promise.all([
        contentAPI.getHero('tr'),
        contentAPI.getHero('en'),
        contentAPI.getPartners('tr'),
        contentAPI.getPartners('en'),
        contentAPI.getPopularDestinations('tr'),
        contentAPI.getPopularDestinations('en'),
        contentAPI.getFaq('tr'),
        contentAPI.getFaq('en'),
        fetch(`${API_BASE_URL}/content/seo/home?lang=tr`).then(r => r.json()),
        fetch(`${API_BASE_URL}/content/seo/home?lang=en`).then(r => r.json()),
      ]);

      setHeroTR(heroTRRes || {});
      setHeroEN(heroENRes || {});
      setPartnersTR(partnersTRRes || []);
      setPartnersEN(partnersENRes || []);
      setDestinationsTR(destTRRes || {});
      setDestinationsEN(destENRes || {});
      setFaqTR(faqTRRes || []);
      setFaqEN(faqENRes || []);
      
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
        contentAPI.updateHero(heroTR, 'tr'),
        contentAPI.updateHero(heroEN, 'en'),
        contentAPI.updatePartners(partnersTR, 'tr'),
        contentAPI.updatePartners(partnersEN, 'en'),
        contentAPI.updatePopularDestinations(destinationsTR, 'tr'),
        contentAPI.updatePopularDestinations(destinationsEN, 'en'),
        contentAPI.updateFaq(faqTR, 'tr'),
        contentAPI.updateFaq(faqEN, 'en'),
        fetch(`${API_BASE_URL}/content/seo/home`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ data: seoTR, lang: 'tr' })
        }),
        fetch(`${API_BASE_URL}/content/seo/home`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ data: seoEN, lang: 'en' })
        }),
      ]);

      setMessage({ type: 'success', text: 'Ana sayfa içeriği başarıyla kaydedildi!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      setMessage({ type: 'error', text: 'Kaydetme sırasında hata oluştu!' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${contentAPI.getBaseURL()}/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      
      if (data.success && data.url) {
        const fullUrl = `${contentAPI.getBaseURL()}${data.url}`;
        updateHero({ image: fullUrl });
        setMessage({ type: 'success', text: 'Görsel başarıyla yüklendi!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error('Görsel yüklenemedi');
      }
    } catch (error) {
      console.error('Görsel yükleme hatası:', error);
      setMessage({ type: 'error', text: 'Görsel yüklenirken hata oluştu!' });
    } finally {
      setUploading(false);
    }
  };

  const handleDestinationImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${contentAPI.getBaseURL()}/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      
      if (data.success && data.url) {
        const fullUrl = `${contentAPI.getBaseURL()}${data.url}`;
        const updated = [...currentDestinations.destinations];
        updated[index] = { ...updated[index], image: fullUrl };
        updateDestinations({ destinations: updated });
        setMessage({ type: 'success', text: 'Ülke görseli başarıyla yüklendi!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error('Görsel yüklenemedi');
      }
    } catch (error) {
      console.error('Görsel yükleme hatası:', error);
      setMessage({ type: 'error', text: 'Görsel yüklenirken hata oluştu!' });
    } finally {
      setUploading(false);
    }
  };

  const currentHero = currentLang === 'tr' ? heroTR : heroEN;
  const setCurrentHero = currentLang === 'tr' ? setHeroTR : setHeroEN;
  const currentPartners = currentLang === 'tr' ? partnersTR : partnersEN;
  const setCurrentPartners = currentLang === 'tr' ? setPartnersTR : setPartnersEN;
  const currentDestinations = currentLang === 'tr' ? destinationsTR : destinationsEN;
  const setCurrentDestinations = currentLang === 'tr' ? setDestinationsTR : setDestinationsEN;
  const currentFaq = currentLang === 'tr' ? faqTR : faqEN;
  const setCurrentFaq = currentLang === 'tr' ? setFaqTR : setFaqEN;

  // Helper function to update hero
  const updateHero = (updates: any) => {
    if (currentLang === 'tr') {
      setHeroTR({ ...heroTR, ...updates });
    } else {
      setHeroEN({ ...heroEN, ...updates });
    }
  };

  // Helper function to update destinations
  const updateDestinations = (updates: any) => {
    if (currentLang === 'tr') {
      setDestinationsTR({ ...destinationsTR, ...updates });
    } else {
      setDestinationsEN({ ...destinationsEN, ...updates });
    }
  };

  // Helper function to update SEO
  const updateSeo = (updates: any) => {
    if (currentLang === 'tr') {
      setSeoTR({ ...seoTR, ...updates });
    } else {
      setSeoEN({ ...seoEN, ...updates });
    }
  };

  const currentSeo = currentLang === 'tr' ? seoTR : seoEN;

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
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Ana Sayfa İçeriği</h1>
            <p className="text-gray-600">Anasayfa: /</p>
          </div>
          
          {/* Language Switcher */}
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentLang('tr')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                currentLang === 'tr'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              🇹🇷 Türkçe
            </button>
            <button
              onClick={() => setCurrentLang('en')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                currentLang === 'en'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        {/* Content Tabs */}
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
          {/* 1. Hero Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <i className="fas fa-rocket text-blue-600"></i>
                Hero Banner (Ana Banner)
              </h2>
            </div>
            
            <div className="space-y-6">
              {/* Başlık */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ana Başlık <span className="text-xs text-gray-500">(Her satır için \n kullanın)</span>
                </label>
                <textarea
                  value={currentHero.title || ''}
                  onChange={(e) => updateHero({ title: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                  placeholder="Kazanç\nYurtdışında.\nEn Uygun Kargo Bizde."
                />
                <p className="text-xs text-gray-500 mt-1">Son satır yeşil renkte görünür</p>
              </div>

              {/* Alt Başlık */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Alt Başlık / Açıklama</label>
                <textarea
                  value={currentHero.subtitle || ''}
                  onChange={(e) => updateHero({ subtitle: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Yurtdışına kargo gönderimi yapan e-ticaret siteleri için..."
                />
              </div>

              {/* Görsel */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Görseli</label>
                <div className="space-y-3">
                  {/* Dosya Yükleme */}
                  <div className="flex items-center gap-3">
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fas fa-upload"></i>
                        <span className="text-sm font-semibold">
                          {uploading ? 'Yükleniyor...' : 'Görsel Yükle'}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-gray-500">veya</span>
                    <input
                      type="text"
                      value={currentHero.image || ''}
                      onChange={(e) => updateHero({ image: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="https://... (URL girin)"
                    />
                  </div>
                  
                  {/* Görsel Önizleme */}
                  {currentHero.image && (
                    <div className="relative">
                      <img 
                        src={currentHero.image} 
                        alt="Hero Preview" 
                        className="w-full max-w-md rounded-lg border-2 border-gray-200 shadow-sm"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Görsel+Yüklenemedi';
                        }}
                      />
                      <button
                        onClick={() => updateHero({ image: '' })}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Butonlar */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700">Butonlar</label>
                  <button
                    onClick={() => {
                      const newButton = { text: 'Yeni Buton', icon: 'fa-arrow-right', style: 'success' };
                      updateHero({ buttons: [...(currentHero.buttons || []), newButton] });
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
                  >
                    <i className="fas fa-plus mr-1"></i>
                    Buton Ekle
                  </button>
                </div>
                <div className="space-y-3">
                  {(currentHero.buttons || []).map((button: any, index: number) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50 relative">
                      <button
                        onClick={() => {
                          const updated = currentHero.buttons.filter((_: any, i: number) => i !== index);
                          updateHero({ buttons: updated });
                        }}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                      >
                        ×
                      </button>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={button.text || ''}
                          onChange={(e) => {
                            const updated = [...currentHero.buttons];
                            updated[index] = { ...updated[index], text: e.target.value };
                            updateHero({ buttons: updated });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Buton metni"
                        />
                        <input
                          type="text"
                          value={button.icon || ''}
                          onChange={(e) => {
                            const updated = [...currentHero.buttons];
                            updated[index] = { ...updated[index], icon: e.target.value };
                            updateHero({ buttons: updated });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="fa-icon"
                        />
                        <input
                          type="text"
                          value={button.style || ''}
                          onChange={(e) => {
                            const updated = [...currentHero.buttons];
                            updated[index] = { ...updated[index], style: e.target.value };
                            updateHero({ buttons: updated });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="success"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rozetler */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700">Rozetler (Badges)</label>
                  <button
                    onClick={() => {
                      const newBadge = { text: 'YENİ ROZET', icon: 'fa-check', color: 'blue' };
                      setCurrentHero({ ...currentHero, badges: [...(currentHero.badges || []), newBadge] });
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
                  >
                    <i className="fas fa-plus mr-1"></i>
                    Rozet Ekle
                  </button>
                </div>
                <div className="space-y-3">
                  {(currentHero.badges || []).map((badge: any, index: number) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50 relative">
                      <button
                        onClick={() => {
                          const updated = currentHero.badges.filter((_: any, i: number) => i !== index);
                          setCurrentHero({ ...currentHero, badges: updated });
                        }}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                      >
                        ×
                      </button>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={badge.text || ''}
                          onChange={(e) => {
                            const updated = [...currentHero.badges];
                            updated[index] = { ...updated[index], text: e.target.value };
                            setCurrentHero({ ...currentHero, badges: updated });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Rozet metni"
                        />
                        <input
                          type="text"
                          value={badge.icon || ''}
                          onChange={(e) => {
                            const updated = [...currentHero.badges];
                            updated[index] = { ...updated[index], icon: e.target.value };
                            setCurrentHero({ ...currentHero, badges: updated });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="fa-icon"
                        />
                        <select
                          value={badge.color || 'blue'}
                          onChange={(e) => {
                            const updated = [...currentHero.badges];
                            updated[index] = { ...updated[index], color: e.target.value };
                            setCurrentHero({ ...currentHero, badges: updated });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="blue">Mavi</option>
                          <option value="green">Yeşil</option>
                          <option value="red">Kırmızı</option>
                          <option value="yellow">Sarı</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* İstatistikler */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700">İstatistikler (Stats)</label>
                  <button
                    onClick={() => {
                      const newStat = { value: '100+', label: 'YENİ İSTATİSTİK', icon: 'fa-star' };
                      setCurrentHero({ ...currentHero, stats: [...(currentHero.stats || []), newStat] });
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
                  >
                    <i className="fas fa-plus mr-1"></i>
                    İstatistik Ekle
                  </button>
                </div>
                <div className="space-y-3">
                  {(currentHero.stats || []).map((stat: any, index: number) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50 relative">
                      <button
                        onClick={() => {
                          const updated = currentHero.stats.filter((_: any, i: number) => i !== index);
                          setCurrentHero({ ...currentHero, stats: updated });
                        }}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                      >
                        ×
                      </button>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={stat.value || ''}
                          onChange={(e) => {
                            const updated = [...currentHero.stats];
                            updated[index] = { ...updated[index], value: e.target.value };
                            setCurrentHero({ ...currentHero, stats: updated });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="220+"
                        />
                        <input
                          type="text"
                          value={stat.label || ''}
                          onChange={(e) => {
                            const updated = [...currentHero.stats];
                            updated[index] = { ...updated[index], label: e.target.value };
                            setCurrentHero({ ...currentHero, stats: updated });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="GLOBAL ÜLKE AĞI"
                        />
                        <input
                          type="text"
                          value={stat.icon || ''}
                          onChange={(e) => {
                            const updated = [...currentHero.stats];
                            updated[index] = { ...updated[index], icon: e.target.value };
                            setCurrentHero({ ...currentHero, stats: updated });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="fa-globe-africa"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Note: Yurtdışı ve Yurtiçi bölümleri */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <i className="fas fa-info-circle mr-2"></i>
              <strong>Not:</strong> "Nasıl Çalışır", "Özellikler", "Akıllı Gönderim" ve "Gönderdiğe Kazan" bölümleri kendi sayfalarından düzenlenir:
            </p>
            <div className="mt-2 flex gap-2">
              <a href="/admin/page-international" className="text-xs px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Yurtdışı Kargo Sayfası
              </a>
              <a href="/admin/page-domestic" className="text-xs px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Yurtiçi Kargo Sayfası
              </a>
            </div>
          </div>

          {/* 2. Partners Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <i className="fas fa-handshake text-blue-600"></i>
                Partnerler
              </h2>
              <button
                onClick={() => {
                  const newPartner = { name: 'Yeni Partner', logo: '', url: '' };
                  setCurrentPartners([...currentPartners, newPartner]);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <i className="fas fa-plus mr-2"></i>
                Partner Ekle
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Partner sayısı: {currentPartners.length}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPartners.map((partner: any, index: number) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                  <button
                    onClick={() => {
                      const updated = currentPartners.filter((_: any, i: number) => i !== index);
                      setCurrentPartners(updated);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                  >
                    ×
                  </button>
                  <input
                    type="text"
                    value={partner.name || ''}
                    onChange={(e) => {
                      const updated = [...currentPartners];
                      updated[index] = { ...updated[index], name: e.target.value };
                      setCurrentPartners(updated);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 font-semibold"
                    placeholder="Partner adı"
                  />
                  <input
                    type="text"
                    value={partner.logo || ''}
                    onChange={(e) => {
                      const updated = [...currentPartners];
                      updated[index] = { ...updated[index], logo: e.target.value };
                      setCurrentPartners(updated);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 text-sm"
                    placeholder="Logo URL"
                  />
                  <input
                    type="text"
                    value={partner.url || ''}
                    onChange={(e) => {
                      const updated = [...currentPartners];
                      updated[index] = { ...updated[index], url: e.target.value };
                      setCurrentPartners(updated);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Web sitesi URL"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 3. Popular Destinations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <i className="fas fa-globe text-blue-600"></i>
                Popüler Ülkeler
              </h2>
              <button
                onClick={() => {
                  const newDestination = {
                    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070',
                    name: 'Yeni Ülke',
                    price: '0.00',
                    currency: '€',
                    tag: 'Yeni',
                    priceLabel: 'Başlangıç'
                  };
                  updateDestinations({ 
                    destinations: [...(currentDestinations.destinations || []), newDestination] 
                  });
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <i className="fas fa-plus mr-2"></i>
                Ülke Ekle
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rozet (Badge)</label>
                <input
                  type="text"
                  value={currentDestinations.badge || ''}
                  onChange={(e) => updateDestinations({ badge: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="POPÜLER ÜLKELER"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Başlık</label>
                <input
                  type="text"
                  value={currentDestinations.title || ''}
                  onChange={(e) => updateDestinations({ title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Dünyaya Bizimle Ulaşın."
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Ülkeler ({(currentDestinations.destinations || []).length})</label>
              {(currentDestinations.destinations || []).map((dest: any, index: number) => (
                <div key={index} className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50 relative">
                  <button
                    onClick={() => {
                      const updated = currentDestinations.destinations.filter((_: any, i: number) => i !== index);
                      updateDestinations({ destinations: updated });
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs z-10"
                  >
                    ×
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Ülke Adı</label>
                      <input
                        type="text"
                        value={dest.name || ''}
                        onChange={(e) => {
                          const updated = [...currentDestinations.destinations];
                          updated[index] = { ...updated[index], name: e.target.value };
                          updateDestinations({ destinations: updated });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold"
                        placeholder="Almanya"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Etiket (Tag)</label>
                      <input
                        type="text"
                        value={dest.tag || ''}
                        onChange={(e) => {
                          const updated = [...currentDestinations.destinations];
                          updated[index] = { ...updated[index], tag: e.target.value };
                          updateDestinations({ destinations: updated });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Express Servis"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Fiyat</label>
                      <input
                        type="text"
                        value={dest.price || ''}
                        onChange={(e) => {
                          const updated = [...currentDestinations.destinations];
                          updated[index] = { ...updated[index], price: e.target.value };
                          updateDestinations({ destinations: updated });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="12.50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Para Birimi</label>
                      <input
                        type="text"
                        value={dest.currency || ''}
                        onChange={(e) => {
                          const updated = [...currentDestinations.destinations];
                          updated[index] = { ...updated[index], currency: e.target.value };
                          updateDestinations({ destinations: updated });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="€"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Fiyat Etiketi</label>
                      <input
                        type="text"
                        value={dest.priceLabel || ''}
                        onChange={(e) => {
                          const updated = [...currentDestinations.destinations];
                          updated[index] = { ...updated[index], priceLabel: e.target.value };
                          updateDestinations({ destinations: updated });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Başlangıç"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Ülke Görseli</label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer">
                        <div className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2">
                          <i className="fas fa-upload"></i>
                          Görsel Yükle
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleDestinationImageUpload(e, index)}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        value={dest.image || ''}
                        onChange={(e) => {
                          const updated = [...currentDestinations.destinations];
                          updated[index] = { ...updated[index], image: e.target.value };
                          updateDestinations({ destinations: updated });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="veya URL girin"
                      />
                    </div>
                    {dest.image && (
                      <img src={dest.image} alt={dest.name} className="mt-2 w-full h-40 object-cover rounded-lg border" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <i className="fas fa-circle-question text-blue-600"></i>
                Sık Sorulan Sorular (FAQ)
              </h2>
              <button
                onClick={() => {
                  const newFaq = { question: 'Yeni Soru', answer: 'Yeni Cevap' };
                  setCurrentFaq([...currentFaq, newFaq]);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <i className="fas fa-plus mr-2"></i>
                Soru Ekle
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Soru sayısı: {currentFaq.length}</p>
            
            <div className="space-y-4">
              {currentFaq.map((faq: any, index: number) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                  <button
                    onClick={() => {
                      const updated = currentFaq.filter((_: any, i: number) => i !== index);
                      setCurrentFaq(updated);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                  >
                    ×
                  </button>
                  <div className="mb-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Soru {index + 1}</label>
                    <input
                      type="text"
                      value={faq.question || ''}
                      onChange={(e) => {
                        const updated = [...currentFaq];
                        updated[index] = { ...updated[index], question: e.target.value };
                        setCurrentFaq(updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg font-semibold"
                      placeholder="Soru"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Cevap</label>
                    <textarea
                      value={faq.answer || ''}
                      onChange={(e) => {
                        const updated = [...currentFaq];
                        updated[index] = { ...updated[index], answer: e.target.value };
                        setCurrentFaq(updated);
                      }}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Cevap"
                    />
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

        {/* Save Button */}
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

export default PageHome;
