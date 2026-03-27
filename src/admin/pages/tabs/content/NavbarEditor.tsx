import React, { useState } from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, AddBtn, RemoveBtn, ImageUpload } from './shared';

const NavbarEditor: React.FC = () => {
  const navbar = useEditor(() => contentAPI.getNavbar(), d => contentAPI.updateNavbar(d));
  const [expandedDropdown, setExpandedDropdown] = useState<number | null>(null);

  if (navbar.loading) return <Loader />;

  const menuItems: any[] = navbar.data?.menuItems || [];

  const addMenuItem = () => {
    navbar.set('menuItems', [...menuItems, {
      id: String(Date.now()),
      label: 'Yeni Link',
      link: '/',
      type: 'link',
      isActive: true,
      order: menuItems.length,
      position: 'header',
      mobileVisible: true,
      children: [],
    }]);
  };

  const removeMenuItem = (i: number) => {
    navbar.set('menuItems', menuItems.filter((_: any, j: number) => j !== i));
    if (expandedDropdown === i) setExpandedDropdown(null);
  };

  const setItemField = (i: number, field: string, value: any) => {
    navbar.set(`menuItems.${i}.${field}`, value);
  };

  const addChild = (i: number) => {
    const children = menuItems[i]?.children || [];
    setItemField(i, 'children', [...children, {
      id: String(Date.now()),
      label: 'Alt Link',
      link: '/',
    }]);
  };

  const removeChild = (i: number, ci: number) => {
    const children = (menuItems[i]?.children || []).filter((_: any, j: number) => j !== ci);
    setItemField(i, 'children', children);
  };

  const setChildField = (i: number, ci: number, field: string, value: string) => {
    const children = [...(menuItems[i]?.children || [])];
    children[ci] = { ...children[ci], [field]: value };
    setItemField(i, 'children', children);
  };

  return (
    <div className="space-y-6">
      <Card title="Logo">
        <ImageUpload label="Logo Görseli" value={navbar.data?.logo ?? ''} onChange={v => navbar.set('logo', v)} />
        <SaveBtn onSave={navbar.handleSave} saving={navbar.saving} success={navbar.success} error={navbar.error} />
      </Card>

      <Card title="Menü Linkleri" action={<AddBtn onClick={addMenuItem} />}>
        <div className="space-y-3">
          {menuItems
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
            .map((item: any, i: number) => (
              <div key={item.id || i} className="border border-gray-200 rounded-xl overflow-hidden">
                {/* Ana satır */}
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2">
                  <div className="w-28 shrink-0">
                    <Input
                      value={item.label ?? ''}
                      onChange={v => setItemField(i, 'label', v)}
                      placeholder="Menü adı"
                    />
                  </div>

                  {/* Tip seçici */}
                  <select
                    value={item.type || 'link'}
                    onChange={e => {
                      setItemField(i, 'type', e.target.value);
                      if (e.target.value === 'dropdown') {
                        setExpandedDropdown(i);
                        if (!item.children?.length) addChild(i);
                      } else {
                        setExpandedDropdown(null);
                      }
                    }}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 shrink-0"
                  >
                    <option value="link">Link</option>
                    <option value="dropdown">Dropdown</option>
                  </select>

                  {item.type === 'link' && (
                    <Input
                      value={item.link ?? ''}
                      onChange={v => setItemField(i, 'link', v)}
                      placeholder="/sayfa"
                    />
                  )}

                  {item.type === 'dropdown' && (
                    <button
                      onClick={() => setExpandedDropdown(expandedDropdown === i ? null : i)}
                      className="flex-1 text-left text-xs text-blue-600 hover:text-blue-800 px-2 py-1.5 border border-blue-200 rounded-lg bg-blue-50"
                    >
                      {(item.children?.length || 0)} alt link — {expandedDropdown === i ? 'Kapat ▲' : 'Düzenle ▼'}
                    </button>
                  )}

                  <RemoveBtn onClick={() => removeMenuItem(i)} />
                </div>

                {/* Dropdown children */}
                {item.type === 'dropdown' && expandedDropdown === i && (
                  <div className="px-4 py-3 bg-white border-t border-gray-100 space-y-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Alt Linkler</span>
                      <button
                        onClick={() => addChild(i)}
                        className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        + Ekle
                      </button>
                    </div>
                    {(item.children || []).map((child: any, ci: number) => (
                      <div key={child.id || ci} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <div className="w-32 shrink-0">
                          <Input
                            value={child.label ?? ''}
                            onChange={v => setChildField(i, ci, 'label', v)}
                            placeholder="Alt link adı"
                          />
                        </div>
                        <Input
                          value={child.link ?? ''}
                          onChange={v => setChildField(i, ci, 'link', v)}
                          placeholder="/sayfa"
                        />
                        <RemoveBtn onClick={() => removeChild(i, ci)} />
                      </div>
                    ))}
                    {(!item.children || item.children.length === 0) && (
                      <p className="text-xs text-gray-400 text-center py-2">Henüz alt link yok</p>
                    )}
                  </div>
                )}
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
