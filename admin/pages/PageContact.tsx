import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewLayout from '../components/NewLayout';
import SEOForm from '../components/SEOForm';
import { API_BASE_URL } from '../../src/api-config';

const PageContact: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'tr' | 'en'>('tr');
    const [contentTab, setContentTab] = useState<'content' | 'seo'>('content');

    const [data, setData] = useState({
        tr: {
            pageTitle: 'İletişim',
            breadcrumb: 'İletişim',
            sendMessageTitle: 'Bize mesaj gönderin',
            sendMessageDesc: 'Aşağıdaki formu doldurarak bizimle hızlıca iletişime geçebilirsiniz. Uzman ekibimiz en kısa sürede size geri dönüş yapacaktır.',
            contactInfoTitle: 'İletişim bilgileri',
            formNameLabel: 'Adınız soyadınız',
            formEmailLabel: 'E-posta adresiniz',
            formSubjectLabel: 'Konu',
            formMessageLabel: 'Mesajınız',
            formButton: 'Gönder',
            addressLabel: 'Adres',
            addressValue: 'İstanbul, Türkiye',
            phoneLabel: 'Telefon',
            phoneValue: '+90 (212) 123 45 67',
            emailLabel: 'E-posta',
            emailValue: 'info@adorego.com',
            workingHoursLabel: 'Çalışma saatleri',
            workingHoursValue: 'Pazartesi - Cuma: 09:00 - 18:00',
            quickSupportTitle: 'Hızlı destek hattı',
            quickSupportDesc: 'Her türlü sorunuz için WhatsApp üzerinden bize anında ulaşabilirsiniz.',
            whatsappNumber: '+905551234567',
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.2266489!2d28.9784!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjUiTiAyOMKwNTgnNDIuMiJF!5e0!3m2!1str!2str!4v1234567890'
        },
        en: {
            pageTitle: 'Contact',
            breadcrumb: 'Contact',
            sendMessageTitle: 'Send Us a Message',
            sendMessageDesc: 'Fill out the form below to get in touch with us quickly. Our expert team will get back to you as soon as possible.',
            contactInfoTitle: 'Contact information',
            formNameLabel: 'Your name',
            formEmailLabel: 'Your email',
            formSubjectLabel: 'Subject',
            formMessageLabel: 'Your message',
            formButton: 'Send',
            addressLabel: 'Address',
            addressValue: 'Istanbul, Turkey',
            phoneLabel: 'Phone',
            phoneValue: '+90 (212) 123 45 67',
            emailLabel: 'Email',
            emailValue: 'info@adorego.com',
            workingHoursLabel: 'Working hours',
            workingHoursValue: 'Monday - Friday: 09:00 - 18:00',
            quickSupportTitle: 'Quick support',
            quickSupportDesc: 'You can reach us instantly via WhatsApp for any questions.',
            whatsappNumber: '+905551234567',
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.2266489!2d28.9784!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjUiTiAyOMKwNTgnNDIuMiJF!5e0!3m2!1str!2str!4v1234567890'
        }
    });

    const [seo, setSeo] = useState({
        tr: {
            title: 'İletişim | adoreGo',
            description: 'adoreGo ile iletişime geçin. Sorularınız için bize ulaşın.',
            keywords: 'iletişim, adoreGo iletişim, kargo iletişim, destek',
            ogTitle: '',
            ogDescription: '',
            ogImage: ''
        },
        en: {
            title: 'Contact | adoreGo',
            description: 'Contact adoreGo. Reach us for your questions.',
            keywords: 'contact, adoreGo contact, cargo contact, support',
            ogTitle: '',
            ogDescription: '',
            ogImage: ''
        }
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [responseTR, responseEN, seoTR, seoEN] = await Promise.all([
                axios.get(`${API_BASE_URL}/content/contact?lang=tr`),
                axios.get(`${API_BASE_URL}/content/contact?lang=en`),
                axios.get(`${API_BASE_URL}/content/seo/contact?lang=tr`),
                axios.get(`${API_BASE_URL}/content/seo/contact?lang=en`)
            ]);

            if (responseTR.data && Object.keys(responseTR.data).length > 0) {
                setData(prev => ({ ...prev, tr: { ...prev.tr, ...responseTR.data } }));
            }
            if (responseEN.data && Object.keys(responseEN.data).length > 0) {
                setData(prev => ({ ...prev, en: { ...prev.en, ...responseEN.data } }));
            }
            if (seoTR.data && Object.keys(seoTR.data).length > 0) {
                setSeo(prev => ({ ...prev, tr: { ...prev.tr, ...seoTR.data } }));
            }
            if (seoEN.data && Object.keys(seoEN.data).length > 0) {
                setSeo(prev => ({ ...prev, en: { ...prev.en, ...seoEN.data } }));
            }
        } catch (error) {
            console.error('Veri yüklenirken hata:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('admin_token');
            await Promise.all([
                axios.put(`${API_BASE_URL}/content/contact`, 
                    { data: data.tr, lang: 'tr' },
                    { headers: { Authorization: `Bearer ${token}` } }
                ),
                axios.put(`${API_BASE_URL}/content/contact`, 
                    { data: data.en, lang: 'en' },
                    { headers: { Authorization: `Bearer ${token}` } }
                ),
                axios.put(`${API_BASE_URL}/content/seo/contact`, 
                    { data: seo.tr, lang: 'tr' },
                    { headers: { Authorization: `Bearer ${token}` } }
                ),
                axios.put(`${API_BASE_URL}/content/seo/contact`, 
                    { data: seo.en, lang: 'en' },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
            ]);
            alert('Değişiklikler kaydedildi!');
        } catch (error) {
            console.error('Kaydetme hatası:', error);
            alert('Kaydetme sırasında bir hata oluştu!');
        } finally {
            setSaving(false);
        }
    };

    const updateField = (field: string, value: string) => {
        setData(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab],
                [field]: value
            }
        }));
    };

    const updateSeo = (updates: any) => {
        setSeo(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab],
                ...updates
            }
        }));
    };

    if (loading) {
        return (
            <NewLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500">Yükleniyor...</p>
                    </div>
                </div>
            </NewLayout>
        );
    }

    const currentData = data[activeTab];

    return (
        <NewLayout>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">İletişim Sayfası Yönetimi</h1>
                    <p className="text-gray-600">İletişim sayfasının içeriğini düzenleyin</p>
                </div>

                {/* Language Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('tr')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${
                            activeTab === 'tr'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        🇹🇷 Türkçe
                    </button>
                    <button
                        onClick={() => setActiveTab('en')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${
                            activeTab === 'en'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        🇬🇧 English
                    </button>
                </div>

                {/* Content Tabs */}
                <div className="flex gap-2 mb-6 border-b border-gray-200">
                    <button
                        onClick={() => setContentTab('content')}
                        className={`px-6 py-3 font-semibold transition-all ${
                            contentTab === 'content'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <i className="fas fa-file-alt mr-2"></i>
                        İçerik
                    </button>
                    <button
                        onClick={() => setContentTab('seo')}
                        className={`px-6 py-3 font-semibold transition-all ${
                            contentTab === 'seo'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <i className="fas fa-search mr-2"></i>
                        SEO Ayarları
                    </button>
                </div>

                {contentTab === 'content' && (
                <div className="space-y-6">
                    {/* Page Header */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Sayfa Başlığı</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sayfa Başlığı</label>
                                <input
                                    type="text"
                                    value={currentData.pageTitle}
                                    onChange={(e) => updateField('pageTitle', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Breadcrumb</label>
                                <input
                                    type="text"
                                    value={currentData.breadcrumb}
                                    onChange={(e) => updateField('breadcrumb', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">İletişim Formu</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Form Başlığı</label>
                                <input
                                    type="text"
                                    value={currentData.sendMessageTitle}
                                    onChange={(e) => updateField('sendMessageTitle', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Form Açıklaması</label>
                                <textarea
                                    value={currentData.sendMessageDesc}
                                    onChange={(e) => updateField('sendMessageDesc', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">İsim Label</label>
                                    <input
                                        type="text"
                                        value={currentData.formNameLabel}
                                        onChange={(e) => updateField('formNameLabel', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Label</label>
                                    <input
                                        type="text"
                                        value={currentData.formEmailLabel}
                                        onChange={(e) => updateField('formEmailLabel', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Konu Label</label>
                                    <input
                                        type="text"
                                        value={currentData.formSubjectLabel}
                                        onChange={(e) => updateField('formSubjectLabel', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mesaj Label</label>
                                    <input
                                        type="text"
                                        value={currentData.formMessageLabel}
                                        onChange={(e) => updateField('formMessageLabel', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gönder Butonu</label>
                                <input
                                    type="text"
                                    value={currentData.formButton}
                                    onChange={(e) => updateField('formButton', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">İletişim Bilgileri</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bölüm Başlığı</label>
                                <input
                                    type="text"
                                    value={currentData.contactInfoTitle}
                                    onChange={(e) => updateField('contactInfoTitle', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Adres Label</label>
                                    <input
                                        type="text"
                                        value={currentData.addressLabel}
                                        onChange={(e) => updateField('addressLabel', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
                                    <input
                                        type="text"
                                        value={currentData.addressValue}
                                        onChange={(e) => updateField('addressValue', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon Label</label>
                                    <input
                                        type="text"
                                        value={currentData.phoneLabel}
                                        onChange={(e) => updateField('phoneLabel', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                                    <input
                                        type="text"
                                        value={currentData.phoneValue}
                                        onChange={(e) => updateField('phoneValue', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Label</label>
                                    <input
                                        type="text"
                                        value={currentData.emailLabel}
                                        onChange={(e) => updateField('emailLabel', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="text"
                                        value={currentData.emailValue}
                                        onChange={(e) => updateField('emailValue', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Çalışma Saatleri Label</label>
                                    <input
                                        type="text"
                                        value={currentData.workingHoursLabel}
                                        onChange={(e) => updateField('workingHoursLabel', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Çalışma Saatleri</label>
                                    <input
                                        type="text"
                                        value={currentData.workingHoursValue}
                                        onChange={(e) => updateField('workingHoursValue', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp Support */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">WhatsApp Destek</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                                <input
                                    type="text"
                                    value={currentData.quickSupportTitle}
                                    onChange={(e) => updateField('quickSupportTitle', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                                <textarea
                                    value={currentData.quickSupportDesc}
                                    onChange={(e) => updateField('quickSupportDesc', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Numarası</label>
                                <input
                                    type="text"
                                    value={currentData.whatsappNumber}
                                    onChange={(e) => updateField('whatsappNumber', e.target.value)}
                                    placeholder="+905551234567"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Harita</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Embed URL</label>
                            <input
                                type="text"
                                value={currentData.mapUrl}
                                onChange={(e) => updateField('mapUrl', e.target.value)}
                                placeholder="https://www.google.com/maps/embed?pb=..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Google Maps'ten "Paylaş" → "Haritayı göm" seçeneğinden embed URL'sini alabilirsiniz
                            </p>
                        </div>
                    </div>
                </div>
                )}

                {contentTab === 'seo' && (
                    <SEOForm seo={seo[activeTab]} onUpdate={updateSeo} />
                )}

                    {/* Save Button */}
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Kaydediliyor...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-save"></i>
                                    Tüm Değişiklikleri Kaydet
                                </>
                            )}
                        </button>
                    </div>
            </div>
        </NewLayout>
    );
};

export default PageContact;
