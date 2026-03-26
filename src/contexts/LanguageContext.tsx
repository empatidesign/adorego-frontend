import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  currentLang: Language;
  language: Language; // Geriye dönük uyumluluk için
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Çeviriler
const translations = {
  tr: {
    // Genel
    'home': 'Ana Sayfa',
    'about': 'Hakkımızda',
    'contact': 'İletişim',
    'login': 'Giriş Yap',
    'register': 'Kayıt Ol',
    'logout': 'Çıkış Yap',
    
    // Navbar
    'nav.international': 'Yurtdışı Kargo',
    'nav.domestic': 'Yurtiçi Kargo',
    'nav.calculate': 'Fiyat Hesapla',
    'nav.tracking': 'Gönderi Takibi',
    'nav.panel': 'PANEL',
    'nav.signup': 'ÜYE OL',
  },
  en: {
    // Genel
    'home': 'Home',
    'about': 'About Us',
    'contact': 'Contact',
    'login': 'Login',
    'register': 'Register',
    'logout': 'Logout',
    
    // Navbar
    'nav.international': 'International Shipping',
    'nav.domestic': 'Domestic Shipping',
    'nav.calculate': 'Calculate Price',
    'nav.tracking': 'Track Shipment',
    'nav.panel': 'PANEL',
    'nav.signup': 'SIGN UP',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('tr');

  useEffect(() => {
    // LocalStorage'dan dil tercihini oku
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang: language, language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
