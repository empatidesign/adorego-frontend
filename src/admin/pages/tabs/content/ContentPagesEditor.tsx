import React, { useState, useEffect } from 'react';
import { contentAPI } from '../../../services/api';
import api from '../../../services/api';
import { Loader, Card, Label, Input, Textarea, SaveBtn, AddBtn, RemoveBtn } from './shared';
import RichEditor from '../../../components/RichEditor';

type SectionType = 'text' | 'heading' | 'list' | 'card-grid';

interface Section {
  type: SectionType;
  content?: string;
  items?: string[];
  cards?: { icon: string; title: string; description: string }[];
}

interface PageForm {
  slug: string;
  title: string;
  description: string;
  sections: Section[];
}

const defaultForm = (): PageForm => ({
  slug: '',
  title: '',
  description: '',
  sections: [],
});

const SectionEditor: React.FC<{
  section: Section;
  index: number;
  onChange: (s: Section) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}> = ({ section, index, onChange, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <select
            value={section.type}
            onChange={e => {
              const t = e.target.value as SectionType;
              const base: Section = { type: t };
              if (t === 'list') base.items = [''];
              if (t === 'card-grid') base.cards = [{ icon: 'fa-star', title: '', description: '' }];
              if (t === 'text' || t === 'heading') base.content = '';
              onChange(base);
            }}
            className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="text">Metin Bloğu</option>
            <option value="heading">Başlık (H2)</option>
            <option value="list">Liste</option>
            <option value="card-grid">Kart Grid</option>
          </select>
          <span className="text-xs text-gray-400">#{index + 1}</span>
        </div>
        <div className="flex items-center gap-1">
          {!isFirst && (
            <button onClick={onMoveUp} title="Yukarı taşı"
              className="text-gray-400 hover:text-gray-700 px-1.5 py-1 text-xs border border-gray-200 rounded bg-white">↑</button>
          )}
          {!isLast && (
            <button onClick={onMoveDown} title="Aşağı taşı"
              className="text-gray-400 hover:text-gray-700 px-1.5 py-1 text-xs border border-gray-200 rounded bg-white">↓</button>
          )}
          <RemoveBtn onClick={onRemove} />
        </div>
      </div>

      {(section.type === 'text') && (
        <div>
          <Label text="İçerik" />
          <RichEditor value={section.content ?? ''} onChange={v => onChange({ ...section, content: v })} />
        </div>
      )}

      {section.type === 'heading' && (
        <div>
          <Label text="Başlık Metni" />
          <Input value={section.content ?? ''} onChange={v => onChange({ ...section, content: v })} placeholder="Bölüm Başlığı" />
        </div>
      )}

      {section.type === 'list' && (
        <div className="space-y-2">
          <Label text="Liste Maddeleri" />
          {(section.items ?? []).map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={item} onChange={v => {
                const items = [...(section.items ?? [])];
                items[i] = v;
                onChange({ ...section, items });
              }} placeholder={`Madde ${i + 1}`} />
              <RemoveBtn onClick={() => {
                const items = (section.items ?? []).filter((_, j) => j !== i);
                onChange({ ...section, items });
              }} />
            </div>
          ))}
          <AddBtn label="Madde Ekle" onClick={() => onChange({ ...section, items: [...(section.items ?? []), ''] })} />
        </div>
      )}

      {section.type === 'card-grid' && (
        <div className="space-y-3">
          <Label text="Kartlar" />
          {(section.cards ?? []).map((card, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-3 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">Kart {i + 1}</span>
                <RemoveBtn onClick={() => {
                  const cards = (section.cards ?? []).filter((_, j) => j !== i);
                  onChange({ ...section, cards });
                }} />
              </div>
              <div>
                <Label text="İkon (FontAwesome sınıfı)" />
                <Input value={card.icon} onChange={v => {
                  const cards = [...(section.cards ?? [])];
                  cards[i] = { ...cards[i], icon: v };
                  onChange({ ...section, cards });
                }} placeholder="fa-star" />
              </div>
              <div>
                <Label text="Başlık" />
                <Input value={card.title} onChange={v => {
                  const cards = [...(section.cards ?? [])];
                  cards[i] = { ...cards[i], title: v };
                  onChange({ ...section, cards });
                }} placeholder="Kart Başlığı" />
              </div>
              <div>
                <Label text="Açıklama" />
                <Textarea value={card.description} onChange={v => {
                  const cards = [...(section.cards ?? [])];
                  cards[i] = { ...cards[i], description: v };
                  onChange({ ...section, cards });
                }} rows={2} placeholder="Kart açıklaması..." />
              </div>
            </div>
          ))}
          <AddBtn label="Kart Ekle" onClick={() => onChange({ ...section, cards: [...(section.cards ?? []), { icon: 'fa-star', title: '', description: '' }] })} />
        </div>
      )}
    </div>
  );
};

