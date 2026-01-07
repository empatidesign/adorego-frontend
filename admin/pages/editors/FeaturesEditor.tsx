import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, TextArea, Button } from '../../components/forms/FormComponents';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';

const FeaturesEditor: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [featuresTR, setFeaturesTR] = useState<any[]>([]);
  const [featuresEN, setFeaturesEN] = useState<any[]>([]);
  const [headerTR, setHeaderTR] = useState({ badge: '', title: '', subtitle: '' });
  const [headerEN, setHeaderEN] = useState({ badge: '', title: '', subtitle: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const dataTR = await contentAPI.getFeatures('tr');
      const dataEN = await contentAPI.getFeatures('en');
      const headerDataTR = await contentAPI.getFeaturesHeader('tr');
      const headerDataEN = await contentAPI.getFeaturesHeader('en');
      
      // Default features
      const defaultFeaturesTR = [
        {
          icon: "fa-rocket",
          color: "bg-gradient-to-br from-blue-500 to-blue-600",
          title: "Hızlı Entegrasyon",
          description: "Pazaryeri mağazalarınızı dakikalar içinde bağlayın, gönderilerinizi otomatik yönetin."
        },
        {
          icon: "fa-shield-halved",
          color: "bg-gradient-to-br from-green-500 to-green-600",
          title: "Tam Güvence",
          description: "adoreGo ile tüm paketleriniz sigortalı ve uçtan uca takip sistemimizle koruma altında."
        },
        {
          icon: "fa-map-location-dot",
          color: "bg-gradient-to-br from-purple-500 to-purple-600",
          title: "Global Takip",
          description: "Dünyanın neresinde olursa olsun kargonuzu canlı harita üzerinden takip edin."
        },
        {
          icon: "fa-hand-holding-dollar",
          color: "bg-gradient-to-br from-orange-500 to-orange-600",
          title: "Rekabetçi Fiyat",
          description: "Hacminiz ne olursa olsun, en uygun birim fiyat garantisi ile lojistik maliyetlerinizi düşürün."
        }
      ];

      const defaultFeaturesEN = [
        {
          icon: "fa-rocket",
          color: "bg-gradient-to-br from-blue-500 to-blue-600",
          title: "Fast Integration",
          description: "Connect your marketplace stores in minutes and manage your shipments automatically."
        },
        {
          icon: "fa-shield-halved",
          color: "bg-gradient-to-br from-green-500 to-green-600",
          title: "Full Protection",
          description: "All your packages are insured with adoreGo and protected by our end-to-end tracking system."
        },
        {
          icon: "fa-map-location-dot",
          color: "bg-gradient-to-br from-purple-500 to-purple-600",
          title: "Global Tracking",
          description: "Track your shipment on a live map, wherever it is in the world."
        },
        {
          icon: "fa-hand-holding-dollar",
          color: "bg-gradient-to-br from-orange-500 to-orange-600",
          title: "Competitive Pricing",
          description: "Reduce your logistics costs with the best unit price guarantee, regardless of your volume."
        }
      ];

      setFeaturesTR((dataTR && Array.isArray(dataTR) && dataTR.length > 0) ? dataTR : defaultFeaturesTR);
      setFeaturesEN((dataEN && Array.isArray(dataEN) && dataEN.length > 0) ? dataEN : defaultFeaturesEN);
      
      setHeaderTR(headerDataTR && Object.keys(headerDataTR).length > 0 ? headerDataTR : {
        badge: 'ADOREGO TEKNOLOJİ',
        title: 'Lojistiği Akıllı Teknolojiyle Birleştirdik.',
        subtitle: 'Gönderi sürecini basitleştiriyor, hızlandırıyor ve daha ekonomik hale getiriyoruz.'
      });
      
      setHeaderEN(headerDataEN && Object.keys(headerDataEN).length > 0 ? headerDataEN : {
        badge: 'ADOREGO TECHNOLOGY',
        title: 'We Combined Logistics with Smart Technology.',
        subtitle: 'We simplify, accelerate and make the shipping process more economical.'
      });
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
      await contentAPI.updateFeatures(featuresTR, 'tr');
      await contentAPI.updateFeatures(featuresEN, 'en');
      await contentAPI.updateFeaturesHeader(headerTR, 'tr');
      await contentAPI.updateFeaturesHeader(headerEN, 'en');
      setMessage({ type: 'success', text: 'Özellikler ve başlık her iki dil için başarıyla güncellendi!' });
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

  const currentFeatures = currentLang === 'tr' ? featuresTR : featuresEN;
  const setCurrentFeatures = currentLang === 'tr' ? setFeaturesTR : setFeaturesEN;
  const currentHeader = currentLang === 'tr' ? headerTR : headerEN;
  const setCurrentHeader = currentLang === 'tr' ? setHeaderTR : setHeaderEN;

  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...currentFeatures];
    newFeatures[index][field] = value;
    setCurrentFeatures(newFeatures);
  };

  const updateHeader = (field: string, value: string) => {
    setCurrentHeader({ ...currentHeader, [field]: value });
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Özellikler</h1>
        <p className="text-gray-600 mb-8">4 özellik kartını düzenleyin (Çift Dilli)</p>

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

        {/* Başlık Bölümü */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">{currentLang === 'tr' ? 'Bölüm Başlığı' : 'Section Header'}</h3>
          
          <div className="space-y-4">
            <Input
              label={currentLang === 'tr' ? 'Üst Etiket (Badge)' : 'Top Badge'}
              value={currentHeader.badge}
              onChange={(val) => updateHeader('badge', val)}
              placeholder={currentLang === 'tr' ? 'ADOREGO TEKNOLOJİ' : 'ADOREGO TECHNOLOGY'}
            />

            <Input
              label={currentLang === 'tr' ? 'Ana Başlık' : 'Main Title'}
              value={currentHeader.title}
              onChange={(val) => updateHeader('title', val)}
              placeholder={currentLang === 'tr' ? 'Lojistiği Akıllı Teknolojiyle Birleştirdik.' : 'We Combined Logistics with Smart Technology.'}
            />

            <TextArea
              label={currentLang === 'tr' ? 'Alt Başlık / Açıklama' : 'Subtitle / Description'}
              value={currentHeader.subtitle}
              onChange={(val) => updateHeader('subtitle', val)}
              placeholder={currentLang === 'tr' ? 'Gönderi sürecini basitleştiriyor...' : 'We simplify, accelerate...'}
              rows={2}
            />
          </div>
        </div>

        <h3 className="font-bold text-gray-800 mb-4 text-lg">{currentLang === 'tr' ? 'Özellik Kartları' : 'Feature Cards'}</h3>

        <div className="space-y-6">
          {currentFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4">{currentLang === 'tr' ? `Özellik ${index + 1}` : `Feature ${index + 1}`}</h3>
              
              <div className="space-y-4">
                <Input
                  label={currentLang === 'tr' ? 'İkon (FontAwesome)' : 'Icon (FontAwesome)'}
                  value={feature.icon}
                  onChange={(val) => updateFeature(index, 'icon', val)}
                  placeholder="fa-rocket"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{currentLang === 'tr' ? 'Renk' : 'Color'}</label>
                  <select
                    value={feature.color}
                    onChange={(e) => updateFeature(index, 'color', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent"
                  >
                    <option value="bg-gradient-to-br from-blue-500 to-blue-600">{currentLang === 'tr' ? 'Mavi' : 'Blue'}</option>
                    <option value="bg-gradient-to-br from-green-500 to-green-600">{currentLang === 'tr' ? 'Yeşil' : 'Green'}</option>
                    <option value="bg-gradient-to-br from-purple-500 to-purple-600">{currentLang === 'tr' ? 'Mor' : 'Purple'}</option>
                    <option value="bg-gradient-to-br from-orange-500 to-orange-600">{currentLang === 'tr' ? 'Turuncu' : 'Orange'}</option>
                  </select>
                </div>

                <Input
                  label={currentLang === 'tr' ? 'Başlık' : 'Title'}
                  value={feature.title}
                  onChange={(val) => updateFeature(index, 'title', val)}
                  placeholder={currentLang === 'tr' ? 'Hızlı Entegrasyon' : 'Fast Integration'}
                />

                <TextArea
                  label={currentLang === 'tr' ? 'Açıklama' : 'Description'}
                  value={feature.description}
                  onChange={(val) => updateFeature(index, 'description', val)}
                  placeholder={currentLang === 'tr' ? 'Pazaryeri mağazalarınızı dakikalar içinde...' : 'Connect your marketplace stores in minutes...'}
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
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

export default FeaturesEditor;
