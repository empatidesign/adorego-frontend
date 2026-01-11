import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, Button } from '../../components/forms/FormComponents';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';

const PricingEditor: React.FC = () => {
    const [currentLang, setCurrentLang] = useState<Language>('tr');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [dataTR, setDataTR] = useState<any>({
        badge: 'FİYAT LİSTESİ',
        title: 'Ülkelere Göre Kargo Fiyatları',
        description: 'Güncel kargo fiyatlarımızı ülke bazlı inceleyebilirsiniz.',
        countries: []
    });

    const [dataEN, setDataEN] = useState<any>({
        badge: 'PRICE LIST',
        title: 'Shipping Prices by Country',
        description: 'You can review our current shipping prices on a country basis.',
        countries: []
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const resTR = await contentAPI.getPricing('tr');
            const resEN = await contentAPI.getPricing('en');

            if (resTR && Object.keys(resTR).length > 0) setDataTR(resTR);
            if (resEN && Object.keys(resEN).length > 0) setDataEN(resEN);
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
            await contentAPI.updatePricing(dataTR, 'tr');
            await contentAPI.updatePricing(dataEN, 'en');
            setMessage({ type: 'success', text: 'Fiyat listesi her iki dil için başarıyla güncellendi!' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Güncelleme başarısız' });
        } finally {
            setSaving(false);
        }
    };

    const currentData = currentLang === 'tr' ? dataTR : dataEN;
    const setCurrentData = currentLang === 'tr' ? setDataTR : setDataEN;

    const updateCountry = (index: number, field: string, value: string) => {
        const newCountries = [...currentData.countries];
        newCountries[index] = { ...newCountries[index], [field]: value };
        setCurrentData({ ...currentData, countries: newCountries });
    };

    const addCountry = () => {
        setCurrentData({
            ...currentData,
            countries: [...currentData.countries, { name: '', price: '', currency: '€', time: '2-4 İş Günü' }]
        });
    };

    const removeCountry = (index: number) => {
        setCurrentData({
            ...currentData,
            countries: currentData.countries.filter((_: any, i: number) => i !== index)
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
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Fiyat Listesi Yönetimi</h1>
                <p className="text-gray-600 mb-8">Ülke bazlı fiyatları yönetin</p>

                <div className="mb-6 flex gap-2">
                    <button onClick={() => setCurrentLang('tr')} className={`px-6 py-2 rounded-lg font-bold ${currentLang === 'tr' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>🇹🇷 Türkçe</button>
                    <button onClick={() => setCurrentLang('en')} className={`px-6 py-2 rounded-lg font-bold ${currentLang === 'en' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>🇬🇧 English</button>
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                        {message.text}
                    </div>
                )}

                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="font-bold text-gray-800 mb-4">Başlık Bilgileri</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Rozet Metni" value={currentData.badge} onChange={(val) => setCurrentData({ ...currentData, badge: val })} />
                            <Input label="Sayfa Başlığı" value={currentData.title} onChange={(val) => setCurrentData({ ...currentData, title: val })} />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-800">Ülke Fiyatları</h3>
                            <button onClick={addCountry} className="px-4 py-2 bg-[#4DB848] text-white rounded-lg hover:bg-[#3da339] text-sm font-medium">Ülke Ekle</button>
                        </div>
                        <div className="space-y-4">
                            {currentData.countries?.map((country: any, index: number) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 grid grid-cols-12 gap-4 items-end">
                                    <div className="col-span-4">
                                        <Input label="Ülke Adı" value={country.name} onChange={(val) => updateCountry(index, 'name', val)} />
                                    </div>
                                    <div className="col-span-2">
                                        <Input label="Fiyat" value={country.price} onChange={(val) => updateCountry(index, 'price', val)} />
                                    </div>
                                    <div className="col-span-2">
                                        <Input label="Birimi" value={country.currency} onChange={(val) => updateCountry(index, 'currency', val)} />
                                    </div>
                                    <div className="col-span-3">
                                        <Input label="Süre" value={country.time} onChange={(val) => updateCountry(index, 'time', val)} />
                                    </div>
                                    <div className="col-span-1 flex justify-center pb-2">
                                        <button onClick={() => removeCountry(index)} className="text-red-500"><i className="fas fa-trash"></i></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <Button onClick={handleSave} disabled={saving}>{saving ? 'Kaydediliyor...' : 'Kaydet'}</Button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default PricingEditor;
