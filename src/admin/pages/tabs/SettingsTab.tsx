import React, { useState } from 'react';
import { authAPI } from '../../services/api';

// ---- Şifre Değiştirme ----
const ChangePasswordSection: React.FC = () => {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setError(''); setSuccess(false);
    if (next.length < 6) { setError('Yeni şifre en az 6 karakter olmalıdır.'); return; }
    if (next !== confirm) { setError('Yeni şifre ve tekrarı eşleşmiyor.'); return; }
    setSaving(true);
    try {
      await authAPI.changePassword(current, next);
      setSuccess(true);
      setCurrent(''); setNext(''); setConfirm('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Mevcut şifre hatalı.');
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-4 max-w-md">
      <h3 className="font-medium text-gray-900">Şifre Değiştir</h3>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Mevcut Şifre</label>
        <input type="password" value={current} onChange={e => setCurrent(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Yeni Şifre</label>
        <input type="password" value={next} onChange={e => setNext(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Yeni Şifre Tekrar</label>
        <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
      {success && <p className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-lg px-3 py-2">Şifre başarıyla değiştirildi!</p>}
      <button onClick={handleSave} disabled={saving || !current || !next || !confirm}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
        {saving ? 'Kaydediliyor...' : 'Şifreyi Değiştir'}
      </button>
    </div>
  );
};


// ---- Ayarlar Bölümleri ----
const SETTINGS_SECTIONS: { id: string; label: string; description: string; load: () => Promise<any>; save: (d: any) => Promise<any> }[] = [];

// ---- Ayarlar Sekmesi ----
const SettingsTab: React.FC<{ selectedSection: string }> = ({ selectedSection }) => {
  if (selectedSection === 'password') {
    return <ChangePasswordSection />;
  }
  return <ChangePasswordSection />;
};

export default SettingsTab;
