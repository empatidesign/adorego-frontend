import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../../../../api-config';
import { contentAPI } from '../../../services/api';

// ── ImageUpload ──────────────────────────────────────────────

export const ImageUpload: React.FC<{
  value: string;
  onChange: (url: string) => void;
  label?: string;
}> = ({ value, onChange, label = 'Görsel' }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('admin_token');
  const fullUrl = value
    ? value.startsWith('http')
      ? value
      : `${API_BASE_URL}${value}`
    : '';

  const handleFile = async (file: File) => {
    setError('');
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
      if (data.success) {
        onChange(data.url);
      } else {
        setError(data.message || 'Yükleme başarısız');
      }
    } catch {
      setError('Yükleme hatası');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <Label text={label} />
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
      >
        {fullUrl ? (
          <div className="flex items-center gap-4">
            <img src={fullUrl} className="h-20 w-32 object-cover rounded-lg shrink-0"
              alt="preview" onError={e => (e.currentTarget.style.display = 'none')} />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 truncate">{value}</p>
              <p className="text-xs text-blue-500 mt-1 group-hover:underline">Değiştirmek için tıkla veya sürükle</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">Resim yüklemek için tıkla veya sürükle bırak</p>
            <p className="text-xs text-gray-400">JPG, PNG, WEBP — max 5MB</p>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

// ── UI ──────────────────────────────────────────────────────

export const Label: React.FC<{ text: string }> = ({ text }) => (
  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{text}</p>
);

export const Input: React.FC<{
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder }) => (
  <input
    value={value ?? ''}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
  />
);

export const Textarea: React.FC<{
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}> = ({ value, onChange, rows = 3, placeholder }) => (
  <textarea
    value={value ?? ''}
    onChange={e => onChange(e.target.value)}
    rows={rows}
    placeholder={placeholder}
    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-y"
  />
);

export const Card: React.FC<{
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}> = ({ title, children, action }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
    {title && (
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        {action}
      </div>
    )}
    {children}
  </div>
);

export const SaveBtn: React.FC<{
  onSave: () => void;
  saving: boolean;
  success: boolean;
  error: string;
}> = ({ onSave, saving, success, error }) => (
  <div className="flex items-center gap-3 pt-1">
    <button
      onClick={onSave}
      disabled={saving}
      className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
    >
      {saving ? 'Kaydediliyor...' : 'Kaydet'}
    </button>
    {success && <span className="text-green-600 text-sm font-medium">✓ Kaydedildi</span>}
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

export const AddBtn: React.FC<{ onClick: () => void; label?: string }> = ({ onClick, label = 'Yeni Ekle' }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
  >
    <span className="text-base leading-none">+</span> {label}
  </button>
);

export const RemoveBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-gray-300 hover:text-red-400 transition-colors text-xl leading-none ml-1 shrink-0"
    title="Sil"
  >×</button>
);

export const Loader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

// ── useEditor hook ───────────────────────────────────────────

function deepMerge(defaults: any, override: any): any {
  // override yoksa default kullan
  if (override === null || override === undefined) return defaults;
  // array ise: override doluysa onu kullan, boşsa default
  if (Array.isArray(defaults)) {
    return Array.isArray(override) && override.length > 0 ? override : defaults;
  }
  // string ise: boş string ise default kullan
  if (typeof override === 'string') return override !== '' ? override : (defaults ?? override);
  // object değilse direkt override
  if (typeof override !== 'object' || typeof defaults !== 'object') return override ?? defaults;
  const result = { ...defaults };
  for (const key of Object.keys(override)) {
    if (override[key] !== null && override[key] !== undefined) {
      result[key] = deepMerge(defaults[key], override[key]);
    }
    // override[key] null/undefined ise defaults[key] kalır
  }
  return result;
}

// ── SeoCard ──────────────────────────────────────────────────

interface SeoDefaults {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonical?: string;
}

export const SeoCard: React.FC<{ slug: string; defaultSeo?: SeoDefaults }> = ({ slug, defaultSeo }) => {
  const [seo, setSeo] = useState<SeoDefaults>({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    contentAPI.getSeo(slug).then((data: any) => {
      const hasSeo = data && Object.keys(data).length > 0;
      setSeo(hasSeo ? data : (defaultSeo ?? {}));
    }).catch(() => setSeo(defaultSeo ?? {}));
  }, [slug]);

  const handleSave = async () => {
    setSaving(true); setError(''); setSuccess(false);
    try {
      await contentAPI.updateSeo(slug, seo);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Kaydetme hatası');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="SEO Ayarları">
      <div><Label text="Meta Başlık (Title)" /><Input value={seo.metaTitle ?? ''} onChange={v => setSeo(s => ({ ...s, metaTitle: v }))} placeholder="Sayfa Başlığı | AdorelGo" /></div>
      <div><Label text="Meta Açıklama (Description)" /><Textarea value={seo.metaDescription ?? ''} onChange={v => setSeo(s => ({ ...s, metaDescription: v }))} rows={2} placeholder="Arama motorlarında görünecek açıklama (max 160 karakter)" /></div>
      <div><Label text="Anahtar Kelimeler" /><Input value={seo.keywords ?? ''} onChange={v => setSeo(s => ({ ...s, keywords: v }))} placeholder="kargo, yurtdışı kargo, ..." /></div>
      <div><Label text="Canonical URL" /><Input value={seo.canonical ?? ''} onChange={v => setSeo(s => ({ ...s, canonical: v }))} placeholder={`https://adorelgo.com/${slug}`} /></div>
      <div className="flex items-center gap-3 pt-1">
        <button onClick={handleSave} disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {saving ? 'Kaydediliyor...' : 'SEO Kaydet'}
        </button>
        {success && <span className="text-green-600 text-sm font-medium">Kaydedildi!</span>}
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </Card>
  );
};

export function useEditor(load: () => Promise<any>, save: (d: any) => Promise<any>, defaultData?: any) {
  const [data, setData] = useState<any>(defaultData ?? null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    load()
      .then(d => {
        const isEmpty = !d || (typeof d === 'object' && !Array.isArray(d) && Object.keys(d).length === 0);
        if (defaultData) {
          setData(isEmpty ? defaultData : deepMerge(defaultData, d));
        } else {
          setData(isEmpty ? null : d);
        }
        setLoading(false);
      })
      .catch(() => {
        setData(defaultData ?? null);
        setLoading(false);
      });
  }, []);

  const set = (path: string, value: any) => {
    if (!path) { setData(value); return; }
    setData((prev: any) => {
      const keys = path.split('.');
      const next = Array.isArray(prev) ? [...prev] : { ...prev };
      let cur: any = next;
      for (let i = 0; i < keys.length - 1; i++) {
        const k: any = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
        cur[k] = Array.isArray(cur[k]) ? [...cur[k]] : { ...cur[k] };
        cur = cur[k];
      }
      const last: any = isNaN(Number(keys[keys.length - 1])) ? keys[keys.length - 1] : Number(keys[keys.length - 1]);
      cur[last] = value;
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true); setError(''); setSuccess(false);
    try {
      await save(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (e: any) {
      setError(e?.response?.data?.message || e.message || 'Kaydetme hatası');
    } finally {
      setSaving(false);
    }
  };

  return { data, setData, loading, saving, success, error, set, handleSave };
}
