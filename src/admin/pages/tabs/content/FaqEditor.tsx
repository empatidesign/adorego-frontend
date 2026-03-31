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

const DEFAULT_FAQ_HEADER = (lang: 'tr' | 'en') => ({
  badge: lang === 'tr' ? 'BİLGİ MERKEZİ' : 'INFORMATION CENTER',
  title: lang === 'tr' ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions',
  groups: lang === 'tr'
    ? [
        { ids: ['1', '2', '3', '4', '5'], label: 'Üyelik & Ücretlendirme' },
        { ids: ['6', '7', '8', '9'], label: 'Nasıl Gönderirim?' },
        { ids: ['10', '11', '12', '13'], label: 'Kapıdan Alım – Kapıya Teslim' },
        { ids: ['14', '15', '16', '17'], label: 'İlk Kez Yurtdışına Gönderenler' },
        { ids: ['18', '19', '20', '21'], label: 'Gümrük & Evrak Rehberi' },
        { ids: ['22', '23', '24'], label: 'Büyük Paket (XL & Lojistik)' },
        { ids: ['25', '26', '27'], label: 'Alıcı Ödemeli Gönderi' },
        { ids: ['28', '29', '30', '31'], label: 'İade & Geri Gönderim' },
        { ids: ['32', '33', '34'], label: 'Entegrasyon & Kullanım' },
        { ids: ['35', '36', '37', '38'], label: 'Güven & Operasyon' },
      ]
    : [
        { ids: ['1', '2', '3', '4', '5'], label: 'Membership & Pricing' },
        { ids: ['6', '7', '8', '9'], label: 'How to Ship?' },
        { ids: ['10', '11', '12', '13'], label: 'Door Pickup – Door Delivery' },
        { ids: ['14', '15', '16', '17'], label: 'First-Time International Shippers' },
        { ids: ['18', '19', '20', '21'], label: 'Customs & Document Guide' },
        { ids: ['22', '23', '24'], label: 'Large Packages (XL & Logistics)' },
        { ids: ['25', '26', '27'], label: 'Receiver-Pays Shipments' },
        { ids: ['28', '29', '30', '31'], label: 'Returns & Reshipping' },
        { ids: ['32', '33', '34'], label: 'Integration & Usage' },
        { ids: ['35', '36', '37', '38'], label: 'Trust & Operations' },
      ],
});

