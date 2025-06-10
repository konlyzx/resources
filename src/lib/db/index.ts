import { neon } from '@netlify/neon';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Crear conexión a Neon
const sql = neon(); // Usa automáticamente NETLIFY_DATABASE_URL

// Crear instancia de Drizzle
export const db = drizzle(sql, { schema });

// Función para verificar conexión
export async function testConnection() {
  try {
    const result = await sql`SELECT 1 as test`;
    return { success: true, result };
  } catch (error) {
    return { success: false, error };
  }
} 