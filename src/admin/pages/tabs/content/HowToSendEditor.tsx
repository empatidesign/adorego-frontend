import React from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, AddBtn, RemoveBtn, SeoCard } from './shared';

const HowToSendEditor: React.FC = () => {
  const how = useEditor(() => contentAPI.getHowToSend(), d => contentAPI.updateHowToSend(d));

  if (how.loading) return <Loader />;

  return (
    <div className="space-y-6">
      <Card title="Nasıl Gönderirim" action={
        <AddBtn onClick={() => how.set('steps', [...(how.data?.steps || []), {
          id: Date.now(), title: 'Yeni Adım', description: '', icon: 'fa-star'
        }])} />
      }>
        <div><Label text="Başlık" /><Input value={how.data?.title} onChange={v => how.set('title', v)} /></div>
        <div><Label text="Alt Başlık" /><Textarea value={how.data?.subtitle} onChange={v => how.set('subtitle', v)} /></div>
        <div className="space-y-3">
          {(how.data?.steps || []).map((step: any, i: number) => (
            <div key={step.id || i} className="border border-gray-100 rounded-xl p-4 space-y-2 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-semibold">{i + 1}. Adım</span>
                <RemoveBtn onClick={() => how.set('steps', how.data.steps.filter((_: any, j: number) => j !== i))} />
              </div>
              <div><Label text="Başlık" /><Input value={step.title} onChange={v => how.set(`steps.${i}.title`, v)} /></div>
              <div><Label text="Açıklama" /><Textarea value={step.description} onChange={v => how.set(`steps.${i}.description`, v)} rows={2} /></div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={how.handleSave} saving={how.saving} success={how.success} error={how.error} />
      </Card>

      <SeoCard slug="nasil-gonderirim" defaultSeo={{ metaTitle: "Nasıl Gönderirim? | AdorelGo", metaDescription: "AdorelGo ile nasıl kargo gönderilir? Adım adım kargo gönderme rehberi.", keywords: "nasıl kargo gönderilir, kargo gönderme, adorelgo kullanım", canonical: "https://adorelgo.com/nasil-gonderirim" }} />

    </div>
  );
};

export default HowToSendEditor;
