import React, { useState } from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, SeoCard } from './shared';

const LangToggle: React.FC<{ lang: string; onChange: (l: 'tr' | 'en') => void }> = ({ lang, onChange }) => (
  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1 w-fit">
    {(['tr', 'en'] as const).map(l => (
      <button
        key={l}
        onClick={() => onChange(l)}
        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${lang === l ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
      >
        {l === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}
      </button>
    ))}
  </div>
);

const getDefaultTracking = (lang: 'tr' | 'en') => (
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
      }
);

const TrackingEditorInner: React.FC<{ lang: 'tr' | 'en' }> = ({ lang }) => {
  const tracking = useEditor(
    () => contentAPI.getTracking(lang),
    d => contentAPI.updateTracking(d, lang),
    getDefaultTracking(lang)
  );

  if (tracking.loading) return <Loader />;

  return (
    <div className="space-y-6">
      <Card title="Sayfa Başlığı (Hero)">
        <div><Label text="Sayfa Başlığı" /><Input value={tracking.data?.pageTitle} onChange={v => tracking.set('pageTitle', v)} /></div>
        <div><Label text="Breadcrumb Metni" /><Input value={tracking.data?.breadcrumb} onChange={v => tracking.set('breadcrumb', v)} /></div>
        <SaveBtn onSave={tracking.handleSave} saving={tracking.saving} success={tracking.success} error={tracking.error} />
      </Card>

      <Card title="Takip Formu">
        <div><Label text="Form Başlığı (label)" /><Input value={tracking.data?.formTitle} onChange={v => tracking.set('formTitle', v)} /></div>
        <div><Label text="Placeholder" /><Input value={tracking.data?.formPlaceholder} onChange={v => tracking.set('formPlaceholder', v)} /></div>
        <div><Label text="Buton Metni" /><Input value={tracking.data?.buttonText} onChange={v => tracking.set('buttonText', v)} /></div>
        <div><Label text="Yükleniyor Metni" /><Input value={tracking.data?.buttonLoadingText} onChange={v => tracking.set('buttonLoadingText', v)} /></div>
        <SaveBtn onSave={tracking.handleSave} saving={tracking.saving} success={tracking.success} error={tracking.error} />
      </Card>

      <Card title="Bilgi Kutusu">
        <div><Label text="Başlık" /><Input value={tracking.data?.infoTitle} onChange={v => tracking.set('infoTitle', v)} /></div>
        <div><Label text="Metin" /><Textarea value={tracking.data?.infoText} onChange={v => tracking.set('infoText', v)} rows={3} /></div>
        <SaveBtn onSave={tracking.handleSave} saving={tracking.saving} success={tracking.success} error={tracking.error} />
      </Card>

      <SeoCard
        slug="gonderi-takibi"
        lang={lang}
        defaultSeo={lang === 'tr'
          ? { metaTitle: "Gönderi Takibi | AdorelGo", metaDescription: "Kargo takip numaranızla gönderinizi anlık takip edin.", keywords: "kargo takip, gönderi sorgula, kargo nerede", canonical: "https://adorelgo.com/gonderi-takibi" }
          : { metaTitle: "Shipment Tracking | AdorelGo", metaDescription: "Track your shipment instantly with your cargo tracking number.", keywords: "shipment tracking, track cargo, where is my shipment", canonical: "https://adorelgo.com/gonderi-takibi" }}
      />

    </div>
  );
};

const TrackingEditor: React.FC = () => {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Seçili dil için içerik ve SEO yüklenip kaydedilir.</p>
        <LangToggle lang={lang} onChange={setLang} />
      </div>
      <TrackingEditorInner key={lang} lang={lang} />
    </div>
  );
};

export default TrackingEditor;
