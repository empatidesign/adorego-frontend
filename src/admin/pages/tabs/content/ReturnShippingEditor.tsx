import React from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, AddBtn, RemoveBtn, SeoCard, IconPicker } from './shared';

const DEFAULT = {
  hero: {
    title: 'Yurtdışı İade & Geri Gönderim',
    subtitle: 'Teslim edilemeyen ya da iade edilen yurtdışı gönderilerinde süreci biz yönetiriz.',
  },
  intro: {
    title: 'İade Süreci Kontrol Altında',
    text: 'Teslim edilemeyen yurtdışı gönderilerde iade ve geri gönderim süreci adım adım takip edilir. İade veya geri dönüş durumları panelden görülebilir.',
  },
  scenarios: {
    title: 'Hangi Durumlarda İade Olur?',
    items: [
      { icon: 'fa-user-xmark', title: 'Alıcı Bulunamadı', desc: 'Alıcıya ulaşılamaz ya da teslim almazsa, kargo belirli süre sonra iade edilir.' },
      { icon: 'fa-ban', title: 'Gümrükte Ret', desc: 'Hedef ülke gümrüğünde kargo kabul edilmezse sistem seni bilgilendirir ve iade sürecini başlatır.' },
      { icon: 'fa-house-circle-xmark', title: 'Yanlış Adres', desc: 'Adres hatalıysa kargo teslim edilemez. Adres düzeltme veya iade seçenekleri sunulur.' },
      { icon: 'fa-rotate-left', title: 'Alıcı İadesi', desc: 'Alıcı ürünü iade etmek isterse, yurtdışından Türkiye\'ye geri gönderim süreci panelden yönetilir.' },
    ],
  },
  process: {
    title: 'İade Süreci Nasıl İşler?',
    steps: [
      { icon: 'fa-bell', title: 'Bildirim Al', desc: 'Kargon teslim edilemediğinde sana otomatik bildirim gönderilir.' },
      { icon: 'fa-list-check', title: 'Seçenek Sun', desc: 'Yeni adrese yönlendirme, bekleme süresi uzatma veya iade — seçenekler sunulur.' },
      { icon: 'fa-map-location-dot', title: 'Takip Et', desc: 'İade kargosu yola çıktığında panelden anlık olarak takip edebilirsin.' },
      { icon: 'fa-box-open', title: 'Teslim Al', desc: 'Kargo Türkiye\'deki adresine ulaştığında bildirim alırsın.' },
    ],
  },
  guarantees: {
    title: 'Güvenceler',
    items: [
      { icon: 'fa-shield-halved', title: 'Sigorta Kapsamı', desc: 'Tüm gönderiler sigortalıdır. İade sürecinde de sigorta geçerliliğini korur.' },
      { icon: 'fa-headset', title: '7/24 Destek', desc: 'İade sürecinde sorularını 7/24 destek hattımıza iletebilirsin.' },
      { icon: 'fa-clock-rotate-left', title: 'Hızlı İşlem', desc: 'İade taleplerinde en hızlı şekilde işlem başlatılır.' },
    ],
  },
  cta: {
    title: 'Sorun Çıkarsa Biz Varız',
    subtitle: 'İade ve geri gönderim süreçlerinde destek almak için bize ulaş.',
    buttonText: 'Panele Git',
    buttonUrl: 'https://app.adorelgo.com',
  },
};

