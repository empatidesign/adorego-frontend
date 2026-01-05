import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, Button } from '../../components/forms/FormComponents';
import ImageUpload from '../../components/forms/ImageUpload';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';

const NavbarEditor: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [navbarDataTR, setNavbarDataTR] = useState({
    logo: '',
    brandName: '',
    menuItems: [] as any[],
    ctaButtons: [] as any[],
  });

  const [navbarDataEN, setNavbarDataEN] = useState({
    logo: '',
    brandName: '',
    menuItems: [] as any[],
    ctaButtons: [] as any[],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const dataTR = await contentAPI.getNavbar('tr');
      const dataEN = await contentAPI.getNavbar('en');
      setNavbarDataTR(dataTR);
      setNavbarDataEN(dataEN);
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
      await contentAPI.updateNavbar(navbarDataTR, 'tr');
      await contentAPI.updateNavbar(navbarDataEN, 'en');
      setMessage({ type: 'success', text: 'Navbar her iki dil için başarıyla güncellendi!' });
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

  const currentNavbarData = currentLang === 'tr' ? navbarDataTR : navbarDataEN;
  const setCurrentNavbarData = currentLang === 'tr' ? setNavbarDataTR : setNavbarDataEN;

  // Menü öğesi ekleme
  const addMenuItem = () => {
    const newId = Date.now().toString();
    setCurrentNavbarData({
      ...currentNavbarData,
      menuItems: [...currentNavbarData.menuItems, { id: newId, label: '', link: '', type: 'link' }],
    });
  };

  // Menü öğesi silme
  const removeMenuItem = (index: number) => {
    const newItems = currentNavbarData.menuItems.filter((_, i) => i !== index);
    setCurrentNavbarData({ ...currentNavbarData, menuItems: newItems });
  };

  // Menü öğesi güncelleme
  const updateMenuItem = (index: number, field: string, value: string) => {
    const newItems = [...currentNavbarData.menuItems];
    newItems[index][field] = value;
    setCurrentNavbarData({ ...currentNavbarData, menuItems: newItems });
  };

  // CTA buton ekleme
  const addCtaButton = () => {
    const newId = Date.now().toString();
    setCurrentNavbarData({
      ...currentNavbarData,
      ctaButtons: [...currentNavbarData.ctaButtons, { id: newId, label: '', link: '', icon: '', style: 'primary' }],
    });
  };

  // CTA buton silme
  const removeCtaButton = (index: number) => {
    const newButtons = currentNavbarData.ctaButtons.filter((_, i) => i !== index);
    setCurrentNavbarData({ ...currentNavbarData, ctaButtons: newButtons });
  };

  // CTA buton güncelleme
  const updateCtaButton = (index: number, field: string, value: string) => {
    const newButtons = [...currentNavbarData.ctaButtons];
    newButtons[index][field] = value;
    setCurrentNavbarData({ ...currentNavbarData, ctaButtons: newButtons });
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
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Menü Yönetimi</h1>
        <p className="text-gray-600 mb-8">Üst menü, logo ve navigasyon ayarları (Çift Dilli)</p>

        {/* Dil Sekmeleri */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setCurrentLang('tr')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${
              currentLang === 'tr'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🇹🇷 Türkçe
          </button>
          <button
            onClick={() => setCurrentLang('en')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${
              currentLang === 'en'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🇬🇧 English
          </button>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="space-y-8">
          {/* Logo ve Marka */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-image text-[#4DB848]"></i>
              {currentLang === 'tr' ? 'Logo ve Marka' : 'Logo and Brand'}
            </h3>

            <ImageUpload
              label="Logo"
              currentImage={currentNavbarData.logo}
              onImageUploaded={(url) => setCurrentNavbarData({ ...currentNavbarData, logo: url })}
            />

            <Input
              label={currentLang === 'tr' ? 'Marka Adı' : 'Brand Name'}
              value={currentNavbarData.brandName}
              onChange={(val) => setCurrentNavbarData({ ...currentNavbarData, brandName: val })}
              placeholder="adoreGo"
            />
          </div>

          {/* Menü Öğeleri */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <i className="fas fa-bars text-[#102477]"></i>
                {currentLang === 'tr' ? 'Menü Öğeleri' : 'Menu Items'}
              </h3>
              <button
                onClick={addMenuItem}
                className="px-4 py-2 bg-[#4DB848] text-white rounded-lg hover:bg-[#3da339] transition-colors text-sm font-medium"
              >
                <i className="fas fa-plus mr-2"></i>
                {currentLang === 'tr' ? 'Menü Ekle' : 'Add Menu'}
              </button>
            </div>

            <div className="space-y-4">
              {currentNavbarData.menuItems.map((item, index) => (
                <div key={item.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700">{currentLang === 'tr' ? `Menü ${index + 1}` : `Menu ${index + 1}`}</span>
                    <button
                      onClick={() => removeMenuItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label={currentLang === 'tr' ? 'Menü Adı' : 'Menu Name'}
                      value={item.label}
                      onChange={(val) => updateMenuItem(index, 'label', val)}
                      placeholder={currentLang === 'tr' ? "Yurtdışı Kargo" : "International Shipping"}
                    />
                    <Input
                      label={currentLang === 'tr' ? 'Link' : 'Link'}
                      value={item.link}
                      onChange={(val) => updateMenuItem(index, 'link', val)}
                      placeholder="#yurtdisi"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Butonları */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <i className="fas fa-hand-pointer text-[#102477]"></i>
                {currentLang === 'tr' ? 'CTA Butonları' : 'CTA Buttons'}
              </h3>
              <button
                onClick={addCtaButton}
                className="px-4 py-2 bg-[#4DB848] text-white rounded-lg hover:bg-[#3da339] transition-colors text-sm font-medium"
              >
                <i className="fas fa-plus mr-2"></i>
                {currentLang === 'tr' ? 'Buton Ekle' : 'Add Button'}
              </button>
            </div>

            <div className="space-y-4">
              {currentNavbarData.ctaButtons.map((button, index) => (
                <div key={button.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700">{currentLang === 'tr' ? `Buton ${index + 1}` : `Button ${index + 1}`}</span>
                    <button
                      onClick={() => removeCtaButton(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label={currentLang === 'tr' ? 'Buton Metni' : 'Button Text'}
                      value={button.label}
                      onChange={(val) => updateCtaButton(index, 'label', val)}
                      placeholder={currentLang === 'tr' ? "ÜYE OL" : "SIGN UP"}
                    />
                    <Input
                      label="Link"
                      value={button.link}
                      onChange={(val) => updateCtaButton(index, 'link', val)}
                      placeholder="#"
                    />
                    <Input
                      label={currentLang === 'tr' ? 'İkon (FontAwesome)' : 'Icon (FontAwesome)'}
                      value={button.icon || ''}
                      onChange={(val) => updateCtaButton(index, 'icon', val)}
                      placeholder="fa-user-shield"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{currentLang === 'tr' ? 'Stil' : 'Style'}</label>
                      <select
                        value={button.style}
                        onChange={(e) => updateCtaButton(index, 'style', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent"
                      >
                        <option value="primary">{currentLang === 'tr' ? 'Birincil' : 'Primary'}</option>
                        <option value="outline">{currentLang === 'tr' ? 'Çerçeveli' : 'Outline'}</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
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

export default NavbarEditor;
