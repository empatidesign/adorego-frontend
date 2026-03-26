import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api-config';

const ContentPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { currentLang } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState<any>({
        title: '',
        description: '',
        sections: []
    });

    useEffect(() => {
        if (!slug) return;

        axios.get(`${API_BASE_URL}/content/page/${slug}?lang=${currentLang}`)
            .then(res => {
                if (res.data && Object.keys(res.data).length > 0) {
                    setContent(res.data);
                }
            })
            .catch(err => console.error('Page content yüklenemedi:', err))
            .finally(() => setLoading(false));
    }, [slug, currentLang]);

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <Navbar />
                <main className="flex-grow pt-32 pb-24 flex items-center justify-center">
                    <div className="text-gray-600">Yükleniyor...</div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Dynamic SEO */}
            {content.seo && (
                <>
                    <title>{content.title}</title>
                    <meta name="description" content={content.seo.metaDescription || content.description} />
                    {content.seo.keywords && <meta name="keywords" content={content.seo.keywords} />}
                </>
            )}
            <SEO page={slug || 'content'} />
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
                                <Link to="/" className="hover:opacity-100">
                                    {currentLang === 'tr' ? 'Anasayfa' : 'Home'}
                                </Link>
                                <span>/</span>
                                <span>{content.title}</span>
                            </nav>
                        </div>
                    </div>
                </section>

                <div className="py-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        {content.description && (
                            <div className="mb-12">
                                <p className="text-lg text-gray-700 max-w-3xl leading-relaxed font-medium">
                                    {content.description}
                                </p>
                            </div>
                        )}

                        {/* Content Sections */}
                        <div className="prose prose-lg max-w-none">
                            {content.sections?.map((section: any, idx: number) => (
                                <div key={idx} className="mb-12">
                                    {section.type === 'text' && (
                                        <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
                                    )}

                                    {section.type === 'heading' && (
                                        <h2 className="text-2xl font-bold text-[#102477] mb-4 mt-8">{section.content}</h2>
                                    )}

                                    {section.type === 'list' && (
                                        <ul className="space-y-3 ml-6">
                                            {section.items?.map((item: string, i: number) => (
                                                <li key={i} className="text-gray-700 flex items-start gap-3">
                                                    <i className="fas fa-check-circle text-[#4DB848] mt-1"></i>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {section.type === 'image' && (
                                        <div className="my-8">
                                            <img
                                                src={section.url}
                                                alt={section.alt || ''}
                                                className="rounded-xl shadow-lg w-full max-w-3xl mx-auto"
                                            />
                                            {section.caption && (
                                                <p className="text-center text-sm text-gray-500 mt-3">{section.caption}</p>
                                            )}
                                        </div>
                                    )}

                                    {section.type === 'card-grid' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                                            {section.cards?.map((card: any, i: number) => (
                                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                                    {card.icon && (
                                                        <div className="w-12 h-12 bg-[#4DB848]/10 rounded-lg flex items-center justify-center mb-4">
                                                            <i className={`fas ${card.icon} text-[#4DB848] text-xl`}></i>
                                                        </div>
                                                    )}
                                                    <h3 className="text-lg font-bold text-[#102477] mb-2">{card.title}</h3>
                                                    <p className="text-gray-600 text-sm">{card.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContentPage;
