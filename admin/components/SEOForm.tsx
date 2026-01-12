import React from 'react';

interface SEOFormProps {
    seo: any;
    onUpdate: (updates: any) => void;
}

const SEOForm: React.FC<SEOFormProps> = ({ seo, onUpdate }) => {
    return (
        <div className="space-y-6">
            {/* SEO Temel Bilgiler */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i className="fas fa-search text-blue-600"></i>
                    SEO Temel Bilgileri
                </h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Sayfa Başlığı (Title)
                            <span className="text-xs text-gray-500 ml-2">(50-60 karakter önerilir)</span>
                        </label>
                        <input
                            type="text"
                            value={seo.title || ''}
                            onChange={(e) => onUpdate({ title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Sayfa Başlığı | adoreGo"
                        />
                        <p className="text-xs text-gray-500 mt-1">{seo.title?.length || 0} karakter</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Meta Açıklama (Description)
                            <span className="text-xs text-gray-500 ml-2">(150-160 karakter önerilir)</span>
                        </label>
                        <textarea
                            value={seo.description || ''}
                            onChange={(e) => onUpdate({ description: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Sayfa açıklaması..."
                        />
                        <p className="text-xs text-gray-500 mt-1">{seo.description?.length || 0} karakter</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Anahtar Kelimeler (Keywords)
                            <span className="text-xs text-gray-500 ml-2">(Virgülle ayırın)</span>
                        </label>
                        <input
                            type="text"
                            value={seo.keywords || ''}
                            onChange={(e) => onUpdate({ keywords: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="anahtar kelime 1, anahtar kelime 2, anahtar kelime 3"
                        />
                    </div>
                </div>
            </div>

            {/* Open Graph (Social Media) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i className="fab fa-facebook text-blue-600"></i>
                    Sosyal Medya Paylaşımı (Open Graph)
                </h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">OG Başlık</label>
                        <input
                            type="text"
                            value={seo.ogTitle || ''}
                            onChange={(e) => onUpdate({ ogTitle: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Boş bırakılırsa sayfa başlığı kullanılır"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">OG Açıklama</label>
                        <textarea
                            value={seo.ogDescription || ''}
                            onChange={(e) => onUpdate({ ogDescription: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Boş bırakılırsa meta açıklama kullanılır"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">OG Görsel URL</label>
                        <input
                            type="text"
                            value={seo.ogImage || ''}
                            onChange={(e) => onUpdate({ ogImage: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="https://adorego.com/images/og-image.jpg"
                        />
                        <p className="text-xs text-gray-500 mt-1">Önerilen boyut: 1200x630px</p>
                    </div>
                </div>
            </div>

            {/* SEO İpuçları */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <i className="fas fa-lightbulb text-blue-600"></i>
                    SEO İpuçları
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-blue-600 mt-0.5"></i>
                        <span>Sayfa başlığı 50-60 karakter arasında olmalı ve anahtar kelime içermeli</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-blue-600 mt-0.5"></i>
                        <span>Meta açıklama 150-160 karakter arasında olmalı ve harekete geçirici olmalı</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-blue-600 mt-0.5"></i>
                        <span>Anahtar kelimeleri doğal bir şekilde kullanın, aşırıya kaçmayın</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-blue-600 mt-0.5"></i>
                        <span>Open Graph görseli sosyal medyada paylaşıldığında görünecek</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SEOForm;
