import React, { useState } from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, AddBtn, RemoveBtn, SeoCard, IconPicker } from './shared';

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

const getFirstTimeAbroadDefaults = (lang: 'tr' | 'en') => (
  lang === 'tr'
    ? {
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
      }
    : {
        hero: {
          title: 'Sending Abroad for the First Time',
          subtitle: 'A step-by-step guide for first-time international senders. The system guides you, you just prepare the package.',
        },
        intro: {
          title: 'Your First Shipment Is the Easiest',
          text: 'Learn how to create your first international shipment step by step with AdorelGo. You do not need to be a big company or deal with complex processes.',
        },
        steps: {
          title: 'Steps for Your First Shipment',
          items: [
            { icon: 'fa-user-plus', title: 'Sign Up', desc: 'Create your free account in just a few minutes. No paperwork or approval process is required.' },
            { icon: 'fa-box', title: 'Prepare Your Package', desc: 'Enter what you are sending into the system. It helps you choose the right packaging.' },
            { icon: 'fa-file-alt', title: 'Enter the Details', desc: 'Add the recipient address and shipment details. The system automatically prepares the required customs documents.' },
            { icon: 'fa-credit-card', title: 'Make Payment', desc: 'Pay the shipping fee. The price is clear in advance, with no hidden charges.' },
            { icon: 'fa-truck', title: 'Hand Over the Shipment', desc: 'Drop it off at the nearest branch or choose door pickup.' },
          ],
        },
        faq: {
          title: 'What Do First-Time Senders Ask?',
          items: [
            { q: 'Can I send anything abroad?', a: 'Yes, except prohibited and restricted items. The system checks whether your item is allowed.' },
            { q: 'Is customs very complicated?', a: 'Not anymore. The system fills in the required declaration forms for you.' },
            { q: 'How long does it take?', a: 'Economy shipments are usually delivered within 5-15 business days, while express shipments take 2-5 business days.' },
            { q: 'What if the package gets lost?', a: 'All shipments are covered by insurance. We manage the compensation process in case of loss or damage.' },
          ],
        },
        cta: {
          title: 'Create Your First Shipment Now',
          subtitle: 'Sign up, enter your shipment details, and create your first shipment within minutes.',
          buttonText: 'Get Started',
          buttonUrl: 'https://app.adorelgo.com',
        },
      }
);

const FirstTimeAbroadEditorInner: React.FC<{ lang: 'tr' | 'en' }> = ({ lang }) => {
  const ed = useEditor(
    () => contentAPI.getContentPage('ilk-kez-yurtdisina-gondermek', lang),
    (d) => contentAPI.updateContentPage('ilk-kez-yurtdisina-gondermek', d, lang),
    getFirstTimeAbroadDefaults(lang)
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

      <SeoCard
        slug="ilk-kez-yurtdisina-gondermek"
        lang={lang}
        defaultSeo={lang === 'tr'
          ? { metaTitle: 'İlk Kez Yurtdışına Göndermek | AdorelGo', metaDescription: 'Daha önce hiç yurtdışına göndermediniz mi? Adım adım rehberimizle ilk gönderiminizi kolayca yapın.', keywords: 'ilk kez yurtdışına gönderme, yurtdışı kargo nasıl gönderilir', canonical: 'https://adorelgo.com/ilk-kez-yurtdisina-gondermek' }
          : { metaTitle: 'Sending Abroad for the First Time | AdorelGo', metaDescription: 'A simple step-by-step guide for your first international shipment with AdorelGo.', keywords: 'first international shipment, send abroad for first time, how to ship internationally', canonical: 'https://adorelgo.com/ilk-kez-yurtdisina-gondermek' }}
      />

    </div>
  );
};

const FirstTimeAbroadEditor: React.FC = () => {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Seçili dil için içerik ve SEO yüklenip kaydedilir.</p>
        <LangToggle lang={lang} onChange={setLang} />
      </div>
      <FirstTimeAbroadEditorInner key={lang} lang={lang} />
    </div>
  );
};

export default FirstTimeAbroadEditor;
