import axios from 'axios';
import { API_BASE_URL } from '../../src/api-config';

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token'ı her istekte ekle
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  login: async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      return response.data;
    } catch (error: any) {
      console.error('Login API Error:', error);
      console.error('Response:', error.response?.data);
      throw error;
    }
  },
};

// Content API
export const contentAPI = {
  getBaseURL: () => API_BASE_URL,
  
  // GET methods
  getNavbar: async (lang: string = 'tr') => {
    const response = await api.get(`/content/navbar?lang=${lang}`);
    return response.data;
  },
  getHero: async (lang: string = 'tr') => {
    const response = await api.get(`/content/hero?lang=${lang}`);
    return response.data;
  },
  getFeatures: async (lang: string = 'tr') => {
    const response = await api.get(`/content/features?lang=${lang}`);
    return response.data;
  },
  getFeaturesHeader: async (lang: string = 'tr') => {
    const response = await api.get(`/content/features-header?lang=${lang}`);
    return response.data;
  },
  getPartners: async (lang: string = 'tr') => {
    const response = await api.get(`/content/partners?lang=${lang}`);
    return response.data;
  },
  getFaq: async (lang: string = 'tr') => {
    const response = await api.get(`/content/faq?lang=${lang}`);
    return response.data;
  },
  getFaqHeader: async (lang: string = 'tr') => {
    const response = await api.get(`/content/faq-header?lang=${lang}`);
    return response.data;
  },
  getHowItWorks: async (lang: string = 'tr') => {
    const response = await api.get(`/content/howitworks?lang=${lang}`);
    return response.data;
  },
  getCta: async (lang: string = 'tr') => {
    const response = await api.get(`/content/cta?lang=${lang}`);
    return response.data;
  },
  getAllContent: async (lang: string = 'tr') => {
    const response = await api.get(`/content/all?lang=${lang}`);
    return response.data;
  },

  // PUT methods (Admin only)
  updateNavbar: async (data: any, lang: string = 'tr') => {
    const response = await api.put('/content/navbar', { data, lang });
    return response.data;
  },
  updateHero: async (data: any, lang: string = 'tr') => {
    const response = await api.put('/content/hero', { data, lang });
    return response.data;
  },
  updateFeatures: async (data: any[], lang: string = 'tr') => {
    const response = await api.put('/content/features', { data, lang });
    return response.data;
  },
  updateFeaturesHeader: async (data: any, lang: string = 'tr') => {
    const response = await api.put('/content/features-header', { data, lang });
    return response.data;
  },
  updatePartners: async (data: any[], lang: string = 'tr') => {
    const response = await api.put('/content/partners', { data, lang });
    return response.data;
  },
  updateFaq: async (data: any[], lang: string = 'tr') => {
    const response = await api.put('/content/faq', { data, lang });
    return response.data;
  },
  updateFaqHeader: async (data: any, lang: string = 'tr') => {
    const response = await api.put('/content/faq-header', { data, lang });
    return response.data;
  },
  updateHowItWorks: async (data: any, lang: string = 'tr') => {
    const response = await api.put('/content/howitworks', { data, lang });
    return response.data;
  },
  updateCta: async (data: any, lang: string = 'tr') => {
    const response = await api.put('/content/cta', { data, lang });
    return response.data;
  },
  getSolutions: async (lang: string = 'tr') => {
    const response = await api.get(`/content/solutions?lang=${lang}`);
    return response.data;
  },
  updateSolutions: async (data: any, lang: string = 'tr') => {
    const response = await api.put('/content/solutions', { data, lang });
    return response.data;
  },
  getTargetAudience: async (lang: string = 'tr') => {
    const response = await api.get(`/content/target-audience?lang=${lang}`);
    return response.data;
  },
  updateTargetAudience: async (data: any, lang: string = 'tr') => {
    const response = await api.put('/content/target-audience', { data, lang });
    return response.data;
  },
  getPopularDestinations: async (lang: string = 'tr') => {
    const response = await api.get(`/content/popular-destinations?lang=${lang}`);
    return response.data;
  },
  updatePopularDestinations: async (data: any, lang: string = 'tr') => {
    const response = await api.put('/content/popular-destinations', { data, lang });
    return response.data;
  },
  getFooter: async (lang: string = 'tr') => {
    const response = await api.get(`/content/footer?lang=${lang}`);
    return response.data;
  },
  updateFooter: async (data: any, lang: string = 'tr') => {
    const response = await api.put('/content/footer', { data, lang });
    return response.data;
  },
  getPricing: async (lang: string = 'tr') => {
    const response = await api.get(`/content/pricing?lang=${lang}`);
    return response.data;
  },
  updatePricing: async (data: any, lang: string = 'tr') => {
    const response = await api.put('/content/pricing', { data, lang });
    return response.data;
  },
  getHowToSend: async (lang: string = 'tr') => {
    const response = await api.get(`/content/howtosend?lang=${lang}`);
    return response.data;
  },
  updateHowToSend: async (data: any, lang: string = 'tr') => {
    const response = await api.put('/content/howtosend', { data, lang });
    return response.data;
  },
  getSeo: async (page: string = 'home', lang: string = 'tr') => {
    const response = await api.get(`/content/seo/${page}?lang=${lang}`);
    return response.data;
  },
  getAllSeo: async (lang: string = 'tr') => {
    const response = await api.get(`/content/seo?lang=${lang}`);
    return response.data;
  },
  updateSeo: async (page: string, data: any, lang: string = 'tr') => {
    const response = await api.put(`/content/seo/${page}`, { data, lang });
    return response.data;
  },
  getSiteSettings: async (category?: string, lang: string = 'tr') => {
    const url = category
      ? `/content/settings/${category}?lang=${lang}`
      : `/content/settings?lang=${lang}`;
    const response = await api.get(url);
    return response.data;
  },
  updateSiteSettings: async (category: string, data: any, lang: string = 'tr') => {
    const response = await api.put(`/content/settings/${category}`, { data, lang });
    return response.data;
  },
  getContentPage: async (slug: string, lang: string = 'tr') => {
    const response = await api.get(`/content/page/${slug}?lang=${lang}`);
    return response.data;
  },
  updateContentPage: async (slug: string, data: any, lang: string = 'tr') => {
    const response = await api.put(`/content/page/${slug}`, { data, lang });
    return response.data;
  },
};

export default api;


// Blog API
export const blogAPI = {
  getBlogs: async (lang: string = 'tr') => {
    const response = await api.get(`/content/blogs?lang=${lang}`);
    return response.data;
  },
  getBlog: async (slug: string, lang: string = 'tr') => {
    const response = await api.get(`/content/blog/${slug}?lang=${lang}`);
    return response.data;
  },
  createBlog: async (data: any) => {
    const response = await api.post('/content/blog', data);
    return response.data;
  },
  updateBlog: async (id: string, data: any) => {
    const response = await api.put(`/content/blog/${id}`, data);
    return response.data;
  },
  deleteBlog: async (id: string) => {
    const response = await api.delete(`/content/blog/${id}`);
    return response.data;
  },
};
