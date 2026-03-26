import React, { useState, useEffect } from 'react';
import api from '../../services/api';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
  read?: boolean;
}

interface Subscriber {
  id: string;
  email: string;
  createdAt?: string;
  subscribedAt?: string;
}

// ---- İletişim Mesajları ----
const ContactMessages: React.FC<{ onRead?: () => void }> = ({ onRead }) => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  useEffect(() => {
    api.get('/content/contact/messages').then(r => {
      setMessages(Array.isArray(r.data) ? r.data : []);
    }).catch(() => setMessages([])).finally(() => setLoading(false));
  }, []);

  const openMessage = (msg: ContactMessage) => {
    setSelected(msg);
    if (!msg.read) {
      api.put(`/content/contact/messages/${msg.id}/read`).catch(() => {});
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
      onRead?.();
    }
  };

  if (selected) {
    return (
      <div className="space-y-4">
        <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-sm">← Geri</button>
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Ad Soyad</p>
              <p className="text-sm font-medium text-gray-900 mt-1">{selected.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">E-posta</p>
              <a href={`mailto:${selected.email}`} className="text-sm font-medium text-blue-600 hover:underline mt-1 block">{selected.email}</a>
            </div>
            {selected.createdAt && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Tarih</p>
                <p className="text-sm text-gray-700 mt-1">{new Date(selected.createdAt).toLocaleString('tr-TR')}</p>
              </div>
            )}
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Mesaj</p>
            <p className="text-sm text-gray-800 whitespace-pre-wrap bg-gray-50 rounded-lg p-4">{selected.message}</p>
          </div>
          <a href={`mailto:${selected.email}`}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            <i className="fas fa-reply text-xs"></i> Yanıtla
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900">İletişim Formu Mesajları</h3>
      {loading ? (
        <p className="text-gray-400 text-sm py-4 text-center">Yükleniyor...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-400 text-sm py-4 text-center">Henüz mesaj yok.</p>
      ) : (
        <div className="space-y-2">
          {messages.map(msg => (
            <button key={msg.id} onClick={() => openMessage(msg)}
              className={`w-full text-left border rounded-xl px-5 py-4 hover:border-blue-300 hover:shadow-sm transition-all ${msg.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${msg.read ? 'text-gray-900' : 'text-blue-900'}`}>{msg.name}</p>
                {msg.createdAt && (
                  <p className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString('tr-TR')}</p>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{msg.email}</p>
              <p className="text-sm text-gray-600 mt-1 truncate">{msg.message}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ---- Newsletter ----
const NewsletterSubscribers: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/content/newsletter/subscribers').then(r => {
      setSubscribers(Array.isArray(r.data) ? r.data : []);
    }).catch(() => setSubscribers([])).finally(() => setLoading(false));
  }, []);

  const exportCSV = () => {
    const rows = [['E-posta', 'Tarih'], ...subscribers.map(s => [s.email, s.createdAt || ''])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-aboneleri.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Newsletter Aboneleri</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{subscribers.length} abone</span>
          {subscribers.length > 0 && (
            <button onClick={exportCSV}
              className="border border-gray-300 text-gray-600 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
              <i className="fas fa-download text-xs"></i> CSV
            </button>
          )}
        </div>
      </div>
      {loading ? (
        <p className="text-gray-400 text-sm py-4 text-center">Yükleniyor...</p>
      ) : subscribers.length === 0 ? (
        <p className="text-gray-400 text-sm py-4 text-center">Henüz abone yok.</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">E-posta</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, i) => (
                <tr key={sub.id} className={i < subscribers.length - 1 ? 'border-b border-gray-100' : ''}>
                  <td className="px-5 py-3 text-gray-900">{sub.email}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs">
                    {(sub.subscribedAt || sub.createdAt) ? new Date(sub.subscribedAt || sub.createdAt!).toLocaleDateString('tr-TR') : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ---- Mesajlar Sekmesi ----
const MessagesTab: React.FC<{ onRead?: () => void }> = ({ onRead }) => {
  const [view, setView] = useState<'contact' | 'newsletter'>('contact');

  return (
    <div className="space-y-6">
      <div className="flex gap-2 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setView('contact')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'contact' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
        >
          İletişim Mesajları
        </button>
        <button
          onClick={() => setView('newsletter')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'newsletter' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Newsletter
        </button>
      </div>
      {view === 'contact' ? <ContactMessages onRead={onRead} /> : <NewsletterSubscribers />}
    </div>
  );
};

export default MessagesTab;
