import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import WhatsAppButton from '../components/WhatsAppButton';
import { contentAPI } from '../admin/services/api';
import { useLanguage } from '../contexts/LanguageContext';

function deepMerge(defaults: any, override: any): any {
  if (override === null || override === undefined) return defaults;
  if (typeof override === 'string') return override !== '' ? override : (defaults ?? override);
  if (Array.isArray(override)) return override.length > 0 ? override : defaults;
  if (typeof override === 'object') {
    const result: any = { ...defaults };
    for (const key of Object.keys(override)) {
      result[key] = deepMerge(defaults?.[key], override[key]);
    }
    return result;
  }
  return override;
}

const getDefault = (lang: 'tr' | 'en') => (
  lang === 'tr'
    ? {
        hero: {
          title: 'Hakkımızda',
          subtitle: "AdorelGo'yu yakından tanıyın",
        },
        intro: 'AdorelGo, e-ticaret yapan işletmelerin ve bireysel kullanıcıların yurtiçi ve yurtdışı kargo süreçlerini kolaylaştırmak için geliştirilmiş bir lojistik teknolojileri platformudur.',
        whatWeDo: {
          title: 'Ne Yapıyoruz?',
          items: [
            'Yurtiçi ve yurtdışı kargo gönderimlerini tek panelden yönetiyoruz.',
            'Farklı kargo firmalarının fiyatlarını karşılaştırıp en uygun seçeneği sunuyoruz.',
            'E-ticaret entegrasyonları ile sipariş süreçlerini otomatikleştiriyoruz.',
            'Mikro ihracat süreçlerini kolaylaştırıyoruz.',
            'Kapıdan alım ve kapıya teslim hizmeti sağlıyoruz.',
          ],
        },
        vision: {
          title: 'Vizyonumuz',
          text: 'Kargo süreçlerini herkes için erişilebilir hale getirmek.',
        },
        mission: {
          title: 'Misyonumuz',
          text: 'Kullanıcıların kargo süreçlerinde zaman, maliyet ve operasyon yükünü azaltmak.',
        },
        whyUs: {
          title: 'Neden AdorelGo?',
          items: [
            '35+ yıl lojistik tecrübesi',
            'Şeffaf fiyatlandırma',
            'Tek panel ile tüm kargo süreçlerini yönetme',
            'Güçlü e-ticaret entegrasyonları',
            'Global kargo ortaklıkları',
          ],
        },
        difference: {
          title: 'Bizim Farkımız',
          text: 'AdorelGo, akıllı sistemi sayesinde kullanıcıların ihtiyacına göre en doğru kargo seçeneğini otomatik olarak belirler. Fiyat, hız, güvenilirlik ve teslimat süresi gibi kriterleri analiz ederek size en uygun çözümü sunar.',
        },
        future: {
          title: 'Geleceğe Bakış',
          text: 'AdorelGo olarak, lojistik sektöründe dijital dönüşümün öncüsü olmayı hedefliyoruz. Yapay zeka destekli rota optimizasyonu, otomatik gümrük süreçleri ve genişleyen global ağımız ile kullanıcılarımıza her geçen gün daha iyi bir deneyim sunmak için çalışıyoruz.',
        },
        cta: {
          text: 'Hemen Başla',
          url: 'https://app.adorelgo.com',
        },
        breadcrumbLabel: 'Anasayfa',
        seoTitle: 'Hakkımızda | AdorelGo',
        seoDescription: 'AdorelGo hakkında bilgi edinin. Misyonumuz, vizyonumuz ve ekibimiz.',
      }
    : {
        hero: {
          title: 'About Us',
          subtitle: 'Get to know AdorelGo better',
        },
        intro: 'AdorelGo is a logistics technology platform developed to simplify domestic and international shipping processes for e-commerce businesses and individual users.',
        whatWeDo: {
          title: 'What We Do',
          items: [
            'We manage domestic and international shipments from a single panel.',
            'We compare rates from different carriers and present the best option.',
            'We automate order processes with e-commerce integrations.',
            'We simplify micro-export operations.',
            'We provide door pickup and door delivery services.',
          ],
        },
        vision: {
          title: 'Our Vision',
          text: 'To make shipping processes accessible to everyone.',
        },
        mission: {
          title: 'Our Mission',
          text: 'To reduce time, cost, and operational burden in our users’ shipping processes.',
        },
        whyUs: {
          title: 'Why AdorelGo?',
          items: [
            '35+ years of logistics experience',
            'Transparent pricing',
            'Manage all shipping processes from a single panel',
            'Strong e-commerce integrations',
            'Global shipping partnerships',
          ],
        },
        difference: {
          title: 'What Makes Us Different',
          text: 'Thanks to its smart system, AdorelGo automatically determines the most suitable shipping option based on the user’s needs. By analyzing criteria such as price, speed, reliability, and delivery time, it offers the best solution for you.',
        },
        future: {
          title: 'Looking Ahead',
          text: 'At AdorelGo, we aim to be a pioneer of digital transformation in the logistics sector. With AI-supported route optimization, automated customs processes, and our expanding global network, we work every day to provide a better experience for our users.',
        },
        cta: {
          text: 'Get Started',
          url: 'https://app.adorelgo.com',
        },
        breadcrumbLabel: 'Home',
        seoTitle: 'About Us | AdorelGo',
        seoDescription: 'Learn more about AdorelGo. Our mission, vision, and approach to logistics technology.',
      }
);

