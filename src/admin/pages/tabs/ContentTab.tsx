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
import FaqEditor from './content/FaqEditor';
import ContentPagesEditor from './content/ContentPagesEditor';
import NavbarEditor from './content/NavbarEditor';
import FooterEditor from './content/FooterEditor';
import GenericPageEditor from './content/GenericPageEditor';

const getReceiverPaymentDefaults = (lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return {
      title: 'Receiver Payment Shipping',
      description: 'Let the receiver pay the shipping fee while you simply send the shipment.',
      sections: [
        { type: 'heading', content: 'What Is Receiver Payment Shipping? How Does It Work?' },
        { type: 'text', content: '<p>Receiver payment shipping means the shipping fee is paid by the recipient instead of the sender.</p>' },
        {
          type: 'card-grid',
          cards: [
            { icon: 'fa-wallet', title: 'Ship without paying upfront', description: 'You do not pay the shipping fee. The entire cost is paid by the receiver.' },
            { icon: 'fa-money-bill-wave', title: 'Cash collection at delivery', description: 'The receiver pays the shipping fee in cash when the shipment is delivered.' },
            { icon: 'fa-box', title: 'Sell first, leave shipping to the receiver', description: 'Complete your sale and reflect the shipping cost to the receiver.' },
          ],
        },
      ],
      seo: {
        metaTitle: 'What Is Receiver Payment Shipping? How Does It Work? | AdorelGo',
        metaDescription: 'What is receiver payment shipping and how does it work? Manage receiver-paid shipments easily with AdorelGo.',
        keywords: 'receiver payment shipping, receiver pays shipping fee, collect shipping fee on delivery',
        canonical: 'https://adorelgo.com/alici-odemeli-kargo',
      },
    };
  }

  return {
    title: 'Alıcı Ödemeli Kargo',
    description: 'Gönderi ücretini alıcı ödesin, siz sadece gönderin.',
    sections: [
      { type: 'heading', content: 'Alıcı Ödemeli Kargo Nedir? Nasıl Çalışır?' },
      { type: 'text', content: '<p>Alıcı ödemeli kargo, gönderi ücretinin gönderen tarafından değil, alıcı tarafından ödenmesi anlamına gelir.</p>' },
      {
        type: 'card-grid',
        cards: [
          { icon: 'fa-wallet', title: 'Cepten ödeme yapmadan gönderim', description: 'Kargo ücretini siz ödemezsiniz. Tüm masraf alıcıya aittir.' },
          { icon: 'fa-money-bill-wave', title: 'Kapıda nakit tahsilat', description: 'Alıcı, teslimat anında kargo ücretini nakit olarak öder.' },
          { icon: 'fa-box', title: 'Satışı yap, ödemeyi alıcıya bırak', description: 'Ürününüzü satın, kargo maliyetini alıcıya yansıtın.' },
        ],
      },
    ],
    seo: {
      metaTitle: 'Alıcı Ödemeli Kargo Nedir? Nasıl Çalışır? | AdorelGo',
      metaDescription: 'Alıcı ödemeli kargo nedir ve nasıl çalışır? AdorelGo ile alıcı ödemeli gönderileri kolayca yönetin.',
      keywords: 'alıcı ödemeli kargo, alıcı kargo ücretini öder, kapıda kargo ücreti tahsilatı',
      canonical: 'https://adorelgo.com/alici-odemeli-kargo',
    },
  };
};

const getFromAbroadToTurkeyDefaults = (lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return {
      title: 'Shipping from Abroad to Turkey',
      description: 'You can send shipments from your address abroad to an address in Turkey.',
      sections: [
        {
          type: 'card-grid',
          cards: [
            { icon: 'fa-globe', title: 'Send from Abroad to Turkey', description: 'Easily ship to Turkey from many locations around the world.' },
            { icon: 'fa-truck', title: 'Door Pickup - Door Delivery', description: "Your shipment is collected from your address and delivered to the recipient's door in Turkey." },
            { icon: 'fa-calculator', title: 'See the Price Upfront', description: 'Enter your shipment details and instantly view the estimated shipping cost.' },
          ],
        },
      ],
      seo: {
        metaTitle: 'Shipping from Abroad to Turkey | AdorelGo',
        metaDescription: 'Send cargo from abroad to Turkey with door pickup and door delivery. Compare shipping options with AdorelGo.',
        keywords: 'shipping from abroad to turkey, international shipping to turkey, send cargo to turkey',
        canonical: 'https://adorelgo.com/yurtdisindan-turkiye',
      },
    };
  }

  return {
    title: "Yurtdışından Türkiye'ye Kargo",
    description: "Yurtdışındaki adresinden, Türkiye'deki adrese kargo gönderebilirsin.",
    sections: [
      {
        type: 'card-grid',
        cards: [
          { icon: 'fa-globe', title: "Yurtdışından Türkiye'ye Gönder", description: "Dünyanın birçok noktasından Türkiye'ye kolayca kargo gönderebilirsin." },
          { icon: 'fa-truck', title: 'Kapıdan Alım – Kapıya Teslim', description: "Kargon bulunduğun adresten alınır ve Türkiye'deki alıcının kapısına kadar teslim edilir." },
          { icon: 'fa-calculator', title: 'Fiyatı Baştan Gör', description: 'Gönderi bilgilerini girdikten sonra tahmini kargo ücretini anında görürsün.' },
        ],
      },
    ],
    seo: {
      metaTitle: "Yurtdışından Türkiye'ye Kargo | AdorelGo",
      metaDescription: "Yurtdışından Türkiye'ye kargo gönderimi. Kapıdan alım, kapıya teslimat. Uygun fiyatlar.",
      keywords: "yurtdışından türkiye'ye kargo, uluslararası kargo, yurt dışından gönderim",
      canonical: 'https://adorelgo.com/yurtdisindan-turkiye',
    },
  };
};

