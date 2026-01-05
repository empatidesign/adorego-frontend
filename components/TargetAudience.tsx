
import React from 'react';

const TargetAudience: React.FC = () => {
  const trustPoints = [
    { title: "35 Yıllık Tecrübe", desc: "Yazılım ve teknoloji alanındaki derin birikimimizle yanınızdayız." },
    { title: "Net Fiyat Garantisi", desc: "Fiyatlar baştan nettir, sonradan sürpriz masraf çıkmaz." },
    { title: "Kontrollü Süreç", desc: "Teslim edilemeyen gönderiler dahil her an kontrol altındadır." },
    { title: "Tek Nokta Destek", desc: "Tüm süreçleriniz için tek bir muhatap ve hızlı çözüm." }
  ];

  return (
    <>
      {/* Gri Zemin - Yurtdışı Gönder Yurtiçi Ucuzlasın Bölümü */}
      <section className="py-24 bg-slate-100 text-[#102477] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4DB848]/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="lg:flex items-center justify-between gap-16">
            <div className="lg:w-1/2">
              <span className="text-[#4DB848] font-bold text-[9px] uppercase tracking-[0.2em] mb-4 block">GÖNDERDİKÇE KAZAN</span>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 tracking-tight leading-tight">
                Yurtdışı Gönder <br />
                <span className="text-[#4DB848]">Yurtiçi Ucuzlasın.</span>
              </h2>
              <p className="text-slate-600 text-lg font-medium mb-10 max-w-lg leading-relaxed">
                Yurtdışı gönderi yaptığınızda sistem sizi aktif kullanıcı olarak tanır ve yurtiçi kargo fiyatlarınız otomatik olarak avantajlı hale gelir.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 bg-white p-4 rounded-[10px] shadow-sm border border-slate-200">
                  <div className="w-8 h-8 bg-[#4DB848] rounded-[5px] flex items-center justify-center font-bold text-xs text-white">01</div>
                  <p className="font-semibold text-[13px] text-slate-700 tracking-tight">Sistem sizi otomatik tanır, başvuru gerekmez.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-[10px] shadow-sm border border-slate-200">
                  <div className="w-8 h-8 bg-[#4DB848] rounded-[5px] flex items-center justify-center font-bold text-xs text-white">02</div>
                  <p className="font-semibold text-[13px] text-slate-700 tracking-tight">Gönderi sayınız arttıkça fiyatlar kendiliğinden düşer.</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative bg-gradient-to-br from-[#102477] via-[#1a3a9e] to-[#4DB848] rounded-[20px] shadow-2xl p-8">
                {/* Üst Badge */}
                <div className="flex justify-between items-center mb-8">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[9px] font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-white/30">
                    Akıllı Fiyatlandırma
                  </span>
                  <span className="bg-[#4DB848] text-white text-[9px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                    AKTİF
                  </span>
                </div>

                {/* Ana İçerik - Ortada */}
                <div className="text-center my-12">
                  <div className="bg-white/10 backdrop-blur-md rounded-[20px] px-10 py-12 border border-white/30">
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-4">Standart</p>
                    
                    <div className="flex items-center justify-center gap-6 my-8">
                      <div className="w-20 h-1.5 bg-white/40 rounded-full"></div>
                      <i className="fas fa-arrow-right text-white text-3xl"></i>
                      <div className="w-20 h-1.5 bg-[#4DB848] rounded-full shadow-lg shadow-green-500/50"></div>
                    </div>
                    
                    <p className="text-white text-sm font-bold uppercase tracking-widest mb-12">Avantajlı Plus</p>
                    
                    <div className="pt-8 border-t border-white/30">
                      <p className="text-6xl font-black text-white mb-3 drop-shadow-lg">-%40</p>
                      <p className="text-[#4DB848] text-xs font-bold uppercase tracking-widest">
                        Yurtiçi Kargo İndirimi
                      </p>
                    </div>
                  </div>
                </div>

                {/* Alt Mini Kartlar */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-[16px] p-5 border border-white/30 text-center">
                    <i className="fas fa-shipping-fast text-[#4DB848] text-3xl mb-3"></i>
                    <p className="text-white text-xs font-bold">Hızlı Teslimat</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-[16px] p-5 border border-white/30 text-center">
                    <i className="fas fa-chart-line text-[#4DB848] text-3xl mb-3"></i>
                    <p className="text-white text-xs font-bold">Otomatik İndirim</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beyaz Zemin - Neden Bize Güvenmelisiniz Bölümü */}
      <section className="py-24 bg-white text-[#102477]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#102477]">
              Neden bize <span className="text-[#4DB848]">Güvenmelisiniz?</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((point, idx) => {
              const icons = ["fa-award", "fa-tags", "fa-shield-halved", "fa-headset"];
              const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"];
              return (
                <div 
                  key={idx} 
                  className="bg-white p-8 rounded-[16px] shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-slate-200 hover:-translate-y-2 group"
                >
                  <div className={`w-14 h-14 ${colors[idx]} rounded-[12px] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`fas ${icons[idx]} text-white text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-bold mb-3 tracking-tight text-[#102477] group-hover:text-[#4DB848] transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default TargetAudience;
