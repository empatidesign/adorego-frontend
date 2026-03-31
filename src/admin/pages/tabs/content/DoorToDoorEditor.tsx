import React from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, AddBtn, RemoveBtn, SeoCard, IconPicker } from './shared';

const DEFAULT = {
  hero: {
    title: 'Kapıdan Alım – Kapıya Teslim',
    subtitle: 'Kargonu biz alıyoruz, alıcının kapısına kadar biz teslim ediyoruz. Sen sadece gönder.',
  },
  howItWorks: {
    title: 'Nasıl Çalışır?',
    subtitle: 'Kargonu hazırla, biz gerisini halledelim.',
    steps: [
      { step: '1', icon: 'fa-box', title: 'Paketini Hazırla', desc: 'Göndereceklerini paketle. Sistem sana doğru ambalaj önerisinde bulunur.' },
      { step: '2', icon: 'fa-calendar-check', title: 'Randevu Al', desc: 'Uygun bir gün ve saat seç. Kuryemiz adresine gelir, kargonu teslim alır.' },
      { step: '3', icon: 'fa-location-dot', title: 'Teslimatı Takip Et', desc: 'Kargon yola çıktıktan itibaren alıcının kapısına kadar her adımı panelden takip edebilirsin.' },
    ],
  },
  advantages: {
    title: 'Neden Kapıdan Alım?',
    items: [
      { icon: 'fa-clock', title: 'Zamandan Tasarruf', desc: 'Kargo şubesine gitme zahmeti yok. Kuryemiz istediğin saatte kapına gelir.' },
      { icon: 'fa-shield-halved', title: 'Güvenli Paketleme', desc: 'Kuryemiz teslim alırken paket durumunu kontrol eder, güvenli taşıma sağlanır.' },
      { icon: 'fa-map-location-dot', title: 'Kapıya Kadar Takip', desc: 'Kargon nereden nereye gideceği gerçek zamanlı olarak takip edilebilir.' },
      { icon: 'fa-hand-holding-dollar', title: 'Uygun Fiyat', desc: 'Kapıdan alım hizmeti ekstra ücret gerektirmez, standart kargo ücretine dahildir.' },
    ],
  },
  cta: {
    title: 'Hemen Gönderi Oluştur',
    subtitle: 'Kapıdan alım ile yurtdışı gönderimin dakikalar içinde hazır.',
    buttonText: 'Hemen Başla',
    buttonUrl: 'https://app.adorelgo.com',
  },
};

const DoorToDoorEditor: React.FC = () => {
  const ed = useEditor(
    () => contentAPI.getContentPage('kapidan-alim-kapiya-teslimat'),
    (d) => contentAPI.updateContentPage('kapidan-alim-kapiya-teslimat', d),
    DEFAULT
  );

  if (ed.loading) return <Loader />;

  return (
    <div className="space-y-6">

      <Card title="Sayfa Başlığı (Hero)">
        <div><Label text="Başlık" /><Input value={ed.data?.hero?.title} onChange={v => ed.set('hero.title', v)} /></div>
        <div><Label text="Alt Yazı" /><Textarea value={ed.data?.hero?.subtitle} onChange={v => ed.set('hero.subtitle', v)} rows={2} /></div>
        <SaveBtn onSave={ed.handleSave} saving={ed.saving} success={ed.success} error={ed.error} />
      </Card>

      <Card title="Nasıl Çalışır?">
        <div><Label text="Bölüm Başlığı" /><Input value={ed.data?.howItWorks?.title} onChange={v => ed.set('howItWorks.title', v)} /></div>
        <div><Label text="Alt Yazı" /><Input value={ed.data?.howItWorks?.subtitle} onChange={v => ed.set('howItWorks.subtitle', v)} /></div>
        <div className="space-y-4 mt-4">
          {(ed.data?.howItWorks?.steps || []).map((step: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div><Label text="Başlık" /><Input value={step.title} onChange={v => ed.set(`howItWorks.steps.${i}.title`, v)} /></div>
                <div><Label text="Icon" /><IconPicker value={step.icon} onChange={v => ed.set(`howItWorks.steps.${i}.icon`, v)} /></div>
              </div>
              <div><Label text="Açıklama" /><Textarea value={step.desc} onChange={v => ed.set(`howItWorks.steps.${i}.desc`, v)} rows={2} /></div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={ed.handleSave} saving={ed.saving} success={ed.success} error={ed.error} />
      </Card>

      <Card title="Avantajlar" action={
        <AddBtn label="Avantaj Ekle" onClick={() => ed.set('advantages.items', [...(ed.data?.advantages?.items || []), { icon: 'fa-check', title: 'Yeni Avantaj', desc: '' }])} />
      }>
        <div><Label text="Bölüm Başlığı" /><Input value={ed.data?.advantages?.title} onChange={v => ed.set('advantages.title', v)} /></div>
        <div className="space-y-4 mt-4">
          {(ed.data?.advantages?.items || []).map((item: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div><Label text="Başlık" /><Input value={item.title} onChange={v => ed.set(`advantages.items.${i}.title`, v)} /></div>
                <div><Label text="Icon" /><IconPicker value={item.icon} onChange={v => ed.set(`advantages.items.${i}.icon`, v)} /></div>
              </div>
              <div><Label text="Açıklama" /><Textarea value={item.desc} onChange={v => ed.set(`advantages.items.${i}.desc`, v)} rows={2} /></div>
              <RemoveBtn onClick={() => ed.set('advantages.items', ed.data.advantages.items.filter((_: any, j: number) => j !== i))} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={ed.handleSave} saving={ed.saving} success={ed.success} error={ed.error} />
      </Card>

      <Card title="Alt CTA">
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Başlık" /><Input value={ed.data?.cta?.title} onChange={v => ed.set('cta.title', v)} /></div>
          <div><Label text="Alt Yazı" /><Input value={ed.data?.cta?.subtitle} onChange={v => ed.set('cta.subtitle', v)} /></div>
          <div><Label text="Buton Metni" /><Input value={ed.data?.cta?.buttonText} onChange={v => ed.set('cta.buttonText', v)} /></div>
          <div><Label text="Buton URL" /><Input value={ed.data?.cta?.buttonUrl} onChange={v => ed.set('cta.buttonUrl', v)} /></div>
        </div>
        <SaveBtn onSave={ed.handleSave} saving={ed.saving} success={ed.success} error={ed.error} />
      </Card>

      <SeoCard slug="kapidan-alim-kapiya-teslimat" defaultSeo={{ metaTitle: 'Kapıdan Alım – Kapıya Teslim | AdorelGo', metaDescription: 'Kargonuzu kapınızdan alıyoruz, alıcının kapısına kadar teslim ediyoruz.', keywords: 'kapıdan alım kapıya teslim, kargo kapıdan alım', canonical: 'https://adorelgo.com/kapidan-alim-kapiya-teslimat' }} />

    </div>
  );
};

export default DoorToDoorEditor;
