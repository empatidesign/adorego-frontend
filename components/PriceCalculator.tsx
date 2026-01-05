
import React, { useState } from 'react';
import { ShippingType, PriceQuote } from '../types';

const PriceCalculator: React.FC = () => {
  const [shippingType, setShippingType] = useState<ShippingType>(ShippingType.INTERNATIONAL);
  const [weight, setWeight] = useState<number>(1);
  const [country, setCountry] = useState<string>('Almanya');
  const [results, setResults] = useState<PriceQuote[] | null>(null);
  const [loading, setLoading] = useState(false);

  const calculatePrice = () => {
    setLoading(true);
    setTimeout(() => {
      const basePrice = shippingType === ShippingType.INTERNATIONAL ? 12 : 4;
      const multiplier = shippingType === ShippingType.INTERNATIONAL ? 2.2 : 0.7;
      
      const mockQuotes: PriceQuote[] = [
        { 
          service: 'Ekonomik Servis', 
          price: Math.round((basePrice + weight * multiplier) * 100) / 100, 
          currency: 'EUR', 
          deliveryTime: '5-7 İş Günü',
          type: 'cheapest'
        },
        { 
          service: 'Hızlı (Express) Servis', 
          price: Math.round((basePrice * 1.8 + weight * multiplier * 1.4) * 100) / 100, 
          currency: 'EUR', 
          deliveryTime: '1-3 İş Günü',
          type: 'fastest'
        }
      ];
      setResults(mockQuotes);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20" id="fiyat-hesapla">
      <div className="bg-white rounded-[10px] shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8 items-end">
            <div className="lg:col-span-2 space-y-1.5">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Varış Ülkesi</label>
              <div className="relative">
                <i className="fas fa-map-marker-alt absolute left-4 top-1/2 -translate-y-1/2 text-[#4DB848] text-sm"></i>
                <select 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full pl-10 pr-6 py-3 bg-slate-50 border border-slate-100 focus:border-[#4DB848] rounded-[10px] outline-none transition-all font-bold text-[#102477] text-sm appearance-none"
                >
                  <option>Almanya</option>
                  <option>İngiltere</option>
                  <option>Amerika Birleşik Devletleri</option>
                  <option>Fransa</option>
                  <option>Hollanda</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Ağırlık (KG)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 focus:border-[#4DB848] rounded-[10px] outline-none transition-all font-bold text-[#102477] text-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">KG</span>
              </div>
            </div>

            <button 
              onClick={calculatePrice}
              disabled={loading}
              className="bg-[#4DB848] text-white py-3 px-6 rounded-[10px] font-bold hover:bg-[#3da339] transition-all shadow-sm text-center flex items-center justify-center gap-3"
            >
              {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-calculator"></i>}
              Hesapla
            </button>
          </div>

          {/* Shipping Type Selection - Lowered Position */}
          <div className="flex bg-slate-50 p-1 rounded-[10px] mb-8 max-w-sm">
            <button 
              onClick={() => { setShippingType(ShippingType.INTERNATIONAL); setResults(null); }}
              className={`flex-1 py-2.5 rounded-[8px] font-bold text-xs transition-all ${shippingType === ShippingType.INTERNATIONAL ? 'bg-[#102477] text-white shadow-md' : 'text-slate-500 hover:text-[#102477]'}`}
            >
              <i className="fas fa-globe mr-2"></i> Yurtdışı
            </button>
            <button 
              onClick={() => { setShippingType(ShippingType.DOMESTIC); setResults(null); }}
              className={`flex-1 py-2.5 rounded-[8px] font-bold text-xs transition-all ${shippingType === ShippingType.DOMESTIC ? 'bg-[#102477] text-white shadow-md' : 'text-slate-500 hover:text-[#102477]'}`}
            >
              <i className="fas fa-truck mr-2"></i> Yurtiçi
            </button>
          </div>

          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
              {results.map((quote, idx) => (
                <div key={idx} className={`p-6 rounded-[10px] border transition-all ${quote.type === 'fastest' ? 'border-[#4DB848] bg-[#4DB848]/5' : 'border-slate-100 bg-white'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-[#102477] font-bold text-lg mb-0.5">{quote.service}</h4>
                      <p className="text-slate-400 text-[10px] font-bold flex items-center gap-1.5 uppercase tracking-wider">
                        <i className="far fa-clock text-[#4DB848]"></i> {quote.deliveryTime}
                      </p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-[#102477] mb-6">
                    {quote.price} <span className="text-sm font-bold uppercase">{quote.currency}</span>
                  </div>
                  <button className="w-full bg-[#102477] text-white py-3 rounded-[10px] font-bold text-sm hover:bg-black transition-all">
                    Hemen Gönder
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
