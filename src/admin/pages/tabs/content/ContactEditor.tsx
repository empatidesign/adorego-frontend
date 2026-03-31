import React, { useState } from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, SeoCard } from './shared';

const DEFAULT_CONTACT_MAP_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.294717533184!2d32.82214850442983!3d39.76911265077443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d345e33d97fc47%3A0xd4b2a2f7ce3c8e2b!2sAdorel!5e1!3m2!1sen!2str!4v1774722441289!5m2!1sen!2str';

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

const getDefaultContact = (lang: 'tr' | 'en') => (
  lang === 'tr'
    ? {
        pageTitle: 'İletişim',
        breadcrumb: 'İletişim',
        mapUrl: DEFAULT_CONTACT_MAP_URL,
        sendMessageTitle: 'Bize mesaj gönderin',
        sendMessageDesc: 'Aşağıdaki formu doldurarak bizimle hızlıca iletişime geçebilirsiniz. Uzman ekibimiz en kısa sürede size geri dönüş yapacaktır.',
        formNameLabel: 'Adınız soyadınız',
        formEmailLabel: 'E-posta adresiniz',
        formSubjectLabel: 'Konu',
        formMessageLabel: 'Mesajınız',
        formButton: 'Gönder',
        contactInfoTitle: 'İletişim bilgileri',
        companyName: 'AdorelGo Global Operasyon Merkezi',
        companyFullName: 'ADOREL LOJISTIK KARGO TELEKOMUNIKASYON BILISIM YAZILIM IC VE DIS TICARET A.Ş',
        addressLabel: 'Adres',
        addressValue: 'Bahçelievler Mah 232.Sok No 6 Gölbaşı -Ankara-Türkiye',
        phoneLabel: 'Telefon',
        phoneValue: '+90 312 3202626 – 533 13 13',
        emailLabel: 'E-posta',
        emailValue: 'info@adorelgo.com',
        websiteLabel: 'Web',
        websiteValue: 'www.adorelgo.com',
        workingHoursLabel: 'Çalışma saatleri',
        workingHoursValue: 'Pazartesi - Cuma: 09:00 - 18:00',
        quickSupportTitle: 'Hızlı destek hattı',
        quickSupportDesc: 'Her türlü sorunuz için WhatsApp üzerinden bize anında ulaşabilirsiniz.',
        whatsappNumber: '05521691097',
      }
    : {
        pageTitle: 'Contact',
        breadcrumb: 'Contact',
        mapUrl: DEFAULT_CONTACT_MAP_URL,
        sendMessageTitle: 'Send us a message',
        sendMessageDesc: 'Fill out the form below to contact us quickly. Our team will get back to you as soon as possible.',
        formNameLabel: 'Your full name',
        formEmailLabel: 'Your email address',
        formSubjectLabel: 'Subject',
        formMessageLabel: 'Your message',
        formButton: 'Send',
        contactInfoTitle: 'Contact information',
        companyName: 'AdorelGo Global Operasyon Merkezi',
        companyFullName: 'ADOREL LOJISTIK KARGO TELEKOMUNIKASYON BILISIM YAZILIM IC VE DIS TICARET A.Ş',
        addressLabel: 'Address',
        addressValue: 'Bahçelievler Mah 232.Sok No 6 Gölbaşı -Ankara-Türkiye',
        phoneLabel: 'Phone',
        phoneValue: '+90 312 3202626 – 533 13 13',
        emailLabel: 'Email',
        emailValue: 'info@adorelgo.com',
        websiteLabel: 'Web',
        websiteValue: 'www.adorelgo.com',
        workingHoursLabel: 'Working hours',
        workingHoursValue: 'Monday - Friday: 09:00 - 18:00',
        quickSupportTitle: 'Quick support line',
        quickSupportDesc: 'You can instantly reach us via WhatsApp for any questions.',
        whatsappNumber: '05521691097',
      }
);

