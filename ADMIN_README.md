# adoreGo - Admin Panel Kurulum Rehberi

## 🚀 Hızlı Başlangıç

### 1. Backend Kurulumu

Backend klasöründe `.env` dosyası oluşturun:

```bash
cd backend
```

`.env` dosyası içeriği:
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=adorego-super-secret-key-2024
JWT_EXPIRES_IN=24h
PORT=3001
```

Backend'i başlatın:
```bash
npm run start:dev
```

Backend şu adreste çalışacak: `http://localhost:3001`

### 2. Frontend Başlatma

Ana dizinde:
```bash
npm run dev
```

Frontend şu adreste çalışacak: `http://localhost:5173`

## 📋 Kullanım

### Ana Site
- Ana site: `http://localhost:5173`
- Hero, Features, Partners ve FAQ bölümleri artık API'den veri çekiyor

### Admin Panel
- Admin paneli: `http://localhost:5173/admin`
- **Kullanıcı adı:** `admin`
- **Şifre:** `admin123`

### Admin Panel Özellikleri
1. **Dashboard:** Tüm bölümlere hızlı erişim
2. **Hero Bölümü:** Ana başlık, alt başlık, görsel ve butonları düzenleyin
3. **Özellikler:** 4 özellik kartını düzenleyin (ikon, başlık, açıklama)
4. **Partnerler:** Partner logolarını ekleyin/silin
5. **S.S.S:** Soru-cevap ekleyin, düzenleyin veya silin

## 🔧 Teknoloji Stack

**Backend:**
- NestJS
- JWT Authentication
- JSON dosya bazlı veri saklama

**Frontend:**
- React 19
- React Router v6
- Axios
- Tailwind CSS

## 📁 Proje Yapısı

```
adorego/
├── backend/
│   ├── src/
│   │   ├── auth/         # Auth modülü
│   │   ├── content/      # Content API
│   │   └── main.ts
│   ├── data/
│   │   └── content.json  # Tüm içerik verisi
│   └── package.json
├── admin/
│   ├── pages/            # Admin sayfaları
│   ├── components/       # Admin componentleri
│   └── services/         # API servisleri
├── components/           # Ana site componentleri
└── App.tsx              # Ana routing
```

## 🔒 Güvenlik

- Admin paneli JWT token ile korumalıdır
- Token localStorage'da saklanır
- Token süresi: 24 saat
- Şifreyi `.env` dosyasından değiştirebilirsiniz

## 📝 Notlar

- Değişiklikler `backend/data/content.json` dosyasına kaydedilir
- JSON dosyasını düzenli olarak yedekleyin
- Backend çalışmıyorsa frontend hata vermeden çalışmaya devam eder (eski içerik gösterilmez)

## 🆘 Sorun Giderme

**Backend başlamıyor:**
- `.env` dosyasının `backend/` klasöründe olduğundan emin olun
- Port 3001'in kullanılmadığını kontrol edin

**Admin panele giriş yapamıyorum:**
- Backend'in çalıştığından emin olun
- Kullanıcı adı: `admin`, Şifre: `admin123`
- Browser console'da hata var mı kontrol edin

**İçerik görünmüyor:**
- Backend'in çalıştığından emin olun
- `http://localhost:3001/api/content/all` adresine gidip verileri kontrol edin
- CORS hatası varsa backend `main.ts` dosyasındaki CORS ayarlarını kontrol edin