const getGermanyShippingDefaults = (lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return {
      title: 'Shipping to Germany',
      description: 'Secure, fast, and affordable shipping from Turkey to Germany',
      sections: [
        {
          type: 'text',
          content: `<h2>How to Ship to Germany? <span style="color:#4DB848">(2026 Updated)</span></h2><p>Germany is one of the top destinations for shipments from Turkey. Whether you are sending a personal package or e-commerce orders, shipping to Germany is now much easier with AdorelGo.</p><p>All you need to do is sign up for free, enter your shipment details, and choose the best option shown to you. We take care of the rest.</p>`,
        },
        {
          type: 'list',
          items: [
            'Door pickup service: Your shipment is collected from your address and delivered to the recipient in Germany.',
            'Delivery in 2-7 days: Delivery times vary depending on the carrier and service type you choose.',
            'Economy and express options: Compare different shipping options based on your budget and urgency.',
          ],
        },
      ],
      seo: {
        metaTitle: 'Shipping to Germany | AdorelGo',
        metaDescription: 'How can you send cargo to Germany? Compare door pickup, 2-7 day delivery, economy and express options with AdorelGo.',
        keywords: 'shipping to germany, germany shipping prices, turkey to germany cargo, germany parcel delivery',
        canonical: 'https://adorelgo.com/almanyaya-kargo',
      },
    };
  }

  return {
    title: "Almanya'ya Kargo",
    description: "Türkiye'den Almanya'ya güvenli, hızlı ve uygun fiyatlı kargo gönderimi",
    sections: ALMANYAYA_KARGO_DEFAULT_SECTIONS,
    seo: {
      metaTitle: "Almanya'ya Kargo Gönderimi | AdorelGo",
      metaDescription: "Almanya'ya kargo nasıl gönderilir? Kapıdan alım, 2-7 gün teslimat, ekonomik ve express seçenekler. 2026 güncel fiyatlar.",
      keywords: "almanyaya kargo, almanya kargo fiyatı, türkiye almanya kargo, dhl almanya",
      canonical: 'https://adorelgo.com/almanyaya-kargo',
    },
  };
};

const getUsaShippingDefaults = (lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return {
      title: 'Shipping to the USA',
      description: 'Fast, secure, and affordable shipping from Turkey to the United States',
      sections: [
        {
          type: 'text',
          content: `<h2>How Much Does Shipping to the USA Cost? <span style="color:#4DB848">How Does It Work?</span></h2><p>Shipping prices to the USA vary based on weight, dimensions, and the selected service type. With AdorelGo, you can compare rates from multiple carriers on one screen and easily find the best option.</p><p>We work with global carriers like DHL, FedEx, and UPS to provide secure delivery across every state in the United States.</p>`,
        },
        {
          type: 'list',
          items: [
            'Average delivery in 2-5 days: Fast delivery to the USA with express options.',
            'Multiple carriers in one panel: Compare DHL, FedEx, UPS, and more in one place.',
            'Automatic price comparison: Enter your shipment details and let the system find the best rate instantly.',
          ],
        },
      ],
      seo: {
        metaTitle: 'Shipping to the USA | AdorelGo',
        metaDescription: 'How much does shipping to the USA cost? Compare average 2-5 day delivery and multiple carriers in one panel.',
        keywords: 'shipping to usa, usa cargo prices, turkey to usa shipping, dhl fedex ups usa',
        canonical: 'https://adorelgo.com/amerikaya-kargo',
      },
    };
  }

  return {
    title: "Amerika'ya Kargo",
    description: "Türkiye'den ABD'ye hızlı, güvenli ve uygun fiyatlı kargo gönderimi",
    sections: AMERIKAYA_KARGO_DEFAULT_SECTIONS,
    seo: {
      metaTitle: "Amerika'ya Kargo Gönderimi | AdorelGo",
      metaDescription: "Amerika'ya kargo kaç TL? Nasıl gönderilir? Ortalama 2-5 gün teslim, farklı kargo firmaları tek panelde.",
      keywords: "amerikaya kargo, abd kargo fiyatı, türkiye amerika kargo, fedex ups dhl",
      canonical: 'https://adorelgo.com/amerikaya-kargo',
    },
  };
};

