import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../api-config';

const SolutionsCta: React.FC = () => {
  const { currentLang } = useLanguage();

  const defaultSubDescription = currentLang === 'tr'
    ? 'Yurtiçi, yurtdışı ve tahsilatlı tüm gönderimler tek panelde'
    : 'All domestic, international and cash-on-delivery shipments in one panel';
  const defaultCtaText = currentLang === 'tr' ? 'Gönderi Oluştur' : 'Create Shipment';
  const defaultCtaLink = '/gonderi-olustur';

  const [subDescription, setSubDescription] = useState(defaultSubDescription);
  const [ctaText, setCtaText] = useState(defaultCtaText);
  const [ctaLink, setCtaLink] = useState(defaultCtaLink);

  useEffect(() => {
    const defDesc = currentLang === 'tr' ? 'Yurtiçi, yurtdışı ve tahsilatlı tüm gönderimler tek panelde' : 'All domestic, international and cash-on-delivery shipments in one panel';
    const defText = currentLang === 'tr' ? 'Gönderi Oluştur' : 'Create Shipment';
    setSubDescription(defDesc);
    setCtaText(defText);
    setCtaLink(defaultCtaLink);
    axios.get(`${API_BASE_URL}/content/solutions?lang=${currentLang}`)
      .then(res => {
        if (res.data) {
          setSubDescription(res.data.subDescription || defDesc);
          setCtaText(res.data.ctaButtonText || defText);
          setCtaLink(res.data.ctaButtonLink || defaultCtaLink);
        }
      })
      .catch(() => {});
  }, [currentLang]);

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