const ContentPagesEditor: React.FC = () => {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<PageForm>(defaultForm());
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => { loadPages(); }, []);

  const loadPages = async () => {
    setLoading(true);
    try {
      const r = await api.get('/content/pages');
      setPages(Array.isArray(r.data) ? r.data : []);
    } catch {
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setForm(defaultForm());
    setCreating(true);
    setEditing(null);
  };

  const openEdit = async (slug: string, title: string) => {
    try {
      const data = await contentAPI.getContentPage(slug);
      setForm({
        slug,
        title: data?.title || title,
        description: data?.description || '',
        sections: Array.isArray(data?.sections) ? data.sections : [],
      });
    } catch {
      setForm({ slug, title, description: '', sections: [] });
    }
    setEditing(slug);
    setCreating(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    setSaveSuccess(false);
    try {
      const { slug, ...data } = form;
      if (creating) {
        await api.post('/content/pages', { slug, data });
      } else {
        await contentAPI.updateContentPage(slug, data);
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      setCreating(false);
      setEditing(null);
      loadPages();
    } catch (e: any) {
      setSaveError(e?.response?.data?.message || 'Hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm(`"/${slug}" sayfası silinsin mi?`)) return;
    await api.delete(`/content/pages/${slug}`);
    loadPages();
  };

  const updateSection = (i: number, s: Section) => {
    const sections = [...form.sections];
    sections[i] = s;
    setForm({ ...form, sections });
  };

  const removeSection = (i: number) => {
    setForm({ ...form, sections: form.sections.filter((_, j) => j !== i) });
  };

  const addSection = (type: SectionType) => {
    const base: Section = { type };
    if (type === 'list') base.items = [''];
    if (type === 'card-grid') base.cards = [{ icon: 'fa-star', title: '', description: '' }];
    if (type === 'text' || type === 'heading') base.content = '';
    setForm({ ...form, sections: [...form.sections, base] });
  };

  const moveSection = (i: number, dir: -1 | 1) => {
    const sections = [...form.sections];
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    [sections[i], sections[j]] = [sections[j], sections[i]];
    setForm({ ...form, sections });
  };

  if (editing || creating) {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => { setEditing(null); setCreating(false); }}
            className="text-gray-400 hover:text-gray-700 text-sm">← Geri</button>
          <h2 className="text-sm font-semibold text-gray-800">
            {creating ? 'Yeni Sayfa Oluştur' : `Düzenle: /${form.slug}`}
          </h2>
        </div>

        <Card title="Sayfa Bilgileri">
          {creating && (
            <div>
              <Label text="Slug (URL)" />
              <Input value={form.slug} onChange={v => setForm({ ...form, slug: v.toLowerCase().replace(/\s+/g, '-') })} placeholder="ornek-sayfa" />
              <p className="text-xs text-gray-400 mt-1">Sayfanın URL'i: /{form.slug}</p>
            </div>
          )}
          <div>
            <Label text="Sayfa Başlığı" />
            <Input value={form.title} onChange={v => setForm({ ...form, title: v })} placeholder="Sayfa başlığı" />
          </div>
          <div>
            <Label text="Kısa Açıklama" />
            <Textarea value={form.description} onChange={v => setForm({ ...form, description: v })} rows={2} placeholder="Sayfanın kısa açıklaması (opsiyonel)" />
          </div>
        </Card>

        <Card
          title="İçerik Bölümleri"
          action={
            <div className="flex items-center gap-2">
              {(['heading', 'text', 'list', 'card-grid'] as SectionType[]).map(t => (
                <button key={t} onClick={() => addSection(t)}
                  className="text-xs text-blue-600 border border-blue-200 px-2 py-1 rounded-lg hover:bg-blue-50">
                  + {t === 'text' ? 'Metin' : t === 'heading' ? 'Başlık' : t === 'list' ? 'Liste' : 'Kart'}
                </button>
              ))}
            </div>
          }
        >
          {form.sections.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-6">
              Henüz bölüm yok. Yukarıdaki butonlarla bölüm ekleyin.
            </p>
          )}
          {form.sections.map((section, i) => (
            <SectionEditor
              key={i}
              section={section}
              index={i}
              onChange={s => updateSection(i, s)}
              onRemove={() => removeSection(i)}
              onMoveUp={() => moveSection(i, -1)}
              onMoveDown={() => moveSection(i, 1)}
              isFirst={i === 0}
              isLast={i === form.sections.length - 1}
            />
          ))}
        </Card>

        <SaveBtn onSave={handleSave} saving={saving} success={saveSuccess} error={saveError} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          + Yeni Sayfa
        </button>
      </div>
      {loading ? <Loader /> : pages.length === 0
        ? <p className="text-gray-400 text-sm py-8 text-center">Henüz sayfa yok.</p>
        : pages.map((page: any) => (
          <div key={page.slug} className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4">
            <div>
              <p className="text-sm font-medium text-gray-900">{page.title || page.slug}</p>
              <p className="text-xs text-gray-400">/{page.slug}</p>
              {page.description && <p className="text-xs text-gray-500 mt-0.5 max-w-md truncate">{page.description}</p>}
            </div>
            <div className="flex gap-3">
              <button onClick={() => openEdit(page.slug, page.title)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium">Düzenle</button>
              <button onClick={() => handleDelete(page.slug)}
                className="text-red-500 hover:text-red-700 text-sm font-medium">Sil</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ContentPagesEditor;