const getIntlShippingPricesDefaults = (lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return {
      title: 'International Shipping Prices',
      description: 'Compare updated international shipping prices for 2026',
      sections: [
        {
          type: 'text',
          content: `<h2>International Shipping Prices 2026 <span style="color:#4DB848">(Updated List)</span></h2><p>International shipping prices vary depending on the destination country, the package weight, and the selected delivery time.</p>`,
        },
        {
          type: 'card-grid',
          cards: [
            { icon: 'fa-coins', title: 'Best Price', description: 'Find the shipping option that best fits your budget.' },
            { icon: 'fa-bolt', title: 'Fastest', description: 'Express shipping options for your urgent shipments.' },
            { icon: 'fa-shield-alt', title: 'Most Reliable', description: 'Reliable delivery, easier tracking, and fewer issues.' },
          ],
        },
      ],
      seo: {
        metaTitle: 'International Shipping Prices 2026 | AdorelGo',
        metaDescription: 'Updated 2026 international shipping price list.',
        keywords: 'international shipping prices, shipping cost calculator, cheapest international shipping',
        canonical: 'https://adorelgo.com/yurtdisi-kargo-fiyatlari',
      },
    };
  }

  return {
    title: 'Yurtdışı Kargo Fiyatları',
    description: '2026 güncel yurtdışı kargo fiyatlarını karşılaştırın',
    sections: YURTDISI_KARGO_FIYATLARI_DEFAULT_SECTIONS,
    seo: {
      metaTitle: 'Yurtdışı Kargo Fiyatları 2026 | AdorelGo',
      metaDescription: 'Yurtdışı kargo fiyatları 2026 güncel liste. En ucuz yurtdışı kargo seçeneklerini karşılaştırın.',
      keywords: 'yurtdışı kargo fiyatları, uluslararası kargo ücreti, en ucuz yurtdışı kargo',
      canonical: 'https://adorelgo.com/yurtdisi-kargo-fiyatlari',
    },
  };
};

const getCheapestIntlShippingDefaults = (lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return {
      title: 'Which Is the Cheapest International Shipping Company?',
      description: 'Detailed comparison guide for DHL, FedEx, and UPS',
      sections: [
        {
          type: 'text',
          content: `<h2>Speed Comparison</h2>`,
        },
        {
          type: 'card-grid',
          cards: [
            { icon: 'fa-shipping-fast', title: 'DHL - 2-3 days', description: 'The fastest delivery with express service.' },
            { icon: 'fa-shipping-fast', title: 'FedEx - 2-4 days', description: 'Reliable international delivery with priority service.' },
            { icon: 'fa-shipping-fast', title: 'UPS - 2-4 days', description: 'Affordable fast delivery with the Express Saver option.' },
          ],
        },
      ],
      seo: {
        metaTitle: 'Which Is the Cheapest International Shipping Company? (2026) | AdorelGo',
        metaDescription: 'Compare DHL, FedEx, and UPS for international shipping.',
        keywords: 'cheapest international shipping, dhl fedex ups comparison, affordable worldwide shipping',
        canonical: 'https://adorelgo.com/en-ucuz-yurtdisi-kargo',
      },
    };
  }

  return {
    title: 'En Ucuz Yurtdışı Kargo Firması Hangisi?',
    description: 'DHL, FedEx, UPS detaylı karşılaştırma rehberi',
    sections: EN_UCUZ_YURTDISI_KARGO_DEFAULT_SECTIONS,
    seo: {
      metaTitle: 'En Ucuz Yurtdışı Kargo Firması Hangisi? (2026) | AdorelGo',
      metaDescription: 'DHL, FedEx, UPS karşılaştırması. En ucuz ve en hızlı yurtdışı kargo seçeneğini bulun.',
      keywords: 'en ucuz yurtdışı kargo, dhl fedex ups karşılaştırma, ucuz uluslararası kargo',
      canonical: 'https://adorelgo.com/en-ucuz-yurtdisi-kargo',
    },
  };
};

const getHowToShipAbroadDefaults = (lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return {
      title: 'How to Send Cargo Abroad?',
      description: 'A step-by-step guide for international shipping',
      sections: [
        {
          type: 'card-grid',
          cards: [
            { icon: 'fa-user-plus', title: '01 - Sign up for free', description: 'Create your AdorelGo account for free.' },
            { icon: 'fa-edit', title: '02 - Enter shipment details', description: 'Enter the recipient address, package weight, and dimensions.' },
            { icon: 'fa-balance-scale', title: '03 - Choose the best option', description: 'The system compares prices from all carriers for you.' },
            { icon: 'fa-truck', title: '04 - Hand it over with door pickup', description: 'The carrier collects the package from your address and delivers it to the recipient.' },
          ],
        },
      ],
      seo: {
        metaTitle: 'How to Send Cargo Abroad? | AdorelGo',
        metaDescription: 'A step-by-step guide to sending cargo abroad.',
        keywords: 'how to send cargo abroad, international shipping guide, send package internationally',
        canonical: 'https://adorelgo.com/yurtdisina-kargo-nasil-gonderilir',
      },
    };
  }

  return {
    title: 'Yurtdışına Kargo Nasıl Gönderilir?',
    description: 'Adım adım yurtdışı kargo gönderim rehberi',
    sections: YURTDISINA_KARGO_NASIL_GONDERILIR_DEFAULT_SECTIONS,
    seo: {
      metaTitle: 'Yurtdışına Kargo Nasıl Gönderilir? | AdorelGo',
      metaDescription: 'Yurtdışına kargo göndermek için adım adım rehber. Üye ol, fiyat karşılaştır, kapıdan teslim et.',
      keywords: 'yurtdışına kargo nasıl gönderilir, uluslararası kargo gönderme, yurtdışı kargo rehberi',
      canonical: 'https://adorelgo.com/yurtdisina-kargo-nasil-gonderilir',
    },
  };
};

