import React, { useState, useEffect } from 'react';
import NewLayout from '../components/NewLayout';
import { contentAPI } from '../services/api';

type Language = 'tr' | 'en';

const PageHeaderFooter: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Header (Navbar) states
  const [navbarTR, setNavbarTR] = useState<any>({ menuItems: [], ctaButtons: [] });
  const [navbarEN, setNavbarEN] = useState<any>({ menuItems: [], ctaButtons: [] });

  // Footer states
  const [footerTR, setFooterTR] = useState<any>({ cta: {}, bottomSection: {}, sections: [] });
  const [footerEN, setFooterEN] = useState<any>({ cta: {}, bottomSection: {}, sections: [] });

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

      setNavbarTR(navTR || { menuItems: [], ctaButtons: [] });
      setNavbarEN(navEN || { menuItems: [], ctaButtons: [] });
      setFooterTR(footTR || { cta: {}, bottomSection: {}, sections: [] });
      setFooterEN(footEN || { cta: {}, bottomSection: {}, sections: [] });
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

      setMessage({ type: 'success', text: 'Header ve Footer başarıyla kaydedildi!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      setMessage({ type: 'error', text: 'Kaydetme sırasında hata oluştu!' });
    } finally {
      setSaving(false);
    }
  };

  const currentNavbar = currentLang === 'tr' ? navbarTR : navbarEN;
  const currentFooter = currentLang === 'tr' ? footerTR : footerEN;

  const updateNavbar = (updates: any) => {
    if (currentLang === 'tr') {
      setNavbarTR({ ...navbarTR, ...updates });
    } else {
      setNavbarEN({ ...navbarEN, ...updates });
    }
  };

  const updateFooter = (updates: any) => {
    if (currentLang === 'tr') {
      setFooterTR({ ...footerTR, ...updates });
    } else {
      setFooterEN({ ...footerEN, ...updates });
    }
  };

  const handleHeaderLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        updateNavbar({ logo: fullUrl });
        setMessage({ type: 'success', text: 'Header logosu başarıyla yüklendi!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error('Logo yüklenemedi');
      }
    } catch (error) {
      console.error('Logo yükleme hatası:', error);
      setMessage({ type: 'error', text: 'Logo yüklenirken hata oluştu!' });
    } finally {
      setUploading(false);
    }
  };

  const handleFooterLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        updateFooter({ bottomSection: { ...currentFooter.bottomSection, logoUrl: fullUrl } });
        setMessage({ type: 'success', text: 'Footer logosu başarıyla yüklendi!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error('Logo yüklenemedi');
      }
    } catch (error) {
      console.error('Logo yükleme hatası:', error);
      setMessage({ type: 'error', text: 'Logo yüklenirken hata oluştu!' });
    } finally {
      setUploading(false);
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Header & Footer Yönetimi</h1>
            <p className="text-gray-600">Tüm sayfalarda görünen header ve footer içeriklerini yönetin</p>
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

        <div className="space-y-6">
          {/* HEADER - Logo & Menu */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <i className="fas fa-bars text-blue-600"></i>
              Header - Logo ve Menü
            </h2>
            
            {/* Logo URL */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Header Logo</label>
              <div className="flex items-center gap-2 mb-2">
                <label className="cursor-pointer">
                  <div className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2">
                    <i className="fas fa-upload"></i>
                    Logo Yükle
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHeaderLogoUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                <input
                  type="text"
                  value={currentNavbar.logo || ''}
                  onChange={(e) => updateNavbar({ logo: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="veya URL girin (boş bırakılırsa default logo gösterilir)"
                />
              </div>
              {currentNavbar.logo && (
                <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">Önizleme:</p>
                  <img src={currentNavbar.logo} alt="Header Logo" className="h-12 object-contain" />
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold text-gray-700">Menü Sekmeleri ({(currentNavbar.menuItems || []).length})</label>
              <button
                onClick={() => {
                  const newItem = {
                    id: Date.now().toString(),
                    label: 'Yeni Menü',
                    link: '#',
                    type: 'link',
                    order: currentNavbar.menuItems?.length || 0
                  };
                  updateNavbar({ menuItems: [...(currentNavbar.menuItems || []), newItem] });
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                <i className="fas fa-plus mr-2"></i>
                Sekme Ekle
              </button>
            </div>

            <div className="space-y-3">
              {(currentNavbar.menuItems || []).map((item: any, index: number) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                  <button
                    onClick={() => {
                      const updated = currentNavbar.menuItems.filter((_: any, i: number) => i !== index);
                      updateNavbar({ menuItems: updated });
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                  >
                    ×
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3 pr-8">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Sekme Adı</label>
                      <input
                        type="text"
                        value={item.label || ''}
                        onChange={(e) => {
                          const updated = [...currentNavbar.menuItems];
                          updated[index] = { ...updated[index], label: e.target.value };
                          updateNavbar({ menuItems: updated });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold"
                        placeholder="Yurtdışı Kargo"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Link</label>
                      <input
                        type="text"
                        value={item.link || ''}
                        onChange={(e) => {
                          const updated = [...currentNavbar.menuItems];
                          updated[index] = { ...updated[index], link: e.target.value };
                          updateNavbar({ menuItems: updated });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="/yurtdisi-kargo"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER - CTA Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-bullhorn text-purple-600"></i>
              Footer - CTA Bölümü
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Başlık</label>
                  <input
                    type="text"
                    value={currentFooter.cta?.title || ''}
                    onChange={(e) => updateFooter({ cta: { ...currentFooter.cta, title: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Sorun mu var? Kararsız mı kaldın?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Alt Başlık</label>
                  <input
                    type="text"
                    value={currentFooter.cta?.subtitle || ''}
                    onChange={(e) => updateFooter({ cta: { ...currentFooter.cta, subtitle: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Destek ekibimiz..."
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Buton 1 Metni</label>
                  <input
                    type="text"
                    value={currentFooter.cta?.button1Text || ''}
                    onChange={(e) => updateFooter({ cta: { ...currentFooter.cta, button1Text: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="İletişime Geç"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Buton 1 Link</label>
                  <input
                    type="text"
                    value={currentFooter.cta?.button1Link || ''}
                    onChange={(e) => updateFooter({ cta: { ...currentFooter.cta, button1Link: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="/iletisim"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Buton 2 Metni</label>
                  <input
                    type="text"
                    value={currentFooter.cta?.button2Text || ''}
                    onChange={(e) => updateFooter({ cta: { ...currentFooter.cta, button2Text: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Ücretsiz Kayıt Ol"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Buton 2 Link</label>
                  <input
                    type="text"
                    value={currentFooter.cta?.button2Link || ''}
                    onChange={(e) => updateFooter({ cta: { ...currentFooter.cta, button2Link: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="/kayit"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER - Bottom Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-info-circle text-purple-600"></i>
              Footer - Alt Bölüm
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Footer Logo</label>
                <div className="flex items-center gap-2 mb-2">
                  <label className="cursor-pointer">
                    <div className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm flex items-center gap-2">
                      <i className="fas fa-upload"></i>
                      Logo Yükle
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFooterLogoUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  <input
                    type="text"
                    value={currentFooter.bottomSection?.logoUrl || ''}
                    onChange={(e) => updateFooter({ bottomSection: { ...currentFooter.bottomSection, logoUrl: e.target.value } })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="veya URL girin (boş bırakılırsa default logo gösterilir)"
                  />
                </div>
                {currentFooter.bottomSection?.logoUrl && (
                  <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">Önizleme:</p>
                    <img src={currentFooter.bottomSection.logoUrl} alt="Footer Logo" className="h-12 object-contain" />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Slogan</label>
                <input
                  type="text"
                  value={currentFooter.bottomSection?.tagline || ''}
                  onChange={(e) => updateFooter({ bottomSection: { ...currentFooter.bottomSection, tagline: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Yeni Nesil Akıllı Lojistik..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Kurumsal Bağlantılar Başlığı</label>
                <input
                  type="text"
                  value={currentFooter.bottomSection?.corporateTitle || ''}
                  onChange={(e) => updateFooter({ bottomSection: { ...currentFooter.bottomSection, corporateTitle: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Kurumsal Bağlantılar"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Copyright Metni</label>
                <textarea
                  value={currentFooter.bottomSection?.copyrightText || ''}
                  onChange={(e) => updateFooter({ bottomSection: { ...currentFooter.bottomSection, copyrightText: e.target.value } })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="© 2024 adoreGo..."
                />
              </div>

              {/* Social Links */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700">Sosyal Medya Linkleri</label>
                  <button
                    onClick={() => {
                      const newLink = { platform: 'instagram', url: '#', icon: 'fa-instagram' };
                      updateFooter({ 
                        bottomSection: { 
                          ...currentFooter.bottomSection, 
                          socialLinks: [...(currentFooter.bottomSection?.socialLinks || []), newLink] 
                        } 
                      });
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
                  >
                    <i className="fas fa-plus mr-1"></i>
                    Link Ekle
                  </button>
                </div>
                
                <div className="space-y-2">
                  {(currentFooter.bottomSection?.socialLinks || []).map((social: any, index: number) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={social.platform || ''}
                        onChange={(e) => {
                          const updated = [...(currentFooter.bottomSection?.socialLinks || [])];
                          updated[index] = { ...updated[index], platform: e.target.value };
                          updateFooter({ bottomSection: { ...currentFooter.bottomSection, socialLinks: updated } });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="instagram"
                      />
                      <input
                        type="text"
                        value={social.icon || ''}
                        onChange={(e) => {
                          const updated = [...(currentFooter.bottomSection?.socialLinks || [])];
                          updated[index] = { ...updated[index], icon: e.target.value };
                          updateFooter({ bottomSection: { ...currentFooter.bottomSection, socialLinks: updated } });
                        }}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="fa-instagram"
                      />
                      <input
                        type="text"
                        value={social.url || ''}
                        onChange={(e) => {
                          const updated = [...(currentFooter.bottomSection?.socialLinks || [])];
                          updated[index] = { ...updated[index], url: e.target.value };
                          updateFooter({ bottomSection: { ...currentFooter.bottomSection, socialLinks: updated } });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="https://..."
                      />
                      <button
                        onClick={() => {
                          const updated = currentFooter.bottomSection?.socialLinks.filter((_: any, i: number) => i !== index);
                          updateFooter({ bottomSection: { ...currentFooter.bottomSection, socialLinks: updated } });
                        }}
                        className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corporate Links */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700">Kurumsal Linkler</label>
                  <button
                    onClick={() => {
                      const newLink = { name: 'Yeni Link', url: '#' };
                      updateFooter({ 
                        bottomSection: { 
                          ...currentFooter.bottomSection, 
                          corporateLinks: [...(currentFooter.bottomSection?.corporateLinks || []), newLink] 
                        } 
                      });
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
                  >
                    <i className="fas fa-plus mr-1"></i>
                    Link Ekle
                  </button>
                </div>
                
                <div className="space-y-2">
                  {(currentFooter.bottomSection?.corporateLinks || []).map((link: any, index: number) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={link.name || ''}
                        onChange={(e) => {
                          const updated = [...(currentFooter.bottomSection?.corporateLinks || [])];
                          updated[index] = { ...updated[index], name: e.target.value };
                          updateFooter({ bottomSection: { ...currentFooter.bottomSection, corporateLinks: updated } });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="Hakkımızda"
                      />
                      <input
                        type="text"
                        value={link.url || ''}
                        onChange={(e) => {
                          const updated = [...(currentFooter.bottomSection?.corporateLinks || [])];
                          updated[index] = { ...updated[index], url: e.target.value };
                          updateFooter({ bottomSection: { ...currentFooter.bottomSection, corporateLinks: updated } });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="/hakkimizda"
                      />
                      <button
                        onClick={() => {
                          const updated = currentFooter.bottomSection?.corporateLinks.filter((_: any, i: number) => i !== index);
                          updateFooter({ bottomSection: { ...currentFooter.bottomSection, corporateLinks: updated } });
                        }}
                        className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER - Menu Sections */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-list text-purple-600"></i>
              Footer - Menü Bölümleri
            </h2>
            
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">Bölüm sayısı: {(currentFooter.sections || []).length}</p>
              <button
                onClick={() => {
                  const newSection = {
                    title: 'Yeni Bölüm',
                    links: []
                  };
                  updateFooter({ sections: [...(currentFooter.sections || []), newSection] });
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                <i className="fas fa-plus mr-2"></i>
                Bölüm Ekle
              </button>
            </div>

            <div className="space-y-6">
              {(currentFooter.sections || []).map((section: any, sectionIndex: number) => (
                <div key={sectionIndex} className="p-5 border-2 border-gray-200 rounded-lg bg-gray-50 relative">
                  <button
                    onClick={() => {
                      const updated = currentFooter.sections.filter((_: any, i: number) => i !== sectionIndex);
                      updateFooter({ sections: updated });
                    }}
                    className="absolute top-3 right-3 w-7 h-7 bg-red-500 text-white rounded-full hover:bg-red-600 text-sm z-10"
                  >
                    ×
                  </button>
                  
                  <div className="mb-4 pr-10">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bölüm Başlığı</label>
                    <input
                      type="text"
                      value={section.title || ''}
                      onChange={(e) => {
                        const updated = [...currentFooter.sections];
                        updated[sectionIndex] = { ...updated[sectionIndex], title: e.target.value };
                        updateFooter({ sections: updated });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-semibold"
                      placeholder="1-Hizmetlerimiz"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-semibold text-gray-700">Linkler ({(section.links || []).length})</label>
                      <button
                        onClick={() => {
                          const updated = [...currentFooter.sections];
                          updated[sectionIndex] = {
                            ...updated[sectionIndex],
                            links: [...(updated[sectionIndex].links || []), { n: 'Yeni Link', h: '#' }]
                          };
                          updateFooter({ sections: updated });
                        }}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs"
                      >
                        <i className="fas fa-plus mr-1"></i>
                        Link Ekle
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {(section.links || []).map((link: any, linkIndex: number) => (
                        <div key={linkIndex} className="flex gap-2 items-center bg-white p-2 rounded-lg">
                          <input
                            type="text"
                            value={link.n || ''}
                            onChange={(e) => {
                              const updated = [...currentFooter.sections];
                              const updatedLinks = [...updated[sectionIndex].links];
                              updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], n: e.target.value };
                              updated[sectionIndex] = { ...updated[sectionIndex], links: updatedLinks };
                              updateFooter({ sections: updated });
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="Link adı"
                          />
                          <input
                            type="text"
                            value={link.h || ''}
                            onChange={(e) => {
                              const updated = [...currentFooter.sections];
                              const updatedLinks = [...updated[sectionIndex].links];
                              updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], h: e.target.value };
                              updated[sectionIndex] = { ...updated[sectionIndex], links: updatedLinks };
                              updateFooter({ sections: updated });
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="/link-yolu"
                          />
                          <button
                            onClick={() => {
                              const updated = [...currentFooter.sections];
                              const updatedLinks = updated[sectionIndex].links.filter((_: any, i: number) => i !== linkIndex);
                              updated[sectionIndex] = { ...updated[sectionIndex], links: updatedLinks };
                              updateFooter({ sections: updated });
                            }}
                            className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

export default PageHeaderFooter;
