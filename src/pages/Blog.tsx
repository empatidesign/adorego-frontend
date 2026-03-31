import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { blogAPI } from '../admin/services/api';
import { API_BASE_URL } from '../api-config';

const Blog: React.FC = () => {
    const { language } = useLanguage();
    const [searchParams] = useSearchParams();
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

    useEffect(() => {
        loadBlogs();
    }, [language]);

    const loadBlogs = async () => {
        try {
            const data = await blogAPI.getBlogs(language);
            // Only show published blogs
            const publishedBlogs = Array.isArray(data) ? data.filter((blog: any) => blog.isPublished) : [];
            setBlogs(publishedBlogs);
        } catch (error) {
            console.error('Blog yüklenemedi:', error);
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { value: 'all', labelTR: 'Tümü', labelEN: 'All' },
        { value: 'yurtdisi-kargo', labelTR: 'Yurtdışı Kargo', labelEN: 'International Shipping' },
        { value: 'yurtici-kargo', labelTR: 'Yurtiçi Kargo', labelEN: 'Domestic Shipping' },
        { value: 'e-ticaret', labelTR: 'E-Ticaret', labelEN: 'E-Commerce' },
        { value: 'lojistik', labelTR: 'Lojistik', labelEN: 'Logistics' },
        { value: 'rehber', labelTR: 'Rehber', labelEN: 'Guide' },
    ];

    const filteredBlogs = blogs.filter(blog => {
        const title = language === 'tr' ? blog.titleTR : blog.titleEN;
        const excerpt = language === 'tr' ? blog.excerptTR : blog.excerptEN;
        const matchesSearch = title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-gray-600">Yükleniyor...</div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <SEO page="blog" />
            <Navbar />

            <main className="flex-grow pt-20">
                {/* Compact Professional Header */}
                <section
                    className="text-white relative flex items-center"
                    style={{
                        background: 'linear-gradient(to right, #0051ba, #003d99)',
                        paddingTop: '28px',
                        paddingBottom: '24px'
                    }}
                >
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-3xl font-bold">
                                {language === 'tr' ? 'Blog' : 'Blog'}
                            </h1>
                            <nav className="flex items-center gap-2 text-sm opacity-80">
                                <Link to="/" className="hover:opacity-100">
                                    {language === 'tr' ? 'Anasayfa' : 'Home'}
                                </Link>
                                <span>/</span>
                                <span>{language === 'tr' ? 'Blog' : 'Blog'}</span>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* Search and Filter */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={language === 'tr' ? 'Blog yazılarında ara...' : 'Search blog posts...'}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="flex gap-2 overflow-x-auto">
                                {categories.map(cat => (
                                    <button
                                        key={cat.value}
                                        onClick={() => setSelectedCategory(cat.value)}
                                        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedCategory === cat.value
                                            ? 'bg-[#102477] text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {language === 'tr' ? cat.labelTR : cat.labelEN}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    {filteredBlogs.length === 0 ? (
                        <div className="text-center py-20">
                            <i className="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                            <p className="text-xl text-gray-500">
                                {language === 'tr' ? 'Blog yazısı bulunamadı' : 'No blog posts found'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBlogs.map((blog) => {
                                const title = language === 'tr' ? blog.titleTR : blog.titleEN;
                                const excerpt = language === 'tr' ? blog.excerptTR : blog.excerptEN;

                                return (
                                    <Link
                                        key={blog.id}
                                        to={`/blog/${blog.slug}`}
                                        className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                                    >
                                        {/* Featured Image */}
                                        {blog.featuredImage ? (
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={blog.featuredImage?.startsWith('http') ? blog.featuredImage : `${API_BASE_URL}${blog.featuredImage}`}
                                                    alt={title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        ) : (
                                            <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                <i className="fas fa-newspaper text-6xl text-white/50"></i>
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-6">
                                            {/* Category Badge */}
                                            <div className="mb-3">
                                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                                    {categories.find(c => c.value === blog.category)?.[language === 'tr' ? 'labelTR' : 'labelEN'] || blog.category}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {title}
                                            </h2>

                                            {/* Excerpt */}
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {excerpt}
                                            </p>

                                            {/* Meta */}
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <span className="flex items-center gap-2">
                                                    <i className="fas fa-user"></i>
                                                    {blog.author || 'AdorelGo'}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <i className="fas fa-calendar"></i>
                                                    {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US') : ''}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Blog;