const getIntlShippingGuideDefaults = (lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return {
      title: 'International Shipping Guide',
      description: 'How to Send Cargo Abroad? (2026 Updated Guide)',
      sections: [
        {
          type: 'text',
          content: `<h2>How to Send Cargo Abroad?</h2>`,
        },
        {
          type: 'card-grid',
          cards: [
            { icon: 'fa-user-plus', title: 'Step 1: Sign Up for Free', description: 'Create your AdorelGo account for free.' },
            { icon: 'fa-edit', title: 'Step 2: Enter Shipment Details', description: 'Enter the recipient address, package dimensions, and weight.' },
            { icon: 'fa-balance-scale', title: 'Step 3: Choose the Carrier', description: 'Select the best option for your price and delivery needs.' },
            { icon: 'fa-truck', title: 'Step 4: Send Your Shipment', description: 'Start your shipment with door pickup.' },
          ],
        },
      ],
      seo: {
        metaTitle: 'International Shipping Guide 2026 | AdorelGo',
        metaDescription: 'A practical guide for sending cargo abroad with AdorelGo.',
        keywords: 'international shipping guide, how to ship abroad, send cargo internationally',
        canonical: 'https://adorelgo.com/yurtdisi-gonderim-rehberi',
      },
    };
  }

  return {
    title: 'Yurtdışı Gönderim Rehberi',
    description: 'Yurtdışı Kargo Nasıl Gönderilir? (2026 Güncel Rehber)',
    sections: YURTDISI_GONDERIM_REHBERI_DEFAULT_SECTIONS,
    seo: {
      metaTitle: 'Yurtdışı Gönderim Rehberi 2026 | AdorelGo',
      metaDescription: 'Yurtdışına kargo nasıl gönderilir? Adım adım rehber, gerekli belgeler ve ipuçları.',
      keywords: 'yurtdışı gönderim rehberi, uluslararası kargo rehberi, yurtdışına paket gönderme',
      canonical: 'https://adorelgo.com/yurtdisi-gonderim-rehberi',
    },
  };
};

const getShopifyIntegrationDefaults = (lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return {
      title: 'Shopify Integration',
      description: 'Connect your Shopify store to AdorelGo and move your orders into the shipping workflow automatically.',
      sections: [
        {
          type: 'card-grid',
          cards: [
            { icon: 'fa-sync-alt', title: 'Automatic Order Sync', description: 'Orders from your Shopify store are automatically transferred to the AdorelGo panel.' },
            { icon: 'fa-mouse-pointer', title: 'One-Click Shipment Creation', description: 'Send your orders to shipping with a single click.' },
            { icon: 'fa-truck', title: 'Automatic Tracking Updates', description: 'Tracking numbers are automatically sent back to your Shopify store.' },
          ],
        },
      ],
      seo: {
        metaTitle: 'Shopify Shipping Integration | AdorelGo',
        metaDescription: 'Connect your Shopify store to AdorelGo and automate your shipping workflow.',
        keywords: 'shopify shipping integration, shopify order sync, ecommerce shipping automation',
        canonical: 'https://adorelgo.com/shopify-entegrasyonu',
      },
    };
  }

  return {
    title: 'Shopify Entegrasyonu',
    description: "Shopify mağazanızı AdorelGo'ya bağlayarak siparişlerinizi otomatik olarak kargo sürecine aktarın.",
    sections: SHOPIFY_ENTEGRASYONU_DEFAULT_SECTIONS,
    seo: {
      metaTitle: 'Shopify Kargo Entegrasyonu | AdorelGo',
      metaDescription: "Shopify mağazanızı AdorelGo'ya bağlayın. Siparişlerinizi otomatik kargolayın.",
      keywords: 'shopify kargo entegrasyonu, shopify adorelgo, shopify otomatik kargo',
      canonical: 'https://adorelgo.com/shopify-entegrasyonu',
    },
  };
};