const ReturnShippingEditor: React.FC = () => {
  const ed = useEditor(
    () => contentAPI.getContentPage('yurtdisi-iade-geri-gonderi'),
    (d) => contentAPI.updateContentPage('yurtdisi-iade-geri-gonderi', d),
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

      <Card title="Giriş">
        <div><Label text="Başlık" /><Input value={ed.data?.intro?.title} onChange={v => ed.set('intro.title', v)} /></div>
        <div><Label text="Metin" /><Textarea value={ed.data?.intro?.text} onChange={v => ed.set('intro.text', v)} rows={3} /></div>
        <SaveBtn onSave={ed.handleSave} saving={ed.saving} success={ed.success} error={ed.error} />
      </Card>

      <Card title="İade Senaryoları" action={
        <AddBtn label="Senaryo Ekle" onClick={() => ed.set('scenarios.items', [...(ed.data?.scenarios?.items || []), { icon: 'fa-xmark', title: 'Yeni Senaryo', desc: '' }])} />
      }>
        <div><Label text="Bölüm Başlığı" /><Input value={ed.data?.scenarios?.title} onChange={v => ed.set('scenarios.title', v)} /></div>
        <div className="space-y-4 mt-4">
          {(ed.data?.scenarios?.items || []).map((item: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div><Label text="Başlık" /><Input value={item.title} onChange={v => ed.set(`scenarios.items.${i}.title`, v)} /></div>
                <div><Label text="Icon" /><IconPicker value={item.icon} onChange={v => ed.set(`scenarios.items.${i}.icon`, v)} /></div>
              </div>
              <div><Label text="Açıklama" /><Textarea value={item.desc} onChange={v => ed.set(`scenarios.items.${i}.desc`, v)} rows={2} /></div>
              <RemoveBtn onClick={() => ed.set('scenarios.items', ed.data.scenarios.items.filter((_: any, j: number) => j !== i))} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={ed.handleSave} saving={ed.saving} success={ed.success} error={ed.error} />
      </Card>

      <Card title="İade Süreci Adımları">
        <div><Label text="Bölüm Başlığı" /><Input value={ed.data?.process?.title} onChange={v => ed.set('process.title', v)} /></div>
        <div className="space-y-4 mt-4">
          {(ed.data?.process?.steps || []).map((step: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div><Label text="Başlık" /><Input value={step.title} onChange={v => ed.set(`process.steps.${i}.title`, v)} /></div>
                <div><Label text="Icon" /><IconPicker value={step.icon} onChange={v => ed.set(`process.steps.${i}.icon`, v)} /></div>
              </div>
              <div><Label text="Açıklama" /><Textarea value={step.desc} onChange={v => ed.set(`process.steps.${i}.desc`, v)} rows={2} /></div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={ed.handleSave} saving={ed.saving} success={ed.success} error={ed.error} />
      </Card>

      <Card title="Güvenceler" action={
        <AddBtn label="Güvence Ekle" onClick={() => ed.set('guarantees.items', [...(ed.data?.guarantees?.items || []), { icon: 'fa-check', title: 'Yeni Güvence', desc: '' }])} />
      }>
        <div><Label text="Bölüm Başlığı" /><Input value={ed.data?.guarantees?.title} onChange={v => ed.set('guarantees.title', v)} /></div>
        <div className="space-y-4 mt-4">
          {(ed.data?.guarantees?.items || []).map((item: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div><Label text="Başlık" /><Input value={item.title} onChange={v => ed.set(`guarantees.items.${i}.title`, v)} /></div>
                <div><Label text="Icon" /><IconPicker value={item.icon} onChange={v => ed.set(`guarantees.items.${i}.icon`, v)} /></div>
              </div>
              <div><Label text="Açıklama" /><Textarea value={item.desc} onChange={v => ed.set(`guarantees.items.${i}.desc`, v)} rows={2} /></div>
              <RemoveBtn onClick={() => ed.set('guarantees.items', ed.data.guarantees.items.filter((_: any, j: number) => j !== i))} />
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

      <SeoCard slug="yurtdisi-iade-geri-gonderi" defaultSeo={{ metaTitle: 'Yurtdışı İade & Geri Gönderim | AdorelGo', metaDescription: 'Teslim edilemeyen veya iade edilen yurtdışı kargolarınızı kolayca yönetin.', keywords: 'yurtdışı iade kargo, geri gönderim, kargo iade süreci', canonical: 'https://adorelgo.com/yurtdisi-iade-geri-gonderi' }} />

    </div>
  );
};

export default ReturnShippingEditor;
