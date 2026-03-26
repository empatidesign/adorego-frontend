import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api-config';
import { useLanguage } from '../contexts/LanguageContext';

const WhatsAppButton: React.FC = () => {
    const { currentLang } = useLanguage();
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // WhatsApp numarasını site ayarlarından çek
        axios.get(`${API_BASE_URL}/content/settings/contact?lang=${currentLang}`)
            .then(res => {
                if (res.data && res.data.whatsapp) {
                    // Numaradaki boşlukları ve karakterleri temizle
                    const cleanNumber = res.data.whatsapp.replace(/\D/g, '');
                    setWhatsappNumber(cleanNumber);
                }
            })
            .catch(err => console.error('WhatsApp numarası yüklenemedi:', err));

        // Belirli bir scroll'dan sonra butonu göster
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(true); // Mobilde/Masaüstünde her zaman görünmesi daha iyi olabilir
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        toggleVisibility(); // Başlangıçta kontrol et

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [currentLang]);

    const handleWhatsAppClick = () => {
        if (!whatsappNumber) {
            // Varsayılan bir numara veya hata mesajı
            window.open(`https://wa.me/905320000000`, '_blank');
            return;
        }
        window.open(`https://wa.me/${whatsappNumber}`, '_blank');
    };

    return (
        <div
            className={`fixed bottom-8 right-8 z-[9999] transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        >
            <button
                onClick={handleWhatsAppClick}
                className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#128C7E] transition-all hover:scale-110 group"
                aria-label="WhatsApp Support"
            >
                {/* Pulse Effect */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>

                <i className="fab fa-whatsapp text-3xl z-10"></i>

                {/* Tooltip */}
                <span className="absolute right-20 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-100 pointer-events-none">
                    {currentLang === 'tr' ? 'Size nasıl yardımcı olabiliriz?' : 'How can we help you?'}
                </span>
            </button>
        </div>
    );
};

export default WhatsAppButton;
