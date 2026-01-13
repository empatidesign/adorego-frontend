import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewLayout from '../components/NewLayout';
import { API_BASE_URL } from '../../src/api-config';

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    submittedAt: string;
    read: boolean;
}

const PageContactMessages: React.FC = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await axios.get(`${API_BASE_URL}/content/contact/messages`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Mesajlar yüklenemedi:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (messageId: string) => {
        try {
            const token = localStorage.getItem('admin_token');
            await axios.put(
                `${API_BASE_URL}/content/contact/messages/${messageId}/read`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // Update local state
            setMessages(prev => prev.map(msg => 
                msg.id === messageId ? { ...msg, read: true } : msg
            ));
        } catch (error) {
            console.error('Mesaj okundu olarak işaretlenemedi:', error);
        }
    };

    const handleMessageClick = (message: ContactMessage) => {
        setSelectedMessage(message);
        if (!message.read) {
            markAsRead(message.id);
        }
    };

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const unreadCount = messages.filter(msg => !msg.read).length;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('tr-TR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">İletişim Mesajları</h1>
                    <p className="text-gray-600">İletişim formundan gelen mesajları görüntüleyin</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-100 text-sm font-medium">Toplam Mesaj</span>
                            <i className="fas fa-envelope text-2xl text-blue-200"></i>
                        </div>
                        <div className="text-3xl font-bold">{messages.length}</div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-orange-100 text-sm font-medium">Okunmamış</span>
                            <i className="fas fa-envelope-open text-2xl text-orange-200"></i>
                        </div>
                        <div className="text-3xl font-bold">{unreadCount}</div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-green-100 text-sm font-medium">Bu Ay</span>
                            <i className="fas fa-calendar text-2xl text-green-200"></i>
                        </div>
                        <div className="text-3xl font-bold">
                            {messages.filter(msg => {
                                const msgDate = new Date(msg.submittedAt);
                                const now = new Date();
                                return msgDate.getMonth() === now.getMonth() && 
                                       msgDate.getFullYear() === now.getFullYear();
                            }).length}
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="İsim, email veya konu ara..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                </div>

                {/* Messages List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {filteredMessages.length === 0 ? (
                        <div className="text-center py-16">
                            <i className="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {searchTerm ? 'Mesaj bulunamadı' : 'Henüz mesaj yok'}
                            </h3>
                            <p className="text-gray-500">
                                {searchTerm 
                                    ? 'Arama kriterlerinize uygun mesaj bulunamadı' 
                                    : 'İletişim formundan gelen mesajlar burada görünecek'}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {filteredMessages.map((message) => (
                                <div
                                    key={message.id}
                                    onClick={() => handleMessageClick(message)}
                                    className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                                        !message.read ? 'bg-blue-50/50' : ''
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                    !message.read ? 'bg-blue-100' : 'bg-gray-100'
                                                }`}>
                                                    <i className={`fas fa-user ${
                                                        !message.read ? 'text-blue-600' : 'text-gray-600'
                                                    }`}></i>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-base font-bold text-gray-900 truncate">
                                                            {message.name}
                                                        </h3>
                                                        {!message.read && (
                                                            <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full"></span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500 truncate">{message.email}</p>
                                                </div>
                                            </div>
                                            <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate">
                                                {message.subject}
                                            </h4>
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {message.message}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0 text-right">
                                            <span className="text-xs text-gray-500 block mb-2">
                                                {formatDate(message.submittedAt)}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleMessageClick(message);
                                                }}
                                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                            >
                                                Detay →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                {filteredMessages.length > 0 && (
                    <div className="mt-6 text-center text-sm text-gray-500">
                        Toplam {filteredMessages.length} mesaj gösteriliyor
                        {searchTerm && ` (${messages.length} mesajdan filtrelendi)`}
                    </div>
                )}
            </div>

            {/* Message Detail Modal */}
            {selectedMessage && (
                <div 
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedMessage(null)}
                >
                    <div 
                        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Mesaj Detayı</h2>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                            >
                                <i className="fas fa-times text-gray-500"></i>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Sender Info */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">İsim</label>
                                        <p className="text-gray-900 font-medium mt-1">{selectedMessage.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
                                        <p className="text-gray-900 font-medium mt-1">{selectedMessage.email}</p>
                                    </div>
                                    {selectedMessage.phone && (
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Telefon</label>
                                            <p className="text-gray-900 font-medium mt-1">{selectedMessage.phone}</p>
                                        </div>
                                    )}
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tarih</label>
                                        <p className="text-gray-900 font-medium mt-1">{formatDate(selectedMessage.submittedAt)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Konu</label>
                                <p className="text-lg font-bold text-gray-900">{selectedMessage.subject}</p>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Mesaj</label>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                                        {selectedMessage.message}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-center"
                                >
                                    <i className="fas fa-reply mr-2"></i>
                                    Email ile Yanıtla
                                </a>
                                {selectedMessage.phone && (
                                    <a
                                        href={`tel:${selectedMessage.phone}`}
                                        className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
                                    >
                                        <i className="fas fa-phone"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </NewLayout>
    );
};

export default PageContactMessages;
