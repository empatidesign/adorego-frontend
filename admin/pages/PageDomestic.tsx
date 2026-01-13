import React, { useState, useEffect } from 'react';
import NewLayout from '../components/NewLayout';
import SEOForm from '../components/SEOForm';
import { contentAPI } from '../services/api';

type Language = 'tr' | 'en';

const PageDomestic: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [solutionsTR, setSolutionsTR] = useState<any>({});
  const [solutionsEN, setSolutionsEN] = useState<any>({});
  const [targetAudienceTR, setTargetAudienceTR] = useState<any>({});
  const [targetAudienceEN, setTargetAudienceEN] = useState<any>({});
  const [pageHeaderTR, setPageHeaderTR] = useState<any>({ title: 'Yurtiçi Kargo Hizmetleri', breadcrumb: 'Yurtiçi Kargo' });
  const [pageHeaderEN, setPageHeaderEN] = useState<any>({ title: 'Domestic Shipping Services', breadcrumb: 'Domestic Shipping' });

  // SEO states
  const [seoTR, setSeoTR] = useState<any>({
    title: 'Yurtiçi Kargo | adoreGo',
    description: 'Yurtiçi kargo hizmetleri. Ekonomik ve hızlı kargo gönderimi.',
    keywords: 'yurtiçi kargo, kargo gönderimi, domestic shipping, cargo',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  });
  const [seoEN, setSeoEN] = useState<any>({
    title: 'Domestic Shipping | adoreGo',
    description: 'Domestic shipping services. Affordable and fast cargo delivery.',
    keywords: 'domestic shipping, cargo delivery, shipping services',
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
      const [solTR, solEN, targetTR, targetEN, pageTR, pageEN] = await Promise.all([
        contentAPI.getSolutions('tr'),
        contentAPI.getSolutions('en'),
        contentAPI.getTargetAudience('tr'),
        contentAPI.getTargetAudience('en'),
        contentAPI.getContentPage('yurtici-kargo', 'tr'),
        contentAPI.getContentPage('yurtici-kargo', 'en'),
      ]);

      setSolutionsTR(solTR || {});
      setSolutionsEN(solEN || {});
      setTargetAudienceTR(targetTR || {});
      setTargetAudienceEN(targetEN || {});

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
        contentAPI.updateSolutions(solutionsTR, 'tr'),
        contentAPI.updateSolutions(solutionsEN, 'en'),
        contentAPI.updateTargetAudience(targetAudienceTR, 'tr'),
        contentAPI.updateTargetAudience(targetAudienceEN, 'en'),
        contentAPI.updateContentPage('yurtici-kargo', { header: pageHeaderTR, seo: seoTR }, 'tr'),
        contentAPI.updateContentPage('yurtici-kargo', { header: pageHeaderEN, seo: seoEN }, 'en'),
      ]);

      setMessage({ type: 'success', text: 'Yurtiçi kargo sayfası başarıyla kaydedildi!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      setMessage({ type: 'error', text: 'Kaydetme sırasında hata oluştu!' });
    } finally {
      setSaving(false);
    }
  };

  const currentSolutions = currentLang === 'tr' ? solutionsTR : solutionsEN;
  const currentTargetAudience = currentLang === 'tr' ? targetAudienceTR : targetAudienceEN;
  const currentPageHeader = currentLang === 'tr' ? pageHeaderTR : pageHeaderEN;
  const currentSeo = currentLang === 'tr' ? seoTR : seoEN;

  const updateSolutions = (updates: any) => {
    if (currentLang === 'tr') {
      setSolutionsTR({ ...solutionsTR, ...updates });
    } else {
      setSolutionsEN({ ...solutionsEN, ...updates });
    }
  };

  const updateSeo = (updates: any) => {
    if (currentLang === 'tr') {
      setSeoTR({ ...seoTR, ...updates });
    } else {
      setSeoEN({ ...seoEN, ...updates });
    }
  };

  const updateTargetAudience = (updates: any) => {
    if (currentLang === 'tr') {
      setTargetAudienceTR({ ...targetAudienceTR, ...updates });
    } else {
      setTargetAudienceEN({ ...targetAudienceEN, ...updates });
    }
  };

  const updatePageHeader = (updates: any) => {
    if (currentLang === 'tr') {
      setPageHeaderTR({ ...pageHeaderTR, ...updates });
    } else {
      setPageHeaderEN({ ...pageHeaderEN, ...updates });
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Yurtiçi Kargo Sayfası</h1>
            <p className="text-gray-600">Sayfa: /yurtici-kargo</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentLang('tr')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${currentLang === 'tr' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
            >
              🇹🇷 Türkçe
            </button>
            <button
              onClick={() => setCurrentLang('en')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${currentLang === 'en' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {/* Save Button - Top */}
        <div className="mb-6 flex justify-end">
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

        {/* Toast Notification */}
        {message && (
          <div className={`fixed top-20 right-6 z-50 p-4 rounded-lg shadow-2xl border-2 animate-slide-in-right ${message.type === 'success'
              ? 'bg-green-50 text-green-800 border-green-500'
              : 'bg-red-50 text-red-800 border-red-500'
            }`}>
            <div className="flex items-center gap-3">
              <i className={`fas ${message.type === 'success' ? 'fa-check-circle text-green-600' : 'fa-exclamation-circle text-red-600'
                } text-2xl`}></i>
              <div>
                <p className="font-bold">{message.type === 'success' ? 'Başarılı!' : 'Hata!'}</p>
                <p className="text-sm">{message.text}</p>
              </div>
              <button
                onClick={() => setMessage(null)}
                className="ml-4 text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${activeTab === 'content'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              <i className="fas fa-file-alt mr-2"></i>
              İçerik Yönetimi
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${activeTab === 'seo'
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
                <i className="fas fa-heading text-green-600"></i>
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
                    placeholder="Yurtiçi Kargo Hizmetleri"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Breadcrumb Metni</label>
                  <input
                    type="text"
                    value={currentPageHeader.breadcrumb || ''}
                    onChange={(e) => updatePageHeader({ breadcrumb: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Yurtiçi Kargo"
                  />
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-shipping-fast text-green-600"></i>
                Akıllı Gönderim Çözümleri
              </h2>

              <div className="space-y-6">
                {/* Üst Bilgiler */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rozet (Badge)</label>
                    <input
                      type="text"
                      value={currentSolutions.badge || ''}
                      onChange={(e) => updateSolutions({ badge: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ÖZEL ÇÖZÜMLER"
                    />
                    <label className="block text-xs font-semibold text-gray-600 mt-2 mb-1">Rozet Rengi</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={currentSolutions.badgeColor || '#4DB848'}
                        onChange={(e) => updateSolutions({ badgeColor: e.target.value })}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={currentSolutions.badgeColor || '#4DB848'}
                        onChange={(e) => updateSolutions({ badgeColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                        placeholder="#4DB848"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Başlık</label>
                    <input
                      type="text"
                      value={currentSolutions.title || ''}
                      onChange={(e) => updateSolutions({ title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="İhtiyacına Göre"
                    />
                    <label className="block text-xs font-semibold text-gray-600 mt-2 mb-1">Başlık Rengi</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={currentSolutions.titleColor || '#102477'}
                        onChange={(e) => updateSolutions({ titleColor: e.target.value })}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={currentSolutions.titleColor || '#102477'}
                        onChange={(e) => updateSolutions({ titleColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                        placeholder="#102477"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Vurgulu Başlık</label>
                    <input
                      type="text"
                      value={currentSolutions.highlightedTitle || ''}
                      onChange={(e) => updateSolutions({ highlightedTitle: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Akıllı Gönderim."
                    />
                    <label className="block text-xs font-semibold text-gray-600 mt-2 mb-1">Vurgulu Başlık Rengi</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={currentSolutions.highlightedTitleColor || '#4DB848'}
                        onChange={(e) => updateSolutions({ highlightedTitleColor: e.target.value })}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={currentSolutions.highlightedTitleColor || '#4DB848'}
                        onChange={(e) => updateSolutions({ highlightedTitleColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                        placeholder="#4DB848"
                      />
                    </div>
                  </div>
                </div>

                {/* Kart Bilgileri */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">Kart Başlığı ve Açıklaması</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Kart Başlığı</label>
                      <input
                        type="text"
                        value={currentSolutions.cardTitle || ''}
                        onChange={(e) => updateSolutions({ cardTitle: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Hangi Gönderim Bana Uygun?"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Kart Açıklaması</label>
                      <textarea
                        value={currentSolutions.cardDescription || ''}
                        onChange={(e) => updateSolutions({ cardDescription: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Kararsızsan sorun değil..."
                      />
                    </div>
                  </div>
                </div>

                {/* Servisler */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-gray-700">Servisler</label>
                    <button
                      onClick={() => {
                        const newService = {
                          id: Date.now().toString(),
                          title: 'Yeni Servis',
                          desc: 'Açıklama',
                          icon: 'fa-box',
                          color: 'bg-blue-500',
                          bgColor: 'bg-blue-50',
                          order: currentSolutions.services?.length || 0
                        };
                        updateSolutions({ services: [...(currentSolutions.services || []), newService] });
                      }}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
                    >
                      <i className="fas fa-plus mr-1"></i>
                      Servis Ekle
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(currentSolutions.services || []).map((service: any, index: number) => (
                      <div key={index} className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50 relative">
                        <button
                          onClick={() => {
                            const updated = currentSolutions.services.filter((_: any, i: number) => i !== index);
                            updateSolutions({ services: updated });
                          }}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs z-10"
                        >
                          ×
                        </button>

                        <div className="mb-2">
                          <label className="block text-xs font-semibold text-gray-600 mb-1">Başlık</label>
                          <input
                            type="text"
                            value={service.title || ''}
                            onChange={(e) => {
                              const updated = [...currentSolutions.services];
                              updated[index] = { ...updated[index], title: e.target.value };
                              updateSolutions({ services: updated });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold"
                            placeholder="Servis başlığı"
                          />
                        </div>

                        <div className="mb-2">
                          <label className="block text-xs font-semibold text-gray-600 mb-1">Açıklama</label>
                          <textarea
                            value={service.desc || ''}
                            onChange={(e) => {
                              const updated = [...currentSolutions.services];
                              updated[index] = { ...updated[index], desc: e.target.value };
                              updateSolutions({ services: updated });
                            }}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Servis açıklaması"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">İkon</label>
                            <input
                              type="text"
                              value={service.icon || ''}
                              onChange={(e) => {
                                const updated = [...currentSolutions.services];
                                updated[index] = { ...updated[index], icon: e.target.value };
                                updateSolutions({ services: updated });
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              placeholder="fa-box"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Renk</label>
                            <select
                              value={service.color || 'bg-blue-500'}
                              onChange={(e) => {
                                const updated = [...currentSolutions.services];
                                updated[index] = { ...updated[index], color: e.target.value };
                                updateSolutions({ services: updated });
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            >
                              <option value="bg-blue-500">Mavi</option>
                              <option value="bg-green-500">Yeşil</option>
                              <option value="bg-purple-500">Mor</option>
                              <option value="bg-orange-500">Turuncu</option>
                              <option value="bg-yellow-500">Sarı</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gönderim Seçenekleri */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-gray-700">Gönderim Seçenekleri</label>
                    <button
                      onClick={() => {
                        const newOption = {
                          id: Date.now().toString(),
                          title: 'Yeni Seçenek',
                          subtitle: 'Alt başlık',
                          icon: 'fa-box',
                          color: 'bg-blue-500',
                          description: 'Açıklama',
                          features: ['Özellik 1', 'Özellik 2'],
                          order: currentSolutions.shippingOptions?.length || 0
                        };
                        updateSolutions({ shippingOptions: [...(currentSolutions.shippingOptions || []), newOption] });
                      }}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
                    >
                      <i className="fas fa-plus mr-1"></i>
                      Seçenek Ekle
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(currentSolutions.shippingOptions || []).map((option: any, index: number) => (
                      <div key={index} className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50 relative">
                        <button
                          onClick={() => {
                            const updated = currentSolutions.shippingOptions.filter((_: any, i: number) => i !== index);
                            updateSolutions({ shippingOptions: updated });
                          }}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs z-10"
                        >
                          ×
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Başlık</label>
                            <input
                              type="text"
                              value={option.title || ''}
                              onChange={(e) => {
                                const updated = [...currentSolutions.shippingOptions];
                                updated[index] = { ...updated[index], title: e.target.value };
                                updateSolutions({ shippingOptions: updated });
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold"
                              placeholder="Ekonomik Kargo"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Alt Başlık</label>
                            <input
                              type="text"
                              value={option.subtitle || ''}
                              onChange={(e) => {
                                const updated = [...currentSolutions.shippingOptions];
                                updated[index] = { ...updated[index], subtitle: e.target.value };
                                updateSolutions({ shippingOptions: updated });
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              placeholder="Fiyat Öncelikliyse"
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="block text-xs font-semibold text-gray-600 mb-1">Açıklama</label>
                          <textarea
                            value={option.description || ''}
                            onChange={(e) => {
                              const updated = [...currentSolutions.shippingOptions];
                              updated[index] = { ...updated[index], description: e.target.value };
                              updateSolutions({ shippingOptions: updated });
                            }}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Detaylı açıklama"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">İkon</label>
                            <input
                              type="text"
                              value={option.icon || ''}
                              onChange={(e) => {
                                const updated = [...currentSolutions.shippingOptions];
                                updated[index] = { ...updated[index], icon: e.target.value };
                                updateSolutions({ shippingOptions: updated });
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              placeholder="fa-coins"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Renk</label>
                            <select
                              value={option.color || 'bg-green-500'}
                              onChange={(e) => {
                                const updated = [...currentSolutions.shippingOptions];
                                updated[index] = { ...updated[index], color: e.target.value };
                                updateSolutions({ shippingOptions: updated });
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            >
                              <option value="bg-green-500">Yeşil</option>
                              <option value="bg-yellow-500">Sarı</option>
                              <option value="bg-blue-500">Mavi</option>
                              <option value="bg-purple-500">Mor</option>
                              <option value="bg-orange-500">Turuncu</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Target Audience - Gönderdiğe Kazan */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-gift text-green-600"></i>
                Gönderdiğe Kazan
              </h2>

              <div className="space-y-6">
                {/* Earn Section - Üst Bilgiler */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">Ana Bölüm</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Rozet (Badge)</label>
                      <input
                        type="text"
                        value={currentTargetAudience.earnSection?.badge || ''}
                        onChange={(e) => updateTargetAudience({
                          earnSection: { ...currentTargetAudience.earnSection, badge: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="GÖNDERDİKÇE KAZAN"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Başlık</label>
                      <input
                        type="text"
                        value={currentTargetAudience.earnSection?.title || ''}
                        onChange={(e) => updateTargetAudience({
                          earnSection: { ...currentTargetAudience.earnSection, title: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Yurtdışı Gönder"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Vurgulu Başlık</label>
                      <input
                        type="text"
                        value={currentTargetAudience.earnSection?.highlightedTitle || ''}
                        onChange={(e) => updateTargetAudience({
                          earnSection: { ...currentTargetAudience.earnSection, highlightedTitle: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Yurtiçi Ucuzlasın."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Açıklama</label>
                    <textarea
                      value={currentTargetAudience.earnSection?.description || ''}
                      onChange={(e) => updateTargetAudience({
                        earnSection: { ...currentTargetAudience.earnSection, description: e.target.value }
                      })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Yurtdışı gönderi yaptığınızda..."
                    />
                  </div>
                </div>

                {/* Faydalar */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">Faydalar</h3>
                  <div className="space-y-2">
                    {(currentTargetAudience.earnSection?.benefits || []).map((benefit: any, index: number) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={benefit.number || `0${index + 1}`}
                          onChange={(e) => {
                            const updated = [...(currentTargetAudience.earnSection?.benefits || [])];
                            updated[index] = { ...updated[index], number: e.target.value };
                            updateTargetAudience({
                              earnSection: { ...currentTargetAudience.earnSection, benefits: updated }
                            });
                          }}
                          className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="01"
                        />
                        <input
                          type="text"
                          value={benefit.text || ''}
                          onChange={(e) => {
                            const updated = [...(currentTargetAudience.earnSection?.benefits || [])];
                            updated[index] = { ...updated[index], text: e.target.value };
                            updateTargetAudience({
                              earnSection: { ...currentTargetAudience.earnSection, benefits: updated }
                            });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Fayda metni"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kart Bilgileri */}
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">Kart Bilgileri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Üst Rozet</label>
                      <input
                        type="text"
                        value={currentTargetAudience.earnSection?.card?.topBadge || ''}
                        onChange={(e) => updateTargetAudience({
                          earnSection: {
                            ...currentTargetAudience.earnSection,
                            card: { ...currentTargetAudience.earnSection?.card, topBadge: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="AKILLI FİYATLANDIRMA"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Durum Rozeti</label>
                      <input
                        type="text"
                        value={currentTargetAudience.earnSection?.card?.statusBadge || ''}
                        onChange={(e) => updateTargetAudience({
                          earnSection: {
                            ...currentTargetAudience.earnSection,
                            card: { ...currentTargetAudience.earnSection?.card, statusBadge: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="AKTİF"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Başlangıç Etiketi</label>
                      <input
                        type="text"
                        value={currentTargetAudience.earnSection?.card?.fromLabel || ''}
                        onChange={(e) => updateTargetAudience({
                          earnSection: {
                            ...currentTargetAudience.earnSection,
                            card: { ...currentTargetAudience.earnSection?.card, fromLabel: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Standart"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Bitiş Etiketi</label>
                      <input
                        type="text"
                        value={currentTargetAudience.earnSection?.card?.toLabel || ''}
                        onChange={(e) => updateTargetAudience({
                          earnSection: {
                            ...currentTargetAudience.earnSection,
                            card: { ...currentTargetAudience.earnSection?.card, toLabel: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Avantajlı Plus"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">İndirim Oranı</label>
                      <input
                        type="text"
                        value={currentTargetAudience.earnSection?.card?.discount || ''}
                        onChange={(e) => updateTargetAudience({
                          earnSection: {
                            ...currentTargetAudience.earnSection,
                            card: { ...currentTargetAudience.earnSection?.card, discount: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="-%40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">İndirim Etiketi</label>
                      <input
                        type="text"
                        value={currentTargetAudience.earnSection?.card?.discountLabel || ''}
                        onChange={(e) => updateTargetAudience({
                          earnSection: {
                            ...currentTargetAudience.earnSection,
                            card: { ...currentTargetAudience.earnSection?.card, discountLabel: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="YURTİÇİ KARGO İNDİRİMİ"
                      />
                    </div>
                  </div>
                </div>

                {/* Güven Bölümü */}
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">Neden Güvenmelisiniz?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Başlık</label>
                      <input
                        type="text"
                        value={currentTargetAudience.trustSection?.title || ''}
                        onChange={(e) => updateTargetAudience({
                          trustSection: { ...currentTargetAudience.trustSection, title: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Neden bize"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Vurgulu Başlık</label>
                      <input
                        type="text"
                        value={currentTargetAudience.trustSection?.highlightedTitle || ''}
                        onChange={(e) => updateTargetAudience({
                          trustSection: { ...currentTargetAudience.trustSection, highlightedTitle: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Güvenmelisiniz?"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-semibold text-gray-700">Güven Noktaları</label>
                    <button
                      onClick={() => {
                        const newPoint = { title: 'Yeni Nokta', desc: 'Açıklama', icon: 'fa-star', color: 'bg-blue-500' };
                        const updatedPoints = [...(currentTargetAudience.trustSection?.points || []), newPoint];
                        updateTargetAudience({
                          trustSection: { ...currentTargetAudience.trustSection, points: updatedPoints }
                        });
                      }}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
                    >
                      <i className="fas fa-plus mr-1"></i>
                      Nokta Ekle
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(currentTargetAudience.trustSection?.points || []).map((point: any, index: number) => (
                      <div key={index} className="p-3 bg-white rounded-lg border border-gray-200 relative">
                        <button
                          onClick={() => {
                            const updated = currentTargetAudience.trustSection?.points.filter((_: any, i: number) => i !== index);
                            updateTargetAudience({
                              trustSection: { ...currentTargetAudience.trustSection, points: updated }
                            });
                          }}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs z-10"
                        >
                          ×
                        </button>
                        <div className="grid grid-cols-1 gap-2 pr-8">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-semibold text-gray-600 mb-1">İkon</label>
                              <input
                                type="text"
                                value={point.icon || ''}
                                onChange={(e) => {
                                  const updated = [...(currentTargetAudience.trustSection?.points || [])];
                                  updated[index] = { ...updated[index], icon: e.target.value };
                                  updateTargetAudience({
                                    trustSection: { ...currentTargetAudience.trustSection, points: updated }
                                  });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                placeholder="fa-award"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-gray-600 mb-1">Renk</label>
                              <select
                                value={point.color || 'bg-blue-500'}
                                onChange={(e) => {
                                  const updated = [...(currentTargetAudience.trustSection?.points || [])];
                                  updated[index] = { ...updated[index], color: e.target.value };
                                  updateTargetAudience({
                                    trustSection: { ...currentTargetAudience.trustSection, points: updated }
                                  });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              >
                                <option value="bg-blue-500">Mavi</option>
                                <option value="bg-green-500">Yeşil</option>
                                <option value="bg-purple-500">Mor</option>
                                <option value="bg-orange-500">Turuncu</option>
                                <option value="bg-red-500">Kırmızı</option>
                                <option value="bg-yellow-500">Sarı</option>
                              </select>
                            </div>
                          </div>
                          <input
                            type="text"
                            value={point.title || ''}
                            onChange={(e) => {
                              const updated = [...(currentTargetAudience.trustSection?.points || [])];
                              updated[index] = { ...updated[index], title: e.target.value };
                              updateTargetAudience({
                                trustSection: { ...currentTargetAudience.trustSection, points: updated }
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold"
                            placeholder="Nokta başlığı"
                          />
                          <input
                            type="text"
                            value={point.desc || ''}
                            onChange={(e) => {
                              const updated = [...(currentTargetAudience.trustSection?.points || [])];
                              updated[index] = { ...updated[index], desc: e.target.value };
                              updateTargetAudience({
                                trustSection: { ...currentTargetAudience.trustSection, points: updated }
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Nokta açıklaması"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button - Bottom */}
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

export default PageDomestic;
