import React from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, AddBtn, RemoveBtn, ImageUpload } from './shared';

const FooterEditor: React.FC = () => {
  const footer = useEditor(() => contentAPI.getFooter(), d => contentAPI.updateFooter(d));

  if (footer.loading) return <Loader />;

  return (
    <div className="space-y-6">

      {/* LOGO & MARKA */}
      <Card title="Logo & Marka">
        <ImageUpload label="Footer Logo" value={footer.data?.bottomSection?.logoUrl ?? ''} onChange={v => footer.set('bottomSection.logoUrl', v)} />
        <div><Label text="Slogan" /><Input value={footer.data?.bottomSection?.tagline ?? ''} onChange={v => footer.set('bottomSection.tagline', v)} /></div>
        <div><Label text="Telif Hakkı (© 2024 AdorelGo...)" /><Input value={footer.data?.bottomSection?.copyrightText ?? ''} onChange={v => footer.set('bottomSection.copyrightText', v)} /></div>
        <SaveBtn onSave={footer.handleSave} saving={footer.saving} success={footer.success} error={footer.error} />
      </Card>

      {/* CTA BANDI */}
      <Card title="Footer CTA Bandı">
        <div><Label text="Başlık" /><Input value={footer.data?.cta?.title ?? ''} onChange={v => footer.set('cta.title', v)} /></div>
        <div><Label text="Alt Yazı" /><Input value={footer.data?.cta?.subtitle ?? ''} onChange={v => footer.set('cta.subtitle', v)} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Buton 1 Metni" /><Input value={footer.data?.cta?.button1Text ?? ''} onChange={v => footer.set('cta.button1Text', v)} /></div>
          <div><Label text="Buton 1 URL" /><Input value={footer.data?.cta?.button1Link ?? ''} onChange={v => footer.set('cta.button1Link', v)} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Buton 2 Metni" /><Input value={footer.data?.cta?.button2Text ?? ''} onChange={v => footer.set('cta.button2Text', v)} /></div>
          <div><Label text="Buton 2 URL" /><Input value={footer.data?.cta?.button2Link ?? ''} onChange={v => footer.set('cta.button2Link', v)} /></div>
        </div>
        <SaveBtn onSave={footer.handleSave} saving={footer.saving} success={footer.success} error={footer.error} />
      </Card>

      {/* SOSYAL MEDYA */}
      <Card title="Sosyal Medya Linkleri" action={
        <AddBtn onClick={() => footer.set('bottomSection.socialLinks', [
          ...(Array.isArray(footer.data?.bottomSection?.socialLinks) ? footer.data.bottomSection.socialLinks : []),
          { platform: 'instagram', icon: 'fa-instagram', url: '#' }
        ])} />
      }>
        <div className="space-y-2">
          {(Array.isArray(footer.data?.bottomSection?.socialLinks) ? footer.data.bottomSection.socialLinks : []).map((s: any, i: number) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <div className="w-32 shrink-0"><Input value={s.platform ?? ''} onChange={v => footer.set(`bottomSection.socialLinks.${i}.platform`, v)} placeholder="instagram" /></div>
              <div className="w-36 shrink-0"><Input value={s.icon ?? ''} onChange={v => footer.set(`bottomSection.socialLinks.${i}.icon`, v)} placeholder="fa-instagram" /></div>
              <Input value={s.url ?? ''} onChange={v => footer.set(`bottomSection.socialLinks.${i}.url`, v)} placeholder="https://..." />
              <RemoveBtn onClick={() => footer.set('bottomSection.socialLinks', footer.data.bottomSection.socialLinks.filter((_: any, j: number) => j !== i))} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={footer.handleSave} saving={footer.saving} success={footer.success} error={footer.error} />
      </Card>

      {/* KURUMSAL LİNKLER */}
      <Card title="Kurumsal Bağlantılar (Alt Footer)" action={
        <AddBtn onClick={() => footer.set('bottomSection.corporateLinks', [
          ...(Array.isArray(footer.data?.bottomSection?.corporateLinks) ? footer.data.bottomSection.corporateLinks : []),
          { name: 'Yeni Link', url: '/' }
        ])} />
      }>
        <div><Label text="Başlık (KURUMSAL BAĞLANTILAR)" /><Input value={footer.data?.bottomSection?.corporateTitle ?? ''} onChange={v => footer.set('bottomSection.corporateTitle', v)} /></div>
        <div className="space-y-2">
          {(Array.isArray(footer.data?.bottomSection?.corporateLinks) ? footer.data.bottomSection.corporateLinks : []).map((l: any, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex-1"><Input value={l.name ?? ''} onChange={v => footer.set(`bottomSection.corporateLinks.${i}.name`, v)} placeholder="Hakkımızda" /></div>
              <div className="flex-1"><Input value={l.url ?? ''} onChange={v => footer.set(`bottomSection.corporateLinks.${i}.url`, v)} placeholder="/hakkimizda" /></div>
              <RemoveBtn onClick={() => footer.set('bottomSection.corporateLinks', footer.data.bottomSection.corporateLinks.filter((_: any, j: number) => j !== i))} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={footer.handleSave} saving={footer.saving} success={footer.success} error={footer.error} />
      </Card>

      {/* ÖDEME YÖNTEMLERİ */}
      <Card title="Ödeme Yöntemleri (Alt Footer)" action={
        <AddBtn onClick={() => footer.set('bottomSection.paymentMethods', [
          ...(Array.isArray(footer.data?.bottomSection?.paymentMethods) ? footer.data.bottomSection.paymentMethods : []),
          { name: 'Yeni', logoUrl: '' }
        ])} />
      }>
        <div className="space-y-3">
          {(Array.isArray(footer.data?.bottomSection?.paymentMethods) ? footer.data.bottomSection.paymentMethods : []).map((pm: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{pm.name || `${i + 1}. Yöntem`}</span>
                <RemoveBtn onClick={() => footer.set('bottomSection.paymentMethods', footer.data.bottomSection.paymentMethods.filter((_: any, j: number) => j !== i))} />
              </div>
              <div><Label text="İsim" /><Input value={pm.name ?? ''} onChange={v => footer.set(`bottomSection.paymentMethods.${i}.name`, v)} placeholder="Visa" /></div>
              <ImageUpload label="Logo" value={pm.logoUrl ?? ''} onChange={v => footer.set(`bottomSection.paymentMethods.${i}.logoUrl`, v)} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={footer.handleSave} saving={footer.saving} success={footer.success} error={footer.error} />
      </Card>

      {/* LİNK GRUPLARI */}
      {(Array.isArray(footer.data?.sections) ? footer.data.sections : []).map((section: any, si: number) => (
        <Card key={si} title={section.title || `${si + 1}. Grup`} action={
          <AddBtn onClick={() => footer.set(`sections.${si}.links`, [...(Array.isArray(section.links) ? section.links : []), { n: 'Yeni Link', h: '/' }])} />
        }>
          <div><Label text="Grup Başlığı" /><Input value={section.title ?? ''} onChange={v => footer.set(`sections.${si}.title`, v)} /></div>
          <div className="space-y-2">
            {(Array.isArray(section.links) ? section.links : []).map((link: any, li: number) => (
              <div key={li} className="flex items-center gap-2">
                <div className="flex-1"><Input value={link.n ?? ''} onChange={v => footer.set(`sections.${si}.links.${li}.n`, v)} placeholder="Link adı" /></div>
                <div className="flex-1"><Input value={link.h ?? ''} onChange={v => footer.set(`sections.${si}.links.${li}.h`, v)} placeholder="/sayfa-url" /></div>
                <RemoveBtn onClick={() => footer.set(`sections.${si}.links`, section.links.filter((_: any, j: number) => j !== li))} />
              </div>
            ))}
          </div>
          <SaveBtn onSave={footer.handleSave} saving={footer.saving} success={footer.success} error={footer.error} />
        </Card>
      ))}

      <button
        onClick={() => footer.set('sections', [...(Array.isArray(footer.data?.sections) ? footer.data.sections : []), { title: 'Yeni Grup', links: [] }])}
        className="w-full border-2 border-dashed border-gray-200 rounded-xl py-3 text-sm text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
      >
        + Yeni Link Grubu Ekle
      </button>

    </div>
  );
};

export default FooterEditor;
