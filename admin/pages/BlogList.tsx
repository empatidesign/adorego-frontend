import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/Layout';
import { Button } from '../components/forms/FormComponents';
import { blogAPI } from '../services/api';

const BlogList: React.FC = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        try {
            const data = await blogAPI.getBlogs('tr');
            setBlogs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Blog yüklenemedi:', error);
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
            try {
                await blogAPI.deleteBlog(id);
                loadBlogs();
            } catch (error) {
                console.error('Silme hatası:', error);
                alert('Blog silinemedi');
            }
        }
    };

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.titleTR?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.titleEN?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || blog.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-600">Yükleniyor...</div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-7xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Blog Yazıları</h1>
                        <p className="text-gray-600 mt-1">{blogs.length} blog yazısı</p>
                    </div>
                    <Button onClick={() => navigate('/admin/blog/new')}>
                        <i className="fas fa-plus mr-2"></i>
                        Yeni Blog Yazısı
                    </Button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <i className="fas fa-search mr-2"></i>
                                Ara
                            </label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Blog başlığında ara..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <i className="fas fa-filter mr-2"></i>
                                Kategori
                            </label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">Tüm Kategoriler</option>
                                <option value="yurtdisi-kargo">Yurtdışı Kargo</option>
                                <option value="yurtici-kargo">Yurtiçi Kargo</option>
                                <option value="e-ticaret">E-Ticaret</option>
                                <option value="lojistik">Lojistik</option>
                                <option value="rehber">Rehber</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Blog List */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Görsel</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Başlık</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Kategori</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Durum</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Tarih</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredBlogs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <i className="fas fa-inbox text-4xl mb-4 block text-gray-300"></i>
                                        {searchTerm || filterCategory !== 'all' ? 'Arama kriterlerine uygun blog bulunamadı' : 'Henüz blog yazısı yok'}
                                    </td>
                                </tr>
                            ) : (
                                filteredBlogs.map((blog) => (
                                    <tr key={blog.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            {blog.featuredImage ? (
                                                <img src={blog.featuredImage} alt={blog.titleTR} className="w-16 h-16 object-cover rounded" />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                                                    <i className="fas fa-image text-gray-400"></i>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{blog.titleTR}</div>
                                            <div className="text-sm text-gray-500">{blog.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                {blog.category || 'Genel'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${blog.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {blog.isPublished ? 'Yayında' : 'Taslak'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('tr-TR') : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => navigate(`/admin/blog/edit/${blog.id}`)}
                                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm mr-2"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                                                className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm mr-2"
                                            >
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(blog.id)}
                                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default BlogList;
