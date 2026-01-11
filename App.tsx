import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';

// Ana site componentleri
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Solutions from './components/Solutions';
import Partners from './components/Partners';
import PopularDestinations from './components/PopularDestinations';
import TargetAudience from './components/TargetAudience';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import SEO from './components/SEO';

// Admin componentleri
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import NavbarEditor from './admin/pages/editors/NavbarEditor';
import HeroEditor from './admin/pages/editors/HeroEditor';
import HowItWorksEditor from './admin/pages/editors/HowItWorksEditor';
import FeaturesEditor from './admin/pages/editors/FeaturesEditor';
import PartnersEditor from './admin/pages/editors/PartnersEditor';
import CTAEditor from './admin/pages/editors/CTAEditor';
import FAQEditor from './admin/pages/editors/FAQEditor';
import SEOEditor from './admin/pages/editors/SEOEditor';
import SolutionsEditor from './admin/pages/editors/SolutionsEditor';
import SettingsEditor from './admin/pages/editors/SettingsEditor';
import TargetAudienceEditor from './admin/pages/editors/TargetAudienceEditor';
import PopularDestinationsEditor from './admin/pages/editors/PopularDestinationsEditor';
import HowToSendEditor from './admin/pages/editors/HowToSendEditor';
import PricingEditor from './admin/pages/editors/PricingEditor';
import ContentPagesList from './admin/pages/ContentPagesList';
import ContentPageEdit from './admin/pages/ContentPageEdit';
import ContentPageNew from './admin/pages/ContentPageNew';
import BlogList from './admin/pages/BlogList';
import BlogNew from './admin/pages/BlogNew';
import BlogEdit from './admin/pages/BlogEdit';
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
import WhatsAppButton from './components/WhatsAppButton';

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
          <TargetAudience />
        </div>

        <div className="bg-gradient-to-b from-purple-50/30 to-pink-50/30">
          <Partners />
        </div>

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
        <Routes>
          {/* Ana site */}
          <Route path="/" element={<MainSite />} />
          <Route path="/yurtdisi-kargo" element={<InternationalShipping />} />
          <Route path="/yurtici-kargo" element={<DomesticShipping />} />
          <Route path="/fiyatlar" element={<Pricing />} />
          <Route path="/nasil-gonderirim" element={<HowToSend />} />
          <Route path="/gonderi-takibi" element={<Tracking />} />


          {/* Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* İletişim */}
          <Route path="/iletisim" element={<Contact />} />

          {/* Dynamic Content Pages (Last to avoid conflicts) */}
          <Route path="/:slug" element={<ContentPage />} />

          {/* Admin - Login */}
          <Route path="/admin" element={<Login />} />

          {/* Admin - Protected routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/navbar"
            element={
              <ProtectedRoute>
                <NavbarEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/hero"
            element={
              <ProtectedRoute>
                <HeroEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/howitworks"
            element={
              <ProtectedRoute>
                <HowItWorksEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/howtosend"
            element={
              <ProtectedRoute>
                <HowToSendEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pricing"
            element={
              <ProtectedRoute>
                <PricingEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/features"
            element={
              <ProtectedRoute>
                <FeaturesEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/partners"
            element={
              <ProtectedRoute>
                <PartnersEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/solutions"
            element={
              <ProtectedRoute>
                <SolutionsEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cta"
            element={
              <ProtectedRoute>
                <CTAEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/faq"
            element={
              <ProtectedRoute>
                <FAQEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/seo"
            element={
              <ProtectedRoute>
                <SEOEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <SettingsEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/target-audience"
            element={
              <ProtectedRoute>
                <TargetAudienceEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/popular-destinations"
            element={
              <ProtectedRoute>
                <PopularDestinationsEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/content-pages"
            element={
              <ProtectedRoute>
                <ContentPagesList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/content-pages/new"
            element={
              <ProtectedRoute>
                <ContentPageNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/content-pages/edit/:slug"
            element={
              <ProtectedRoute>
                <ContentPageEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <ProtectedRoute>
                <BlogList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog/new"
            element={
              <ProtectedRoute>
                <BlogNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog/edit/:id"
            element={
              <ProtectedRoute>
                <BlogEdit />
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