const getEtsyIntegrationDefaults = (lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return {
      title: 'Etsy Integration',
      description: 'Manage your Etsy store orders automatically with AdorelGo.',
      sections: [
        {
          type: 'card-grid',
          cards: [
            { icon: 'fa-sync-alt', title: 'Automatic Order Sync', description: 'Orders from your Etsy store are automatically transferred to the AdorelGo panel.' },
            { icon: 'fa-mouse-pointer', title: 'One-Click Shipment Creation', description: 'Send your orders to shipping with a single click.' },
            { icon: 'fa-truck', title: 'Automatic Tracking Updates', description: 'Tracking numbers are automatically sent back to your Etsy store.' },
          ],
        },
      ],
      seo: {
        metaTitle: 'Etsy Shipping Integration | AdorelGo',
        metaDescription: 'Manage your Etsy store orders automatically with AdorelGo.',
        keywords: 'etsy shipping integration, etsy order sync, etsy shipping automation',
        canonical: 'https://adorelgo.com/etsy-entegrasyonu',
      },
    };
  }

  return {
    title: 'Etsy Entegrasyonu',
    description: 'Etsy mağazanızdaki siparişleri AdorelGo ile otomatik yönetin.',
    sections: [
      {
        type: 'card-grid',
        cards: [
          { icon: 'fa-sync-alt', title: 'Otomatik Sipariş Senkronizasyonu', description: 'Etsy mağazanızdaki siparişler otomatik olarak AdorelGo paneline aktarılır.' },
          { icon: 'fa-mouse-pointer', title: 'Tek Tıkla Gönderi Oluşturma', description: 'Siparişlerinizi tek bir tıklamayla kargoya verin.' },
          { icon: 'fa-truck', title: 'Takip Numarası Otomatik Güncelleme', description: 'Kargo takip numaraları otomatik olarak Etsy mağazanıza iletilir.' },
        ],
      },
    ],
    seo: {
      metaTitle: 'Etsy Kargo Entegrasyonu | AdorelGo',
      metaDescription: 'Etsy mağazanızdaki siparişleri AdorelGo ile otomatik yönetin.',
      keywords: 'etsy kargo entegrasyonu, etsy adorelgo, etsy otomatik kargo',
      canonical: 'https://adorelgo.com/etsy-entegrasyonu',
    },
  };
};

const getAmazonIntegrationDefaults = (lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return {
      title: 'Amazon Integration',
      description: 'Connect your Amazon store and manage your FBA and FBM orders from a single panel.',
      sections: [
        {
          type: 'card-grid',
          cards: [
            { icon: 'fa-sync-alt', title: 'Automatic Order Sync', description: 'Amazon FBA and FBM orders are automatically transferred to the AdorelGo panel.' },
            { icon: 'fa-mouse-pointer', title: 'One-Click Shipment Creation', description: 'Send your orders to shipping with a single click.' },
            { icon: 'fa-truck', title: 'Automatic Tracking Updates', description: 'Tracking numbers are automatically sent back to your Amazon store.' },
          ],
        },
      ],
      seo: {
        metaTitle: 'Amazon Shipping Integration | AdorelGo',
        metaDescription: 'Manage your Amazon FBA and FBM orders from a single panel.',
        keywords: 'amazon shipping integration, amazon fba fbm sync, amazon shipping automation',
        canonical: 'https://adorelgo.com/amazon-entegrasyonu',
      },
    };
  }

  return {
    title: 'Amazon Entegrasyonu',
    description: 'Amazon mağazanızı entegre edin, FBA ve FBM siparişlerinizi tek panelden yönetin.',
    sections: [
      {
        type: 'card-grid',
        cards: [
          { icon: 'fa-sync-alt', title: 'Otomatik Sipariş Senkronizasyonu', description: 'Amazon FBA ve FBM siparişler otomatik olarak AdorelGo paneline aktarılır.' },
          { icon: 'fa-mouse-pointer', title: 'Tek Tıkla Gönderi Oluşturma', description: 'Siparişlerinizi tek bir tıklamayla kargoya verin.' },
          { icon: 'fa-truck', title: 'Takip Numarası Otomatik Güncelleme', description: 'Kargo takip numaraları otomatik olarak Amazon mağazanıza iletilir.' },
        ],
      },
    ],
    seo: {
      metaTitle: 'Amazon Kargo Entegrasyonu | AdorelGo',
      metaDescription: 'Amazon FBA ve FBM siparişlerinizi tek panelden yönetin.',
      keywords: 'amazon kargo entegrasyonu, amazon fba adorelgo, amazon otomatik kargo',
      canonical: 'https://adorelgo.com/amazon-entegrasyonu',
    },
  };
};

const getWooCommerceIntegrationDefaults = (lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return {
      title: 'WooCommerce Integration',
      description: 'Integrate your WordPress site with AdorelGo and ship your WooCommerce orders automatically.',
      sections: [
        {
          type: 'card-grid',
          cards: [
            { icon: 'fa-sync-alt', title: 'Automatic Order Sync', description: 'Orders from your WooCommerce store are automatically transferred to the AdorelGo panel.' },
            { icon: 'fa-mouse-pointer', title: 'One-Click Shipment Creation', description: 'Send your orders to shipping with a single click.' },
            { icon: 'fa-truck', title: 'Automatic Tracking Updates', description: 'Tracking numbers are automatically sent back to your WooCommerce site.' },
          ],
        },
      ],
      seo: {
        metaTitle: 'WooCommerce Shipping Integration | AdorelGo',
        metaDescription: 'Integrate your WordPress WooCommerce site with AdorelGo for automatic order and shipping management.',
        keywords: 'woocommerce shipping integration, wordpress shipping sync, woocommerce order automation',
        canonical: 'https://adorelgo.com/woocommerce-entegrasyonu',
      },
    };
  }

  return {
    title: 'WooCommerce Entegrasyonu',
    description: 'WordPress sitenizi AdorelGo ile entegre edin, WooCommerce siparişlerinizi otomatik kargolayın.',
    sections: WOOCOMMERCE_ENTEGRASYONU_DEFAULT_SECTIONS,
    seo: {
      metaTitle: 'WooCommerce Kargo Entegrasyonu | AdorelGo',
      metaDescription: 'WordPress WooCommerce sitenizi AdorelGo ile entegre edin. Otomatik sipariş ve kargo yönetimi.',
      keywords: 'woocommerce kargo entegrasyonu, wordpress adorelgo, woocommerce otomatik kargo',
      canonical: 'https://adorelgo.com/woocommerce-entegrasyonu',
    },
  };
};

