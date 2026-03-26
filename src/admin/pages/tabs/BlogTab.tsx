import React, { useState, useEffect, useRef } from 'react';
import { blogAPI } from '../../services/api';
import { API_BASE_URL } from '../../../api-config';
import RichEditor from '../../components/RichEditor';

interface Blog {
  id: string;
  slug: string;
  titleTR: string;
  titleEN?: string;
  excerptTR?: string;
  isPublished?: boolean;
  featuredImage?: string;
}

const emptyForm = {
  titleTR: '', titleEN: '',
  slug: '',
  excerptTR: '', excerptEN: '',
  contentTR: '', contentEN: '',
  category: '',
  author: 'AdorelGo',
  featuredImage: '',
  isPublished: false,
  tags: '',
  seo: {
    metaTitleTR: '', metaTitleEN: '',
    metaDescriptionTR: '', metaDescriptionEN: '',
    keywords: [] as string[],
  },
};

function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-');
}

// ── Görsel Yükleme ───────────────────────────────────────────
const BlogImageUpload: React.FC<{ value: string; onChange: (url: string) => void }> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem('admin_token');
  const fullUrl = value ? (value.startsWith('http') ? value : `${API_BASE_URL}${value}`) : '';

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${API_BASE_URL}/upload/image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) onChange(data.url);
    } finally { setUploading(false); }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
      onDragOver={e => e.preventDefault()}
      className="relative border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group overflow-hidden"
    >
      {fullUrl ? (
        <div className="relative">
          <img src={fullUrl} alt="cover" className="w-full h-44 object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
            <p className="text-white text-sm font-medium">Değiştirmek için tıkla</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 gap-2">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <p className="text-sm text-gray-500">Kapak görseli yükle</p>
        </div>
      )}
      {uploading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
    </div>
  );
};

// ── Tab bileşeni ─────────────────────────────────────────────
const TabBtn: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button onClick={onClick} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-800'}`}>
    {children}
  </button>
);

