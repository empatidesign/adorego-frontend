import React from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, AddBtn, RemoveBtn, SeoCard, IconPicker } from './shared';

const DEFAULT = {
  hero: {
    title: 'İlk Kez Yurtdışına Gönderenler',
    subtitle: 'Daha önce hiç yurtdışına göndermeyenler için adım adım rehber. Sistem seni yönlendirir, sen sadece paketi hazırla.',
  },
  intro: {
    title: 'İlk Gönderim En Kolayıdır',
    text: 'Adorelgo ile yurtdışına ilk gönderimin adım adım nasıl yapıldığını öğren. Büyük firma olman gerekmez, karmaşık süreçlerle uğraşman da.',
  },
  steps: {
    title: 'İlk Gönderimin Adımları',
    items: [
      { icon: 'fa-user-plus', title: 'Üye Ol', desc: 'Birkaç dakikada ücretsiz hesabını oluştur. Herhangi bir evrak ya da onay süreci gerekmez.' },
      { icon: 'fa-box', title: 'Paketini Hazırla', desc: 'Ne gönderdiğini sisteme gir. Hangi ambalajın uygun olduğunu sistem sana söyler.' },
      { icon: 'fa-file-alt', title: 'Bilgileri Gir', desc: 'Alıcı adresini ve içerik bilgilerini gir. Gümrük için gereken evrakları sistem otomatik oluşturur.' },
      { icon: 'fa-credit-card', title: 'Ödeme Yap', desc: 'Kargo ücretini öde. Fiyat önceden nettir, gizli ücret yoktur.' },
      { icon: 'fa-truck', title: 'Kargonu Ver', desc: 'En yakın şubeye götür ya da kapıdan alım seç.' },
    ],
  },
  faq: {
    title: 'İlk Kez Gönderenler Ne Sorar?',
    items: [
      { q: 'Her şeyi yurtdışına gönderebilir miyim?', a: 'Yasak ve kısıtlı ürünler dışında evet. Sistem gönderdiğin ürünün yasak olup olmadığını kontrol eder.' },
      { q: 'Gümrük çok karmaşık değil mi?', a: 'Artık değil. Sistem gerekli beyan formlarını senin için doldurur.' },
      { q: 'Ne kadar sürer?', a: 'Ekonomik kargolar 5-15 iş günü, express kargolar 2-5 iş günü içinde teslim edilir.' },
      { q: 'Paketin kaybolursa ne olur?', a: 'Tüm gönderiler sigorta kapsamındadır. Kayıp ya da hasar durumunda tazminat sürecini biz yönetiriz.' },
    ],
  },
  cta: {
    title: 'İlk Gönderini Şimdi Yap',
    subtitle: 'Üye ol, sisteme gir ve ilk gönderini dakikalar içinde oluştur.',
    buttonText: 'Hemen Başla',
    buttonUrl: 'https://app.adorelgo.com',
  },
};

const FirstTimeAbroadEditor: React.FC = () => {
  const ed = useEditor(
    () => contentAPI.getContentPage('ilk-kez-yurtdisina-gondermek'),
    (d) => contentAPI.updateContentPage('ilk-kez-yurtdisina-gondermek', d),
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

      <Card title="Adımlar" action={
        <AddBtn label="Adım Ekle" onClick={() => ed.set('steps.items', [...(ed.data?.steps?.items || []), { icon: 'fa-check', title: 'Yeni Adım', desc: '' }])} />
      }>
        <div><Label text="Bölüm Başlığı" /><Input value={ed.data?.steps?.title} onChange={v => ed.set('steps.title', v)} /></div>
        <div className="space-y-4 mt-4">
          {(ed.data?.steps?.items || []).map((item: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div><Label text="Başlık" /><Input value={item.title} onChange={v => ed.set(`steps.items.${i}.title`, v)} /></div>
                <div><Label text="Icon" /><IconPicker value={item.icon} onChange={v => ed.set(`steps.items.${i}.icon`, v)} /></div>
              </div>
              <div><Label text="Açıklama" /><Textarea value={item.desc} onChange={v => ed.set(`steps.items.${i}.desc`, v)} rows={2} /></div>
              <RemoveBtn onClick={() => ed.set('steps.items', ed.data.steps.items.filter((_: any, j: number) => j !== i))} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={ed.handleSave} saving={ed.saving} success={ed.success} error={ed.error} />
      </Card>

      <Card title="Sık Sorulan Sorular" action={
        <AddBtn label="Soru Ekle" onClick={() => ed.set('faq.items', [...(ed.data?.faq?.items || []), { q: 'Yeni soru?', a: 'Cevap...' }])} />
      }>
        <div><Label text="Bölüm Başlığı" /><Input value={ed.data?.faq?.title} onChange={v => ed.set('faq.title', v)} /></div>
        <div className="space-y-4 mt-4">
          {(ed.data?.faq?.items || []).map((item: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-2">
              <div><Label text="Soru" /><Input value={item.q} onChange={v => ed.set(`faq.items.${i}.q`, v)} /></div>
              <div><Label text="Cevap" /><Textarea value={item.a} onChange={v => ed.set(`faq.items.${i}.a`, v)} rows={2} /></div>
              <RemoveBtn onClick={() => ed.set('faq.items', ed.data.faq.items.filter((_: any, j: number) => j !== i))} />
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

      <SeoCard slug="ilk-kez-yurtdisina-gondermek" defaultSeo={{ metaTitle: 'İlk Kez Yurtdışına Göndermek | AdorelGo', metaDescription: 'Daha önce hiç yurtdışına göndermediniz mi? Adım adım rehberimizle ilk gönderiminizi kolayca yapın.', keywords: 'ilk kez yurtdışına gönderme, yurtdışı kargo nasıl gönderilir', canonical: 'https://adorelgo.com/ilk-kez-yurtdisina-gondermek' }} />

    </div>
  );
};

export default FirstTimeAbroadEditor;
