import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, TextArea, Button } from '../../components/forms/FormComponents';
import ImageUpload from '../../components/forms/ImageUpload';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';

const HeroEditor: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [heroDataTR, setHeroDataTR] = useState({
    title: '',
    subtitle: '',
    image: '',
    buttons: [] as any[],
    badges: [] as any[],
    stats: [] as any[],
  });

  const [heroDataEN, setHeroDataEN] = useState({
    title: '',
    subtitle: '',
    image: '',
    buttons: [] as any[],
    badges: [] as any[],
    stats: [] as any[],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const dataTR = await contentAPI.getHero('tr');
      const dataEN = await contentAPI.getHero('en');
      setHeroDataTR(dataTR);
      setHeroDataEN(dataEN);
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
      await contentAPI.updateHero(heroDataTR, 'tr');
      await contentAPI.updateHero(heroDataEN, 'en');
      setMessage({ type: 'success', text: 'Hero bölümü her iki dil için başarıyla güncellendi!' });
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

  const currentHeroData = currentLang === 'tr' ? heroDataTR : heroDataEN;
  const setCurrentHeroData = currentLang === 'tr' ? setHeroDataTR : setHeroDataEN;

  // Button Functions
  const updateButton = (index: number, field: string, value: string) => {
    const newButtons = [...currentHeroData.buttons];
    newButtons[index][field] = value;
    setCurrentHeroData({ ...currentHeroData, buttons: newButtons });
  };

  const addButton = () => {
    setCurrentHeroData({
      ...currentHeroData,
      buttons: [...currentHeroData.buttons, { text: '', icon: '', style: 'primary' }]
    });
  };

  const removeButton = (index: number) => {
    const newButtons = currentHeroData.buttons.filter((_, i) => i !== index);
    setCurrentHeroData({ ...currentHeroData, buttons: newButtons });
  };

  // Badge Functions
  const updateBadge = (index: number, field: string, value: string) => {
    const newBadges = [...currentHeroData.badges];
    newBadges[index][field] = value;
    setCurrentHeroData({ ...currentHeroData, badges: newBadges });
  };

  const addBadge = () => {
    setCurrentHeroData({
      ...currentHeroData,
      badges: [...currentHeroData.badges, { text: '', icon: 'fa-check', color: 'blue' }]
    });
  };

  const removeBadge = (index: number) => {
    const newBadges = currentHeroData.badges.filter((_, i) => i !== index);
    setCurrentHeroData({ ...currentHeroData, badges: newBadges });
  };

  const moveBadge = (index: number, direction: 'up' | 'down') => {
    const newBadges = [...currentHeroData.badges];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newBadges.length) return;
    [newBadges[index], newBadges[newIndex]] = [newBadges[newIndex], newBadges[index]];
    setCurrentHeroData({ ...currentHeroData, badges: newBadges });
  };

  // Stats Functions
  const updateStat = (index: number, field: string, value: string) => {
    const newStats = [...currentHeroData.stats];
    newStats[index][field] = value;
    setCurrentHeroData({ ...currentHeroData, stats: newStats });
  };

  const addStat = () => {
    setCurrentHeroData({
      ...currentHeroData,
      stats: [...currentHeroData.stats, { value: '', label: '', icon: 'fa-star' }]
    });
  };

  const removeStat = (index: number) => {
    const newStats = currentHeroData.stats.filter((_, i) => i !== index);
    setCurrentHeroData({ ...currentHeroData, stats: newStats });
  };

  const moveStat = (index: number, direction: 'up' | 'down') => {
    const newStats = [...currentHeroData.stats];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newStats.length) return;
    [newStats[index], newStats[newIndex]] = [newStats[newIndex], newStats[index]];
    setCurrentHeroData({ ...currentHeroData, stats: newStats });
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Hero Bölümü</h1>
        <p className="text-gray-600 mb-8">Ana sayfa başlık ve görsel ayarları (Çift Dilli)</p>

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
          {/* Temel Bilgiler */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-heading text-blue-500"></i>
              {currentLang === 'tr' ? 'Temel Bilgiler' : 'Basic Information'}
            </h3>

            <div className="space-y-4">
              <Input
                label={currentLang === 'tr' ? 'Ana Başlık' : 'Main Title'}
                value={currentHeroData.title}
                onChange={(val) => setCurrentHeroData({ ...currentHeroData, title: val })}
                placeholder={currentLang === 'tr' ? "Kazanç\nYurtdışında.\nEn Uygun Kargo Bizde." : "Profit\nAbroad.\nBest Shipping Rates Here."}
              />

              <TextArea
                label={currentLang === 'tr' ? 'Alt Başlık' : 'Subtitle'}
                value={currentHeroData.subtitle}
                onChange={(val) => setCurrentHeroData({ ...currentHeroData, subtitle: val })}
                placeholder={currentLang === 'tr' ? "Yurtdışına kargo gönderimi yapan e-ticaret siteleri için..." : "Door-to-door pickup, micro export, and fast delivery solutions..."}
                rows={3}
              />

              <ImageUpload
                label={currentLang === 'tr' ? 'Hero Görseli' : 'Hero Image'}
                currentImage={currentHeroData.image}
                onImageUploaded={(url) => setCurrentHeroData({ ...currentHeroData, image: url })}
              />
            </div>
          </div>

          {/* Butonlar */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <i className="fas fa-hand-pointer text-green-500"></i>
                {currentLang === 'tr' ? 'Butonlar' : 'Buttons'}
              </h3>
              <button
                onClick={addButton}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
              >
                <i className="fas fa-plus mr-2"></i>
                {currentLang === 'tr' ? 'Buton Ekle' : 'Add Button'}
              </button>
            </div>

            <div className="space-y-4">
              {currentHeroData.buttons?.map((button, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700">{currentLang === 'tr' ? `Buton ${index + 1}` : `Button ${index + 1}`}</span>
                    <button
                      onClick={() => removeButton(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label={currentLang === 'tr' ? 'Buton Metni' : 'Button Text'}
                      value={button.text}
                      onChange={(val) => updateButton(index, 'text', val)}
                      placeholder={currentLang === 'tr' ? "Ücretsiz Üye Ol" : "Free Sign Up"}
                    />
                    <Input
                      label={currentLang === 'tr' ? 'İkon (FontAwesome)' : 'Icon (FontAwesome)'}
                      value={button.icon}
                      onChange={(val) => updateButton(index, 'icon', val)}
                      placeholder="fa-user-plus"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rozetler (Badges) */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <i className="fas fa-certificate text-yellow-500"></i>
                {currentLang === 'tr' ? 'Rozetler' : 'Badges'}
              </h3>
              <button
                onClick={addBadge}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
              >
                <i className="fas fa-plus mr-2"></i>
                {currentLang === 'tr' ? 'Rozet Ekle' : 'Add Badge'}
              </button>
            </div>

            <div className="space-y-4">
              {currentHeroData.badges?.map((badge, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700">{currentLang === 'tr' ? `Rozet ${index + 1}` : `Badge ${index + 1}`}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveBadge(index, 'up')}
                        disabled={index === 0}
                        className={`p-2 rounded ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50'}`}
                      >
                        <i className="fas fa-arrow-up"></i>
                      </button>
                      <button
                        onClick={() => moveBadge(index, 'down')}
                        disabled={index === currentHeroData.badges.length - 1}
                        className={`p-2 rounded ${index === currentHeroData.badges.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50'}`}
                      >
                        <i className="fas fa-arrow-down"></i>
                      </button>
                      <button
                        onClick={() => removeBadge(index)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label={currentLang === 'tr' ? 'Rozet Metni' : 'Badge Text'}
                      value={badge.text}
                      onChange={(val) => updateBadge(index, 'text', val)}
                      placeholder={currentLang === 'tr' ? "BAŞVURU GEREKMEZ" : "NO APPLICATION REQUIRED"}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{currentLang === 'tr' ? 'Renk' : 'Color'}</label>
                      <select
                        value={badge.color}
                        onChange={(e) => updateBadge(index, 'color', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent"
                      >
                        <option value="blue">{currentLang === 'tr' ? 'Mavi' : 'Blue'}</option>
                        <option value="green">{currentLang === 'tr' ? 'Yeşil' : 'Green'}</option>
                        <option value="red">{currentLang === 'tr' ? 'Kırmızı' : 'Red'}</option>
                        <option value="yellow">{currentLang === 'tr' ? 'Sarı' : 'Yellow'}</option>
                      </select>
                    </div>
                    <Input
                      label={currentLang === 'tr' ? 'İkon (FontAwesome)' : 'Icon (FontAwesome)'}
                      value={badge.icon}
                      onChange={(val) => updateBadge(index, 'icon', val)}
                      placeholder="fa-check"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* İstatistikler (Stats) */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <i className="fas fa-chart-line text-purple-500"></i>
                {currentLang === 'tr' ? 'İstatistikler' : 'Statistics'}
              </h3>
              <button
                onClick={addStat}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
              >
                <i className="fas fa-plus mr-2"></i>
                {currentLang === 'tr' ? 'İstatistik Ekle' : 'Add Stat'}
              </button>
            </div>

            <div className="space-y-4">
              {currentHeroData.stats?.map((stat, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700">{currentLang === 'tr' ? `İstatistik ${index + 1}` : `Stat ${index + 1}`}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveStat(index, 'up')}
                        disabled={index === 0}
                        className={`p-2 rounded ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50'}`}
                      >
                        <i className="fas fa-arrow-up"></i>
                      </button>
                      <button
                        onClick={() => moveStat(index, 'down')}
                        disabled={index === currentHeroData.stats.length - 1}
                        className={`p-2 rounded ${index === currentHeroData.stats.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50'}`}
                      >
                        <i className="fas fa-arrow-down"></i>
                      </button>
                      <button
                        onClick={() => removeStat(index)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      label={currentLang === 'tr' ? 'Değer' : 'Value'}
                      value={stat.value}
                      onChange={(val) => updateStat(index, 'value', val)}
                      placeholder="220+"
                    />
                    <Input
                      label={currentLang === 'tr' ? 'Etiket' : 'Label'}
                      value={stat.label}
                      onChange={(val) => updateStat(index, 'label', val)}
                      placeholder={currentLang === 'tr' ? "GLOBAL ÜLKE AĞI" : "GLOBAL NETWORK"}
                    />
                    <Input
                      label={currentLang === 'tr' ? 'İkon (FontAwesome)' : 'Icon (FontAwesome)'}
                      value={stat.icon}
                      onChange={(val) => updateStat(index, 'icon', val)}
                      placeholder="fa-globe-africa"
                    />
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

export default HeroEditor;
