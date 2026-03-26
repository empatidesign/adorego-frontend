import React from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, AddBtn, RemoveBtn, SeoCard } from './shared';

const DEFAULT_ABOUT = {
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
};

const AboutEditor: React.FC = () => {
  const about = useEditor(() => contentAPI.getAbout(), d => contentAPI.updateAbout(d), DEFAULT_ABOUT);

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


      <SeoCard slug="hakkimizda" defaultSeo={{ metaTitle: "Hakkımızda | AdorelGo", metaDescription: "AdorelGo hakkında bilgi edinin. Misyonumuz, vizyonumuz ve ekibimiz.", keywords: "adorelgo hakkında, adorelgo kimdir, lojistik şirketi", canonical: "https://adorelgo.com/hakkimizda" }} />

    </div>
  );
};

export default AboutEditor;
