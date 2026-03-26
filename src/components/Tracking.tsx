
import React, { useState } from 'react';

const Tracking: React.FC = () => {
  const [trackingNo, setTrackingNo] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNo) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <section id="takip" className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-[#4DB848] font-bold text-[9px] uppercase tracking-[0.2em] mb-4 block">CANLI TAKİP</span>
        <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] mb-8 tracking-tight">Gönderini Takip Et</h2>
        
        <div className="bg-white p-2 rounded-[10px] shadow-xl border border-slate-100 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Kargo Takip Numarasını Giriniz (Örn: ADG12345678)" 
            value={trackingNo}
            onChange={(e) => setTrackingNo(e.target.value)}
            className="flex-grow px-6 py-4 rounded-[8px] bg-slate-50 border border-slate-50 outline-none focus:border-[#4DB848] font-bold text-sm text-[#102477] transition-all"
          />
          <button 
            onClick={handleTrack}
            className="bg-[#102477] text-white px-10 py-4 rounded-[8px] font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-3 shrink-0"
          >
            {isSearching ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-search"></i>}
            Sorgula
          </button>
        </div>

        {showResult && (
          <div className="mt-12 bg-white p-8 rounded-[10px] shadow-lg border border-[#4DB848]/20 animate-fade-in text-left max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-50">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">TAKİP NO</p>
                <p className="text-lg font-bold text-[#102477] uppercase">{trackingNo}</p>
              </div>
              <div className="text-right">
                <span className="bg-[#4DB848] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Yolda</span>
              </div>
            </div>
            <div className="space-y-8 relative">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-100"></div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#4DB848] flex items-center justify-center text-white ring-4 ring-white">
                  <i className="fas fa-check text-[10px]"></i>
                </div>
                <p className="font-bold text-[#102477] text-sm">Transfer Merkezinde</p>
                <p className="text-slate-400 text-xs font-medium">İstanbul - 22 May 2024, 14:30</p>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-white ring-4 ring-white">
                  <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                </div>
                <p className="font-bold text-slate-400 text-sm">Gümrük İşlemleri</p>
                <p className="text-slate-300 text-xs font-medium">Bekleniyor</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-8 opacity-40">
           <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
              <i className="fas fa-shield-alt"></i> Güvenli Sorgulama
           </div>
           <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
              <i className="fas fa-clock"></i> 7/24 Canlı Destek
           </div>
        </div>
      </div>
    </section>
  );
};

export default Tracking;
