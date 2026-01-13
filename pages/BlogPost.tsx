import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { blogAPI } from '../admin/services/api';
import { API_BASE_URL } from '../src/api-config';

const BlogPost: React.FC = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();
    const { language } = useLanguage();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);

    const [allBlogs, setAllBlogs] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Newsletter state
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterLoading, setNewsletterLoading] = useState(false);
    const [newsletterMessage, setNewsletterMessage] = useState('');
    const [newsletterSuccess, setNewsletterSuccess] = useState(false);

    useEffect(() => {
        if (slug) {
            loadBlog();
        }
    }, [slug, language]);

    const loadBlog = async () => {
        try {
            const data = await blogAPI.getBlog(slug!, language);
            setBlog(data);

            const blogs = await blogAPI.getBlogs(language);
            setAllBlogs(blogs);

            // Load related blogs (same category)
            if (data.category) {
                const related = blogs
                    .filter((b: any) => b.category === data.category && b.slug !== slug && b.isPublished)
                    .slice(0, 3);
                setRelatedBlogs(related);
            }
        } catch (error) {
            console.error('Blog yüklenemedi:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleSearchEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            navigate(`/blog?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newsletterEmail.trim()) {
            setNewsletterMessage(language === 'tr' ? 'Lütfen e-posta adresinizi girin' : 'Please enter your email');
            setNewsletterSuccess(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newsletterEmail)) {
            setNewsletterMessage(language === 'tr' ? 'Geçerli bir e-posta adresi girin' : 'Enter a valid email address');
            setNewsletterSuccess(false);
            return;
        }

        setNewsletterLoading(true);
        setNewsletterMessage('');

        try {
            const response = await fetch(`${API_BASE_URL}/content/newsletter/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: newsletterEmail }),
            });

            const data = await response.json();
            console.log('Newsletter response:', data);

            if (data.success) {
                setNewsletterMessage(language === 'tr' ? 'Başarıyla abone oldunuz!' : 'Successfully subscribed!');
                setNewsletterSuccess(true);
                setNewsletterEmail('');
            } else {
                setNewsletterMessage(language === 'tr' ? 'Bu e-posta zaten kayıtlı' : 'This email is already registered');
                setNewsletterSuccess(false);
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            setNewsletterMessage(language === 'tr' ? 'Bir hata oluştu, lütfen tekrar deneyin' : 'An error occurred, please try again');
            setNewsletterSuccess(false);
        } finally {
            setNewsletterLoading(false);
            // Clear message after 5 seconds
            setTimeout(() => {
                setNewsletterMessage('');
            }, 5000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <div className="text-gray-500 font-medium animate-pulse">
                            {language === 'tr' ? 'Yükleniyor...' : 'Loading...'}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="text-center px-4">
                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fas fa-exclamation-triangle text-3xl"></i>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {language === 'tr' ? 'Blog yazısı bulunamadı' : 'Blog post not found'}
                        </h1>
                        <p className="text-gray-600 mb-8">
                            {language === 'tr'
                                ? 'Aradığınız sayfa kaldırılmış veya taşınmış olabilir.'
                                : 'The page you are looking for might have been removed or moved.'}
                        </p>
                        <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all">
                            <i className="fas fa-arrow-left"></i>
                            {language === 'tr' ? 'Blog Anasayfasına Dön' : 'Back to Blog Home'}
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const title = language === 'tr' ? blog.titleTR : blog.titleEN;
    const content = language === 'tr' ? blog.contentTR : blog.contentEN;
    const metaTitle = language === 'tr' ? blog.seo?.metaTitleTR : blog.seo?.metaTitleEN;
    const metaDescription = language === 'tr' ? blog.seo?.metaDescriptionTR : blog.seo?.metaDescriptionEN;

    // Categories with counts
    const categoryCounts = allBlogs.reduce((acc: any, b: any) => {
        const cat = b.category || 'genel';
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
    }, {});

    const recentPosts = [...allBlogs]
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 5);

    const formatImage = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        // Backend now serves fixed URLs starting with /api/upload/images/
        // We need to ensure they point to the correct backend host
        return url.startsWith('/api') ? `${API_BASE_URL.replace('/api', '')}${url}` : `${API_BASE_URL}${url.startsWith('/') ? url : '/' + url}`;
    };

    return (
        <div className="bg-white min-h-screen pt-20">
            <SEO
                page="blog-post"
                title={metaTitle || title}
                description={metaDescription}
                keywords={blog.seo?.keywords?.join(', ')}
            />
            <Navbar />

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
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <nav className="flex items-center gap-2 text-sm opacity-80">
                            <Link to="/" className="hover:opacity-100">
                                {language === 'tr' ? 'Anasayfa' : 'Home'}
                            </Link>
                            <span>/</span>
                            <Link to="/blog" className="hover:opacity-100">
                                {language === 'tr' ? 'Blog' : 'Blog'}
                            </Link>
                            <span>/</span>
                            <span className="truncate max-w-[200px] md:max-w-none">{title}</span>
                        </nav>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <article>
                            {/* Featured Image */}
                            {blog.featuredImage && (
                                <div className="mb-10 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10">
                                    <img
                                        src={formatImage(blog.featuredImage)}
                                        alt={title}
                                        className="w-full h-auto object-cover max-h-[500px]"
                                    />
                                </div>
                            )}

                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-6 mb-8">
                                <span className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {blog.category}
                                </span>
                                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                    <i className="far fa-user"></i>
                                    <span>{blog.author || 'adoreGo'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                    <i className="far fa-calendar-alt"></i>
                                    <span>{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-8">
                                {title}
                            </h1>

                            {/* Content */}
                            <div
                                className="prose prose-lg prose-slate max-w-none 
                                    prose-headings:text-slate-900 prose-headings:font-black
                                    prose-p:text-slate-600 prose-p:leading-relaxed
                                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                                    prose-strong:text-slate-900 prose-img:rounded-3xl prose-img:shadow-lg
                                    break-words overflow-wrap-anywhere w-full overflow-hidden"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />

                            {/* Tags */}
                            {blog.seo?.keywords && blog.seo.keywords.length > 0 && (
                                <div className="mt-16 pt-8 border-t border-slate-100">
                                    <div className="flex items-center gap-4 mb-4">
                                        <i className="fas fa-tags text-slate-300"></i>
                                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                                            {language === 'tr' ? 'Etiketler' : 'Tags'}
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {blog.seo.keywords.map((keyword: string, index: number) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors cursor-default"
                                            >
                                                #{keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Social Share */}
                            <div className="mt-12 p-8 bg-slate-900 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                                <div className="z-10 text-center md:text-left">
                                    <h4 className="text-xl font-bold mb-1">
                                        {language === 'tr' ? 'Bu yazıyı beğendiniz mi?' : 'Did you like this article?'}
                                    </h4>
                                    <p className="text-slate-400 text-sm">
                                        {language === 'tr' ? 'Arkadaşlarınızla paylaşarak bize destek olabilirsiniz.' : 'You can support us by sharing it with your friends.'}
                                    </p>
                                </div>
                                <div className="flex gap-3 z-10">
                                    <button className="w-12 h-12 bg-white/10 hover:bg-blue-600 rounded-2xl flex items-center justify-center transition-all duration-300 group">
                                        <i className="fab fa-facebook-f text-lg group-hover:scale-110"></i>
                                    </button>
                                    <button className="w-12 h-12 bg-white/10 hover:bg-sky-400 rounded-2xl flex items-center justify-center transition-all duration-300 group">
                                        <i className="fab fa-twitter text-lg group-hover:scale-110"></i>
                                    </button>
                                    <button className="w-12 h-12 bg-white/10 hover:bg-blue-700 rounded-2xl flex items-center justify-center transition-all duration-300 group">
                                        <i className="fab fa-linkedin-in text-lg group-hover:scale-110"></i>
                                    </button>
                                    <button className="w-12 h-12 bg-white/10 hover:bg-green-500 rounded-2xl flex items-center justify-center transition-all duration-300 group">
                                        <i className="fab fa-whatsapp text-lg group-hover:scale-110"></i>
                                    </button>
                                </div>
                                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/20 blur-[60px] rounded-full"></div>
                            </div>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-10">
                        {/* Search Box */}
                        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                                {language === 'tr' ? 'Blogda Ara' : 'Search Blog'}
                            </h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleSearchEnter}
                                    placeholder={language === 'tr' ? 'Bir şeyler yazın...' : 'Search...'}
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-sm font-medium"
                                />
                                <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                                {language === 'tr' ? 'Kategoriler' : 'Categories'}
                            </h3>
                            <div className="space-y-2">
                                {Object.entries(categoryCounts).map(([cat, count]: [string, any]) => (
                                    <Link
                                        key={cat}
                                        to={`/blog?category=${cat}`}
                                        className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${blog.category === cat ? 'bg-blue-600 text-white' : 'bg-white hover:bg-blue-50 text-slate-600'
                                            }`}
                                    >
                                        <span className="font-bold text-sm capitalize">{cat.replace('-', ' ')}</span>
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${blog.category === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600'
                                            }`}>
                                            {count}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Recent Posts */}
                        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                                {language === 'tr' ? 'Son Yazılar' : 'Recent Posts'}
                            </h3>
                            <div className="space-y-6">
                                {recentPosts.map((post: any) => {
                                    const postTitle = language === 'tr' ? post.titleTR : post.titleEN;
                                    return (
                                        <Link
                                            key={post.id}
                                            to={`/blog/${post.slug}`}
                                            className="flex gap-4 group"
                                        >
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                                                <img
                                                    src={formatImage(post.featuredImage)}
                                                    alt={postTitle}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="py-1">
                                                <h4 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug mb-1">
                                                    {postTitle}
                                                </h4>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US') : ''}
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Newsletter CTA */}
                        <div className="bg-gradient-to-br from-[#102477] to-blue-600 p-8 rounded-[2rem] text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
                            <i className="fas fa-paper-plane absolute -right-4 -bottom-4 text-8xl text-white/10 -rotate-12"></i>
                            <h3 className="text-xl font-black mb-2 relative z-10">
                                {language === 'tr' ? 'Bültene Katılın' : 'Join Newsletter'}
                            </h3>
                            <p className="text-blue-100/80 text-sm mb-6 relative z-10">
                                {language === 'tr' 
                                    ? 'En yeni lojistik haberleri ve fırsatlardan ilk siz haberdar olun.' 
                                    : 'Be the first to know about the latest logistics news and opportunities.'}
                            </p>
                            <form onSubmit={handleNewsletterSubmit} className="space-y-3 relative z-10">
                                <input
                                    type="email"
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    placeholder={language === 'tr' ? 'E-posta adresiniz' : 'Your email address'}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-4 focus:ring-white/10 focus:border-white outline-none placeholder:text-blue-200/50 text-sm"
                                    disabled={newsletterLoading}
                                />
                                <button 
                                    type="submit"
                                    disabled={newsletterLoading}
                                    className="w-full py-4 bg-white text-[#102477] font-black rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {newsletterLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-[#102477] border-t-transparent rounded-full animate-spin"></div>
                                            {language === 'tr' ? 'Gönderiliyor...' : 'Sending...'}
                                        </>
                                    ) : (
                                        language === 'tr' ? 'Abone Ol' : 'Subscribe'
                                    )}
                                </button>
                                {newsletterMessage && (
                                    <div className={`text-sm font-medium text-center p-3 rounded-xl ${
                                        newsletterSuccess 
                                            ? 'bg-green-500/20 text-green-100' 
                                            : 'bg-red-500/20 text-red-100'
                                    }`}>
                                        {newsletterMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Related Posts Section (Horizontal) */}
            {relatedBlogs.length > 0 && (
                <section className="bg-slate-50 py-24 border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                                    {language === 'tr' ? 'İlgili Yazılar' : 'Related Posts'}
                                </h2>
                                <p className="text-slate-500 font-medium">{blog.category} kategorisinden diğer içerikler</p>
                            </div>
                            <Link to="/blog" className="inline-flex items-center gap-2 text-blue-600 font-black text-sm group uppercase tracking-widest">
                                {language === 'tr' ? 'Tümünü Gör' : 'View All'}
                                <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedBlogs.map((relatedBlog) => {
                                const relatedTitle = language === 'tr' ? relatedBlog.titleTR : relatedBlog.titleEN;
                                const relatedExcerpt = language === 'tr' ? relatedBlog.excerptTR : relatedBlog.excerptEN;

                                return (
                                    <Link
                                        key={relatedBlog.id}
                                        to={`/blog/${relatedBlog.slug}`}
                                        className="group bg-white rounded-[2.5rem] shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-2 border border-slate-100"
                                    >
                                        <div className="aspect-[16/10] overflow-hidden relative">
                                            {relatedBlog.featuredImage ? (
                                                <img
                                                    src={formatImage(relatedBlog.featuredImage)}
                                                    alt={relatedTitle}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                                    <i className="fas fa-newspaper text-4xl text-slate-200"></i>
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1.4 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black rounded-lg uppercase tracking-wider">
                                                    {relatedBlog.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                                {relatedTitle}
                                            </h3>
                                            <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed font-medium">
                                                {relatedExcerpt}
                                            </p>
                                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    {relatedBlog.publishedAt ? new Date(relatedBlog.publishedAt).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US') : ''}
                                                </span>
                                                <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                    <i className="fas fa-chevron-right text-[10px]"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
};

export default BlogPost;
