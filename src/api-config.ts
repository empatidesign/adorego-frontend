// API Configuration
// Docker ortamında VITE_API_URL=/api olarak set edildiği için requestler /api prefix'i ile gider
// Nginx bu istekleri yakalayıp backend'e yönlendirir
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
