import React from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, SeoCard } from './shared';

const DEFAULT_CONTACT = {
  pageTitle: 'İletişim',
  breadcrumb: 'İletişim',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.2266489!2d28.9784!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjUiTiAyOMKwNTgnNDIuMiJF!5e0!3m2!1str!2str!4v1234567890',
  sendMessageTitle: 'Bize mesaj gönderin',
  sendMessageDesc: 'Aşağıdaki formu doldurarak bizimle hızlıca iletişime geçebilirsiniz. Uzman ekibimiz en kısa sürede size geri dönüş yapacaktır.',
  formNameLabel: 'Adınız soyadınız',
  formEmailLabel: 'E-posta adresiniz',
  formSubjectLabel: 'Konu',
  formMessageLabel: 'Mesajınız',
  formButton: 'Gönder',
  contactInfoTitle: 'İletişim bilgileri',
  addressLabel: 'Adres',
  addressValue: 'İstanbul, Türkiye',
  phoneLabel: 'Telefon',
  phoneValue: '+90 (212) 123 45 67',
  emailLabel: 'E-posta',
  emailValue: 'info@adorelgo.com',
  workingHoursLabel: 'Çalışma saatleri',
  workingHoursValue: 'Pazartesi - Cuma: 09:00 - 18:00',
  quickSupportTitle: 'Hızlı destek hattı',
  quickSupportDesc: 'Her türlü sorunuz için WhatsApp üzerinden bize anında ulaşabilirsiniz.',
  whatsappNumber: '+905551234567',
};

const ContactEditor: React.FC = () => {
  const contact = useEditor(
    () => contentAPI.getContact(),
    d => contentAPI.updateContact(d),
    DEFAULT_CONTACT
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
        <p className="text-xs text-gray-400">Google Maps'te konumu bul → Paylaş → Haritayı göm → iframe src URL'sini buraya yapıştır</p>
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
          <div><Label text="Adres Etiketi" /><Input value={contact.data?.addressLabel} onChange={v => contact.set('addressLabel', v)} /></div>
          <div><Label text="Adres Değeri" /><Input value={contact.data?.addressValue} onChange={v => contact.set('addressValue', v)} /></div>
          <div><Label text="Telefon Etiketi" /><Input value={contact.data?.phoneLabel} onChange={v => contact.set('phoneLabel', v)} /></div>
          <div><Label text="Telefon Numarası" /><Input value={contact.data?.phoneValue} onChange={v => contact.set('phoneValue', v)} /></div>
          <div><Label text="E-posta Etiketi" /><Input value={contact.data?.emailLabel} onChange={v => contact.set('emailLabel', v)} /></div>
          <div><Label text="E-posta Adresi" /><Input value={contact.data?.emailValue} onChange={v => contact.set('emailValue', v)} /></div>
          <div><Label text="Çalışma Saati Etiketi" /><Input value={contact.data?.workingHoursLabel} onChange={v => contact.set('workingHoursLabel', v)} /></div>
          <div><Label text="Çalışma Saati Değeri" /><Input value={contact.data?.workingHoursValue} onChange={v => contact.set('workingHoursValue', v)} /></div>
        </div>
        <SaveBtn onSave={contact.handleSave} saving={contact.saving} success={contact.success} error={contact.error} />
      </Card>

      {/* WhatsApp */}
      <Card title="WhatsApp Destek Kartı (Yeşil Kart)">
        <div><Label text="Başlık" /><Input value={contact.data?.quickSupportTitle} onChange={v => contact.set('quickSupportTitle', v)} /></div>
        <div><Label text="Açıklama" /><Textarea value={contact.data?.quickSupportDesc} onChange={v => contact.set('quickSupportDesc', v)} rows={2} /></div>
        <div><Label text="WhatsApp Numarası" /><Input value={contact.data?.whatsappNumber} onChange={v => contact.set('whatsappNumber', v)} placeholder="+905551234567" /></div>
        <SaveBtn onSave={contact.handleSave} saving={contact.saving} success={contact.success} error={contact.error} />
      </Card>


      <SeoCard slug="iletisim" defaultSeo={{ metaTitle: "İletişim | AdorelGo", metaDescription: "AdorelGo ile iletişime geçin. Telefon, e-posta ve WhatsApp destek hattı.", keywords: "adorelgo iletişim, kargo destek, müşteri hizmetleri", canonical: "https://adorelgo.com/iletisim" }} />

    </div>
  );
};

export default ContactEditor;
