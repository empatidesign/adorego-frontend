import React, { useState, useEffect } from 'react';
import NewLayout from '../components/NewLayout';
import SEOForm from '../components/SEOForm';
import { contentAPI } from '../services/api';

type Language = 'tr' | 'en';

const PageInternational: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [howItWorksTR, setHowItWorksTR] = useState<any>({});
  const [howItWorksEN, setHowItWorksEN] = useState<any>({});
  const [featuresTR, setFeaturesTR] = useState<any[]>([]);
  const [featuresEN, setFeaturesEN] = useState<any[]>([]);
  const [featuresHeaderTR, setFeaturesHeaderTR] = useState<any>({});
  const [featuresHeaderEN, setFeaturesHeaderEN] = useState<any>({});
  const [ctaTR, setCtaTR] = useState<any>({});
  const [ctaEN, setCtaEN] = useState<any>({});
  const [pageHeaderTR, setPageHeaderTR] = useState<any>({ title: 'Yurtdışı Kargo Hizmetleri', breadcrumb: 'Yurtdışı Kargo' });
  const [pageHeaderEN, setPageHeaderEN] = useState<any>({ title: 'International Shipping Services', breadcrumb: 'International Shipping' });

  // SEO states
  const [seoTR, setSeoTR] = useState<any>({
    title: 'Yurtdışı Kargo | adoreGo',
    description: 'Yurtdışı kargo hizmetleri. Ekonomik ve hızlı uluslararası kargo gönderimi.',
    keywords: 'yurtdışı kargo, uluslararası kargo, overseas shipping, international cargo',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  });
  const [seoEN, setSeoEN] = useState<any>({
    title: 'International Shipping | adoreGo',
    description: 'International shipping services. Affordable and fast overseas cargo delivery.',
    keywords: 'international shipping, overseas cargo, global shipping, international delivery',
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
      // Load all international page content
      const [howTR, howEN, featTR, featEN, featHeaderTR, featHeaderEN, ctaTRRes, ctaENRes, pageTR, pageEN] = await Promise.all([
        contentAPI.getHowItWorks('tr'),
        contentAPI.getHowItWorks('en'),
        contentAPI.getFeatures('tr'),
        contentAPI.getFeatures('en'),
        contentAPI.getFeaturesHeader('tr'),
        contentAPI.getFeaturesHeader('en'),
        contentAPI.getCta('tr'),
        contentAPI.getCta('en'),
        contentAPI.getContentPage('yurtdisi-kargo', 'tr'),
        contentAPI.getContentPage('yurtdisi-kargo', 'en'),
      ]);

      setHowItWorksTR(howTR || {});
      setHowItWorksEN(howEN || {});
      setFeaturesTR(featTR || []);
      setFeaturesEN(featEN || []);
      setFeaturesHeaderTR(featHeaderTR || {});
      setFeaturesHeaderEN(featHeaderEN || {});
      setCtaTR(ctaTRRes || {});
      setCtaEN(ctaENRes || {});
      
      // Sayfa başlıklarını yükle
      if (pageTR && pageTR.header) {
        setPageHeaderTR(pageTR.header);
      }
      if (pageEN && pageEN.header) {
        setPageHeaderEN(pageEN.header);
      }
      
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
        contentAPI.updateHowItWorks(howItWorksTR, 'tr'),
        contentAPI.updateHowItWorks(howItWorksEN, 'en'),
        contentAPI.updateFeatures(featuresTR, 'tr'),
        contentAPI.updateFeatures(featuresEN, 'en'),
        contentAPI.updateFeaturesHeader(featuresHeaderTR, 'tr'),
        contentAPI.updateFeaturesHeader(featuresHeaderEN, 'en'),
        contentAPI.updateCta(ctaTR, 'tr'),
        contentAPI.updateCta(ctaEN, 'en'),
        // Sayfa başlığı ve SEO'yu kaydet
        contentAPI.updateContentPage('yurtdisi-kargo', { header: pageHeaderTR, seo: seoTR }, 'tr'),
        contentAPI.updateContentPage('yurtdisi-kargo', { header: pageHeaderEN, seo: seoEN }, 'en'),
      ]);

      setMessage({ type: 'success', text: 'Yurtdışı kargo sayfası başarıyla kaydedildi!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      setMessage({ type: 'error', text: 'Kaydetme sırasında hata oluştu!' });
    } finally {
      setSaving(false);
    }
  };

  // Helper function to update howItWorks
  const updateHowItWorks = (updates: any) => {
    if (currentLang === 'tr') {
      setHowItWorksTR({ ...howItWorksTR, ...updates });
    } else {
      setHowItWorksEN({ ...howItWorksEN, ...updates });
    }
  };

  // Helper function to update features
  const updateFeatures = (newFeatures: any[]) => {
    if (currentLang === 'tr') {
      setFeaturesTR(newFeatures);
    } else {
      setFeaturesEN(newFeatures);
    }
  };

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, stepIndex: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
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
        const updatedSteps = [...(currentHowItWorks.steps || [])];
        updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], image: fullUrl };
        updateHowItWorks({ steps: updatedSteps });
        setMessage({ type: 'success', text: 'Görsel başarıyla yüklendi!' });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error('Görsel yükleme hatası:', error);
      setMessage({ type: 'error', text: 'Görsel yüklenirken hata oluştu!' });
    }
  };

  const currentHowItWorks = currentLang === 'tr' ? howItWorksTR : howItWorksEN;
  const currentFeatures = currentLang === 'tr' ? featuresTR : featuresEN;
  const currentFeaturesHeader = currentLang === 'tr' ? featuresHeaderTR : featuresHeaderEN;
  const currentCta = currentLang === 'tr' ? ctaTR : ctaEN;
  const currentPageHeader = currentLang === 'tr' ? pageHeaderTR : pageHeaderEN;
  const currentSeo = currentLang === 'tr' ? seoTR : seoEN;

  const updatePageHeader = (updates: any) => {
    if (currentLang === 'tr') {
      setPageHeaderTR({ ...pageHeaderTR, ...updates });
    } else {
      setPageHeaderEN({ ...pageHeaderEN, ...updates });
    }
  };

  const updateFeaturesHeader = (updates: any) => {
    if (currentLang === 'tr') {
      setFeaturesHeaderTR({ ...featuresHeaderTR, ...updates });
    } else {
      setFeaturesHeaderEN({ ...featuresHeaderEN, ...updates });
    }
  };

  const updateCta = (updates: any) => {
    if (currentLang === 'tr') {
      setCtaTR({ ...ctaTR, ...updates });
    } else {
      setCtaEN({ ...ctaEN, ...updates });
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Yurtdışı Kargo Sayfası</h1>
            <p className="text-gray-600">Sayfa: /yurtdisi-kargo</p>
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
              <i className="fas fa-heading text-purple-600"></i>
              Sayfa Başlığı
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ana Başlık (H1)</label>
                <input
                  type="text"
                  value={currentPageHeader.title || ''}
                  onChange={(e) => updatePageHeader({ title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Yurtdışı Kargo Hizmetleri"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Breadcrumb Metni</label>
                <input
                  type="text"
                  value={currentPageHeader.breadcrumb || ''}
                  onChange={(e) => updatePageHeader({ breadcrumb: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Yurtdışı Kargo"
                />
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-list-check text-purple-600"></i>
              Nasıl Çalışır Bölümü
            </h2>
            
            <div className="space-y-6">
              {/* Üst Bilgiler */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rozet (Badge)</label>
                  <input
                    type="text"
                    value={currentHowItWorks.badge || ''}
                    onChange={(e) => updateHowItWorks({ badge: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="SÜREÇ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ana Başlık</label>
                  <input
                    type="text"
                    value={currentHowItWorks.title || ''}
                    onChange={(e) => updateHowItWorks({ title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Yurtdışı Kargo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Vurgulu Başlık (Yeşil)</label>
                  <input
                    type="text"
                    value={currentHowItWorks.titleHighlight || ''}
                    onChange={(e) => updateHowItWorks({ titleHighlight: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nasıl Çalışır?"
                  />
                </div>
              </div>

              {/* Adımlar */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700">Adımlar</label>
                  <button
                    onClick={() => {
                      const newStep = {
                        id: Date.now(),
                        icon: 'fa-star',
                        title: 'Yeni Adım',
                        description: 'Açıklama',
                        color: 'bg-blue-500',
                        image: '',
                        order: currentHowItWorks.steps?.length || 0
                      };
                      updateHowItWorks({ steps: [...(currentHowItWorks.steps || []), newStep] });
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
                  >
                    <i className="fas fa-plus mr-1"></i>
                    Adım Ekle
                  </button>
                </div>
                
                <div className="space-y-4">
                  {(currentHowItWorks.steps || []).map((step: any, index: number) => (
                    <div key={index} className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50 relative">
                      <button
                        onClick={() => {
                          const updated = currentHowItWorks.steps.filter((_: any, i: number) => i !== index);
                          updateHowItWorks({ steps: updated });
                        }}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs z-10"
                      >
                        ×
                      </button>
                      
                      <div className="mb-2 flex items-center gap-2">
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          Adım {index + 1}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">Başlık</label>
                          <input
                            type="text"
                            value={step.title || ''}
                            onChange={(e) => {
                              const updated = [...currentHowItWorks.steps];
                              updated[index] = { ...updated[index], title: e.target.value };
                              updateHowItWorks({ steps: updated });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold"
                            placeholder="Adım başlığı"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">İkon</label>
                            <input
                              type="text"
                              value={step.icon || ''}
                              onChange={(e) => {
                                const updated = [...currentHowItWorks.steps];
                                updated[index] = { ...updated[index], icon: e.target.value };
                                updateHowItWorks({ steps: updated });
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              placeholder="fa-icon"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Renk</label>
                            <select
                              value={step.color || 'bg-blue-500'}
                              onChange={(e) => {
                                const updated = [...currentHowItWorks.steps];
                                updated[index] = { ...updated[index], color: e.target.value };
                                updateHowItWorks({ steps: updated });
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            >
                              <option value="bg-blue-500">Mavi</option>
                              <option value="bg-[#4DB848]">Yeşil</option>
                              <option value="bg-purple-500">Mor</option>
                              <option value="bg-orange-500">Turuncu</option>
                              <option value="bg-red-500">Kırmızı</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Açıklama</label>
                        <textarea
                          value={step.description || ''}
                          onChange={(e) => {
                            const updated = [...currentHowItWorks.steps];
                            updated[index] = { ...updated[index], description: e.target.value };
                            updateHowItWorks({ steps: updated });
                          }}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Adım açıklaması"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-2">Görsel</label>
                        <div className="flex items-center gap-2">
                          <label className="cursor-pointer">
                            <div className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs">
                              <i className="fas fa-upload mr-1"></i>
                              Yükle
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, index)}
                              className="hidden"
                            />
                          </label>
                          <input
                            type="text"
                            value={step.image || ''}
                            onChange={(e) => {
                              const updated = [...currentHowItWorks.steps];
                              updated[index] = { ...updated[index], image: e.target.value };
                              updateHowItWorks({ steps: updated });
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs"
                            placeholder="veya URL girin"
                          />
                        </div>
                        {step.image && (
                          <img src={step.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg border" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Butonlar */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700">Butonlar</label>
                  <button
                    onClick={() => {
                      const newButton = {
                        id: Date.now(),
                        text: 'Yeni Buton',
                        link: '#',
                        style: 'primary',
                        icon: 'fa-arrow-right',
                        order: currentHowItWorks.buttons?.length || 0
                      };
                      updateHowItWorks({ buttons: [...(currentHowItWorks.buttons || []), newButton] });
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
                  >
                    <i className="fas fa-plus mr-1"></i>
                    Buton Ekle
                  </button>
                </div>
                
                <div className="space-y-3">
                  {(currentHowItWorks.buttons || []).map((button: any, index: number) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50 relative">
                      <button
                        onClick={() => {
                          const updated = currentHowItWorks.buttons.filter((_: any, i: number) => i !== index);
                          updateHowItWorks({ buttons: updated });
                        }}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                      >
                        ×
                      </button>
                      <div className="grid grid-cols-4 gap-2">
                        <input
                          type="text"
                          value={button.text || ''}
                          onChange={(e) => {
                            const updated = [...currentHowItWorks.buttons];
                            updated[index] = { ...updated[index], text: e.target.value };
                            updateHowItWorks({ buttons: updated });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Buton metni"
                        />
                        <input
                          type="text"
                          value={button.link || ''}
                          onChange={(e) => {
                            const updated = [...currentHowItWorks.buttons];
                            updated[index] = { ...updated[index], link: e.target.value };
                            updateHowItWorks({ buttons: updated });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="/link"
                        />
                        <input
                          type="text"
                          value={button.icon || ''}
                          onChange={(e) => {
                            const updated = [...currentHowItWorks.buttons];
                            updated[index] = { ...updated[index], icon: e.target.value };
                            updateHowItWorks({ buttons: updated });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="fa-icon"
                        />
                        <select
                          value={button.style || 'primary'}
                          onChange={(e) => {
                            const updated = [...currentHowItWorks.buttons];
                            updated[index] = { ...updated[index], style: e.target.value };
                            updateHowItWorks({ buttons: updated });
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="primary">Primary</option>
                          <option value="secondary">Secondary</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Features - Neden adoreGo? */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-star text-purple-600"></i>
              Neden adoreGo? (Özellikler)
            </h2>
            
            <div className="space-y-6">
              {/* Başlık Bilgileri */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rozet (Badge)</label>
                  <input
                    type="text"
                    value={currentFeaturesHeader.badge || ''}
                    onChange={(e) => updateFeaturesHeader({ badge: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Boş bırakılabilir"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Başlık</label>
                  <input
                    type="text"
                    value={currentFeaturesHeader.title || ''}
                    onChange={(e) => updateFeaturesHeader({ title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Neden adoreGo?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Alt Başlık</label>
                  <input
                    type="text"
                    value={currentFeaturesHeader.subtitle || ''}
                    onChange={(e) => updateFeaturesHeader({ subtitle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Açıklama"
                  />
                </div>
              </div>

              {/* Özellikler */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700">Özellikler</label>
                  <button
                    onClick={() => {
                      const newFeature = {
                        icon: 'fa-star',
                        color: 'bg-gradient-to-br from-blue-500 to-blue-600',
                        title: 'Yeni Özellik',
                        description: 'Açıklama'
                      };
                      updateFeatures([...currentFeatures, newFeature]);
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
                  >
                    <i className="fas fa-plus mr-1"></i>
                    Özellik Ekle
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentFeatures.map((feature: any, index: number) => (
                    <div key={index} className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50 relative">
                      <button
                        onClick={() => {
                          const updated = currentFeatures.filter((_: any, i: number) => i !== index);
                          updateFeatures(updated);
                        }}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs z-10"
                      >
                        ×
                      </button>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">İkon</label>
                          <input
                            type="text"
                            value={feature.icon || ''}
                            onChange={(e) => {
                              const updated = [...currentFeatures];
                              updated[index] = { ...updated[index], icon: e.target.value };
                              updateFeatures(updated);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="fa-rocket"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">Renk (Gradient)</label>
                          <select
                            value={feature.color || 'bg-gradient-to-br from-blue-500 to-blue-600'}
                            onChange={(e) => {
                              const updated = [...currentFeatures];
                              updated[index] = { ...updated[index], color: e.target.value };
                              updateFeatures(updated);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="bg-gradient-to-br from-blue-500 to-blue-600">Mavi</option>
                            <option value="bg-gradient-to-br from-green-500 to-green-600">Yeşil</option>
                            <option value="bg-gradient-to-br from-purple-500 to-purple-600">Mor</option>
                            <option value="bg-gradient-to-br from-orange-500 to-orange-600">Turuncu</option>
                            <option value="bg-gradient-to-br from-red-500 to-red-600">Kırmızı</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Başlık</label>
                        <input
                          type="text"
                          value={feature.title || ''}
                          onChange={(e) => {
                            const updated = [...currentFeatures];
                            updated[index] = { ...updated[index], title: e.target.value };
                            updateFeatures(updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg font-semibold"
                          placeholder="Özellik başlığı"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Açıklama</label>
                        <textarea
                          value={feature.description || ''}
                          onChange={(e) => {
                            const updated = [...currentFeatures];
                            updated[index] = { ...updated[index], description: e.target.value };
                            updateFeatures(updated);
                          }}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Özellik açıklaması"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-bullhorn text-purple-600"></i>
              CTA Banner (Yurtdışına Açılmanın En Kolay Yolu)
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Başlık</label>
                <input
                  type="text"
                  value={currentCta.title || ''}
                  onChange={(e) => updateCta({ title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Yurtdışına Açılmanın En Kolay Yolu."
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Alt Başlık</label>
                <textarea
                  value={currentCta.subtitle || ''}
                  onChange={(e) => updateCta({ subtitle: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Hemen kayıt olun, ilk gönderinizde adoreGo farkını yaşayın."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Buton Metni</label>
                  <input
                    type="text"
                    value={currentCta.buttonText || ''}
                    onChange={(e) => updateCta({ buttonText: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ÜCRETSİZ KAYIT"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Buton Linki</label>
                  <input
                    type="text"
                    value={currentCta.buttonLink || ''}
                    onChange={(e) => updateCta({ buttonLink: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#"
                  />
                </div>
              </div>
              
              <p className="text-xs text-gray-500">
                <i className="fas fa-info-circle mr-1"></i>
                Not: Arka plan görseli sabit olarak ayarlanmıştır ve değiştirilemez.
              </p>
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

export default PageInternational;
