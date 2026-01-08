import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { API_BASE_URL } from '../src/api-config';

interface SEOProps {
  page?: string;
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  page = 'home', 
  customTitle, 
  customDescription, 
  customImage 
}) => {
  const { currentLang } = useLanguage();
  const [seoData, setSeoData] = useState<any>({
    title: currentLang === 'tr' 
      ? 'adoreGo - Yurtdışı ve Yurtiçi Kargo | Akıllı Lojistik Platformu'
      : 'adoreGo - International & Domestic Shipping | Smart Logistics Platform',
    description: currentLang === 'tr'
      ? 'E-ticaret işletmeleri için yurtdışı kargo, yurtiçi kargo ve lojistik çözümleri. Ekonomik fiyatlar, hızlı teslimat, kolay entegrasyon. Shopify, Etsy, Amazon entegrasyonu.'
      : 'International and domestic shipping solutions for e-commerce businesses. Affordable prices, fast delivery, easy integration. Shopify, Etsy, Amazon integration.',
    keywords: currentLang === 'tr'
      ? 'yurtdışı kargo, uluslararası kargo, yurtiçi kargo, mikro ihracat, e-ticaret lojistik, kargo entegrasyonu, shopify kargo, etsy kargo, amazon kargo, express kargo, ekonomik kargo'
      : 'international shipping, overseas cargo, domestic shipping, micro export, e-commerce logistics, shipping integration, shopify shipping, etsy shipping, amazon shipping, express shipping',
    ogTitle: currentLang === 'tr'
      ? 'adoreGo - E-Ticaret için Akıllı Lojistik Çözümleri'
      : 'adoreGo - Smart Logistics Solutions for E-Commerce',
    ogDescription: currentLang === 'tr'
      ? 'Yurtdışı ve yurtiçi kargo gönderimlerinizi tek platformdan yönetin. E-ticaret sitenize kolayca entegre edin, avantajlı fiyatlarla gönderin.'
      : 'Manage your international and domestic shipments from a single platform. Easy integration with your e-commerce site, ship at competitive prices.',
    ogImage: 'https://adorego.com/og-image.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: currentLang === 'tr'
      ? 'adoreGo - E-Ticaret Lojistik Platformu'
      : 'adoreGo - E-Commerce Logistics Platform',
    twitterDescription: currentLang === 'tr'
      ? 'Yurtdışı ve yurtiçi kargo çözümleri. Shopify, Etsy, Amazon entegrasyonu. Hızlı, güvenli, ekonomik.'
      : 'International and domestic shipping solutions. Shopify, Etsy, Amazon integration. Fast, secure, affordable.',
    twitterImage: 'https://adorego.com/og-image.jpg',
    canonical: 'https://adorego.com',
    robots: 'index, follow',
    author: 'adoreGo',
    language: currentLang,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "adoreGo",
      "description": currentLang === 'tr'
        ? "E-ticaret işletmeleri için yurtdışı ve yurtiçi kargo lojistik platformu"
        : "International and domestic shipping logistics platform for e-commerce businesses",
      "url": "https://adorego.com",
      "logo": "https://adorego.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["Turkish", "English"]
      },
      "sameAs": [
        "https://www.instagram.com/adorego",
        "https://www.linkedin.com/company/adorego"
      ],
      "offers": {
        "@type": "AggregateOffer",
        "description": currentLang === 'tr'
          ? "Yurtdışı ve yurtiçi kargo hizmetleri"
          : "International and domestic shipping services"
      }
    }
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/content/seo/${page}?lang=${currentLang}`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          // API'den gelen data'yı mevcut state ile merge et (structuredData korunsun)
          setSeoData((prev: any) => ({
            ...prev,
            ...res.data,
            structuredData: res.data.structuredData || prev.structuredData || {}
          }));
        }
      })
      .catch(err => {
        console.error('SEO verileri yüklenemedi:', err);
      });
  }, [page, currentLang]);

  const title = customTitle || seoData.title;
  const description = customDescription || seoData.description;
  const ogImage = customImage || seoData.ogImage;

  return (
    <Helmet>
      {/* Temel Meta Tag'ler */}
      <html lang={seoData.language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={seoData.keywords} />
      <meta name="author" content={seoData.author} />
      <meta name="robots" content={seoData.robots} />
      <link rel="canonical" href={seoData.canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seoData.canonical} />
      <meta property="og:title" content={seoData.ogTitle || title} />
      <meta property="og:description" content={seoData.ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="adoreGo" />
      <meta property="og:locale" content={currentLang === 'tr' ? 'tr_TR' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={seoData.twitterCard} />
      <meta name="twitter:title" content={seoData.twitterTitle || title} />
      <meta name="twitter:description" content={seoData.twitterDescription || description} />
      <meta name="twitter:image" content={seoData.twitterImage || ogImage} />

      {/* Language Alternates */}
      <link rel="alternate" hrefLang="tr" href="https://adorego.com" />
      <link rel="alternate" hrefLang="en" href="https://adorego.com/en" />
      <link rel="alternate" hrefLang="x-default" href="https://adorego.com" />

      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#102477" />

      {/* Structured Data (JSON-LD) */}
      {seoData.structuredData && Object.keys(seoData.structuredData).length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(seoData.structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
