import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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
  getPartners: async (lang: string = 'tr') => {
    const response = await api.get(`/content/partners?lang=${lang}`);
    return response.data;
  },
  getFaq: async (lang: string = 'tr') => {
    const response = await api.get(`/content/faq?lang=${lang}`);
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
  updatePartners: async (data: any[], lang: string = 'tr') => {
    const response = await api.put('/content/partners', { data, lang });
    return response.data;
  },
  updateFaq: async (data: any[], lang: string = 'tr') => {
    const response = await api.put('/content/faq', { data, lang });
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
};

export default api;

