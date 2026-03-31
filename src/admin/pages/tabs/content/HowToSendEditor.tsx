import React, { useEffect, useState } from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, AddBtn, RemoveBtn, SeoCard } from './shared';

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

const getDefaultHowToSendContent = (lang: 'tr' | 'en') => (
  lang === 'tr'
    ? {
        title: 'Nasıl Gönderirim?',
        description: 'Yurtdışı kargo gönderimi için adım adım rehberimiz.',
        introText: 'Adorelgo ile yurtdışına kargo göndermek hiç bu kadar kolay olmamıştı. Aşağıdaki adımları takip ederek dakikalar içinde gönderinizi oluşturabilirsiniz.',
        sectionTitle: 'Adım Adım Gönderim',
        ctaText: 'Hemen Gönderi Oluştur',
        steps: [
          { id: 1, title: 'Üye Ol & Giriş Yap', content: 'adorelgo.com üzerinden ücretsiz hesabını oluştur ve panele giriş yap. Kayıt işlemi birkaç dakika sürer.' },
          { id: 2, title: 'Gönderi Oluştur', content: 'Alıcı bilgilerini, paket ağırlığını ve içeriğini gir. Sistem sana uygun kargo seçeneklerini gösterir.' },
          { id: 3, title: 'Ödeme Yap', content: 'Beğendiğin kargo seçeneğini seç ve ödemeyi tamamla. Tüm fiyatlar önceden nettir, gizli ücret yoktur.' },
          { id: 4, title: 'Kargonu Teslim Et', content: 'En yakın kargo şubesine götür ya da kapıdan alım seçeneğini kullan. Kuryemiz adresine gelir.' },
          { id: 5, title: 'Takip Et', content: 'Kargo yola çıktıktan itibaren her adımı panelden ve e-posta bildirimleriyle takip edebilirsin.' },
          { id: 6, title: 'Teslim Edildi', content: 'Alıcı kargosunu teslim aldığında sen de bildirim alırsın. Gönderi tamamlanmış olur.' },
        ],
      }
    : {
        title: 'How to Send?',
        description: 'Our step-by-step guide for international shipping.',
        introText: 'International shipping has never been easier with Adorelgo. Follow the steps below to create your shipment within minutes.',
        sectionTitle: 'Step-by-Step Shipping',
        ctaText: 'Create Shipment Now',
        steps: [
          { id: 1, title: 'Sign Up & Log In', content: 'Create your free account on adorelgo.com and log in to the panel. Registration only takes a few minutes.' },
          { id: 2, title: 'Create Your Shipment', content: 'Enter recipient details, package weight and shipment contents. The system shows the best shipping options for you.' },
          { id: 3, title: 'Make Payment', content: 'Choose the shipping option you like and complete payment. All prices are shown upfront with no hidden fees.' },
          { id: 4, title: 'Hand Over Your Package', content: 'Drop it off at the nearest branch or use door pickup. Our courier can come to your address.' },
          { id: 5, title: 'Track It', content: 'After the shipment is on the way, you can follow every step from the panel and email notifications.' },
          { id: 6, title: 'Delivered', content: 'You are notified once the recipient receives the shipment. Your delivery process is then complete.' },
        ],
      }
);

const HowToSendEditorInner: React.FC<{ lang: 'tr' | 'en' }> = ({ lang }) => {
  const how = useEditor(() => contentAPI.getHowToSend(lang), d => contentAPI.updateHowToSend(d, lang), getDefaultHowToSendContent(lang));

  useEffect(() => {
    if (!how.data) return;
    const needsDescriptionMigration = !how.data.description && !!how.data.subtitle;
    const needsStepMigration = Array.isArray(how.data.steps) && how.data.steps.some((step: any) => step?.description && !step?.content);
    if (!needsDescriptionMigration && !needsStepMigration) return;

    how.setData((prev: any) => ({
      ...prev,
      description: prev.description || prev.subtitle || getDefaultHowToSendContent(lang).description,
      steps: Array.isArray(prev.steps)
        ? prev.steps.map((step: any) => ({ ...step, content: step.content || step.description || '' }))
        : prev.steps,
    }));
  }, [how.data, how.setData, lang]);

  if (how.loading) return <Loader />;

  return (
    <div className="space-y-6">
      <Card title="Nasıl Gönderirim" action={
        <AddBtn onClick={() => how.set('steps', [...(how.data?.steps || []), {
          id: Date.now(), title: lang === 'tr' ? 'Yeni Adım' : 'New Step', content: ''
        }])} />
      }>
        <div><Label text="Başlık" /><Input value={how.data?.title} onChange={v => how.set('title', v)} /></div>
        <div><Label text="Sayfa Açıklaması" /><Textarea value={how.data?.description ?? how.data?.subtitle ?? ''} onChange={v => { how.set('description', v); how.set('subtitle', v); }} /></div>
        <div><Label text="Giriş Metni" /><Textarea value={how.data?.introText ?? ''} onChange={v => how.set('introText', v)} rows={3} /></div>
        <div><Label text="Bölüm Başlığı" /><Input value={how.data?.sectionTitle ?? ''} onChange={v => how.set('sectionTitle', v)} /></div>
        <div><Label text="CTA Buton Metni" /><Input value={how.data?.ctaText ?? ''} onChange={v => how.set('ctaText', v)} /></div>
        <div className="space-y-3">
          {(how.data?.steps || []).map((step: any, i: number) => (
            <div key={step.id || i} className="border border-gray-100 rounded-xl p-4 space-y-2 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-semibold">{i + 1}. Adım</span>
                <RemoveBtn onClick={() => how.set('steps', how.data.steps.filter((_: any, j: number) => j !== i))} />
              </div>
              <div><Label text="Başlık" /><Input value={step.title} onChange={v => how.set(`steps.${i}.title`, v)} /></div>
              <div><Label text="Açıklama" /><Textarea value={step.content ?? step.description ?? ''} onChange={v => { how.set(`steps.${i}.content`, v); how.set(`steps.${i}.description`, v); }} rows={2} /></div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={how.handleSave} saving={how.saving} success={how.success} error={how.error} />
      </Card>

      <SeoCard
        slug="nasil-gonderirim"
        lang={lang}
        defaultSeo={lang === 'tr'
          ? { metaTitle: "Nasıl Gönderirim? | AdorelGo", metaDescription: "AdorelGo ile nasıl kargo gönderilir? Adım adım kargo gönderme rehberi.", keywords: "nasıl kargo gönderilir, kargo gönderme, adorelgo kullanım", canonical: "https://adorelgo.com/nasil-gonderirim" }
          : { metaTitle: "How to Send? | AdorelGo", metaDescription: "How to ship with AdorelGo? A step-by-step shipping guide for international deliveries.", keywords: "how to ship, international shipping guide, adorelgo shipping", canonical: "https://adorelgo.com/nasil-gonderirim" }}
      />

    </div>
  );
};

const HowToSendEditor: React.FC = () => {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Seçili dil için içerik ve SEO yüklenip kaydedilir.</p>
        <LangToggle lang={lang} onChange={setLang} />
      </div>
      <HowToSendEditorInner key={lang} lang={lang} />
    </div>
  );
};

export default HowToSendEditor;
