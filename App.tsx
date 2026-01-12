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
import BlogList from './admin/pages/BlogList';
import BlogNew from './admin/pages/BlogNew';
import BlogEdit from './admin/pages/BlogEdit';
import ContentPagesList from './admin/pages/ContentPagesList';
import ContentPageEdit from './admin/pages/ContentPageEdit';
import ContentPageNew from './admin/pages/ContentPageNew';
import ProtectedRoute from './admin/components/ProtectedRoute';

// Yeni Admin Sayfaları
import NewDashboard from './admin/pages/NewDashboard';
import PageHome from './admin/pages/PageHome';
import PageInternational from './admin/pages/PageInternational';
import PageDomestic from './admin/pages/PageDomestic';
import PageHeaderFooter from './admin/pages/PageHeaderFooter';
import PagePricing from './admin/pages/PagePricing';
import PageTracking from './admin/pages/PageTracking';
import PageBlog from './admin/pages/PageBlog';
import PageNewsletter from './admin/pages/PageNewsletter';
import PageContact from './admin/pages/PageContact';
import PageContactMessages from './admin/pages/PageContactMessages';
import GeneralSettings from './admin/pages/GeneralSettings';

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
        <ScrollToTop />
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

          {/* Yeni Admin Panel */}
          <Route
            path="/admin/new-dashboard"
            element={
              <ProtectedRoute>
                <NewDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/page-home"
            element={
              <ProtectedRoute>
                <PageHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/page-international"
            element={
              <ProtectedRoute>
                <PageInternational />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/page-domestic"
            element={
              <ProtectedRoute>
                <PageDomestic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/header-footer"
            element={
              <ProtectedRoute>
                <PageHeaderFooter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/page-pricing"
            element={
              <ProtectedRoute>
                <PagePricing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/page-tracking"
            element={
              <ProtectedRoute>
                <PageTracking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/newsletter"
            element={
              <ProtectedRoute>
                <PageNewsletter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/page-contact"
            element={
              <ProtectedRoute>
                <PageContact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contact-messages"
            element={
              <ProtectedRoute>
                <PageContactMessages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/general-settings"
            element={
              <ProtectedRoute>
                <GeneralSettings />
              </ProtectedRoute>
            }
          />

          {/* Admin - Content Pages */}
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

          {/* Admin - Blog */}
          <Route
            path="/admin/page-blog"
            element={
              <ProtectedRoute>
                <PageBlog />
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
