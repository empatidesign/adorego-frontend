import React, { useEffect, useState } from 'react';
import api, { blogAPI } from '../../services/api';
import { API_BASE_URL } from '../../../api-config';

const OverviewTab: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/content/contact/messages').then(r => setMessages(Array.isArray(r.data) ? r.data : [])).catch(() => {}),
      api.get('/content/newsletter/subscribers').then(r => setSubscribers(Array.isArray(r.data) ? r.data : [])).catch(() => {}),
      blogAPI.getBlogs().then(d => setBlogs(Array.isArray(d) ? d : [])).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  const unread = messages.filter(m => !m.read).length;
  const published = blogs.filter(b => b.isPublished).length;
  const recentMessages = [...messages]
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 5);
  const recentBlogs = [...blogs].slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    {
      label: 'Toplam Mesaj',
      value: messages.length,
      sub: `${unread} okunmamış`,
      gradient: 'from-blue-500 to-indigo-600',
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: 'Okunmamış',
      value: unread,
      sub: unread > 0 ? 'yanıt bekliyor' : 'hepsi okundu',
      gradient: unread > 0 ? 'from-rose-500 to-pink-600' : 'from-slate-400 to-slate-500',
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      ),
    },
    {
      label: 'Newsletter Abonesi',
      value: subscribers.length,
      sub: 'toplam kayıtlı',
      gradient: 'from-emerald-500 to-teal-600',
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
    {
      label: 'Blog Yazısı',
      value: blogs.length,
      sub: `${published} yayında`,
      gradient: 'from-violet-500 to-purple-600',
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Karşılama */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">Genel Bakış</h2>
        <p className="text-sm text-slate-400 mt-0.5">AdorelGo yönetim paneline hoş geldiniz</p>
      </div>

      {/* İstatistik kartları */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden p-5 group hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-sm`}>
                {s.icon}
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">{s.value}</p>
            <p className="text-sm font-medium text-slate-600 mt-0.5">{s.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
          </div>
        ))}
      </div>

      {/* Alt paneller */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Son Mesajlar */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
              <h3 className="text-sm font-semibold text-slate-800">Son Mesajlar</h3>
            </div>
            {unread > 0 && (
              <span className="bg-rose-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                {unread} yeni
              </span>
            )}
          </div>
          {recentMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-slate-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <p className="text-sm text-slate-400">Henüz mesaj yok</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {recentMessages.map(msg => (
                <div key={msg.id} className={`px-5 py-3.5 flex items-center gap-3 hover:bg-slate-50 transition-colors ${!msg.read ? 'bg-blue-50/40' : ''}`}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shrink-0 text-xs font-bold text-slate-600">
                    {(msg.name || '?')[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-800 truncate">{msg.name}</p>
                      {msg.createdAt && (
                        <p className="text-xs text-slate-400 shrink-0">{new Date(msg.createdAt).toLocaleDateString('tr-TR')}</p>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{msg.message}</p>
                  </div>
                  {!msg.read && <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Son Blog Yazıları */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full" />
              <h3 className="text-sm font-semibold text-slate-800">Son Blog Yazıları</h3>
            </div>
            <span className="text-xs text-slate-400">{blogs.length} yazı</span>
          </div>
          {recentBlogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-slate-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <p className="text-sm text-slate-400">Henüz blog yazısı yok</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {recentBlogs.map(blog => {
                const imgUrl = blog.featuredImage
                  ? (blog.featuredImage.startsWith('http') ? blog.featuredImage : `${API_BASE_URL}${blog.featuredImage}`)
                  : '';
                return (
                  <div key={blog.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 shrink-0 overflow-hidden">
                      {imgUrl ? (
                        <img src={imgUrl} alt="" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-slate-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{blog.titleTR}</p>
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium mt-0.5 ${blog.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-600'}`}>
                        {blog.isPublished ? 'Yayında' : 'Taslak'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
