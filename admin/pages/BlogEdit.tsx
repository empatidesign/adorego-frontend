import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../components/Layout';
import { Input, Button, TextArea, Select } from '../components/forms/FormComponents';
import ImageUpload from '../components/forms/ImageUpload';
import Editor from '../components/forms/Editor';
import { blogAPI } from '../services/api';
import MarkdownPreview from '../components/MarkdownPreview';

type Language = 'tr' | 'en';
type Tab = 'content' | 'seo' | 'publish';

const BlogEdit: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [currentLang, setCurrentLang] = useState<Language>('tr');
    const [currentTab, setCurrentTab] = useState<Tab>('content');
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        if (id) {
            loadBlog();
        }
    }, [id]);

    const loadBlog = async () => {
        try {
            const data = await blogAPI.getBlog(id!, 'tr');
            setFormData({
                titleTR: data.titleTR || '',
                titleEN: data.titleEN || '',
                slug: data.slug || '',
                excerptTR: data.excerptTR || '',
                excerptEN: data.excerptEN || '',
                contentTR: data.contentTR || '',
                contentEN: data.contentEN || '',
                featuredImage: data.featuredImage || '',
                category: data.category || 'genel',
                tags: data.tags || [],
                author: data.author || 'adoreGo',
                isPublished: data.isPublished || false,
                seo: data.seo || {
                    metaTitleTR: '',
                    metaTitleEN: '',
                    metaDescriptionTR: '',
                    metaDescriptionEN: '',
                    keywords: [],
                },
            });
        } catch (error) {
            console.error('Blog yüklenemedi:', error);
            setMessage({ type: 'error', text: 'Blog yüklenemedi' });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!formData.titleTR || !formData.slug) {
            setMessage({ type: 'error', text: 'Başlık ve slug alanları zorunludur' });
            return;
        }

        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            await blogAPI.updateBlog(id!, formData);
            setMessage({ type: 'success', text: 'Blog yazısı başarıyla güncellendi!' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Güncelleme başarısız' });
        } finally {
            setSaving(false);
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
            <div className="max-w-6xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Blog Yazısını Düzenle</h1>
                        <p className="text-gray-600 mt-1">{formData.titleTR}</p>
                    </div>
                    <div className="flex gap-3">
                        <Button onClick={() => window.open(`/blog/${formData.slug}`, '_blank')} variant="secondary">
                            <i className="fas fa-external-link-alt mr-2"></i>
                            Görüntüle
                        </Button>
                        <Button onClick={() => navigate('/admin/blog')} variant="secondary">
                            <i className="fas fa-arrow-left mr-2"></i>
                            Geri
                        </Button>
                    </div>
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg shadow-sm border ${message.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                        {message.text}
                    </div>
                )}

                <div className="max-w-4xl">
                    <div className="space-y-6">
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

                        {/* Content/SEO/Publish Tabs */}
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
                                SEO
                            </button>
                            <button
                                onClick={() => setCurrentTab('publish')}
                                className={`px-6 py-3 font-bold text-sm transition-all border-b-2 ${currentTab === 'publish' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                                <i className="fas fa-cog mr-2"></i>
                                YAYIN AYARLARI
                            </button>
                        </div>

                        {/* Tab Content */}
                        {currentTab === 'content' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
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
                                        <div className="border border-gray-100 rounded-xl p-6 bg-gray-50">
                                            <MarkdownPreview content={currentLang === 'tr' ? formData.contentTR : formData.contentEN} />
                                        </div>
                                    ) : (
                                        <Editor
                                            value={currentLang === 'tr' ? formData.contentTR : formData.contentEN}
                                            onChange={(val) => setFormData({ ...formData, [currentLang === 'tr' ? 'contentTR' : 'contentEN']: val })}
                                            placeholder="İçeriğinizi buraya yazın..."
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {currentTab === 'seo' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="flex items-center gap-2 text-gray-800 font-bold border-b border-gray-50 pb-4 mb-4">
                                    <i className="fas fa-search text-blue-600"></i>
                                    Arama Motoru Optimizasyonu (SEO)
                                </div>

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

                        {currentTab === 'publish' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="flex items-center gap-2 text-gray-800 font-bold border-b border-gray-50 pb-4 mb-4">
                                    <i className="fas fa-sliders-h text-blue-600"></i>
                                    Yayınlama ve Görünüm Ayarları
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <Input
                                            label="URL (Slug)"
                                            value={formData.slug}
                                            onChange={(val) => setFormData({ ...formData, slug: val })}
                                            placeholder="blog-yazisi-url"
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

                                        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-800">Yayın Durumu</h4>
                                                <p className="text-xs text-gray-500 mt-1">Yazı sitede görünsün mü?</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.isPublished}
                                                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700">Kapak Görseli</label>
                                        <ImageUpload
                                            currentImage={formData.featuredImage}
                                            onImageUploaded={(url) => setFormData({ ...formData, featuredImage: url })}
                                        />
                                        <p className="text-[10px] text-gray-400 italic mt-2">
                                            * Önerilen boyut: 1200x630px. PNG, JPG veya WebP formatında yükleyin.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 py-8 border-t border-gray-100">
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-10 h-14 rounded-2xl text-base shadow-lg shadow-blue-200"
                            >
                                {saving ? (
                                    <>
                                        <i className="fas fa-circle-notch animate-spin mr-2"></i>
                                        Güncelleniyor...
                                    </>
                                ) : 'Değişiklikleri Kaydet'}
                            </Button>
                            <Button
                                onClick={() => navigate('/admin/blog')}
                                variant="secondary"
                                className="px-10 h-14 rounded-2xl text-base"
                            >
                                İptal Et
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default BlogEdit;
