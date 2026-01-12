import React, { useState, useEffect } from 'react';
import NewLayout from '../components/NewLayout';
import SEOForm from '../components/SEOForm';
import { contentAPI } from '../services/api';

type Language = 'tr' | 'en';

const PageTracking: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [trackingTR, setTrackingTR] = useState<any>({});
  const [trackingEN, setTrackingEN] = useState<any>({});
  
  // SEO states
  const [seoTR, setSeoTR] = useState<any>({
    title: 'Gönderi Takibi | adoreGo',
    description: 'Kargo gönderinizi takip edin. Takip numaranızla anlık kargo durumunu öğrenin.',
    keywords: 'gönderi takibi, kargo takip, paket takip, kargo sorgulama',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  });
  const [seoEN, setSeoEN] = useState<any>({
    title: 'Shipment Tracking | adoreGo',
    description: 'Track your shipment. Check your cargo status with tracking number.',
    keywords: 'shipment tracking, cargo tracking, package tracking, parcel tracking',
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
      
      // Tracking content endpoint'i henüz yoksa oluşturacağız
      const response = await fetch(`${contentAPI.getBaseURL()}/content/tracking?lang=tr`);
      const responseTR = response.ok ? await response.json() : {};
      
      const responseEN = await fetch(`${contentAPI.getBaseURL()}/content/tracking?lang=en`);
      const dataEN = responseEN.ok ? await responseEN.json() : {};

      setTrackingTR(responseTR || {
        pageTitle: 'Gönderi Takibi',
        breadcrumb: 'Gönderi Takibi',
        formTitle: 'Takip Numarası',
        formPlaceholder: 'Örn: ALG123456789TR',
        buttonText: 'Gönderimi Takip Et',
        buttonLoadingText: 'Sorgulanıyor...',
        infoTitle: 'Bilgi',
        infoText: 'Takip numaranızı faturanızda veya size gönderilen e-postada bulabilirsiniz. Sorun yaşıyorsanız müşteri hizmetlerimizle iletişime geçebilirsiniz.'
      });

      setTrackingEN(dataEN || {
        pageTitle: 'Shipment Tracking',
        breadcrumb: 'Tracking',
        formTitle: 'Tracking Number',
        formPlaceholder: 'e.g: ALG123456789TR',
        buttonText: 'Track Shipment',
        buttonLoadingText: 'Searching...',
        infoTitle: 'Information',
        infoText: 'You can find your tracking number on your invoice or in the email sent to you. If you have any problems, you can contact our customer service.'
      });
      
      // SEO verilerini yükle
      try {
        const seoResponseTR = await fetch(`${contentAPI.getBaseURL()}/content/seo/gonderi-takibi?lang=tr`);
        if (seoResponseTR.ok) {
          const seoDataTR = await seoResponseTR.json();
          if (seoDataTR && Object.keys(seoDataTR).length > 0) {
            setSeoTR(seoDataTR);
          }
        }
        
        const seoResponseEN = await fetch(`${contentAPI.getBaseURL()}/content/seo/gonderi-takibi?lang=en`);
        if (seoResponseEN.ok) {
          const seoDataEN = await seoResponseEN.json();
          if (seoDataEN && Object.keys(seoDataEN).length > 0) {
            setSeoEN(seoDataEN);
          }
        }
      } catch (seoError) {
        console.log('SEO verileri yüklenemedi, default değerler kullanılacak');
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
        // Tracking content'i kaydet
        fetch(`${contentAPI.getBaseURL()}/content/tracking`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ data: trackingTR, lang: 'tr' })
        }),
        fetch(`${contentAPI.getBaseURL()}/content/tracking`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ data: trackingEN, lang: 'en' })
        }),
        // SEO verilerini kaydet
        fetch(`${contentAPI.getBaseURL()}/content/seo/gonderi-takibi`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ data: seoTR, lang: 'tr' })
        }),
        fetch(`${contentAPI.getBaseURL()}/content/seo/gonderi-takibi`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ data: seoEN, lang: 'en' })
        })
      ]);

      setMessage({ type: 'success', text: 'Gönderi Takibi sayfası başarıyla kaydedildi!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      setMessage({ type: 'error', text: 'Kaydetme sırasında hata oluştu!' });
    } finally {
      setSaving(false);
    }
  };

  const currentTracking = currentLang === 'tr' ? trackingTR : trackingEN;
  const currentSeo = currentLang === 'tr' ? seoTR : seoEN;

  const updateTracking = (updates: any) => {
    if (currentLang === 'tr') {
      setTrackingTR({ ...trackingTR, ...updates });
    } else {
      setTrackingEN({ ...trackingEN, ...updates });
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Gönderi Takibi Sayfası</h1>
            <p className="text-gray-600">Sayfa: /gonderi-takibi</p>
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

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === 'content'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="fas fa-file-alt mr-2"></i>
              İçerik Yönetimi
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === 'seo'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="fas fa-search mr-2"></i>
              SEO Ayarları
            </button>
          </div>
        </div>

        {activeTab === 'seo' ? (
          <SEOForm seo={currentSeo} onUpdate={updateSeo} />
        ) : (
        <div className="space-y-6">
          {/* Sayfa Başlığı */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-heading text-cyan-600"></i>
              Sayfa Başlığı
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ana Başlık (H1)</label>
                <input
                  type="text"
                  value={currentTracking.pageTitle || ''}
                  onChange={(e) => updateTracking({ pageTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Gönderi Takibi"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Breadcrumb Metni</label>
                <input
                  type="text"
                  value={currentTracking.breadcrumb || ''}
                  onChange={(e) => updateTracking({ breadcrumb: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Gönderi Takibi"
                />
              </div>
            </div>
          </div>

          {/* Form Metinleri */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-search text-cyan-600"></i>
              Takip Formu Metinleri
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Form Başlığı (Label)</label>
                <input
                  type="text"
                  value={currentTracking.formTitle || ''}
                  onChange={(e) => updateTracking({ formTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Takip Numarası"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Input Placeholder</label>
                <input
                  type="text"
                  value={currentTracking.formPlaceholder || ''}
                  onChange={(e) => updateTracking({ formPlaceholder: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Örn: ALG123456789TR"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Buton Metni</label>
                  <input
                    type="text"
                    value={currentTracking.buttonText || ''}
                    onChange={(e) => updateTracking({ buttonText: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Gönderimi Takip Et"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Yükleniyor Metni</label>
                  <input
                    type="text"
                    value={currentTracking.buttonLoadingText || ''}
                    onChange={(e) => updateTracking({ buttonLoadingText: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Sorgulanıyor..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bilgi Kutusu */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-info-circle text-cyan-600"></i>
              Bilgi Kutusu
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Başlık</label>
                <input
                  type="text"
                  value={currentTracking.infoTitle || ''}
                  onChange={(e) => updateTracking({ infoTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Bilgi"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Açıklama Metni</label>
                <textarea
                  value={currentTracking.infoText || ''}
                  onChange={(e) => updateTracking({ infoText: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Takip numaranızı faturanızda veya size gönderilen e-postada bulabilirsiniz..."
                />
              </div>
            </div>
          </div>
        </div>
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

export default PageTracking;
