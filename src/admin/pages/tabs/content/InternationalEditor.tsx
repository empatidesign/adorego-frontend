import React, { useState } from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, AddBtn, RemoveBtn, ImageUpload, SeoCard } from './shared';

const LangToggle: React.FC<{ lang: string; onChange: (l: string) => void }> = ({ lang, onChange }) => (
  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1 w-fit">
    {['tr', 'en'].map(l => (
      <button key={l} onClick={() => onChange(l)}
        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${lang === l ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}>
        {l === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}
      </button>
    ))}
  </div>
);

const getDefaultIntl = (lang: string) => ({
  hero: {
    title: lang === 'tr' ? 'Yurtdışı Kargo' : 'International Shipping',
    subtitle: lang === 'tr' ? 'Dünyaya gönderim yapmanın en kolay ve güvenilir yolu' : 'The easiest and most reliable way to ship worldwide',
  },
  kargoTypes: lang === 'tr' ? [
    { id: '1', title: 'Ekonomik Kargo', subtitle: 'Uygun Fiyatlı Yurtdışı Gönderim', description: 'Acil olmayan gönderiler için en düşük maliyetli yurtdışı kargo seçeneği.', highlight: 'Ekonomik Kargo ile yurtdışı gönderi yapanlar, yurtiçi kargolarında daha avantajlı fiyatlar görür.', icon: 'fa-coins', color: 'bg-blue-500' },
    { id: '2', title: 'Express Kargo', subtitle: 'Zaman senin için önemliyse', description: 'Yurtdışı gönderini en hızlı şekilde ulaştıran seçenek.', highlight: 'Zamanı öncelikleyen, değerli ve acil gönderiler için idealdir.', icon: 'fa-bolt', color: 'bg-green-500' },
  ] : [
    { id: '1', title: 'Economy Shipping', subtitle: 'Affordable International Shipping', description: 'The most cost-effective international shipping option for non-urgent shipments.', highlight: 'Those who ship internationally with Economy Shipping get more advantageous prices on domestic shipments.', icon: 'fa-coins', color: 'bg-blue-500' },
    { id: '2', title: 'Express Shipping', subtitle: 'When time matters to you', description: 'The fastest option to deliver your international shipment.', highlight: 'Ideal for time-sensitive, valuable and urgent shipments.', icon: 'fa-bolt', color: 'bg-green-500' },
  ],
  doorToDoor: {
    title: lang === 'tr' ? 'Kapıdan Alım – Kapıya Teslim' : 'Door Pickup – Door Delivery',
    description: lang === 'tr' ? 'Yurtdışına satış yapanlar için kapıdan alım – kapıya teslim, uygun fiyatlı ve sorunsuz kargo çözümleri.' : 'Door-to-door pickup and delivery for international sellers — affordable and hassle-free shipping solutions.',
  },
  firstTimers: {
    title: lang === 'tr' ? 'İlk Kez Yurtdışına' : 'Shipping Internationally',
    titleHighlight: lang === 'tr' ? 'Gönderenler' : 'for the First Time',
    subtitle: lang === 'tr' ? 'Daha önce hiç yurtdışına göndermeyenler rahatça kullanabilir.' : 'Even those who have never shipped internationally before can use it with ease.',
    cards: lang === 'tr' ? [
      { id: '1', title: 'İlk gönderim en kolayıdır.', description: 'İlk kez gönderiyorsan, sistem seni adım adım yönlendirir.', icon: 'fa-play', color: 'bg-blue-500' },
      { id: '2', title: 'Gümrük & Evrak = Korku Değil Rahatlama', description: 'Bilmen gereken kadarını bil, gerisini sisteme bırak.', icon: 'fa-file-shield', color: 'bg-green-500' },
      { id: '3', title: 'Yurtdışı İade & Geri Gönderim', description: 'Teslim edilemeyen yurtdışı gönderilerde iade ve geri gönderim süreci kontrol altındadır.', icon: 'fa-rotate-left', color: 'bg-purple-500' },
    ] : [
      { id: '1', title: 'Your first shipment is the easiest.', description: "If it's your first time shipping, the system guides you step by step.", icon: 'fa-play', color: 'bg-blue-500' },
      { id: '2', title: 'Customs & Documents = Relief, Not Fear', description: "Know only what you need to know, leave the rest to the system.", icon: 'fa-file-shield', color: 'bg-green-500' },
      { id: '3', title: 'International Returns & Reshipping', description: 'For undelivered international shipments, the return and reshipping process is under control.', icon: 'fa-rotate-left', color: 'bg-purple-500' },
    ],
  },
  microExport: {
    title: lang === 'tr' ? 'Mikro İhracat' : 'Micro Export',
    titleHighlight: lang === 'tr' ? 'Satış Amaçlı Gönderimler' : 'Sales-Purpose Shipments',
    description: lang === 'tr' ? 'Yurtdışına ürün satışı yapıyorsan, kargonu mikro ihracata uygun olarak gönder.' : "If you're selling products internationally, ship your cargo under micro export.",
    bullets: lang === 'tr' ? ['Büyük firma olman gerekmez.', 'Küçük adetli satışlar için de mikro ihracat yapılabilir.'] : ["You don't need to be a large company.", 'Micro export is also possible for small-quantity sales.'],
    image: '',
  },
  whichShipping: {
    title: lang === 'tr' ? 'Hangi Gönderim' : 'Which Shipping',
    titleHighlight: lang === 'tr' ? 'Bana Uygun?' : 'is Right for Me?',
    subtitle: lang === 'tr' ? 'Kararsızsan sorun değil. Sistem, gönderinin aciliyet ve önceliğine göre en uygun gönderimi seçer.' : "No problem if you're undecided. The system selects the most suitable shipping based on urgency and priority.",
    options: lang === 'tr' ? [
      { id: '1', label: 'Fiyat Öncelikliyse', title: 'Ekonomik Kargo', icon: 'fa-coins', color: 'bg-blue-500' },
      { id: '2', label: 'Hız Öncelikliyse', title: 'Express Kargo', icon: 'fa-bolt', color: 'bg-green-500' },
      { id: '3', label: 'Satış Amaçlıysa', title: 'Mikro İhracat Gönderimi', icon: 'fa-store', color: 'bg-orange-500' },
    ] : [
      { id: '1', label: 'If Price is Priority', title: 'Economy Shipping', icon: 'fa-coins', color: 'bg-blue-500' },
      { id: '2', label: 'If Speed is Priority', title: 'Express Shipping', icon: 'fa-bolt', color: 'bg-green-500' },
      { id: '3', label: 'If For Sales Purpose', title: 'Micro Export Shipment', icon: 'fa-store', color: 'bg-orange-500' },
    ],
    bottomText: lang === 'tr' ? 'Seçmek zorunda değilsin. İhtiyacını söyle, gerisini bize bırak.' : "You don't have to choose. Tell us your needs, leave the rest to us.",
    ctaText: lang === 'tr' ? 'Hemen Başla' : 'Get Started',
    ctaLink: 'https://app.adorelgo.com',
  },
});

