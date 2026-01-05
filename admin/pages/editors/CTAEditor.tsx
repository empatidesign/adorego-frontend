import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, TextArea, Button } from '../../components/forms/FormComponents';
import ImageUpload from '../../components/forms/ImageUpload';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';

const CTAEditor: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [ctaDataTR, setCtaDataTR] = useState({
    title: '',
    subtitle: '',
    buttonText: '',
    buttonLink: '',
    backgroundImage: ''
  });

  const [ctaDataEN, setCtaDataEN] = useState({
    title: '',
    subtitle: '',
    buttonText: '',
    buttonLink: '',
    backgroundImage: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const dataTR = await contentAPI.getCta('tr');
      const dataEN = await contentAPI.getCta('en');
      setCtaDataTR(dataTR);
      setCtaDataEN(dataEN);
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
      await contentAPI.updateCta(ctaDataTR, 'tr');
      await contentAPI.updateCta(ctaDataEN, 'en');
      setMessage({ type: 'success', text: 'CTA Banner her iki dil için başarıyla güncellendi!' });
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

  const currentCtaData = currentLang === 'tr' ? ctaDataTR : ctaDataEN;
  const setCurrentCtaData = currentLang === 'tr' ? setCtaDataTR : setCtaDataEN;

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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">CTA Banner</h1>
        <p className="text-gray-600 mb-8">Çağrı banner'ını düzenleyin (Çift Dilli)</p>

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
            <i className="fas fa-bullhorn text-orange-500"></i>
            {currentLang === 'tr' ? 'Banner İçeriği' : 'Banner Content'}
          </h3>

          <Input
            label={currentLang === 'tr' ? 'Ana Başlık' : 'Main Title'}
            value={currentCtaData.title}
            onChange={(val) => setCurrentCtaData({ ...currentCtaData, title: val })}
            placeholder={currentLang === 'tr' ? "Yurtdışına Açılmanın En Kolay Yolu." : "The Easiest Way to Go International."}
          />

          <TextArea
            label={currentLang === 'tr' ? 'Alt Başlık' : 'Subtitle'}
            value={currentCtaData.subtitle}
            onChange={(val) => setCurrentCtaData({ ...currentCtaData, subtitle: val })}
            placeholder={currentLang === 'tr' ? "Hemen kayıt olun, ilk gönderinizde adoreGo farkını yaşayın." : "Sign up now and experience the adoreGo difference with your first shipment."}
            rows={2}
          />

          <div className="border-t pt-6">
            <h4 className="font-bold text-gray-800 mb-4">{currentLang === 'tr' ? 'Buton Ayarları' : 'Button Settings'}</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={currentLang === 'tr' ? 'Buton Metni' : 'Button Text'}
                value={currentCtaData.buttonText}
                onChange={(val) => setCurrentCtaData({ ...currentCtaData, buttonText: val })}
                placeholder={currentLang === 'tr' ? "ÜCRETSİZ KAYIT" : "FREE SIGN UP"}
              />
              <Input
                label={currentLang === 'tr' ? 'Buton Linki' : 'Button Link'}
                value={currentCtaData.buttonLink}
                onChange={(val) => setCurrentCtaData({ ...currentCtaData, buttonLink: val })}
                placeholder="#kayit"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <ImageUpload
              label={currentLang === 'tr' ? 'Arka Plan Görseli' : 'Background Image'}
              currentImage={currentCtaData.backgroundImage}
              onImageUploaded={(url) => setCurrentCtaData({ ...currentCtaData, backgroundImage: url })}
            />
            <p className="text-sm text-gray-500 mt-2">
              {currentLang === 'tr' 
                ? 'Öneri: 2070x800 piksel veya daha büyük, koyu renkli bir görsel kullanın.' 
                : 'Recommendation: Use a dark-colored image of 2070x800 pixels or larger.'}
            </p>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (currentLang === 'tr' ? 'Kaydediliyor...' : 'Saving...') : (currentLang === 'tr' ? 'Değişiklikleri Kaydet' : 'Save Changes')}
            </Button>
            <Button onClick={handleCancel} variant="secondary">
              {currentLang === 'tr' ? 'İptal' : 'Cancel'}
            </Button>
          </div>
        </div>

        {/* Önizleme */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-eye text-blue-500"></i>
            {currentLang === 'tr' ? 'Önizleme' : 'Preview'}
          </h3>
          
          <div className="relative rounded-lg overflow-hidden min-h-[200px] flex items-center shadow-lg">
            <img 
              src={currentCtaData.backgroundImage || 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop'} 
              className="absolute inset-0 w-full h-full object-cover" 
              alt="CTA Background"
            />
            <div className="absolute inset-0 bg-[#102477]/90 backdrop-blur-[2px]"></div>
            <div className="relative z-10 p-8 w-full lg:flex items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{currentCtaData.title || (currentLang === 'tr' ? 'Başlık Buraya' : 'Title Here')}</h3>
                <p className="text-white/70 text-sm font-medium">{currentCtaData.subtitle || (currentLang === 'tr' ? 'Alt başlık buraya' : 'Subtitle here')}</p>
              </div>
              <div className="mt-4 lg:mt-0 flex-shrink-0">
                <button className="bg-[#4DB848] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#3da339] transition-all">
                  {currentCtaData.buttonText || (currentLang === 'tr' ? 'BUTON' : 'BUTTON')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CTAEditor;
