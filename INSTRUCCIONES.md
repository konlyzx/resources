# KonlyZx Downloads - Guía de Usuario

## 📁 Estructura de Carpetas

### `/public/downloads/`
Esta es la carpeta principal donde debes subir todos los archivos que quieres que tus suscriptores puedan descargar.

**Archivos soportados:**
- ZIP, RAR (packs de recursos)
- PSD (plantillas de Photoshop)
- MP3, WAV (presets de audio)
- AE (plantillas de After Effects)
- PR (plantillas de Premiere Pro)
- Cualquier otro tipo de archivo

### `/public/products/`
Aquí van las imágenes de vista previa de tus productos (thumbnails, capturas de pantalla, etc.)

## 🔧 Cómo Agregar Nuevos Productos

### Paso 1: Subir el archivo real
1. Coloca tu archivo en la carpeta `/public/downloads/`
2. Ejemplo: `mi-pack-gaming.zip`

### Paso 2: Agregar imágenes del producto
1. Coloca las imágenes en `/public/products/`
2. Ejemplo: `mi-pack-gaming-preview.jpg`

### Paso 3: Actualizar el código
Ve al archivo `src/app/producto/[id]/page.tsx` y agrega tu producto en la array `products`:

```javascript
{
  id: '7',  // Nuevo ID único
  name: 'Mi Pack Gaming',  // Nombre del producto
  size: '156.2 MB',  // Tamaño del archivo
  uploadDate: '2024-06-09',  // Fecha de subida
  downloadCount: 0,  // Empezar en 0
  type: 'zip',  // Tipo de archivo
  rating: 5.0,  // Calificación (1-5)
  reviews: 0,  // Número de reseñas
  category: 'Gaming',  // Categoría
  description: 'Descripción corta para la página principal',
  longDescription: 'Descripción detallada para la página de detalles...',
  features: [
    'Característica 1',
    'Característica 2',
    // Más características...
  ],
  requirements: [
    'Requisito 1',
    'Requisito 2',
    // Más requisitos...
  ],
  downloadUrl: '/downloads/mi-pack-gaming.zip',  // Ruta al archivo real
  images: [
    '/products/mi-pack-gaming-preview.jpg',
    // Más imágenes si tienes...
  ],
  tags: ['Gaming', 'Pack', 'Premium']  // Etiquetas para categorizar
}
```

### Paso 4: Actualizar la página principal
Ve al archivo `src/app/page.tsx` y agrega el producto también en la array `sampleFiles`:

```javascript
{
  id: '7',  // Mismo ID que arriba
  name: 'Mi Pack Gaming',
  size: '156.2 MB',
  uploadDate: '2024-06-09',
  downloadCount: 0,
  type: 'zip',
  rating: 5.0,
  reviews: 0,
  category: 'Gaming',
  description: 'Descripción corta para la página principal'
}
```

## 🎨 Personalizaciones Adicionales

### Cambiar colores del tema
En `tailwind.config.js` puedes modificar los colores principales:
- `purple-600` → Color principal
- `blue-600` → Color secundario

### Agregar más animaciones
Las animaciones están en `src/lib/animations.ts` usando GSAP.

### Modificar el diseño
- Header: `src/app/page.tsx` y `src/app/producto/[id]/page.tsx`
- Estilos: Archivos de componentes individuales

## 📊 Funcionalidades Actuales

✅ **Implementado:**
- Página principal con grid de productos
- Páginas de detalles individuales con:
  - Galería de imágenes
  - Descripción completa
  - Lista de características
  - Requisitos del sistema
  - Calificaciones y reseñas
  - Botón de descarga funcional
- Animaciones con scroll (GSAP + Lenis)
- Diseño responsive
- Hover effects y micro-interacciones

🔄 **Para implementar en el futuro:**
- Sistema de comentarios
- Contador de descargas automático
- Panel de administración
- Base de datos real
- Sistema de usuarios
- Analytics de descargas

## 🚀 Comandos Útiles

```bash
# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm start
```

## 📝 Notas Importantes

1. **Archivos grandes**: Si tus archivos son muy grandes (>100MB), considera usar servicios de almacenamiento externos como Google Drive o Dropbox y cambiar el `downloadUrl` a ese enlace.

2. **SEO**: Cada página de producto tiene metadata optimizada automáticamente.

3. **Performance**: Las imágenes se optimizan automáticamente con Next.js Image.

4. **Seguridad**: Los archivos en `/public/` son accesibles por cualquiera, ten esto en cuenta.

---

¡Listo! Con esta estructura puedes fácilmente agregar, modificar o eliminar productos de tu sitio web de descargas. 