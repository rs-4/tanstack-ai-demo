import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as schema from './schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing')
}

// For Cloudflare Workers: use Neon serverless HTTP driver only
// The postgres.js driver creates persistent connections that violate Workers' I/O isolation
const sql = neon(process.env.DATABASE_URL)
export const db = drizzleNeon(sql, { schema })
