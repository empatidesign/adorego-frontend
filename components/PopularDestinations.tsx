
import React from 'react';

const PopularDestinations: React.FC = () => {
  const destinations = [
    {
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070",
      name: "Almanya",
      price: "12.50",
      tag: "Express Servis"
    },
    {
      image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2070",
      name: "ABD",
      price: "24.90",
      tag: "Ekonomik"
    },
    {
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070",
      name: "İngiltere",
      price: "18.00",
      tag: "Sık Gönderilen"
    },
    {
      image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2070",
      name: "Hollanda",
      price: "11.20",
      tag: "Kolay Gümrük"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#4DB848] font-bold text-[9px] uppercase tracking-[0.2em] mb-3 block">POPÜLER ÜLKELER</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#102477] tracking-tight">Dünyaya Bizimle Ulaşın.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, idx) => (
            <div key={idx} className="group relative h-[380px] rounded-[10px] overflow-hidden cursor-pointer shadow-md bg-white">
              <img src={dest.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" alt={dest.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102477] via-[#102477]/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-6 w-full z-10">
                <span className="bg-[#4DB848] text-white text-[8px] font-bold px-2.5 py-1 rounded-[5px] uppercase tracking-wider mb-2.5 inline-block">
                  {dest.tag}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight uppercase">{dest.name}</h3>
                
                <div className="flex items-center justify-between mt-3">
                   <div className="flex flex-col">
                      <p className="text-white/70 text-[8px] font-bold uppercase tracking-widest leading-none mb-1">Başlangıç</p>
                      <p className="text-[#4DB848] text-xl font-bold">{dest.price}<span className="text-xs ml-0.5 font-bold text-white">€</span></p>
                   </div>
                   <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-[5px] flex items-center justify-center text-white">
                      <i className="fas fa-arrow-right text-[10px]"></i>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
