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

const getReturnShippingDefaults = (lang: 'tr' | 'en') => (
  lang === 'tr'
    ? {
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
      }
    : {
        hero: {
          title: 'International Returns & Return Shipping',
          subtitle: 'We manage the process for undelivered or returned international shipments.',
        },
        intro: {
          title: 'Keep the Return Process Under Control',
          text: 'The return shipping process for undelivered international shipments can be tracked step by step. Return and reverse-shipment updates can be viewed in the panel.',
        },
        scenarios: {
          title: 'When Does a Return Happen?',
          items: [
            { icon: 'fa-user-xmark', title: 'Recipient Not Available', desc: 'If the recipient cannot be reached or does not accept delivery, the shipment is returned after a certain period.' },
            { icon: 'fa-ban', title: 'Rejected by Customs', desc: 'If the shipment is not accepted by the destination country’s customs, the system informs you and starts the return process.' },
            { icon: 'fa-house-circle-xmark', title: 'Incorrect Address', desc: 'If the address is incorrect, the shipment cannot be delivered. Address correction or return options are provided.' },
            { icon: 'fa-rotate-left', title: 'Recipient Return', desc: 'If the recipient wants to return the item, the reverse shipping process back to Turkey can be managed through the panel.' },
          ],
        },
        process: {
          title: 'How Does the Return Process Work?',
          steps: [
            { icon: 'fa-bell', title: 'Receive a Notification', desc: 'You automatically receive a notification when your shipment cannot be delivered.' },
            { icon: 'fa-list-check', title: 'Choose an Option', desc: 'Options such as redirecting to a new address, extending the holding period, or returning the shipment are offered.' },
            { icon: 'fa-map-location-dot', title: 'Track It', desc: 'Once the return shipment is on the way, you can track it live from the panel.' },
            { icon: 'fa-box-open', title: 'Receive It Back', desc: 'You are notified once the shipment reaches your address in Turkey.' },
          ],
        },
        guarantees: {
          title: 'Your Assurances',
          items: [
            { icon: 'fa-shield-halved', title: 'Insurance Coverage', desc: 'All shipments are insured. Coverage remains valid during the return process as well.' },
            { icon: 'fa-headset', title: '24/7 Support', desc: 'You can contact our support team at any time during the return process.' },
            { icon: 'fa-clock-rotate-left', title: 'Fast Handling', desc: 'Return requests are processed as quickly as possible.' },
          ],
        },
        cta: {
          title: 'We Are Here If Something Goes Wrong',
          subtitle: 'Contact us if you need support with return and reverse shipping processes.',
          buttonText: 'Go to Panel',
          buttonUrl: 'https://app.adorelgo.com',
        },
      }
);

const ReturnShippingEditorInner: React.FC<{ lang: 'tr' | 'en' }> = ({ lang }) => {
  const ed = useEditor(
    () => contentAPI.getContentPage('yurtdisi-iade-geri-gonderi', lang),
    (d) => contentAPI.updateContentPage('yurtdisi-iade-geri-gonderi', d, lang),
    getReturnShippingDefaults(lang)
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

      <SeoCard
        slug="yurtdisi-iade-geri-gonderi"
        lang={lang}
        defaultSeo={lang === 'tr'
          ? { metaTitle: 'Yurtdışı İade & Geri Gönderim | AdorelGo', metaDescription: 'Teslim edilemeyen veya iade edilen yurtdışı kargolarınızı kolayca yönetin.', keywords: 'yurtdışı iade kargo, geri gönderim, kargo iade süreci', canonical: 'https://adorelgo.com/yurtdisi-iade-geri-gonderi' }
          : { metaTitle: 'International Returns & Return Shipping | AdorelGo', metaDescription: 'Manage undelivered and returned international shipments easily with AdorelGo.', keywords: 'international returns, return shipping, undelivered shipment support', canonical: 'https://adorelgo.com/yurtdisi-iade-geri-gonderi' }}
      />

    </div>
  );
};

const ReturnShippingEditor: React.FC = () => {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Seçili dil için içerik ve SEO yüklenip kaydedilir.</p>
        <LangToggle lang={lang} onChange={setLang} />
      </div>
      <ReturnShippingEditorInner key={lang} lang={lang} />
    </div>
  );
};

export default ReturnShippingEditor;
