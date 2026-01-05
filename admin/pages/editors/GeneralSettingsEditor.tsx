import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, Button, Select } from '../../components/forms/FormComponents';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';

const GeneralSettingsEditor: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [settingsTR, setSettingsTR] = useState({
    siteName: '',
    siteTitle: '',
    siteUrl: '',
    adminEmail: '',
    supportEmail: '',
    timezone: '',
    language: 'tr',
    currency: ''
  });

  const [settingsEN, setSettingsEN] = useState({
    siteName: '',
    siteTitle: '',
    siteUrl: '',
    adminEmail: '',
    supportEmail: '',
    timezone: '',
    language: 'en',
    currency: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const dataTR = await contentAPI.getSiteSettings('general', 'tr');
      const dataEN = await contentAPI.getSiteSettings('general', 'en');
      if (Object.keys(dataTR).length > 0) setSettingsTR(dataTR);
      if (Object.keys(dataEN).length > 0) setSettingsEN(dataEN);
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
      await contentAPI.updateSiteSettings('general', settingsTR, 'tr');
      await contentAPI.updateSiteSettings('general', settingsEN, 'en');
      setMessage({ type: 'success', text: 'Genel ayarlar her iki dil için başarıyla güncellendi!' });
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

  const currentSettings = currentLang === 'tr' ? settingsTR : settingsEN;
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
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Genel Ayarlar</h1>
        <p className="text-gray-600 mb-8">Site genelinde kullanılan temel ayarlar</p>

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

        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-cog text-blue-500"></i>
            Genel Bilgiler
          </h3>

          <Input
            label="Site Adı"
            value={currentSettings.siteName}
            onChange={(val) => setCurrentSettings({ ...currentSettings, siteName: val })}
            placeholder="adoreGo"
          />

          <Input
            label="Site Başlığı"
            value={currentSettings.siteTitle}
            onChange={(val) => setCurrentSettings({ ...currentSettings, siteTitle: val })}
            placeholder="adoreGo - Global Lojistik Çözümleri"
          />

          <Input
            label="Site URL"
            value={currentSettings.siteUrl}
            onChange={(val) => setCurrentSettings({ ...currentSettings, siteUrl: val })}
            placeholder="https://adorego.com"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Admin E-posta"
              value={currentSettings.adminEmail}
              onChange={(val) => setCurrentSettings({ ...currentSettings, adminEmail: val })}
              placeholder="admin@adorego.com"
              type="email"
            />

            <Input
              label="Destek E-posta"
              value={currentSettings.supportEmail}
              onChange={(val) => setCurrentSettings({ ...currentSettings, supportEmail: val })}
              placeholder="destek@adorego.com"
              type="email"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Select
              label="Saat Dilimi"
              value={currentSettings.timezone}
              onChange={(val) => setCurrentSettings({ ...currentSettings, timezone: val })}
              options={[
                { label: 'İstanbul (GMT+3)', value: 'Europe/Istanbul' },
                { label: 'UTC (GMT+0)', value: 'UTC' },
                { label: 'New York (GMT-5)', value: 'America/New_York' },
                { label: 'Los Angeles (GMT-8)', value: 'America/Los_Angeles' },
                { label: 'Dubai (GMT+4)', value: 'Asia/Dubai' },
              ]}
            />

            <Select
              label="Para Birimi"
              value={currentSettings.currency}
              onChange={(val) => setCurrentSettings({ ...currentSettings, currency: val })}
              options={[
                { label: 'TRY (₺)', value: 'TRY' },
                { label: 'USD ($)', value: 'USD' },
                { label: 'EUR (€)', value: 'EUR' },
                { label: 'GBP (£)', value: 'GBP' },
              ]}
            />

            <Input
              label="Dil Kodu"
              value={currentSettings.language}
              onChange={(val) => setCurrentSettings({ ...currentSettings, language: val })}
              disabled
            />
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </Button>
            <Button onClick={handleCancel} variant="secondary">
              İptal
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default GeneralSettingsEditor;
