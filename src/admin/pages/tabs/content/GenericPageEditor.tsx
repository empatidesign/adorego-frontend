import React, { useState, useEffect } from 'react';
import { contentAPI } from '../../../services/api';
import { Loader, Card, Label, Input, Textarea, SaveBtn, AddBtn, RemoveBtn } from './shared';
import RichEditor from '../../../components/RichEditor';

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

const ICON_LIST = [
  'fa-star','fa-heart','fa-check','fa-check-circle','fa-globe','fa-truck','fa-box','fa-box-open',
  'fa-shipping-fast','fa-plane','fa-map-marker-alt','fa-map','fa-clock','fa-calendar','fa-bell',
  'fa-envelope','fa-phone','fa-headset','fa-user','fa-users','fa-building','fa-store',
  'fa-shopping-cart','fa-shopping-bag','fa-tag','fa-tags','fa-gift','fa-percent',
  'fa-money-bill-wave','fa-credit-card','fa-wallet','fa-chart-line','fa-chart-bar',
  'fa-lock','fa-shield-alt','fa-key','fa-info-circle','fa-question-circle','fa-exclamation-circle',
  'fa-cog','fa-tools','fa-wrench','fa-plug','fa-code','fa-laptop','fa-mobile-alt',
  'fa-wifi','fa-cloud','fa-database','fa-file','fa-file-alt','fa-folder','fa-image',
  'fa-search','fa-filter','fa-sort','fa-list','fa-th','fa-th-large','fa-bars',
  'fa-arrow-right','fa-arrow-left','fa-arrow-up','fa-arrow-down','fa-external-link-alt',
  'fa-share-alt','fa-link','fa-thumbs-up','fa-smile','fa-flag','fa-award','fa-trophy',
  'fa-bolt','fa-fire','fa-leaf','fa-recycle','fa-seedling','fa-sun','fa-moon',
  'fa-calculator','fa-flask','fa-sync-alt','fa-redo','fa-undo','fa-mouse-pointer',
];

