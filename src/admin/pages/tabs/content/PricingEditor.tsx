import React from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, SeoCard } from './shared';

const DEFAULT_PRICING = {
  badge: 'FİYAT LİSTESİ',
  title: 'Ülkelere Göre Kargo Fiyatları',
  description: 'Güncel kargo fiyatlarımızı ülke bazlı inceleyebilirsiniz.',
  countries: [],
};

const PricingEditor: React.FC = () => {
  const pricing = useEditor(() => contentAPI.getPricing(), d => contentAPI.updatePricing(d), DEFAULT_PRICING);

  if (pricing.loading) return <Loader />;

  return (
    <div className="space-y-6">
      <Card title="Sayfa Başlığı">
        <div><Label text="Rozet (küçük üst yazı)" /><Input value={pricing.data?.badge} onChange={v => pricing.set('badge', v)} /></div>
        <div><Label text="Başlık" /><Input value={pricing.data?.title} onChange={v => pricing.set('title', v)} /></div>
        <div><Label text="Açıklama" /><Textarea value={pricing.data?.description} onChange={v => pricing.set('description', v)} rows={2} /></div>
        <SaveBtn onSave={pricing.handleSave} saving={pricing.saving} success={pricing.success} error={pricing.error} />
      </Card>

      <SeoCard slug="fiyatlar" defaultSeo={{ metaTitle: "Kargo Fiyatları | AdorelGo", metaDescription: "AdorelGo kargo fiyatları. Yurtiçi ve yurtdışı kargo ücretlerini karşılaştırın.", keywords: "kargo fiyatları, yurtdışı kargo fiyatı, yurtiçi kargo fiyatı", canonical: "https://adorelgo.com/fiyatlar" }} />

    </div>
  );
};

export default PricingEditor;
