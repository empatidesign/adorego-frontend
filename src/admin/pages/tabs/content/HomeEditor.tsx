import React from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, AddBtn, RemoveBtn, ImageUpload, SeoCard } from './shared';

const HomeEditor: React.FC = () => {
  const hero = useEditor(() => contentAPI.getHero(), d => contentAPI.updateHero(d));
  const howitworks = useEditor(() => contentAPI.getHowItWorks(), d => contentAPI.updateHowItWorks(d));
  const partners = useEditor(
    () => contentAPI.getPartners().then((d: any) => Array.isArray(d) ? { carriers: d, socialProof: {} } : d),
    d => contentAPI.updatePartners(d)
  );
  const faqHeader = useEditor(() => contentAPI.getFaqHeader(), d => contentAPI.updateFaqHeader(d));
  const faq = useEditor(() => contentAPI.getFaq(), d => contentAPI.updateFaq(d));
  const cta = useEditor(() => contentAPI.getCta(), d => contentAPI.updateCta(d));
  const dest = useEditor(() => contentAPI.getPopularDestinations(), d => contentAPI.updatePopularDestinations(d));
  const featuresHeader = useEditor(() => contentAPI.getFeaturesHeader(), d => contentAPI.updateFeaturesHeader(d));
  const solutions = useEditor(() => contentAPI.getSolutions(), d => contentAPI.updateSolutions(d));
  const targetAudience = useEditor(() => contentAPI.getTargetAudience(), d => contentAPI.updateTargetAudience(d));
  const useCases = useEditor(() => contentAPI.getUseCases(), d => contentAPI.updateUseCases(d));
  const homeCta = useEditor(() => contentAPI.getHomeCta(), d => contentAPI.updateHomeCta(d));

  if (hero.loading) return <Loader />;

  return (
    <div className="space-y-6">

      {/* HERO */}
      <Card title="Hero Banner">
        <div><Label text="Ana Başlık" /><Textarea value={hero.data?.title} onChange={v => hero.set('title', v)} rows={2} /></div>
        <div><Label text="Alt Başlık" /><Textarea value={hero.data?.subtitle} onChange={v => hero.set('subtitle', v)} /></div>
        <ImageUpload label="Hero Görseli" value={hero.data?.image ?? ''} onChange={v => hero.set('image', v)} />
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label text="Rozetler" />
            <AddBtn onClick={() => hero.set('badges', [...(hero.data?.badges || []), { icon: 'fa-check', text: 'Yeni Rozet', color: 'blue' }])} />
          </div>
          <div className="space-y-2">
            {(hero.data?.badges || []).map((b: any, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <Input value={b.text} onChange={v => hero.set(`badges.${i}.text`, v)} placeholder="Rozet metni" />
                <RemoveBtn onClick={() => hero.set('badges', hero.data.badges.filter((_: any, j: number) => j !== i))} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label text="İstatistikler" />
            <AddBtn onClick={() => hero.set('stats', [...(hero.data?.stats || []), { icon: 'fa-star', label: 'Yeni', value: '0' }])} />
          </div>
          <div className="space-y-2">
            {(hero.data?.stats || []).map((s: any, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <div className="w-24 shrink-0"><Input value={s.value} onChange={v => hero.set(`stats.${i}.value`, v)} placeholder="220+" /></div>
                <Input value={s.label} onChange={v => hero.set(`stats.${i}.label`, v)} placeholder="Etiket" />
                <RemoveBtn onClick={() => hero.set('stats', hero.data.stats.filter((_: any, j: number) => j !== i))} />
              </div>
            ))}
          </div>
        </div>
        <SaveBtn onSave={hero.handleSave} saving={hero.saving} success={hero.success} error={hero.error} />
      </Card>

      {/* NASIL ÇALIŞIR */}
      <Card title="Nasıl Çalışır — Adımlar" action={
        <AddBtn onClick={() => howitworks.set('steps', [...(howitworks.data?.steps || []), {
          id: Date.now(), order: howitworks.data?.steps?.length || 0, icon: 'fa-star',
          color: 'bg-blue-500', image: '', title: 'Yeni Adım', description: '', buttonText: '', buttonLink: '', buttonStyle: 'primary'
        }])} />
      }>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Rozet" /><Input value={howitworks.data?.badge} onChange={v => howitworks.set('badge', v)} /></div>
          <div><Label text="Alt Başlık" /><Input value={howitworks.data?.subtitle} onChange={v => howitworks.set('subtitle', v)} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text='Başlık ("Yurtdışı Kargo")' /><Input value={howitworks.data?.title} onChange={v => howitworks.set('title', v)} /></div>
          <div><Label text='Vurgulu Başlık ("Nasıl Çalışır?")' /><Input value={howitworks.data?.titleHighlight} onChange={v => howitworks.set('titleHighlight', v)} /></div>
        </div>
        <div><Label text="Alt Buton Metni (İhtiyacını seç → Fiyatı gör...)" /><Input value={howitworks.data?.buttons?.[0]?.text ?? ''} onChange={v => howitworks.set('buttons.0.text', v)} /></div>
        <div className="space-y-3">
          {(howitworks.data?.steps || []).map((step: any, i: number) => (
            <div key={step.id || i} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">{i + 1}. Adım</span>
                <RemoveBtn onClick={() => howitworks.set('steps', howitworks.data.steps.filter((_: any, j: number) => j !== i))} />
              </div>
              <div><Label text="Başlık" /><Input value={step.title} onChange={v => howitworks.set(`steps.${i}.title`, v)} /></div>
              <div><Label text="Açıklama" /><Textarea value={step.description} onChange={v => howitworks.set(`steps.${i}.description`, v)} rows={2} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label text="Buton Metni" /><Input value={step.buttonText} onChange={v => howitworks.set(`steps.${i}.buttonText`, v)} /></div>
                <div><Label text="Buton Linki" /><Input value={step.buttonLink} onChange={v => howitworks.set(`steps.${i}.buttonLink`, v)} /></div>
              </div>
              <ImageUpload label="Adım Görseli" value={step.image ?? ''} onChange={v => howitworks.set(`steps.${i}.image`, v)} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={howitworks.handleSave} saving={howitworks.saving} success={howitworks.success} error={howitworks.error} />
      </Card>

      {/* SSS BAŞLIK */}
      <Card title="SSS — Başlık">
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Başlık" /><Input value={faqHeader.data?.title} onChange={v => faqHeader.set('title', v)} /></div>
          <div><Label text="Alt Başlık" /><Input value={faqHeader.data?.subtitle} onChange={v => faqHeader.set('subtitle', v)} /></div>
        </div>
        <SaveBtn onSave={faqHeader.handleSave} saving={faqHeader.saving} success={faqHeader.success} error={faqHeader.error} />
      </Card>

      {/* SSS SORULAR */}
      <Card title="SSS — Sorular & Cevaplar" action={
        <AddBtn onClick={() => faq.set('', [...(faq.data || []), { id: String(Date.now()), question: 'Yeni soru?', answer: 'Cevap...' }])} />
      }>
        <div className="space-y-3">
          {(faq.data || []).map((item: any, i: number) => (
            <div key={item.id || i} className="border border-gray-100 rounded-xl p-4 space-y-2 bg-gray-50">
              <div className="flex items-start gap-2">
                <div className="flex-1 space-y-2">
                  <div><Label text="Soru" /><Input value={item.question} onChange={v => faq.set(`${i}.question`, v)} /></div>
                  <div><Label text="Cevap" /><Textarea value={item.answer} onChange={v => faq.set(`${i}.answer`, v)} rows={2} /></div>
                </div>
                <RemoveBtn onClick={() => faq.set('', faq.data.filter((_: any, j: number) => j !== i))} />
              </div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={faq.handleSave} saving={faq.saving} success={faq.success} error={faq.error} />
      </Card>

      {/* PARTNERLER */}
      <Card title="Partnerler (Kargo Firmaları)" action={
        <AddBtn onClick={() => partners.set('carriers', [...(Array.isArray(partners.data?.carriers) ? partners.data.carriers : (Array.isArray(partners.data) ? partners.data : [])), { name: 'Yeni Partner', logo: '', color: 'bg-gray-100' }])} />
      }>
        <div className="space-y-3">
          {(Array.isArray(partners.data?.carriers) ? partners.data.carriers : Array.isArray(partners.data) ? partners.data : []).map((p: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Partner</span>
                <RemoveBtn onClick={() => {
                  const list = Array.isArray(partners.data?.carriers) ? partners.data.carriers : partners.data;
                  partners.set('carriers', list.filter((_: any, j: number) => j !== i));
                }} />
              </div>
              <div><Label text="İsim" /><Input value={p.name} onChange={v => partners.set(`carriers.${i}.name`, v)} placeholder="DHL" /></div>
              <ImageUpload label="Logo" value={p.logo ?? ''} onChange={v => partners.set(`carriers.${i}.logo`, v)} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={partners.handleSave} saving={partners.saving} success={partners.success} error={partners.error} />
      </Card>

      {/* SOSYAL KANIT */}
      <Card title="Sosyal Kanıt — Yorumlar & CTA" action={
        <AddBtn onClick={() => partners.set('socialProof.testimonials', [...(Array.isArray(partners.data?.socialProof?.testimonials) ? partners.data.socialProof.testimonials : []), { quote: '"Yorum metni."', author: '— İsim' }])} />
      }>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text='Başlık ("E-ticaret satıcıları tarafından")' /><Input value={partners.data?.socialProof?.title ?? 'E-ticaret satıcıları tarafından'} onChange={v => partners.set('socialProof.title', v)} /></div>
          <div><Label text='Vurgulu Kısım ("aktif olarak kullanılmaktadır")' /><Input value={partners.data?.socialProof?.highlightedTitle ?? 'aktif olarak kullanılmaktadır'} onChange={v => partners.set('socialProof.highlightedTitle', v)} /></div>
        </div>
        <div className="space-y-2">
          {(Array.isArray(partners.data?.socialProof?.testimonials) ? partners.data.socialProof.testimonials : []).map((t: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Yorum</span>
                <RemoveBtn onClick={() => partners.set('socialProof.testimonials', partners.data.socialProof.testimonials.filter((_: any, j: number) => j !== i))} />
              </div>
              <div><Label text="Yorum Metni" /><Input value={t.quote} onChange={v => partners.set(`socialProof.testimonials.${i}.quote`, v)} /></div>
              <div><Label text="Kişi (— E-ticaret satıcısı)" /><Input value={t.author} onChange={v => partners.set(`socialProof.testimonials.${i}.author`, v)} /></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text='CTA Buton Metni ("Sen de gönderine başla")' /><Input value={partners.data?.socialProof?.ctaText ?? 'Sen de gönderine başla'} onChange={v => partners.set('socialProof.ctaText', v)} /></div>
          <div><Label text="CTA Buton URL" /><Input value={partners.data?.socialProof?.ctaLink ?? 'https://app.adorelgo.com'} onChange={v => partners.set('socialProof.ctaLink', v)} /></div>
        </div>
        <SaveBtn onSave={partners.handleSave} saving={partners.saving} success={partners.success} error={partners.error} />
      </Card>

      {/* POPÜLER DESTİNASYONLAR */}
      <Card title="Popüler Destinasyonlar">
        <div><Label text="Başlık" /><Input value={dest.data?.title} onChange={v => dest.set('title', v)} /></div>
        <div><Label text="Alt Başlık" /><Textarea value={dest.data?.subtitle} onChange={v => dest.set('subtitle', v)} /></div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label text="Ülkeler" />
            <AddBtn onClick={() => dest.set('countries', [...(dest.data?.countries || []), {
              id: Date.now(), flag: '🌍', name: 'Yeni Ülke', order: dest.data?.countries?.length || 0, description: ''
            }])} />
          </div>
          <div className="space-y-2">
            {(dest.data?.countries || []).map((c: any, i: number) => (
              <div key={c.id || i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <div className="w-14 shrink-0"><Input value={c.flag} onChange={v => dest.set(`countries.${i}.flag`, v)} placeholder="🇩🇪" /></div>
                <div className="w-32 shrink-0"><Input value={c.name} onChange={v => dest.set(`countries.${i}.name`, v)} placeholder="Almanya" /></div>
                <Input value={c.description} onChange={v => dest.set(`countries.${i}.description`, v)} placeholder="Açıklama" />
                <RemoveBtn onClick={() => dest.set('countries', dest.data.countries.filter((_: any, j: number) => j !== i))} />
              </div>
            ))}
          </div>
        </div>
        {/* Destinasyon kartları (resimli) */}
        {dest.data?.destinations && dest.data.destinations.length > 0 && (
          <div>
            <Label text="Destinasyon Kartları (Resimler)" />
            <div className="space-y-3 mt-1">
              {dest.data.destinations.map((d: any, i: number) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label text="Ülke" /><Input value={d.name} onChange={v => dest.set(`destinations.${i}.name`, v)} /></div>
                    <div><Label text="Etiket" /><Input value={d.tag} onChange={v => dest.set(`destinations.${i}.tag`, v)} /></div>
                    <div><Label text="Fiyat" /><Input value={d.price} onChange={v => dest.set(`destinations.${i}.price`, v)} /></div>
                  </div>
                  <ImageUpload label="Kart Görseli" value={d.image ?? ''} onChange={v => dest.set(`destinations.${i}.image`, v)} />
                </div>
              ))}
            </div>
          </div>
        )}
        <SaveBtn onSave={dest.handleSave} saving={dest.saving} success={dest.success} error={dest.error} />
      </Card>

      {/* TÜM KARGOLARINI TEK YERDEN YÖNET */}
      <Card title="Tüm Kargolarını Tek Yerden Yönet — Başlık & Buton">
        <div className="grid grid-cols-2 gap-3">
          <div><Label text='Başlık ("Tüm Kargolarını")' /><Input value={solutions.data?.title} onChange={v => solutions.set('title', v)} /></div>
          <div><Label text='Vurgulu Başlık ("Tek Yerden Yönet")' /><Input value={solutions.data?.highlightedTitle} onChange={v => solutions.set('highlightedTitle', v)} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Buton Metni (HEMEN BAŞLA)" /><Input value={solutions.data?.buttonText} onChange={v => solutions.set('buttonText', v)} /></div>
          <div><Label text="Buton URL" /><Input value={solutions.data?.buttonLink} onChange={v => solutions.set('buttonLink', v)} placeholder="#kayit" /></div>
        </div>
        <div><Label text='Kart Başlığı ("Hangi Gönderim Bana Uygun?")' /><Input value={solutions.data?.cardTitle} onChange={v => solutions.set('cardTitle', v)} /></div>
        <div><Label text="Kart Alt Metni" /><Textarea value={solutions.data?.cardDescription} onChange={v => solutions.set('cardDescription', v)} rows={2} /></div>
        <SaveBtn onSave={solutions.handleSave} saving={solutions.saving} success={solutions.success} error={solutions.error} />
      </Card>

      <Card title="Servis Kartları (Yurtdışı / Yurtiçi / Alıcı Ödemeli / Yurtdışından TR)" action={
        <AddBtn onClick={() => solutions.set('services', [...(solutions.data?.services || []), {
          id: String(Date.now()), title: 'Yeni Servis', desc: '', icon: 'fa-box', color: 'bg-blue-500', bgColor: 'bg-blue-50', order: solutions.data?.services?.length || 0
        }])} />
      }>
        <div className="space-y-3">
          {(solutions.data?.services || []).sort((a: any, b: any) => a.order - b.order).map((s: any, i: number) => (
            <div key={s.id || i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Servis</span>
                <RemoveBtn onClick={() => solutions.set('services', solutions.data.services.filter((_: any, j: number) => j !== i))} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label text="Başlık" /><Input value={s.title} onChange={v => solutions.set(`services.${i}.title`, v)} /></div>
                <div><Label text="Açıklama" /><Input value={s.desc} onChange={v => solutions.set(`services.${i}.desc`, v)} /></div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={solutions.handleSave} saving={solutions.saving} success={solutions.success} error={solutions.error} />
      </Card>

      <Card title="Gönderim Seçenekleri (Ekonomik / Express / Mikro İhracat)" action={
        <AddBtn onClick={() => solutions.set('shippingOptions', [...(solutions.data?.shippingOptions || []), {
          id: String(Date.now()), title: 'Yeni Seçenek', subtitle: 'Öncelik', icon: 'fa-box', color: 'bg-blue-500',
          description: '', features: [], order: solutions.data?.shippingOptions?.length || 0
        }])} />
      }>
        <div className="space-y-3">
          {(solutions.data?.shippingOptions || []).sort((a: any, b: any) => a.order - b.order).map((opt: any, i: number) => (
            <div key={opt.id || i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Seçenek</span>
                <RemoveBtn onClick={() => solutions.set('shippingOptions', solutions.data.shippingOptions.filter((_: any, j: number) => j !== i))} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label text="Başlık (Ekonomik Kargo)" /><Input value={opt.title} onChange={v => solutions.set(`shippingOptions.${i}.title`, v)} /></div>
                <div><Label text="Alt Başlık (Fiyat Öncelikliyse)" /><Input value={opt.subtitle} onChange={v => solutions.set(`shippingOptions.${i}.subtitle`, v)} /></div>
              </div>
              <div><Label text="Açıklama" /><Textarea value={opt.description} onChange={v => solutions.set(`shippingOptions.${i}.description`, v)} rows={2} /></div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label text="Özellikler" />
                  <AddBtn label="Özellik Ekle" onClick={() => solutions.set(`shippingOptions.${i}.features`, [...(opt.features || []), 'Yeni özellik'])} />
                </div>
                <div className="space-y-1">
                  {(opt.features || []).map((f: string, fi: number) => (
                    <div key={fi} className="flex items-center gap-2">
                      <Input value={f} onChange={v => solutions.set(`shippingOptions.${i}.features.${fi}`, v)} />
                      <RemoveBtn onClick={() => solutions.set(`shippingOptions.${i}.features`, opt.features.filter((_: any, fj: number) => fj !== fi))} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={solutions.handleSave} saving={solutions.saving} success={solutions.success} error={solutions.error} />
      </Card>

      {/* BİNLERCE SATICI - İSTATİSTİKLER */}
      <Card title="İstatistikler (50.000+ / 220+ / %80)" action={
        <AddBtn onClick={() => targetAudience.set('stats', [...(targetAudience.data?.stats || []), { value: '0+', label: 'Yeni İstatistik' }])} />
      }>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text='Başlık ("Binlerce satıcı")' /><Input value={targetAudience.data?.statsTitle ?? 'Binlerce satıcı'} onChange={v => targetAudience.set('statsTitle', v)} /></div>
          <div><Label text='Vurgulu Kısım ("AdorelGo ile gönderiyor")' /><Input value={targetAudience.data?.statsHighlight ?? 'AdorelGo ile gönderiyor'} onChange={v => targetAudience.set('statsHighlight', v)} /></div>
        </div>
        <div className="space-y-2">
          {(Array.isArray(targetAudience.data?.stats) ? targetAudience.data.stats : []).map((s: any, i: number) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <div className="w-28 shrink-0"><Input value={s.value} onChange={v => targetAudience.set(`stats.${i}.value`, v)} placeholder="50.000+" /></div>
              <Input value={s.label} onChange={v => targetAudience.set(`stats.${i}.label`, v)} placeholder="gönderi / ay" />
              <RemoveBtn onClick={() => targetAudience.set('stats', targetAudience.data.stats.filter((_: any, j: number) => j !== i))} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={targetAudience.handleSave} saving={targetAudience.saving} success={targetAudience.success} error={targetAudience.error} />
      </Card>

      {/* GÖNDERDİKÇE KAZAN */}
      <Card title="Gönderdikçe Kazan Bölümü">
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Rozet (GÖNDERDİKÇE KAZAN)" /><Input value={targetAudience.data?.earnSection?.badge} onChange={v => targetAudience.set('earnSection.badge', v)} /></div>
          <div><Label text='Başlık ("Yurtdışı Gönder")' /><Input value={targetAudience.data?.earnSection?.title} onChange={v => targetAudience.set('earnSection.title', v)} /></div>
        </div>
        <div><Label text='Vurgulu Başlık ("Yurtiçi Ucuzlasın.")' /><Input value={targetAudience.data?.earnSection?.highlightedTitle} onChange={v => targetAudience.set('earnSection.highlightedTitle', v)} /></div>
        <div><Label text="Açıklama" /><Textarea value={targetAudience.data?.earnSection?.description} onChange={v => targetAudience.set('earnSection.description', v)} rows={3} /></div>
        <div><Label text="Alt Yazı (Başvuru yok. Pazarlık yok...)" /><Input value={targetAudience.data?.earnSection?.bottomText} onChange={v => targetAudience.set('earnSection.bottomText', v)} /></div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label text="Adımlar (01, 02, 03...)" />
            <AddBtn onClick={() => targetAudience.set('earnSection.benefits', [...(targetAudience.data?.earnSection?.benefits || []), { number: String((targetAudience.data?.earnSection?.benefits?.length || 0) + 1).padStart(2, '0'), text: 'Yeni adım' }])} />
          </div>
          <div className="space-y-2">
            {(targetAudience.data?.earnSection?.benefits || []).map((b: any, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <div className="w-12 shrink-0"><Input value={b.number} onChange={v => targetAudience.set(`earnSection.benefits.${i}.number`, v)} placeholder="01" /></div>
                <Input value={b.text} onChange={v => targetAudience.set(`earnSection.benefits.${i}.text`, v)} placeholder="Adım açıklaması" />
                <RemoveBtn onClick={() => targetAudience.set('earnSection.benefits', targetAudience.data.earnSection.benefits.filter((_: any, j: number) => j !== i))} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label text="Butonlar" />
            <AddBtn onClick={() => targetAudience.set('earnSection.buttons', [...(targetAudience.data?.earnSection?.buttons || []), { text: 'Yeni Buton', link: '/', style: 'primary' }])} />
          </div>
          <div className="space-y-2">
            {(targetAudience.data?.earnSection?.buttons || []).map((btn: any, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <Input value={btn.text} onChange={v => targetAudience.set(`earnSection.buttons.${i}.text`, v)} placeholder="Buton metni" />
                <Input value={btn.link} onChange={v => targetAudience.set(`earnSection.buttons.${i}.link`, v)} placeholder="/yurtdisi-kargo" />
                <RemoveBtn onClick={() => targetAudience.set('earnSection.buttons', targetAudience.data.earnSection.buttons.filter((_: any, j: number) => j !== i))} />
              </div>
            ))}
          </div>
        </div>
        <ImageUpload label="Sağ Taraf Görseli" value={targetAudience.data?.earnSection?.card?.image ?? ''} onChange={v => targetAudience.set('earnSection.card.image', v)} />
        <SaveBtn onSave={targetAudience.handleSave} saving={targetAudience.saving} success={targetAudience.success} error={targetAudience.error} />
      </Card>

      {/* KULLANANLAR BIRAKMIYOR */}
      <Card title="Kullananlar Bırakmıyor" action={
        <AddBtn onClick={() => {
          const current = Array.isArray(useCases.data?.items) ? useCases.data.items : [];
          useCases.set('items', [...current, { id: String(Date.now()), title: 'Yeni Kullanım', description: '', icon: 'fa-box', color: 'bg-blue-500' }]);
        }} />
      }>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text='Başlık ("Kullananlar")' /><Input value={useCases.data?.title} onChange={v => useCases.set('title', v)} /></div>
          <div><Label text='Vurgulu Kısım ("Bırakmıyor")' /><Input value={useCases.data?.highlightedTitle} onChange={v => useCases.set('highlightedTitle', v)} /></div>
        </div>
        <div className="space-y-3">
          {(Array.isArray(useCases.data?.items) ? useCases.data.items : []).map((item: any, i: number) => (
            <div key={item.id || i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Kart</span>
                <RemoveBtn onClick={() => useCases.set('items', useCases.data.items.filter((_: any, j: number) => j !== i))} />
              </div>
              <div><Label text="Başlık" /><Input value={item.title} onChange={v => useCases.set(`items.${i}.title`, v)} /></div>
              <div><Label text="Açıklama" /><Textarea value={item.description} onChange={v => useCases.set(`items.${i}.description`, v)} rows={2} /></div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={useCases.handleSave} saving={useCases.saving} success={useCases.success} error={useCases.error} />
      </Card>

      {/* SİSTEM EN DOĞRUSUNU SEÇER */}
      <Card title="Sistem en Doğrusunu Seçer — Başlık & Kartlar" action={
        <AddBtn onClick={() => featuresHeader.set('miniCards', [...(featuresHeader.data?.miniCards || []), { icon: 'fa-star', color: 'bg-blue-500', title: 'Yeni Kart', description: '' }])} />
      }>
        <div><Label text="Başlık" /><Input value={featuresHeader.data?.title} onChange={v => featuresHeader.set('title', v)} /></div>
        <div><Label text="Alt Başlık" /><Textarea value={featuresHeader.data?.subtitle} onChange={v => featuresHeader.set('subtitle', v)} /></div>
        <div className="space-y-2">
          {(featuresHeader.data?.miniCards || []).map((c: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Kart</span>
                <RemoveBtn onClick={() => featuresHeader.set('miniCards', featuresHeader.data.miniCards.filter((_: any, j: number) => j !== i))} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label text="Başlık" /><Input value={c.title} onChange={v => featuresHeader.set(`miniCards.${i}.title`, v)} /></div>
                <div><Label text="Açıklama" /><Input value={c.description} onChange={v => featuresHeader.set(`miniCards.${i}.description`, v)} /></div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={featuresHeader.handleSave} saving={featuresHeader.saving} success={featuresHeader.success} error={featuresHeader.error} />
      </Card>

      {/* HEMEN GÖNDERİNE BAŞLA CTA */}
      <Card title="Hemen Gönderine Başla — Orta CTA">
        <div><Label text="Başlık" /><Input value={homeCta.data?.title} onChange={v => homeCta.set('title', v)} /></div>
        <div><Label text="Alt Yazı" /><Input value={homeCta.data?.subtitle} onChange={v => homeCta.set('subtitle', v)} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Buton Metni" /><Input value={homeCta.data?.buttonText} onChange={v => homeCta.set('buttonText', v)} /></div>
          <div><Label text="Buton URL" /><Input value={homeCta.data?.buttonLink} onChange={v => homeCta.set('buttonLink', v)} placeholder="https://app.adorelgo.com" /></div>
        </div>
        <SaveBtn onSave={homeCta.handleSave} saving={homeCta.saving} success={homeCta.success} error={homeCta.error} />
      </Card>

      {/* CTA */}
      <Card title="CTA Banner">
        <div><Label text="Başlık" /><Input value={cta.data?.title} onChange={v => cta.set('title', v)} /></div>
        <div><Label text="Alt Başlık" /><Input value={cta.data?.subtitle} onChange={v => cta.set('subtitle', v)} /></div>
        <div><Label text="Buton Metni" /><Input value={cta.data?.buttonText} onChange={v => cta.set('buttonText', v)} /></div>
        <SaveBtn onSave={cta.handleSave} saving={cta.saving} success={cta.success} error={cta.error} />
      </Card>


      <SeoCard slug="home" defaultSeo={{ metaTitle: "Ana Sayfa | AdorelGo", metaDescription: "AdorelGo ile yurtdışı ve yurtiçi kargo gönderin. Shopify, Etsy, Amazon entegrasyonu. Hızlı, güvenli, ekonomik.", keywords: "adorelgo, yurtdışı kargo, yurtiçi kargo, kargo entegrasyonu", canonical: "https://adorelgo.com" }} />

    </div>
  );
};

export default HomeEditor;
