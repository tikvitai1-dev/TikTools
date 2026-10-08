export interface User {
  id: string;
  username: string;
  tier: 'free' | 'premium';
}

export interface DonationEvent {
  platform: 'saweria' | 'sociabuzz' | 'trakteer';
  amount: number;
  senderName: string;
  message: string;
  timestamp: Date;
}

export interface TikTokEvent {
  type: 'gift' | 'comment' | 'follow' | 'like';
  username: string;
  content: string;
  value?: number; // e.g., gift coin value
}