const getCustomApiIntegrationDefaults = (lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return {
      title: 'Custom Website Integration (API)',
      description: 'Integrate your own e-commerce website with the AdorelGo API.',
      sections: [
        {
          type: 'card-grid',
          cards: [
            { icon: 'fa-code', title: 'RESTful API', description: 'Integrate your site easily with a modern and well-documented RESTful API.' },
            { icon: 'fa-bell', title: 'Webhook Support', description: 'Receive automatic notifications when order statuses change.' },
            { icon: 'fa-flask', title: 'Sandbox Test Environment', description: 'Test your integration in a sandbox environment before going live.' },
          ],
        },
      ],
      seo: {
        metaTitle: 'Custom Website API Integration | AdorelGo',
        metaDescription: 'Integrate your own e-commerce website with the AdorelGo RESTful API. Webhook support and sandbox environment included.',
        keywords: 'shipping api integration, custom ecommerce api, webhook shipping api',
        canonical: 'https://adorelgo.com/ozel-site-api',
      },
    };
  }

  return {
    title: 'Özel Site Entegrasyonu (API)',
    description: 'Kendi e-ticaret sitenizi AdorelGo API ile entegre edin.',
    sections: OZEL_SITE_API_DEFAULT_SECTIONS,
    seo: {
      metaTitle: 'Özel Site API Entegrasyonu | AdorelGo',
      metaDescription: 'AdorelGo RESTful API ile kendi e-ticaret sitenizi entegre edin. Webhook desteği ve sandbox ortamı.',
      keywords: 'adorelgo api, kargo api entegrasyonu, restful api kargo, webhook kargo',
      canonical: 'https://adorelgo.com/ozel-site-api',
    },
  };
};

const getKvkkDefaults = (lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return {
      title: 'Personal Data Protection Notice',
      description: 'Information notice within the scope of the Personal Data Protection Law',
      sections: [
        {
          type: 'text',
          content: `<p>This text has been prepared to obtain the explicit consent of users of ADOREL LOJISTIK KARGO TELEKOMUNIKASYON BILISIM YAZILIM IC VE DIS TICARET A.S. and "app.adorelgo.com" regarding the processing of personal data in compliance with applicable personal data protection legislation.</p>`,
        },
        { type: 'heading', content: '1. PROTECTION OF PERSONAL DATA' },
        { type: 'heading', content: '1.1 Data Controller' },
        { type: 'text', content: `<p>In accordance with the Personal Data Protection Law No. 6698, your personal data may be processed by ADOREL LOJISTIK KARGO TELEKOMUNIKASYON BILISIM YAZILIM IC VE DIS TICARET A.S. as the data controller within the scope described below.</p>` },
        { type: 'heading', content: '1.2 Purpose of Processing Personal Data' },
        { type: 'text', content: `<p>Your personal data is processed for the purposes of providing our services, carrying out contractual processes, managing customer relations, executing logistics and cargo operations, fulfilling legal obligations, carrying out invoicing and payment transactions, and performing communication activities.</p>` },
        { type: 'heading', content: '1.3 Processed Personal Data' },
        { type: 'text', content: `<p>Name, surname, national identity number, address, phone number, e-mail address, tax number, bank account information, shipment information, IP address, cookie data, and usage data on the platform may be processed.</p>` },
        { type: 'heading', content: '1.4 Method and Legal Basis for Collecting Personal Data' },
        { type: 'text', content: `<p>Your personal data is collected through our website, mobile application, call center, e-mail, and physical forms. Such data is processed based on the legal grounds of contract performance, legal obligation, legitimate interest, and explicit consent as set forth in the relevant legislation.</p>` },
        { type: 'heading', content: '1.5 Transfer of Personal Data' },
        { type: 'text', content: `<p>Your personal data may be transferred to our cargo and logistics business partners, public institutions and organizations when legally required, payment service providers, legal advisors, and audit firms in accordance with the applicable legal provisions.</p>` },
        { type: 'heading', content: '1.6 Retention Period of Personal Data' },
        { type: 'text', content: `<p>Your personal data is retained for the period required by the purposes of processing and within legal retention periods. After the retention period expires, personal data is deleted, destroyed, or anonymized.</p>` },
        { type: 'heading', content: '1.7 Data Security' },
        { type: 'text', content: `<p>Our company takes the necessary technical and administrative measures to ensure an appropriate level of security in order to prevent the unlawful processing of and access to personal data and to ensure the preservation of such data.</p>` },
        { type: 'heading', content: '1.8 Rights of the Data Subject' },
        { type: 'text', content: `<p>Under the relevant legal provisions, you have the right to learn whether your personal data is processed, request information if it has been processed, learn the purpose of processing and whether it is used in accordance with that purpose, know the third parties to whom your personal data is transferred domestically or abroad, request correction if it has been processed incompletely or inaccurately, and request deletion or destruction within the legal framework.</p>` },
        { type: 'heading', content: '1.9 Application Method' },
        { type: 'text', content: `<p>To exercise the rights stated above, you may submit your request to our company in writing together with the information necessary to identify your identity or through other methods determined by the competent authority.</p>` },
        { type: 'heading', content: '2. CONFIDENTIALITY AND NON-DISCLOSURE OBLIGATION' },
        { type: 'heading', content: '2.1 Confidentiality Commitment' },
        { type: 'text', content: `<p>Our company undertakes to keep all personal and commercial information belonging to its users confidential. Such information is not shared with third parties without the explicit consent of the user.</p>` },
        { type: 'heading', content: '2.9 Contact' },
        { type: 'text', content: `<p>You may contact us using the information below for your requests and questions regarding personal data protection.</p><br/><p><strong>ADOREL LOJISTIK KARGO TELEKOMUNIKASYON BILISIM YAZILIM IC VE DIS TICARET A.S.</strong><br/>Bahcelievler Mah. 232. Sok. No: 6 Golbasi / Ankara - Turkey<br/>Phone: 0312 320 26 26<br/>E-mail: info@adorelgo.com</p>` },
      ],
      seo: {
        metaTitle: 'Personal Data Protection Notice | AdorelGo',
        metaDescription: 'Information notice and consent text within the scope of personal data protection.',
        keywords: 'personal data protection notice, privacy policy, data protection',
        canonical: 'https://adorelgo.com/kvkk',
      },
    };
  }

  return {
    title: 'KVKK',
    description: 'Kişisel Verilerin Korunması Kanunu kapsamında açık rıza ve aydınlatma metni.',
    sections: KVKK_DEFAULT_SECTIONS,
    seo: {
      metaTitle: 'KVKK | AdorelGo',
      metaDescription: 'Kişisel Verilerin Korunması Kanunu kapsamında açık rıza ve aydınlatma metni.',
      keywords: 'KVKK, kişisel veri, adorelgo',
      canonical: 'https://adorelgo.com/kvkk',
    },
  };
};

