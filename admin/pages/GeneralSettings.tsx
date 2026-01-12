import React, { useState, useEffect } from 'react';
import NewLayout from '../components/NewLayout';
import { contentAPI } from '../services/api';

type Language = 'tr' | 'en';

const GeneralSettings: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'navbar' | 'footer' | 'seo' | 'site'>('navbar');

  const [navbarTR, setNavbarTR] = useState<any>({});
  const [navbarEN, setNavbarEN] = useState<any>({});
  const [footerTR, setFooterTR] = useState<any>({});
  const [footerEN, setFooterEN] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [navTR, navEN, footTR, footEN] = await Promise.all([
        contentAPI.getNavbar('tr'),
        contentAPI.getNavbar('en'),
        contentAPI.getFooter('tr'),
        contentAPI.getFooter('en'),
      ]);

      setNavbarTR(navTR || {});
      setNavbarEN(navEN || {});
      setFooterTR(footTR || {});
      setFooterEN(footEN || {});
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
      await Promise.all([
        contentAPI.updateNavbar(navbarTR, 'tr'),
        contentAPI.updateNavbar(navbarEN, 'en'),
        contentAPI.updateFooter(footerTR, 'tr'),
        contentAPI.updateFooter(footerEN, 'en'),
      ]);

      setMessage({ type: 'success', text: 'Genel ayarlar başarıyla kaydedildi!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      setMessage({ type: 'error', text: 'Kaydetme sırasında hata oluştu!' });
    } finally {
      setSaving(false);
    }
  };

  const currentNavbar = currentLang === 'tr' ? navbarTR : navbarEN;
  const setCurrentNavbar = currentLang === 'tr' ? setNavbarTR : setNavbarEN;
  const currentFooter = currentLang === 'tr' ? footerTR : footerEN;
  const setCurrentFooter = currentLang === 'tr' ? setFooterTR : setFooterEN;

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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Genel Ayarlar</h1>
            <p className="text-gray-600">Menü, Footer, SEO ve Site Ayarları</p>
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
        <div className="mb-6 flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('navbar')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'navbar'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <i className="fas fa-bars mr-2"></i>
            Menü
          </button>
          <button
            onClick={() => setActiveTab('footer')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'footer'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <i className="fas fa-layer-group mr-2"></i>
            Footer
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'seo'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <i className="fas fa-search mr-2"></i>
            SEO
          </button>
          <button
            onClick={() => setActiveTab('site')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'site'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <i className="fas fa-cog mr-2"></i>
            Site Ayarları
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'navbar' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Menü Ayarları</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Logo Metni</label>
                  <input
                    type="text"
                    value={currentNavbar.logoText || ''}
                    onChange={(e) => setCurrentNavbar({ ...currentNavbar, logoText: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-sm text-gray-600">Menü öğesi sayısı: {currentNavbar.menuItems?.length || 0}</p>
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Footer Ayarları</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telif Hakkı Metni</label>
                  <input
                    type="text"
                    value={currentFooter.copyright || ''}
                    onChange={(e) => setCurrentFooter({ ...currentFooter, copyright: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Açıklama</label>
                  <textarea
                    value={currentFooter.description || ''}
                    onChange={(e) => setCurrentFooter({ ...currentFooter, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">SEO Ayarları</h2>
              <p className="text-gray-600">SEO ayarları için eski admin panelindeki SEO Ayarları sayfasını kullanın.</p>
              <a href="/admin/seo" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                SEO Ayarlarına Git
              </a>
            </div>
          )}

          {activeTab === 'site' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Site Ayarları</h2>
              <p className="text-gray-600">Site ayarları için eski admin panelindeki Site Ayarları sayfasını kullanın.</p>
              <a href="/admin/settings" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Site Ayarlarına Git
              </a>
            </div>
          )}
        </div>

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

export default GeneralSettings;
