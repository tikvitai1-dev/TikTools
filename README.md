# IndoFinity - Platform Livestream All-in-One

Platform all-in-one untuk livestreaming yang lebih interaktif, menarik, dan profesional. Kontrol game, overlay keren, dan interaksi penonton, semuanya dalam satu aplikasi.

## 🚀 Fitur Utama

- ✨ **Overlay Live TikTok** - Tampilkan overlay interaktif langsung di live TikTok
- 🎮 **Control Minecraft** - Biarkan penonton mengontrol game Minecraft melalui komentar
- 💰 **Integrasi Platform Donasi** - Saweria, Sociabuzz, Trakteer
- 🎯 **Custom Action Event** - Buat aksi kustom berdasarkan event penonton
- 🔧 **OBS WebSocket** - Integrasi dengan OBS Studio
- 🎵 **Song Requests** - Request lagu dari YouTube
- 🎭 **Stream Avatars** - Avatar interaktif di stream

## 📦 Struktur Monorepo

```
indo-finity/
├── apps/
│   ├── web/          # Frontend React + Vite + Tailwind
│   ├── server/       # Backend Node.js + Express + WebSocket
│   └── desktop/      # Desktop app dengan Tauri (soon)
├── packages/
│   ├── shared/       # Tipe data bersama (TypeScript)
│   └── ui/           # Component library (soon)
└── docker-compose.yml
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express, WebSocket, PostgreSQL, Redis
- **Desktop**: Tauri (Rust + WebView)
- **DevOps**: Docker, pnpm workspaces

## 📋 Prerequisites

- Node.js 18+ dan pnpm
- Docker Desktop (untuk PostgreSQL & Redis)
- Git

## 🚀 Cara Install

### 1. Clone Repository

```bash
cd "d:\Bot\APP Stream\indo-finity"
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Database

Jalankan PostgreSQL dan Redis dengan Docker:

```bash
docker-compose up -d
```

Database akan otomatis dibuat dengan skema dari `apps/server/schema.sql`.

### 4. Setup Environment Variables

**Backend** (`apps/server/.env`):
```env
DATABASE_URL=postgres://indofinity:indofinity123@localhost:5432/indofinity
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=ganti-dengan-secret-key-yang-aman
PORT=3001
```

**Frontend** (`apps/web/.env`):
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_WS_URL=ws://localhost:3001
```

### 5. Build Shared Package

```bash
pnpm --filter @indo-finity/shared build
```

### 6. Jalankan Development Server

**Terminal 1** (Backend):
```bash
pnpm dev:server
```

**Terminal 2** (Frontend):
```bash
pnpm dev:web
```

Buka browser di `http://localhost:3000`

## 📖 Dokumentasi API

### Auth Endpoints

- `POST /api/auth/register` - Daftar akun baru
- `POST /api/auth/login` - Login

### WebSocket Events

Koneksi WebSocket ke `ws://localhost:3001?userId={userId}`

Event yang dikirim server:
```json
{
  "type": "tiktok",
  "data": {
    "jenis": "gift",
    "namaPengguna": "user123",
    "konten": "Rose",
    "nilai": 1
  }
}
```

## 🔌 Integrasi

### TikTok Live

Backend menggunakan library `tiktok-live-connector` (unofficial) untuk menangkap event live.

### Minecraft RCON

Koneksi ke Minecraft server via RCON protocol untuk eksekusi command.

### OBS WebSocket

Kontrol OBS Studio via WebSocket protocol resmi.

## 📝 TODO

- [ ] Lengkapi UI overlay builder
- [ ] Implementasi TikTok Live Connector
- [ ] Buat landing page marketing
- [ ] Setup Tauri desktop app
- [ ] Implementasi Saweria/Sociabuzz/Trakteer webhooks
- [ ] Sistem subscription dan payment gateway
- [ ] Roulette, auction, eliminasi game
- [ ] Soundboard management
- [ ] Avatar system

## 📄 License

Private - IndoFinity © 2026

## 🤝 Kontribusi

Untuk development internal saja.