const DEFAULT_FAQ = (lang: 'tr' | 'en') => lang === 'tr'
  ? [
      { id: '1', question: 'AdorelGO üyelik ücretli mi?', answer: 'Hayır. Üyelik tamamen ücretsizdir.' },
      { id: '2', question: 'Aylık veya yıllık ücret var mı?', answer: 'Hayır. Herhangi bir sabit ücret yoktur.' },
      { id: '3', question: 'Sadece gönderi yaptıkça mı ödeme yaparım?', answer: 'Evet. Sadece kullandığınız gönderi kadar ödeme yaparsınız.' },
      { id: '4', question: 'Gizli ücret veya ekstra kesinti var mı?', answer: 'Hayır. Tüm ücretler panelde şeffaf şekilde gösterilir.' },
      { id: '5', question: 'Fiyatlar neye göre belirlenir?', answer: 'Desi, ağırlık, ülke ve kargo firmasına göre belirlenir.' },
      { id: '6', question: 'Yurtdışına nasıl kargo gönderirim?', answer: 'AdorelGO paneline giriş yaparak ülke, ürün ve ağırlık bilgilerini girmeniz yeterlidir. Sistem size en uygun kargo seçeneklerini anında sunar.' },
      { id: '7', question: 'Gönderi oluşturmak ne kadar sürer?', answer: 'Ortalama 1–2 dakika içinde gönderinizi oluşturabilirsiniz.' },
      { id: '8', question: 'Kargo firması seçmem gerekiyor mu?', answer: 'Hayır. Sistem sizin için en uygun fiyat ve süreye sahip kargo firmasını otomatik önerir.' },
      { id: '9', question: 'Aynı anda birden fazla gönderi oluşturabilir miyim?', answer: 'Evet. Toplu gönderi özelliği ile yüzlerce gönderiyi tek seferde oluşturabilirsiniz.' },
      { id: '10', question: 'Kargo kapıdan alınıyor mu?', answer: 'Evet. Kargolarınız adresinizden alınır ve alıcının adresine teslim edilir.' },
      { id: '11', question: 'Şubeye gitmem gerekiyor mu?', answer: 'Hayır. Tüm süreç kapınızdan yönetilir.' },
      { id: '12', question: "Türkiye'nin her yerinden alım var mı?", answer: 'Evet. Türkiye genelinde kapıdan alım yapılabilir.' },
      { id: '13', question: 'Aynı gün alım yapılır mı?', answer: 'Yoğunluğa bağlı olarak aynı gün alım mümkündür.' },
      { id: '14', question: 'İlk kez gönderim yapıyorum, zor mu?', answer: 'Hayır. Sistem sizi adım adım yönlendirir ve tüm süreci kolaylaştırır.' },
      { id: '15', question: 'Deneyimim yok, yine de gönderebilir miyim?', answer: 'Evet. Hiç deneyiminiz olmasa bile birkaç dakika içinde gönderi oluşturabilirsiniz.' },
      { id: '16', question: 'Destek alabilir miyim?', answer: 'Evet. Müşteri hizmetleri ve canlı destek ile süreç boyunca destek alabilirsiniz.' },
      { id: '17', question: 'Hangi ülkelere gönderim yapabilirim?', answer: "200'den fazla ülkeye gönderim yapabilirsiniz." },
      { id: '18', question: 'Yurtdışı gönderimde hangi evraklar gerekir?', answer: 'Genellikle fatura, ürün açıklaması ve değer bilgisi gereklidir.' },
      { id: '19', question: 'Evrakları kendim mi hazırlamalıyım?', answer: 'Hayır. AdorelGO gerekli evrakları otomatik oluşturur.' },
      { id: '20', question: 'Gümrük işlemlerini kim yapar?', answer: 'Kargo firması ve gümrük sistemi tarafından yürütülür.' },
      { id: '21', question: 'GTİP bilgisi gerekli mi?', answer: 'Bazı ürünlerde gereklidir. Sistem bu konuda sizi yönlendirir.' },
      { id: '22', question: 'Büyük ve ağır ürün gönderimi yapabilir miyim?', answer: 'Evet. 30 desi üzeri büyük (XL) gönderiler yapılabilir.' },
      { id: '23', question: 'Paletli veya hacimli yük gönderebilir miyim?', answer: 'Evet. Lojistik taşımalar için özel çözümler sunulmaktadır.' },
      { id: '24', question: 'Mobilya, beyaz eşya gibi ürünler gönderilebilir mi?', answer: 'Evet. Büyük hacimli ürünler gönderilebilir.' },
      { id: '25', question: 'Alıcı ödemeli gönderi yapabilir miyim?', answer: 'Evet. Alıcı ödemeli kargo seçeneği mevcuttur.' },
      { id: '26', question: 'Yurtdışında alıcı ödeme var mı?', answer: 'Bazı ülke ve hizmetlerde mümkündür.' },
      { id: '27', question: 'Alıcı ödeme nasıl çalışır?', answer: 'Kargo ücreti teslim sırasında alıcı tarafından ödenir.' },
      { id: '28', question: 'Yurtdışı gönderiler iade olabilir mi?', answer: 'Evet. Alıcı teslim almazsa gönderi iade edilir.' },
      { id: '29', question: 'İade sürecini nasıl takip ederim?', answer: 'Panel üzerinden tüm süreçleri anlık takip edebilirsiniz.' },
      { id: '30', question: 'İade kargo ücreti kime aittir?', answer: 'Genellikle göndericiye aittir.' },
      { id: '31', question: 'İade edilen ürün tekrar gönderilebilir mi?', answer: 'Evet. Tekrar gönderim yapılabilir.' },
      { id: '32', question: 'E-ticaret sitem ile entegrasyon var mı?', answer: 'Evet. Shopify, WooCommerce, Ikas, Ticimax ve pazaryerleri ile entegrasyon vardır.' },
      { id: '33', question: 'Toplu gönderi oluşturabilir miyim?', answer: 'Evet. Excel veya toplu yükleme ile gönderi oluşturabilirsiniz.' },
      { id: '34', question: 'Raporlama yapabilir miyim?', answer: 'Evet. Gönderi ve tahsilat raporlarına ulaşabilirsiniz.' },
      { id: '35', question: 'Kargom kaybolursa ne olur?', answer: 'Kargo firması tarafından tazmin süreci başlatılır.' },
      { id: '36', question: 'Kargom hasar görürse ne olur?', answer: 'Hasar tutanağı ile tazmin işlemi yapılır.' },
      { id: '37', question: 'Gönderiler sigortalı mı?', answer: 'Evet. Kargo firmalarının sigorta kapsamındadır.' },
      { id: '38', question: 'Kargoyu takip edebilir miyim?', answer: 'Evet. Tüm gönderilerinizi anlık olarak takip edebilirsiniz.' },
    ]
  : [
      { id: '1', question: 'Is AdorelGO membership paid?', answer: 'No. Membership is completely free.' },
      { id: '2', question: 'Is there a monthly or annual fee?', answer: 'No. There are no fixed fees.' },
      { id: '3', question: 'Do I only pay when I ship?', answer: 'Yes. You only pay for the shipments you use.' },
      { id: '4', question: 'Are there hidden fees or extra charges?', answer: 'No. All fees are displayed transparently in the panel.' },
      { id: '5', question: 'How are prices determined?', answer: 'Based on volumetric weight, actual weight, country, and carrier.' },
      { id: '6', question: 'How do I ship internationally?', answer: 'Simply log in to the AdorelGO panel and enter the country, product, and weight details. The system instantly presents you with the best shipping options.' },
      { id: '7', question: 'How long does it take to create a shipment?', answer: 'You can create your shipment in an average of 1–2 minutes.' },
      { id: '8', question: 'Do I need to choose a carrier?', answer: 'No. The system automatically recommends the carrier with the best price and delivery time for you.' },
      { id: '9', question: 'Can I create multiple shipments at once?', answer: 'Yes. With the bulk shipment feature, you can create hundreds of shipments at once.' },
      { id: '10', question: 'Is cargo picked up from the door?', answer: "Yes. Your shipments are picked up from your address and delivered to the recipient's address." },
      { id: '11', question: 'Do I need to go to a branch?', answer: 'No. The entire process is managed from your door.' },
      { id: '12', question: 'Is pickup available from anywhere in Turkey?', answer: 'Yes. Door pickup is available throughout Turkey.' },
      { id: '13', question: 'Is same-day pickup possible?', answer: 'Same-day pickup is possible depending on availability.' },
      { id: '14', question: "I'm shipping for the first time, is it difficult?", answer: 'No. The system guides you step by step and simplifies the entire process.' },
      { id: '15', question: 'I have no experience, can I still ship?', answer: 'Yes. Even without any experience, you can create a shipment in just a few minutes.' },
      { id: '16', question: 'Can I get support?', answer: 'Yes. You can get support throughout the process via customer service and live chat.' },
      { id: '17', question: 'Which countries can I ship to?', answer: 'You can ship to over 200 countries.' },
      { id: '18', question: 'What documents are required for international shipping?', answer: 'Generally an invoice, product description, and value information are required.' },
      { id: '19', question: 'Do I need to prepare the documents myself?', answer: 'No. AdorelGO automatically generates the required documents.' },
      { id: '20', question: 'Who handles customs procedures?', answer: 'Handled by the carrier and customs system.' },
      { id: '21', question: 'Is HS code required?', answer: 'Required for some products. The system will guide you on this.' },
      { id: '22', question: 'Can I ship large and heavy items?', answer: 'Yes. Large (XL) shipments over 30 desi can be made.' },
      { id: '23', question: 'Can I ship palletized or bulky cargo?', answer: 'Yes. Special solutions are available for logistics transport.' },
      { id: '24', question: 'Can furniture or home appliances be shipped?', answer: 'Yes. Large volumetric items can be shipped.' },
      { id: '25', question: 'Can I send receiver-pays shipments?', answer: 'Yes. The receiver-pays shipping option is available.' },
      { id: '26', question: 'Is receiver payment available internationally?', answer: 'It is possible in some countries and services.' },
      { id: '27', question: 'How does receiver payment work?', answer: 'The shipping fee is paid by the recipient upon delivery.' },
      { id: '28', question: 'Can international shipments be returned?', answer: 'Yes. If the recipient does not accept delivery, the shipment is returned.' },
      { id: '29', question: 'How do I track the return process?', answer: 'You can track all processes in real time through the panel.' },
      { id: '30', question: 'Who pays for the return shipping?', answer: 'Generally the sender.' },
      { id: '31', question: 'Can a returned item be reshipped?', answer: 'Yes. Reshipping is possible.' },
      { id: '32', question: 'Is there integration with my e-commerce site?', answer: 'Yes. Integration is available with Shopify, WooCommerce, Ikas, Ticimax, and marketplaces.' },
      { id: '33', question: 'Can I create bulk shipments?', answer: 'Yes. You can create shipments via Excel or bulk upload.' },
      { id: '34', question: 'Can I generate reports?', answer: 'Yes. Shipment and collection reports are available.' },
      { id: '35', question: 'What if my shipment is lost?', answer: 'A compensation process is initiated by the carrier.' },
      { id: '36', question: 'What if my shipment is damaged?', answer: 'Compensation is processed with a damage report.' },
      { id: '37', question: 'Are shipments insured?', answer: "Yes. Covered by the carriers' insurance." },
      { id: '38', question: 'Can I track my shipment?', answer: 'Yes. You can track all your shipments in real time.' },
    ];

