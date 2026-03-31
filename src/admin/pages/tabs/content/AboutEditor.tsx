import React, { useState } from 'react';
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

const getDefaultAbout = (lang: 'tr' | 'en') => (
  lang === 'tr'
    ? {
        hero: {
          title: 'Hakkımızda',
          subtitle: "AdorelGo'yu yakından tanıyın",
        },
        intro: 'AdorelGo, e-ticaret yapan işletmelerin ve bireysel kullanıcıların yurtiçi ve yurtdışı kargo süreçlerini kolaylaştırmak için geliştirilmiş bir lojistik teknolojileri platformudur.',
        whatWeDo: {
          title: 'Ne Yapıyoruz?',
          items: [
            'Yurtiçi ve yurtdışı kargo gönderimlerini tek panelden yönetiyoruz.',
            'Farklı kargo firmalarının fiyatlarını karşılaştırıp en uygun seçeneği sunuyoruz.',
            'E-ticaret entegrasyonları ile sipariş süreçlerini otomatikleştiriyoruz.',
            'Mikro ihracat süreçlerini kolaylaştırıyoruz.',
            'Kapıdan alım ve kapıya teslim hizmeti sağlıyoruz.',
          ],
        },
        vision: {
          title: 'Vizyonumuz',
          text: 'Kargo süreçlerini herkes için erişilebilir hale getirmek.',
        },
        mission: {
          title: 'Misyonumuz',
          text: 'Kullanıcıların kargo süreçlerinde zaman, maliyet ve operasyon yükünü azaltmak.',
        },
        whyUs: {
          title: 'Neden AdorelGo?',
          items: [
            '35+ yıl lojistik tecrübesi',
            'Şeffaf fiyatlandırma',
            'Tek panel ile tüm kargo süreçlerini yönetme',
            'Güçlü e-ticaret entegrasyonları',
            'Global kargo ortaklıkları',
          ],
        },
        difference: {
          title: 'Bizim Farkımız',
          text: 'AdorelGo, akıllı sistemi sayesinde kullanıcıların ihtiyacına göre en doğru kargo seçeneğini otomatik olarak belirler. Fiyat, hız, güvenilirlik ve teslimat süresi gibi kriterleri analiz ederek size en uygun çözümü sunar.',
        },
        future: {
          title: 'Geleceğe Bakış',
          text: 'AdorelGo olarak, lojistik sektöründe dijital dönüşümün öncüsü olmayı hedefliyoruz. Yapay zeka destekli rota optimizasyonu, otomatik gümrük süreçleri ve genişleyen global ağımız ile kullanıcılarımıza her geçen gün daha iyi bir deneyim sunmak için çalışıyoruz.',
        },
        cta: {
          text: 'Hemen Başla',
          url: 'https://app.adorelgo.com',
        },
      }
    : {
        hero: {
          title: 'About Us',
          subtitle: 'Get to know AdorelGo better',
        },
        intro: 'AdorelGo is a logistics technology platform developed to simplify domestic and international shipping processes for e-commerce businesses and individual users.',
        whatWeDo: {
          title: 'What We Do',
          items: [
            'We manage domestic and international shipments from a single panel.',
            'We compare rates from different carriers and present the best option.',
            'We automate order processes with e-commerce integrations.',
            'We simplify micro-export operations.',
            'We provide door pickup and door delivery services.',
          ],
        },
        vision: {
          title: 'Our Vision',
          text: 'To make shipping processes accessible to everyone.',
        },
        mission: {
          title: 'Our Mission',
          text: 'To reduce time, cost, and operational burden in our users’ shipping processes.',
        },
        whyUs: {
          title: 'Why AdorelGo?',
          items: [
            '35+ years of logistics experience',
            'Transparent pricing',
            'Manage all shipping processes from a single panel',
            'Strong e-commerce integrations',
            'Global shipping partnerships',
          ],
        },
        difference: {
          title: 'What Makes Us Different',
          text: 'Thanks to its smart system, AdorelGo automatically determines the most suitable shipping option based on the user’s needs. By analyzing criteria such as price, speed, reliability, and delivery time, it offers the best solution for you.',
        },
        future: {
          title: 'Looking Ahead',
          text: 'At AdorelGo, we aim to be a pioneer of digital transformation in the logistics sector. With AI-supported route optimization, automated customs processes, and our expanding global network, we work every day to provide a better experience for our users.',
        },
        cta: {
          text: 'Get Started',
          url: 'https://app.adorelgo.com',
        },
      }
);

