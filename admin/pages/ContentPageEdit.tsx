import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewLayout from '../components/NewLayout';
import { Input, TextArea, Button } from '../components/forms/FormComponents';
import ImageUpload from '../components/forms/ImageUpload';
import { contentAPI } from '../services/api';

type Language = 'tr' | 'en';

const ContentPageEdit: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [currentLang, setCurrentLang] = useState<Language>('tr');
    const [currentTab, setCurrentTab] = useState<'content' | 'seo'>('content');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [icon, setIcon] = useState('');
    const [dataTR, setDataTR] = useState<any>({
        title: '',
        description: '',
        sections: [],
        seo: { keywords: '', metaDescription: '' }
    });
    const [dataEN, setDataEN] = useState<any>({
        title: '',
        description: '',
        sections: [],
        seo: { keywords: '', metaDescription: '' }
    });

    useEffect(() => {
        if (!slug) return;
        loadData();
    }, [slug]);

    const loadData = async () => {
        if (!slug) return;
        setLoading(true);
        try {
            const resTR = await contentAPI.getContentPage(slug, 'tr');
            const resEN = await contentAPI.getContentPage(slug, 'en');

            if (resTR && Object.keys(resTR).length > 0) {
                setDataTR(resTR);
                if (resTR.icon) setIcon(resTR.icon);
            }
            if (resEN && Object.keys(resEN).length > 0) setDataEN(resEN);
        } catch (error) {
            console.error('Veri yüklenemedi:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!slug) return;
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const finalDataTR = { ...dataTR, icon };
            const finalDataEN = { ...dataEN, icon };

            await contentAPI.updateContentPage(slug, finalDataTR, 'tr');
            await contentAPI.updateContentPage(slug, finalDataEN, 'en');
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

    if (loading) {
        return (
            <NewLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-600">Yükleniyor...</div>
                </div>
            </NewLayout>
        );
    }

    return (
        <NewLayout>
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
                        <h1 className="text-3xl font-bold text-gray-800">Sayfa Düzenle</h1>
                        <div className="flex flex-col gap-1 mt-1">
                            <p className="text-gray-600 text-sm">Slug: <code className="bg-gray-100 px-2 py-1 rounded">{slug}</code></p>
                            <p className="text-gray-600 text-sm">Sayfa Linki: <a href={`/${slug}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{window.location.origin}/{slug}</a></p>
                        </div>
                    </div>
                    <a
                        href={`/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium border border-blue-200"
                    >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        Sitede Görüntüle
                    </a>
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
                        İçerik
                    </button>
                    <button onClick={() => setCurrentTab('seo')} className={`px-6 py-2 rounded-lg font-medium ${currentTab === 'seo' ? 'bg-white text-blue-600 shadow-sm border-2 border-blue-600' : 'bg-gray-50 text-gray-600'}`}>
                        SEO
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
                            {/* Icon Upload */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="font-bold text-gray-800 mb-4">Sayfa İkonu</h3>
                                <ImageUpload
                                    label="İkon Resmi"
                                    currentImage={icon}
                                    onImageUploaded={setIcon}
                                />
                            </div>

                            {/* Basic Info */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="font-bold text-gray-800 mb-4">Temel Bilgiler ({currentLang === 'tr' ? 'Türkçe' : 'English'})</h3>
                                <div className="space-y-4">
                                    <Input label="Sayfa Başlığı" value={currentData.title} onChange={(val) => setCurrentData({ ...currentData, title: val })} />
                                    <TextArea label="Kısa Açıklama" value={currentData.description} onChange={(val) => setCurrentData({ ...currentData, description: val })} rows={3} />
                                    <p className="text-xs text-gray-500">Bu alan sayfa başlığının altında görünür</p>

                                    <ImageUpload
                                        label="Sayfa Görseli (İçerik)"
                                        currentImage={currentData.contentImage || ''}
                                        onImageUploaded={(url) => setCurrentData({ ...currentData, contentImage: url })}
                                    />
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
                            {saving ? 'Kaydediliyor...' : 'Kaydet'}
                        </Button>
                        <Button onClick={() => navigate('/admin/content-pages')} variant="secondary">
                            İptal
                        </Button>
                    </div>
                </div>
            </div>
        </NewLayout>
    );
};

export default ContentPageEdit;
