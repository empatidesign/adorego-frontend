import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, Button, Select } from '../../components/forms/FormComponents';
import ImageUpload from '../../components/forms/ImageUpload';
import { contentAPI } from '../../services/api';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableMenuItem } from './SortableMenuItem';

type Language = 'tr' | 'en';

interface MenuItem {
  id: string;
  labelTR: string;
  labelEN: string;
  href: string;
  parentId: string | null;
  position: 'header' | 'footer';
  order: number;
  isActive: boolean;
  mobileVisible: boolean;
}

interface CTAButton {
  id: string;
  labelTR: string;
  labelEN: string;
  href: string;
  variant: 'primary' | 'secondary';
  style?: string;
  icon?: string;
}

interface FooterData {
  cta: {
    title: string;
    subtitle: string;
    button1Text: string;
    button1Link: string;
    button2Text: string;
    button2Link: string;
  };
  bottomSection: {
    logoUrl: string;
    tagline: string;
    socialLinks: { platform: string; url: string; icon: string }[];
    corporateTitle: string;
    corporateLinks: { name: string; url: string }[];
    copyrightText: string;
  };
}

// Default menu structure
const DEFAULT_MENU_ITEMS: MenuItem[] = [
  // Header
  { id: '1', labelTR: 'Ana Sayfa', labelEN: 'Home', href: '/', parentId: null, position: 'header', order: 0, isActive: true, mobileVisible: true },
  { id: '2', labelTR: 'Fiyat Hesapla', labelEN: 'Calculate Price', href: '/fiyatlar', parentId: null, position: 'header', order: 1, isActive: true, mobileVisible: true },
  { id: '3', labelTR: 'Gönderi Takibi', labelEN: 'Track Shipment', href: '/gonderi-takibi', parentId: null, position: 'header', order: 2, isActive: true, mobileVisible: true },
  { id: '4', labelTR: 'Blog', labelEN: 'Blog', href: '/blog', parentId: null, position: 'header', order: 3, isActive: true, mobileVisible: true },
  { id: '5', labelTR: 'İletişim', labelEN: 'Contact', href: '/iletisim', parentId: null, position: 'header', order: 4, isActive: true, mobileVisible: true },
];

const DEFAULT_CTA_BUTTONS: CTAButton[] = [
  { id: '2', labelTR: 'ÜYE OL', labelEN: 'SIGN UP', href: '#signup', variant: 'primary', style: 'primary', icon: '' },
];

const DEFAULT_FOOTER_DATA: FooterData = {
  cta: {
    title: '',
    subtitle: '',
    button1Text: '',
    button1Link: '',
    button2Text: '',
    button2Link: ''
  },
  bottomSection: {
    logoUrl: '',
    tagline: '',
    socialLinks: [],
    corporateTitle: '',
    corporateLinks: [],
    copyrightText: ''
  }
};

const CONTENT_PAGES = [
  { slug: 'yurtdisi-kargo', title: 'Yurtdışı Kargo' },
  { slug: 'ekonomik-kargo', title: 'Ekonomik Kargo' },
  { slug: 'express-kargo', title: 'Express Kargo' },
  { slug: 'yurtdisindan-turkiyeye', title: 'Yurtdışından Türkiye\'ye' },
  { slug: 'yurtici-avantajlar', title: 'Yurtiçi Avantajlar' },
  { slug: 'alici-odemeli-kargo', title: 'Alıcı Ödemeli Kargo' },
  { slug: 'kapida-odemeli-kargo', title: 'Kapıda Ödemeli Kargo' },
  { slug: 'buyuk-desi-gonderimler', title: 'Büyük Desi Gönderimler' },
  { slug: 'nasil-gonderirim', title: 'Nasıl Gönderirim?' },
  { slug: 'kapidan-alim-teslim', title: 'Kapıdan Alım – Teslim' },
  { slug: 'ilk-kez-gonderenler', title: 'İlk Kez Gönderenler' },
  { slug: 'gumruk-evrak-rehberi', title: 'Gümrük & Evrak Rehberi' },
  { slug: 'yurtdisi-iade-geri', title: 'Yurtdışı İade & Geri' },
  { slug: 'hangi-gonderim-uygun', title: 'Hangi Gönderim Uygun?' },
  { slug: 'lojistik-blog', title: 'Lojistik Blog' },
  { slug: 'sikca-sorulan-sorular', title: 'Sıkça Sorulan Sosular' },
  { slug: 'yurtdisi-kargo-rehberi', title: 'Yurtdışı Kargo Rehberi' },
  { slug: 'mikro-ihracat-rehberi', title: 'Mikro İhracat Rehberi' },
  { slug: 'gumruk-rehberi', title: 'Gümrük Rehberi' },
  { slug: 'guncel-duyurular', title: 'Güncel Duyurular' },
  { slug: 'shopify-entegrasyonu', title: 'Shopify Entegrasyonu' },
  { slug: 'etsy-entegrasyonu', title: 'Etsy Entegrasyonu' },
  { slug: 'amazon-entegrasyonu', title: 'Amazon Entegrasyonu' },
  { slug: 'woocommerce', title: 'WooCommerce' },
  { slug: 'ozel-site-kargo-api', title: 'Özel Site Kargo API' },
];

