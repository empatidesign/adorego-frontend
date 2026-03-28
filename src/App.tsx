import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';

// Ana site componentleri
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Solutions from './components/Solutions';
import SolutionsCta from './components/SolutionsCta';
import Partners from './components/Partners';
import PopularDestinations from './components/PopularDestinations';
import TargetAudience from './components/TargetAudience';
import UseCases from './components/UseCases';
import HomeCTA from './components/HomeCTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import SEO from './components/SEO';

// Admin
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import ProtectedRoute from './admin/components/ProtectedRoute';

// Sayfalar
import Pricing from './pages/Pricing';
import HowToSend from './pages/HowToSend';
import Tracking from './pages/Tracking';
import ContentPage from './pages/ContentPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import InternationalShipping from './pages/InternationalShipping';
import DomesticShipping from './pages/DomesticShipping';
import AboutUs from './pages/AboutUs';
import KVKKPage from './pages/KVKKPage';
import FromAbroadToTurkey from './pages/FromAbroadToTurkey';
import FAQPage from './pages/FAQPage';
import GermanyShipping from './pages/GermanyShipping';
import USAShipping from './pages/USAShipping';
import IntlShippingPrices from './pages/IntlShippingPrices';
import HowToShipAbroad from './pages/HowToShipAbroad';
import ReceiverPayment from './pages/ReceiverPayment';
import CheapestIntlShipping from './pages/CheapestIntlShipping';
import IntlShippingGuide from './pages/IntlShippingGuide';
import ShopifyIntegration from './pages/ShopifyIntegration';
import EtsyIntegration from './pages/EtsyIntegration';
import AmazonIntegration from './pages/AmazonIntegration';
import WooCommerceIntegration from './pages/WooCommerceIntegration';
import CustomAPIIntegration from './pages/CustomAPIIntegration';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

// Ana site sayfası
const MainSite: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <SEO page="home" />
      <Navbar />
      <main className="flex-grow">
        <Hero />

        {/* Yurtdışı Kargo Bölümü */}
        <div id="yurtdisi" className="bg-gradient-to-b from-white to-blue-50/30">
          <HowItWorks />
          <Features />
        </div>

        {/* Yurtiçi Kargo Bölümü */}
        <div id="yurtici" className="bg-gradient-to-b from-blue-50/30 to-purple-50/30">
          <Solutions />
          <SolutionsCta />
          <TargetAudience />
          <UseCases />
        </div>

        <div className="bg-gradient-to-b from-purple-50/30 to-pink-50/30">
          <Partners />
        </div>

        {/* CTA Banner - Hemen Gönderine Başla */}
        <HomeCTA />

        <div className="bg-gradient-to-b from-pink-50/30 to-indigo-50/30">
          <PopularDestinations />
        </div>

        <div className="bg-gradient-to-b from-indigo-50/30 to-white">
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          {/* Ana site */}
          <Route path="/" element={<MainSite />} />
          <Route path="/yurtdisi-kargo" element={<InternationalShipping />} />
          <Route path="/yurtici-kargo" element={<DomesticShipping />} />
          <Route path="/fiyatlar" element={<Pricing />} />
          <Route path="/nasil-gonderirim" element={<HowToSend />} />
          <Route path="/gonderi-takibi" element={<Tracking />} />


          {/* Yeni Sayfalar */}
          <Route path="/hakkimizda" element={<AboutUs />} />
          <Route path="/kvkk" element={<KVKKPage />} />
          <Route path="/yurtdisindan-turkiye" element={<FromAbroadToTurkey />} />
          <Route path="/sikca-sorulan-sorular" element={<FAQPage />} />
          <Route path="/almanyaya-kargo" element={<GermanyShipping />} />
          <Route path="/amerikaya-kargo" element={<USAShipping />} />
          <Route path="/yurtdisi-kargo-fiyatlari" element={<IntlShippingPrices />} />
          <Route path="/yurtdisina-kargo-nasil-gonderilir" element={<HowToShipAbroad />} />
          <Route path="/alici-odemeli-kargo" element={<ReceiverPayment />} />
          <Route path="/en-ucuz-yurtdisi-kargo" element={<CheapestIntlShipping />} />
          <Route path="/yurtdisi-gonderim-rehberi" element={<IntlShippingGuide />} />
          <Route path="/shopify-entegrasyonu" element={<ShopifyIntegration />} />
          <Route path="/etsy-entegrasyonu" element={<EtsyIntegration />} />
          <Route path="/amazon-entegrasyonu" element={<AmazonIntegration />} />
          <Route path="/woocommerce-entegrasyonu" element={<WooCommerceIntegration />} />
          <Route path="/ozel-site-api" element={<CustomAPIIntegration />} />

          {/* Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* İletişim */}
          <Route path="/iletisim" element={<Contact />} />

          {/* Dynamic Content Pages (Last to avoid conflicts) */}
          <Route path="/:slug" element={<ContentPage />} />

          {/* Admin */}
          <Route path="/admin" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <WhatsAppButton />
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
