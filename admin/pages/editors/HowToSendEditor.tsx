import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layout';
import { Input, TextArea, Button } from '../../components/forms/FormComponents';
import { contentAPI } from '../../services/api';

type Language = 'tr' | 'en';

const HowToSendEditor: React.FC = () => {
    const [currentLang, setCurrentLang] = useState<Language>('tr');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [dataTR, setDataTR] = useState<any>({
        badge: 'REHBER',
        title: 'Nasıl Gönderirim?',
        description: 'Yurtdışı kargo gönderimi için adım adım rehberimiz.',
        introTitle: 'Kolayca Kargo Gönderin',
        introText: 'Adorego ile yurtdışına kargo göndermek hiç bu kadar kolay olmamıştı. Aşağıdaki adımları takip ederek dakikalar içinde gönderinizi oluşturabilirsiniz.',
        steps: []
    });

    const [dataEN, setDataEN] = useState<any>({
        badge: 'GUIDE',
        title: 'How to Send?',
        description: 'Our step-by-step guide for international shipping.',
        introTitle: 'Send Cargo Easily',
        introText: 'International shipping has never been easier with Adorego. You can create your shipment in minutes by following the steps below.',
        steps: []
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const resTR = await contentAPI.getHowToSend('tr');
            const resEN = await contentAPI.getHowToSend('en');

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
            await contentAPI.updateHowToSend(dataTR, 'tr');
            await contentAPI.updateHowToSend(dataEN, 'en');
            setMessage({ type: 'success', text: 'Rehber içeriği her iki dil için başarıyla güncellendi!' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Güncelleme başarısız' });
        } finally {
            setSaving(false);
        }
    };

    const currentData = currentLang === 'tr' ? dataTR : dataEN;
    const setCurrentData = currentLang === 'tr' ? setDataTR : setDataEN;

    const updateStep = (index: number, field: string, value: string) => {
        const newSteps = [...currentData.steps];
        newSteps[index] = { ...newSteps[index], [field]: value };
        setCurrentData({ ...currentData, steps: newSteps });
    };

    const addStep = () => {
        setCurrentData({
            ...currentData,
            steps: [...currentData.steps, { title: '', content: '', icon: 'fa-info-circle' }]
        });
    };

    const removeStep = (index: number) => {
        setCurrentData({
            ...currentData,
            steps: currentData.steps.filter((_: any, i: number) => i !== index)
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
            <div className="max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Nasıl Gönderirim?</h1>
                <p className="text-gray-600 mb-8">Kargo gönderim rehberi içeriğini yönetin</p>

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
                        <div className="space-y-4">
                            <Input label="Rozet Metni" value={currentData.badge} onChange={(val) => setCurrentData({ ...currentData, badge: val })} />
                            <Input label="Sayfa Başlığı" value={currentData.title} onChange={(val) => setCurrentData({ ...currentData, title: val })} />
                            <TextArea label="Kısa Açıklama (Alt Başlık)" value={currentData.description} onChange={(val) => setCurrentData({ ...currentData, description: val })} rows={2} />
                            <Input label="Giriş Bölümü Başlığı" value={currentData.introTitle} onChange={(val) => setCurrentData({ ...currentData, introTitle: val })} />
                            <TextArea label="Giriş Bölümü Metni (Genel Açıklama)" value={currentData.introText} onChange={(val) => setCurrentData({ ...currentData, introText: val })} rows={4} />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-800">Rehber Adımları</h3>
                            <button onClick={addStep} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium">Adım Ekle</button>
                        </div>
                        <div className="space-y-4">
                            {currentData.steps?.map((step: any, index: number) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-bold">Adım {index + 1}</span>
                                        <button onClick={() => removeStep(index)} className="text-red-500"><i className="fas fa-trash"></i></button>
                                    </div>
                                    <div className="space-y-4">
                                        <Input label="İkon (FontAwesome)" value={step.icon} onChange={(val) => updateStep(index, 'icon', val)} />
                                        <Input label="Başlık" value={step.title} onChange={(val) => updateStep(index, 'title', val)} />
                                        <TextArea label="İçerik" value={step.content} onChange={(val) => updateStep(index, 'content', val)} rows={3} />
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

export default HowToSendEditor;
