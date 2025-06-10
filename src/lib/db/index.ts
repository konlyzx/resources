import { neon } from '@netlify/neon';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Función para crear conexión solo cuando sea necesario
function createConnection() {
  const connectionString = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('Database connection string not found. Please set NETLIFY_DATABASE_URL or DATABASE_URL environment variable.');
  }
  
  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}

// Crear instancia de Drizzle de forma lazy
let _db: ReturnType<typeof createConnection> | null = null;

export const db = new Proxy({} as ReturnType<typeof createConnection>, {
  get(target, prop) {
    if (!_db) {
      _db = createConnection();
    }
    return (_db as ReturnType<typeof createConnection>)[prop as keyof ReturnType<typeof createConnection>];
  }
});

// Función para verificar conexión
export async function testConnection() {
  try {
    const connectionString = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('Database connection string not found');
    }
    
    const sql = neon(connectionString);
    const result = await sql`SELECT 1 as test`;
    return { success: true, result };
  } catch (error) {
    return { success: false, error };
  }
} 