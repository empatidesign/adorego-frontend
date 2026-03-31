import React from 'react';
import HomeEditor from './content/HomeEditor';
import { KVKK_DEFAULT_SECTIONS } from './content/defaults/kvkk';
import { YURTDISINDAN_TURKIYE_DEFAULT_SECTIONS } from './content/defaults/yurtdisindan-turkiye';
import { ALMANYAYA_KARGO_DEFAULT_SECTIONS } from './content/defaults/almanyaya-kargo';
import { AMERIKAYA_KARGO_DEFAULT_SECTIONS } from './content/defaults/amerikaya-kargo';
import { YURTDISI_KARGO_FIYATLARI_DEFAULT_SECTIONS } from './content/defaults/yurtdisi-kargo-fiyatlari';
import { YURTDISINA_KARGO_NASIL_GONDERILIR_DEFAULT_SECTIONS } from './content/defaults/yurtdisina-kargo-nasil-gonderilir';
import { EN_UCUZ_YURTDISI_KARGO_DEFAULT_SECTIONS } from './content/defaults/en-ucuz-yurtdisi-kargo';
import { YURTDISI_GONDERIM_REHBERI_DEFAULT_SECTIONS } from './content/defaults/yurtdisi-gonderim-rehberi';
import { SHOPIFY_ENTEGRASYONU_DEFAULT_SECTIONS } from './content/defaults/shopify-entegrasyonu';
import { WOOCOMMERCE_ENTEGRASYONU_DEFAULT_SECTIONS } from './content/defaults/woocommerce-entegrasyonu';
import { OZEL_SITE_API_DEFAULT_SECTIONS } from './content/defaults/ozel-site-api';
import InternationalEditor from './content/InternationalEditor';
import DoorToDoorEditor from './content/DoorToDoorEditor';
import FirstTimeAbroadEditor from './content/FirstTimeAbroadEditor';
import CustomsGuideEditor from './content/CustomsGuideEditor';
import ReturnShippingEditor from './content/ReturnShippingEditor';
import DomesticEditor from './content/DomesticEditor';
import PricingEditor from './content/PricingEditor';
import TrackingEditor from './content/TrackingEditor';
import HowToSendEditor from './content/HowToSendEditor';
import ContactEditor from './content/ContactEditor';
import AboutEditor from './content/AboutEditor';
import ContentPagesEditor from './content/ContentPagesEditor';
import NavbarEditor from './content/NavbarEditor';
import FooterEditor from './content/FooterEditor';
import GenericPageEditor from './content/GenericPageEditor';

// Özel editörleri olan sayfalar
const PAGE_EDITORS: Record<string, React.FC> = {
  home: HomeEditor,
  international: InternationalEditor,
  domestic: DomesticEditor,
  pricing: PricingEditor,
  tracking: TrackingEditor,
  howtosend: HowToSendEditor,
  contact: ContactEditor,
  about: AboutEditor,
  navbar: NavbarEditor,
  footer: FooterEditor,
  'content-pages': ContentPagesEditor,
  'kapidan-alim-kapiya-teslimat': DoorToDoorEditor,
  'ilk-kez-yurtdisina-gondermek': FirstTimeAbroadEditor,
  'gumruk-evrak-rehberi': CustomsGuideEditor,
  'yurtdisi-iade-geri-gonderi': ReturnShippingEditor,
};

// Generic editörle yönetilen sayfalar: { id: [slug, defaultTitle] }
const GENERIC_PAGES: Record<string, [string, string]> = {
  'kvkk': ['kvkk', 'KVKK'],
  'yurtdisindan-turkiye': ['yurtdisindan-turkiye', 'Yurtdışından Türkiye\'ye'],
  'sikca-sorulan-sorular': ['sikca-sorulan-sorular', 'Sıkça Sorulan Sorular'],
  'almanyaya-kargo': ['almanyaya-kargo', 'Almanya\'ya Kargo'],
  'amerikaya-kargo': ['amerikaya-kargo', 'Amerika\'ya Kargo'],
  'yurtdisi-kargo-fiyatlari': ['yurtdisi-kargo-fiyatlari', 'Yurtdışı Kargo Fiyatları'],
  'yurtdisina-kargo-nasil-gonderilir': ['yurtdisina-kargo-nasil-gonderilir', 'Yurtdışına Kargo Nasıl Gönderilir'],
  'alici-odemeli-kargo': ['alici-odemeli-kargo', 'Alıcı Ödemeli Kargo'],
  'en-ucuz-yurtdisi-kargo': ['en-ucuz-yurtdisi-kargo', 'En Ucuz Yurtdışı Kargo'],
  'yurtdisi-gonderim-rehberi': ['yurtdisi-gonderim-rehberi', 'Yurtdışı Gönderim Rehberi'],
  'shopify-entegrasyonu': ['shopify-entegrasyonu', 'Shopify Entegrasyonu'],
  'etsy-entegrasyonu': ['etsy-entegrasyonu', 'Etsy Entegrasyonu'],
  'amazon-entegrasyonu': ['amazon-entegrasyonu', 'Amazon Entegrasyonu'],
  'woocommerce-entegrasyonu': ['woocommerce-entegrasyonu', 'WooCommerce Entegrasyonu'],
  'ozel-site-api': ['ozel-site-api', 'Özel Site / API'],
};

