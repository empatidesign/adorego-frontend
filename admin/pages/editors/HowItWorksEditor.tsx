import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, TextArea, Button } from '../../components/forms/FormComponents';
import ImageUpload from '../../components/forms/ImageUpload';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';

const HowItWorksEditor: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [howItWorksTR, setHowItWorksTR] = useState<any>({
    badge: '',
    title: '',
    titleHighlight: '',
    steps: [],
    buttons: []
  });

  const [howItWorksEN, setHowItWorksEN] = useState<any>({
    badge: '',
    title: '',
    titleHighlight: '',
    steps: [],
    buttons: []
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const dataTR = await contentAPI.getHowItWorks('tr');
      const dataEN = await contentAPI.getHowItWorks('en');
      setHowItWorksTR(dataTR);
      setHowItWorksEN(dataEN);
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
      await contentAPI.updateHowItWorks(howItWorksTR, 'tr');
      await contentAPI.updateHowItWorks(howItWorksEN, 'en');
      setMessage({ type: 'success', text: 'Nasıl Çalışır her iki dil için başarıyla güncellendi!' });
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

  const currentData = currentLang === 'tr' ? howItWorksTR : howItWorksEN;
  const setCurrentData = currentLang === 'tr' ? setHowItWorksTR : setHowItWorksEN;

  // Step Functions
  const updateStep = (index: number, field: string, value: string) => {
    const newSteps = [...currentData.steps];
    newSteps[index][field] = value;
    setCurrentData({ ...currentData, steps: newSteps });
  };

  const addStep = () => {
    const newId = Date.now().toString();
    const newOrder = currentData.steps.length;
    setCurrentData({
      ...currentData,
      steps: [...currentData.steps, { 
        id: newId, 
        icon: '', 
        title: '', 
        description: '', 
        color: 'bg-blue-500', 
        image: '',
        order: newOrder 
      }]
    });
  };

  const removeStep = (index: number) => {
    const newSteps = currentData.steps.filter((_, i) => i !== index);
    const reorderedSteps = newSteps.map((item, idx) => ({ ...item, order: idx }));
    setCurrentData({ ...currentData, steps: reorderedSteps });
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...currentData.steps];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newSteps.length) return;
    [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
    newSteps[index].order = index;
    newSteps[newIndex].order = newIndex;
    setCurrentData({ ...currentData, steps: newSteps });
  };

  // Button Functions
  const updateButton = (index: number, field: string, value: string) => {
    const newButtons = [...currentData.buttons];
    newButtons[index][field] = value;
    setCurrentData({ ...currentData, buttons: newButtons });
  };

  const addButton = () => {
    const newId = Date.now().toString();
    const newOrder = currentData.buttons.length;
    setCurrentData({
      ...currentData,
      buttons: [...currentData.buttons, { 
        id: newId, 
        text: '', 
        link: '#', 
        style: 'primary',
        icon: '',
        order: newOrder 
      }]
    });
  };

  const removeButton = (index: number) => {
    const newButtons = currentData.buttons.filter((_, i) => i !== index);
    const reorderedButtons = newButtons.map((item, idx) => ({ ...item, order: idx }));
    setCurrentData({ ...currentData, buttons: reorderedButtons });
  };

  const moveButton = (index: number, direction: 'up' | 'down') => {
    const newButtons = [...currentData.buttons];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newButtons.length) return;
    [newButtons[index], newButtons[newIndex]] = [newButtons[newIndex], newButtons[index]];
    newButtons[index].order = index;
    newButtons[newIndex].order = newIndex;
    setCurrentData({ ...currentData, buttons: newButtons });
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Nasıl Çalışır?</h1>
        <p className="text-gray-600 mb-8">Süreç adımları ve butonları yönetin (Çift Dilli)</p>

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
          {/* Başlık Bilgileri */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fas fa-heading text-blue-500"></i>
              {currentLang === 'tr' ? 'Başlık Bilgileri' : 'Title Information'}
            </h3>

            <div className="space-y-4">
              <Input
                label={currentLang === 'tr' ? 'Rozet Metni' : 'Badge Text'}
                value={currentData.badge}
                onChange={(val) => setCurrentData({ ...currentData, badge: val })}
                placeholder={currentLang === 'tr' ? 'SÜREÇ' : 'PROCESS'}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={currentLang === 'tr' ? 'Ana Başlık' : 'Main Title'}
                  value={currentData.title}
                  onChange={(val) => setCurrentData({ ...currentData, title: val })}
                  placeholder={currentLang === 'tr' ? 'Yurtdışı Kargo' : 'International Shipping'}
                />
                <Input
                  label={currentLang === 'tr' ? 'Vurgulu Başlık (Yeşil)' : 'Highlight Title (Green)'}
                  value={currentData.titleHighlight}
                  onChange={(val) => setCurrentData({ ...currentData, titleHighlight: val })}
                  placeholder={currentLang === 'tr' ? 'Nasıl Çalışır?' : 'How It Works?'}
                />
              </div>
            </div>
          </div>

          {/* Adımlar */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <i className="fas fa-list-ol text-green-500"></i>
                {currentLang === 'tr' ? 'Adımlar' : 'Steps'}
              </h3>
              <button
                onClick={addStep}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
              >
                <i className="fas fa-plus mr-2"></i>
                {currentLang === 'tr' ? 'Adım Ekle' : 'Add Step'}
              </button>
            </div>

            <div className="space-y-4">
              {currentData.steps?.map((step, index) => (
                <div key={step.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-bold text-gray-800">{currentLang === 'tr' ? `Adım ${index + 1}` : `Step ${index + 1}`}</h4>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveStep(index, 'up')}
                        disabled={index === 0}
                        className={`p-2 rounded ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50'}`}
                      >
                        <i className="fas fa-arrow-up"></i>
                      </button>
                      <button
                        onClick={() => moveStep(index, 'down')}
                        disabled={index === currentData.steps.length - 1}
                        className={`p-2 rounded ${index === currentData.steps.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50'}`}
                      >
                        <i className="fas fa-arrow-down"></i>
                      </button>
                      <button
                        onClick={() => removeStep(index)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label={currentLang === 'tr' ? 'İkon (FontAwesome)' : 'Icon (FontAwesome)'}
                        value={step.icon}
                        onChange={(val) => updateStep(index, 'icon', val)}
                        placeholder="fa-search-dollar"
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{currentLang === 'tr' ? 'Renk' : 'Color'}</label>
                        <select
                          value={step.color}
                          onChange={(e) => updateStep(index, 'color', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent"
                        >
                          <option value="bg-blue-500">{currentLang === 'tr' ? 'Mavi' : 'Blue'}</option>
                          <option value="bg-[#4DB848]">{currentLang === 'tr' ? 'Yeşil' : 'Green'}</option>
                          <option value="bg-[#102477]">{currentLang === 'tr' ? 'Koyu Mavi' : 'Dark Blue'}</option>
                          <option value="bg-purple-500">{currentLang === 'tr' ? 'Mor' : 'Purple'}</option>
                          <option value="bg-orange-500">{currentLang === 'tr' ? 'Turuncu' : 'Orange'}</option>
                        </select>
                      </div>
                    </div>

                    <Input
                      label={currentLang === 'tr' ? 'Başlık' : 'Title'}
                      value={step.title}
                      onChange={(val) => updateStep(index, 'title', val)}
                      placeholder={currentLang === 'tr' ? 'En Uygun Fiyatı Anında Görürsün' : 'Get the Best Price Instantly'}
                    />

                    <TextArea
                      label={currentLang === 'tr' ? 'Açıklama' : 'Description'}
                      value={step.description}
                      onChange={(val) => updateStep(index, 'description', val)}
                      placeholder={currentLang === 'tr' ? 'Göndereceğin ülkeyi ve paketin bilgilerini girersin...' : 'Enter your destination country and package details...'}
                      rows={3}
                    />

                    <ImageUpload
                      label={currentLang === 'tr' ? 'Görsel' : 'Image'}
                      currentImage={step.image}
                      onImageUploaded={(url) => updateStep(index, 'image', url)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Butonlar */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <i className="fas fa-hand-pointer text-purple-500"></i>
                {currentLang === 'tr' ? 'Alt Butonlar' : 'Bottom Buttons'}
              </h3>
              <button
                onClick={addButton}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
              >
                <i className="fas fa-plus mr-2"></i>
                {currentLang === 'tr' ? 'Buton Ekle' : 'Add Button'}
              </button>
            </div>

            <div className="space-y-4">
              {currentData.buttons?.map((button, index) => (
                <div key={button.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700">{currentLang === 'tr' ? `Buton ${index + 1}` : `Button ${index + 1}`}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveButton(index, 'up')}
                        disabled={index === 0}
                        className={`p-2 rounded ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50'}`}
                      >
                        <i className="fas fa-arrow-up"></i>
                      </button>
                      <button
                        onClick={() => moveButton(index, 'down')}
                        disabled={index === currentData.buttons.length - 1}
                        className={`p-2 rounded ${index === currentData.buttons.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50'}`}
                      >
                        <i className="fas fa-arrow-down"></i>
                      </button>
                      <button
                        onClick={() => removeButton(index)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label={currentLang === 'tr' ? 'Buton Metni' : 'Button Text'}
                      value={button.text}
                      onChange={(val) => updateButton(index, 'text', val)}
                      placeholder={currentLang === 'tr' ? 'Fiyatı Gör' : 'Get Price'}
                    />
                    <Input
                      label="Link"
                      value={button.link}
                      onChange={(val) => updateButton(index, 'link', val)}
                      placeholder="#fiyat"
                    />
                    <Input
                      label={currentLang === 'tr' ? 'İkon (FontAwesome)' : 'Icon (FontAwesome)'}
                      value={button.icon || ''}
                      onChange={(val) => updateButton(index, 'icon', val)}
                      placeholder="fa-arrow-right"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{currentLang === 'tr' ? 'Stil' : 'Style'}</label>
                      <select
                        value={button.style}
                        onChange={(e) => updateButton(index, 'style', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent"
                      >
                        <option value="primary">{currentLang === 'tr' ? 'Birincil (Mavi Dolgu)' : 'Primary (Blue Fill)'}</option>
                        <option value="secondary">{currentLang === 'tr' ? 'İkincil (Metin)' : 'Secondary (Text)'}</option>
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

export default HowItWorksEditor;
