import React, { useState, useEffect } from 'react';
import NewLayout from '../components/NewLayout';
import SEOForm from '../components/SEOForm';
import { contentAPI } from '../services/api';

type Language = 'tr' | 'en';

const PageBlog: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [blogPageTR, setBlogPageTR] = useState<any>({});
  const [blogPageEN, setBlogPageEN] = useState<any>({});
  
  // SEO states
  const [seoTR, setSeoTR] = useState<any>({
    title: 'Blog | adoreGo',
    description: 'Kargo ve lojistik hakkında güncel blog yazıları. E-ticaret, yurtiçi ve yurtdışı kargo ipuçları.',
    keywords: 'kargo blog, lojistik blog, e-ticaret blog, kargo ipuçları',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  });
  const [seoEN, setSeoEN] = useState<any>({
    title: 'Blog | adoreGo',
    description: 'Latest blog posts about cargo and logistics. E-commerce, domestic and international shipping tips.',
    keywords: 'cargo blog, logistics blog, e-commerce blog, shipping tips',
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
      
      const [pageTR, pageEN] = await Promise.all([
        contentAPI.getContentPage('blog', 'tr'),
        contentAPI.getContentPage('blog', 'en'),
      ]);

      setBlogPageTR(pageTR || {
        pageTitle: 'Blog',
        breadcrumb: 'Blog',
        description: 'Kargo ve lojistik dünyasından haberler, ipuçları ve rehberler.'
      });

      setBlogPageEN(pageEN || {
        pageTitle: 'Blog',
        breadcrumb: 'Blog',
        description: 'News, tips and guides from the world of cargo and logistics.'
      });
      
      // SEO verilerini yükle
      if (pageTR && pageTR.seo) {
        setSeoTR(pageTR.seo);
      }
      if (pageEN && pageEN.seo) {
        setSeoEN(pageEN.seo);
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
      
      await Promise.all([
        contentAPI.updateContentPage('blog', { ...blogPageTR, seo: seoTR }, 'tr'),
        contentAPI.updateContentPage('blog', { ...blogPageEN, seo: seoEN }, 'en'),
      ]);

      setMessage({ type: 'success', text: 'Blog sayfası başarıyla kaydedildi!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      setMessage({ type: 'error', text: 'Kaydetme sırasında hata oluştu!' });
    } finally {
      setSaving(false);
    }
  };

  const currentBlogPage = currentLang === 'tr' ? blogPageTR : blogPageEN;
  const currentSeo = currentLang === 'tr' ? seoTR : seoEN;

  const updateBlogPage = (updates: any) => {
    if (currentLang === 'tr') {
      setBlogPageTR({ ...blogPageTR, ...updates });
    } else {
      setBlogPageEN({ ...blogPageEN, ...updates });
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Blog Sayfası Ayarları</h1>
            <p className="text-gray-600">Sayfa: /blog</p>
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
              <i className="fas fa-heading text-indigo-600"></i>
              Sayfa Başlığı
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ana Başlık (H1)</label>
                <input
                  type="text"
                  value={currentBlogPage.pageTitle || ''}
                  onChange={(e) => updateBlogPage({ pageTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Blog"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Breadcrumb Metni</label>
                <input
                  type="text"
                  value={currentBlogPage.breadcrumb || ''}
                  onChange={(e) => updateBlogPage({ breadcrumb: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Blog"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sayfa Açıklaması</label>
              <textarea
                value={currentBlogPage.description || ''}
                onChange={(e) => updateBlogPage({ description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Kargo ve lojistik dünyasından haberler, ipuçları ve rehberler."
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
              <i className="fas fa-info-circle text-blue-600"></i>
              Bilgi
            </h3>
            <p className="text-sm text-blue-800">
              Bu sayfa blog yazılarının listelendiği ana blog sayfasıdır. Bireysel blog yazılarının SEO ayarları her yazının kendi düzenleme sayfasında yapılır.
            </p>
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

export default PageBlog;
