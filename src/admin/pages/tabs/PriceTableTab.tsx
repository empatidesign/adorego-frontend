import React, { useState, useEffect } from 'react';
import { contentAPI } from '../../services/api';

const PriceTableTab: React.FC = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    contentAPI.getPricing('tr')
      .then(d => {
        setCountries(Array.isArray(d?.countries) ? d.countries : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true); setError(''); setSuccess(false);
    try {
      // Mevcut pricing içeriğini koru, sadece countries güncelle
      const current = await contentAPI.getPricing('tr');
      await contentAPI.updatePricing({ ...current, countries }, 'tr');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (e: any) {
      setError(e?.response?.data?.message || e.message || 'Kaydetme hatası');
    } finally {
      setSaving(false);
    }
  };

  const addCountry = () => {
    setCountries(prev => [...prev, { name: '', price: '', currency: '€', time: '' }]);
  };

  const updateCountry = (i: number, field: string, value: string) => {
    setCountries(prev => prev.map((c, idx) => idx === i ? { ...c, [field]: value } : c));
  };

  const removeCountry = (i: number) => {
    setCountries(prev => prev.filter((_, idx) => idx !== i));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
          <h3 className="text-sm font-semibold text-gray-800">Ülke Fiyat Tablosu</h3>
          <button
            onClick={addCountry}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            <span className="text-base leading-none">+</span> Ülke Ekle
          </button>
        </div>

        {/* Tablo başlıkları */}
        <div className="grid grid-cols-[1fr_120px_80px_160px_1fr_40px] gap-2 px-2 mb-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Ülke Adı</p>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Fiyat</p>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Para Birimi</p>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Teslimat Süresi</p>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Gönder Butonu URL</p>
          <span />
        </div>

        {countries.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">Henüz ülke yok. "Ülke Ekle" ile ekleyin.</p>
        ) : (
          <div className="space-y-2">
            {countries.map((c, i) => (
              <div key={i} className="grid grid-cols-[1fr_120px_80px_160px_1fr_40px] gap-2 items-center bg-gray-50 rounded-lg px-2 py-1.5">
                <input
                  value={c.name}
                  onChange={e => updateCountry(i, 'name', e.target.value)}
                  placeholder="ör. Almanya"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <input
                  value={c.price}
                  onChange={e => updateCountry(i, 'price', e.target.value)}
                  placeholder="ör. 12.50"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <input
                  value={c.currency}
                  onChange={e => updateCountry(i, 'currency', e.target.value)}
                  placeholder="€"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <input
                  value={c.time}
                  onChange={e => updateCountry(i, 'time', e.target.value)}
                  placeholder="ör. 3-5 iş günü"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <input
                  value={c.url ?? ''}
                  onChange={e => updateCountry(i, 'url', e.target.value)}
                  placeholder="https://app.adorelgo.com/..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <button
                  onClick={() => removeCountry(i)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-xl leading-none"
                  title="Sil"
                >×</button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 pt-4 mt-2 border-t border-gray-100">
          <button
            onClick={save}
            disabled={saving}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          {success && <span className="text-green-600 text-sm font-medium">✓ Kaydedildi</span>}
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default PriceTableTab;
