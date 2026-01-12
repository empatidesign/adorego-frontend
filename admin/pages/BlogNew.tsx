import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewLayout from '../components/NewLayout';
import { Input, Button, TextArea, Select } from '../components/forms/FormComponents';
import ImageUpload from '../components/forms/ImageUpload';
import { blogAPI } from '../services/api';
import MarkdownPreview from '../components/MarkdownPreview';

type Language = 'tr' | 'en';
type Tab = 'content' | 'seo';

const BlogNew: React.FC = () => {
    const navigate = useNavigate();
    const [currentLang, setCurrentLang] = useState<Language>('tr');
    const [currentTab, setCurrentTab] = useState<Tab>('content');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showPreview, setShowPreview] = useState(false);

    const [formData, setFormData] = useState({
        titleTR: '',
        titleEN: '',
        slug: '',
        excerptTR: '',
        excerptEN: '',
        contentTR: '',
        contentEN: '',
        featuredImage: '',
        category: 'genel',
        tags: [] as string[],
        author: 'adoreGo',
        isPublished: false,
        seo: {
            metaTitleTR: '',
            metaTitleEN: '',
            metaDescriptionTR: '',
            metaDescriptionEN: '',
            keywords: [] as string[],
        },
    });

    const generateSlug = () => {
        const title = currentLang === 'tr' ? formData.titleTR : formData.titleEN;
        const slug = title
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        setFormData({ ...formData, slug });
    };

    const handleSave = async () => {
        if (!formData.titleTR || !formData.slug) {
            setMessage({ type: 'error', text: 'Başlık ve slug alanları zorunludur' });
            return;
        }

        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            await blogAPI.createBlog({
                ...formData,
                publishedAt: formData.isPublished ? new Date().toISOString() : null,
            });
            setMessage({ type: 'success', text: 'Blog yazısı başarıyla oluşturuldu!' });
            setTimeout(() => navigate('/admin/blog'), 1500);
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Kayıt başarısız' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <NewLayout>
            <div className="max-w-6xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Yeni Blog Yazısı</h1>
                        <p className="text-gray-600 mt-1">Siteniz için yeni bir içerik oluşturun.</p>
                    </div>
                    <Button onClick={() => navigate('/admin/blog')} variant="secondary">
                        <i className="fas fa-arrow-left mr-2"></i>
                        Geri
                    </Button>
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg shadow-sm border ${message.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Column: Editor */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Language Tabs */}
                        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 inline-flex gap-1">
                            <button
                                onClick={() => setCurrentLang('tr')}
                                className={`px-6 py-2 rounded-lg font-bold transition-all ${currentLang === 'tr' ? 'bg-blue-600 text-white shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-50'}`}
                            >
                                🇹🇷 Türkçe
                            </button>
                            <button
                                onClick={() => setCurrentLang('en')}
                                className={`px-6 py-2 rounded-lg font-bold transition-all ${currentLang === 'en' ? 'bg-blue-600 text-white shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-50'}`}
                            >
                                🇬🇧 English
                            </button>
                        </div>

                        {/* Content/SEO Tabs */}
                        <div className="flex gap-2 border-b border-gray-200">
                            <button
                                onClick={() => setCurrentTab('content')}
                                className={`px-6 py-3 font-bold text-sm transition-all border-b-2 ${currentTab === 'content' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                                <i className="fas fa-paragraph mr-2"></i>
                                İÇERİK
                            </button>
                            <button
                                onClick={() => setCurrentTab('seo')}
                                className={`px-6 py-3 font-bold text-sm transition-all border-b-2 ${currentTab === 'seo' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                                <i className="fas fa-search mr-2"></i>
                                SEO & AYARLAR
                            </button>
                        </div>

                        {currentTab === 'content' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                                <Input
                                    label={`Başlık (${currentLang.toUpperCase()})`}
                                    value={currentLang === 'tr' ? formData.titleTR : formData.titleEN}
                                    onChange={(val) => setFormData({ ...formData, [currentLang === 'tr' ? 'titleTR' : 'titleEN']: val })}
                                    placeholder="Yazı başlığını girin..."
                                />

                                <TextArea
                                    label={`Özet (${currentLang.toUpperCase()})`}
                                    value={currentLang === 'tr' ? formData.excerptTR : formData.excerptEN}
                                    onChange={(val) => setFormData({ ...formData, [currentLang === 'tr' ? 'excerptTR' : 'excerptEN']: val })}
                                    placeholder="Kısa bir giriş yazısı..."
                                    rows={3}
                                />

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-bold text-gray-700">
                                            İçerik ({currentLang.toUpperCase()})
                                        </label>
                                        <button
                                            onClick={() => setShowPreview(!showPreview)}
                                            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                        >
                                            <i className={`fas ${showPreview ? 'fa-edit' : 'fa-eye'}`}></i>
                                            {showPreview ? 'Editöre Dön' : 'Önizlemeyi Göster'}
                                        </button>
                                    </div>

                                    {showPreview ? (
                                        <MarkdownPreview content={currentLang === 'tr' ? formData.contentTR : formData.contentEN} />
                                    ) : (
                                        <TextArea
                                            value={currentLang === 'tr' ? formData.contentTR : formData.contentEN}
                                            onChange={(val) => setFormData({ ...formData, [currentLang === 'tr' ? 'contentTR' : 'contentEN']: val })}
                                            placeholder="İçeriğinizi buraya yazın (Markdown desteğiyle)..."
                                            rows={20}
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {currentTab === 'seo' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-800 text-sm flex gap-3">
                                    <i className="fas fa-info-circle mt-1"></i>
                                    <p>Buradaki ayarlar arama motorlarında görünürlüğünüzü artırır. Başlık ve açıklama alanlarını anahtar kelimelerinizle zenginleştirin.</p>
                                </div>

                                <Input
                                    label={`SEO Başlık (${currentLang.toUpperCase()})`}
                                    value={currentLang === 'tr' ? formData.seo.metaTitleTR : formData.seo.metaTitleEN}
                                    onChange={(val) => setFormData({
                                        ...formData,
                                        seo: { ...formData.seo, [currentLang === 'tr' ? 'metaTitleTR' : 'metaTitleEN']: val }
                                    })}
                                    placeholder="SEO başlığı..."
                                />

                                <TextArea
                                    label={`SEO Açıklama (${currentLang.toUpperCase()})`}
                                    value={currentLang === 'tr' ? formData.seo.metaDescriptionTR : formData.seo.metaDescriptionEN}
                                    onChange={(val) => setFormData({
                                        ...formData,
                                        seo: { ...formData.seo, [currentLang === 'tr' ? 'metaDescriptionTR' : 'metaDescriptionEN']: val }
                                    })}
                                    placeholder="SEO açıklaması..."
                                    rows={3}
                                />

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Anahtar Kelimeler
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.seo.keywords.join(', ')}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            seo: { ...formData.seo, keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k) }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm"
                                        placeholder="lojistik, kargo (virgülle ayırın)"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Settings */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4">Yayınlama Ayarları</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">URL (Slug)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all"
                                            placeholder="blog-yazisi-url"
                                        />
                                        <button
                                            onClick={generateSlug}
                                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                            title="Başlıktan Oluştur"
                                        >
                                            <i className="fas fa-magic"></i>
                                        </button>
                                    </div>
                                </div>

                                <ImageUpload
                                    label="Kapak Görseli"
                                    currentImage={formData.featuredImage}
                                    onImageUploaded={(url) => setFormData({ ...formData, featuredImage: url })}
                                />

                                <Select
                                    label="Kategori"
                                    value={formData.category}
                                    onChange={(val) => setFormData({ ...formData, category: val })}
                                    options={[
                                        { label: 'Genel', value: 'genel' },
                                        { label: 'Yurtdışı Kargo', value: 'yurtdisi-kargo' },
                                        { label: 'Yurtiçi Kargo', value: 'yurtici-kargo' },
                                        { label: 'E-Ticaret', value: 'e-ticaret' },
                                        { label: 'Lojistik', value: 'lojistik' },
                                        { label: 'Rehber', value: 'rehber' },
                                    ]}
                                />

                                <Input
                                    label="Yazar"
                                    value={formData.author}
                                    onChange={(val) => setFormData({ ...formData, author: val })}
                                />

                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={formData.isPublished}
                                                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </div>
                                        <span className="text-sm font-bold text-gray-700">Yayınla</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                                <Button onClick={handleSave} disabled={saving} className="w-full justify-center py-4 text-lg">
                                    {saving ? (
                                        <>
                                            <i className="fas fa-circle-notch animate-spin mr-2"></i>
                                            Kaydediliyor...
                                        </>
                                    ) : 'Kaydet'}
                                </Button>
                                <Button onClick={() => navigate('/admin/blog')} variant="secondary" className="w-full justify-center">
                                    İptal
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NewLayout>
    );
};

export default BlogNew;