const AboutUs: React.FC = () => {
  const { currentLang } = useLanguage();
  const defaults = getDefault(currentLang);
  const [data, setData] = useState(defaults);

  useEffect(() => {
    setData(defaults);
    contentAPI.getAbout(currentLang).then(res => {
      setData(deepMerge(defaults, res.data ?? res));
    }).catch(() => {});
  }, [currentLang]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <SEO page="hakkimizda" customTitle={defaults.seoTitle} customDescription={defaults.seoDescription} />
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Header */}
        <section className="text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #102477 0%, #1a3a9e 50%, #102477 100%)', paddingTop: '28px', paddingBottom: '24px' }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4DB848] rounded-full blur-[120px] -mr-48 -mt-48"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
            <nav className="flex items-center gap-2 text-sm opacity-60 mb-6">
              <Link to="/" className="hover:opacity-100">{defaults.breadcrumbLabel}</Link>
              <span>/</span>
              <span>{data.hero.title}</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{data.hero.title}</h1>
            <p className="text-white/70 text-lg max-w-2xl">{data.hero.subtitle}</p>
          </div>
        </section>

        {/* Tanıtım */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <p className="text-gray-600 text-lg leading-relaxed mb-10">{data.intro}</p>

            {/* Ne Yapıyoruz? */}
            <h2 className="text-3xl font-bold text-[#102477] tracking-tight mb-6">{data.whatWeDo.title}</h2>
            <div className="space-y-4 mb-16">
              {data.whatWeDo.items.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <i className="fas fa-check text-[#4DB848] mt-1"></i>
                  <p className="text-gray-700 text-base">{item}</p>
                </div>
              ))}
            </div>

            {/* Vizyon & Misyon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-slate-50 rounded-2xl p-10 border border-gray-100">
                <div className="w-14 h-14 bg-[#102477] rounded-xl flex items-center justify-center mb-6">
                  <i className="fas fa-eye text-white text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#102477] mb-3">{data.vision.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{data.vision.text}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-10 border border-gray-100">
                <div className="w-14 h-14 bg-[#4DB848] rounded-xl flex items-center justify-center mb-6">
                  <i className="fas fa-bullseye text-white text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#102477] mb-3">{data.mission.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{data.mission.text}</p>
              </div>
            </div>

            {/* Neden AdorelGo? */}
            <h2 className="text-3xl font-bold text-[#102477] tracking-tight mb-6">{data.whyUs.title}</h2>
            <div className="space-y-4 mb-16">
              {data.whyUs.items.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <i className="fas fa-check text-[#4DB848] mt-1"></i>
                  <p className="text-gray-700 text-base">{item}</p>
                </div>
              ))}
            </div>

            {/* Bizim Farkımız */}
            <div className="bg-gradient-to-r from-[#102477] to-[#1a3a9e] rounded-2xl p-10 text-white mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">{data.difference.title}</h2>
              <p className="text-white/80 text-base leading-relaxed">{data.difference.text}</p>
            </div>

            {/* Geleceğe Bakış */}
            <h2 className="text-3xl font-bold text-[#102477] tracking-tight mb-6">{data.future.title}</h2>
            <p className="text-gray-600 text-base leading-relaxed mb-16">{data.future.text}</p>

            {/* CTA */}
            <div className="text-center">
              <a
                href={data.cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#4DB848] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#3da03a] transition-all hover:-translate-y-1 shadow-lg text-base"
              >
                {data.cta.text}
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AboutUs;
