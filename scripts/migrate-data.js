// Script para migrar datos existentes a la base de datos
const { neon } = require('@netlify/neon');

const mockData = [
  {
    name: 'Elementor Pro',
    description: 'Plantillas y temas profesionales para WordPress.',
    longDescription: 'Elementor Pro es un plugin de WordPress que te permite crear diseños profesionales y personalizados para tu sitio web. Con Elementor Pro, puedes crear cualquier tipo de página web, desde un blog hasta un sitio de comercio electrónico.',
    size: '3,99 MB',
    type: 'zip',
    category: 'Wordpress',
    downloadUrl: '/downloads/pro-elements.zip',
    images: [
      'https://elementor.com/cdn-cgi/image/f=auto,w=1264/https://elementor.com/wp-content/uploads/2024/06/Soda-min.webp',
      'https://elementor.com/cdn-cgi/image/f=auto,w=1370/https://elementor.com/wp-content/uploads/2024/06/drag-and-drop.webp'
    ],
    features: [
      'Diseño profesional',
      'Elementos gráficos personalizables',
      'Diseño responsive',
      'Optimizado para SEO',
      'Diseño personalizable'
    ],
    requirements: [
      'WordPress 5.0 o superior',
      'Elementor Free'
    ],
    tags: ['Wordpress', 'Elementor', 'Pro', 'Profesional'],
    rating: '4.8',
    reviews: 127,
    downloadCount: 247
  },
  {
    name: 'Astra Pro',
    description: 'Plantillas y temas profesionales para WordPress.',
    longDescription: 'Astra Pro es un tema premium de WordPress que te permite crear sitios web rápidos y profesionales. Con más de 100 plantillas incluidas y compatibilidad completa con page builders populares.',
    size: '3,75 MB',
    type: 'zip',
    category: 'Wordpress',
    downloadUrl: '/downloads/Astra Pro 4.11.1.zip',
    images: [
      'https://youtu.be/uTgaDTAprI0?t=7',
      'https://cdn.shortpixel.ai/spai/w_825+q_lossless+ret_img+to_webp/wpastra.com/wp-content/uploads/2024/08/white-lable-visual.png',
      'https://cdn.shortpixel.ai/spai/w_1500+q_lossless+ret_img+to_webp/wpastra.com/wp-content/uploads/2024/11/blog-layouts.png'
    ],
    features: [
      'Más de 100 plantillas premium',
      'Diseño ultra rápido y ligero',
      'Compatible con WooCommerce',
      'Totalmente responsive',
      'SEO optimizado',
      'Soporte para page builders'
    ],
    requirements: [
      'WordPress 5.0 o superior',
      'PHP 7.4 o superior',
      'Memoria mínima 256MB'
    ],
    tags: ['Wordpress', 'Astra', 'Theme', 'Premium'],
    rating: '5.0',
    reviews: 89,
    downloadCount: 183
  }
];

async function migrateData() {
  try {
    console.log('🚀 Iniciando migración de datos...');
    
    const sql = neon();
    
    // Crear tablas
    console.log('📊 Creando tablas...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        long_description TEXT NOT NULL,
        size TEXT NOT NULL,
        type TEXT NOT NULL,
        category TEXT NOT NULL,
        download_url TEXT NOT NULL,
        images TEXT[] DEFAULT '{}',
        features TEXT[] DEFAULT '{}',
        requirements TEXT[] DEFAULT '{}',
        tags TEXT[] DEFAULT '{}',
        rating DECIMAL(2,1) DEFAULT 0.0,
        reviews INTEGER DEFAULT 0,
        download_count INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS downloads (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        user_agent TEXT,
        ip_address TEXT,
        downloaded_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS admin_config (
        id SERIAL PRIMARY KEY,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    console.log('✅ Tablas creadas exitosamente');
    
    // Insertar datos de prueba
    console.log('📝 Insertando datos de prueba...');
    
    for (const product of mockData) {
      await sql`
        INSERT INTO products (
          name, description, long_description, size, type, category,
          download_url, images, features, requirements, tags,
          rating, reviews, download_count
        ) VALUES (
          ${product.name}, ${product.description}, ${product.longDescription},
          ${product.size}, ${product.type}, ${product.category},
          ${product.downloadUrl}, ${product.images}, ${product.features},
          ${product.requirements}, ${product.tags}, ${product.rating},
          ${product.reviews}, ${product.downloadCount}
        )
      `;
    }
    
    console.log('🎉 Migración completada exitosamente!');
    console.log(`✅ ${mockData.length} productos insertados`);
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
  }
}

migrateData(); 