const ContactEditorInner: React.FC<{ lang: 'tr' | 'en' }> = ({ lang }) => {
  const contact = useEditor(
    () => contentAPI.getContact(lang),
    d => contentAPI.updateContact(d, lang),
    getDefaultContact(lang)
  );

  if (contact.loading) return <Loader />;

  return (
    <div className="space-y-6">

      {/* Hero */}
      <Card title="Sayfa Başlığı (Hero)">
        <div><Label text="Sayfa Başlığı" /><Input value={contact.data?.pageTitle} onChange={v => contact.set('pageTitle', v)} /></div>
        <div><Label text="Breadcrumb Metni" /><Input value={contact.data?.breadcrumb} onChange={v => contact.set('breadcrumb', v)} /></div>
        <SaveBtn onSave={contact.handleSave} saving={contact.saving} success={contact.success} error={contact.error} />
      </Card>

      {/* Harita */}
      <Card title="Harita">
        <div><Label text="Google Maps Embed URL" /><Input value={contact.data?.mapUrl} onChange={v => contact.set('mapUrl', v)} /></div>
        <p className="text-xs text-gray-400">İstersen iframe kodunun tamamını, istersen sadece `src` URL'sini yapıştırabilirsin.</p>
        <SaveBtn onSave={contact.handleSave} saving={contact.saving} success={contact.success} error={contact.error} />
      </Card>

      {/* Form Metinleri */}
      <Card title="İletişim Formu Metinleri">
        <div><Label text="Form Başlığı" /><Input value={contact.data?.sendMessageTitle} onChange={v => contact.set('sendMessageTitle', v)} /></div>
        <div><Label text="Form Açıklaması" /><Textarea value={contact.data?.sendMessageDesc} onChange={v => contact.set('sendMessageDesc', v)} rows={2} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Ad Soyad Alanı Etiketi" /><Input value={contact.data?.formNameLabel} onChange={v => contact.set('formNameLabel', v)} /></div>
          <div><Label text="E-posta Alanı Etiketi" /><Input value={contact.data?.formEmailLabel} onChange={v => contact.set('formEmailLabel', v)} /></div>
          <div><Label text="Konu Alanı Etiketi" /><Input value={contact.data?.formSubjectLabel} onChange={v => contact.set('formSubjectLabel', v)} /></div>
          <div><Label text="Mesaj Alanı Etiketi" /><Input value={contact.data?.formMessageLabel} onChange={v => contact.set('formMessageLabel', v)} /></div>
        </div>
        <div className="w-40"><Label text="Gönder Butonu Metni" /><Input value={contact.data?.formButton} onChange={v => contact.set('formButton', v)} /></div>
        <SaveBtn onSave={contact.handleSave} saving={contact.saving} success={contact.success} error={contact.error} />
      </Card>

      {/* İletişim Bilgileri */}
      <Card title="İletişim Bilgileri (Sağ Kart)">
        <div><Label text="Kart Başlığı" /><Input value={contact.data?.contactInfoTitle} onChange={v => contact.set('contactInfoTitle', v)} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Firma Kısa Adı" /><Input value={contact.data?.companyName ?? ''} onChange={v => contact.set('companyName', v)} /></div>
          <div><Label text="Firma Tam Ünvanı" /><Input value={contact.data?.companyFullName ?? ''} onChange={v => contact.set('companyFullName', v)} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Adres Etiketi" /><Input value={contact.data?.addressLabel} onChange={v => contact.set('addressLabel', v)} /></div>
          <div><Label text="Adres Değeri" /><Input value={contact.data?.addressValue} onChange={v => contact.set('addressValue', v)} /></div>
          <div><Label text="Telefon Etiketi" /><Input value={contact.data?.phoneLabel} onChange={v => contact.set('phoneLabel', v)} /></div>
          <div><Label text="Telefon Numarası" /><Input value={contact.data?.phoneValue} onChange={v => contact.set('phoneValue', v)} /></div>
          <div><Label text="E-posta Etiketi" /><Input value={contact.data?.emailLabel} onChange={v => contact.set('emailLabel', v)} /></div>
          <div><Label text="E-posta Adresi" /><Input value={contact.data?.emailValue} onChange={v => contact.set('emailValue', v)} /></div>
          <div><Label text="Web Etiketi" /><Input value={contact.data?.websiteLabel ?? ''} onChange={v => contact.set('websiteLabel', v)} /></div>
          <div><Label text="Web Adresi" /><Input value={contact.data?.websiteValue ?? ''} onChange={v => contact.set('websiteValue', v)} /></div>
          <div><Label text="Çalışma Saati Etiketi" /><Input value={contact.data?.workingHoursLabel} onChange={v => contact.set('workingHoursLabel', v)} /></div>
          <div><Label text="Çalışma Saati Değeri" /><Input value={contact.data?.workingHoursValue} onChange={v => contact.set('workingHoursValue', v)} /></div>
        </div>
        <SaveBtn onSave={contact.handleSave} saving={contact.saving} success={contact.success} error={contact.error} />
      </Card>

      {/* WhatsApp */}
      <Card title="WhatsApp Destek Kartı (Yeşil Kart)">
        <div><Label text="Başlık" /><Input value={contact.data?.quickSupportTitle} onChange={v => contact.set('quickSupportTitle', v)} /></div>
        <div><Label text="Açıklama" /><Textarea value={contact.data?.quickSupportDesc} onChange={v => contact.set('quickSupportDesc', v)} rows={2} /></div>
        <div><Label text="WhatsApp Numarası" /><Input value={contact.data?.whatsappNumber} onChange={v => contact.set('whatsappNumber', v)} placeholder="05521691097" /></div>
        <SaveBtn onSave={contact.handleSave} saving={contact.saving} success={contact.success} error={contact.error} />
      </Card>

      <SeoCard
        slug="iletisim"
        lang={lang}
        defaultSeo={lang === 'tr'
          ? { metaTitle: "İletişim | AdorelGo", metaDescription: "AdorelGo ile iletişime geçin. Telefon, e-posta ve WhatsApp destek hattı.", keywords: "adorelgo iletişim, kargo destek, müşteri hizmetleri", canonical: "https://adorelgo.com/iletisim" }
          : { metaTitle: "Contact | AdorelGo", metaDescription: "Get in touch with AdorelGo. Phone, email and WhatsApp support line.", keywords: "adorelgo contact, shipping support, customer service", canonical: "https://adorelgo.com/iletisim" }}
      />

    </div>
  );
};

const ContactEditor: React.FC = () => {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Seçili dil için içerik ve SEO yüklenip kaydedilir.</p>
        <LangToggle lang={lang} onChange={setLang} />
      </div>
      <ContactEditorInner key={lang} lang={lang} />
    </div>
  );
};

export default ContactEditor;
