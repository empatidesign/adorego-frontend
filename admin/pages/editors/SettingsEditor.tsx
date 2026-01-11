import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, Button, Select, TextArea } from '../../components/forms/FormComponents';
import ImageUpload from '../../components/forms/ImageUpload';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';
type Tab = 'general' | 'contact' | 'socialMedia' | 'company';

const SettingsEditor: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Tüm ayarlar için state
  const [settingsTR, setSettingsTR] = useState<any>({
    general: {},
    contact: {},
    socialMedia: {},
    company: {},
    schema: {}
  });

  const [settingsEN, setSettingsEN] = useState<any>({
    general: {},
    contact: {},
    socialMedia: {},
    company: {},
    schema: {}
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Site Settings yükle
      const allSettingsTR = await contentAPI.getSiteSettings(undefined, 'tr');
      const allSettingsEN = await contentAPI.getSiteSettings(undefined, 'en');
      setSettingsTR(allSettingsTR);
      setSettingsEN(allSettingsEN);
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
      // Dil farkı kontrolü
      const trData = JSON.stringify(settingsTR[activeTab] || {});
      const enData = JSON.stringify(settingsEN[activeTab] || {});
      const hasDifference = trData !== enData;

      // Eğer dil farkı yoksa, aynı veriyi her iki dile de kaydet
      if (!hasDifference) {
        const dataToSave = (currentLang === 'tr' ? settingsTR : settingsEN)[activeTab];
        await contentAPI.updateSiteSettings(activeTab, dataToSave, 'tr');
        await contentAPI.updateSiteSettings(activeTab, dataToSave, 'en');

        if (activeTab === 'company') {
          await contentAPI.updateSiteSettings('schema', (currentLang === 'tr' ? settingsTR : settingsEN).schema, 'tr');
          await contentAPI.updateSiteSettings('schema', (currentLang === 'tr' ? settingsTR : settingsEN).schema, 'en');
        }
      } else {
        // Dil farkı varsa, her birini ayrı kaydet
        await contentAPI.updateSiteSettings(activeTab, settingsTR[activeTab], 'tr');
        await contentAPI.updateSiteSettings(activeTab, settingsEN[activeTab], 'en');

        if (activeTab === 'company') {
          await contentAPI.updateSiteSettings('schema', settingsTR.schema, 'tr');
          await contentAPI.updateSiteSettings('schema', settingsEN.schema, 'en');
        }
      }

      setMessage({ type: 'success', text: 'Ayarlar başarıyla güncellendi!' });
      // Verileri yeniden yükle
      await loadData();
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

  const tabs = [
    { id: 'general' as Tab, label: 'Genel Ayarlar', icon: 'fa-cog' },
    { id: 'contact' as Tab, label: 'İletişim', icon: 'fa-address-book' },
    { id: 'socialMedia' as Tab, label: 'Sosyal Medya', icon: 'fa-share-nodes' },
    { id: 'company' as Tab, label: 'Şirket', icon: 'fa-building' },
  ];

  // TR ve EN verileri karşılaştır - farklı mı kontrol et
  const hasLanguageDifference = (category: string) => {
    const trData = JSON.stringify(settingsTR[category] || {});
    const enData = JSON.stringify(settingsEN[category] || {});
    return trData !== enData;
  };

  // Aktif tab için dil farkı var mı?
  const showLanguageTabs = hasLanguageDifference(activeTab);

  // Tab değiştiğinde kontrol et - eğer dil farkı yoksa TR göster
  useEffect(() => {
    if (!loading) {
      const hasDifference = hasLanguageDifference(activeTab);
      if (!hasDifference && currentLang === 'en') {
        setCurrentLang('tr');
      }
    }
  }, [activeTab, loading, currentLang, settingsTR, settingsEN]);

  const currentSettings = (currentLang === 'tr' ? settingsTR : settingsEN) || {};
  const setCurrentSettings = currentLang === 'tr' ? setSettingsTR : setSettingsEN;

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
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Site Ayarları</h1>
        <p className="text-gray-600 mb-8">Tüm site ayarlarını buradan yönetin</p>

        {/* Dil Sekmeleri - Sadece farklılık varsa göster */}
        {showLanguageTabs && (
          <div className="mb-6">
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => setCurrentLang('tr')}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${currentLang === 'tr' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                🇹🇷 Türkçe
              </button>
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${currentLang === 'en' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                🇬🇧 English
              </button>
            </div>
            <p className="text-sm text-gray-600">
              <i className="fas fa-info-circle mr-2"></i>
              Bu bölüm için Türkçe ve İngilizce farklı içerik bulunuyor
            </p>
          </div>
        )}

        {!showLanguageTabs && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <i className="fas fa-globe mr-2"></i>
              Bu ayarlar her iki dil için ortaktır (Türkçe ve İngilizce'de aynı değerler kullanılır)
            </p>
          </div>
        )}

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Tab Menü */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-[#4DB848] text-[#4DB848] bg-green-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  <i className={`fas ${tab.icon}`}></i>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab İçerikleri */}
          <div className="p-6">
            {/* Genel Ayarlar */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i className="fas fa-cog text-blue-500"></i>
                  Genel Bilgiler
                </h3>

                <Input
                  label="Site Adı"
                  value={currentSettings.general?.siteName || ''}
                  onChange={(val) => setCurrentSettings({
                    ...currentSettings,
                    general: { ...currentSettings.general, siteName: val }
                  })}
                  placeholder="adoreGo"
                />

                <Input
                  label="Site Başlığı"
                  value={currentSettings.general?.siteTitle || ''}
                  onChange={(val) => setCurrentSettings({
                    ...currentSettings,
                    general: { ...currentSettings.general, siteTitle: val }
                  })}
                  placeholder="adoreGo - Global Lojistik Çözümleri"
                />

                <Input
                  label="Site URL"
                  value={currentSettings.general?.siteUrl || ''}
                  onChange={(val) => setCurrentSettings({
                    ...currentSettings,
                    general: { ...currentSettings.general, siteUrl: val }
                  })}
                  placeholder="https://adorego.com"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Admin E-posta"
                    value={currentSettings.general?.adminEmail || ''}
                    onChange={(val) => setCurrentSettings({
                      ...currentSettings,
                      general: { ...currentSettings.general, adminEmail: val }
                    })}
                    placeholder="admin@adorego.com"
                    type="email"
                  />

                  <Input
                    label="Destek E-posta"
                    value={currentSettings.general?.supportEmail || ''}
                    onChange={(val) => setCurrentSettings({
                      ...currentSettings,
                      general: { ...currentSettings.general, supportEmail: val }
                    })}
                    placeholder="destek@adorego.com"
                    type="email"
                  />
                </div>

                {/* Logo Yükleme Alanları */}
                <div className="border-t pt-6 mt-6">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i className="fas fa-image text-purple-500"></i>
                    Logo Ayarları
                  </h4>

                  <div className="space-y-6">
                    {/* Header Logo (Navbar/Header Logo) */}
                    <div>
                      <ImageUpload
                        label="Header Logo (Navbar/Site Başlığında Kullanılan)"
                        currentImage={currentSettings.general?.headerLogo || ''}
                        onImageUploaded={(url) => setCurrentSettings({
                          ...currentSettings,
                          general: { ...currentSettings.general, headerLogo: url }
                        })}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Site header ve navbar bölümünde görüntülenecek logo
                      </p>
                    </div>

                    {/* Footer Logo */}
                    <div>
                      <ImageUpload
                        label="Footer Logo (Footer'da Kullanılan)"
                        currentImage={currentSettings.general?.footerLogo || ''}
                        onImageUploaded={(url) => setCurrentSettings({
                          ...currentSettings,
                          general: { ...currentSettings.general, footerLogo: url }
                        })}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Site footer bölümünde görüntülenecek logo
                      </p>
                    </div>

                    {/* Favicon */}
                    <div>
                      <ImageUpload
                        label="Favicon (Tarayıcı Sekmesi İkonu)"
                        currentImage={currentSettings.general?.favicon || ''}
                        onImageUploaded={(url) => setCurrentSettings({
                          ...currentSettings,
                          general: { ...currentSettings.general, favicon: url }
                        })}
                        acceptedFormats="image/png,image/x-icon,image/svg+xml"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Tarayıcı sekmesinde görüntülenecek favicon (16x16 veya 32x32 piksel, PNG, ICO veya SVG formatında önerilir)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* İletişim Bilgileri */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i className="fas fa-address-book text-sky-500"></i>
                  İletişim Bilgileri
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Telefon"
                    value={currentSettings.contact?.phone || ''}
                    onChange={(val) => setCurrentSettings({
                      ...currentSettings,
                      contact: { ...currentSettings.contact, phone: val }
                    })}
                    placeholder="+90 (212) 123 45 67"
                  />

                  <Input
                    label="WhatsApp"
                    value={currentSettings.contact?.whatsapp || ''}
                    onChange={(val) => setCurrentSettings({
                      ...currentSettings,
                      contact: { ...currentSettings.contact, whatsapp: val }
                    })}
                    placeholder="+90 (532) 123 45 67"
                  />
                </div>

                <Input
                  label="E-posta"
                  value={currentSettings.contact?.email || ''}
                  onChange={(val) => setCurrentSettings({
                    ...currentSettings,
                    contact: { ...currentSettings.contact, email: val }
                  })}
                  placeholder="info@adorego.com"
                  type="email"
                />

                <TextArea
                  label="Adres"
                  value={currentSettings.contact?.address || ''}
                  onChange={(val) => setCurrentSettings({
                    ...currentSettings,
                    contact: { ...currentSettings.contact, address: val }
                  })}
                  placeholder="İstanbul, Türkiye"
                  rows={2}
                />

                <Input
                  label="Çalışma Saatleri"
                  value={currentSettings.contact?.workingHours || ''}
                  onChange={(val) => setCurrentSettings({
                    ...currentSettings,
                    contact: { ...currentSettings.contact, workingHours: val }
                  })}
                  placeholder="Pazartesi - Cuma: 09:00 - 18:00"
                />

                <TextArea
                  label="Google Harita Embed Kodu"
                  value={currentSettings.contact?.googleMapsEmbed || ''}
                  onChange={(val) => setCurrentSettings({
                    ...currentSettings,
                    contact: { ...currentSettings.contact, googleMapsEmbed: val }
                  })}
                  placeholder='<iframe src="https://www.google.com/maps/embed?pb=..." ...></iframe>'
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Google Haritalar'dan aldığınız iframe embed kodunu buraya yapıştırın.
                </p>
              </div>
            )}

            {/* Sosyal Medya */}
            {activeTab === 'socialMedia' && (
              <div className="space-y-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i className="fas fa-share-nodes text-rose-500"></i>
                  Sosyal Medya Hesapları
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label={<><i className="fab fa-facebook mr-2"></i>Facebook</>}
                    value={currentSettings.socialMedia?.facebook || ''}
                    onChange={(val) => setCurrentSettings({
                      ...currentSettings,
                      socialMedia: { ...currentSettings.socialMedia, facebook: val }
                    })}
                    placeholder="https://facebook.com/adorego"
                  />

                  <Input
                    label={<><i className="fab fa-twitter mr-2"></i>Twitter</>}
                    value={currentSettings.socialMedia?.twitter || ''}
                    onChange={(val) => setCurrentSettings({
                      ...currentSettings,
                      socialMedia: { ...currentSettings.socialMedia, twitter: val }
                    })}
                    placeholder="https://twitter.com/adorego"
                  />

                  <Input
                    label={<><i className="fab fa-instagram mr-2"></i>Instagram</>}
                    value={currentSettings.socialMedia?.instagram || ''}
                    onChange={(val) => setCurrentSettings({
                      ...currentSettings,
                      socialMedia: { ...currentSettings.socialMedia, instagram: val }
                    })}
                    placeholder="https://instagram.com/adorego"
                  />

                  <Input
                    label={<><i className="fab fa-linkedin mr-2"></i>LinkedIn</>}
                    value={currentSettings.socialMedia?.linkedin || ''}
                    onChange={(val) => setCurrentSettings({
                      ...currentSettings,
                      socialMedia: { ...currentSettings.socialMedia, linkedin: val }
                    })}
                    placeholder="https://linkedin.com/company/adorego"
                  />

                  <Input
                    label={<><i className="fab fa-youtube mr-2"></i>YouTube</>}
                    value={currentSettings.socialMedia?.youtube || ''}
                    onChange={(val) => setCurrentSettings({
                      ...currentSettings,
                      socialMedia: { ...currentSettings.socialMedia, youtube: val }
                    })}
                    placeholder="https://youtube.com/@adorego"
                  />

                  <Input
                    label={<><i className="fab fa-pinterest mr-2"></i>Pinterest</>}
                    value={currentSettings.socialMedia?.pinterest || ''}
                    onChange={(val) => setCurrentSettings({
                      ...currentSettings,
                      socialMedia: { ...currentSettings.socialMedia, pinterest: val }
                    })}
                    placeholder="https://pinterest.com/adorego"
                  />

                  <Input
                    label={<><i className="fab fa-tiktok mr-2"></i>TikTok</>}
                    value={currentSettings.socialMedia?.tiktok || ''}
                    onChange={(val) => setCurrentSettings({
                      ...currentSettings,
                      socialMedia: { ...currentSettings.socialMedia, tiktok: val }
                    })}
                    placeholder="https://tiktok.com/@adorego"
                  />
                </div>
              </div>
            )}

            {/* Şirket Bilgileri */}
            {activeTab === 'company' && (
              <div className="space-y-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <i className="fas fa-building text-amber-500"></i>
                  Şirket ve Vergi Bilgileri
                </h3>

                <Input
                  label="Şirket Ünvanı"
                  value={currentSettings.company?.fullName || ''}
                  onChange={(val) => setCurrentSettings({
                    ...currentSettings,
                    company: { ...currentSettings.company, fullName: val }
                  })}
                  placeholder="adoreGo Lojistik A.Ş."
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Vergi Dairesi"
                    value={currentSettings.company?.taxOffice || ''}
                    onChange={(val) => setCurrentSettings({
                      ...currentSettings,
                      company: { ...currentSettings.company, taxOffice: val }
                    })}
                    placeholder="Kadıköy"
                  />

                  <Input
                    label="Vergi Numarası"
                    value={currentSettings.company?.taxNumber || ''}
                    onChange={(val) => setCurrentSettings({
                      ...currentSettings,
                      company: { ...currentSettings.company, taxNumber: val }
                    })}
                    placeholder="1234567890"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Ticaret Sicil No"
                    value={currentSettings.company?.tradeRegisterNumber || ''}
                    onChange={(val) => setCurrentSettings({
                      ...currentSettings,
                      company: { ...currentSettings.company, tradeRegisterNumber: val }
                    })}
                    placeholder="123456"
                  />

                  <Input
                    label="MERSİS No"
                    value={currentSettings.company?.mersisNumber || ''}
                    onChange={(val) => setCurrentSettings({
                      ...currentSettings,
                      company: { ...currentSettings.company, mersisNumber: val }
                    })}
                    placeholder="0123456789012345"
                  />
                </div>

                <Input
                  label="Kuruluş Yılı"
                  value={currentSettings.company?.foundedYear || ''}
                  onChange={(val) => setCurrentSettings({
                    ...currentSettings,
                    company: { ...currentSettings.company, foundedYear: val }
                  })}
                  placeholder="2020"
                />
              </div>
            )}

            {/* Kaydet ve İptal Butonları */}
            <div className="flex gap-4 pt-6 border-t mt-8">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </Button>
              <Button onClick={handleCancel} variant="secondary">
                İptal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsEditor;
