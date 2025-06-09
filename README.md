# 🎮 KonlyZx Downloads - Centro de Descargas Oficial

Una aplicación web moderna para que los suscriptores del canal de YouTube **KonlyZx** puedan descargar recursos exclusivos, packs de edición, presets y mucho más contenido creado especialmente para la comunidad.

## ✨ Características

- **🏠 Página Principal**: Vista pública con archivos disponibles para descarga
- **👥 Para Suscriptores**: Acceso gratuito a todos los recursos
- **⚡ Interfaz Moderna**: Diseño gaming con gradientes y efectos visuales
- **📱 Responsive**: Funciona perfectamente en móviles y desktop
- **🔧 Panel Admin**: Gestión fácil de archivos (subida, eliminación)
- **📊 Estadísticas**: Seguimiento de descargas y archivos
- **🎨 Fuentes Personalizadas**: Orbitron y Rajdhani para un look profesional

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Fuentes**: Google Fonts (Orbitron, Rajdhani)
- **UI**: Componentes personalizados con efectos glassmorphism

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18.0 o superior
- npm o yarn

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/KonlyZx/downloads-center.git
   cd downloads-center
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecuta en modo desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abre tu navegador**
   Visita [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── admin/          # Panel de administración
│   │   └── page.tsx    # Página para subir archivos
│   ├── globals.css     # Estilos globales
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página de inicio
└── lib/                # Utilidades (futuro)
```

## 🎯 Páginas Principales

### 🏠 Página Principal (`/`)
- Muestra archivos disponibles para descarga
- Información del canal de YouTube
- Estadísticas de descargas
- Enlaces al canal oficial

### ⚙️ Panel Admin (`/admin`)
- Subida de archivos con drag & drop
- Gestión de archivos existentes
- Estadísticas detalladas
- Eliminación de archivos

## 🎨 Características de Diseño

- **Tema Gaming**: Colores púrpura, azul y gradientes modernos
- **Efectos Glassmorphism**: Cards transparentes con blur
- **Animaciones Suaves**: Hover effects y transiciones
- **Iconografía Consistente**: Iconos de Lucide React
- **Responsive Design**: Adaptado para todos los dispositivos

## 🔧 Personalización

### Colores del Tema
Los colores principales se pueden modificar en `globals.css`:
- `--background-start-rgb`: Color de inicio del gradiente
- `--background-end-rgb`: Color final del gradiente

### Fuentes
Las fuentes están configuradas en `layout.tsx`:
- **Orbitron**: Para títulos y headings
- **Rajdhani**: Para texto general

## 📦 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a [Vercel](https://vercel.com)
2. El despliegue es automático con cada push

### Otros Proveedores
```bash
# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 🔮 Próximas Características

- [ ] Base de datos para persistencia de archivos
- [ ] Sistema de autenticación para admin
- [ ] API REST para gestión de archivos
- [ ] Búsqueda y filtros avanzados
- [ ] Sistema de categorías
- [ ] Comentarios y ratings
- [ ] Notificaciones push para nuevos archivos

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Canal de YouTube**: [KonlyZx](https://www.youtube.com/@konlyzxx)
- **Creado por**: KonlyZx
- **Sitio Web**: [KonlyZx Downloads](https://konlyzx-downloads.vercel.app)

---

⭐ **¡No olvides darle una estrella al proyecto si te gustó!**

🔥 **¡Y suscríbete al canal de YouTube para más contenido!**
