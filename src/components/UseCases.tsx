
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../api-config';

const UseCases: React.FC = () => {
  const { currentLang } = useLanguage();

  const getDefault = (lang: string) => ({
    title: lang === 'tr' ? 'Kullananlar' : 'Users',
    highlightedTitle: lang === 'tr' ? 'Bırakmıyor' : "Don't Leave",
    items: [
      {
        id: '1',
        title: lang === 'tr' ? 'Her Gün Aktif Gönderileri Olanlar' : 'Those with Daily Active Shipments',
        description: lang === 'tr' ? 'Günlük yüksek hacimli gönderimlerinizi kolayca yönetin.' : 'Easily manage your high-volume daily shipments.',
        icon: 'fa-truck-fast',
        color: 'bg-blue-500',
      },
      {
        id: '2',
        title: lang === 'tr' ? 'Birçok Ülkeye Düzenli Gönderim Yapanlar' : 'Those who Ship Regularly to Many Countries',
        description: lang === 'tr' ? 'Çok destinasyonlu gönderimlerinizi tek panelden takip edin.' : 'Track your multi-destination shipments from a single panel.',
        icon: 'fa-globe',
        color: 'bg-green-500',
      },
    ],
  });

  const [data, setData] = useState<any>(getDefault(currentLang));

  useEffect(() => {
    axios.get(`${API_BASE_URL}/content/usecases?lang=${currentLang}`)
      .then(res => {
        if (res.data && res.data.items?.length > 0) setData(res.data);
        else setData(getDefault(currentLang));
      })
      .catch(() => setData(getDefault(currentLang)));
  }, [currentLang]);

  return (
    <section className="pb-8 md:pb-24 pt-5 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            <span className="text-[#102477]">{data.title} </span>
            <span className="text-[#4DB848]">{data.highlightedTitle}</span>
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {(data.items || []).map((item: any, idx: number) => (
            <div key={item.id || idx} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 flex flex-col items-center text-center">
              <div className={`w-14 h-14 ${item.color || 'bg-blue-500'} rounded-xl flex items-center justify-center mb-6 text-white`}>
                <i className={`fas ${item.icon || 'fa-box'} text-xl`}></i>
              </div>
              <h3 className="text-base font-bold text-[#102477] mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
