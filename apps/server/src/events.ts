import { WebSocket } from 'ws';
import { redis } from './db';
import { DonationEvent, TikTokEvent } from '@indo-finity/shared';

const connectedClients = new Map<string, WebSocket>();

export function broadcastEvent(userId: string, event: any) {
  const client = connectedClients.get(userId);
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(event));
  }
}

export async function storeEvent(userId: string, event: DonationEvent | TikTokEvent) {
  await redis.rpush(`events:${userId}`, JSON.stringify(event));
  await redis.ltrim(`events:${userId}`, 0, 99); // Keep last 100 events
}

export function registerClient(userId: string, ws: WebSocket) {
  connectedClients.set(userId, ws);
  ws.on('close', () => {
    connectedClients.delete(userId);
  });
}