const FaqGroupEditor: React.FC<{ faq: any; faqHeader: any }> = ({ faq, faqHeader }) => {
  const [openGroup, setOpenGroup] = useState<number | null>(0);
  const allFaqs: any[] = faq.data || [];
  const groups: any[] = faqHeader.data?.groups || [];

  return (
    <Card title="SSS — Gruplar & Sorular">
      <div className="space-y-2">
        {groups.map((g: any, gi: number) => {
          const groupItems = allFaqs.filter((f: any) => g.ids.includes(f.id));
          const isOpen = openGroup === gi;

          return (
            <div key={gi} className={`rounded-xl overflow-hidden border transition-all ${isOpen ? 'border-blue-200' : 'border-gray-100'}`}>
              <button
                onClick={() => setOpenGroup(isOpen ? null : gi)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${isOpen ? 'bg-blue-600 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{g.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isOpen ? 'bg-white/20 text-white/80' : 'bg-white text-gray-400'}`}>{groupItems.length}</span>
                </div>
                <i className={`fas fa-chevron-down text-xs transition-transform ${isOpen ? 'rotate-180 text-white/60' : 'text-gray-400'}`}></i>
              </button>
              {isOpen && (
                <div className="p-3 space-y-3 bg-white">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <div className="flex-1">
                      <Label text="Grup Başlığı" />
                      <Input value={g.label} onChange={v => faqHeader.set(`groups.${gi}.label`, v)} />
                    </div>
                    <div className="pt-5">
                      <SaveBtn onSave={faqHeader.handleSave} saving={faqHeader.saving} success={faqHeader.success} error={faqHeader.error} />
                    </div>
                  </div>
                  {groupItems.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-2">Bu grupta soru yok</p>
                  )}
                  {groupItems.map((item: any) => {
                    const idx = allFaqs.findIndex((f: any) => f.id === item.id);
                    return (
                      <div key={item.id} className="border border-gray-100 rounded-lg p-3 bg-gray-50 space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="flex-1 space-y-2">
                            <div><Label text="Soru" /><Input value={item.question} onChange={v => faq.set(`${idx}.question`, v)} /></div>
                            <div><Label text="Cevap" /><Textarea value={item.answer} onChange={v => faq.set(`${idx}.answer`, v)} rows={2} /></div>
                          </div>
                          <RemoveBtn onClick={() => faq.set('', allFaqs.filter((_: any, j: number) => j !== idx))} />
                        </div>
                      </div>
                    );
                  })}
                  <AddBtn label="Soru Ekle" onClick={() => {
                    const newId = String(Date.now());
                    faq.set('', [...allFaqs, { id: newId, question: 'Yeni soru?', answer: 'Cevap...' }]);
                    faqHeader.set(`groups.${gi}.ids`, [...g.ids, newId]);
                  }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <SaveBtn onSave={faq.handleSave} saving={faq.saving} success={faq.success} error={faq.error} />
    </Card>
  );
};

const FaqEditorInner: React.FC<{ lang: 'tr' | 'en' }> = ({ lang }) => {
  const faqHeader = useEditor(() => contentAPI.getFaqHeader(lang), d => contentAPI.updateFaqHeader(d, lang), DEFAULT_FAQ_HEADER(lang));
  const faq = useEditor(() => contentAPI.getFaq(lang), d => contentAPI.updateFaq(d, lang), DEFAULT_FAQ(lang));

  if (faqHeader.loading || faq.loading) return <Loader />;

  return (
    <div className="space-y-6">
      <Card title="SSS — Başlık">
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Rozet" /><Input value={faqHeader.data?.badge} onChange={v => faqHeader.set('badge', v)} /></div>
          <div><Label text="Başlık" /><Input value={faqHeader.data?.title} onChange={v => faqHeader.set('title', v)} /></div>
        </div>
        <SaveBtn onSave={faqHeader.handleSave} saving={faqHeader.saving} success={faqHeader.success} error={faqHeader.error} />
      </Card>

      <FaqGroupEditor faq={faq} faqHeader={faqHeader} />

      <SeoCard
        slug="sikca-sorulan-sorular"
        lang={lang}
        defaultSeo={lang === 'tr'
          ? { metaTitle: 'Sıkça Sorulan Sorular | AdorelGo', metaDescription: 'AdorelGo hakkında en çok merak edilen sorular ve cevapları.', keywords: 'sık sorulan sorular, SSS, adorelgo yardım, kargo soru', canonical: 'https://adorelgo.com/sikca-sorulan-sorular' }
          : { metaTitle: 'Frequently Asked Questions | AdorelGo', metaDescription: 'Answers to the most frequently asked questions about AdorelGo.', keywords: 'faq, frequently asked questions, shipping help, adorelgo support', canonical: 'https://adorelgo.com/sikca-sorulan-sorular' }}
      />
    </div>
  );
};

const FaqEditor: React.FC = () => {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Seçili dil için içerik ve SEO yüklenip kaydedilir.</p>
        <LangToggle lang={lang} onChange={setLang} />
      </div>
      <FaqEditorInner key={lang} lang={lang} />
    </div>
  );
};

export default FaqEditor;
