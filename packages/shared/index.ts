// ===== PENGGUNA =====
export interface User {
  id: string;
  username: string;
  email: string;
  tier: TierLangganan;
  createdAt: Date;
}

export type TierLangganan = 'gratis' | 'premium';

// ===== AUTENTIKASI =====
export interface MuatTurunAuth {
  email: string;
  password: string;
}

export interface DaftarAuth {
  email: string;
  username: string;
  password: string;
}

export interface AuthRespon {
  user: Omit<User, 'createdAt'>;
  token: string;
}

// ===== AKUN TERHUBUNG =====
export type Platform = 'tiktok' | 'saweria' | 'sociabuzz' | 'trakteer' | 'obs';

export interface AkunTerhubung {
  id: string;
  userId: string;
  platform: Platform;
  platformUserId: string;
  connectedAt: Date;
}

// ===== EVENT DONASI =====
export type PlatformDonasi = 'saweria' | 'sociabuzz' | 'trakteer';

export interface EventDonasi {
  id: string;
  platform: PlatformDonasi;
  jumlah: number;
  mataUang: string;
  namaPengirim: string;
  pesan: string;
  waktu: Date;
}

// ===== EVENT TIKTOK =====
export type JenisEventTikTok = 'gift' | 'comment' | 'follow' | 'like' | 'share';

export interface EventTikTok {
  id: string;
  jenis: JenisEventTikTok;
  namaPengguna: string;
  konten: string;
  nilai?: number; // misal jumlah koin gift
  waktu: Date;
}

// ===== OVERLAY =====
export interface KonfigurasiOverlay {
  id: string;
  userId: string;
  nama: string;
  tema: TemaOverlay;
  posisi: PosisiOverlay;
  tampilkanDonasi: boolean;
  tampilkanGift: boolean;
  tampilkanFollow: boolean;
  tampilkanKomentar: boolean;
  durasiTampil: number; // detik
  ukuranFont: number;
}

export type TemaOverlay = 'gelap' | 'terang' | 'neon' | 'minimalis' | 'custom';
export type PosisiOverlay = 'kiri-atas' | 'kiri-bawah' | 'kanan-atas' | 'kanan-bawah' | 'tengah';

// ===== SUBSKRIPSI / ADDON =====
export type JenisAddon =
  | 'pusat-interaksi'
  | 'premium-tools'
  | 'soundboards'
  | 'stream-avatars'
  | 'song-requests';

export interface Subskripsi {
  id: string;
  userId: string;
  jenisAddon: JenisAddon;
  berakhirPada: Date;
  aktif: boolean;
}

export const HARGA_ADDON: Record<JenisAddon, number> = {
  'pusat-interaksi': 75000,
  'premium-tools': 50000,
  'soundboards': 35000,
  'stream-avatars': 17000,
  'song-requests': 12000,
};

export const NAMA_ADDON: Record<JenisAddon, string> = {
  'pusat-interaksi': 'Addons Pusat Interaksi',
  'premium-tools': 'Addons Premium Tools',
  'soundboards': 'Addons Soundboards',
  'stream-avatars': 'Addons Stream Avatars',
  'song-requests': 'Addons Song Requests',
};

export const DESKRIPSI_ADDON: Record<JenisAddon, string> = {
  'pusat-interaksi': 'Interaksi, aktivitas, dan preset tanpa batas, plus server TikTok premium.',
  'premium-tools': 'Spin Roulette, Game Eliminasi, Auction, dan Gifter Winner.',
  'soundboards': 'Soundboard tanpa batas berikut preset khususnya.',
  'stream-avatars': 'Pasang avatar tanpa batas dan buka seluruh avatar premium.',
  'song-requests': 'Playlist dan lagu YouTube tanpa batas.',
};

// ===== EVENT KUSTOM =====
export type PemicuEvent = 'follow' | 'gift' | 'comment' | 'donasi' | 'like';
export type AksiEvent = 'tts' | 'perintah-minecraft' | 'suara' | 'spawn-avatar' | 'spin-roulette';

export interface EventKustom {
  id: string;
  userId: string;
  nama: string;
  pemicu: PemicuEvent;
  kondisi?: string; // ekspresi kondisi, misal "nilai >= 100"
  aksi: AksiEvent;
  parameter?: Record<string, unknown>;
}
