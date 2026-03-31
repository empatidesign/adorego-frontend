import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../api-config';

const HomeCTA: React.FC = () => {
  const { currentLang } = useLanguage();

  const getDefault = (lang: string) => ({
    title: lang === 'tr' ? 'Sorun mu var? Kararsız mı kaldın?' : 'Have questions? Not sure yet?',
    subtitle: lang === 'tr' ? 'Destek ekibimiz yardımcı olsun.' : 'Let our support team help you.',
    buttonText: lang === 'tr' ? 'Ücretsiz Üye Ol' : 'Sign Up Free',
    buttonLink: 'https://app.adorelgo.com',
  });

  const [data, setData] = useState<any>(getDefault(currentLang));

  useEffect(() => {
    setData(getDefault(currentLang));
    axios.get(`${API_BASE_URL}/content/home-cta?lang=${currentLang}`)
      .then(res => {
        if (res.data?.title) setData(res.data);
      })
      .catch(() => {});
  }, [currentLang]);

  return (
    <section className="py-8 md:py-6 bg-gradient-to-r from-[#102477] to-[#1a3a9e] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4DB848] rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-[120px] -ml-48 -mb-48"></div>
      </div>
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
          {data.title}
        </h2>
        <p className="text-white/70 text-lg mb-10 font-medium">
          {data.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/iletisim"
            className="inline-flex items-center gap-3 bg-[#102477] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#0a1a5a] transition-all hover:-translate-y-1 shadow-xl text-lg border-2 border-white/20"
          >
            <i className="fas fa-headset"></i>
            {currentLang === 'tr' ? 'İletişime Geç' : 'Contact Us'}
          </a>
          <a
            href={data.buttonLink || 'https://app.adorelgo.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#4DB848] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3da03a] transition-all hover:-translate-y-1 shadow-xl text-lg"
          >
            <i className="fas fa-user-plus"></i>
            {currentLang === 'tr' ? 'Ücretsiz Üye Ol' : 'Sign Up Free'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeCTA;
