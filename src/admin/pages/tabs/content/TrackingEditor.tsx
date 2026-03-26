import React from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, SeoCard } from './shared';

const DEFAULT_TRACKING = {
  pageTitle: 'Gönderi Takibi',
  breadcrumb: 'Gönderi Takibi',
  formTitle: 'Takip Numarası',
  formPlaceholder: 'Örn: ALG123456789TR',
  buttonText: 'Gönderimi Takip Et',
  buttonLoadingText: 'Sorgulanıyor...',
  infoTitle: 'Bilgi',
  infoText: 'Takip numaranızı faturanızda veya size gönderilen e-postada bulabilirsiniz. Sorun yaşıyorsanız müşteri hizmetlerimizle iletişime geçebilirsiniz.',
};

const TrackingEditor: React.FC = () => {
  const tracking = useEditor(
    () => contentAPI.getTracking(),
    d => contentAPI.updateTracking(d),
    DEFAULT_TRACKING
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

      <SeoCard slug="gonderi-takibi" defaultSeo={{ metaTitle: "Gönderi Takibi | AdorelGo", metaDescription: "Kargo takip numaranızla gönderinizi anlık takip edin.", keywords: "kargo takip, gönderi sorgula, kargo nerede", canonical: "https://adorelgo.com/gonderi-takibi" }} />

    </div>
  );
};

export default TrackingEditor;
