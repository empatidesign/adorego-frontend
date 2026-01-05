import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, TextArea, Button, Select } from '../../components/forms/FormComponents';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';

const SolutionsEditor: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [solutionsDataTR, setSolutionsDataTR] = useState<any>({
    badge: '',
    title: '',
    highlightedTitle: '',
    buttonText: '',
    buttonLink: '',
    services: [],
    shippingOptions: []
  });

  const [solutionsDataEN, setSolutionsDataEN] = useState<any>({
    badge: '',
    title: '',
    highlightedTitle: '',
    buttonText: '',
    buttonLink: '',
    services: [],
    shippingOptions: []
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const dataTR = await contentAPI.getSolutions('tr');
      const dataEN = await contentAPI.getSolutions('en');
      setSolutionsDataTR(dataTR);
      setSolutionsDataEN(dataEN);
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
      await contentAPI.updateSolutions(solutionsDataTR, 'tr');
      await contentAPI.updateSolutions(solutionsDataEN, 'en');
      setMessage({ type: 'success', text: 'Solutions bölümü her iki dil için başarıyla güncellendi!' });
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

  const currentData = currentLang === 'tr' ? solutionsDataTR : solutionsDataEN;
  const setCurrentData = currentLang === 'tr' ? setSolutionsDataTR : setSolutionsDataEN;

  // Service yönetimi
  const addService = () => {
    const newId = Date.now().toString();
    setCurrentData((prev: any) => ({
      ...prev,
      services: [...prev.services, { 
        id: newId, 
        title: '', 
        desc: '', 
        icon: 'fa-box', 
        color: 'bg-blue-500', 
        bgColor: 'bg-blue-50',
        order: prev.services.length 
      }],
    }));
  };

  const removeService = (index: number) => {
    setCurrentData((prev: any) => ({
      ...prev,
      services: prev.services.filter((_: any, i: number) => i !== index).map((item: any, idx: number) => ({ ...item, order: idx })),
    }));
  };

  const updateService = (index: number, field: string, value: string) => {
    setCurrentData((prev: any) => {
      const newServices = [...prev.services];
      newServices[index] = { ...newServices[index], [field]: value };
      return { ...prev, services: newServices };
    });
  };

  const moveService = (index: number, direction: 'up' | 'down') => {
    setCurrentData((prev: any) => {
      const newServices = [...prev.services];
      const [movedItem] = newServices.splice(index, 1);
      if (direction === 'up') {
        newServices.splice(index - 1, 0, movedItem);
      } else {
        newServices.splice(index + 1, 0, movedItem);
      }
      return { ...prev, services: newServices.map((item: any, idx: number) => ({ ...item, order: idx })) };
    });
  };

  // Shipping Option yönetimi
  const addShippingOption = () => {
    const newId = Date.now().toString();
    setCurrentData((prev: any) => ({
      ...prev,
      shippingOptions: [...prev.shippingOptions, { 
        id: newId, 
        title: '', 
        subtitle: '',
        icon: 'fa-shipping-fast',
        color: 'bg-green-500',
        description: '', 
        features: [],
        order: prev.shippingOptions.length 
      }],
    }));
  };

  const removeShippingOption = (index: number) => {
    setCurrentData((prev: any) => ({
      ...prev,
      shippingOptions: prev.shippingOptions.filter((_: any, i: number) => i !== index).map((item: any, idx: number) => ({ ...item, order: idx })),
    }));
  };

  const updateShippingOption = (index: number, field: string, value: any) => {
    setCurrentData((prev: any) => {
      const newOptions = [...prev.shippingOptions];
      newOptions[index] = { ...newOptions[index], [field]: value };
      return { ...prev, shippingOptions: newOptions };
    });
  };

  const moveShippingOption = (index: number, direction: 'up' | 'down') => {
    setCurrentData((prev: any) => {
      const newOptions = [...prev.shippingOptions];
      const [movedItem] = newOptions.splice(index, 1);
      if (direction === 'up') {
        newOptions.splice(index - 1, 0, movedItem);
      } else {
        newOptions.splice(index + 1, 0, movedItem);
      }
      return { ...prev, shippingOptions: newOptions.map((item: any, idx: number) => ({ ...item, order: idx })) };
    });
  };

  const addFeature = (optionIndex: number) => {
    setCurrentData((prev: any) => {
      const newOptions = [...prev.shippingOptions];
      newOptions[optionIndex].features = [...(newOptions[optionIndex].features || []), ''];
      return { ...prev, shippingOptions: newOptions };
    });
  };

  const removeFeature = (optionIndex: number, featureIndex: number) => {
    setCurrentData((prev: any) => {
      const newOptions = [...prev.shippingOptions];
      newOptions[optionIndex].features = newOptions[optionIndex].features.filter((_: any, i: number) => i !== featureIndex);
      return { ...prev, shippingOptions: newOptions };
    });
  };

  const updateFeature = (optionIndex: number, featureIndex: number, value: string) => {
    setCurrentData((prev: any) => {
      const newOptions = [...prev.shippingOptions];
      newOptions[optionIndex].features[featureIndex] = value;
      return { ...prev, shippingOptions: newOptions };
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Akıllı Gönderim Bölümü</h1>
        <p className="text-gray-600 mb-8">Özel çözümler ve gönderim seçeneklerini yönetin</p>

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
            label="Rozet Metni (Örn: ÖZEL ÇÖZÜMLER)"
            value={currentData.badge}
            onChange={(val) => setCurrentData({ ...currentData, badge: val })}
            placeholder={currentLang === 'tr' ? "ÖZEL ÇÖZÜMLER" : "SPECIAL SOLUTIONS"}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Ana Başlık"
              value={currentData.title}
              onChange={(val) => setCurrentData({ ...currentData, title: val })}
              placeholder={currentLang === 'tr' ? "İhtiyacına Göre" : "Smart Shipping"}
            />
            <Input
              label="Vurgulu Başlık"
              value={currentData.highlightedTitle}
              onChange={(val) => setCurrentData({ ...currentData, highlightedTitle: val })}
              placeholder={currentLang === 'tr' ? "Akıllı Gönderim." : "Based on Your Needs."}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Buton Metni"
              value={currentData.buttonText}
              onChange={(val) => setCurrentData({ ...currentData, buttonText: val })}
              placeholder={currentLang === 'tr' ? "HEMEN BAŞLA" : "GET STARTED"}
            />
            <Input
              label="Buton Linki"
              value={currentData.buttonLink}
              onChange={(val) => setCurrentData({ ...currentData, buttonLink: val })}
              placeholder="#kayit"
            />
          </div>
        </div>

        {/* Özel Servisler (Sol Taraf) */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <i className="fas fa-boxes text-[#102477]"></i>
              Özel Servisler (Sol Taraf)
            </h3>
            <button
              onClick={addService}
              className="px-4 py-2 bg-[#4DB848] text-white rounded-lg hover:bg-[#3da339] transition-colors text-sm font-medium"
            >
              <i className="fas fa-plus mr-2"></i>
              Servis Ekle
            </button>
          </div>

          <div className="space-y-4">
            {currentData.services?.sort((a: any, b: any) => a.order - b.order).map((service: any, index: number) => (
              <div key={service.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-700">Servis {index + 1}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveService(index, 'up')}
                      disabled={index === 0}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <i className="fas fa-arrow-up"></i>
                    </button>
                    <button
                      onClick={() => moveService(index, 'down')}
                      disabled={index === currentData.services.length - 1}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <i className="fas fa-arrow-down"></i>
                    </button>
                    <button
                      onClick={() => removeService(index)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>

                <Input
                  label="Başlık"
                  value={service.title}
                  onChange={(val) => updateService(index, 'title', val)}
                  placeholder="Mikro İhracat Satış Amaçlı Gönderimler"
                />

                <TextArea
                  label="Açıklama"
                  value={service.desc}
                  onChange={(val) => updateService(index, 'desc', val)}
                  placeholder="Yurtdışına ürün satışı yapıyorsan..."
                  rows={2}
                />

                <div className="grid grid-cols-3 gap-4">
                  <Input
                    label="İkon (FontAwesome)"
                    value={service.icon}
                    onChange={(val) => updateService(index, 'icon', val)}
                    placeholder="fa-box-open"
                  />
                  <Select
                    label="Renk"
                    value={service.color}
                    onChange={(val) => updateService(index, 'color', val)}
                    options={[
                      { label: 'Mavi', value: 'bg-blue-500' },
                      { label: 'Mor', value: 'bg-purple-500' },
                      { label: 'Yeşil', value: 'bg-green-500' },
                      { label: 'Turuncu', value: 'bg-orange-500' },
                      { label: 'Kırmızı', value: 'bg-red-500' },
                      { label: 'Sarı', value: 'bg-yellow-500' },
                    ]}
                  />
                  <Select
                    label="Arka Plan Rengi"
                    value={service.bgColor}
                    onChange={(val) => updateService(index, 'bgColor', val)}
                    options={[
                      { label: 'Açık Mavi', value: 'bg-blue-50' },
                      { label: 'Açık Mor', value: 'bg-purple-50' },
                      { label: 'Açık Yeşil', value: 'bg-green-50' },
                      { label: 'Açık Turuncu', value: 'bg-orange-50' },
                      { label: 'Açık Kırmızı', value: 'bg-red-50' },
                      { label: 'Açık Sarı', value: 'bg-yellow-50' },
                    ]}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gönderim Seçenekleri (Sağ Taraf) */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <i className="fas fa-shipping-fast text-[#102477]"></i>
              Gönderim Seçenekleri (Sağ Taraf)
            </h3>
            <button
              onClick={addShippingOption}
              className="px-4 py-2 bg-[#102477] text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
            >
              <i className="fas fa-plus mr-2"></i>
              Seçenek Ekle
            </button>
          </div>

          <div className="space-y-4">
            {currentData.shippingOptions?.sort((a: any, b: any) => a.order - b.order).map((option: any, index: number) => (
              <div key={option.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-700">Seçenek {index + 1}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveShippingOption(index, 'up')}
                      disabled={index === 0}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <i className="fas fa-arrow-up"></i>
                    </button>
                    <button
                      onClick={() => moveShippingOption(index, 'down')}
                      disabled={index === currentData.shippingOptions.length - 1}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <i className="fas fa-arrow-down"></i>
                    </button>
                    <button
                      onClick={() => removeShippingOption(index)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Başlık"
                    value={option.title}
                    onChange={(val) => updateShippingOption(index, 'title', val)}
                    placeholder="Ekonomik Kargo"
                  />
                  <Input
                    label="Alt Başlık"
                    value={option.subtitle}
                    onChange={(val) => updateShippingOption(index, 'subtitle', val)}
                    placeholder="Fiyat Öncelikliyse"
                  />
                </div>

                <TextArea
                  label="Açıklama"
                  value={option.description}
                  onChange={(val) => updateShippingOption(index, 'description', val)}
                  placeholder="Maliyetinizi düşürün..."
                  rows={2}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="İkon (FontAwesome)"
                    value={option.icon}
                    onChange={(val) => updateShippingOption(index, 'icon', val)}
                    placeholder="fa-coins"
                  />
                  <Select
                    label="Renk"
                    value={option.color}
                    onChange={(val) => updateShippingOption(index, 'color', val)}
                    options={[
                      { label: 'Yeşil', value: 'bg-green-500' },
                      { label: 'Sarı', value: 'bg-yellow-500' },
                      { label: 'Mavi', value: 'bg-blue-500' },
                      { label: 'Mor', value: 'bg-purple-500' },
                      { label: 'Turuncu', value: 'bg-orange-500' },
                    ]}
                  />
                </div>

                {/* Özellikler */}
                <div className="mt-4 border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Özellikler</label>
                    <button
                      onClick={() => addFeature(index)}
                      className="text-sm text-[#4DB848] hover:text-[#3da339] font-medium"
                    >
                      <i className="fas fa-plus mr-1"></i>
                      Özellik Ekle
                    </button>
                  </div>
                  <div className="space-y-2">
                    {option.features?.map((feature: string, fIndex: number) => (
                      <div key={fIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, fIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent text-sm"
                          placeholder="En uygun fiyat"
                        />
                        <button
                          onClick={() => removeFeature(index, fIndex)}
                          className="text-red-500 hover:text-red-700 px-2"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
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

export default SolutionsEditor;
