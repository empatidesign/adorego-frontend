import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../api-config';

function deepMerge(defaults: any, override: any): any {
    if (override === null || override === undefined) return defaults;
    if (Array.isArray(defaults)) return Array.isArray(override) && override.length > 0 ? override : defaults;
    if (typeof override === 'string') return override !== '' ? override : (defaults ?? override);
    if (typeof override !== 'object' || typeof defaults !== 'object') return override ?? defaults;
    const result = { ...defaults };
    for (const key of Object.keys(override)) {
        if (override[key] !== null && override[key] !== undefined) {
            result[key] = deepMerge(defaults[key], override[key]);
        }
    }
    return result;
}

const getDefaultTrackingContent = (lang: 'tr' | 'en') => (
    lang === 'tr'
        ? {
            pageTitle: 'Gönderi Takibi',
            breadcrumb: 'Gönderi Takibi',
            formTitle: 'Takip Numarası',
            formPlaceholder: 'Örn: ALG123456789TR',
            buttonText: 'Gönderimi Takip Et',
            buttonLoadingText: 'Sorgulanıyor...',
            infoTitle: 'Bilgi',
            infoText: 'Takip numaranızı faturanızda veya size gönderilen e-postada bulabilirsiniz. Sorun yaşıyorsanız müşteri hizmetlerimizle iletişime geçebilirsiniz.',
            emptyTrackingError: 'Lütfen takip numarası giriniz',
            trackingNotFoundError: 'Gönderi bulunamadı. Lütfen takip numaranızı kontrol edin.',
            trackingNumberLabel: 'Takip Numarası',
            currentLocationLabel: 'Mevcut Konum',
            estimatedDeliveryLabel: 'Tahmini Teslimat',
            historyTitle: 'Gönderi Geçmişi',
            statuses: {
                delivered: 'Teslim Edildi',
                in_transit: 'Yolda',
                pending: 'Beklemede',
                unknown: 'Bilinmiyor',
            },
            mockResult: {
                currentLocation: 'İstanbul Dağıtım Merkezi',
                estimatedDelivery: '15.01.2026',
                history: [
                    { date: '09.01.2026 10:30', location: 'İstanbul Dağıtım Merkezi', status: 'Dağıtımda' },
                    { date: '08.01.2026 18:45', location: 'İstanbul Transfer Merkezi', status: 'Transfer Edildi' },
                    { date: '08.01.2026 09:15', location: 'Ankara Çıkış Merkezi', status: 'Yola Çıktı' },
                    { date: '07.01.2026 14:20', location: 'Ankara Şubesi', status: 'Teslim Alındı' },
                ],
            },
        }
        : {
            pageTitle: 'Shipment Tracking',
            breadcrumb: 'Tracking',
            formTitle: 'Tracking Number',
            formPlaceholder: 'e.g. ALG123456789TR',
            buttonText: 'Track Shipment',
            buttonLoadingText: 'Searching...',
            infoTitle: 'Information',
            infoText: 'You can find your tracking number on your invoice or in the email sent to you. If you have any problems, you can contact our customer service.',
            emptyTrackingError: 'Please enter a tracking number',
            trackingNotFoundError: 'Shipment not found. Please check your tracking number.',
            trackingNumberLabel: 'Tracking Number',
            currentLocationLabel: 'Current Location',
            estimatedDeliveryLabel: 'Estimated Delivery',
            historyTitle: 'Shipment History',
            statuses: {
                delivered: 'Delivered',
                in_transit: 'In Transit',
                pending: 'Pending',
                unknown: 'Unknown',
            },
            mockResult: {
                currentLocation: 'Istanbul Distribution Center',
                estimatedDelivery: 'January 15, 2026',
                history: [
                    { date: 'Jan 09, 2026 10:30', location: 'Istanbul Distribution Center', status: 'Out for delivery' },
                    { date: 'Jan 08, 2026 18:45', location: 'Istanbul Transfer Center', status: 'Transferred' },
                    { date: 'Jan 08, 2026 09:15', location: 'Ankara Origin Center', status: 'Departed' },
                    { date: 'Jan 07, 2026 14:20', location: 'Ankara Branch', status: 'Received' },
                ],
            },
        }
);

