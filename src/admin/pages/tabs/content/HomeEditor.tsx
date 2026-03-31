import React, { useState } from 'react';
import { contentAPI } from '../../../services/api';
import { useEditor, Loader, Card, SaveBtn, Label, Input, Textarea, AddBtn, RemoveBtn, ImageUpload, SeoCard } from './shared';

const LangToggle: React.FC<{ lang: string; onChange: (l: string) => void }> = ({ lang, onChange }) => (
  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1 w-fit">
    {['tr', 'en'].map(l => (
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

const DEFAULT_HERO = (lang: string) => ({
  title: lang === 'tr' ? "Kazanç\nYurtdışında.\nEn Uygun Kargo Bizde." : "Profit\nAbroad.\nBest Shipping Rates Here.",
  subtitle: lang === 'tr'
    ? "Yurtdışına kargo gönderimi yapan e-ticaret siteleri için kapıdan alım, mikro ihracat ve hızlı teslimat çözümleri AdorelGo'da."
    : "Door-to-door pickup, micro export, and fast delivery solutions for e-commerce sites shipping internationally with AdorelGo.",
  image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
  buttons: [{ text: lang === 'tr' ? "Ücretsiz Üye Ol" : "Free Sign Up", icon: "fa-user-plus", style: "success" }],
  badges: [
    { text: lang === 'tr' ? "BAŞVURU GEREKMEZ" : "NO APPLICATION REQUIRED", icon: "fa-check", color: "blue" },
    { text: lang === 'tr' ? "SABİT FİYAT GARANTİSİ" : "FIXED PRICE GUARANTEE", icon: "fa-check", color: "green" }
  ],
  stats: [
    { value: "220+", label: lang === 'tr' ? "GLOBAL ÜLKE AĞI" : "GLOBAL NETWORK", icon: "fa-globe-africa" },
    { value: lang === 'tr' ? "35 Yıl" : "35 Years", label: lang === 'tr' ? "SEKTÖREL TECRÜBE" : "INDUSTRY EXPERIENCE", icon: "fa-award" }
  ]
});

const DEFAULT_HOWITWORKS = (lang: string) => ({
  badge: lang === 'tr' ? 'SÜREÇ' : 'PROCESS',
  title: lang === 'tr' ? 'Yurtdışına' : 'How to',
  titleHighlight: lang === 'tr' ? 'Nasıl Gönderirim?' : 'Send Internationally?',
  steps: [
    { id: 1, order: 0, color: "bg-blue-500", iconType: "signup", title: lang === 'tr' ? "Ücretsiz Üye Ol" : "Sign Up for Free", description: lang === 'tr' ? "adorelgo.com'a ücretsiz üye ol, hemen gönderim yapmaya başla." : "Sign up for free at adorelgo.com and start shipping right away.", buttonText: '', buttonLink: '' },
    { id: 2, order: 1, color: "bg-[#4DB848]", iconType: "upload", title: lang === 'tr' ? "Belgelerini Yükle" : "Upload Your Documents", description: lang === 'tr' ? "Gönderim için gerekli belgelerini sisteme yükle. Hızlı ve güvenli." : "Upload the required documents for shipping. Fast and secure.", buttonText: '', buttonLink: '' },
    { id: 3, order: 2, color: "bg-blue-500", iconType: "create", title: lang === 'tr' ? "Gönderini Oluştur" : "Create Your Shipment", description: lang === 'tr' ? "Paket bilgilerini gir, alıcı adresini ekle ve gönderini oluştur." : "Enter package details, add recipient address and create your shipment.", buttonText: '', buttonLink: '' },
    { id: 4, order: 3, color: "bg-[#4DB848]", iconType: "pickup", title: lang === 'tr' ? "Kapından Alalım" : "We Pick Up from Your Door", description: lang === 'tr' ? "Gönderin adresinden alınır, alıcının kapısına teslim edilir. Tüm süreç tek panelden takip edilir." : "Your shipment is picked up from your address and delivered to the recipient's door.", buttonText: '', buttonLink: '' }
  ],
  buttons: [
    { id: 1, text: lang === 'tr' ? 'Nasıl Gönderirim?' : 'How to Send?', link: '/nasil-gonderirim', style: 'secondary', icon: 'fa-arrow-right', order: 0 },
    { id: 2, text: lang === 'tr' ? 'Ücretsiz Üye Ol' : 'Sign Up Free', link: 'https://app.adorelgo.com', style: 'primary', icon: '', order: 1, external: true }
  ]
});

const DEFAULT_FEATURES_HEADER = (lang: string) => ({
  title: lang === 'tr' ? 'Sistem en doğrusunu seçer.' : 'The system picks the best.',
  subtitle: lang === 'tr'
    ? 'Gönderiniz için en uygun kargo firmasını, en hızlı rotayı ve en güvenli seçeneği sistem otomatik belirler.'
    : 'The system automatically determines the most affordable carrier, fastest route, and safest option for your shipment.',
  miniCards: [
    { icon: "fa-coins", color: "bg-blue-500", title: lang === 'tr' ? "En Uygun" : "Most Affordable", description: lang === 'tr' ? "En düşük maliyetle gönder" : "Ship at the lowest cost" },
    { icon: "fa-bolt", color: "bg-green-500", title: lang === 'tr' ? "En Hızlı" : "Fastest", description: lang === 'tr' ? "En kısa sürede teslim et" : "Deliver in the shortest time" },
    { icon: "fa-shield-halved", color: "bg-purple-500", title: lang === 'tr' ? "En Sorunsuz" : "Most Reliable", description: lang === 'tr' ? "Risk almadan gönder" : "Ship without risk" }
  ]
});

const DEFAULT_CTA = (lang: string) => ({
  bottomText: lang === 'tr' ? 'Kargo firması seçmezsin sonuç seçersin.' : "You don't choose a carrier, you choose results.",
  title: lang === 'tr' ? 'Yurtdışına Açılmanın En Kolay Yolu.' : 'The Easiest Way to Go International.',
  subtitle: lang === 'tr' ? 'Hemen kayıt olun, ilk gönderinizde AdorelGo farkını yaşayın.' : 'Sign up now and experience the AdorelGo difference with your first shipment.',
  buttonText: lang === 'tr' ? 'ÜCRETSİZ KAYIT' : 'FREE SIGN UP',
  buttonLink: '#'
});

const DEFAULT_SOLUTIONS = (lang: string) => ({
  title: lang === 'tr' ? 'Tüm Kargolarını' : 'Manage All Your',
  highlightedTitle: lang === 'tr' ? 'Tek Yerden Yönet' : 'Shipments in One Place',
  buttonText: lang === 'tr' ? 'HEMEN BAŞLA' : 'GET STARTED',
  buttonLink: '#kayit',
  cardTitle: lang === 'tr' ? 'Hangi Gönderim Bana Uygun?' : 'Which Shipping is Right for Me?',
  cardDescription: lang === 'tr'
    ? 'Kararsızsan sorun değil. Sistem, gönderinin aciliyet ve önceliğine göre en uygun gönderimi seçer.'
    : "No problem if you're undecided. The system selects the most suitable shipping based on urgency and priority.",
  subDescription: lang === 'tr' ? 'Yurtiçi, yurtdışı ve tahsilatlı tüm gönderimler tek panelde' : 'All domestic, international and cash-on-delivery shipments in one panel',
  ctaButtonText: lang === 'tr' ? 'Gönderi Oluştur' : 'Create Shipment',
  ctaButtonLink: '/gonderi-olustur',
  services: [
    { id: '1', order: 0, icon: 'fa-globe', color: 'bg-blue-500', bgColor: 'bg-blue-50', title: lang === 'tr' ? 'Yurtdışı Kargo' : 'International Shipping', desc: lang === 'tr' ? 'Dünyanın her yerine gönder' : 'Ship anywhere in the world' },
    { id: '2', order: 1, icon: 'fa-flag', color: 'bg-red-500', bgColor: 'bg-red-50', title: lang === 'tr' ? 'Yurtiçi Kargo' : 'Domestic Shipping', desc: lang === 'tr' ? 'En uygun fiyatla gönder' : 'Ship at the best price' },
    { id: '3', order: 2, icon: 'fa-hand-holding-dollar', color: 'bg-green-500', bgColor: 'bg-green-50', title: lang === 'tr' ? 'Alıcı Ödemeli Lojistik Gönderiler' : 'Receiver Payment Logistics', desc: lang === 'tr' ? 'Kargo ücretini alıcıya ödet' : 'Let the receiver pay the shipping fee' },
    { id: '4', order: 3, icon: 'fa-plane-arrival', color: 'bg-orange-500', bgColor: 'bg-orange-50', title: lang === 'tr' ? 'Yurtdışından Türkiye' : 'From Abroad to Turkey', desc: lang === 'tr' ? 'Kapıdan alım, Türkiye\'de teslim' : 'Door pickup, delivery in Turkey' }
  ],
  shippingOptions: [
    { id: '1', order: 0, icon: 'fa-coins', color: 'bg-green-500', title: lang === 'tr' ? 'Ekonomik Kargo' : 'Economy Shipping', subtitle: lang === 'tr' ? 'Fiyat Öncelikliyse' : 'If Price is Priority', description: lang === 'tr' ? 'Maliyetinizi düşürün. Zaman esnekliğiniz varsa en uygun fiyatlarla standart teslimat süresi ile gönderin.' : 'Reduce your costs. Ship with the most affordable prices and standard delivery time.', features: lang === 'tr' ? ['En uygun fiyat', '5-7 iş günü teslimat', 'Güvenli taşıma'] : ['Best price', '5-7 business days delivery', 'Safe transport'] },
    { id: '2', order: 1, icon: 'fa-bolt', color: 'bg-yellow-500', title: lang === 'tr' ? 'Express Kargo' : 'Express Shipping', subtitle: lang === 'tr' ? 'Hız Öncelikliyse' : 'If Speed is Priority', description: lang === 'tr' ? 'Acil gönderimleriniz için hızlı teslimat. 2-3 iş günü içinde adrese teslim garantisi.' : 'Fast delivery for your urgent shipments. Guaranteed address delivery within 2-3 business days.', features: lang === 'tr' ? ['Hızlı teslimat', '2-3 iş günü', 'Öncelikli işlem'] : ['Fast delivery', '2-3 business days', 'Priority processing'] },
    { id: '3', order: 2, icon: 'fa-store', color: 'bg-blue-500', title: lang === 'tr' ? 'Mikro İhracat' : 'Micro Export', subtitle: lang === 'tr' ? 'Satış Amaçlıysa' : 'If For Sales Purpose', description: lang === 'tr' ? 'E-ticaret satışlarınız için özel çözüm. Gümrük işlemleri dahil, ticari gönderi avantajları.' : 'Special solution for your e-commerce sales. Customs procedures included, commercial shipment advantages.', features: lang === 'tr' ? ['Gümrük kolaylığı', 'Ticari fatura', 'Düşük vergi oranı'] : ['Customs facilitation', 'Commercial invoice', 'Low tax rate'] }
  ]
});

const DEFAULT_TARGET_AUDIENCE = (lang: string) => ({
  statsTitle: lang === 'tr' ? 'Binlerce satıcı' : 'Thousands of sellers',
  statsHighlight: lang === 'tr' ? 'AdorelGo ile gönderiyor' : 'ship with AdorelGo',
  stats: [
    { value: '50.000+', label: lang === 'tr' ? 'gönderi / ay' : 'shipments / month' },
    { value: '220+', label: lang === 'tr' ? 'ülkeye gönderim' : 'countries served' },
    { value: '%80', label: lang === 'tr' ? 'aktif kullanım' : 'active usage' }
  ],
  earnSection: {
    badge: lang === 'tr' ? 'GÖNDERDİKÇE KAZAN' : 'EARN AS YOU SHIP',
    title: lang === 'tr' ? 'Yurtdışı Gönder' : 'Ship Abroad',
    highlightedTitle: lang === 'tr' ? 'Yurtiçi Ucuzlasın.' : 'Domestic Gets Cheaper.',
    description: lang === 'tr'
      ? 'Yurtdışı gönderi yaptığınızda sistem sizi aktif kullanıcı olarak tanır ve yurtiçi kargo fiyatlarınız otomatik olarak avantajlı hale gelir.'
      : 'When you make international shipments, the system recognizes you as an active user and your domestic cargo prices automatically become advantageous.',
    benefits: [
      { number: '01', text: lang === 'tr' ? 'Yurtdışı gönderi yap → sistem seni tanır' : 'Ship internationally → system recognizes you' },
      { number: '02', text: lang === 'tr' ? 'Yurtiçi fiyatların otomatik düşer' : 'Your domestic prices drop automatically' },
      { number: '03', text: lang === 'tr' ? 'Gönderdikçe avantajın artar' : 'Your advantage grows as you ship more' }
    ],
    bottomText: lang === 'tr' ? 'Başvuru yok. Pazarlık yok. Sistem kendisi uygular.' : 'No application. No negotiation. The system applies it automatically.',
    buttons: [
      { text: lang === 'tr' ? 'Yurtdışı Gönder' : 'Ship Abroad', link: '/yurtdisi-kargo', style: 'primary' },
      { text: lang === 'tr' ? 'Yurtiçi Fiyatları İste' : 'Get Domestic Prices', link: '/yurtici-kargo', style: 'secondary' }
    ]
  },
  trustSection: {
    title: lang === 'tr' ? 'Kargon güvende,' : 'Your cargo is safe,',
    highlightedTitle: lang === 'tr' ? 'süreç kontrol altında' : 'process under control',
    points: [
      { title: lang === 'tr' ? '35+ Yıl Tecrübe' : '35+ Years Experience', desc: lang === 'tr' ? '35+ yıl yazılım ve teknoloji tecrübesi' : '35+ years of software and technology expertise' },
      { title: lang === 'tr' ? 'Net Fiyat' : 'Transparent Pricing', desc: lang === 'tr' ? 'Fiyatlar baştan net, sürpriz yok' : 'Prices are clear upfront, no surprises' },
      { title: lang === 'tr' ? 'Anlık Takip' : 'Live Tracking', desc: lang === 'tr' ? 'Tüm gönderiler panelden anlık takip edilir' : 'Track all shipments instantly from the panel' },
      { title: lang === 'tr' ? 'Kontrollü Süreç' : 'Controlled Process', desc: lang === 'tr' ? 'İade ve sorunlu gönderiler kontrol altında' : 'Returns and problematic shipments under control' }
    ]
  }
});

const DEFAULT_PARTNERS = (lang: string) => ({
  carriers: [
    { name: "DHL", logo: "", color: "bg-gradient-to-br from-yellow-400 to-red-500" },
    { name: "FedEx", logo: "", color: "bg-gradient-to-br from-purple-500 to-orange-500" },
    { name: "UPS", logo: "", color: "bg-gradient-to-br from-yellow-600 to-yellow-700" },
    { name: "TNT", logo: "", color: "bg-gradient-to-br from-orange-500 to-red-600" }
  ],
  socialProof: {
    title: lang === 'tr' ? 'E-ticaret satıcıları tarafından' : 'Actively used by',
    highlightedTitle: lang === 'tr' ? 'aktif olarak kullanılmaktadır' : 'e-commerce sellers',
    testimonials: [
      { quote: lang === 'tr' ? '"Fiyat ve hız konusunda en iyi çözüm."' : '"The best solution for price and speed."', author: lang === 'tr' ? '— E-ticaret satıcısı' : '— E-commerce seller' },
      { quote: lang === 'tr' ? '"Tek panelden tüm kargoları yönetiyoruz."' : '"We manage all shipments from a single panel."', author: lang === 'tr' ? '— Mağaza sahibi' : '— Store owner' }
    ],
    ctaText: lang === 'tr' ? 'Sen de gönderine başla' : 'Start shipping now',
    ctaLink: 'https://app.adorelgo.com'
  }
});

const DEFAULT_USE_CASES = (lang: string) => ({
  title: lang === 'tr' ? 'Kullananlar' : 'Users',
  highlightedTitle: lang === 'tr' ? 'Bırakmıyor' : "Don't Leave",
  items: [
    { id: '1', icon: 'fa-truck-fast', color: 'bg-blue-500', title: lang === 'tr' ? 'Her Gün Aktif Gönderileri Olanlar' : 'Those with Daily Active Shipments', description: lang === 'tr' ? 'Günlük yüksek hacimli gönderimlerinizi kolayca yönetin.' : 'Easily manage your high-volume daily shipments.' },
    { id: '2', icon: 'fa-globe', color: 'bg-green-500', title: lang === 'tr' ? 'Birçok Ülkeye Düzenli Gönderim Yapanlar' : 'Those who Ship Regularly to Many Countries', description: lang === 'tr' ? 'Çok destinasyonlu gönderimlerinizi tek panelden takip edin.' : 'Track your multi-destination shipments from a single panel.' }
  ]
});

const DEFAULT_HOME_CTA = (lang: string) => ({
  title: lang === 'tr' ? 'Sorun mu var? Kararsız mı kaldın?' : 'Have questions? Not sure yet?',
  subtitle: lang === 'tr' ? 'Destek ekibimiz yardımcı olsun.' : 'Let our support team help you.',
  buttonText: lang === 'tr' ? 'Ücretsiz Üye Ol' : 'Sign Up Free',
  buttonLink: 'https://app.adorelgo.com'
});

const DEFAULT_FAQ_HEADER = (lang: string) => ({
  badge: lang === 'tr' ? 'BİLGİ MERKEZİ' : 'INFORMATION CENTER',
  title: lang === 'tr' ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions',
  groups: lang === 'tr' ? [
    { ids: ['1','2','3','4','5'], label: 'Üyelik & Ücretlendirme' },
    { ids: ['6','7','8','9'], label: 'Nasıl Gönderirim?' },
    { ids: ['10','11','12','13'], label: 'Kapıdan Alım – Kapıya Teslim' },
    { ids: ['14','15','16','17'], label: 'İlk Kez Yurtdışına Gönderenler' },
    { ids: ['18','19','20','21'], label: 'Gümrük & Evrak Rehberi' },
    { ids: ['22','23','24'], label: 'Büyük Paket (XL & Lojistik)' },
    { ids: ['25','26','27'], label: 'Alıcı Ödemeli Gönderi' },
    { ids: ['28','29','30','31'], label: 'İade & Geri Gönderim' },
    { ids: ['32','33','34'], label: 'Entegrasyon & Kullanım' },
    { ids: ['35','36','37','38'], label: 'Güven & Operasyon' },
  ] : [
    { ids: ['1','2','3','4','5'], label: 'Membership & Pricing' },
    { ids: ['6','7','8','9'], label: 'How to Ship?' },
    { ids: ['10','11','12','13'], label: 'Door Pickup – Door Delivery' },
    { ids: ['14','15','16','17'], label: 'First-Time International Shippers' },
    { ids: ['18','19','20','21'], label: 'Customs & Document Guide' },
    { ids: ['22','23','24'], label: 'Large Packages (XL & Logistics)' },
    { ids: ['25','26','27'], label: 'Receiver-Pays Shipments' },
    { ids: ['28','29','30','31'], label: 'Returns & Reshipping' },
    { ids: ['32','33','34'], label: 'Integration & Usage' },
    { ids: ['35','36','37','38'], label: 'Trust & Operations' },
  ]
});

const DEFAULT_FAQ = (lang: string) => lang === 'tr' ? [
  { id: "1", question: "AdorelGO üyelik ücretli mi?", answer: "Hayır. Üyelik tamamen ücretsizdir." },
  { id: "2", question: "Aylık veya yıllık ücret var mı?", answer: "Hayır. Herhangi bir sabit ücret yoktur." },
  { id: "3", question: "Sadece gönderi yaptıkça mı ödeme yaparım?", answer: "Evet. Sadece kullandığınız gönderi kadar ödeme yaparsınız." },
  { id: "4", question: "Gizli ücret veya ekstra kesinti var mı?", answer: "Hayır. Tüm ücretler panelde şeffaf şekilde gösterilir." },
  { id: "5", question: "Fiyatlar neye göre belirlenir?", answer: "Desi, ağırlık, ülke ve kargo firmasına göre belirlenir." },
  { id: "6", question: "Yurtdışına nasıl kargo gönderirim?", answer: "AdorelGO paneline giriş yaparak ülke, ürün ve ağırlık bilgilerini girmeniz yeterlidir. Sistem size en uygun kargo seçeneklerini anında sunar." },
  { id: "7", question: "Gönderi oluşturmak ne kadar sürer?", answer: "Ortalama 1–2 dakika içinde gönderinizi oluşturabilirsiniz." },
  { id: "8", question: "Kargo firması seçmem gerekiyor mu?", answer: "Hayır. Sistem sizin için en uygun fiyat ve süreye sahip kargo firmasını otomatik önerir." },
  { id: "9", question: "Aynı anda birden fazla gönderi oluşturabilir miyim?", answer: "Evet. Toplu gönderi özelliği ile yüzlerce gönderiyi tek seferde oluşturabilirsiniz." },
  { id: "10", question: "Kargo kapıdan alınıyor mu?", answer: "Evet. Kargolarınız adresinizden alınır ve alıcının adresine teslim edilir." },
  { id: "11", question: "Şubeye gitmem gerekiyor mu?", answer: "Hayır. Tüm süreç kapınızdan yönetilir." },
  { id: "12", question: "Türkiye'nin her yerinden alım var mı?", answer: "Evet. Türkiye genelinde kapıdan alım yapılabilir." },
  { id: "13", question: "Aynı gün alım yapılır mı?", answer: "Yoğunluğa bağlı olarak aynı gün alım mümkündür." },
  { id: "14", question: "İlk kez gönderim yapıyorum, zor mu?", answer: "Hayır. Sistem sizi adım adım yönlendirir ve tüm süreci kolaylaştırır." },
  { id: "15", question: "Deneyimim yok, yine de gönderebilir miyim?", answer: "Evet. Hiç deneyiminiz olmasa bile birkaç dakika içinde gönderi oluşturabilirsiniz." },
  { id: "16", question: "Destek alabilir miyim?", answer: "Evet. Müşteri hizmetleri ve canlı destek ile süreç boyunca destek alabilirsiniz." },
  { id: "17", question: "Hangi ülkelere gönderim yapabilirim?", answer: "200'den fazla ülkeye gönderim yapabilirsiniz." },
  { id: "18", question: "Yurtdışı gönderimde hangi evraklar gerekir?", answer: "Genellikle fatura, ürün açıklaması ve değer bilgisi gereklidir." },
  { id: "19", question: "Evrakları kendim mi hazırlamalıyım?", answer: "Hayır. AdorelGO gerekli evrakları otomatik oluşturur." },
  { id: "20", question: "Gümrük işlemlerini kim yapar?", answer: "Kargo firması ve gümrük sistemi tarafından yürütülür." },
  { id: "21", question: "GTİP bilgisi gerekli mi?", answer: "Bazı ürünlerde gereklidir. Sistem bu konuda sizi yönlendirir." },
  { id: "22", question: "Büyük ve ağır ürün gönderimi yapabilir miyim?", answer: "Evet. 30 desi üzeri büyük (XL) gönderiler yapılabilir." },
  { id: "23", question: "Paletli veya hacimli yük gönderebilir miyim?", answer: "Evet. Lojistik taşımalar için özel çözümler sunulmaktadır." },
  { id: "24", question: "Mobilya, beyaz eşya gibi ürünler gönderilebilir mi?", answer: "Evet. Büyük hacimli ürünler gönderilebilir." },
  { id: "25", question: "Alıcı ödemeli gönderi yapabilir miyim?", answer: "Evet. Alıcı ödemeli kargo seçeneği mevcuttur." },
  { id: "26", question: "Yurtdışında alıcı ödeme var mı?", answer: "Bazı ülke ve hizmetlerde mümkündür." },
  { id: "27", question: "Alıcı ödeme nasıl çalışır?", answer: "Kargo ücreti teslim sırasında alıcı tarafından ödenir." },
  { id: "28", question: "Yurtdışı gönderiler iade olabilir mi?", answer: "Evet. Alıcı teslim almazsa gönderi iade edilir." },
  { id: "29", question: "İade sürecini nasıl takip ederim?", answer: "Panel üzerinden tüm süreçleri anlık takip edebilirsiniz." },
  { id: "30", question: "İade kargo ücreti kime aittir?", answer: "Genellikle göndericiye aittir." },
  { id: "31", question: "İade edilen ürün tekrar gönderilebilir mi?", answer: "Evet. Tekrar gönderim yapılabilir." },
  { id: "32", question: "E-ticaret sitem ile entegrasyon var mı?", answer: "Evet. Shopify, WooCommerce, İkas, Ticimax ve pazaryerleri ile entegrasyon vardır." },
  { id: "33", question: "Toplu gönderi oluşturabilir miyim?", answer: "Evet. Excel veya toplu yükleme ile gönderi oluşturabilirsiniz." },
  { id: "34", question: "Raporlama yapabilir miyim?", answer: "Evet. Gönderi ve tahsilat raporlarına ulaşabilirsiniz." },
  { id: "35", question: "Kargom kaybolursa ne olur?", answer: "Kargo firması tarafından tazmin süreci başlatılır." },
  { id: "36", question: "Kargom hasar görürse ne olur?", answer: "Hasar tutanağı ile tazmin işlemi yapılır." },
  { id: "37", question: "Gönderiler sigortalı mı?", answer: "Evet. Kargo firmalarının sigorta kapsamındadır." },
  { id: "38", question: "Kargoyu takip edebilir miyim?", answer: "Evet. Tüm gönderilerinizi anlık olarak takip edebilirsiniz." }
] : [
  { id: "1", question: "Is AdorelGO membership paid?", answer: "No. Membership is completely free." },
  { id: "2", question: "Is there a monthly or annual fee?", answer: "No. There are no fixed fees." },
  { id: "3", question: "Do I only pay when I ship?", answer: "Yes. You only pay for the shipments you use." },
  { id: "4", question: "Are there hidden fees or extra charges?", answer: "No. All fees are displayed transparently in the panel." },
  { id: "5", question: "How are prices determined?", answer: "Based on volumetric weight, actual weight, country, and carrier." },
  { id: "6", question: "How do I ship internationally?", answer: "Simply log in to the AdorelGO panel and enter the country, product, and weight details. The system instantly presents you with the best shipping options." },
  { id: "7", question: "How long does it take to create a shipment?", answer: "You can create your shipment in an average of 1–2 minutes." },
  { id: "8", question: "Do I need to choose a carrier?", answer: "No. The system automatically recommends the carrier with the best price and delivery time for you." },
  { id: "9", question: "Can I create multiple shipments at once?", answer: "Yes. With the bulk shipment feature, you can create hundreds of shipments at once." },
  { id: "10", question: "Is cargo picked up from the door?", answer: "Yes. Your shipments are picked up from your address and delivered to the recipient's address." },
  { id: "11", question: "Do I need to go to a branch?", answer: "No. The entire process is managed from your door." },
  { id: "12", question: "Is pickup available from anywhere in Turkey?", answer: "Yes. Door pickup is available throughout Turkey." },
  { id: "13", question: "Is same-day pickup possible?", answer: "Same-day pickup is possible depending on availability." },
  { id: "14", question: "I'm shipping for the first time, is it difficult?", answer: "No. The system guides you step by step and simplifies the entire process." },
  { id: "15", question: "I have no experience, can I still ship?", answer: "Yes. Even without any experience, you can create a shipment in just a few minutes." },
  { id: "16", question: "Can I get support?", answer: "Yes. You can get support throughout the process via customer service and live chat." },
  { id: "17", question: "Which countries can I ship to?", answer: "You can ship to over 200 countries." },
  { id: "18", question: "What documents are required for international shipping?", answer: "Generally an invoice, product description, and value information are required." },
  { id: "19", question: "Do I need to prepare the documents myself?", answer: "No. AdorelGO automatically generates the required documents." },
  { id: "20", question: "Who handles customs procedures?", answer: "Handled by the carrier and customs system." },
  { id: "21", question: "Is HS code required?", answer: "Required for some products. The system will guide you on this." },
  { id: "22", question: "Can I ship large and heavy items?", answer: "Yes. Large (XL) shipments over 30 desi can be made." },
  { id: "23", question: "Can I ship palletized or bulky cargo?", answer: "Yes. Special solutions are available for logistics transport." },
  { id: "24", question: "Can furniture or home appliances be shipped?", answer: "Yes. Large volumetric items can be shipped." },
  { id: "25", question: "Can I send receiver-pays shipments?", answer: "Yes. The receiver-pays shipping option is available." },
  { id: "26", question: "Is receiver payment available internationally?", answer: "It is possible in some countries and services." },
  { id: "27", question: "How does receiver payment work?", answer: "The shipping fee is paid by the recipient upon delivery." },
  { id: "28", question: "Can international shipments be returned?", answer: "Yes. If the recipient does not accept delivery, the shipment is returned." },
  { id: "29", question: "How do I track the return process?", answer: "You can track all processes in real time through the panel." },
  { id: "30", question: "Who pays for the return shipping?", answer: "Generally the sender." },
  { id: "31", question: "Can a returned item be reshipped?", answer: "Yes. Reshipping is possible." },
  { id: "32", question: "Is there integration with my e-commerce site?", answer: "Yes. Integration is available with Shopify, WooCommerce, İkas, Ticimax, and marketplaces." },
  { id: "33", question: "Can I create bulk shipments?", answer: "Yes. You can create shipments via Excel or bulk upload." },
  { id: "34", question: "Can I generate reports?", answer: "Yes. Shipment and collection reports are available." },
  { id: "35", question: "What if my shipment is lost?", answer: "A compensation process is initiated by the carrier." },
  { id: "36", question: "What if my shipment is damaged?", answer: "Compensation is processed with a damage report." },
  { id: "37", question: "Are shipments insured?", answer: "Yes. Covered by the carriers' insurance." },
  { id: "38", question: "What if my shipment is lost?", answer: "Yes. You can track all your shipments in real time." }
];


const FaqGroupEditor: React.FC<{ lang: string; faq: any; faqHeader: any }> = ({ faq, faqHeader }) => {
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
                  {/* Grup başlığını düzenle */}
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <div className="flex-1">
                      <Label text="Grup Başlığı" />
                      <Input value={g.label} onChange={v => faqHeader.set(`groups.${gi}.label`, v)} />
                    </div>
                    <div className="pt-5">
                      <SaveBtn onSave={faqHeader.handleSave} saving={faqHeader.saving} success={faqHeader.success} error={faqHeader.error} />
                    </div>
                  </div>
                  {/* Sorular */}
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

const HomeEditorInner: React.FC<{ lang: string }> = ({ lang }) => {
  const hero = useEditor(() => contentAPI.getHero(lang), d => contentAPI.updateHero(d, lang), DEFAULT_HERO(lang));
  const howitworks = useEditor(() => contentAPI.getHowItWorks(lang), d => contentAPI.updateHowItWorks(d, lang), DEFAULT_HOWITWORKS(lang));
  const partners = useEditor(
    () => contentAPI.getPartners(lang).then((d: any) => Array.isArray(d) ? { carriers: d, socialProof: {} } : d),
    d => contentAPI.updatePartners(d, lang),
    DEFAULT_PARTNERS(lang)
  );
  const cta = useEditor(() => contentAPI.getCta(lang), d => contentAPI.updateCta(d, lang), DEFAULT_CTA(lang));
  const faqHeader = useEditor(() => contentAPI.getFaqHeader(lang), d => contentAPI.updateFaqHeader(d, lang), DEFAULT_FAQ_HEADER(lang));
  const faq = useEditor(() => contentAPI.getFaq(lang), d => contentAPI.updateFaq(d, lang), DEFAULT_FAQ(lang));
  const featuresHeader = useEditor(() => contentAPI.getFeaturesHeader(lang), d => contentAPI.updateFeaturesHeader(d, lang), DEFAULT_FEATURES_HEADER(lang));
  const solutions = useEditor(() => contentAPI.getSolutions(lang), d => contentAPI.updateSolutions(d, lang), DEFAULT_SOLUTIONS(lang));
  const targetAudience = useEditor(() => contentAPI.getTargetAudience(lang), d => contentAPI.updateTargetAudience(d, lang), DEFAULT_TARGET_AUDIENCE(lang));
  const useCases = useEditor(() => contentAPI.getUseCases(lang), d => contentAPI.updateUseCases(d, lang), DEFAULT_USE_CASES(lang));
  const homeCta = useEditor(() => contentAPI.getHomeCta(lang), d => contentAPI.updateHomeCta(d, lang), DEFAULT_HOME_CTA(lang));

  if (hero.loading) return <Loader />;

  return (
    <div className="space-y-6">

      {/* HERO */}
      <Card title="Hero Banner">
        <div><Label text="Ana Başlık" /><Textarea value={hero.data?.title} onChange={v => hero.set('title', v)} rows={2} placeholder="Kazanç&#10;Yurtdışında.&#10;En Uygun Kargo Bizde." /></div>
        <div><Label text="Alt Başlık" /><Textarea value={hero.data?.subtitle} onChange={v => hero.set('subtitle', v)} placeholder="Yurtdışı gönderimlerinizi kolaylaştırıyoruz." /></div>
        <ImageUpload label="Hero Görseli" value={hero.data?.image ?? ''} onChange={v => hero.set('image', v)} />
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label text="Rozetler" />
            <AddBtn onClick={() => hero.set('badges', [...(hero.data?.badges || []), { icon: 'fa-check', text: 'Yeni Rozet', color: 'blue' }])} />
          </div>
          <div className="space-y-2">
            {(hero.data?.badges || []).map((b: any, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <Input value={b.text} onChange={v => hero.set(`badges.${i}.text`, v)} placeholder="Rozet metni" />
                <RemoveBtn onClick={() => hero.set('badges', hero.data.badges.filter((_: any, j: number) => j !== i))} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label text="İstatistikler" />
            <AddBtn onClick={() => hero.set('stats', [...(hero.data?.stats || []), { icon: 'fa-star', label: 'Yeni', value: '0' }])} />
          </div>
          <div className="space-y-2">
            {(hero.data?.stats || []).map((s: any, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <div className="w-24 shrink-0"><Input value={s.value} onChange={v => hero.set(`stats.${i}.value`, v)} placeholder="220+" /></div>
                <Input value={s.label} onChange={v => hero.set(`stats.${i}.label`, v)} placeholder="Etiket" />
                <RemoveBtn onClick={() => hero.set('stats', hero.data.stats.filter((_: any, j: number) => j !== i))} />
              </div>
            ))}
          </div>
        </div>
        <SaveBtn onSave={hero.handleSave} saving={hero.saving} success={hero.success} error={hero.error} />
      </Card>

      {/* NASIL ÇALIŞIR */}
      <Card title="Nasıl Çalışır — Adımlar" action={
        <AddBtn onClick={() => howitworks.set('steps', [...(howitworks.data?.steps || []), {
          id: Date.now(), order: howitworks.data?.steps?.length || 0, icon: 'fa-star',
          color: 'bg-blue-500', image: '', title: 'Yeni Adım', description: '', buttonText: '', buttonLink: '', buttonStyle: 'primary'
        }])} />
      }>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Rozet" /><Input value={howitworks.data?.badge} onChange={v => howitworks.set('badge', v)} placeholder="NASIL ÇALIŞIR" /></div>
          <div><Label text="Alt Başlık" /><Input value={howitworks.data?.subtitle} onChange={v => howitworks.set('subtitle', v)} placeholder="Hızlı ve kolay" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text='Başlık' /><Input value={howitworks.data?.title} onChange={v => howitworks.set('title', v)} placeholder="Yurtdışı Kargo" /></div>
          <div><Label text='Vurgulu Başlık' /><Input value={howitworks.data?.titleHighlight} onChange={v => howitworks.set('titleHighlight', v)} placeholder="Nasıl Çalışır?" /></div>
        </div>
        <div><Label text="Alt Buton Metni" /><Input value={howitworks.data?.buttons?.[0]?.text ?? ''} onChange={v => howitworks.set('buttons.0.text', v)} /></div>
        <div className="space-y-3">
          {(howitworks.data?.steps || []).map((step: any, i: number) => (
            <div key={step.id || i} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">{i + 1}. Adım</span>
                <RemoveBtn onClick={() => howitworks.set('steps', howitworks.data.steps.filter((_: any, j: number) => j !== i))} />
              </div>
              <div><Label text="Başlık" /><Input value={step.title} onChange={v => howitworks.set(`steps.${i}.title`, v)} /></div>
              <div><Label text="Açıklama" /><Textarea value={step.description} onChange={v => howitworks.set(`steps.${i}.description`, v)} rows={2} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label text="Buton Metni" /><Input value={step.buttonText} onChange={v => howitworks.set(`steps.${i}.buttonText`, v)} /></div>
                <div><Label text="Buton Linki" /><Input value={step.buttonLink} onChange={v => howitworks.set(`steps.${i}.buttonLink`, v)} /></div>
              </div>
              <ImageUpload label="Adım Görseli" value={step.image ?? ''} onChange={v => howitworks.set(`steps.${i}.image`, v)} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={howitworks.handleSave} saving={howitworks.saving} success={howitworks.success} error={howitworks.error} />
      </Card>

      {/* SİSTEM EN DOĞRUSUNU SEÇER */}
      <Card title="Sistem en Doğrusunu Seçer — Başlık & Kartlar" action={
        <AddBtn onClick={() => featuresHeader.set('miniCards', [...(featuresHeader.data?.miniCards || []), { icon: 'fa-star', color: 'bg-blue-500', title: 'Yeni Kart', description: '' }])} />
      }>
        <div><Label text="Başlık" /><Input value={featuresHeader.data?.title} onChange={v => featuresHeader.set('title', v)} /></div>
        <div><Label text="Alt Başlık" /><Textarea value={featuresHeader.data?.subtitle} onChange={v => featuresHeader.set('subtitle', v)} /></div>
        <div className="space-y-2">
          {(featuresHeader.data?.miniCards || []).map((c: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Kart</span>
                <RemoveBtn onClick={() => featuresHeader.set('miniCards', featuresHeader.data.miniCards.filter((_: any, j: number) => j !== i))} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label text="Başlık" /><Input value={c.title} onChange={v => featuresHeader.set(`miniCards.${i}.title`, v)} /></div>
                <div><Label text="Açıklama" /><Input value={c.description} onChange={v => featuresHeader.set(`miniCards.${i}.description`, v)} /></div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 pt-4 mt-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Alt Metin & CTA Banner</p>
          <div><Label text="Alt Metin (Kargo firması seçmezsin...)" /><Input value={cta.data?.bottomText ?? (lang === 'tr' ? 'Kargo firması seçmezsin sonuç seçersin.' : "You don't choose a carrier, you choose results.")} onChange={v => cta.set('bottomText', v)} /></div>
          <div className="mt-3"><Label text="CTA Başlık" /><Input value={cta.data?.title} onChange={v => cta.set('title', v)} /></div>
          <div className="mt-2"><Label text="CTA Alt Başlık" /><Input value={cta.data?.subtitle} onChange={v => cta.set('subtitle', v)} /></div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div><Label text="CTA Buton Metni" /><Input value={cta.data?.buttonText} onChange={v => cta.set('buttonText', v)} /></div>
            <div><Label text="CTA Buton URL" /><Input value={cta.data?.buttonLink} onChange={v => cta.set('buttonLink', v)} /></div>
          </div>
          <div className="mt-2"><SaveBtn onSave={cta.handleSave} saving={cta.saving} success={cta.success} error={cta.error} /></div>
        </div>
        <SaveBtn onSave={featuresHeader.handleSave} saving={featuresHeader.saving} success={featuresHeader.success} error={featuresHeader.error} />
      </Card>

      {/* TÜM KARGOLARINI TEK YERDEN YÖNET */}
      <Card title="Tüm Kargolarını Tek Yerden Yönet — Başlık & Buton">
        <div className="grid grid-cols-2 gap-3">
          <div><Label text='Başlık' /><Input value={solutions.data?.title} onChange={v => solutions.set('title', v)} /></div>
          <div><Label text='Vurgulu Başlık' /><Input value={solutions.data?.highlightedTitle} onChange={v => solutions.set('highlightedTitle', v)} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Buton Metni" /><Input value={solutions.data?.buttonText} onChange={v => solutions.set('buttonText', v)} /></div>
          <div><Label text="Buton URL" /><Input value={solutions.data?.buttonLink} onChange={v => solutions.set('buttonLink', v)} /></div>
        </div>
        <div><Label text='Kart Başlığı' /><Input value={solutions.data?.cardTitle} onChange={v => solutions.set('cardTitle', v)} /></div>
        <div><Label text="Kart Alt Metni" /><Textarea value={solutions.data?.cardDescription} onChange={v => solutions.set('cardDescription', v)} rows={2} /></div>
        <div className="border-t border-gray-100 pt-4 mt-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Alt Banner</p>
          <div><Label text='Alt Metin' /><Input value={solutions.data?.subDescription} onChange={v => solutions.set('subDescription', v)} /></div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div><Label text='Buton Metni' /><Input value={solutions.data?.ctaButtonText} onChange={v => solutions.set('ctaButtonText', v)} /></div>
            <div><Label text="Buton URL" /><Input value={solutions.data?.ctaButtonLink} onChange={v => solutions.set('ctaButtonLink', v)} /></div>
          </div>
        </div>
        <SaveBtn onSave={solutions.handleSave} saving={solutions.saving} success={solutions.success} error={solutions.error} />
      </Card>

      <Card title="Servis Kartları" action={
        <AddBtn onClick={() => solutions.set('services', [...(solutions.data?.services || []), {
          id: String(Date.now()), title: 'Yeni Servis', desc: '', icon: 'fa-box', color: 'bg-blue-500', bgColor: 'bg-blue-50', order: solutions.data?.services?.length || 0
        }])} />
      }>
        <div className="space-y-3">
          {(solutions.data?.services || []).sort((a: any, b: any) => a.order - b.order).map((s: any, i: number) => (
            <div key={s.id || i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Servis</span>
                <RemoveBtn onClick={() => solutions.set('services', solutions.data.services.filter((_: any, j: number) => j !== i))} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label text="Başlık" /><Input value={s.title} onChange={v => solutions.set(`services.${i}.title`, v)} /></div>
                <div><Label text="Açıklama" /><Input value={s.desc} onChange={v => solutions.set(`services.${i}.desc`, v)} /></div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={solutions.handleSave} saving={solutions.saving} success={solutions.success} error={solutions.error} />
      </Card>

      <Card title="Gönderim Seçenekleri" action={
        <AddBtn onClick={() => solutions.set('shippingOptions', [...(solutions.data?.shippingOptions || []), {
          id: String(Date.now()), title: 'Yeni Seçenek', subtitle: 'Öncelik', icon: 'fa-box', color: 'bg-blue-500',
          description: '', features: [], order: solutions.data?.shippingOptions?.length || 0
        }])} />
      }>
        <div className="space-y-3">
          {(solutions.data?.shippingOptions || []).sort((a: any, b: any) => a.order - b.order).map((opt: any, i: number) => (
            <div key={opt.id || i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Seçenek</span>
                <RemoveBtn onClick={() => solutions.set('shippingOptions', solutions.data.shippingOptions.filter((_: any, j: number) => j !== i))} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label text="Başlık" /><Input value={opt.title} onChange={v => solutions.set(`shippingOptions.${i}.title`, v)} /></div>
                <div><Label text="Alt Başlık" /><Input value={opt.subtitle} onChange={v => solutions.set(`shippingOptions.${i}.subtitle`, v)} /></div>
              </div>
              <div><Label text="Açıklama" /><Textarea value={opt.description} onChange={v => solutions.set(`shippingOptions.${i}.description`, v)} rows={2} /></div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label text="Özellikler" />
                  <AddBtn label="Özellik Ekle" onClick={() => solutions.set(`shippingOptions.${i}.features`, [...(opt.features || []), 'Yeni özellik'])} />
                </div>
                <div className="space-y-1">
                  {(opt.features || []).map((f: string, fi: number) => (
                    <div key={fi} className="flex items-center gap-2">
                      <Input value={f} onChange={v => solutions.set(`shippingOptions.${i}.features.${fi}`, v)} />
                      <RemoveBtn onClick={() => solutions.set(`shippingOptions.${i}.features`, opt.features.filter((_: any, fj: number) => fj !== fi))} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={solutions.handleSave} saving={solutions.saving} success={solutions.success} error={solutions.error} />
      </Card>

      {/* GÖNDERDİKÇE KAZAN */}
      <Card title="Gönderdikçe Kazan Bölümü">
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Rozet" /><Input value={targetAudience.data?.earnSection?.badge} onChange={v => targetAudience.set('earnSection.badge', v)} /></div>
          <div><Label text='Başlık' /><Input value={targetAudience.data?.earnSection?.title} onChange={v => targetAudience.set('earnSection.title', v)} /></div>
        </div>
        <div><Label text='Vurgulu Başlık' /><Input value={targetAudience.data?.earnSection?.highlightedTitle} onChange={v => targetAudience.set('earnSection.highlightedTitle', v)} /></div>
        <div><Label text="Açıklama" /><Textarea value={targetAudience.data?.earnSection?.description} onChange={v => targetAudience.set('earnSection.description', v)} rows={3} /></div>
        <div><Label text="Alt Yazı" /><Input value={targetAudience.data?.earnSection?.bottomText} onChange={v => targetAudience.set('earnSection.bottomText', v)} /></div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label text="Adımlar" />
            <AddBtn onClick={() => targetAudience.set('earnSection.benefits', [...(targetAudience.data?.earnSection?.benefits || []), { number: String((targetAudience.data?.earnSection?.benefits?.length || 0) + 1).padStart(2, '0'), text: 'Yeni adım' }])} />
          </div>
          <div className="space-y-2">
            {(targetAudience.data?.earnSection?.benefits || []).map((b: any, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <div className="w-12 shrink-0"><Input value={b.number} onChange={v => targetAudience.set(`earnSection.benefits.${i}.number`, v)} /></div>
                <Input value={b.text} onChange={v => targetAudience.set(`earnSection.benefits.${i}.text`, v)} />
                <RemoveBtn onClick={() => targetAudience.set('earnSection.benefits', targetAudience.data.earnSection.benefits.filter((_: any, j: number) => j !== i))} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label text="Butonlar" />
            <AddBtn onClick={() => targetAudience.set('earnSection.buttons', [...(targetAudience.data?.earnSection?.buttons || []), { text: 'Yeni Buton', link: '/', style: 'primary' }])} />
          </div>
          <div className="space-y-2">
            {(targetAudience.data?.earnSection?.buttons || []).map((btn: any, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <Input value={btn.text} onChange={v => targetAudience.set(`earnSection.buttons.${i}.text`, v)} />
                <Input value={btn.link} onChange={v => targetAudience.set(`earnSection.buttons.${i}.link`, v)} />
                <RemoveBtn onClick={() => targetAudience.set('earnSection.buttons', targetAudience.data.earnSection.buttons.filter((_: any, j: number) => j !== i))} />
              </div>
            ))}
          </div>
        </div>
        <ImageUpload label="Sağ Taraf Görseli" value={targetAudience.data?.earnSection?.card?.image ?? ''} onChange={v => targetAudience.set('earnSection.card.image', v)} />
        <SaveBtn onSave={targetAudience.handleSave} saving={targetAudience.saving} success={targetAudience.success} error={targetAudience.error} />
      </Card>

      {/* PARTNERLER */}
      <Card title="Partnerler — Kargo Firmaları" action={
        <AddBtn onClick={() => partners.set('carriers', [...(Array.isArray(partners.data?.carriers) ? partners.data.carriers : (Array.isArray(partners.data) ? partners.data : [])), { name: 'Yeni Partner', logo: '', color: 'bg-gray-100' }])} />
      }>
        <div className="space-y-3">
          {(Array.isArray(partners.data?.carriers) ? partners.data.carriers : Array.isArray(partners.data) ? partners.data : []).map((p: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Partner</span>
                <RemoveBtn onClick={() => {
                  const list = Array.isArray(partners.data?.carriers) ? partners.data.carriers : partners.data;
                  partners.set('carriers', list.filter((_: any, j: number) => j !== i));
                }} />
              </div>
              <div><Label text="İsim" /><Input value={p.name} onChange={v => partners.set(`carriers.${i}.name`, v)} /></div>
              <ImageUpload label="Logo" value={p.logo ?? ''} onChange={v => partners.set(`carriers.${i}.logo`, v)} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={partners.handleSave} saving={partners.saving} success={partners.success} error={partners.error} />
      </Card>

      {/* İSTATİSTİKLER */}
      <Card title="İstatistikler — Binlerce Satıcı" action={
        <AddBtn onClick={() => targetAudience.set('stats', [...(targetAudience.data?.stats || []), { value: '0+', label: 'Yeni İstatistik' }])} />
      }>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text='Başlık' /><Input value={targetAudience.data?.statsTitle ?? ''} onChange={v => targetAudience.set('statsTitle', v)} /></div>
          <div><Label text='Vurgulu Kısım' /><Input value={targetAudience.data?.statsHighlight ?? ''} onChange={v => targetAudience.set('statsHighlight', v)} /></div>
        </div>
        <div className="space-y-2">
          {(Array.isArray(targetAudience.data?.stats) ? targetAudience.data.stats : []).map((s: any, i: number) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <div className="w-28 shrink-0"><Input value={s.value} onChange={v => targetAudience.set(`stats.${i}.value`, v)} /></div>
              <Input value={s.label} onChange={v => targetAudience.set(`stats.${i}.label`, v)} />
              <RemoveBtn onClick={() => targetAudience.set('stats', targetAudience.data.stats.filter((_: any, j: number) => j !== i))} />
            </div>
          ))}
        </div>
        <SaveBtn onSave={targetAudience.handleSave} saving={targetAudience.saving} success={targetAudience.success} error={targetAudience.error} />
      </Card>

      {/* SOSYAL KANIT */}
      <Card title="Sosyal Kanıt — Yorumlar & CTA" action={
        <AddBtn onClick={() => partners.set('socialProof.testimonials', [...(Array.isArray(partners.data?.socialProof?.testimonials) ? partners.data.socialProof.testimonials : []), { quote: '"Yorum metni."', author: '— İsim' }])} />
      }>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text='Başlık' /><Input value={partners.data?.socialProof?.title ?? ''} onChange={v => partners.set('socialProof.title', v)} /></div>
          <div><Label text='Vurgulu Kısım' /><Input value={partners.data?.socialProof?.highlightedTitle ?? ''} onChange={v => partners.set('socialProof.highlightedTitle', v)} /></div>
        </div>
        <div className="space-y-2">
          {(Array.isArray(partners.data?.socialProof?.testimonials) ? partners.data.socialProof.testimonials : []).map((t: any, i: number) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Yorum</span>
                <RemoveBtn onClick={() => partners.set('socialProof.testimonials', partners.data.socialProof.testimonials.filter((_: any, j: number) => j !== i))} />
              </div>
              <div><Label text="Yorum Metni" /><Input value={t.quote} onChange={v => partners.set(`socialProof.testimonials.${i}.quote`, v)} /></div>
              <div><Label text="Kişi" /><Input value={t.author} onChange={v => partners.set(`socialProof.testimonials.${i}.author`, v)} /></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text='CTA Buton Metni' /><Input value={partners.data?.socialProof?.ctaText ?? ''} onChange={v => partners.set('socialProof.ctaText', v)} /></div>
          <div><Label text="CTA Buton URL" /><Input value={partners.data?.socialProof?.ctaLink ?? ''} onChange={v => partners.set('socialProof.ctaLink', v)} /></div>
        </div>
        <SaveBtn onSave={partners.handleSave} saving={partners.saving} success={partners.success} error={partners.error} />
      </Card>

      {/* KULLANANLAR BIRAKMIYOR */}
      <Card title="Kullananlar Bırakmıyor" action={
        <AddBtn onClick={() => {
          const current = Array.isArray(useCases.data?.items) ? useCases.data.items : [];
          useCases.set('items', [...current, { id: String(Date.now()), title: 'Yeni Kullanım', description: '', icon: 'fa-box', color: 'bg-blue-500' }]);
        }} />
      }>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text='Başlık' /><Input value={useCases.data?.title} onChange={v => useCases.set('title', v)} /></div>
          <div><Label text='Vurgulu Kısım' /><Input value={useCases.data?.highlightedTitle} onChange={v => useCases.set('highlightedTitle', v)} /></div>
        </div>
        <div className="space-y-3">
          {(Array.isArray(useCases.data?.items) ? useCases.data.items : []).map((item: any, i: number) => (
            <div key={item.id || i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">{i + 1}. Kart</span>
                <RemoveBtn onClick={() => useCases.set('items', useCases.data.items.filter((_: any, j: number) => j !== i))} />
              </div>
              <div><Label text="Başlık" /><Input value={item.title} onChange={v => useCases.set(`items.${i}.title`, v)} /></div>
              <div><Label text="Açıklama" /><Textarea value={item.description} onChange={v => useCases.set(`items.${i}.description`, v)} rows={2} /></div>
            </div>
          ))}
        </div>
        <SaveBtn onSave={useCases.handleSave} saving={useCases.saving} success={useCases.success} error={useCases.error} />
      </Card>

      {/* HEMEN GÖNDERİNE BAŞLA CTA */}
      <Card title="Sorun mu var? — Orta CTA">
        <div><Label text="Başlık" /><Input value={homeCta.data?.title} onChange={v => homeCta.set('title', v)} /></div>
        <div><Label text="Alt Yazı" /><Input value={homeCta.data?.subtitle} onChange={v => homeCta.set('subtitle', v)} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Buton Metni" /><Input value={homeCta.data?.buttonText} onChange={v => homeCta.set('buttonText', v)} /></div>
          <div><Label text="Buton URL" /><Input value={homeCta.data?.buttonLink} onChange={v => homeCta.set('buttonLink', v)} /></div>
        </div>
        <SaveBtn onSave={homeCta.handleSave} saving={homeCta.saving} success={homeCta.success} error={homeCta.error} />
      </Card>

      {/* SSS */}
      <Card title="SSS — Başlık">
        <div className="grid grid-cols-2 gap-3">
          <div><Label text="Başlık" /><Input value={faqHeader.data?.title} onChange={v => faqHeader.set('title', v)} /></div>
          <div><Label text="Alt Başlık" /><Input value={faqHeader.data?.subtitle} onChange={v => faqHeader.set('subtitle', v)} /></div>
        </div>
        <SaveBtn onSave={faqHeader.handleSave} saving={faqHeader.saving} success={faqHeader.success} error={faqHeader.error} />
      </Card>

      <FaqGroupEditor lang={lang} faq={faq} faqHeader={faqHeader} />

<SeoCard slug="home" defaultSeo={{ metaTitle: "Ana Sayfa | AdorelGo", metaDescription: "AdorelGo ile yurtdışı ve yurtiçi kargo gönderin.", keywords: "adorelgo, yurtdışı kargo, yurtiçi kargo", canonical: "https://adorelgo.com" }} />

    </div>
  );
};

const HomeEditor: React.FC = () => {
  const [lang, setLang] = useState('tr');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 mt-1">Seçili dil için içerik yüklenip kaydedilir.</p>
        </div>
        <LangToggle lang={lang} onChange={setLang} />
      </div>
      <HomeEditorInner key={lang} lang={lang} />
    </div>
  );
};

export default HomeEditor;
