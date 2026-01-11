import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, TextArea, Button, Select } from '../../components/forms/FormComponents';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';

// All available pages
const PAGES = [
    // Services
    { slug: 'yurtdisi-kargo', label: '📦 Yurtdışı Kargo', category: 'Hizmetlerimiz' },
    { slug: 'ekonomik-kargo', label: '💰 Ekonomik Kargo', category: 'Hizmetlerimiz' },
    { slug: 'express-kargo', label: '⚡ Express Kargo', category: 'Hizmetlerimiz' },
    { slug: 'yurtdisindan-turkiyeye', label: '🇹🇷 Yurtdışından Türkiye\'ye', category: 'Hizmetlerimiz' },
    { slug: 'yurtici-avantajlar', label: '🏠 Yurtiçi Avantajlar', category: 'Hizmetlerimiz' },
    { slug: 'alici-odemeli-kargo', label: '💳 Alıcı Ödemeli Kargo', category: 'Hizmetlerimiz' },
    { slug: 'kapida-odemeli-kargo', label: '🚪 Kapıda Ödemeli Kargo', category: 'Hizmetlerimiz' },
    { slug: 'buyuk-desi-gonderimler', label: '📏 Büyük Desi Gönderimler', category: 'Hizmetlerimiz' },

    // How It Works
    { slug: 'kapidan-alim-teslim', label: '🚚 Kapıdan Alım – Teslim', category: 'Nasıl Çalışır' },
    { slug: 'ilk-kez-gonderenler', label: '🆕 İlk Kez Gönderenler', category: 'Nasıl Çalışır' },
    { slug: 'gumruk-evrak-rehberi', label: '📋 Gümrük & Evrak Rehberi', category: 'Nasıl Çalışır' },
    { slug: 'yurtdisi-iade-geri', label: '↩️ Yurtdışı İade & Geri', category: 'Nasıl Çalışır' },
    { slug: 'hangi-gonderim-uygun', label: '❓ Hangi Gönderim Uygun?', category: 'Nasıl Çalışır' },

    // Resources
    { slug: 'lojistik-blog', label: '📝 Lojistik Blog', category: 'Bilgi & Kaynaklar' },
    { slug: 'sikca-sorulan-sorular', label: '❓ Sıkça Sorulan Sorular', category: 'Bilgi & Kaynaklar' },
    { slug: 'yurtdisi-kargo-rehberi', label: '📖 Yurtdışı Kargo Rehberi', category: 'Bilgi & Kaynaklar' },
    { slug: 'mikro-ihracat-rehberi', label: '🌍 Mikro İhracat Rehberi', category: 'Bilgi & Kaynaklar' },
    { slug: 'gumruk-rehberi', label: '🛃 Gümrük Rehberi', category: 'Bilgi & Kaynaklar' },
    { slug: 'guncel-duyurular', label: '📢 Güncel Duyurular', category: 'Bilgi & Kaynaklar' },

    // Integrations
    { slug: 'shopify-entegrasyonu', label: '🛍️ Shopify Entegrasyonu', category: 'Entegrasyonlar' },
    { slug: 'etsy-entegrasyonu', label: '🎨 Etsy Entegrasyonu', category: 'Entegrasyonlar' },
    { slug: 'amazon-entegrasyonu', label: '📦 Amazon Entegrasyonu', category: 'Entegrasyonlar' },
    { slug: 'woocommerce', label: '🛒 WooCommerce', category: 'Entegrasyonlar' },
    { slug: 'ozel-site-kargo-api', label: '⚙️ Özel Site Kargo API', category: 'Entegrasyonlar' },
];