// Özel editörleri olan sayfalar
const PAGE_EDITORS: Record<string, React.FC> = {
  home: HomeEditor,
  international: InternationalEditor,
  domestic: DomesticEditor,
  pricing: PricingEditor,
  tracking: TrackingEditor,
  howtosend: HowToSendEditor,
  'sikca-sorulan-sorular': FaqEditor,
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
      defaultTitle={
        selectedPage === 'kvkk' ? (lang => getKvkkDefaults(lang).title) :
        selectedPage === 'alici-odemeli-kargo' ? (lang => getReceiverPaymentDefaults(lang).title) :
        selectedPage === 'yurtdisindan-turkiye' ? (lang => getFromAbroadToTurkeyDefaults(lang).title) :
        selectedPage === 'almanyaya-kargo' ? (lang => getGermanyShippingDefaults(lang).title) :
        selectedPage === 'amerikaya-kargo' ? (lang => getUsaShippingDefaults(lang).title) :
        selectedPage === 'yurtdisi-kargo-fiyatlari' ? (lang => getIntlShippingPricesDefaults(lang).title) :
        selectedPage === 'yurtdisina-kargo-nasil-gonderilir' ? (lang => getHowToShipAbroadDefaults(lang).title) :
        selectedPage === 'yurtdisi-gonderim-rehberi' ? (lang => getIntlShippingGuideDefaults(lang).title) :
        selectedPage === 'shopify-entegrasyonu' ? (lang => getShopifyIntegrationDefaults(lang).title) :
        selectedPage === 'etsy-entegrasyonu' ? (lang => getEtsyIntegrationDefaults(lang).title) :
        selectedPage === 'amazon-entegrasyonu' ? (lang => getAmazonIntegrationDefaults(lang).title) :
        selectedPage === 'woocommerce-entegrasyonu' ? (lang => getWooCommerceIntegrationDefaults(lang).title) :
        selectedPage === 'ozel-site-api' ? (lang => getCustomApiIntegrationDefaults(lang).title) :
        selectedPage === 'en-ucuz-yurtdisi-kargo' ? (lang => getCheapestIntlShippingDefaults(lang).title) :
        generic[1]
      }
      defaultDescription={
        selectedPage === 'kvkk' ? (lang => getKvkkDefaults(lang).description) :
        selectedPage === 'alici-odemeli-kargo' ? (lang => getReceiverPaymentDefaults(lang).description) :
        selectedPage === 'yurtdisindan-turkiye' ? (lang => getFromAbroadToTurkeyDefaults(lang).description) :
        selectedPage === 'almanyaya-kargo' ? (lang => getGermanyShippingDefaults(lang).description) :
        selectedPage === 'amerikaya-kargo' ? (lang => getUsaShippingDefaults(lang).description) :
        selectedPage === 'yurtdisi-kargo-fiyatlari' ? (lang => getIntlShippingPricesDefaults(lang).description) :
        selectedPage === 'yurtdisina-kargo-nasil-gonderilir' ? (lang => getHowToShipAbroadDefaults(lang).description) :
        selectedPage === 'yurtdisi-gonderim-rehberi' ? (lang => getIntlShippingGuideDefaults(lang).description) :
        selectedPage === 'shopify-entegrasyonu' ? (lang => getShopifyIntegrationDefaults(lang).description) :
        selectedPage === 'etsy-entegrasyonu' ? (lang => getEtsyIntegrationDefaults(lang).description) :
        selectedPage === 'amazon-entegrasyonu' ? (lang => getAmazonIntegrationDefaults(lang).description) :
        selectedPage === 'woocommerce-entegrasyonu' ? (lang => getWooCommerceIntegrationDefaults(lang).description) :
        selectedPage === 'ozel-site-api' ? (lang => getCustomApiIntegrationDefaults(lang).description) :
        selectedPage === 'en-ucuz-yurtdisi-kargo' ? (lang => getCheapestIntlShippingDefaults(lang).description) :
        undefined
      }
      defaultSections={
        selectedPage === 'kvkk' ? (lang => getKvkkDefaults(lang).sections) :
        selectedPage === 'alici-odemeli-kargo' ? (lang => getReceiverPaymentDefaults(lang).sections) :
        selectedPage === 'yurtdisindan-turkiye' ? (lang => getFromAbroadToTurkeyDefaults(lang).sections) :
        selectedPage === 'almanyaya-kargo' ? (lang => getGermanyShippingDefaults(lang).sections) :
        selectedPage === 'amerikaya-kargo' ? (lang => getUsaShippingDefaults(lang).sections) :
        selectedPage === 'yurtdisi-kargo-fiyatlari' ? (lang => getIntlShippingPricesDefaults(lang).sections) :
        selectedPage === 'yurtdisina-kargo-nasil-gonderilir' ? (lang => getHowToShipAbroadDefaults(lang).sections) :
        selectedPage === 'yurtdisi-gonderim-rehberi' ? (lang => getIntlShippingGuideDefaults(lang).sections) :
        selectedPage === 'shopify-entegrasyonu' ? (lang => getShopifyIntegrationDefaults(lang).sections) :
        selectedPage === 'etsy-entegrasyonu' ? (lang => getEtsyIntegrationDefaults(lang).sections) :
        selectedPage === 'amazon-entegrasyonu' ? (lang => getAmazonIntegrationDefaults(lang).sections) :
        selectedPage === 'woocommerce-entegrasyonu' ? (lang => getWooCommerceIntegrationDefaults(lang).sections) :
        selectedPage === 'ozel-site-api' ? (lang => getCustomApiIntegrationDefaults(lang).sections) :
        selectedPage === 'en-ucuz-yurtdisi-kargo' ? (lang => getCheapestIntlShippingDefaults(lang).sections) :
        DEFAULT_SECTIONS_MAP[selectedPage]
      }
      defaultSeo={
        selectedPage === 'kvkk' ? (lang => getKvkkDefaults(lang).seo) :
        selectedPage === 'alici-odemeli-kargo' ? (lang => getReceiverPaymentDefaults(lang).seo) :
        selectedPage === 'yurtdisindan-turkiye' ? (lang => getFromAbroadToTurkeyDefaults(lang).seo) :
        selectedPage === 'almanyaya-kargo' ? (lang => getGermanyShippingDefaults(lang).seo) :
        selectedPage === 'amerikaya-kargo' ? (lang => getUsaShippingDefaults(lang).seo) :
        selectedPage === 'yurtdisi-kargo-fiyatlari' ? (lang => getIntlShippingPricesDefaults(lang).seo) :
        selectedPage === 'yurtdisina-kargo-nasil-gonderilir' ? (lang => getHowToShipAbroadDefaults(lang).seo) :
        selectedPage === 'yurtdisi-gonderim-rehberi' ? (lang => getIntlShippingGuideDefaults(lang).seo) :
        selectedPage === 'shopify-entegrasyonu' ? (lang => getShopifyIntegrationDefaults(lang).seo) :
        selectedPage === 'etsy-entegrasyonu' ? (lang => getEtsyIntegrationDefaults(lang).seo) :
        selectedPage === 'amazon-entegrasyonu' ? (lang => getAmazonIntegrationDefaults(lang).seo) :
        selectedPage === 'woocommerce-entegrasyonu' ? (lang => getWooCommerceIntegrationDefaults(lang).seo) :
        selectedPage === 'ozel-site-api' ? (lang => getCustomApiIntegrationDefaults(lang).seo) :
        selectedPage === 'en-ucuz-yurtdisi-kargo' ? (lang => getCheapestIntlShippingDefaults(lang).seo) :
        DEFAULT_SEO_MAP[selectedPage]
      }
    />
  );

  return <p className="text-gray-400 text-sm py-8 text-center">Soldan bir sayfa seçin.</p>;
};

export default ContentTab;
