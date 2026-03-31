import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';

const ReturnShippingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <SEO page="yurtdisi-iade-geri-gonderi" />
      <Navbar />
      <main className="flex-grow pt-20">

        {/* Hero */}
        <section className="text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #102477 0%, #1a3a9e 50%, #102477 100%)', paddingTop: '28px', paddingBottom: '24px' }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4DB848] rounded-full blur-[120px] -mr-48 -mt-48"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
            <nav className="flex items-center gap-2 text-sm opacity-60 mb-6">
              <Link to="/" className="hover:opacity-100">Anasayfa</Link>
              <span>/</span>
              <Link to="/yurtdisi-kargo" className="hover:opacity-100">Yurtdışı Kargo</Link>
              <span>/</span>
              <span>Yurtdışı İade & Geri Gönderim</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Yurtdışı İade & Geri Gönderim</h1>
            <p className="text-white/70 text-lg max-w-2xl">Teslim edilemeyen ya da iade edilen yurtdışı gönderilerinde süreci biz yönetiriz. Paniklemene gerek yok.</p>
          </div>
        </section>

        {/* Giriş */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-rotate-left text-purple-600 text-2xl"></i>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight mb-4">İade Süreci Kontrol Altında</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Teslim edilemeyen yurtdışı gönderilerde iade ve geri gönderim süreci adım adım takip edilir. İade veya geri dönüş durumları panelden görülebilir.</p>
          </div>
        </section>

        {/* İade Senaryoları */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#102477] text-center mb-10">Hangi Durumlarda İade Olur?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: 'fa-user-xmark', color: 'bg-red-500', title: 'Alıcı Bulunamadı', desc: 'Alıcıya ulaşılamaz ya da teslim almazsa, kargo belirli süre sonra gönderildiği adrese iade edilir.' },
                { icon: 'fa-ban', color: 'bg-orange-500', title: 'Gümrükte Ret', desc: 'Hedef ülke gümrüğünde kargo kabul edilmezse, sistem seni bilgilendirir ve iade sürecini başlatır.' },
                { icon: 'fa-house-circle-xmark', color: 'bg-yellow-500', title: 'Yanlış Adres', desc: 'Adres hatalıysa kargo teslim edilemez. Sistem seni uyarır, adres düzeltme veya iade seçenekleri sunulur.' },
                { icon: 'fa-rotate-left', color: 'bg-purple-500', title: 'Alıcı İadesi', desc: 'Alıcı ürünü iade etmek isterse, yurtdışından Türkiye\'ye geri gönderim süreci panelden yönetilir.' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 flex gap-5 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <i className={`fas ${item.icon} text-white text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#102477] mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* İade Süreci */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#102477] text-center mb-10">İade Süreci Nasıl İşler?</h2>
            <div className="space-y-6">
              {[
                { step: '1', icon: 'fa-bell', color: 'bg-blue-500', title: 'Bildirim Al', desc: 'Kargon teslim edilemediğinde ya da iade başlatıldığında sana otomatik bildirim gönderilir.' },
                { step: '2', icon: 'fa-list-check', color: 'bg-green-500', title: 'Seçenek Sun', desc: 'Yeni adrese yönlendirme, bekleme süresi uzatma veya iade — sistem sana seçenekler sunar.' },
                { step: '3', icon: 'fa-map-location-dot', color: 'bg-orange-500', title: 'Takip Et', desc: 'İade kargosu yola çıktığında panelden anlık olarak takip edebilirsin.' },
                { step: '4', icon: 'fa-box-open', color: 'bg-purple-500', title: 'Teslim Al', desc: 'Kargo Türkiye\'deki adresine ulaştığında bildirim alırsın. Süreç tamamlanır.' },
              ].map((item) => (
                <div key={item.step} className="bg-slate-50 rounded-2xl p-6 border border-gray-100 flex gap-5 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <i className={`fas ${item.icon} text-white text-lg`}></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Adım {item.step}</div>
                    <h3 className="font-bold text-[#102477] text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Güvence */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: 'fa-shield-halved', color: 'bg-blue-500', title: 'Sigorta Kapsamı', desc: 'Tüm gönderiler sigortalıdır. İade sürecinde de sigorta geçerliliğini korur.' },
                { icon: 'fa-headset', color: 'bg-green-500', title: '7/24 Destek', desc: 'İade sürecinde sorularını 7/24 destek hattımıza iletebilirsin.' },
                { icon: 'fa-clock-rotate-left', color: 'bg-purple-500', title: 'Hızlı İşlem', desc: 'İade taleplerinde en hızlı şekilde işlem başlatılır, bekleme süresi minimuma indirilir.' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 text-center hover:shadow-lg transition-all">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-5`}>
                    <i className={`fas ${item.icon} text-white text-lg`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-[#102477] mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-[#102477] to-[#1a3a9e] text-white text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">Sorun Çıkarsa Biz Varız</h2>
            <p className="text-white/70 text-lg mb-8">İade ve geri gönderim süreçlerinde destek almak için bize ulaş.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.adorelgo.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#4DB848] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3da03a] transition-all hover:-translate-y-1 shadow-lg text-base">
                Panele Git
                <i className="fas fa-arrow-right"></i>
              </a>
              <Link to="/iletisim"
                className="inline-flex items-center justify-center gap-3 bg-white/10 text-white font-bold px-10 py-4 rounded-xl hover:bg-white/20 transition-all text-base">
                İletişime Geç
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ReturnShippingPage;
