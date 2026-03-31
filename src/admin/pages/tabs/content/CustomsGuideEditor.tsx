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

const getCustomsGuideDefaults = (lang: 'tr' | 'en') => (
  lang === 'tr'
    ? {
        hero: {
          title: 'Gümrük & Evrak Rehberi',
          subtitle: 'Gümrük artık korku değil, rahatlama. Bilmen gereken kadarını bil, gerisini sisteme bırak.',
        },
        intro: {
          title: 'Gümrük = Korku Değil Rahatlama',
          text: 'Karmaşık evraklar, yanlış ürünler, eksik bilgiler… Sistem gerekli olanı sana sorar, gerisini biz takip ederiz.',
        },
        documents: {
          title: 'Hangi Evraklar Gerekli?',
          items: [
            { icon: 'fa-file-invoice', title: 'Ticari Fatura (Commercial Invoice)', desc: 'Gönderilen ürünlerin listesi, değeri ve miktarını gösterir. Sistem bu formu otomatik oluşturur.' },
            { icon: 'fa-file-lines', title: 'Ambalaj Listesi (Packing List)', desc: 'Paketin içeriğini detaylandıran belgedir. Ticari gönderimler için zorunludur.' },
            { icon: 'fa-passport', title: 'Kimlik / Pasaport Fotokopisi', desc: 'Bazı ülkelere gönderimde gönderici kimlik bilgisi istenebilir.' },
            { icon: 'fa-certificate', title: 'Menşe Şahadetnamesi', desc: 'Ürünün üretildiği ülkeyi belgeler. Özellikle ticari gönderimler için bazı ülkeler talep eder.' },
          ],
        },
        systemHelp: {
          title: 'Sistem Seni Nasıl Yönlendirir?',
          items: [
            { icon: 'fa-magnifying-glass', title: 'Ürün Kontrolü', desc: 'Girdiğin ürünün hedef ülkeye girip giremeyeceğini sistem otomatik kontrol eder.' },
            { icon: 'fa-file-circle-check', title: 'Otomatik Form', desc: 'Gümrük beyan formları sistem tarafından otomatik doldurulur.' },
            { icon: 'fa-bell', title: 'Anlık Bildirim', desc: 'Kargon gümrükte bekletilirse anında bildirim alırsın.' },
          ],
        },
        faq: {
          title: 'Gümrük Hakkında Sık Sorulan Sorular',
          items: [
            { q: 'Her ülkeye her ürünü gönderebilir miyim?', a: 'Hayır. Bazı ülkelerin yasak ve kısıtlı ürün listeleri vardır. Sistem gönderdiğin ürünü kontrol eder ve seni uyarır.' },
            { q: 'Gümrük vergisini kim öder?', a: 'Genellikle alıcı öder. Ancak bazı gönderim tiplerinde vergiyi gönderici üstlenebilir.' },
            { q: 'Beyan değerini düşük yazarsam ne olur?', a: 'Yanlış beyan ciddi yaptırımlar ve kargo iadesiyle sonuçlanabilir.' },
            { q: 'Gümrükte sorun çıkarsa ne yapacağım?', a: 'Biz seni bilgilendiririz ve süreci sizin adınıza takip ederiz.' },
          ],
        },
        cta: {
          title: 'Gümrüğü Bize Bırak',
          subtitle: 'Sisteme gir, ürün bilgilerini gir, gerisini biz halledelim.',
          buttonText: 'Hemen Başla',
          buttonUrl: 'https://app.adorelgo.com',
        },
      }
    : {
        hero: {
          title: 'Customs & Documents Guide',
          subtitle: 'Customs is no longer something to fear. Learn what you need to know and leave the rest to the system.',
        },
        intro: {
          title: 'Customs Should Feel Simple',
          text: 'Complex paperwork, incorrect items, missing details... The system asks only for what is necessary and we handle the rest.',
        },
        documents: {
          title: 'Which Documents Are Required?',
          items: [
            { icon: 'fa-file-invoice', title: 'Commercial Invoice', desc: 'Shows the list, value, and quantity of the shipped items. The system creates this form automatically.' },
            { icon: 'fa-file-lines', title: 'Packing List', desc: 'A document that details the contents of the package. It is mandatory for commercial shipments.' },
            { icon: 'fa-passport', title: 'ID / Passport Copy', desc: 'Some countries may request sender identification details.' },
            { icon: 'fa-certificate', title: 'Certificate of Origin', desc: 'Documents the country where the product was manufactured. Some countries request it especially for commercial shipments.' },
          ],
        },
        systemHelp: {
          title: 'How Does the System Guide You?',
          items: [
            { icon: 'fa-magnifying-glass', title: 'Product Check', desc: 'The system automatically checks whether the item you entered can be shipped to the destination country.' },
            { icon: 'fa-file-circle-check', title: 'Automatic Forms', desc: 'Customs declaration forms are filled in automatically by the system.' },
            { icon: 'fa-bell', title: 'Instant Notifications', desc: 'If your shipment is held at customs, you receive an instant notification.' },
          ],
        },
        faq: {
          title: 'Frequently Asked Questions About Customs',
          items: [
            { q: 'Can I send every product to every country?', a: 'No. Some countries have prohibited and restricted item lists. The system checks your item and warns you if needed.' },
            { q: 'Who pays customs duty?', a: 'Usually the receiver pays. In some shipment types, the sender may choose to cover the duty.' },
            { q: 'What happens if I declare a lower value?', a: 'Incorrect declarations can lead to serious penalties and returned shipments.' },
            { q: 'What should I do if there is a customs issue?', a: 'We inform you and follow the process on your behalf.' },
          ],
        },
        cta: {
          title: 'Leave Customs to Us',
          subtitle: 'Enter your shipment and product details, and let us take care of the rest.',
          buttonText: 'Get Started',
          buttonUrl: 'https://app.adorelgo.com',
        },
      }
);

