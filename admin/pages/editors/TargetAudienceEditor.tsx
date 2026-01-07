import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, TextArea, Button } from '../../components/forms/FormComponents';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';

const TargetAudienceEditor: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [dataTR, setDataTR] = useState<any>({
    earnSection: {
      badge: '',
      title: '',
      highlightedTitle: '',
      description: '',
      benefits: [],
      card: {
        topBadge: '',
        statusBadge: '',
        fromLabel: '',
        toLabel: '',
        discount: '',
        discountLabel: '',
        miniCards: []
      }
    },
    trustSection: {
      title: '',
      highlightedTitle: '',
      points: []
    }
  });

  const [dataEN, setDataEN] = useState<any>({
    earnSection: {
      badge: '',
      title: '',
      highlightedTitle: '',
      description: '',
      benefits: [],
      card: {
        topBadge: '',
        statusBadge: '',
        fromLabel: '',
        toLabel: '',
        discount: '',
        discountLabel: '',
        miniCards: []
      }
    },
    trustSection: {
      title: '',
      highlightedTitle: '',
      points: []
    }
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const resTR = await contentAPI.getTargetAudience('tr');
      const resEN = await contentAPI.getTargetAudience('en');
      
      // Default değerler
      const defaultTR = {
        earnSection: {
          badge: 'GÖNDERDİKÇE KAZAN',
          title: 'Yurtdışı Gönder',
          highlightedTitle: 'Yurtiçi Ucuzlasın.',
          description: 'Yurtdışı gönderi yaptığınızda sistem sizi aktif kullanıcı olarak tanır ve yurtiçi kargo fiyatlarınız otomatik olarak avantajlı hale gelir.',
          benefits: [
            'Sistem sizi otomatik tanır, başvuru gerekmez.',
            'Gönderi sayınız arttıkça fiyatlar kendiliğinden düşer.'
          ],
          card: {
            topBadge: 'Akıllı Fiyatlandırma',
            statusBadge: 'AKTİF',
            fromLabel: 'Standart',
            toLabel: 'Avantajlı Plus',
            discount: '-%40',
            discountLabel: 'Yurtiçi Kargo İndirimi',
            miniCards: [
              { icon: 'fa-shipping-fast', label: 'Hızlı Teslimat' },
              { icon: 'fa-chart-line', label: 'Otomatik İndirim' }
            ]
          }
        },
        trustSection: {
          title: 'Neden bize',
          highlightedTitle: 'Güvenmelisiniz?',
          points: [
            { title: '35 Yıllık Tecrübe', desc: 'Yazılım ve teknoloji alanındaki derin birikimimizle yanınızdayız.' },
            { title: 'Net Fiyat Garantisi', desc: 'Fiyatlar baştan nettir, sonradan sürpriz masraf çıkmaz.' },
            { title: 'Kontrollü Süreç', desc: 'Teslim edilemeyen gönderiler dahil her an kontrol altındadır.' },
            { title: 'Tek Nokta Destek', desc: 'Tüm süreçleriniz için tek bir muhatap ve hızlı çözüm.' }
          ]
        }
      };

      const defaultEN = {
        earnSection: {
          badge: 'EARN AS YOU SHIP',
          title: 'Ship Abroad',
          highlightedTitle: 'Domestic Gets Cheaper.',
          description: 'When you make international shipments, the system recognizes you as an active user and your domestic cargo prices automatically become advantageous.',
          benefits: [
            'System recognizes you automatically, no application required.',
            'Prices decrease automatically as your shipment count increases.'
          ],
          card: {
            topBadge: 'Smart Pricing',
            statusBadge: 'ACTIVE',
            fromLabel: 'Standard',
            toLabel: 'Advantageous Plus',
            discount: '-%40',
            discountLabel: 'Domestic Cargo Discount',
            miniCards: [
              { icon: 'fa-shipping-fast', label: 'Fast Delivery' },
              { icon: 'fa-chart-line', label: 'Auto Discount' }
            ]
          }
        },
        trustSection: {
          title: 'Why should you',
          highlightedTitle: 'Trust us?',
          points: [
            { title: '35 Years Experience', desc: 'We are with you with our deep knowledge in software and technology.' },
            { title: 'Net Price Guarantee', desc: 'Prices are net from the start, no surprise costs later.' },
            { title: 'Controlled Process', desc: 'Everything is under control at all times, including undeliverable shipments.' },
            { title: 'Single Point Support', desc: 'One contact and quick solution for all your processes.' }
          ]
        }
      };

      // API'den gelen veriyi default ile merge et
      const mergeTR = (resTR && Object.keys(resTR).length > 0) ? {
        earnSection: {
          ...defaultTR.earnSection,
          ...resTR.earnSection,
          card: {
            ...defaultTR.earnSection.card,
            ...resTR.earnSection?.card,
            miniCards: resTR.earnSection?.card?.miniCards?.length > 0 
              ? resTR.earnSection.card.miniCards 
              : defaultTR.earnSection.card.miniCards
          },
          benefits: resTR.earnSection?.benefits?.length > 0 
            ? resTR.earnSection.benefits 
            : defaultTR.earnSection.benefits
        },
        trustSection: {
          ...defaultTR.trustSection,
          ...resTR.trustSection,
          points: resTR.trustSection?.points?.length > 0 
            ? resTR.trustSection.points 
            : defaultTR.trustSection.points
        }
      } : defaultTR;

      const mergeEN = (resEN && Object.keys(resEN).length > 0) ? {
        earnSection: {
          ...defaultEN.earnSection,
          ...resEN.earnSection,
          card: {
            ...defaultEN.earnSection.card,
            ...resEN.earnSection?.card,
            miniCards: resEN.earnSection?.card?.miniCards?.length > 0 
              ? resEN.earnSection.card.miniCards 
              : defaultEN.earnSection.card.miniCards
          },
          benefits: resEN.earnSection?.benefits?.length > 0 
            ? resEN.earnSection.benefits 
            : defaultEN.earnSection.benefits
        },
        trustSection: {
          ...defaultEN.trustSection,
          ...resEN.trustSection,
          points: resEN.trustSection?.points?.length > 0 
            ? resEN.trustSection.points 
            : defaultEN.trustSection.points
        }
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
      await contentAPI.updateTargetAudience(dataTR, 'tr');
      await contentAPI.updateTargetAudience(dataEN, 'en');
      setMessage({ type: 'success', text: 'Gönderdiğe Kazan bölümü her iki dil için başarıyla güncellendi!' });
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

  // Benefit yönetimi
  const addBenefit = () => {
    setCurrentData((prev: any) => ({
      ...prev,
      earnSection: {
        ...prev.earnSection,
        benefits: [...prev.earnSection.benefits, '']
      }
    }));
  };

  const removeBenefit = (index: number) => {
    setCurrentData((prev: any) => ({
      ...prev,
      earnSection: {
        ...prev.earnSection,
        benefits: prev.earnSection.benefits.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateBenefit = (index: number, value: string) => {
    setCurrentData((prev: any) => {
      const newBenefits = [...prev.earnSection.benefits];
      newBenefits[index] = value;
      return {
        ...prev,
        earnSection: {
          ...prev.earnSection,
          benefits: newBenefits
        }
      };
    });
  };

  // Mini Card yönetimi
  const addMiniCard = () => {
    setCurrentData((prev: any) => ({
      ...prev,
      earnSection: {
        ...prev.earnSection,
        card: {
          ...prev.earnSection.card,
          miniCards: [...prev.earnSection.card.miniCards, { icon: 'fa-star', label: '' }]
        }
      }
    }));
  };

  const removeMiniCard = (index: number) => {
    setCurrentData((prev: any) => ({
      ...prev,
      earnSection: {
        ...prev.earnSection,
        card: {
          ...prev.earnSection.card,
          miniCards: prev.earnSection.card.miniCards.filter((_: any, i: number) => i !== index)
        }
      }
    }));
  };

  const updateMiniCard = (index: number, field: string, value: string) => {
    setCurrentData((prev: any) => {
      const newMiniCards = [...prev.earnSection.card.miniCards];
      newMiniCards[index] = { ...newMiniCards[index], [field]: value };
      return {
        ...prev,
        earnSection: {
          ...prev.earnSection,
          card: {
            ...prev.earnSection.card,
            miniCards: newMiniCards
          }
        }
      };
    });
  };

  // Trust Point yönetimi
  const addTrustPoint = () => {
    setCurrentData((prev: any) => ({
      ...prev,
      trustSection: {
        ...prev.trustSection,
        points: [...prev.trustSection.points, { title: '', desc: '' }]
      }
    }));
  };

  const removeTrustPoint = (index: number) => {
    setCurrentData((prev: any) => ({
      ...prev,
      trustSection: {
        ...prev.trustSection,
        points: prev.trustSection.points.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateTrustPoint = (index: number, field: string, value: string) => {
    setCurrentData((prev: any) => {
      const newPoints = [...prev.trustSection.points];
      newPoints[index] = { ...newPoints[index], [field]: value };
      return {
        ...prev,
        trustSection: {
          ...prev.trustSection,
          points: newPoints
        }
      };
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Gönderdiğe Kazan Bölümü</h1>
        <p className="text-gray-600 mb-8">Yurtdışı gönder yurtiçi ucuzlasın ve güven noktalarını yönetin</p>

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

        {/* Gönderdiğe Kazan Bölümü */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-gift text-[#4DB848]"></i>
            Gönderdiğe Kazan Bölümü (Sol Taraf)
          </h3>
          
          <Input
            label="Rozet Metni"
            value={currentData.earnSection?.badge}
            onChange={(val) => setCurrentData({
              ...currentData,
              earnSection: { ...currentData.earnSection, badge: val }
            })}
            placeholder={currentLang === 'tr' ? 'GÖNDERDİKÇE KAZAN' : 'EARN AS YOU SHIP'}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Ana Başlık"
              value={currentData.earnSection?.title}
              onChange={(val) => setCurrentData({
                ...currentData,
                earnSection: { ...currentData.earnSection, title: val }
              })}
              placeholder={currentLang === 'tr' ? 'Yurtdışı Gönder' : 'Ship Abroad'}
            />
            <Input
              label="Vurgulu Başlık"
              value={currentData.earnSection?.highlightedTitle}
              onChange={(val) => setCurrentData({
                ...currentData,
                earnSection: { ...currentData.earnSection, highlightedTitle: val }
              })}
              placeholder={currentLang === 'tr' ? 'Yurtiçi Ucuzlasın.' : 'Domestic Gets Cheaper.'}
            />
          </div>

          <TextArea
            label="Açıklama"
            value={currentData.earnSection?.description}
            onChange={(val) => setCurrentData({
              ...currentData,
              earnSection: { ...currentData.earnSection, description: val }
            })}
            placeholder={currentLang === 'tr' ? 'Yurtdışı gönderi yaptığınızda...' : 'When you make international shipments...'}
            rows={3}
          />

          {/* Faydalar */}
          <div className="mt-4 border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Faydalar (Numaralı Kartlar)</label>
              <button
                onClick={addBenefit}
                className="text-sm text-[#4DB848] hover:text-[#3da339] font-medium"
              >
                <i className="fas fa-plus mr-1"></i>
                Fayda Ekle
              </button>
            </div>
            <div className="space-y-2">
              {currentData.earnSection?.benefits?.map((benefit: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent text-sm"
                    placeholder={currentLang === 'tr' ? 'Sistem sizi otomatik tanır...' : 'System recognizes you automatically...'}
                  />
                  <button
                    onClick={() => removeBenefit(index)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ Kart Bilgileri */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-credit-card text-[#102477]"></i>
            Sağ Kart Bilgileri
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Üst Rozet"
              value={currentData.earnSection?.card?.topBadge}
              onChange={(val) => setCurrentData({
                ...currentData,
                earnSection: {
                  ...currentData.earnSection,
                  card: { ...currentData.earnSection.card, topBadge: val }
                }
              })}
              placeholder={currentLang === 'tr' ? 'Akıllı Fiyatlandırma' : 'Smart Pricing'}
            />
            <Input
              label="Durum Rozeti"
              value={currentData.earnSection?.card?.statusBadge}
              onChange={(val) => setCurrentData({
                ...currentData,
                earnSection: {
                  ...currentData.earnSection,
                  card: { ...currentData.earnSection.card, statusBadge: val }
                }
              })}
              placeholder={currentLang === 'tr' ? 'AKTİF' : 'ACTIVE'}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Başlangıç Etiketi"
              value={currentData.earnSection?.card?.fromLabel}
              onChange={(val) => setCurrentData({
                ...currentData,
                earnSection: {
                  ...currentData.earnSection,
                  card: { ...currentData.earnSection.card, fromLabel: val }
                }
              })}
              placeholder={currentLang === 'tr' ? 'Standart' : 'Standard'}
            />
            <Input
              label="Bitiş Etiketi"
              value={currentData.earnSection?.card?.toLabel}
              onChange={(val) => setCurrentData({
                ...currentData,
                earnSection: {
                  ...currentData.earnSection,
                  card: { ...currentData.earnSection.card, toLabel: val }
                }
              })}
              placeholder={currentLang === 'tr' ? 'Avantajlı Plus' : 'Advantageous Plus'}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="İndirim Oranı"
              value={currentData.earnSection?.card?.discount}
              onChange={(val) => setCurrentData({
                ...currentData,
                earnSection: {
                  ...currentData.earnSection,
                  card: { ...currentData.earnSection.card, discount: val }
                }
              })}
              placeholder="-%40"
            />
            <Input
              label="İndirim Etiketi"
              value={currentData.earnSection?.card?.discountLabel}
              onChange={(val) => setCurrentData({
                ...currentData,
                earnSection: {
                  ...currentData.earnSection,
                  card: { ...currentData.earnSection.card, discountLabel: val }
                }
              })}
              placeholder={currentLang === 'tr' ? 'Yurtiçi Kargo İndirimi' : 'Domestic Cargo Discount'}
            />
          </div>

          {/* Mini Kartlar */}
          <div className="mt-4 border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Alt Mini Kartlar</label>
              <button
                onClick={addMiniCard}
                className="text-sm text-[#4DB848] hover:text-[#3da339] font-medium"
              >
                <i className="fas fa-plus mr-1"></i>
                Kart Ekle
              </button>
            </div>
            <div className="space-y-2">
              {currentData.earnSection?.card?.miniCards?.map((card: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={card.icon}
                    onChange={(e) => updateMiniCard(index, 'icon', e.target.value)}
                    className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent text-sm"
                    placeholder="fa-shipping-fast"
                  />
                  <input
                    type="text"
                    value={card.label}
                    onChange={(e) => updateMiniCard(index, 'label', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent text-sm"
                    placeholder={currentLang === 'tr' ? 'Hızlı Teslimat' : 'Fast Delivery'}
                  />
                  <button
                    onClick={() => removeMiniCard(index)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Güven Noktaları */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-shield-halved text-[#102477]"></i>
            Neden Bize Güvenmelisiniz Bölümü
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input
              label="Başlık"
              value={currentData.trustSection?.title}
              onChange={(val) => setCurrentData({
                ...currentData,
                trustSection: { ...currentData.trustSection, title: val }
              })}
              placeholder={currentLang === 'tr' ? 'Neden bize' : 'Why should you'}
            />
            <Input
              label="Vurgulu Başlık"
              value={currentData.trustSection?.highlightedTitle}
              onChange={(val) => setCurrentData({
                ...currentData,
                trustSection: { ...currentData.trustSection, highlightedTitle: val }
              })}
              placeholder={currentLang === 'tr' ? 'Güvenmelisiniz?' : 'Trust us?'}
            />
          </div>

          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Güven Noktaları (4 Kart)</label>
            <button
              onClick={addTrustPoint}
              className="text-sm text-[#4DB848] hover:text-[#3da339] font-medium"
            >
              <i className="fas fa-plus mr-1"></i>
              Nokta Ekle
            </button>
          </div>

          <div className="space-y-4">
            {currentData.trustSection?.points?.map((point: any, index: number) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-700">Nokta {index + 1}</span>
                  <button
                    onClick={() => removeTrustPoint(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>

                <Input
                  label="Başlık"
                  value={point.title}
                  onChange={(val) => updateTrustPoint(index, 'title', val)}
                  placeholder={currentLang === 'tr' ? '35 Yıllık Tecrübe' : '35 Years Experience'}
                />

                <TextArea
                  label="Açıklama"
                  value={point.desc}
                  onChange={(val) => updateTrustPoint(index, 'desc', val)}
                  placeholder={currentLang === 'tr' ? 'Yazılım ve teknoloji alanındaki...' : 'We are with you with our deep knowledge...'}
                  rows={2}
                />
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

export default TargetAudienceEditor;
