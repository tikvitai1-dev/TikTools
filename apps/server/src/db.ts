import { Pool } from 'pg';
import Redis from 'ioredis';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost/indo-finity'
});

// Support Upstash Redis URL atau manual host/port
const redis = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD
    });

export { pool, redis };