const NavbarEditor: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editLang, setEditLang] = useState<Language>('tr');
  const [activeTab, setActiveTab] = useState<'header' | 'footer'>('header');
  const [activeSubTab, setActiveSubTab] = useState<'menus' | 'settings'>('menus');

  const [menuItems, setMenuItems] = useState<MenuItem[]>(DEFAULT_MENU_ITEMS);
  const [ctaButtons, setCtaButtons] = useState<CTAButton[]>(DEFAULT_CTA_BUTTONS);

  const [footerDataTR, setFooterDataTR] = useState<FooterData>(DEFAULT_FOOTER_DATA);
  const [footerDataEN, setFooterDataEN] = useState<FooterData>(DEFAULT_FOOTER_DATA);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [dataTR, dataEN, footerTR, footerEN, settingsTR] = await Promise.all([
        contentAPI.getNavbar('tr'),
        contentAPI.getNavbar('en'),
        contentAPI.getFooter('tr'),
        contentAPI.getFooter('en'),
        contentAPI.getSiteSettings('general', 'tr')
      ]);

      const itemsTR = Array.isArray(dataTR?.menuItems) ? dataTR.menuItems : [];
      const itemsEN = Array.isArray(dataEN?.menuItems) ? dataEN.menuItems : [];

      // Map API items
      const apiMenus = itemsTR.map((itemTR: any) => {
        const itemEN = itemsEN.find((en: any) => en.id === itemTR.id);
        return {
          id: itemTR.id,
          labelTR: itemTR.label || '',
          labelEN: itemEN?.label || '',
          href: itemTR.link || itemTR.href || '#',
          parentId: itemTR.parentId || null,
          position: (itemTR.position || 'header') as 'header' | 'footer',
          order: itemTR.order || 0,
          isActive: itemTR.isActive !== false,
          mobileVisible: itemTR.mobileVisible !== false
        };
      });

      if (apiMenus.length > 0) {
        setMenuItems(apiMenus.sort((a, b) => (a.order || 0) - (b.order || 0)));
      } else {
        setMenuItems(DEFAULT_MENU_ITEMS);
      }

      if (dataTR?.ctaButtons) {
        // Filter out PANEL and ÜYE OL from CTA buttons
        const buttons = dataTR.ctaButtons
          .filter((btn: any) => btn.label !== 'PANEL' && btn.labelTR !== 'PANEL' && btn.label !== 'ÜYE OL' && btn.labelTR !== 'ÜYE OL')
          .map((btn: any) => {
            const btnEN = dataEN?.ctaButtons?.find((en: any) => en.id === btn.id);
            return {
              id: btn.id,
              labelTR: btn.label || btn.labelTR || '',
              labelEN: btnEN?.label || btnEN?.labelEN || '',
              href: btn.link || btn.href || '#',
              variant: btn.style === 'primary' ? 'primary' : 'secondary',
              style: btn.style,
              icon: btn.icon
            };
          });
        setCtaButtons(buttons);
      }

      // Footer data
      if (footerTR) setFooterDataTR(footerTR);
      if (footerEN) setFooterDataEN(footerEN);
      if (settingsTR) setSiteSettings(settingsTR);

    } catch (error) {
      console.error('Veri yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSocialLink = () => {
    const setter = editLang === 'tr' ? setFooterDataTR : setFooterDataEN;
    setter(prev => ({
      ...prev,
      bottomSection: {
        ...prev.bottomSection,
        socialLinks: [...(prev.bottomSection.socialLinks || []), { platform: '', url: '#', icon: 'fa-link' }]
      }
    }));
  };

  const removeSocialLink = (index: number) => {
    const setter = editLang === 'tr' ? setFooterDataTR : setFooterDataEN;
    setter(prev => ({
      ...prev,
      bottomSection: {
        ...prev.bottomSection,
        socialLinks: prev.bottomSection.socialLinks.filter((_, i) => i !== index)
      }
    }));
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    const setter = editLang === 'tr' ? setFooterDataTR : setFooterDataEN;
    setter(prev => {
      const newSocialLinks = [...prev.bottomSection.socialLinks];
      newSocialLinks[index] = { ...newSocialLinks[index], [field]: value };
      return {
        ...prev,
        bottomSection: { ...prev.bottomSection, socialLinks: newSocialLinks }
      };
    });
  };

  const addCorporateLink = () => {
    const setter = editLang === 'tr' ? setFooterDataTR : setFooterDataEN;
    setter(prev => ({
      ...prev,
      bottomSection: {
        ...prev.bottomSection,
        corporateLinks: [...(prev.bottomSection.corporateLinks || []), { name: '', url: '#' }]
      }
    }));
  };

  const removeCorporateLink = (index: number) => {
    const setter = editLang === 'tr' ? setFooterDataTR : setFooterDataEN;
    setter(prev => ({
      ...prev,
      bottomSection: {
        ...prev.bottomSection,
        corporateLinks: prev.bottomSection.corporateLinks.filter((_, i) => i !== index)
      }
    }));
  };

  const updateCorporateLink = (index: number, field: string, value: string) => {
    const setter = editLang === 'tr' ? setFooterDataTR : setFooterDataEN;
    setter(prev => {
      const newCorporateLinks = [...prev.bottomSection.corporateLinks];
      newCorporateLinks[index] = { ...newCorporateLinks[index], [field]: value };
      return {
        ...prev,
        bottomSection: { ...prev.bottomSection, corporateLinks: newCorporateLinks }
      };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const headerItems = menuItems.filter(i => i.position === 'header').map((item, index) => ({ ...item, order: index }));
      const footerItems = menuItems.filter(i => i.position === 'footer').map((item, index) => ({ ...item, order: index }));
      const itemsToSave = [...headerItems, ...footerItems];

      const navPayloadTR = {
        menuItems: itemsToSave.map(item => ({
          id: item.id,
          label: item.labelTR,
          link: item.href,
          parentId: item.parentId,
          position: item.position,
          order: item.order,
          isActive: item.isActive,
          mobileVisible: item.mobileVisible
        })),
        ctaButtons: ctaButtons.map(btn => ({
          id: btn.id,
          label: btn.labelTR,
          link: btn.href,
          style: btn.style,
          icon: btn.icon,
          order: ctaButtons.indexOf(btn)
        }))
      };

      const navPayloadEN = {
        menuItems: itemsToSave.map(item => ({
          id: item.id,
          label: item.labelEN,
          link: item.href,
          parentId: item.parentId,
          position: item.position,
          order: item.order,
          isActive: item.isActive,
          mobileVisible: item.mobileVisible
        })),
        ctaButtons: ctaButtons.map(btn => ({
          id: btn.id,
          label: btn.labelEN,
          link: btn.href,
          style: btn.style,
          icon: btn.icon,
          order: ctaButtons.indexOf(btn)
        }))
      };

      await Promise.all([
        contentAPI.updateNavbar(navPayloadTR, 'tr'),
        contentAPI.updateNavbar(navPayloadEN, 'en'),
        contentAPI.updateFooter(footerDataTR, 'tr'),
        contentAPI.updateFooter(footerDataEN, 'en')
      ]);

      setMenuItems(itemsToSave);
      setMessage({ type: 'success', text: 'Tüm menüler ve ayarlar başarıyla kaydedildi!' });
    } catch (error: any) {
      console.error('Save error:', error);
      setMessage({ type: 'error', text: error.response?.data?.message || 'Güncelleme başarısız' });
    } finally {
      setSaving(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setMenuItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addNewItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      labelTR: '',
      labelEN: '',
      href: '',
      parentId: null,
      position: activeTab,
      order: menuItems.filter(i => i.position === activeTab).length,
      isActive: true,
      mobileVisible: true
    };
    setEditingItem(newItem);
    setEditLang('tr');
    setShowEditForm(true);
  };

  const editItem = (item: MenuItem) => {
    setEditingItem({ ...item });
    setEditLang('tr');
    setShowEditForm(true);
  };

  const saveEditingItem = () => {
    if (!editingItem) return;

    const isNew = !menuItems.find(item => item.id === editingItem.id);

    if (isNew) {
      setMenuItems([...menuItems, editingItem]);
    } else {
      setMenuItems(menuItems.map(item =>
        item.id === editingItem.id ? editingItem : item
      ));
    }

    setShowEditForm(false);
    setEditingItem(null);
  };

  const deleteItem = (id: string) => {
    if (confirm('Bu menü öğesini silmek istediğinizden emin misiniz?')) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const getFilteredItems = () => {
    return menuItems.filter(item => item.position === activeTab);
  };

  const getParentMenuItems = () => {
    return getFilteredItems().filter(item => item.parentId === null);
  };

  const getChildMenuItems = (parentId: string) => {
    return getFilteredItems().filter(item => item.parentId === parentId);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Menü & Logo Yönetimi</h1>
            <p className="text-gray-600 mt-1">Site navigasyonunu, logosunu ve butonları yönetin</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveSubTab(activeSubTab === 'settings' ? 'menus' : 'settings')}
              className={`px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeSubTab === 'settings' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'}`}
            >
              <i className={`fas ${activeSubTab === 'settings' ? 'fa-th-list' : 'fa-cog'}`}></i>
              {activeSubTab === 'settings' ? 'Menü Yönetimi' : 'Genel Ayarlar'}
            </button>
            <button
              onClick={() => loadData()}
              className="px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
            >
              <i className="fas fa-sync-alt"></i>
              Geri Yükle
            </button>
            {activeSubTab === 'menus' && (
              <button
                onClick={addNewItem}
                className="px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
              >
                <i className="fas fa-plus"></i>
                Yeni Menü Ekle
              </button>
            )}
          </div>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center justify-between ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            <div className="flex items-center">
              <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-3`}></i>
              {message.text}
            </div>
            <button onClick={() => setMessage({ type: '', text: '' })} className="hover:opacity-75">
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        {/* Position Tabs */}
        <div className="mb-6 flex gap-2 border-b border-gray-100 pb-0.5">
          <button
            onClick={() => { setActiveTab('header'); setActiveSubTab('menus'); }}
            className={`px-8 py-3 font-bold text-sm transition-all relative ${activeTab === 'header' && activeSubTab === 'menus'
              ? 'text-blue-600'
              : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            Üst Menü (Header)
            {activeTab === 'header' && activeSubTab === 'menus' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
          </button>
          <button
            onClick={() => { setActiveTab('footer'); setActiveSubTab('menus'); }}
            className={`px-8 py-3 font-bold text-sm transition-all relative ${activeTab === 'footer' && activeSubTab === 'menus'
              ? 'text-blue-600'
              : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            Alt Menü (Footer)
            {activeTab === 'footer' && activeSubTab === 'menus' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8 mb-8">
          {/* Main Sortable List / Settings */}
          <div className="col-span-12 lg:col-span-8">
            {activeSubTab === 'settings' ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-bold text-gray-800 flex items-center text-sm uppercase tracking-wider">
                    <i className="fas fa-sliders-h mr-2 text-blue-600"></i>
                    {activeTab === 'header' ? 'Header Butonları Yönetimi' : 'Footer Ayarları'}
                  </h3>
                  <div className="flex bg-white/50 p-1 rounded-lg border border-gray-100">
                    <button onClick={() => setEditLang('tr')} className={`px-4 py-1 rounded-md text-[10px] font-bold transition-all ${editLang === 'tr' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}>TR</button>
                    <button onClick={() => setEditLang('en')} className={`px-4 py-1 rounded-md text-[10px] font-bold transition-all ${editLang === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}>EN</button>
                  </div>
                </div>

                <div className="p-8">
                  {activeTab === 'header' ? (
                    <div className="max-w-xl">
                      <p className="text-sm text-gray-500 mb-6 italic">
                        Bu bölümden site başlığının sağ tarafında bulunan (Panel, Üye Ol vb.) butonları yönetebilirsiniz.
                      </p>
                      <div className="space-y-4">
                        {ctaButtons.map((btn, index) => (
                          <div key={btn.id} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-blue-100 transition-all">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                                <i className={`fas ${btn.icon || 'fa-link'}`}></i>
                              </div>
                              <div>
                                <div className="text-sm font-bold text-gray-800">{editLang === 'tr' ? btn.labelTR : btn.labelEN}</div>
                                <div className="text-xs text-gray-400 font-medium">{btn.href}</div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  alert('Buton ayarları yakında eklenecek. Şimdilik sadece menü öğelerini düzenleyebilirsiniz.');
                                }}
                                className="w-8 h-8 rounded-lg bg-white border border-gray-100 text-gray-400 flex items-center justify-center hover:text-blue-600 hover:border-blue-100 transition-all"
                              >
                                <i className="fas fa-edit text-xs"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-12">
                      {/* Footer CTA */}
                      <section>
                        <h4 className="text-sm font-bold text-gray-800 mb-6 flex items-center">
                          <span className="w-1 h-4 bg-blue-600 rounded-full mr-2"></span>
                          Footer CTA (Eylem Çağrısı)
                        </h4>
                        <div className="grid grid-cols-2 gap-6">
                          <Input
                            label="CTA Başlık"
                            value={editLang === 'tr' ? footerDataTR.cta.title : footerDataEN.cta.title}
                            onChange={(val) => {
                              const setter = editLang === 'tr' ? setFooterDataTR : setFooterDataEN;
                              setter(prev => ({ ...prev, cta: { ...prev.cta, title: val } }));
                            }}
                          />
                          <Input
                            label="CTA Alt Başlık"
                            value={editLang === 'tr' ? footerDataTR.cta.subtitle : footerDataEN.cta.subtitle}
                            onChange={(val) => {
                              const setter = editLang === 'tr' ? setFooterDataTR : setFooterDataEN;
                              setter(prev => ({ ...prev, cta: { ...prev.cta, subtitle: val } }));
                            }}
                          />
                          <div className="col-span-1 grid grid-cols-2 gap-4">
                            <Input
                              label="Buton 1 Metin"
                              value={editLang === 'tr' ? footerDataTR.cta.button1Text : footerDataEN.cta.button1Text}
                              onChange={(val) => {
                                const setter = editLang === 'tr' ? setFooterDataTR : setFooterDataEN;
                                setter(prev => ({ ...prev, cta: { ...prev.cta, button1Text: val } }));
                              }}
                            />
                            <Input
                              label="Buton 1 Link"
                              value={editLang === 'tr' ? footerDataTR.cta.button1Link : footerDataEN.cta.button1Link}
                              onChange={(val) => {
                                const setter = editLang === 'tr' ? setFooterDataTR : setFooterDataEN;
                                setter(prev => ({ ...prev, cta: { ...prev.cta, button1Link: val } }));
                              }}
                            />
                          </div>
                          <div className="col-span-1 grid grid-cols-2 gap-4">
                            <Input
                              label="Buton 2 Metin"
                              value={editLang === 'tr' ? footerDataTR.cta.button2Text : footerDataEN.cta.button2Text}
                              onChange={(val) => {
                                const setter = editLang === 'tr' ? setFooterDataTR : setFooterDataEN;
                                setter(prev => ({ ...prev, cta: { ...prev.cta, button2Text: val } }));
                              }}
                            />
                            <Input
                              label="Buton 2 Link"
                              value={editLang === 'tr' ? footerDataTR.cta.button2Link : footerDataEN.cta.button2Link}
                              onChange={(val) => {
                                const setter = editLang === 'tr' ? setFooterDataTR : setFooterDataEN;
                                setter(prev => ({ ...prev, cta: { ...prev.cta, button2Link: val } }));
                              }}
                            />
                          </div>
                        </div>
                      </section>

                      <hr className="border-gray-100" />

                      {/* Bottom Section */}
                      <section>
                        <h4 className="text-sm font-bold text-gray-800 mb-6 flex items-center">
                          <span className="w-1 h-4 bg-blue-600 rounded-full mr-2"></span>
                          Alt Bölüm Bilgileri
                        </h4>
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Footer Logo</label>
                              <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center">
                                <p className="text-[10px] text-gray-500">Logo "Site Ayarları" panelinden yönetilmektedir.</p>
                                <a href="/admin/settings" className="text-[10px] text-blue-600 font-bold hover:underline mt-1 inline-block">Ayarlara Git</a>
                              </div>
                            </div>
                            <Input
                              label="Slogan (Tagline)"
                              value={editLang === 'tr' ? footerDataTR.bottomSection.tagline : footerDataEN.bottomSection.tagline}
                              onChange={(val) => {
                                const setter = editLang === 'tr' ? setFooterDataTR : setFooterDataEN;
                                setter(prev => ({ ...prev, bottomSection: { ...prev.bottomSection, tagline: val } }));
                              }}
                            />
                          </div>

                          <Input
                            label="Kurumsal Başlık"
                            value={editLang === 'tr' ? footerDataTR.bottomSection.corporateTitle : footerDataEN.bottomSection.corporateTitle}
                            onChange={(val) => {
                              const setter = editLang === 'tr' ? setFooterDataTR : setFooterDataEN;
                              setter(prev => ({ ...prev, bottomSection: { ...prev.bottomSection, corporateTitle: val } }));
                            }}
                          />

                          {/* Sosyal Medya Linkleri */}
                          <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Sosyal Medya Linkleri</label>
                              <button onClick={addSocialLink} className="text-[10px] font-bold text-blue-600 hover:text-blue-700">
                                <i className="fas fa-plus mr-1"></i> EKLE
                              </button>
                            </div>
                            <div className="space-y-3">
                              {(editLang === 'tr' ? footerDataTR : footerDataEN).bottomSection.socialLinks?.map((social, index) => (
                                <div key={index} className="flex gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                  <input
                                    type="text"
                                    value={social.platform}
                                    onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                                    placeholder="Platform"
                                    className="w-1/4 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                  />
                                  <input
                                    type="text"
                                    value={social.icon}
                                    onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}
                                    placeholder="Icon (fa-instagram)"
                                    className="w-1/4 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                  />
                                  <input
                                    type="text"
                                    value={social.url}
                                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                                    placeholder="URL"
                                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                  />
                                  <button onClick={() => removeSocialLink(index)} className="text-gray-300 hover:text-red-500 transition-colors px-2">
                                    <i className="fas fa-trash-alt text-xs"></i>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Kurumsal Linkler */}
                          <div className="mt-8 pt-8 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Kurumsal Linkler (Alt Satır)</label>
                              <button onClick={addCorporateLink} className="text-[10px] font-bold text-blue-600 hover:text-blue-700">
                                <i className="fas fa-plus mr-1"></i> EKLE
                              </button>
                            </div>
                            <div className="space-y-3">
                              {(editLang === 'tr' ? footerDataTR : footerDataEN).bottomSection.corporateLinks?.map((link, index) => (
                                <div key={index} className="flex gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                  <input
                                    type="text"
                                    value={link.name}
                                    onChange={(e) => updateCorporateLink(index, 'name', e.target.value)}
                                    placeholder="Link Metni"
                                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                  />
                                  <input
                                    type="text"
                                    value={link.url}
                                    onChange={(e) => updateCorporateLink(index, 'url', e.target.value)}
                                    placeholder="URL"
                                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                  />
                                  <button onClick={() => removeCorporateLink(index)} className="text-gray-300 hover:text-red-500 transition-colors px-2">
                                    <i className="fas fa-trash-alt text-xs"></i>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Input
                            label="Telif Hakkı Metni"
                            value={editLang === 'tr' ? footerDataTR.bottomSection.copyrightText : footerDataEN.bottomSection.copyrightText}
                            onChange={(val) => {
                              const setter = editLang === 'tr' ? setFooterDataTR : setFooterDataEN;
                              setter(prev => ({ ...prev, bottomSection: { ...prev.bottomSection, copyrightText: val } }));
                            }}
                          />
                        </div>
                      </section>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-bold text-gray-800 flex items-center text-sm uppercase tracking-wider">
                    <i className={`fas ${activeTab === 'header' ? 'fa-heading' : 'fa-shoe-prints'} mr-2 text-blue-600`}></i>
                    {activeTab === 'header' ? 'Header' : 'Footer'} Yapısı
                  </h3>
                  <span className="text-[10px] font-bold text-gray-400 bg-white border border-gray-100 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                    {getFilteredItems().length} Öğe
                  </span>
                </div>

                <div className="p-6">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis]}
                  >
                    <SortableContext
                      items={getFilteredItems().map(item => item.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-1">
                        {getParentMenuItems().map((parentItem) => (
                          <React.Fragment key={parentItem.id}>
                            <SortableMenuItem
                              id={parentItem.id}
                              item={parentItem}
                              onEdit={editItem}
                              onDelete={deleteItem}
                            />
                            {getChildMenuItems(parentItem.id).map((childItem) => (
                              <SortableMenuItem
                                key={childItem.id}
                                id={childItem.id}
                                item={childItem}
                                onEdit={editItem}
                                onDelete={deleteItem}
                                depth={1}
                              />
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>

                  {getFilteredItems().length === 0 && (
                    <div className="text-center py-20">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-folder-open text-gray-300 text-2xl"></i>
                      </div>
                      <p className="text-gray-400 font-medium">Bu bölümde henüz menü öğesi yok</p>
                      <button onClick={addNewItem} className="text-blue-600 text-sm font-bold mt-2 hover:underline">
                        + Yeni Öğe Ekle
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Settings & Info Panel */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-blue-600 rounded-2xl shadow-xl shadow-blue-200/50 p-8 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <i className="fas fa-cloud-upload-alt text-xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-2">Değişiklikleri Yayınla</h4>
              <p className="text-blue-100 text-sm mb-8 leading-relaxed">
                Yaptığınız tüm sıralama ve içerik değişikliklerini canlı siteye yansıtmak için kaydedin.
              </p>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-white text-blue-600 hover:bg-blue-50 border-none h-14 text-base font-bold rounded-xl shadow-lg"
              >
                {saving ? (
                  <><i className="fas fa-spinner fa-spin mr-2"></i> Kaydediliyor...</>
                ) : (
                  'Güncelle ve Kaydet'
                )}
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h4 className="font-bold text-gray-800 mb-6 flex items-center text-sm uppercase tracking-wider border-b border-gray-50 pb-4">
                <i className="fas fa-info-circle mr-2 text-blue-600"></i>
                Yönetim İpuçları
              </h4>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <i className="fas fa-arrows-alt text-blue-600 text-xs"></i>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-800 mb-1">Sıralama</h5>
                    <p className="text-xs text-gray-500 leading-relaxed">Tutma simgesini kullanarak öğeleri yer değiştirin.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <i className="fas fa-layer-group text-green-600 text-xs"></i>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-800 mb-1">Hiyerarşi</h5>
                    <p className="text-xs text-gray-500 leading-relaxed">Footer bölümleri için "Ana Menü" öğeleri oluşturun.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                    <i className="fas fa-eye-slash text-orange-600 text-xs"></i>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-800 mb-1">Görünürlük</h5>
                    <p className="text-xs text-gray-500 leading-relaxed">İhtiyaç duymadığınız menüleri silmek yerine gizleyin.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Edit Form Modal */}
        {showEditForm && editingItem && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <i className="fas fa-edit mr-3 text-blue-600"></i>
                    Öğe Düzenle
                  </h2>
                  <p className="text-gray-400 text-xs mt-1 font-medium">
                    {editingItem.position === 'header' ? 'Header Navbar' : 'Footer Menü'} öğesi düzenleniyor
                  </p>
                </div>
                <div className="flex bg-gray-100 p-1.5 rounded-xl">
                  <button onClick={() => setEditLang('tr')} className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${editLang === 'tr' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    TR
                  </button>
                  <button onClick={() => setEditLang('en')} className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${editLang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    EN
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <Input
                  label={`Bağlantı Adı (${editLang === 'tr' ? 'Türkçe' : 'İngilizce'})`}
                  value={editLang === 'tr' ? editingItem.labelTR : editingItem.labelEN}
                  onChange={(val) => setEditingItem({
                    ...editingItem,
                    [editLang === 'tr' ? 'labelTR' : 'labelEN']: val
                  })}
                  placeholder="Butonda görünecek metin"
                />

                <div className="grid grid-cols-2 gap-6">
                  <Select
                    label="Hazır Sayfa Seç"
                    value={CONTENT_PAGES.find(p => `/${p.slug}` === editingItem.href)?.slug || ''}
                    onChange={(val) => {
                      if (val) {
                        const page = CONTENT_PAGES.find(p => p.slug === val);
                        if (page) {
                          setEditingItem({
                            ...editingItem,
                            href: `/${page.slug}`,
                            labelTR: editingItem.labelTR || page.title
                          });
                        }
                      }
                    }}
                    options={[
                      { label: '--- Sayfa Seçin ---', value: '' },
                      ...CONTENT_PAGES.map(p => ({ label: p.title, value: p.slug }))
                    ]}
                  />

                  <Input
                    label="URL / Link"
                    value={editingItem.href}
                    onChange={(val) => setEditingItem({ ...editingItem, href: val })}
                    placeholder="/blog, #hizmetler vb."
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Select
                    label="Üst Kategori"
                    value={editingItem.parentId || ''}
                    onChange={(val) => setEditingItem({ ...editingItem, parentId: val || null })}
                    options={[
                      { label: 'Üst Seviye (Ana Öğe)', value: '' },
                      ...getParentMenuItems()
                        .filter(item => item.id !== editingItem.id)
                        .map(item => ({ label: item.labelTR, value: item.id }))
                    ]}
                  />

                  <Select
                    label="Sayfa Konumu"
                    value={editingItem.position}
                    onChange={(val) => setEditingItem({ ...editingItem, position: val as 'header' | 'footer' })}
                    options={[
                      { label: 'Header (Üst)', value: 'header' },
                      { label: 'Footer (Alt)', value: 'footer' }
                    ]}
                  />
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 grid grid-cols-2 gap-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-gray-800">Yayında</h5>
                      <p className="text-[10px] text-gray-400">Sitede gösterilsin mi?</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={editingItem.isActive}
                        onChange={(e) => setEditingItem({ ...editingItem, isActive: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-gray-800">Mobil Görünüm</h5>
                      <p className="text-[10px] text-gray-400">Mobilde gösterilsin mi?</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={editingItem.mobileVisible}
                        onChange={(e) => setEditingItem({ ...editingItem, mobileVisible: e.target.checked })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-12">
                <Button onClick={saveEditingItem} className="flex-1 h-14 rounded-2xl text-base shadow-lg shadow-blue-200">
                  Değişiklikleri Onayla
                </Button>
                <Button
                  onClick={() => { setShowEditForm(false); setEditingItem(null); }}
                  variant="secondary"
                  className="flex-1 h-14 rounded-2xl text-base"
                >
                  İptal Et
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default NavbarEditor;
