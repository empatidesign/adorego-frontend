import React from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, AddBtn, RemoveBtn, ImageUpload, SeoCard } from './shared';

const DEFAULT_DOMESTIC = {
  hero: {
    title: 'Yurtiçi Kargo',
    subtitle: 'En uygun fiyatla, en hızlı şekilde yurtiçi gönderim',
  },
  kargoTypes: [
    {
      id: '1', title: 'Alıcı Ödemeli Lojistik', subtitle: 'Büyük Paketleri Cepten Ödeme Alıcı Ödesin',
      description: 'Mobilya, beyaz eşya, ağır ürünler için ideal çözüm. Yüksek maliyetli gönderimlerde cebinden ödeme yapmazsın.',
      highlight: 'Satışı yapar, kargo ücretini alıcıya bırakırsın.', icon: 'fa-hand-holding-dollar', color: 'bg-blue-500',
    },
    {
      id: '2', title: 'Kapıda Ödemeli Kargo', subtitle: 'Ürün Bedelini Teslimatta Tahsil Et',
      description: 'Gönderini kapıda ödemeli gönder. Ürün bedeli teslimat sırasında alıcıdan tahsil edilir.',
      highlight: 'Alıcı, teslimat sırasında nakit veya kredi kartı ile ödeme yapabilir.', icon: 'fa-money-bill-wave', color: 'bg-green-500',
    },
  ],
  specialPricing: {
    title: 'Yurtdışı Gönderenlere Özel Yurtiçi Fiyatlar',
    description: 'Yurtdışı gönderi yapan kullanıcılar, yurtiçi kargolarında otomatik olarak daha uygun fiyatlar görür.',
    note: 'Başvuru yok. Pazarlık yok. Sistem kendisi uygular.',
  },
  advantages: [
    { id: '1', title: 'Otomatik En Ucuz Yurtiçi Seçimi', description: 'Yurtiçi gönderilerde kargo firması seçmezsin. Sistem en uygun fiyatlı seçeneği otomatik belirler.', note: 'PTT / Sürat / diğerleri — Arkada çalışır, önde fiyat görünür.', icon: 'fa-robot', color: 'bg-blue-500' },
    { id: '2', title: 'Yurtiçi + Yurtdışı Aynı Gün Avantajı', description: 'Aynı gün hem yurtdışı hem yurtiçi gönderim yapanlar, yurtiçi gönderilerde ekstra avantaj görür.', note: '"Zaten açmışken bir tane daha" etkisi.', icon: 'fa-calendar-check', color: 'bg-green-500' },
    { id: '3', title: 'Günlük Gönderiler İçin Stabil Fiyat', description: 'Her gün gönderim yapan satıcılar için yurtiçi fiyatlar daha stabil ve öngörülebilir olur.', note: 'Bugün kaç çıkacak derdi yok.', icon: 'fa-chart-line', color: 'bg-purple-500' },
  ],
  support: {
    title: 'Öncelikli Destek',
    description: 'Yurtdışı + yurtiçi aktif kullanıcıların destek talepleri öncelikli olarak ele alınır.',
  },
  fromAbroad: {
    title: 'Yurtdışından',
    titleHighlight: "Türkiye'ye Kargo",
    subtitle: "Yurtdışındaki adresinden, Türkiye'deki adrese kargo gönderebilirsin.",
    cards: [
      { id: '1', title: "Yurtdışından Türkiye'ye Gönder", description: "Yurtdışındaki adresinden, Türkiye'deki adrese kargo gönderebilirsin.", icon: 'fa-globe', color: 'bg-blue-500' },
      { id: '2', title: 'Kapıdan Alım – Kapıya Teslim', description: "Gönderi yurtdışındaki adresten alınır, Türkiye'de alıcının kapısına teslim edilir.", icon: 'fa-truck', color: 'bg-green-500' },
      { id: '3', title: 'Fiyatı Baştan Gör', description: 'Gönderim öncesinde net fiyatı görürsün. Sonradan sürpriz masraf çıkmaz.', icon: 'fa-receipt', color: 'bg-purple-500' },
    ],
    ctaText: 'Hemen Başla',
    ctaLink: 'https://app.adorelgo.com',
  },
};

