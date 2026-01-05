
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <div className={`flex items-center ${className} select-none`}>
    <svg viewBox="0 0 240 60" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="45" fill="#102477" style={{ font: 'bold 44px Outfit, sans-serif', letterSpacing: '-2px' }}>adore</text>
      <path d="M145 45.5C136.5 45.5 129.5 38.5 129.5 30C129.5 21.5 136.5 14.5 145 14.5C153.5 14.5 160.5 21.5 160.5 30C160.5 31.5 160.2 33 159.7 34.3" stroke="#4DB848" strokeWidth="8" strokeLinecap="round"/>
      <path d="M152 45L162 45L162 35" stroke="#4DB848" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="168" y="45" fill="#4DB848" style={{ font: 'bold 44px Outfit, sans-serif', letterSpacing: '-1px' }}>o</text>
    </svg>
  </div>
);

const Footer: React.FC = () => {
  const sections = [
    {
      title: "1-Hizmetlerimiz",
      links: [
        { n: "Yurtdışı Kargo", h: "#yurtdisi" },
        { n: "Ekonomik Kargo", h: "#yurtdisi" },
        { n: "Express Kargo", h: "#yurtdisi" },
        { n: "Yurtdışından Türkiye'ye", h: "#yurtdisi" },
        { n: "Yurtiçi Avantajlar", h: "#yurtici" },
        { n: "Alıcı Ödemeli Kargo", h: "#yurtici" },
        { n: "Kapıda Ödemeli Kargo", h: "#yurtici" },
        { n: "Büyük Desi Gönderimler", h: "#yurtici" }
      ]
    },
    {
      title: "2-Nasıl Çalışır?",
      links: [
        { n: "Nasıl Gönderirim?", h: "#nasil-calisir" },
        { n: "Kapıdan Alım – Teslim", h: "#nasil-calisir" },
        { n: "İlk Kez Gönderenler", h: "#nasil-calisir" },
        { n: "Gümrük & Evrak Rehberi", h: "#nasil-calisir" },
        { n: "Yurtdışı İade & Geri", h: "#nasil-calisir" },
        { n: "Hangi Gönderim Uygun?", h: "#nasil-calisir" }
      ]
    },
    {
      title: "3-Bilgi & Kaynaklar",
      links: [
        { n: "Lojistik Blog", h: "#" },
        { n: "Sıkça Sorulan Sorular", h: "#sss" },
        { n: "Yurtdışı Kargo Rehberi", h: "#" },
        { n: "Mikro İhracat Rehberi", h: "#" },
        { n: "Gümrük Rehberi", h: "#" },
        { n: "Güncel Duyurular", h: "#" }
      ]
    },
    {
      title: "4-Entegrasyonlar",
      links: [
        { n: "Shopify Entegrasyonu", h: "#" },
        { n: "Etsy Entegrasyonu", h: "#" },
        { n: "Amazon Entegrasyonu", h: "#" },
        { n: "WooCommerce", h: "#" },
        { n: "Özel Site Kargo API", h: "#" }
      ]
    }
  ];

  return (
    <>
      {/* Menü Bölümü - Tam Sayfa Genişliği */}
      <div className="w-full bg-slate-50/50 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {sections.map((section, idx) => (
              <nav key={idx} aria-label={section.title}>
                <h4 className="font-bold text-[#102477] text-xs mb-8 uppercase tracking-[0.1em] border-l-4 border-[#4DB848] pl-3">
                  {section.title}
                </h4>
                <ul className="space-y-4 text-slate-500 font-bold text-[12px]">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a href={link.h} className="hover:text-[#4DB848] transition-colors inline-block" title={link.n}>
                        {link.n}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-white text-[#102477] pt-12 pb-12 border-t border-slate-100" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <section className="bg-slate-50 p-8 rounded-[10px] mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="font-bold text-[#102477] text-lg mb-2">Sorun mu var? Kararsız mı kaldın?</h4>
              <p className="text-slate-500 text-sm font-medium">Destek ekibimiz e-ticaret lojistik süreçlerinizde her adımda yanınızda.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-[#102477] text-white px-8 py-3 rounded-[10px] font-bold text-sm flex items-center gap-2 hover:bg-black transition-colors">
                <i className="fas fa-comment-dots" aria-hidden="true"></i> İletişime Geç
              </button>
              <button className="bg-[#4DB848] text-white px-8 py-3 rounded-[10px] font-bold text-sm hover:bg-[#3da339] transition-colors shadow-lg shadow-green-500/10">
                Ücretsiz Kayıt Ol
              </button>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 border-b border-slate-50 pb-12">
            <div className="lg:col-span-1">
              <div className="flex-shrink-0 flex items-center mb-6">
                <Logo className="h-10" />
              </div>
              <p className="text-slate-400 text-xs font-bold leading-relaxed mb-6 uppercase tracking-wider">Yeni Nesil Akıllı Lojistik Teknolojileri Platformu</p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-[10px] bg-slate-100 flex items-center justify-center hover:bg-[#102477] hover:text-white transition-all" aria-label="Instagram"><i className="fab fa-instagram text-xs"></i></a>
                <a href="#" className="w-8 h-8 rounded-[10px] bg-slate-100 flex items-center justify-center hover:bg-[#102477] hover:text-white transition-all" aria-label="LinkedIn"><i className="fab fa-linkedin-in text-xs"></i></a>
              </div>
            </div>
            <div className="lg:col-span-3">
              <h4 className="font-bold text-[#102477] text-xs mb-8 uppercase tracking-[0.1em]">Kurumsal Bağlantılar</h4>
              <ul className="flex flex-wrap gap-x-8 gap-y-4 text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                <li><a href="#" className="hover:text-[#102477]" title="Hakkımızda">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-[#102477]" title="İletişim">İletişim</a></li>
                <li><a href="#" className="hover:text-[#102477]" title="Destek">Destek</a></li>
                <li><a href="#" className="hover:text-[#102477]" title="Gizlilik Politikası">Gizlilik Politikası</a></li>
                <li><a href="#" className="hover:text-[#102477]" title="Kullanım Şartları">Kullanım Şartları</a></li>
                <li><a href="#" className="hover:text-[#102477]" title="KVKK">KVKK Aydınlatma</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">© 2024 adoreGo. Site kargo firması vitrini değil, teknoloji lojistik platformudur.</p>
            <div className="flex items-center gap-6 opacity-20">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="Güvenli Ödeme - Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Güvenli Ödeme - Mastercard" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
