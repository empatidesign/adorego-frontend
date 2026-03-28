import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SolutionsCta: React.FC = () => {
  const { currentLang } = useLanguage();

  const subDescription = currentLang === 'tr'
    ? 'Yurtiçi, yurtdışı ve tahsilatlı tüm gönderimler tek panelde'
    : 'All domestic, international and cash-on-delivery shipments in one panel';

  const ctaText = currentLang === 'tr' ? 'Gönderi Oluştur' : 'Create Shipment';
  const ctaLink = '/gonderi-olustur';

  return (
    <section className="bg-white pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#102477] to-[#1a3a9e] rounded-2xl px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-2">
              {currentLang === 'tr' ? 'Tüm gönderimler' : 'All shipments'}
            </p>
            <p className="text-white text-xl md:text-2xl font-bold max-w-lg leading-snug">
              {subDescription}
            </p>
          </div>
          <a
            href={ctaLink}
            className="shrink-0 bg-[#4DB848] text-white px-10 py-4 rounded-[14px] font-bold text-base hover:bg-[#3da339] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] duration-300 whitespace-nowrap"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default SolutionsCta;
