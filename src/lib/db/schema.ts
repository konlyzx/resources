import { pgTable, serial, text, timestamp, integer, decimal, boolean } from 'drizzle-orm/pg-core';

// Tabla de productos
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  longDescription: text('long_description').notNull(),
  size: text('size').notNull(),
  type: text('type').notNull(),
  category: text('category').notNull(),
  downloadUrl: text('download_url').notNull(),
  images: text('images').array(), // Array de URLs de imágenes
  features: text('features').array(), // Array de características
  requirements: text('requirements').array(), // Array de requisitos
  tags: text('tags').array(), // Array de tags
  rating: decimal('rating', { precision: 2, scale: 1 }).default('0.0'),
  reviews: integer('reviews').default(0),
  downloadCount: integer('download_count').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabla de estadísticas de descargas
export const downloads = pgTable('downloads', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id),
  userAgent: text('user_agent'),
  ipAddress: text('ip_address'),
  downloadedAt: timestamp('downloaded_at').defaultNow(),
});

// Tabla de configuración admin
export const adminConfig = pgTable('admin_config', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tipos TypeScript
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Download = typeof downloads.$inferSelect;
export type AdminConfig = typeof adminConfig.$inferSelect; 