// ── Blog Formu ───────────────────────────────────────────────
const BlogForm: React.FC<{
  initial?: any;
  existingSlugs: string[];
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}> = ({ initial, existingSlugs, onSave, onCancel }) => {
  const [form, setForm] = useState(initial || emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  const set = (field: string, value: any) => setForm((f: any) => ({ ...f, [field]: value }));

  const makeUniqueSlug = (base: string) => {
    // Düzenleme modunda kendi slug'ını hariç tut
    const others = existingSlugs.filter(s => s !== initial?.slug);
    if (!others.includes(base)) return base;
    let i = 2;
    while (others.includes(`${base}-${i}`)) i++;
    return `${base}-${i}`;
  };

  const handleTitleChange = (v: string) => {
    set('titleTR', v);
    set('slug', makeUniqueSlug(toSlug(v)));
  };

  const handleSave = async () => {
    if (!form.titleTR || !form.slug) { setError('Türkçe başlık ve slug zorunludur.'); return; }
    setSaving(true); setError('');
    try { await onSave(form); }
    catch (e: any) { setError(e.message || 'Kaydetme hatası.'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-base font-semibold text-gray-900">{initial ? 'Blog Yazısı Düzenle' : 'Yeni Blog Yazısı'}</h3>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div onClick={() => set('isPublished', !form.isPublished)}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${form.isPublished ? 'bg-green-500' : 'bg-gray-200'}`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${form.isPublished ? 'left-5' : 'left-0.5'}`} />
            </div>
            <span className="text-sm text-gray-600">{form.isPublished ? 'Yayında' : 'Taslak'}</span>
          </label>
          <button onClick={handleSave} disabled={saving}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Sol: İçerik */}
        <div className="lg:col-span-2 space-y-4">
          {/* Slug */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 shrink-0">/blog/</span>
              <input value={form.slug}
                onChange={e => { setSlugManual(true); set('slug', e.target.value); }}
                placeholder="url-yolu"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" />
            </div>
          </div>

          {/* Dil seçimi */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
            <div className="flex items-center gap-2">
              <TabBtn active={lang === 'tr'} onClick={() => setLang('tr')}>🇹🇷 Türkçe</TabBtn>
              <TabBtn active={lang === 'en'} onClick={() => setLang('en')}>🇬🇧 English</TabBtn>
            </div>

            {lang === 'tr' ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Başlık *</label>
                  <input value={form.titleTR} onChange={e => handleTitleChange(e.target.value)}
                    placeholder="Blog yazısının Türkçe başlığı"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Özet</label>
                  <textarea value={form.excerptTR} onChange={e => set('excerptTR', e.target.value)}
                    rows={2} placeholder="Kısa özet..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">İçerik</label>
                  <RichEditor value={form.contentTR} onChange={v => set('contentTR', v)} placeholder="Türkçe içerik yazın..." />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Title</label>
                  <input value={form.titleEN} onChange={e => set('titleEN', e.target.value)}
                    placeholder="English title"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Excerpt</label>
                  <textarea value={form.excerptEN} onChange={e => set('excerptEN', e.target.value)}
                    rows={2} placeholder="Short excerpt..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Content</label>
                  <RichEditor value={form.contentEN} onChange={v => set('contentEN', v)} placeholder="Write English content..." />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sağ: Meta */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Kapak Görseli</h4>
            <BlogImageUpload value={form.featuredImage} onChange={v => set('featuredImage', v)} />
            {form.featuredImage && (
              <button onClick={() => set('featuredImage', '')} className="text-xs text-red-400 hover:text-red-600">Görseli Kaldır</button>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Kategori & Yazar</h4>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Kategori</label>
              <input value={form.category} onChange={e => set('category', e.target.value)}
                placeholder="ör. lojistik"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Yazar</label>
              <input value={form.author} onChange={e => set('author', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">SEO</h4>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Meta Başlık (TR)</label>
              <input
                value={form.seo?.metaTitleTR ?? ''}
                onChange={e => set('seo', { ...form.seo, metaTitleTR: e.target.value })}
                placeholder={form.titleTR || 'Otomatik doldurulur'}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Meta Açıklama (TR)</label>
              <textarea
                value={form.seo?.metaDescriptionTR ?? ''}
                onChange={e => set('seo', { ...form.seo, metaDescriptionTR: e.target.value })}
                placeholder={form.excerptTR || 'Otomatik doldurulur'}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Meta Başlık (EN)</label>
              <input
                value={form.seo?.metaTitleEN ?? ''}
                onChange={e => set('seo', { ...form.seo, metaTitleEN: e.target.value })}
                placeholder={form.titleEN || 'Auto-filled'}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Meta Açıklama (EN)</label>
              <textarea
                value={form.seo?.metaDescriptionEN ?? ''}
                onChange={e => set('seo', { ...form.seo, metaDescriptionEN: e.target.value })}
                placeholder={form.excerptEN || 'Auto-filled'}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Anahtar Kelimeler</label>
              <input
                value={Array.isArray(form.seo?.keywords) ? form.seo.keywords.join(', ') : (form.seo?.keywords ?? '')}
                onChange={e => set('seo', { ...form.seo, keywords: e.target.value.split(',').map((k: string) => k.trim()).filter(Boolean) })}
                placeholder="kargo, lojistik, yurtdışı"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">Virgülle ayırın</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Blog Listesi ─────────────────────────────────────────────
const BlogTab: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'new' | 'edit'>('list');
  const [editData, setEditData] = useState<any>(null);
  const [success, setSuccess] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => { loadBlogs(); }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await blogAPI.getBlogs();
      setBlogs(Array.isArray(data) ? data : []);
    }
    catch { setBlogs([]); }
    finally { setLoading(false); }
  };

  const handleNew = async (form: any) => {
    await blogAPI.createBlog(form);
    setSuccess('Blog yazısı oluşturuldu!');
    setTimeout(() => setSuccess(''), 2500);
    setView('list'); loadBlogs();
  };

  const handleUpdate = async (form: any) => {
    await blogAPI.updateBlog(editData.id, form);
    setSuccess('Blog yazısı güncellendi!');
    setTimeout(() => setSuccess(''), 2500);
    setView('list'); loadBlogs();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;
    setDeleting(id);
    try { await blogAPI.deleteBlog(id); loadBlogs(); }
    finally { setDeleting(null); }
  };

  const handleEdit = async (blog: Blog) => {
    const full = await blogAPI.getBlog(blog.slug);
    setEditData(full); setView('edit');
  };

  const slugList = blogs.map(b => b.slug);

  if (view === 'new') return <BlogForm existingSlugs={slugList} onSave={handleNew} onCancel={() => setView('list')} />;
  if (view === 'edit' && editData) return <BlogForm initial={editData} existingSlugs={slugList} onSave={handleUpdate} onCancel={() => setView('list')} />;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Blog Yazıları</h2>
          {!loading && <p className="text-xs text-gray-400 mt-0.5">{blogs.length} yazı</p>}
        </div>
        <button onClick={() => setView('new')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 transition-colors">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Yeni Yazı
        </button>
      </div>

      {success && (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          {success}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium mb-1">Henüz blog yazısı yok</p>
          <p className="text-gray-400 text-sm">İlk yazını oluşturmak için "Yeni Yazı" butonuna tıkla.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {blogs.map(blog => {
            const imgUrl = blog.featuredImage ? (blog.featuredImage.startsWith('http') ? blog.featuredImage : `${API_BASE_URL}${blog.featuredImage}`) : '';
            return (
              <div key={blog.id} className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-gray-300 transition-all group">
                <div className="w-14 h-14 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
                  {imgUrl ? (
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-gray-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 10.5h.008v.008H13.5V10.5z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{blog.titleTR}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-gray-400 font-mono truncate">/blog/{blog.slug}</p>
                    <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-600'}`}>
                      {blog.isPublished ? 'Yayında' : 'Taslak'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(blog)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 112.97 2.97L8.5 18.81l-4 1 1-4 11.362-11.323z" />
                    </svg>
                    Düzenle
                  </button>
                  <button onClick={() => handleDelete(blog.id)} disabled={deleting === blog.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40">
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    {deleting === blog.id ? 'Siliniyor...' : 'Sil'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BlogTab;
