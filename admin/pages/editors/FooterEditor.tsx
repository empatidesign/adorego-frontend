import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, Button } from '../../components/forms/FormComponents';
import { contentAPI } from '../../services/api';
import axios from 'axios';
import { API_BASE_URL } from '../../../src/api-config';

type Language = 'tr' | 'en';

const FooterEditor: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [dataTR, setDataTR] = useState<any>({ sections: [], cta: {}, bottomSection: {} });
  const [dataEN, setDataEN] = useState<any>({ sections: [], cta: {}, bottomSection: {} });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const resTR = await contentAPI.getFooter('tr');
      const resEN = await contentAPI.getFooter('en');
      
      // Default değerler - Türkçe
      const defaultTR = {
        cta: {
          title: 'Sorun mu var? Kararsız mı kaldın?',
          subtitle: 'Destek ekibimiz e-ticaret lojistik süreçlerinizde her adımda yanınızda.',
          button1Text: 'İletişime Geç',
          button1Link: '#',
          button2Text: 'Ücretsiz Kayıt Ol',
          button2Link: '#'
        },
        bottomSection: {
          logoUrl: '', // Boş ise default SVG logo gösterilir
          tagline: 'Yeni Nesil Akıllı Lojistik Teknolojileri Platformu',
          socialLinks: [
            { platform: 'instagram', url: '#', icon: 'fa-instagram' },
            { platform: 'linkedin', url: '#', icon: 'fa-linkedin-in' }
          ],
          corporateTitle: 'Kurumsal Bağlantılar',
          corporateLinks: [
            { name: 'Hakkımızda', url: '#' },
            { name: 'İletişim', url: '#' },
            { name: 'Destek', url: '#' },
            { name: 'Gizlilik Politikası', url: '#' },
            { name: 'Kullanım Şartları', url: '#' },
            { name: 'KVKK Aydınlatma', url: '#' }
          ],
          copyrightText: '© 2024 adoreGo. Site kargo firması vitrini değil, teknoloji lojistik platformudur.'
        },
        sections: [
          {
            title: "1-Hizmetlerimiz",
            links: [
              { n: "Yurtdışı Kargo", h: "#yurtdisi" },
              { n: "Ekonomik Kargo", h: "#yurtdisi" },
              { n: "Express Kargo", h: "#yurtdisi" },
              { n: "Yurtdışından Türkiye'ye", h: "#yurtdisi" },
              { n: "Yurtiçi Avantajlar", h: "#yurtici" },
              { n: "Alıcı Ödemeli Kargo", h: "#yurtici" },
              { n: "Kapıda Ödemeli Kargo", h: "#yurtici" },
              { n: "Büyük Desi Gönderimler", h: "#yurtici" }
            ]
          },
          {
            title: "2-Nasıl Çalışır?",
            links: [
              { n: "Nasıl Gönderirim?", h: "#nasil-calisir" },
              { n: "Kapıdan Alım – Teslim", h: "#nasil-calisir" },
              { n: "İlk Kez Gönderenler", h: "#nasil-calisir" },
              { n: "Gümrük & Evrak Rehberi", h: "#nasil-calisir" },
              { n: "Yurtdışı İade & Geri", h: "#nasil-calisir" },
              { n: "Hangi Gönderim Uygun?", h: "#nasil-calisir" }
            ]
          },
          {
            title: "3-Bilgi & Kaynaklar",
            links: [
              { n: "Lojistik Blog", h: "#" },
              { n: "Sıkça Sorulan Sorular", h: "#sss" },
              { n: "Yurtdışı Kargo Rehberi", h: "#" },
              { n: "Mikro İhracat Rehberi", h: "#" },
              { n: "Gümrük Rehberi", h: "#" },
              { n: "Güncel Duyurular", h: "#" }
            ]
          },
          {
            title: "4-Entegrasyonlar",
            links: [
              { n: "Shopify Entegrasyonu", h: "#" },
              { n: "Etsy Entegrasyonu", h: "#" },
              { n: "Amazon Entegrasyonu", h: "#" },
              { n: "WooCommerce", h: "#" },
              { n: "Özel Site Kargo API", h: "#" }
            ]
          }
        ]
      };

      // Default değerler - İngilizce
      const defaultEN = {
        cta: {
          title: 'Having problems? Undecided?',
          subtitle: 'Our support team is with you at every step of your e-commerce logistics processes.',
          button1Text: 'Contact Us',
          button1Link: '#',
          button2Text: 'Free Sign Up',
          button2Link: '#'
        },
        bottomSection: {
          logoUrl: '', // Boş ise default SVG logo gösterilir
          tagline: 'Next Generation Smart Logistics Technology Platform',
          socialLinks: [
            { platform: 'instagram', url: '#', icon: 'fa-instagram' },
            { platform: 'linkedin', url: '#', icon: 'fa-linkedin-in' }
          ],
          corporateTitle: 'Corporate Links',
          corporateLinks: [
            { name: 'About Us', url: '#' },
            { name: 'Contact', url: '#' },
            { name: 'Support', url: '#' },
            { name: 'Privacy Policy', url: '#' },
            { name: 'Terms of Use', url: '#' },
            { name: 'GDPR Notice', url: '#' }
          ],
          copyrightText: '© 2024 adoreGo. This site is not a cargo company showcase, but a technology logistics platform.'
        },
        sections: [
          {
            title: "1-Our Services",
            links: [
              { n: "International Shipping", h: "#yurtdisi" },
              { n: "Economy Shipping", h: "#yurtdisi" },
              { n: "Express Shipping", h: "#yurtdisi" },
              { n: "From Abroad to Turkey", h: "#yurtdisi" },
              { n: "Domestic Advantages", h: "#yurtici" },
              { n: "Receiver Payment", h: "#yurtici" },
              { n: "Cash on Delivery", h: "#yurtici" },
              { n: "Large Volume Shipments", h: "#yurtici" }
            ]
          },
          {
            title: "2-How It Works?",
            links: [
              { n: "How to Ship?", h: "#nasil-calisir" },
              { n: "Door to Door", h: "#nasil-calisir" },
              { n: "First Time Shippers", h: "#nasil-calisir" },
              { n: "Customs & Documents Guide", h: "#nasil-calisir" },
              { n: "International Returns", h: "#nasil-calisir" },
              { n: "Which Shipping is Right?", h: "#nasil-calisir" }
            ]
          },
          {
            title: "3-Info & Resources",
            links: [
              { n: "Logistics Blog", h: "#" },
              { n: "FAQ", h: "#sss" },
              { n: "International Shipping Guide", h: "#" },
              { n: "Micro Export Guide", h: "#" },
              { n: "Customs Guide", h: "#" },
              { n: "Latest Announcements", h: "#" }
            ]
          },
          {
            title: "4-Integrations",
            links: [
              { n: "Shopify Integration", h: "#" },
              { n: "Etsy Integration", h: "#" },
              { n: "Amazon Integration", h: "#" },
              { n: "WooCommerce", h: "#" },
              { n: "Custom Site Shipping API", h: "#" }
            ]
          }
        ]
      };

      // API'den gelen veriyi default ile merge et
      const mergeTR = (resTR && Object.keys(resTR).length > 0) ? {
        cta: (resTR.cta && Object.keys(resTR.cta).length > 0) ? resTR.cta : defaultTR.cta,
        bottomSection: (resTR.bottomSection && Object.keys(resTR.bottomSection).length > 0) ? resTR.bottomSection : defaultTR.bottomSection,
        sections: (resTR.sections && resTR.sections.length > 0) ? resTR.sections : defaultTR.sections
      } : defaultTR;

      const mergeEN = (resEN && Object.keys(resEN).length > 0) ? {
        cta: (resEN.cta && Object.keys(resEN.cta).length > 0) ? resEN.cta : defaultEN.cta,
        bottomSection: (resEN.bottomSection && Object.keys(resEN.bottomSection).length > 0) ? resEN.bottomSection : defaultEN.bottomSection,
        sections: (resEN.sections && resEN.sections.length > 0) ? resEN.sections : defaultEN.sections
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
      await contentAPI.updateFooter(dataTR, 'tr');
      await contentAPI.updateFooter(dataEN, 'en');
      setMessage({ type: 'success', text: 'Footer menüleri her iki dil için başarıyla güncellendi!' });
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

  // CTA yönetimi
  const updateCta = (field: string, value: string) => {
    setCurrentData((prev: any) => ({
      ...prev,
      cta: { ...prev.cta, [field]: value }
    }));
  };

  // Bottom Section yönetimi
  const updateBottomSection = (field: string, value: string) => {
    setCurrentData((prev: any) => ({
      ...prev,
      bottomSection: { ...prev.bottomSection, [field]: value }
    }));
  };

  const addSocialLink = () => {
    setCurrentData((prev: any) => ({
      ...prev,
      bottomSection: {
        ...prev.bottomSection,
        socialLinks: [...(prev.bottomSection.socialLinks || []), { platform: '', url: '#', icon: 'fa-link' }]
      }
    }));
  };

  const removeSocialLink = (index: number) => {
    setCurrentData((prev: any) => ({
      ...prev,
      bottomSection: {
        ...prev.bottomSection,
        socialLinks: prev.bottomSection.socialLinks.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    setCurrentData((prev: any) => {
      const newSocialLinks = [...prev.bottomSection.socialLinks];
      newSocialLinks[index] = { ...newSocialLinks[index], [field]: value };
      return {
        ...prev,
        bottomSection: { ...prev.bottomSection, socialLinks: newSocialLinks }
      };
    });
  };

  const addCorporateLink = () => {
    setCurrentData((prev: any) => ({
      ...prev,
      bottomSection: {
        ...prev.bottomSection,
        corporateLinks: [...(prev.bottomSection.corporateLinks || []), { name: '', url: '#' }]
      }
    }));
  };

  const removeCorporateLink = (index: number) => {
    setCurrentData((prev: any) => ({
      ...prev,
      bottomSection: {
        ...prev.bottomSection,
        corporateLinks: prev.bottomSection.corporateLinks.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateCorporateLink = (index: number, field: string, value: string) => {
    setCurrentData((prev: any) => {
      const newCorporateLinks = [...prev.bottomSection.corporateLinks];
      newCorporateLinks[index] = { ...newCorporateLinks[index], [field]: value };
      return {
        ...prev,
        bottomSection: { ...prev.bottomSection, corporateLinks: newCorporateLinks }
      };
    });
  };

  // Section yönetimi
  const addSection = () => {
    setCurrentData((prev: any) => ({
      ...prev,
      sections: [...prev.sections, { title: '', links: [] }]
    }));
  };

  const removeSection = (index: number) => {
    setCurrentData((prev: any) => ({
      ...prev,
      sections: prev.sections.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateSection = (index: number, field: string, value: string) => {
    setCurrentData((prev: any) => {
      const newSections = [...prev.sections];
      newSections[index] = { ...newSections[index], [field]: value };
      return { ...prev, sections: newSections };
    });
  };

  // Link yönetimi
  const addLink = (sectionIndex: number) => {
    setCurrentData((prev: any) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].links = [...newSections[sectionIndex].links, { n: '', h: '#' }];
      return { ...prev, sections: newSections };
    });
  };

  const removeLink = (sectionIndex: number, linkIndex: number) => {
    setCurrentData((prev: any) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].links = newSections[sectionIndex].links.filter((_: any, i: number) => i !== linkIndex);
      return { ...prev, sections: newSections };
    });
  };

  const updateLink = (sectionIndex: number, linkIndex: number, field: string, value: string) => {
    setCurrentData((prev: any) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].links[linkIndex] = { ...newSections[sectionIndex].links[linkIndex], [field]: value };
      return { ...prev, sections: newSections };
    });
  };

  // Logo upload
  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Dosya boyutu kontrolü (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Dosya boyutu 5MB\'dan küçük olmalıdır' });
      return;
    }

    // Dosya tipi kontrolü
    if (!file.type.match(/^image\/(jpeg|jpg|png|gif|webp)$/)) {
      setMessage({ type: 'error', text: 'Sadece resim dosyaları yüklenebilir (JPG, PNG, GIF, WebP)' });
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.post(`${API_BASE_URL}/upload/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        // Backend'den gelen URL: /api/upload/images/...
        // API_BASE_URL: http://localhost:3001/api
        // Sadece domain kısmını alalım
        const baseUrl = API_BASE_URL.replace('/api', '');
        const logoUrl = `${baseUrl}${response.data.url}`;
        
        console.log('Uploaded logo URL:', logoUrl); // DEBUG
        
        // Her iki dile de aynı logo URL'sini kaydet
        setDataTR((prev: any) => ({
          ...prev,
          bottomSection: { ...prev.bottomSection, logoUrl }
        }));
        setDataEN((prev: any) => ({
          ...prev,
          bottomSection: { ...prev.bottomSection, logoUrl }
        }));
        setMessage({ type: 'success', text: 'Logo başarıyla yüklendi! Lütfen "Değişiklikleri Kaydet" butonuna tıklayın.' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Logo yüklenemedi' });
    } finally {
      setUploading(false);
    }
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Footer Menüleri</h1>
        <p className="text-gray-600 mb-8">Footer'daki 4 menü bölümünü ve linklerini yönetin</p>

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

        {/* CTA Bölümü */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-bullhorn text-[#4DB848]"></i>
            {currentLang === 'tr' ? 'Footer CTA Bölümü' : 'Footer CTA Section'}
          </h3>
          
          <Input
            label={currentLang === 'tr' ? 'Başlık' : 'Title'}
            value={currentData.cta?.title || ''}
            onChange={(val) => updateCta('title', val)}
            placeholder={currentLang === 'tr' ? 'Sorun mu var? Kararsız mı kaldın?' : 'Having problems? Undecided?'}
          />

          <Input
            label={currentLang === 'tr' ? 'Alt Başlık' : 'Subtitle'}
            value={currentData.cta?.subtitle || ''}
            onChange={(val) => updateCta('subtitle', val)}
            placeholder={currentLang === 'tr' ? 'Destek ekibimiz...' : 'Our support team...'}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label={currentLang === 'tr' ? 'Buton 1 Metni' : 'Button 1 Text'}
              value={currentData.cta?.button1Text || ''}
              onChange={(val) => updateCta('button1Text', val)}
              placeholder={currentLang === 'tr' ? 'İletişime Geç' : 'Contact Us'}
            />
            <Input
              label={currentLang === 'tr' ? 'Buton 1 Linki' : 'Button 1 Link'}
              value={currentData.cta?.button1Link || ''}
              onChange={(val) => updateCta('button1Link', val)}
              placeholder="#"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label={currentLang === 'tr' ? 'Buton 2 Metni' : 'Button 2 Text'}
              value={currentData.cta?.button2Text || ''}
              onChange={(val) => updateCta('button2Text', val)}
              placeholder={currentLang === 'tr' ? 'Ücretsiz Kayıt Ol' : 'Free Sign Up'}
            />
            <Input
              label={currentLang === 'tr' ? 'Buton 2 Linki' : 'Button 2 Link'}
              value={currentData.cta?.button2Link || ''}
              onChange={(val) => updateCta('button2Link', val)}
              placeholder="#"
            />
          </div>
        </div>

        <h3 className="font-bold text-gray-800 mb-4 text-lg">{currentLang === 'tr' ? 'Menü Bölümleri' : 'Menu Sections'}</h3>

        {/* Menü Bölümleri */}
        <div className="space-y-6">
          {currentData.sections?.map((section: any, sectionIndex: number) => (
            <div key={sectionIndex} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">
                  {currentLang === 'tr' ? `Menü Bölümü ${sectionIndex + 1}` : `Menu Section ${sectionIndex + 1}`}
                </h3>
                <button
                  onClick={() => removeSection(sectionIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>

              <Input
                label={currentLang === 'tr' ? 'Bölüm Başlığı' : 'Section Title'}
                value={section.title}
                onChange={(val) => updateSection(sectionIndex, 'title', val)}
                placeholder={currentLang === 'tr' ? '1-Hizmetlerimiz' : '1-Our Services'}
              />

              {/* Linkler */}
              <div className="mt-4 border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {currentLang === 'tr' ? 'Linkler' : 'Links'}
                  </label>
                  <button
                    onClick={() => addLink(sectionIndex)}
                    className="text-sm text-[#4DB848] hover:text-[#3da339] font-medium"
                  >
                    <i className="fas fa-plus mr-1"></i>
                    {currentLang === 'tr' ? 'Link Ekle' : 'Add Link'}
                  </button>
                </div>

                <div className="space-y-2">
                  {section.links?.map((link: any, linkIndex: number) => (
                    <div key={linkIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={link.n}
                        onChange={(e) => updateLink(sectionIndex, linkIndex, 'n', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent text-sm"
                        placeholder={currentLang === 'tr' ? 'Link Adı' : 'Link Name'}
                      />
                      <input
                        type="text"
                        value={link.h}
                        onChange={(e) => updateLink(sectionIndex, linkIndex, 'h', e.target.value)}
                        className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent text-sm"
                        placeholder="#link"
                      />
                      <button
                        onClick={() => removeLink(sectionIndex, linkIndex)}
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

        <button
          onClick={addSection}
          className="mt-4 px-6 py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#4DB848] hover:text-[#4DB848] transition-colors w-full"
        >
          <i className="fas fa-plus mr-2"></i>
          {currentLang === 'tr' ? 'Yeni Menü Bölümü Ekle' : 'Add New Menu Section'}
        </button>

        {/* Alt Bölüm - Logo, Sosyal Medya, Kurumsal Linkler */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-building text-[#102477]"></i>
            {currentLang === 'tr' ? 'Alt Bölüm (Logo & Kurumsal)' : 'Bottom Section (Logo & Corporate)'}
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentLang === 'tr' ? 'Logo Yükle' : 'Upload Logo'}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={uploading}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#4DB848] file:text-white hover:file:bg-[#3da339] file:cursor-pointer disabled:opacity-50"
              />
              {uploading && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="fas fa-spinner fa-spin"></i>
                  {currentLang === 'tr' ? 'Yükleniyor...' : 'Uploading...'}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {currentLang === 'tr' 
                ? 'Maksimum 5MB, JPG, PNG, GIF veya WebP formatında. Boş bırakırsanız default logo gösterilir.' 
                : 'Maximum 5MB, JPG, PNG, GIF or WebP format. Leave empty to show default logo.'}
            </p>
            {currentData.bottomSection?.logoUrl && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-2">{currentLang === 'tr' ? 'Mevcut Logo:' : 'Current Logo:'}</p>
                  <img 
                    src={currentData.bottomSection.logoUrl} 
                    alt="Logo Preview" 
                    className="h-10 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    // Her iki dilden de logoyu kaldır
                    setDataTR((prev: any) => ({
                      ...prev,
                      bottomSection: { ...prev.bottomSection, logoUrl: '' }
                    }));
                    setDataEN((prev: any) => ({
                      ...prev,
                      bottomSection: { ...prev.bottomSection, logoUrl: '' }
                    }));
                    setMessage({ type: 'success', text: currentLang === 'tr' ? 'Logo kaldırıldı. Lütfen "Değişiklikleri Kaydet" butonuna tıklayın.' : 'Logo removed. Please click "Save Changes" button.' });
                  }}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  <i className="fas fa-trash mr-1"></i>
                  {currentLang === 'tr' ? 'Logoyu Kaldır' : 'Remove Logo'}
                </button>
              </div>
            )}
          </div>

          <Input
            label={currentLang === 'tr' ? 'Logo Alt Yazısı (Tagline)' : 'Logo Tagline'}
            value={currentData.bottomSection?.tagline || ''}
            onChange={(val) => updateBottomSection('tagline', val)}
            placeholder={currentLang === 'tr' ? 'Yeni Nesil Akıllı Lojistik Teknolojileri Platformu' : 'Next Generation Smart Logistics Technology Platform'}
          />

          {/* Sosyal Medya Linkleri */}
          <div className="mt-4 border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {currentLang === 'tr' ? 'Sosyal Medya Linkleri' : 'Social Media Links'}
              </label>
              <button
                onClick={addSocialLink}
                className="text-sm text-[#4DB848] hover:text-[#3da339] font-medium"
              >
                <i className="fas fa-plus mr-1"></i>
                {currentLang === 'tr' ? 'Sosyal Medya Ekle' : 'Add Social Media'}
              </button>
            </div>

            <div className="space-y-2">
              {currentData.bottomSection?.socialLinks?.map((social: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={social.platform}
                    onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent text-sm"
                    placeholder="instagram"
                  />
                  <input
                    type="text"
                    value={social.icon}
                    onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}
                    className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent text-sm"
                    placeholder="fa-instagram"
                  />
                  <input
                    type="text"
                    value={social.url}
                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent text-sm"
                    placeholder="https://instagram.com/..."
                  />
                  <button
                    onClick={() => removeSocialLink(index)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Kurumsal Bağlantılar */}
          <div className="mt-4 border-t pt-4">
            <Input
              label={currentLang === 'tr' ? 'Kurumsal Bağlantılar Başlığı' : 'Corporate Links Title'}
              value={currentData.bottomSection?.corporateTitle || ''}
              onChange={(val) => updateBottomSection('corporateTitle', val)}
              placeholder={currentLang === 'tr' ? 'Kurumsal Bağlantılar' : 'Corporate Links'}
            />

            <div className="flex items-center justify-between mb-2 mt-4">
              <label className="block text-sm font-medium text-gray-700">
                {currentLang === 'tr' ? 'Kurumsal Linkler' : 'Corporate Links'}
              </label>
              <button
                onClick={addCorporateLink}
                className="text-sm text-[#4DB848] hover:text-[#3da339] font-medium"
              >
                <i className="fas fa-plus mr-1"></i>
                {currentLang === 'tr' ? 'Link Ekle' : 'Add Link'}
              </button>
            </div>

            <div className="space-y-2">
              {currentData.bottomSection?.corporateLinks?.map((link: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => updateCorporateLink(index, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent text-sm"
                    placeholder={currentLang === 'tr' ? 'Hakkımızda' : 'About Us'}
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => updateCorporateLink(index, 'url', e.target.value)}
                    className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent text-sm"
                    placeholder="#"
                  />
                  <button
                    onClick={() => removeCorporateLink(index)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Telif Hakkı Metni */}
          <div className="mt-4 border-t pt-4">
            <Input
              label={currentLang === 'tr' ? 'Telif Hakkı Metni (Copyright)' : 'Copyright Text'}
              value={currentData.bottomSection?.copyrightText || ''}
              onChange={(val) => updateBottomSection('copyrightText', val)}
              placeholder={currentLang === 'tr' ? '© 2024 adoreGo. Site kargo firması vitrini değil, teknoloji lojistik platformudur.' : '© 2024 adoreGo. This site is not a cargo company showcase, but a technology logistics platform.'}
            />
            <p className="text-xs text-gray-500 mt-1">
              {currentLang === 'tr' 
                ? 'Footer\'ın en altında görünecek telif hakkı metni.' 
                : 'Copyright text that will appear at the bottom of the footer.'}
            </p>
          </div>
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

export default FooterEditor;
