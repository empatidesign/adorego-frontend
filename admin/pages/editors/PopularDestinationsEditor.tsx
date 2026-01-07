import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, Button } from '../../components/forms/FormComponents';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';

const PopularDestinationsEditor: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [dataTR, setDataTR] = useState<any>({
    badge: '',
    title: '',
    destinations: []
  });

  const [dataEN, setDataEN] = useState<any>({
    badge: '',
    title: '',
    destinations: []
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const resTR = await contentAPI.getPopularDestinations('tr');
      const resEN = await contentAPI.getPopularDestinations('en');
      
      // Default değerler
      const defaultTR = {
        badge: 'POPÜLER ÜLKELER',
        title: 'Dünyaya Bizimle Ulaşın.',
        destinations: [
          {
            image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070",
            name: "Almanya",
            price: "12.50",
            currency: "€",
            tag: "Express Servis",
            priceLabel: "Başlangıç"
          },
          {
            image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2070",
            name: "ABD",
            price: "24.90",
            currency: "€",
            tag: "Ekonomik",
            priceLabel: "Başlangıç"
          },
          {
            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070",
            name: "İngiltere",
            price: "18.00",
            currency: "€",
            tag: "Sık Gönderilen",
            priceLabel: "Başlangıç"
          },
          {
            image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2070",
            name: "Hollanda",
            price: "11.20",
            currency: "€",
            tag: "Kolay Gümrük",
            priceLabel: "Başlangıç"
          }
        ]
      };

      const defaultEN = {
        badge: 'POPULAR COUNTRIES',
        title: 'Reach the World with Us.',
        destinations: [
          {
            image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070",
            name: "Germany",
            price: "12.50",
            currency: "€",
            tag: "Express Service",
            priceLabel: "Starting from"
          },
          {
            image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2070",
            name: "USA",
            price: "24.90",
            currency: "€",
            tag: "Economical",
            priceLabel: "Starting from"
          },
          {
            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070",
            name: "UK",
            price: "18.00",
            currency: "€",
            tag: "Frequently Sent",
            priceLabel: "Starting from"
          },
          {
            image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2070",
            name: "Netherlands",
            price: "11.20",
            currency: "€",
            tag: "Easy Customs",
            priceLabel: "Starting from"
          }
        ]
      };

      // API'den gelen veriyi default ile merge et
      const mergeTR = (resTR && Object.keys(resTR).length > 0) ? {
        badge: resTR.badge || defaultTR.badge,
        title: resTR.title || defaultTR.title,
        destinations: (resTR.destinations && resTR.destinations.length > 0) 
          ? resTR.destinations 
          : defaultTR.destinations
      } : defaultTR;

      const mergeEN = (resEN && Object.keys(resEN).length > 0) ? {
        badge: resEN.badge || defaultEN.badge,
        title: resEN.title || defaultEN.title,
        destinations: (resEN.destinations && resEN.destinations.length > 0) 
          ? resEN.destinations 
          : defaultEN.destinations
      } : defaultEN;

      setDataTR(mergeTR);
      setDataEN(mergeEN);
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
      await contentAPI.updatePopularDestinations(dataTR, 'tr');
      await contentAPI.updatePopularDestinations(dataEN, 'en');
      setMessage({ type: 'success', text: 'Popüler Ülkeler bölümü her iki dil için başarıyla güncellendi!' });
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

  const currentData = currentLang === 'tr' ? dataTR : dataEN;
  const setCurrentData = currentLang === 'tr' ? setDataTR : setDataEN;

  // Destination yönetimi
  const addDestination = () => {
    setCurrentData((prev: any) => ({
      ...prev,
      destinations: [...prev.destinations, {
        image: '',
        name: '',
        price: '',
        currency: '€',
        tag: '',
        priceLabel: currentLang === 'tr' ? 'Başlangıç' : 'Starting from'
      }]
    }));
  };

  const removeDestination = (index: number) => {
    setCurrentData((prev: any) => ({
      ...prev,
      destinations: prev.destinations.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateDestination = (index: number, field: string, value: string) => {
    setCurrentData((prev: any) => {
      const newDestinations = [...prev.destinations];
      newDestinations[index] = { ...newDestinations[index], [field]: value };
      return { ...prev, destinations: newDestinations };
    });
  };

  const moveDestination = (index: number, direction: 'up' | 'down') => {
    setCurrentData((prev: any) => {
      const newDestinations = [...prev.destinations];
      const [movedItem] = newDestinations.splice(index, 1);
      if (direction === 'up') {
        newDestinations.splice(index - 1, 0, movedItem);
      } else {
        newDestinations.splice(index + 1, 0, movedItem);
      }
      return { ...prev, destinations: newDestinations };
    });
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
      <div className="max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Popüler Ülkeler</h1>
        <p className="text-gray-600 mb-8">Popüler destinasyonları ve fiyatları yönetin</p>

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

        {/* Başlık Bilgileri */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-heading text-[#4DB848]"></i>
            Başlık Bilgileri
          </h3>
          
          <Input
            label="Rozet Metni"
            value={currentData.badge}
            onChange={(val) => setCurrentData({ ...currentData, badge: val })}
            placeholder={currentLang === 'tr' ? 'POPÜLER ÜLKELER' : 'POPULAR COUNTRIES'}
          />

          <Input
            label="Ana Başlık"
            value={currentData.title}
            onChange={(val) => setCurrentData({ ...currentData, title: val })}
            placeholder={currentLang === 'tr' ? 'Dünyaya Bizimle Ulaşın.' : 'Reach the World with Us.'}
          />
        </div>

        {/* Destinasyonlar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <i className="fas fa-globe text-[#102477]"></i>
              Destinasyonlar
            </h3>
            <button
              onClick={addDestination}
              className="px-4 py-2 bg-[#4DB848] text-white rounded-lg hover:bg-[#3da339] transition-colors text-sm font-medium"
            >
              <i className="fas fa-plus mr-2"></i>
              Destinasyon Ekle
            </button>
          </div>

          <div className="space-y-4">
            {currentData.destinations?.map((dest: any, index: number) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-700">Destinasyon {index + 1}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveDestination(index, 'up')}
                      disabled={index === 0}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <i className="fas fa-arrow-up"></i>
                    </button>
                    <button
                      onClick={() => moveDestination(index, 'down')}
                      disabled={index === currentData.destinations.length - 1}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <i className="fas fa-arrow-down"></i>
                    </button>
                    <button
                      onClick={() => removeDestination(index)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>

                <Input
                  label="Görsel URL"
                  value={dest.image}
                  onChange={(val) => updateDestination(index, 'image', val)}
                  placeholder="https://images.unsplash.com/..."
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Ülke Adı"
                    value={dest.name}
                    onChange={(val) => updateDestination(index, 'name', val)}
                    placeholder={currentLang === 'tr' ? 'Almanya' : 'Germany'}
                  />
                  <Input
                    label="Etiket"
                    value={dest.tag}
                    onChange={(val) => updateDestination(index, 'tag', val)}
                    placeholder={currentLang === 'tr' ? 'Express Servis' : 'Express Service'}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Input
                    label="Fiyat"
                    value={dest.price}
                    onChange={(val) => updateDestination(index, 'price', val)}
                    placeholder="12.50"
                  />
                  <Input
                    label="Para Birimi"
                    value={dest.currency}
                    onChange={(val) => updateDestination(index, 'currency', val)}
                    placeholder="€"
                  />
                  <Input
                    label="Fiyat Etiketi"
                    value={dest.priceLabel}
                    onChange={(val) => updateDestination(index, 'priceLabel', val)}
                    placeholder={currentLang === 'tr' ? 'Başlangıç' : 'Starting from'}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-6">
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

export default PopularDestinationsEditor;