const InternationalEditorInner: React.FC<{ lang: string }> = ({ lang }) => {
  const intl = useEditor(() => contentAPI.getInternational(lang), d => contentAPI.updateInternational(d, lang), getDefaultIntl(lang));
  const header = useEditor(() => contentAPI.getFeaturesHeader(lang), d => contentAPI.updateFeaturesHeader(d, lang));
  const features = useEditor(() => contentAPI.getFeatures(lang), d => contentAPI.updateFeatures(d, lang));

  if (intl.loading) return <Loader />;

  return (
    <div className="space-y-6">

      {/* HERO */}
      <Card title="Sayfa Başlığı (Hero)">
        <div><Label text="Başlık" /><Input value={intl.data?.hero?.title} onChange={v => intl.set('hero.title', v)} /></div>
        <div><Label text="Alt Yazı" /><Textarea value={intl.data?.hero?.subtitle} onChange={v => intl.set('hero.subtitle', v)} rows={2} /></div>
        <SaveBtn onSave={intl.handleSave} saving={intl.saving} success={intl.success} error={intl.error} />
      </Card>

      {/* KARGO TİPLERİ */}
      <Card title="Kargo Tipleri (Ekonomik / Express)" action={
        <AddBtn onClick={() => intl.set('kargoTypes', [...(Array.isArray(intl.data?.kargoTypes) ? intl.data.kargoTypes : []), {
          id: String(Date.now()), title: 'Yeni Kargo', subtitle: '', description: '', highlight: '', icon: 'fa-box', color: 'bg-blue-500'
        }])} />
      }>
        <div className="space-y-4">
          {(Array.isArray(intl.data?.kargoTypes) ? intl.data.kargoTypes : []).map((k: any, i: number) => (
            <div key={k.id || i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Kargo Tipi</span>
                <RemoveBtn onClick={() => intl.set('kargoTypes', intl.data.kargoTypes.filter((_: any, j: number) => j !== i))} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label text="Başlık" /><Input value={k.title} onChange={v => intl.set(`kargoTypes.${i}.title`, v)} /></div>
                <div><Label text="Alt Başlık (yeşil)" /><Input value={k.subtitle} onChange={v => intl.set(`kargoTypes.${i}.subtitle`, v)} /></div>
              </div>
              <div><Label text="Açıklama" /><Textarea value={k.description} onChange={v => intl.set(`kargoTypes.${i}.description`, v)} rows={2} /></div>
              <div><Label text="Vurgulu Metin (kutucuk içi)" /><Textarea value={k.highlight} onChange={v => intl.set(`kargoTypes.${i}.highlight`, v)} rows={2} /></div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={intl.handleSave} saving={intl.saving} success={intl.success} error={intl.error} />
      </Card>

      {/* KAPIDAN ALIM */}
      <Card title="Kapıdan Alım – Kapıya Teslim">
        <div><Label text="Başlık" /><Input value={intl.data?.doorToDoor?.title} onChange={v => intl.set('doorToDoor.title', v)} /></div>
        <div><Label text="Açıklama" /><Textarea value={intl.data?.doorToDoor?.description} onChange={v => intl.set('doorToDoor.description', v)} rows={2} /></div>
        <SaveBtn onSave={intl.handleSave} saving={intl.saving} success={intl.success} error={intl.error} />
      </Card>

      {/* İLK KEZ GÖNDERENLER */}
      <Card title="İlk Kez Yurtdışına Gönderenler" action={
        <AddBtn onClick={() => intl.set('firstTimers.cards', [...(Array.isArray(intl.data?.firstTimers?.cards) ? intl.data.firstTimers.cards : []), {
          id: String(Date.now()), title: 'Yeni Kart', description: '', icon: 'fa-star', color: 'bg-blue-500'
        }])} />
      }>
        <div className="grid grid-cols-2 gap-2">
          <div><Label text='Başlık ("İlk Kez Yurtdışına")' /><Input value={intl.data?.firstTimers?.title} onChange={v => intl.set('firstTimers.title', v)} /></div>
          <div><Label text='Vurgulu ("Gönderenler")' /><Input value={intl.data?.firstTimers?.titleHighlight} onChange={v => intl.set('firstTimers.titleHighlight', v)} /></div>
        </div>
        <div><Label text="Alt Yazı" /><Input value={intl.data?.firstTimers?.subtitle} onChange={v => intl.set('firstTimers.subtitle', v)} /></div>
        <div className="space-y-3">
          {(Array.isArray(intl.data?.firstTimers?.cards) ? intl.data.firstTimers.cards : []).map((c: any, i: number) => (
            <div key={c.id || i} className="border border-gray-100 rounded-xl p-3 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Kart</span>
                <RemoveBtn onClick={() => intl.set('firstTimers.cards', intl.data.firstTimers.cards.filter((_: any, j: number) => j !== i))} />
              </div>
              <div><Label text="Başlık" /><Input value={c.title} onChange={v => intl.set(`firstTimers.cards.${i}.title`, v)} /></div>
              <div><Label text="Açıklama" /><Textarea value={c.description} onChange={v => intl.set(`firstTimers.cards.${i}.description`, v)} rows={2} /></div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={intl.handleSave} saving={intl.saving} success={intl.success} error={intl.error} />
      </Card>

      {/* MİKRO İHRACAT */}
      <Card title="Mikro İhracat" action={
        <AddBtn label="Madde Ekle" onClick={() => intl.set('microExport.bullets', [...(Array.isArray(intl.data?.microExport?.bullets) ? intl.data.microExport.bullets : []), 'Yeni madde'])} />
      }>
        <div className="grid grid-cols-2 gap-2">
          <div><Label text='Başlık ("Mikro İhracat")' /><Input value={intl.data?.microExport?.title} onChange={v => intl.set('microExport.title', v)} /></div>
          <div><Label text='Vurgulu ("Satış Amaçlı Gönderimler")' /><Input value={intl.data?.microExport?.titleHighlight} onChange={v => intl.set('microExport.titleHighlight', v)} /></div>
        </div>
        <div><Label text="Açıklama" /><Textarea value={intl.data?.microExport?.description} onChange={v => intl.set('microExport.description', v)} rows={2} /></div>
        <div className="space-y-2">
          {(Array.isArray(intl.data?.microExport?.bullets) ? intl.data.microExport.bullets : []).map((b: string, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={b} onChange={v => intl.set(`microExport.bullets.${i}`, v)} placeholder="Madde metni" />
              <RemoveBtn onClick={() => intl.set('microExport.bullets', intl.data.microExport.bullets.filter((_: any, j: number) => j !== i))} />
            </div>
          ))}
        </div>
        <ImageUpload label="Sağ Taraf Görseli" value={intl.data?.microExport?.image ?? ''} onChange={v => intl.set('microExport.image', v)} />
        <SaveBtn onSave={intl.handleSave} saving={intl.saving} success={intl.success} error={intl.error} />
      </Card>

      {/* HANGİ GÖNDERİM */}
      <Card title="Hangi Gönderim Bana Uygun?" action={
        <AddBtn onClick={() => intl.set('whichShipping.options', [...(Array.isArray(intl.data?.whichShipping?.options) ? intl.data.whichShipping.options : []), {
          id: String(Date.now()), label: 'Öncelik', title: 'Yeni Seçenek', icon: 'fa-box', color: 'bg-blue-500'
        }])} />
      }>
        <div className="grid grid-cols-2 gap-2">
          <div><Label text='Başlık ("Hangi Gönderim")' /><Input value={intl.data?.whichShipping?.title} onChange={v => intl.set('whichShipping.title', v)} /></div>
          <div><Label text='Vurgulu ("Bana Uygun?")' /><Input value={intl.data?.whichShipping?.titleHighlight} onChange={v => intl.set('whichShipping.titleHighlight', v)} /></div>
        </div>
        <div><Label text="Alt Yazı" /><Textarea value={intl.data?.whichShipping?.subtitle} onChange={v => intl.set('whichShipping.subtitle', v)} rows={2} /></div>
        <div className="space-y-2">
          {(Array.isArray(intl.data?.whichShipping?.options) ? intl.data.whichShipping.options : []).map((opt: any, i: number) => (
            <div key={opt.id || i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <div className="w-32 shrink-0"><Input value={opt.label} onChange={v => intl.set(`whichShipping.options.${i}.label`, v)} placeholder="Fiyat Öncelikliyse" /></div>
              <Input value={opt.title} onChange={v => intl.set(`whichShipping.options.${i}.title`, v)} placeholder="Ekonomik Kargo" />
              <RemoveBtn onClick={() => intl.set('whichShipping.options', intl.data.whichShipping.options.filter((_: any, j: number) => j !== i))} />
            </div>
          ))}
        </div>
        <div><Label text="Alt Metin" /><Input value={intl.data?.whichShipping?.bottomText} onChange={v => intl.set('whichShipping.bottomText', v)} /></div>
        <div className="grid grid-cols-2 gap-2">
          <div><Label text="CTA Buton Metni" /><Input value={intl.data?.whichShipping?.ctaText} onChange={v => intl.set('whichShipping.ctaText', v)} /></div>
          <div><Label text="CTA Buton URL" /><Input value={intl.data?.whichShipping?.ctaLink} onChange={v => intl.set('whichShipping.ctaLink', v)} /></div>
        </div>
        <SaveBtn onSave={intl.handleSave} saving={intl.saving} success={intl.success} error={intl.error} />
      </Card>

      {/* NEDEN ADOREGO (features-header) */}
      <Card title="Neden AdorelGo? — Başlık & Mini Kartlar" action={
        <AddBtn onClick={() => header.set('miniCards', [...(Array.isArray(header.data?.miniCards) ? header.data.miniCards : []), { icon: 'fa-star', color: 'bg-blue-500', title: 'Yeni Kart', description: '' }])} />
      }>
        <div className="grid grid-cols-2 gap-2">
          <div><Label text="Rozet" /><Input value={header.data?.badge} onChange={v => header.set('badge', v)} /></div>
          <div><Label text="Başlık" /><Input value={header.data?.title} onChange={v => header.set('title', v)} /></div>
        </div>
        <div><Label text="Alt Başlık" /><Textarea value={header.data?.subtitle} onChange={v => header.set('subtitle', v)} /></div>
        <div className="space-y-2">
          {(Array.isArray(header.data?.miniCards) ? header.data.miniCards : []).map((c: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Kart</span>
                <RemoveBtn onClick={() => header.set('miniCards', header.data.miniCards.filter((_: any, j: number) => j !== i))} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label text="Başlık" /><Input value={c.title} onChange={v => header.set(`miniCards.${i}.title`, v)} /></div>
                <div><Label text="Açıklama" /><Input value={c.description} onChange={v => header.set(`miniCards.${i}.description`, v)} /></div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={header.handleSave} saving={header.saving} success={header.success} error={header.error} />
      </Card>

      {/* ÖZELLİKLER */}
      <Card title="Özellikler" action={
        <AddBtn onClick={() => features.set('', [...(Array.isArray(features.data) ? features.data : []), {
          id: Date.now(), icon: 'fa-star', color: 'bg-blue-500', order: features.data?.length || 0, title: 'Yeni Özellik', description: ''
        }])} />
      }>
        <div className="space-y-3">
          {(Array.isArray(features.data) ? features.data : []).map((f: any, i: number) => (
            <div key={f.id || i} className="border border-gray-100 rounded-xl p-4 space-y-2 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Özellik</span>
                <RemoveBtn onClick={() => features.set('', features.data.filter((_: any, j: number) => j !== i))} />
              </div>
              <div><Label text="Başlık" /><Input value={f.title} onChange={v => features.set(`${i}.title`, v)} /></div>
              <div><Label text="Açıklama" /><Textarea value={f.description} onChange={v => features.set(`${i}.description`, v)} rows={2} /></div>
              {f.image !== undefined && <ImageUpload label="Görsel" value={f.image ?? ''} onChange={v => features.set(`${i}.image`, v)} />}
            </div>
          ))}
        </div>
        <SaveBtn onSave={features.handleSave} saving={features.saving} success={features.success} error={features.error} />
      </Card>


      <SeoCard slug="yurtdisi-kargo" defaultSeo={{ metaTitle: "Yurtdışı Kargo | AdorelGo", metaDescription: "Yurtdışı kargo gönderimi. DHL, FedEx, UPS ve daha fazlası. Tek platformdan karşılaştır ve gönder.", keywords: "yurtdışı kargo, uluslararası kargo, dhl fedex ups", canonical: "https://adorelgo.com/yurtdisi-kargo" }} />

    </div>
  );
};

const InternationalEditor: React.FC = () => {
  const [lang, setLang] = useState('tr');
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Seçili dil için içerik yüklenip kaydedilir.</p>
        <LangToggle lang={lang} onChange={setLang} />
      </div>
      <InternationalEditorInner key={lang} lang={lang} />
    </div>
  );
};

export default InternationalEditor;