const DomesticEditor: React.FC = () => {
  const dom = useEditor(() => contentAPI.getDomestic(), d => contentAPI.updateDomestic(d), DEFAULT_DOMESTIC);

  if (dom.loading) return <Loader />;

  return (
    <div className="space-y-6">

      {/* HERO */}
      <Card title="Sayfa Başlığı (Hero)">
        <div><Label text="Başlık" /><Input value={dom.data?.hero?.title} onChange={v => dom.set('hero.title', v)} /></div>
        <div><Label text="Alt Yazı" /><Textarea value={dom.data?.hero?.subtitle} onChange={v => dom.set('hero.subtitle', v)} rows={2} /></div>
        <SaveBtn onSave={dom.handleSave} saving={dom.saving} success={dom.success} error={dom.error} />
      </Card>

      {/* KARGO TİPLERİ */}
      <Card title="Kargo Tipleri (Alıcı Ödemeli / Kapıda Ödemeli)" action={
        <AddBtn onClick={() => dom.set('kargoTypes', [...(Array.isArray(dom.data?.kargoTypes) ? dom.data.kargoTypes : []), {
          id: String(Date.now()), title: 'Yeni Kargo', subtitle: '', description: '', highlight: '', icon: 'fa-box', color: 'bg-blue-500'
        }])} />
      }>
        <div className="space-y-4">
          {(Array.isArray(dom.data?.kargoTypes) ? dom.data.kargoTypes : []).map((k: any, i: number) => (
            <div key={k.id || i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Kargo Tipi</span>
                <RemoveBtn onClick={() => dom.set('kargoTypes', dom.data.kargoTypes.filter((_: any, j: number) => j !== i))} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label text="Başlık" /><Input value={k.title} onChange={v => dom.set(`kargoTypes.${i}.title`, v)} /></div>
                <div><Label text="Alt Başlık (yeşil)" /><Input value={k.subtitle} onChange={v => dom.set(`kargoTypes.${i}.subtitle`, v)} /></div>
              </div>
              <div><Label text="Açıklama" /><Textarea value={k.description} onChange={v => dom.set(`kargoTypes.${i}.description`, v)} rows={2} /></div>
              <div><Label text="Vurgulu Metin (beyaz kutu içi)" /><Input value={k.highlight} onChange={v => dom.set(`kargoTypes.${i}.highlight`, v)} /></div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={dom.handleSave} saving={dom.saving} success={dom.success} error={dom.error} />
      </Card>

      {/* ÖZEL FİYATLAR BANDI */}
      <Card title="Yurtdışı Gönderenlere Özel Fiyatlar (Mavi Bant)">
        <div><Label text="Başlık" /><Input value={dom.data?.specialPricing?.title} onChange={v => dom.set('specialPricing.title', v)} /></div>
        <div><Label text="Açıklama" /><Textarea value={dom.data?.specialPricing?.description} onChange={v => dom.set('specialPricing.description', v)} rows={2} /></div>
        <div><Label text="Not (alt küçük metin)" /><Input value={dom.data?.specialPricing?.note} onChange={v => dom.set('specialPricing.note', v)} /></div>
        <SaveBtn onSave={dom.handleSave} saving={dom.saving} success={dom.success} error={dom.error} />
      </Card>

      {/* AVANTAJLAR */}
      <Card title="Avantajlar (3'lü Grid)" action={
        <AddBtn onClick={() => dom.set('advantages', [...(Array.isArray(dom.data?.advantages) ? dom.data.advantages : []), {
          id: String(Date.now()), title: 'Yeni Avantaj', description: '', note: '', icon: 'fa-star', color: 'bg-blue-500'
        }])} />
      }>
        <div className="space-y-3">
          {(Array.isArray(dom.data?.advantages) ? dom.data.advantages : []).map((a: any, i: number) => (
            <div key={a.id || i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Avantaj</span>
                <RemoveBtn onClick={() => dom.set('advantages', dom.data.advantages.filter((_: any, j: number) => j !== i))} />
              </div>
              <div><Label text="Başlık" /><Input value={a.title} onChange={v => dom.set(`advantages.${i}.title`, v)} /></div>
              <div><Label text="Açıklama" /><Textarea value={a.description} onChange={v => dom.set(`advantages.${i}.description`, v)} rows={2} /></div>
              <div><Label text="Not (italik alt metin)" /><Input value={a.note} onChange={v => dom.set(`advantages.${i}.note`, v)} /></div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={dom.handleSave} saving={dom.saving} success={dom.success} error={dom.error} />
      </Card>

      {/* ÖNCELİKLİ DESTEK */}
      <Card title="Öncelikli Destek (Turuncu Kutu)">
        <div><Label text="Başlık" /><Input value={dom.data?.support?.title} onChange={v => dom.set('support.title', v)} /></div>
        <div><Label text="Açıklama" /><Textarea value={dom.data?.support?.description} onChange={v => dom.set('support.description', v)} rows={2} /></div>
        <SaveBtn onSave={dom.handleSave} saving={dom.saving} success={dom.success} error={dom.error} />
      </Card>

      {/* YURTDIŞINDAN TÜRKİYE'YE */}
      <Card title="Yurtdışından Türkiye'ye Kargo" action={
        <AddBtn onClick={() => dom.set('fromAbroad.cards', [...(Array.isArray(dom.data?.fromAbroad?.cards) ? dom.data.fromAbroad.cards : []), {
          id: String(Date.now()), title: 'Yeni Kart', description: '', icon: 'fa-box', color: 'bg-blue-500'
        }])} />
      }>
        <div className="grid grid-cols-2 gap-2">
          <div><Label text='Başlık ("Yurtdışından")' /><Input value={dom.data?.fromAbroad?.title} onChange={v => dom.set('fromAbroad.title', v)} /></div>
          <div><Label text={"Vurgulu (\"Türkiye'ye Kargo\")"} /><Input value={dom.data?.fromAbroad?.titleHighlight} onChange={v => dom.set('fromAbroad.titleHighlight', v)} /></div>
        </div>
        <div><Label text="Alt Yazı" /><Textarea value={dom.data?.fromAbroad?.subtitle} onChange={v => dom.set('fromAbroad.subtitle', v)} rows={2} /></div>
        <div className="space-y-3">
          {(Array.isArray(dom.data?.fromAbroad?.cards) ? dom.data.fromAbroad.cards : []).map((c: any, i: number) => (
            <div key={c.id || i} className="border border-gray-100 rounded-xl p-3 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Kart</span>
                <RemoveBtn onClick={() => dom.set('fromAbroad.cards', dom.data.fromAbroad.cards.filter((_: any, j: number) => j !== i))} />
              </div>
              <div><Label text="Başlık" /><Input value={c.title} onChange={v => dom.set(`fromAbroad.cards.${i}.title`, v)} /></div>
              <div><Label text="Açıklama" /><Textarea value={c.description} onChange={v => dom.set(`fromAbroad.cards.${i}.description`, v)} rows={2} /></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div><Label text="CTA Buton Metni" /><Input value={dom.data?.fromAbroad?.ctaText} onChange={v => dom.set('fromAbroad.ctaText', v)} /></div>
          <div><Label text="CTA Buton URL" /><Input value={dom.data?.fromAbroad?.ctaLink} onChange={v => dom.set('fromAbroad.ctaLink', v)} /></div>
        </div>
        <SaveBtn onSave={dom.handleSave} saving={dom.saving} success={dom.success} error={dom.error} />
      </Card>


      <SeoCard slug="yurtici-kargo" defaultSeo={{ metaTitle: "Yurtiçi Kargo | AdorelGo", metaDescription: "Türkiye içi kargo gönderimi. Hızlı, güvenli ve uygun fiyatlı yurtiçi kargo çözümleri.", keywords: "yurtiçi kargo, türkiye kargo, hızlı kargo", canonical: "https://adorelgo.com/yurtici-kargo" }} />

    </div>
  );
};

export default DomesticEditor;