const IconPicker: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const filtered = search ? ICON_LIST.filter(ic => ic.includes(search.toLowerCase())) : ICON_LIST;
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 text-sm w-full"
      >
        <i className={`fas ${value || 'fa-star'} text-[#102477] w-5 text-center`}></i>
        <span className="text-gray-600 flex-1 text-left">{value || 'fa-star'}</span>
        <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl p-3 w-72">
          <input
            type="text"
            placeholder="İkon ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
            {filtered.map(ic => (
              <button
                key={ic}
                type="button"
                title={ic}
                onClick={() => { onChange(ic); setOpen(false); setSearch(''); }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors ${value === ic ? 'bg-blue-100 ring-2 ring-blue-400' : ''}`}
              >
                <i className={`fas ${ic} text-[#102477] text-sm`}></i>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

type SectionType = 'text' | 'heading' | 'list' | 'card-grid';

interface Section {
  type: SectionType;
  content?: string;
  items?: string[];
  cards?: { icon: string; title: string; description: string }[];
}

const SectionEditor: React.FC<{
  section: Section;
  index: number;
  onChange: (s: Section) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}> = ({ section, index, onChange, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) => (
  <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <select
          value={section.type}
          onChange={e => {
            const t = e.target.value as SectionType;
            const base: Section = { type: t };
            if (t === 'list') base.items = [''];
            else if (t === 'card-grid') base.cards = [{ icon: 'fa-star', title: '', description: '' }];
            else base.content = '';
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
          <button onClick={onMoveUp} className="text-gray-400 hover:text-gray-700 px-1.5 py-1 text-xs border border-gray-200 rounded bg-white">↑</button>
        )}
        {!isLast && (
          <button onClick={onMoveDown} className="text-gray-400 hover:text-gray-700 px-1.5 py-1 text-xs border border-gray-200 rounded bg-white">↓</button>
        )}
        <RemoveBtn onClick={onRemove} />
      </div>
    </div>

    {section.type === 'text' && (
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
            <RemoveBtn onClick={() => onChange({ ...section, items: (section.items ?? []).filter((_, j) => j !== i) })} />
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
              <RemoveBtn onClick={() => onChange({ ...section, cards: (section.cards ?? []).filter((_, j) => j !== i) })} />
            </div>
            <div><Label text="İkon" /><IconPicker value={card.icon} onChange={v => { const cards = [...(section.cards ?? [])]; cards[i] = { ...cards[i], icon: v }; onChange({ ...section, cards }); }} /></div>
            <div><Label text="Başlık" /><Input value={card.title} onChange={v => { const cards = [...(section.cards ?? [])]; cards[i] = { ...cards[i], title: v }; onChange({ ...section, cards }); }} placeholder="Kart Başlığı" /></div>
            <div><Label text="Açıklama" /><Textarea value={card.description} onChange={v => { const cards = [...(section.cards ?? [])]; cards[i] = { ...cards[i], description: v }; onChange({ ...section, cards }); }} rows={2} /></div>
          </div>
        ))}
        <AddBtn label="Kart Ekle" onClick={() => onChange({ ...section, cards: [...(section.cards ?? []), { icon: 'fa-star', title: '', description: '' }] })} />
      </div>
    )}
  </div>
);

interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonical?: string;
}

type Lang = 'tr' | 'en';
type LocalizedValue<T> = T | ((lang: Lang) => T);

const resolveValue = <T,>(value: LocalizedValue<T> | undefined, lang: Lang): T | undefined => {
  if (typeof value === 'function') {
    return (value as (lang: Lang) => T)(lang);
  }

  return value;
};

const GenericPageEditor: React.FC<{ slug: string; defaultTitle: LocalizedValue<string>; defaultSections?: LocalizedValue<Section[]>; defaultDescription?: LocalizedValue<string>; defaultSeo?: LocalizedValue<SeoData> }> = ({ slug, defaultTitle, defaultSections, defaultDescription, defaultSeo }) => {
  const [lang, setLang] = useState<Lang>('tr');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const [seo, setSeo] = useState<SeoData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const resolvedDefaultTitle = resolveValue(defaultTitle, lang) ?? '';
    const resolvedDefaultDescription = resolveValue(defaultDescription, lang) ?? '';
    const resolvedDefaultSections = resolveValue(defaultSections, lang) ?? [];
    const resolvedDefaultSeo = resolveValue(defaultSeo, lang) ?? {};

    Promise.all([
      contentAPI.getContentPage(slug, lang).catch(() => null),
      contentAPI.getSeo(slug, lang).catch(() => null),
    ]).then(([pageData, seoData]: any[]) => {
      setTitle(pageData?.title || resolvedDefaultTitle);
      setDescription(pageData?.description || resolvedDefaultDescription);
      const hasSections = Array.isArray(pageData?.sections) && pageData.sections.length > 0;
      setSections(hasSections ? pageData.sections : resolvedDefaultSections);
      const hasSeo = seoData && Object.keys(seoData).length > 0;
      setSeo(hasSeo ? seoData : resolvedDefaultSeo);
    }).finally(() => setLoading(false));
  }, [slug, lang, defaultTitle, defaultDescription, defaultSections, defaultSeo]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      await Promise.all([
        contentAPI.updateContentPage(slug, { title, description, sections }, lang),
        contentAPI.updateSeo(slug, seo, lang),
      ]);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Kaydetme hatası');
    } finally {
      setSaving(false);
    }
  };

  const addSection = (type: SectionType) => {
    const base: Section = { type };
    if (type === 'list') base.items = [''];
    else if (type === 'card-grid') base.cards = [{ icon: 'fa-star', title: '', description: '' }];
    else base.content = '';
    setSections(prev => [...prev, base]);
  };

  const updateSection = (i: number, s: Section) => {
    setSections(prev => { const next = [...prev]; next[i] = s; return next; });
  };

  const removeSection = (i: number) => {
    setSections(prev => prev.filter((_, j) => j !== i));
  };

  const moveSection = (i: number, dir: -1 | 1) => {
    setSections(prev => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return next;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  if (loading) return <Loader />;

  const resolvedDefaultTitle = resolveValue(defaultTitle, lang) ?? '';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Seçili dil için içerik ve SEO yüklenip kaydedilir.</p>
        <LangToggle lang={lang} onChange={setLang} />
      </div>

      <Card title="Sayfa Bilgileri">
        <div><Label text="Başlık" /><Input value={title} onChange={setTitle} placeholder={resolvedDefaultTitle} /></div>
        <div><Label text="Kısa Açıklama" /><Textarea value={description} onChange={setDescription} rows={2} placeholder="Sayfanın kısa açıklaması (opsiyonel)" /></div>
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
        {sections.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-6">Henüz bölüm yok. Yukarıdaki butonlarla bölüm ekleyin.</p>
        )}
        {sections.map((section, i) => (
          <SectionEditor
            key={i}
            section={section}
            index={i}
            onChange={s => updateSection(i, s)}
            onRemove={() => removeSection(i)}
            onMoveUp={() => moveSection(i, -1)}
            onMoveDown={() => moveSection(i, 1)}
            isFirst={i === 0}
            isLast={i === sections.length - 1}
          />
        ))}
      </Card>

      <Card title="SEO Ayarları">
        <div><Label text="Meta Başlık (Title)" /><Input value={seo.metaTitle ?? ''} onChange={v => setSeo(s => ({ ...s, metaTitle: v }))} placeholder={`${defaultTitle} | AdorelGo`} /></div>
        <div><Label text="Meta Açıklama (Description)" /><Textarea value={seo.metaDescription ?? ''} onChange={v => setSeo(s => ({ ...s, metaDescription: v }))} rows={2} placeholder="Arama motorlarında görünecek açıklama (max 160 karakter)" /></div>
        <div><Label text="Anahtar Kelimeler" /><Input value={seo.keywords ?? ''} onChange={v => setSeo(s => ({ ...s, keywords: v }))} placeholder="kargo, yurtdışı kargo, ..." /></div>
        <div><Label text="Canonical URL" /><Input value={seo.canonical ?? ''} onChange={v => setSeo(s => ({ ...s, canonical: v }))} placeholder={`https://adorelgo.com/${slug}`} /></div>
      </Card>

      <SaveBtn onSave={handleSave} saving={saving} success={success} error={error} />
    </div>
  );
};

export default GenericPageEditor;