const ContentPageEditor: React.FC = () => {
    const [currentLang, setCurrentLang] = useState<Language>('tr');
    const [currentSlug, setCurrentSlug] = useState<string>('yurtdisi-kargo');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [dataTR, setDataTR] = useState<any>({ title: '', description: '', sections: [] });
    const [dataEN, setDataEN] = useState<any>({ title: '', description: '', sections: [] });

    useEffect(() => {
        loadData();
    }, [currentSlug]);

    const loadData = async () => {
        setLoading(true);
        try {
            const resTR = await contentAPI.getContentPage(currentSlug, 'tr');
            const resEN = await contentAPI.getContentPage(currentSlug, 'en');

            if (resTR && Object.keys(resTR).length > 0) setDataTR(resTR);
            if (resEN && Object.keys(resEN).length > 0) setDataEN(resEN);
        } catch (error) {
            console.error('Veri yüklenemedi:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            await contentAPI.updateContentPage(currentSlug, dataTR, 'tr');
            await contentAPI.updateContentPage(currentSlug, dataEN, 'en');
            setMessage({ type: 'success', text: 'Sayfa içeriği başarıyla güncellendi!' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Güncelleme başarısız' });
        } finally {
            setSaving(false);
        }
    };

    const currentData = currentLang === 'tr' ? dataTR : dataEN;
    const setCurrentData = currentLang === 'tr' ? setDataTR : setDataEN;

    const addSection = (type: string) => {
        const newSection: any = { type };
        if (type === 'text' || type === 'heading') newSection.content = '';
        if (type === 'list') newSection.items = [''];
        if (type === 'image') { newSection.url = ''; newSection.alt = ''; newSection.caption = ''; }
        if (type === 'card-grid') newSection.cards = [{ title: '', description: '', icon: '' }];

        setCurrentData({ ...currentData, sections: [...(currentData.sections || []), newSection] });
    };

    const removeSection = (index: number) => {
        setCurrentData({
            ...currentData,
            sections: currentData.sections.filter((_: any, i: number) => i !== index)
        });
    };

    const updateSection = (index: number, field: string, value: any) => {
        const newSections = [...currentData.sections];
        newSections[index] = { ...newSections[index], [field]: value };
        setCurrentData({ ...currentData, sections: newSections });
    };

    const currentPage = PAGES.find(p => p.slug === currentSlug);

    return (
        <AdminLayout>
            <div className="max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">İçerik Sayfaları Yönetimi</h1>
                <p className="text-gray-600 mb-8">Tüm içerik sayfalarını buradan yönetin</p>

                {/* Page Selector */}
                <div className="mb-6 bg-white rounded-xl shadow-md p-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Sayfa Seçin</label>
                    <Select
                        value={currentSlug}
                        onChange={setCurrentSlug}
                        options={PAGES.map(p => ({ label: `${p.category} → ${p.label}`, value: p.slug }))}
                    />
                </div>

                {/* Language Tabs */}
                <div className="mb-6 flex gap-2">
                    <button onClick={() => setCurrentLang('tr')} className={`px-6 py-2 rounded-lg font-bold ${currentLang === 'tr' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>🇹🇷 Türkçe</button>
                    <button onClick={() => setCurrentLang('en')} className={`px-6 py-2 rounded-lg font-bold ${currentLang === 'en' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>🇬🇧 English</button>
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                        {message.text}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12 text-gray-600">Yükleniyor...</div>
                ) : (
                    <div className="space-y-6">
                        {/* Basic Info */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="font-bold text-gray-800 mb-4">Temel Bilgiler</h3>
                            <div className="space-y-4">
                                <Input label="Sayfa Başlığı" value={currentData.title} onChange={(val) => setCurrentData({ ...currentData, title: val })} />
                                <TextArea label="Açıklama" value={currentData.description} onChange={(val) => setCurrentData({ ...currentData, description: val })} rows={3} />
                            </div>
                        </div>

                        {/* Sections */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-800">İçerik Bölümleri</h3>
                                <div className="flex gap-2">
                                    <button onClick={() => addSection('heading')} className="px-3 py-1 bg-blue-500 text-white rounded text-xs">+ Başlık</button>
                                    <button onClick={() => addSection('text')} className="px-3 py-1 bg-green-500 text-white rounded text-xs">+ Metin</button>
                                    <button onClick={() => addSection('list')} className="px-3 py-1 bg-purple-500 text-white rounded text-xs">+ Liste</button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {currentData.sections?.map((section: any, index: number) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold text-sm uppercase text-gray-600">{section.type}</span>
                                            <button onClick={() => removeSection(index)} className="text-red-500 text-sm">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>

                                        {(section.type === 'text' || section.type === 'heading') && (
                                            <TextArea
                                                value={section.content}
                                                onChange={(val) => updateSection(index, 'content', val)}
                                                rows={section.type === 'heading' ? 1 : 4}
                                            />
                                        )}

                                        {section.type === 'list' && (
                                            <div className="space-y-2">
                                                {section.items?.map((item: string, i: number) => (
                                                    <Input
                                                        key={i}
                                                        value={item}
                                                        onChange={(val) => {
                                                            const newItems = [...section.items];
                                                            newItems[i] = val;
                                                            updateSection(index, 'items', newItems);
                                                        }}
                                                    />
                                                ))}
                                                <button
                                                    onClick={() => updateSection(index, 'items', [...section.items, ''])}
                                                    className="text-sm text-blue-600"
                                                >
                                                    + Madde Ekle
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button onClick={handleSave} disabled={saving}>
                                {saving ? 'Kaydediliyor...' : 'Kaydet'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ContentPageEditor;