const CustomsGuideEditorInner: React.FC<{ lang: 'tr' | 'en' }> = ({ lang }) => {
  const ed = useEditor(
    () => contentAPI.getContentPage('gumruk-evrak-rehberi', lang),
    (d) => contentAPI.updateContentPage('gumruk-evrak-rehberi', d, lang),
    getCustomsGuideDefaults(lang)
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

      <Card title="Gerekli Evraklar" action={
        <AddBtn label="Evrak Ekle" onClick={() => ed.set('documents.items', [...(ed.data?.documents?.items || []), { icon: 'fa-file', title: 'Yeni Evrak', desc: '' }])} />
      }>
        <div><Label text="Bölüm Başlığı" /><Input value={ed.data?.documents?.title} onChange={v => ed.set('documents.title', v)} /></div>
        <div className="space-y-4 mt-4">
          {(ed.data?.documents?.items || []).map((item: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div><Label text="Başlık" /><Input value={item.title} onChange={v => ed.set(`documents.items.${i}.title`, v)} /></div>
                <div><Label text="Icon" /><IconPicker value={item.icon} onChange={v => ed.set(`documents.items.${i}.icon`, v)} /></div>
              </div>
              <div><Label text="Açıklama" /><Textarea value={item.desc} onChange={v => ed.set(`documents.items.${i}.desc`, v)} rows={2} /></div>
              <RemoveBtn onClick={() => ed.set('documents.items', ed.data.documents.items.filter((_: any, j: number) => j !== i))} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={ed.handleSave} saving={ed.saving} success={ed.success} error={ed.error} />
      </Card>

      <Card title="Sistem Nasıl Yönlendirir?" action={
        <AddBtn label="Madde Ekle" onClick={() => ed.set('systemHelp.items', [...(ed.data?.systemHelp?.items || []), { icon: 'fa-check', title: 'Yeni Madde', desc: '' }])} />
      }>
        <div><Label text="Bölüm Başlığı" /><Input value={ed.data?.systemHelp?.title} onChange={v => ed.set('systemHelp.title', v)} /></div>
        <div className="space-y-4 mt-4">
          {(ed.data?.systemHelp?.items || []).map((item: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div><Label text="Başlık" /><Input value={item.title} onChange={v => ed.set(`systemHelp.items.${i}.title`, v)} /></div>
                <div><Label text="Icon" /><IconPicker value={item.icon} onChange={v => ed.set(`systemHelp.items.${i}.icon`, v)} /></div>
              </div>
              <div><Label text="Açıklama" /><Textarea value={item.desc} onChange={v => ed.set(`systemHelp.items.${i}.desc`, v)} rows={2} /></div>
              <RemoveBtn onClick={() => ed.set('systemHelp.items', ed.data.systemHelp.items.filter((_: any, j: number) => j !== i))} />
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
        slug="gumruk-evrak-rehberi"
        lang={lang}
        defaultSeo={lang === 'tr'
          ? { metaTitle: 'Gümrük & Evrak Rehberi | AdorelGo', metaDescription: 'Yurtdışı kargoda gümrük işlemleri ve gerekli evraklar. Sistem otomatik halleder.', keywords: 'gümrük evrak rehberi, yurtdışı gümrük işlemleri', canonical: 'https://adorelgo.com/gumruk-evrak-rehberi' }
          : { metaTitle: 'Customs & Documents Guide | AdorelGo', metaDescription: 'Required customs documents and guidance for international shipping with AdorelGo.', keywords: 'customs documents guide, international shipping customs, shipping paperwork', canonical: 'https://adorelgo.com/gumruk-evrak-rehberi' }}
      />

    </div>
  );
};

const CustomsGuideEditor: React.FC = () => {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Seçili dil için içerik ve SEO yüklenip kaydedilir.</p>
        <LangToggle lang={lang} onChange={setLang} />
      </div>
      <CustomsGuideEditorInner key={lang} lang={lang} />
    </div>
  );
};

export default CustomsGuideEditor;