const DEFAULT_SECTIONS_MAP: Record<string, any[]> = {
  'kvkk': KVKK_DEFAULT_SECTIONS,
  'yurtdisindan-turkiye': YURTDISINDAN_TURKIYE_DEFAULT_SECTIONS,
  'almanyaya-kargo': ALMANYAYA_KARGO_DEFAULT_SECTIONS,
  'amerikaya-kargo': AMERIKAYA_KARGO_DEFAULT_SECTIONS,
  'yurtdisi-kargo-fiyatlari': YURTDISI_KARGO_FIYATLARI_DEFAULT_SECTIONS,
  'yurtdisina-kargo-nasil-gonderilir': YURTDISINA_KARGO_NASIL_GONDERILIR_DEFAULT_SECTIONS,
  'en-ucuz-yurtdisi-kargo': EN_UCUZ_YURTDISI_KARGO_DEFAULT_SECTIONS,
  'yurtdisi-gonderim-rehberi': YURTDISI_GONDERIM_REHBERI_DEFAULT_SECTIONS,
  'shopify-entegrasyonu': SHOPIFY_ENTEGRASYONU_DEFAULT_SECTIONS,
  'woocommerce-entegrasyonu': WOOCOMMERCE_ENTEGRASYONU_DEFAULT_SECTIONS,
  'ozel-site-api': OZEL_SITE_API_DEFAULT_SECTIONS,
};

