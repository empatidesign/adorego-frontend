import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, Button, Select } from '../../components/forms/FormComponents';
import ImageUpload from '../../components/forms/ImageUpload';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';

const PartnersEditor: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [partnersTR, setPartnersTR] = useState<any[]>([]);
  const [partnersEN, setPartnersEN] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const dataTR = await contentAPI.getPartners('tr');
      const dataEN = await contentAPI.getPartners('en');
      setPartnersTR(dataTR);
      setPartnersEN(dataEN);
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
      await contentAPI.updatePartners(partnersTR, 'tr');
      await contentAPI.updatePartners(partnersEN, 'en');
      setMessage({ type: 'success', text: 'Partnerler her iki dil için başarıyla güncellendi!' });
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

  const currentPartners = currentLang === 'tr' ? partnersTR : partnersEN;
  const setCurrentPartners = currentLang === 'tr' ? setPartnersTR : setPartnersEN;

  const updatePartner = (index: number, field: string, value: string) => {
    const newPartners = [...currentPartners];
    newPartners[index][field] = value;
    setCurrentPartners(newPartners);
  };

  const addPartner = () => {
    setCurrentPartners([...currentPartners, { name: '', logo: '' }]);
  };

  const removePartner = (index: number) => {
    const newPartners = currentPartners.filter((_, i) => i !== index);
    setCurrentPartners(newPartners);
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Partnerler</h1>
        <p className="text-gray-600 mb-8">Partner logolarını yönetin (Çift Dilli)</p>

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

        <div className="space-y-4">
          {currentPartners.map((partner, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-gray-800">Partner {index + 1}</h3>
                <button
                  onClick={() => removePartner(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
              
              <div className="space-y-4">
                <Input
                  label={currentLang === 'tr' ? 'Partner Adı' : 'Partner Name'}
                  value={partner.name}
                  onChange={(val) => updatePartner(index, 'name', val)}
                  placeholder="DHL"
                />

                <ImageUpload
                  label={currentLang === 'tr' ? 'Partner Logosu (opsiyonel)' : 'Partner Logo (optional)'}
                  currentImage={partner.logo}
                  onImageUploaded={(url) => updatePartner(index, 'logo', url)}
                />

                <Select
                  label={currentLang === 'tr' ? 'Renk (Logo yoksa kullanılır)' : 'Color (used if no logo)'}
                  value={partner.color || 'bg-gradient-to-br from-blue-500 to-blue-600'}
                  onChange={(val) => updatePartner(index, 'color', val)}
                  options={[
                    { label: 'Sarı-Kırmızı (DHL)', value: 'bg-gradient-to-br from-yellow-400 to-red-500' },
                    { label: 'Mor-Turuncu (FedEx)', value: 'bg-gradient-to-br from-purple-500 to-orange-500' },
                    { label: 'Sarı-Kahve (UPS)', value: 'bg-gradient-to-br from-yellow-600 to-yellow-700' },
                    { label: 'Turuncu-Kırmızı (TNT)', value: 'bg-gradient-to-br from-orange-500 to-red-600' },
                    { label: 'Mavi', value: 'bg-gradient-to-br from-blue-500 to-blue-600' },
                    { label: 'Yeşil', value: 'bg-gradient-to-br from-green-500 to-green-600' },
                    { label: 'Gri', value: 'bg-gradient-to-br from-gray-400 to-gray-600' },
                  ]}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addPartner}
          className="mt-4 px-6 py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#4DB848] hover:text-[#4DB848] transition-colors w-full"
        >
          <i className="fas fa-plus mr-2"></i>
          {currentLang === 'tr' ? 'Yeni Partner Ekle' : 'Add New Partner'}
        </button>

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

export default PartnersEditor;