const Tracking: React.FC = () => {
    const { currentLang } = useLanguage();
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingResult, setTrackingResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [content, setContent] = useState<any>(() => getDefaultTrackingContent(currentLang));

    useEffect(() => {
        const defaults = getDefaultTrackingContent(currentLang);
        setContent(defaults);
        fetch(`${API_BASE_URL}/content/tracking?lang=${currentLang}`)
            .then(res => res.json())
            .then(data => {
                if (data && Object.keys(data).length > 0) {
                    setContent(deepMerge(defaults, data));
                }
            })
            .catch(() => setContent(defaults));
    }, [currentLang]);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!trackingNumber.trim()) {
            setError(content.emptyTrackingError);
            return;
        }

        setLoading(true);
        setError('');
        setTrackingResult(null);

        try {
            // API call will be implemented
            // const response = await trackingAPI.track(trackingNumber);

            // Mock data for now
            setTimeout(() => {
                setTrackingResult({
                    trackingNumber: trackingNumber,
                    status: 'in_transit',
                    currentLocation: content.mockResult.currentLocation,
                    estimatedDelivery: content.mockResult.estimatedDelivery,
                    history: content.mockResult.history,
                });
                setLoading(false);
            }, 1500);
        } catch (err) {
            setError(content.trackingNotFoundError);
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'in_transit': return 'bg-blue-100 text-blue-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'delivered': return content.statuses.delivered;
            case 'in_transit': return content.statuses.in_transit;
            case 'pending': return content.statuses.pending;
            default: return content.statuses.unknown;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <SEO page="gonderi-takibi" />
            <Navbar />
            <main className="flex-grow pt-20">
                {/* Compact Professional Header */}
                <section
                    className="text-white relative flex items-center"
                    style={{
                        background: 'linear-gradient(to right, #0051ba, #003d99)',
                        paddingTop: '28px',
                        paddingBottom: '24px'
                    }}
                >
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-3xl font-bold">{content.pageTitle}</h1>
                            <nav className="flex items-center gap-2 text-sm opacity-80">
                                <Link to="/" className="hover:opacity-100">{currentLang === 'tr' ? 'Anasayfa' : 'Home'}</Link>
                                <span>/</span>
                                <span>{content.breadcrumb}</span>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="py-12 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Tracking Form */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <form onSubmit={handleTrack} className="space-y-6">
                                <div>
                                    <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                        {content.formTitle}
                                    </label>
                                    <input
                                        type="text"
                                        id="trackingNumber"
                                        value={trackingNumber}
                                        onChange={(e) => setTrackingNumber(e.target.value)}
                                        placeholder={content.formPlaceholder}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                    />
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <i className="fas fa-spinner fa-spin"></i>
                                            {content.buttonLoadingText}
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <i className="fas fa-search"></i>
                                            {content.buttonText}
                                        </span>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Tracking Result */}
                        {trackingResult && (
                            <div className="space-y-6">
                                {/* Status Card */}
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">{content.trackingNumberLabel}</p>
                                            <p className="text-xl font-bold text-gray-900">{trackingResult.trackingNumber}</p>
                                        </div>
                                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(trackingResult.status)}`}>
                                            {getStatusText(trackingResult.status)}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                            <i className="fas fa-map-marker-alt text-blue-600 text-xl"></i>
                                            <div>
                                                <p className="text-sm text-gray-500">{content.currentLocationLabel}</p>
                                                <p className="font-medium text-gray-900">{trackingResult.currentLocation}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                            <i className="fas fa-calendar-alt text-blue-600 text-xl"></i>
                                            <div>
                                                <p className="text-sm text-gray-500">{content.estimatedDeliveryLabel}</p>
                                                <p className="font-medium text-gray-900">{trackingResult.estimatedDelivery}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">{content.historyTitle}</h3>
                                    <div className="space-y-4">
                                        {trackingResult.history.map((event: any, index: number) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                                    {index < trackingResult.history.length - 1 && (
                                                        <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                                                    )}
                                                </div>
                                                <div className="flex-1 pb-6">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <p className="font-medium text-gray-900">{event.status}</p>
                                                            <p className="text-sm text-gray-600 mt-1">{event.location}</p>
                                                        </div>
                                                        <p className="text-sm text-gray-500">{event.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Info Box */}
                        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                <i className="fas fa-info-circle"></i>
                                {content.infoTitle}
                            </h3>
                            <p className="text-blue-800 text-sm">
                                {content.infoText}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Tracking;