const DEFAULT_SEO_MAP: Record<string, { metaTitle: string; metaDescription: string; keywords: string; canonical: string }> = {
  'destek': {
    metaTitle: 'Destek | AdorelGo',
    metaDescription: 'AdorelGo müşteri destek sayfası. Sorularınız için bize ulaşın.',
    keywords: 'adorelgo destek, kargo yardım, müşteri hizmetleri',
    canonical: 'https://adorelgo.com/destek',
  },
  'gizlilik-politikasi': {
    metaTitle: 'Gizlilik Politikası | AdorelGo',
    metaDescription: 'AdorelGo gizlilik politikası. Kişisel verilerinizin nasıl işlendiğini öğrenin.',
    keywords: 'gizlilik politikası, kişisel veri, adorelgo',
    canonical: 'https://adorelgo.com/gizlilik-politikasi',
  },
  'kullanim-sartlari': {
    metaTitle: 'Kullanım Şartları | AdorelGo',
    metaDescription: 'AdorelGo kullanım şartları ve koşulları.',
    keywords: 'kullanım şartları, hizmet koşulları, adorelgo',
    canonical: 'https://adorelgo.com/kullanim-sartlari',
  },
  'kvkk-aydinlatma': {
    metaTitle: 'KVKK Aydınlatma Metni | AdorelGo',
    metaDescription: 'Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.',
    keywords: 'KVKK, kişisel verilerin korunması, aydınlatma metni',
    canonical: 'https://adorelgo.com/kvkk-aydinlatma',
  },
  'kvkk': {
    metaTitle: 'KVKK | AdorelGo',
    metaDescription: 'Kişisel Verilerin Korunması Kanunu kapsamında açık rıza ve aydınlatma metni.',
    keywords: 'KVKK, kişisel veri, adorelgo',
    canonical: 'https://adorelgo.com/kvkk',
  },
  'yurtdisindan-turkiye': {
    metaTitle: "Yurtdışından Türkiye'ye Kargo | AdorelGo",
    metaDescription: "Yurtdışından Türkiye'ye kargo gönderimi. Kapıdan alım, kapıya teslimat. Uygun fiyatlar.",
    keywords: "yurtdışından türkiye'ye kargo, uluslararası kargo, yurt dışından gönderim",
    canonical: 'https://adorelgo.com/yurtdisindan-turkiye',
  },
  'sikca-sorulan-sorular': {
    metaTitle: 'Sıkça Sorulan Sorular | AdorelGo',
    metaDescription: 'AdorelGo hakkında en çok merak edilen sorular ve cevapları.',
    keywords: 'sık sorulan sorular, SSS, adorelgo yardım, kargo soru',
    canonical: 'https://adorelgo.com/sikca-sorulan-sorular',
  },
  'almanyaya-kargo': {
    metaTitle: "Almanya'ya Kargo Gönderimi | AdorelGo",
    metaDescription: "Almanya'ya kargo nasıl gönderilir? Kapıdan alım, 2-7 gün teslimat, ekonomik ve express seçenekler. 2026 güncel fiyatlar.",
    keywords: "almanyaya kargo, almanya kargo fiyatı, türkiye almanya kargo, dhl almanya",
    canonical: 'https://adorelgo.com/almanyaya-kargo',
  },
  'amerikaya-kargo': {
    metaTitle: "Amerika'ya Kargo Gönderimi | AdorelGo",
    metaDescription: "Amerika'ya kargo kaç TL? Nasıl gönderilir? Ortalama 2-5 gün teslim, farklı kargo firmaları tek panelde.",
    keywords: "amerikaya kargo, abd kargo fiyatı, türkiye amerika kargo, fedex ups dhl",
    canonical: 'https://adorelgo.com/amerikaya-kargo',
  },
  'yurtdisi-kargo-fiyatlari': {
    metaTitle: 'Yurtdışı Kargo Fiyatları 2026 | AdorelGo',
    metaDescription: 'Yurtdışı kargo fiyatları 2026 güncel liste. En ucuz yurtdışı kargo seçeneklerini karşılaştırın.',
    keywords: 'yurtdışı kargo fiyatları, uluslararası kargo ücreti, en ucuz yurtdışı kargo',
    canonical: 'https://adorelgo.com/yurtdisi-kargo-fiyatlari',
  },
  'yurtdisina-kargo-nasil-gonderilir': {
    metaTitle: 'Yurtdışına Kargo Nasıl Gönderilir? | AdorelGo',
    metaDescription: 'Yurtdışına kargo göndermek için adım adım rehber. Üye ol, fiyat karşılaştır, kapıdan teslim et.',
    keywords: 'yurtdışına kargo nasıl gönderilir, uluslararası kargo gönderme, yurtdışı kargo rehberi',
    canonical: 'https://adorelgo.com/yurtdisina-kargo-nasil-gonderilir',
  },
  'alici-odemeli-kargo': {
    metaTitle: 'Alıcı Ödemeli Kargo | AdorelGo',
    metaDescription: 'Alıcı ödemeli kargo nedir? Nasıl gönderilir? AdorelGo ile kolayca yönetin.',
    keywords: 'alıcı ödemeli kargo, kapıda ödeme, kargo ücreti alıcıya',
    canonical: 'https://adorelgo.com/alici-odemeli-kargo',
  },
  'en-ucuz-yurtdisi-kargo': {
    metaTitle: 'En Ucuz Yurtdışı Kargo Firması Hangisi? (2026) | AdorelGo',
    metaDescription: 'DHL, FedEx, UPS karşılaştırması. En ucuz ve en hızlı yurtdışı kargo seçeneğini bulun.',
    keywords: 'en ucuz yurtdışı kargo, dhl fedex ups karşılaştırma, ucuz uluslararası kargo',
    canonical: 'https://adorelgo.com/en-ucuz-yurtdisi-kargo',
  },
  'yurtdisi-gonderim-rehberi': {
    metaTitle: 'Yurtdışı Gönderim Rehberi 2026 | AdorelGo',
    metaDescription: 'Yurtdışına kargo nasıl gönderilir? Adım adım rehber, gerekli belgeler ve ipuçları.',
    keywords: 'yurtdışı gönderim rehberi, uluslararası kargo rehberi, yurtdışına paket gönderme',
    canonical: 'https://adorelgo.com/yurtdisi-gonderim-rehberi',
  },
  'kapidan-alim-kapiya-teslimat': {
    metaTitle: 'Kapıdan Alım – Kapıya Teslim | AdorelGo',
    metaDescription: 'Kargonuzu kapınızdan alıyoruz, alıcının kapısına kadar teslim ediyoruz. Randevu alın, bekleyin.',
    keywords: 'kapıdan alım kapıya teslim, kargo kapıdan alım, kuryeli kargo gönderme',
    canonical: 'https://adorelgo.com/kapidan-alim-kapiya-teslimat',
  },
  'ilk-kez-yurtdisina-gondermek': {
    metaTitle: 'İlk Kez Yurtdışına Göndermek | AdorelGo',
    metaDescription: 'Daha önce hiç yurtdışına göndermediniz mi? Adım adım rehberimizle ilk gönderiminizi kolayca yapın.',
    keywords: 'ilk kez yurtdışına gönderme, yurtdışı kargo nasıl gönderilir, yeni başlayanlar için kargo',
    canonical: 'https://adorelgo.com/ilk-kez-yurtdisina-gondermek',
  },
  'gumruk-evrak-rehberi': {
    metaTitle: 'Gümrük & Evrak Rehberi | AdorelGo',
    metaDescription: 'Yurtdışı kargoda gümrük işlemleri ve gerekli evraklar. Sistem otomatik halleder, siz sadece gönderin.',
    keywords: 'gümrük evrak rehberi, yurtdışı gümrük işlemleri, kargo gümrük belgesi',
    canonical: 'https://adorelgo.com/gumruk-evrak-rehberi',
  },
  'yurtdisi-iade-geri-gonderi': {
    metaTitle: 'Yurtdışı İade & Geri Gönderim | AdorelGo',
    metaDescription: 'Teslim edilemeyen veya iade edilen yurtdışı kargolarınızı kolayca yönetin. Süreç takibi panelden.',
    keywords: 'yurtdışı iade kargo, geri gönderim, kargo iade süreci, teslim edilemeyen kargo',
    canonical: 'https://adorelgo.com/yurtdisi-iade-geri-gonderi',
  },
  'shopify-entegrasyonu': {
    metaTitle: 'Shopify Kargo Entegrasyonu | AdorelGo',
    metaDescription: "Shopify mağazanızı AdorelGo'ya bağlayın. Siparişlerinizi otomatik kargolayın.",
    keywords: 'shopify kargo entegrasyonu, shopify adorelgo, shopify otomatik kargo',
    canonical: 'https://adorelgo.com/shopify-entegrasyonu',
  },
  'etsy-entegrasyonu': {
    metaTitle: 'Etsy Kargo Entegrasyonu | AdorelGo',
    metaDescription: 'Etsy mağazanızdaki siparişleri AdorelGo ile otomatik yönetin.',
    keywords: 'etsy kargo entegrasyonu, etsy adorelgo, etsy otomatik kargo',
    canonical: 'https://adorelgo.com/etsy-entegrasyonu',
  },
  'amazon-entegrasyonu': {
    metaTitle: 'Amazon Kargo Entegrasyonu | AdorelGo',
    metaDescription: 'Amazon FBA ve FBM siparişlerinizi tek panelden yönetin.',
    keywords: 'amazon kargo entegrasyonu, amazon fba adorelgo, amazon otomatik kargo',
    canonical: 'https://adorelgo.com/amazon-entegrasyonu',
  },
  'woocommerce-entegrasyonu': {
    metaTitle: 'WooCommerce Kargo Entegrasyonu | AdorelGo',
    metaDescription: 'WordPress WooCommerce sitenizi AdorelGo ile entegre edin. Otomatik sipariş ve kargo yönetimi.',
    keywords: 'woocommerce kargo entegrasyonu, wordpress adorelgo, woocommerce otomatik kargo',
    canonical: 'https://adorelgo.com/woocommerce-entegrasyonu',
  },
  'ozel-site-api': {
    metaTitle: 'Özel Site API Entegrasyonu | AdorelGo',
    metaDescription: 'AdorelGo RESTful API ile kendi e-ticaret sitenizi entegre edin. Webhook desteği ve sandbox ortamı.',
    keywords: 'adorelgo api, kargo api entegrasyonu, restful api kargo, webhook kargo',
    canonical: 'https://adorelgo.com/ozel-site-api',
  },
};

const ContentTab: React.FC<{ selectedPage: string }> = ({ selectedPage }) => {
  const Editor = PAGE_EDITORS[selectedPage];
  if (Editor) return <Editor key={selectedPage} />;

  const generic = GENERIC_PAGES[selectedPage];
  if (generic) return (
    <GenericPageEditor
      key={selectedPage}
      slug={generic[0]}
      defaultTitle={generic[1]}
      defaultSections={DEFAULT_SECTIONS_MAP[selectedPage]}
      defaultSeo={DEFAULT_SEO_MAP[selectedPage]}
    />
  );

  return <p className="text-gray-400 text-sm py-8 text-center">Soldan bir sayfa seçin.</p>;
};

export default ContentTab;
