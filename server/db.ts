import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {\n  console.warn('DATABASE_URL not set - using mock storage (no DB needed for demo)');\n  export const db = null;\n} else {\n  export const pool = new Pool({ connectionString: process.env.DATABASE_URL });\n  export const db = drizzle(pool, { schema });\n}
