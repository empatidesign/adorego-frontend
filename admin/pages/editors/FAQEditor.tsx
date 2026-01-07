import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, TextArea, Button } from '../../components/forms/FormComponents';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';

const FAQEditor: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [faqTR, setFaqTR] = useState<any[]>([]);
  const [faqEN, setFaqEN] = useState<any[]>([]);
  const [headerTR, setHeaderTR] = useState({ badge: '', title: '' });
  const [headerEN, setHeaderEN] = useState({ badge: '', title: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const dataTR = await contentAPI.getFaq('tr');
      const dataEN = await contentAPI.getFaq('en');
      const headerDataTR = await contentAPI.getFaqHeader('tr');
      const headerDataEN = await contentAPI.getFaqHeader('en');
      
      // Default FAQ items
      const defaultFaqTR = [
        {
          id: "1",
          question: "Kargo ücreti nasıl hesaplanır?",
          answer: "Kargo ücretleri ağırlık, hacim ve gönderim ülkesine göre değişmektedir. Fiyat hesaplama aracımızı kullanarak anında fiyat teklifi alabilirsiniz."
        },
        {
          id: "2",
          question: "Teslimat süresi ne kadar?",
          answer: "Teslimat süreleri ülkeye ve seçilen kargo servisine göre 2-7 iş günü arasında değişmektedir."
        },
        {
          id: "3",
          question: "Paketlerim sigortalı mı?",
          answer: "Evet, tüm gönderi paketleriniz otomatik olarak sigortalanmaktadır. Ek sigorta da tercih edebilirsiniz."
        },
        {
          id: "4",
          question: "Hangi ülkelere gönderim yapabiliyorum?",
          answer: "220'den fazla ülkeye kargo gönderimi yapabiliyoruz. Detaylı liste için popüler destinasyonlar bölümünü inceleyebilirsiniz."
        }
      ];

      const defaultFaqEN = [
        {
          id: "1",
          question: "How is the shipping cost calculated?",
          answer: "Shipping costs vary depending on weight, volume, and destination country. You can get an instant quote using our price calculator."
        },
        {
          id: "2",
          question: "How long is the delivery time?",
          answer: "Delivery times vary between 2-7 business days depending on the country and selected shipping service."
        },
        {
          id: "3",
          question: "Are my packages insured?",
          answer: "Yes, all your shipping packages are automatically insured. You can also opt for additional insurance."
        },
        {
          id: "4",
          question: "Which countries can I ship to?",
          answer: "We can ship to over 220 countries. Please check the popular destinations section for a detailed list."
        }
      ];

      setFaqTR((dataTR && Array.isArray(dataTR) && dataTR.length > 0) ? dataTR : defaultFaqTR);
      setFaqEN((dataEN && Array.isArray(dataEN) && dataEN.length > 0) ? dataEN : defaultFaqEN);
      
      setHeaderTR(headerDataTR && Object.keys(headerDataTR).length > 0 ? headerDataTR : {
        badge: 'BİLGİ MERKEZİ',
        title: 'Sıkça Sorulan Sorular'
      });
      
      setHeaderEN(headerDataEN && Object.keys(headerDataEN).length > 0 ? headerDataEN : {
        badge: 'INFORMATION CENTER',
        title: 'Frequently Asked Questions'
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
      await contentAPI.updateFaq(faqTR, 'tr');
      await contentAPI.updateFaq(faqEN, 'en');
      await contentAPI.updateFaqHeader(headerTR, 'tr');
      await contentAPI.updateFaqHeader(headerEN, 'en');
      setMessage({ type: 'success', text: 'S.S.S ve başlık her iki dil için başarıyla güncellendi!' });
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

  const currentFaq = currentLang === 'tr' ? faqTR : faqEN;
  const setCurrentFaq = currentLang === 'tr' ? setFaqTR : setFaqEN;
  const currentHeader = currentLang === 'tr' ? headerTR : headerEN;
  const setCurrentHeader = currentLang === 'tr' ? setHeaderTR : setHeaderEN;

  const updateFaqItem = (index: number, field: string, value: string) => {
    const newFaq = [...currentFaq];
    newFaq[index][field] = value;
    setCurrentFaq(newFaq);
  };

  const updateHeader = (field: string, value: string) => {
    setCurrentHeader({ ...currentHeader, [field]: value });
  };

  const addFaqItem = () => {
    const newId = Date.now().toString();
    setCurrentFaq([...currentFaq, { id: newId, question: '', answer: '' }]);
  };

  const removeFaqItem = (index: number) => {
    const newFaq = currentFaq.filter((_, i) => i !== index);
    setCurrentFaq(newFaq);
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sık Sorulan Sorular (S.S.S)</h1>
        <p className="text-gray-600 mb-8">FAQ sorularını ekleyin, düzenleyin veya silin (Çift Dilli)</p>

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
              placeholder={currentLang === 'tr' ? 'BİLGİ MERKEZİ' : 'INFORMATION CENTER'}
            />

            <Input
              label={currentLang === 'tr' ? 'Ana Başlık' : 'Main Title'}
              value={currentHeader.title}
              onChange={(val) => updateHeader('title', val)}
              placeholder={currentLang === 'tr' ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}
            />
          </div>
        </div>

        <h3 className="font-bold text-gray-800 mb-4 text-lg">{currentLang === 'tr' ? 'Sorular' : 'Questions'}</h3>

        <div className="space-y-4">
          {currentFaq.map((item, index) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-gray-800">{currentLang === 'tr' ? `Soru ${index + 1}` : `Question ${index + 1}`}</h3>
                <button
                  onClick={() => removeFaqItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
              
              <div className="space-y-4">
                <Input
                  label={currentLang === 'tr' ? 'Soru' : 'Question'}
                  value={item.question}
                  onChange={(val) => updateFaqItem(index, 'question', val)}
                  placeholder={currentLang === 'tr' ? 'Kargo ücreti nasıl hesaplanır?' : 'How is the shipping cost calculated?'}
                />

                <TextArea
                  label={currentLang === 'tr' ? 'Cevap' : 'Answer'}
                  value={item.answer}
                  onChange={(val) => updateFaqItem(index, 'answer', val)}
                  placeholder={currentLang === 'tr' ? 'Kargo ücretleri ağırlık, hacim ve gönderim ülkesine göre...' : 'Shipping costs vary depending on weight, volume...'}
                  rows={4}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addFaqItem}
          className="mt-4 px-6 py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#4DB848] hover:text-[#4DB848] transition-colors w-full"
        >
          <i className="fas fa-plus mr-2"></i>
          {currentLang === 'tr' ? 'Yeni Soru Ekle' : 'Add New Question'}
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

export default FAQEditor;
