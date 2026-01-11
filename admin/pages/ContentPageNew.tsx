import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/Layout';
import { Input, TextArea, Button } from '../components/forms/FormComponents';
import ImageUpload from '../components/forms/ImageUpload';
import { contentAPI } from '../services/api';

type Language = 'tr' | 'en';

const CATEGORIES = [
    { label: 'Hizmetlerimiz', value: 'Hizmetlerimiz' },
    { label: 'Nasıl Çalışır', value: 'Nasıl Çalışır' },
    { label: 'Bilgi & Kaynaklar', value: 'Bilgi & Kaynaklar' },
    { label: 'Entegrasyonlar', value: 'Entegrasyonlar' },
];

const ContentPageNew: React.FC = () => {
    const navigate = useNavigate();
    const [currentLang, setCurrentLang] = useState<Language>('tr');
    const [currentTab, setCurrentTab] = useState<'content' | 'seo'>('content');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [category, setCategory] = useState('Hizmetlerimiz');
    const [slug, setSlug] = useState('');
    const [icon, setIcon] = useState('');
    const [contentImage, setContentImage] = useState('');

    const [dataTR, setDataTR] = useState<any>({
        title: '',
        description: '',
        contentImage: '',
        sections: [],
        seo: {
            keywords: '',
            metaDescription: ''
        }
    });

    const [dataEN, setDataEN] = useState<any>({
        title: '',
        description: '',
        contentImage: '',
        sections: [],
        seo: {
            keywords: '',
            metaDescription: ''
        }
    });

    const handleSave = async () => {
        if (!slug) {
            setMessage({ type: 'error', text: 'Slug alanı zorunludur!' });
            return;
        }

        if (!dataTR.title) {
            setMessage({ type: 'error', text: 'Türkçe başlık zorunludur!' });
            return;
        }

        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const finalDataTR = { ...dataTR, category, icon, contentImage };
            const finalDataEN = { ...dataEN, category, icon, contentImage };

            await contentAPI.updateContentPage(slug, finalDataTR, 'tr');
            await contentAPI.updateContentPage(slug, finalDataEN, 'en');
            setMessage({ type: 'success', text: 'Sayfa başarıyla oluşturuldu!' });

            setTimeout(() => {
                navigate(`/admin/content-pages/edit/${slug}`);
            }, 1500);
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Oluşturma başarısız' });
        } finally {
            setSaving(false);
        }
    };

    const currentData = currentLang === 'tr' ? dataTR : dataEN;
    const setCurrentData = currentLang === 'tr' ? setDataTR : setDataEN;

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    return (
        <AdminLayout>
            <div className="max-w-5xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <button
                            onClick={() => navigate('/admin/content-pages')}
                            className="text-blue-600 hover:text-blue-700 mb-2 flex items-center gap-2"
                        >
                            <i className="fas fa-arrow-left"></i>
                            Geri Dön
                        </button>
                        <h1 className="text-3xl font-bold text-gray-800">Yeni Sayfa Ekle</h1>
                        <p className="text-gray-600 mt-1">Yeni bir içerik sayfası oluşturun</p>
                    </div>
                </div>

                {/* Language Tabs */}
                <div className="mb-6 flex gap-2">
                    <button onClick={() => setCurrentLang('tr')} className={`px-6 py-2 rounded-lg font-bold ${currentLang === 'tr' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>
                        🇹🇷 Türkçe
                    </button>
                    <button onClick={() => setCurrentLang('en')} className={`px-6 py-2 rounded-lg font-bold ${currentLang === 'en' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>
                        🇬🇧 English
                    </button>
                </div>

                {/* Content/SEO Tabs */}
                <div className="mb-6 flex gap-2">
                    <button onClick={() => setCurrentTab('content')} className={`px-6 py-2 rounded-lg font-medium ${currentTab === 'content' ? 'bg-white text-blue-600 shadow-sm border-2 border-blue-600' : 'bg-gray-50 text-gray-600'}`}>
                        Genel Bilgiler
                    </button>
                    <button onClick={() => setCurrentTab('seo')} className={`px-6 py-2 rounded-lg font-medium ${currentTab === 'seo' ? 'bg-white text-blue-600 shadow-sm border-2 border-blue-600' : 'bg-gray-50 text-gray-600'}`}>
                        SEO Bilgileri
                    </button>
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                        {message.text}
                    </div>
                )}

                <div className="space-y-6">
                    {currentTab === 'content' && (
                        <>
                            {/* Page Settings */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="font-bold text-gray-800 mb-4">Sayfa Ayarları</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent bg-white text-base"
                                        >
                                            {CATEGORIES.map(cat => (
                                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
                                            <input
                                                type="text"
                                                value={slug}
                                                onChange={(e) => setSlug(e.target.value)}
                                                placeholder="ornek-sayfa"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4DB848] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">&nbsp;</label>
                                            <button
                                                onClick={() => setSlug(generateSlug(dataTR.title))}
                                                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={!dataTR.title}
                                            >
                                                <i className="fas fa-magic mr-2"></i>
                                                Otomatik Oluştur
                                            </button>
                                        </div>
                                    </div>

                                    <ImageUpload
                                        label="Sayfa İkonu"
                                        currentImage={icon}
                                        onImageUploaded={setIcon}
                                    />

                                    <p className="text-xs text-gray-500">
                                        Sayfa Linki: <code className="bg-gray-100 px-2 py-1 rounded">/{slug || 'slug-giriniz'}</code>
                                    </p>
                                </div>
                            </div>

                            {/* Basic Info */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="font-bold text-gray-800 mb-4">İçerik ({currentLang === 'tr' ? 'Türkçe' : 'English'})</h3>
                                <div className="space-y-4">
                                    <Input
                                        label="Sayfa Başlığı"
                                        value={currentData.title}
                                        onChange={(val) => setCurrentData({ ...currentData, title: val })}
                                    />
                                    <TextArea
                                        label="Kısa Açıklama"
                                        value={currentData.description}
                                        onChange={(val) => setCurrentData({ ...currentData, description: val })}
                                        rows={3}
                                    />
                                    <p className="text-xs text-gray-500">Bu alan sayfa başlığının altında görünür</p>

                                    <ImageUpload
                                        label="Sayfa Görseli (İçerik)"
                                        currentImage={currentData.contentImage}
                                        onImageUploaded={(url) => setCurrentData({ ...currentData, contentImage: url })}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {currentTab === 'seo' && (
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i className="fas fa-search text-blue-500"></i>
                                SEO Ayarları ({currentLang === 'tr' ? 'Türkçe' : 'English'})
                            </h3>
                            <div className="space-y-4">
                                <Input
                                    label="Anahtar Kelimeler (Keywords)"
                                    value={currentData.seo?.keywords || ''}
                                    onChange={(val) => setCurrentData({
                                        ...currentData,
                                        seo: { ...currentData.seo, keywords: val }
                                    })}
                                    placeholder="kargo, lojistik, yurtdışı"
                                />
                                <p className="text-xs text-gray-500">Virgülle ayırarak yazın</p>

                                <TextArea
                                    label="Meta Açıklama (Meta Description)"
                                    value={currentData.seo?.metaDescription || ''}
                                    onChange={(val) => setCurrentData({
                                        ...currentData,
                                        seo: { ...currentData.seo, metaDescription: val }
                                    })}
                                    rows={3}
                                    placeholder="Arama motorlarında görünecek açıklama..."
                                />
                                <p className="text-xs text-gray-500">Önerilen uzunluk: 150-160 karakter</p>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4">
                        <Button onClick={handleSave} disabled={saving}>
                            {saving ? 'Oluşturuluyor...' : 'Sayfa Oluştur'}
                        </Button>
                        <Button onClick={() => navigate('/admin/content-pages')} variant="secondary">
                            İptal
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ContentPageNew;