const AboutEditorInner: React.FC<{ lang: 'tr' | 'en' }> = ({ lang }) => {
  const about = useEditor(() => contentAPI.getAbout(lang), d => contentAPI.updateAbout(d, lang), getDefaultAbout(lang));

  if (about.loading) return <Loader />;

  return (
    <div className="space-y-6">

      {/* Hero */}
      <Card title="Sayfa Başlığı (Hero)">
        <div><Label text="Başlık" /><Input value={about.data?.hero?.title} onChange={v => about.set('hero.title', v)} /></div>
        <div><Label text="Alt Yazı" /><Input value={about.data?.hero?.subtitle} onChange={v => about.set('hero.subtitle', v)} /></div>
        <SaveBtn onSave={about.handleSave} saving={about.saving} success={about.success} error={about.error} />
      </Card>

      {/* Giriş Paragrafı */}
      <Card title="Giriş Paragrafı">
        <Textarea value={about.data?.intro} onChange={v => about.set('intro', v)} rows={4} />
        <SaveBtn onSave={about.handleSave} saving={about.saving} success={about.success} error={about.error} />
      </Card>

      {/* Ne Yapıyoruz */}
      <Card title="Ne Yapıyoruz?" action={
        <AddBtn label="Madde Ekle" onClick={() => about.set('whatWeDo.items', [...(about.data?.whatWeDo?.items || []), 'Yeni madde'])} />
      }>
        <div><Label text="Bölüm Başlığı" /><Input value={about.data?.whatWeDo?.title} onChange={v => about.set('whatWeDo.title', v)} /></div>
        <div className="space-y-2">
          {(about.data?.whatWeDo?.items || []).map((item: string, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={item} onChange={v => about.set(`whatWeDo.items.${i}`, v)} />
              <RemoveBtn onClick={() => about.set('whatWeDo.items', about.data.whatWeDo.items.filter((_: any, j: number) => j !== i))} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={about.handleSave} saving={about.saving} success={about.success} error={about.error} />
      </Card>

      {/* Vizyon & Misyon */}
      <Card title="Vizyon & Misyon">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label text="Vizyon Başlığı" /><Input value={about.data?.vision?.title} onChange={v => about.set('vision.title', v)} />
            <Label text="Vizyon Metni" /><Textarea value={about.data?.vision?.text} onChange={v => about.set('vision.text', v)} rows={3} />
          </div>
          <div className="space-y-2">
            <Label text="Misyon Başlığı" /><Input value={about.data?.mission?.title} onChange={v => about.set('mission.title', v)} />
            <Label text="Misyon Metni" /><Textarea value={about.data?.mission?.text} onChange={v => about.set('mission.text', v)} rows={3} />
          </div>
        </div>
        <SaveBtn onSave={about.handleSave} saving={about.saving} success={about.success} error={about.error} />
      </Card>

      {/* Neden AdorelGo */}
      <Card title="Neden AdorelGo?" action={
        <AddBtn label="Madde Ekle" onClick={() => about.set('whyUs.items', [...(about.data?.whyUs?.items || []), 'Yeni madde'])} />
      }>
        <div><Label text="Bölüm Başlığı" /><Input value={about.data?.whyUs?.title} onChange={v => about.set('whyUs.title', v)} /></div>
        <div className="space-y-2">
          {(about.data?.whyUs?.items || []).map((item: string, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={item} onChange={v => about.set(`whyUs.items.${i}`, v)} />
              <RemoveBtn onClick={() => about.set('whyUs.items', about.data.whyUs.items.filter((_: any, j: number) => j !== i))} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={about.handleSave} saving={about.saving} success={about.success} error={about.error} />
      </Card>

      {/* Bizim Farkımız */}
      <Card title="Bizim Farkımız (Mavi Bant)">
        <div><Label text="Başlık" /><Input value={about.data?.difference?.title} onChange={v => about.set('difference.title', v)} /></div>
        <div><Label text="Metin" /><Textarea value={about.data?.difference?.text} onChange={v => about.set('difference.text', v)} rows={4} /></div>
        <SaveBtn onSave={about.handleSave} saving={about.saving} success={about.success} error={about.error} />
      </Card>

      {/* Geleceğe Bakış */}
      <Card title="Geleceğe Bakış">
        <div><Label text="Başlık" /><Input value={about.data?.future?.title} onChange={v => about.set('future.title', v)} /></div>
        <div><Label text="Metin" /><Textarea value={about.data?.future?.text} onChange={v => about.set('future.text', v)} rows={4} /></div>
        <SaveBtn onSave={about.handleSave} saving={about.saving} success={about.success} error={about.error} />
      </Card>

      {/* CTA */}
      <Card title="Alt CTA Butonu">
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Buton Metni" /><Input value={about.data?.cta?.text} onChange={v => about.set('cta.text', v)} /></div>
          <div><Label text="Buton URL" /><Input value={about.data?.cta?.url} onChange={v => about.set('cta.url', v)} /></div>
        </div>
        <SaveBtn onSave={about.handleSave} saving={about.saving} success={about.success} error={about.error} />
      </Card>

      <SeoCard slug="hakkimizda" lang={lang} defaultSeo={lang === 'tr'
        ? { metaTitle: "Hakkımızda | AdorelGo", metaDescription: "AdorelGo hakkında bilgi edinin. Misyonumuz, vizyonumuz ve ekibimiz.", keywords: "adorelgo hakkında, adorelgo kimdir, lojistik şirketi", canonical: "https://adorelgo.com/hakkimizda" }
        : { metaTitle: "About Us | AdorelGo", metaDescription: "Learn more about AdorelGo. Our mission, vision, and approach to logistics technology.", keywords: "about adorelgo, logistics technology company, adorelgo mission", canonical: "https://adorelgo.com/hakkimizda" }} />

    </div>
  );
};

const AboutEditor: React.FC = () => {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Seçili dil için içerik ve SEO yüklenip kaydedilir.</p>
        <LangToggle lang={lang} onChange={setLang} />
      </div>
      <AboutEditorInner key={lang} lang={lang} />
    </div>
  );
};

export default AboutEditor;
