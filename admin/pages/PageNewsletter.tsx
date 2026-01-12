import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewLayout from '../components/NewLayout';

interface Subscriber {
    email: string;
    subscribedAt: string;
    active: boolean;
}

const PageNewsletter: React.FC = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadSubscribers();
    }, []);

    const loadSubscribers = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            console.log('Token:', token);
            const response = await axios.get('http://localhost:3001/api/content/newsletter/subscribers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Subscribers response:', response.data);
            setSubscribers(response.data);
        } catch (error) {
            console.error('Aboneler yüklenemedi:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredSubscribers = subscribers.filter(sub =>
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exportToCSV = () => {
        const csvContent = [
            ['Email', 'Abone Tarihi', 'Durum'],
            ...subscribers.map(sub => [
                sub.email,
                new Date(sub.subscribedAt).toLocaleString('tr-TR'),
                sub.active ? 'Aktif' : 'Pasif'
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `newsletter-aboneler-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const copyEmails = () => {
        const emails = subscribers.map(sub => sub.email).join(', ');
        navigator.clipboard.writeText(emails);
        alert('Tüm e-posta adresleri kopyalandı!');
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

    return (
        <NewLayout>
            <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Newsletter Aboneleri</h1>
                <p className="text-gray-600">Bültene abone olan kullanıcıları görüntüleyin ve yönetin</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-blue-100 text-sm font-medium">Toplam Abone</span>
                        <i className="fas fa-users text-2xl text-blue-200"></i>
                    </div>
                    <div className="text-3xl font-bold">{subscribers.length}</div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-green-100 text-sm font-medium">Aktif Abone</span>
                        <i className="fas fa-check-circle text-2xl text-green-200"></i>
                    </div>
                    <div className="text-3xl font-bold">
                        {subscribers.filter(sub => sub.active).length}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-100 text-sm font-medium">Bu Ay</span>
                        <i className="fas fa-calendar text-2xl text-purple-200"></i>
                    </div>
                    <div className="text-3xl font-bold">
                        {subscribers.filter(sub => {
                            const subDate = new Date(sub.subscribedAt);
                            const now = new Date();
                            return subDate.getMonth() === now.getMonth() && 
                                   subDate.getFullYear() === now.getFullYear();
                        }).length}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex-1 w-full md:w-auto">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="E-posta ara..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button
                            onClick={copyEmails}
                            className="flex-1 md:flex-none px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <i className="fas fa-copy"></i>
                            E-postaları Kopyala
                        </button>
                        <button
                            onClick={exportToCSV}
                            className="flex-1 md:flex-none px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <i className="fas fa-download"></i>
                            CSV İndir
                        </button>
                    </div>
                </div>
            </div>

            {/* Subscribers Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {filteredSubscribers.length === 0 ? (
                    <div className="text-center py-16">
                        <i className="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {searchTerm ? 'Abone bulunamadı' : 'Henüz abone yok'}
                        </h3>
                        <p className="text-gray-500">
                            {searchTerm 
                                ? 'Arama kriterlerinize uygun abone bulunamadı' 
                                : 'Bültene abone olan kullanıcılar burada görünecek'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        E-posta
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Abone Tarihi
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Durum
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredSubscribers.map((subscriber, index) => (
                                    <tr key={subscriber.email} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <i className="fas fa-envelope text-blue-600"></i>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {subscriber.email}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(subscriber.subscribedAt).toLocaleString('tr-TR', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                                subscriber.active 
                                                    ? 'bg-green-100 text-green-700' 
                                                    : 'bg-gray-100 text-gray-700'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${
                                                    subscriber.active ? 'bg-green-500' : 'bg-gray-500'
                                                }`}></span>
                                                {subscriber.active ? 'Aktif' : 'Pasif'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer Info */}
            {filteredSubscribers.length > 0 && (
                <div className="mt-6 text-center text-sm text-gray-500">
                    Toplam {filteredSubscribers.length} abone gösteriliyor
                    {searchTerm && ` (${subscribers.length} aboneden filtrelendi)`}
                </div>
            )}
        </div>
        </NewLayout>
    );
};

export default PageNewsletter;
