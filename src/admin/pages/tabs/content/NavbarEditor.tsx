import React from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, AddBtn, RemoveBtn, ImageUpload } from './shared';

const NavbarEditor: React.FC = () => {
  const navbar = useEditor(() => contentAPI.getNavbar(), d => contentAPI.updateNavbar(d));

  if (navbar.loading) return <Loader />;

  return (
    <div className="space-y-6">
      <Card title="Logo">
        <ImageUpload label="Logo Görseli" value={navbar.data?.logo ?? ''} onChange={v => navbar.set('logo', v)} />
        <SaveBtn onSave={navbar.handleSave} saving={navbar.saving} success={navbar.success} error={navbar.error} />
      </Card>

      <Card title="Menü Linkleri" action={
        <AddBtn onClick={() => navbar.set('menuItems', [...(navbar.data?.menuItems || []), {
          id: String(Date.now()), label: 'Yeni Link', link: '/', isActive: true, order: (navbar.data?.menuItems?.length || 0), position: 'header', mobileVisible: true
        }])} />
      }>
        <div className="space-y-2">
          {(navbar.data?.menuItems || [])
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
            .map((item: any, i: number) => (
            <div key={item.id || i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <div className="w-32 shrink-0"><Input value={item.label ?? ''} onChange={v => navbar.set(`menuItems.${i}.label`, v)} placeholder="Menü adı" /></div>
              <Input value={item.link ?? ''} onChange={v => navbar.set(`menuItems.${i}.link`, v)} placeholder="/sayfa" />
              <RemoveBtn onClick={() => navbar.set('menuItems', navbar.data.menuItems.filter((_: any, j: number) => j !== i))} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={navbar.handleSave} saving={navbar.saving} success={navbar.success} error={navbar.error} />
      </Card>

      <Card title="CTA Butonları" action={
        <AddBtn onClick={() => navbar.set('ctaButtons', [...(navbar.data?.ctaButtons || []), {
          id: String(Date.now()), label: 'Yeni Buton', link: '/', style: 'primary'
        }])} />
      }>
        <div className="space-y-2">
          {(navbar.data?.ctaButtons || []).map((btn: any, i: number) => (
            <div key={btn.id || i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <div className="w-32 shrink-0"><Input value={btn.label ?? ''} onChange={v => navbar.set(`ctaButtons.${i}.label`, v)} placeholder="Buton adı" /></div>
              <Input value={btn.link ?? ''} onChange={v => navbar.set(`ctaButtons.${i}.link`, v)} placeholder="URL" />
              <RemoveBtn onClick={() => navbar.set('ctaButtons', navbar.data.ctaButtons.filter((_: any, j: number) => j !== i))} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={navbar.handleSave} saving={navbar.saving} success={navbar.success} error={navbar.error} />
      </Card>
    </div>
  );
};

export default NavbarEditor;
