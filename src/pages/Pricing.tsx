import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api-config';

function deepMerge(defaults: any, override: any): any {
    if (override === null || override === undefined) return defaults;
    if (Array.isArray(defaults)) return Array.isArray(override) && override.length > 0 ? override : defaults;
    if (typeof override === 'string') return override !== '' ? override : (defaults ?? override);
    if (typeof override !== 'object' || typeof defaults !== 'object') return override ?? defaults;
    const result = { ...defaults };
    for (const key of Object.keys(override)) {
        if (override[key] !== null && override[key] !== undefined) {
            result[key] = deepMerge(defaults[key], override[key]);
        }
    }
    return result;
}

const Pricing: React.FC = () => {
    const { currentLang } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const getDefault = () => ({
        badge: currentLang === 'tr' ? 'FİYAT LİSTESİ' : 'PRICE LIST',
        title: currentLang === 'tr' ? 'Ülkelere Göre Kargo Fiyatları' : 'Shipping Prices by Country',
        description: currentLang === 'tr' ? 'Güncel kargo fiyatlarımızı ülke bazlı inceleyebilirsiniz.' : 'You can review our current shipping prices on a country basis.',
        countries: [],
    });

    const [content, setContent] = useState<any>(getDefault());

    useEffect(() => {
        setContent(getDefault());
        axios.get(`${API_BASE_URL}/content/pricing?lang=${currentLang}`)
            .then(res => {
                if (res.data && Object.keys(res.data).length > 0) {
                    setContent(deepMerge(getDefault(), res.data));
                }
            })
            .catch(err => console.error('Pricing content yüklenemedi:', err))
            .finally(() => setLoading(false));
    }, [currentLang]);

    const filteredCountries = content.countries?.filter((c: any) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="flex flex-col min-h-screen">
            <SEO page="pricing" />
            <Navbar />
            <main className="flex-grow pt-20">
                {/* Compact Professional Header */}
                <section
                    className="text-white relative flex items-center"
                    style={{
                        background: 'linear-gradient(to right, #0051ba, #003d99)',
                        paddingTop: '100px',
                        paddingBottom: '60px'
                    }}
                >
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-3xl font-bold">{content.title}</h1>
                            <nav className="flex items-center gap-2 text-sm opacity-80">
                                <Link to="/" className="hover:opacity-100">{currentLang === 'tr' ? 'Anasayfa' : 'Home'}</Link>
                                <span>/</span>
                                <span>{currentLang === 'tr' ? 'Fiyatlar' : 'Pricing'}</span>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="py-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="bg-white rounded-[40px] shadow-sm p-12 border border-gray-100 mb-12">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                                <div className="max-w-2xl">
                                    <span className="text-[#4DB848] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">{content.badge}</span>
                                    <h1 className="text-4xl lg:text-5xl font-bold text-[#102477] mb-6 leading-tight">{content.title}</h1>
                                    <p className="text-gray-600 text-lg leading-relaxed font-medium">{content.description}</p>
                                </div>

                                <div className="relative min-w-[300px]">
                                    <input
                                        type="text"
                                        placeholder={currentLang === 'tr' ? "Ülke ara..." : "Search country..."}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-6 py-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-[#4DB848] focus:border-transparent transition-all outline-none pl-12 bg-gray-50 font-medium"
                                    />
                                    <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-separate border-spacing-y-2">
                                    <thead>
                                        <tr>
                                            <th className="py-4 px-6 text-[#102477]/50 font-bold uppercase text-[11px] tracking-widest">{currentLang === 'tr' ? 'ÜLKE' : 'COUNTRY'}</th>
                                            <th className="py-4 px-6 text-[#102477]/50 font-bold uppercase text-[11px] tracking-widest">{currentLang === 'tr' ? 'FİYAT' : 'PRICE'}</th>
                                            <th className="py-4 px-6 text-[#102477]/50 font-bold uppercase text-[11px] tracking-widest">{currentLang === 'tr' ? 'TESLİMAT SÜRESİ' : 'DELIVERY TIME'}</th>
                                            <th className="py-4 px-6 text-right"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCountries.length > 0 ? (
                                            filteredCountries.map((country: any, idx: number) => (
                                                <tr key={idx} className="group">
                                                    <td className="py-6 px-6 font-bold text-gray-800 bg-gray-50 rounded-l-2xl group-hover:bg-[#102477]/5 transition-colors">{country.name}</td>
                                                    <td className="py-6 px-6 bg-gray-50 group-hover:bg-[#102477]/5 transition-colors">
                                                        <span className="text-[#4DB848] font-bold text-xl">{country.price}</span>
                                                        <span className="text-xs ml-1 text-gray-400 font-bold">{country.currency || '€'}</span>
                                                    </td>
                                                    <td className="py-6 px-6 text-gray-500 font-medium bg-gray-50 group-hover:bg-[#102477]/5 transition-colors">
                                                        <i className="far fa-clock mr-2 text-[#4DB848]"></i>
                                                        {country.time}
                                                    </td>
                                                    <td className="py-6 px-6 text-right bg-gray-50 rounded-r-2xl group-hover:bg-[#102477]/5 transition-colors">
                                                        <a
                                                            href={country.url || 'https://app.adorelgo.com'}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-block bg-[#102477] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#0a1a5a] transition-all transform hover:scale-105 active:scale-95 shadow-md"
                                                        >
                                                            {currentLang === 'tr' ? 'ŞİMDİ GÖNDER' : 'SEND NOW'}
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="py-12 text-center text-gray-400 font-medium italic">
                                                    {currentLang === 'tr' ? 'Sonuç bulunamadı...' : 'No results found...'}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Pricing;
