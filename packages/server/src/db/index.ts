import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

const connectionString = process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/mydb';

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
