'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Download, Star, Calendar, FileIcon, ArrowLeft, Eye, Users } from 'lucide-react';
import Image from 'next/image';

interface ProductDetail {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  downloadCount: number;
  type: string;
  rating: number;
  reviews: number;
  category: string;
  description: string;
  longDescription: string;
  features: string[];
  requirements: string[];
  downloadUrl: string;
  images: string[];
  tags: string[];
}

// Helper functions for YouTube URLs
const isYouTubeUrl = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const getYouTubeEmbedUrl = (url: string): string => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return url;
  
  // Extract time parameter if exists
  const timeMatch = url.match(/[?&]t=(\d+)/);
  const startTime = timeMatch ? `&start=${timeMatch[1]}` : '';
  
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}${startTime}`;
};

const getYouTubeThumbnail = (url: string): string => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return '/products/placeholder-gaming.svg';
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Base de datos de productos simulada
    const products: ProductDetail[] = [
      {
        id: '1',
        name: 'Elementor Pro',
        size: '3,99 MB',
        uploadDate: '2025-06-09',
        downloadCount: 247,
        type: 'zip',
        rating: 4.8,
        reviews: 127,
        category: 'Wordpress',
        description: 'Plantillas y temas profesionales para WordPress.',
        longDescription: 'Elementor Pro es un plugin de WordPress que te permite crear diseños profesionales y personalizados para tu sitio web. Con Elementor Pro, puedes crear cualquier tipo de página web, desde un blog hasta un sitio de comercio electrónico.',
        features: [
          'Diseño profesional',
          'Elementos gráficos personalizables',
          'Diseño responsive',
          'Optimizado para SEO',
          'Diseño personalizable',
          'Diseño responsive',
          'Optimizado para SEO',
          'Diseño personalizable',
        ],
        requirements: [
          'WordPress 5.0 o superior',
          'Elementor Free',
        ],
                 downloadUrl: '/downloads/pro-elements.zip',
        images: [
          'https://elementor.com/wp-content/uploads/2023/09/02_MainVideo_1066_600_1.webm',
          'https://elementor.com/cdn-cgi/image/f=auto,w=1264/https://elementor.com/wp-content/uploads/2024/06/Soda-min.webp',
          'https://elementor.com/cdn-cgi/image/f=auto,w=1370/https://elementor.com/wp-content/uploads/2024/06/drag-and-drop.webp'
        ],
        tags: ['Wordpress', 'Elementor', 'Pro', 'Profesional']
      },
            {
        id: '2',
        name: 'Astra Pro',
        size: '3,75 MB',
        uploadDate: '2025-06-09',
        downloadCount: 183,
        type: 'zip',
        rating: 5.0,
        reviews: 89,
        category: 'Wordpress',
        description: 'Plantillas y temas profesionales para WordPress.',
        longDescription: 'Astra Pro es un tema premium de WordPress que te permite crear sitios web rápidos y profesionales. Con más de 100 plantillas incluidas y compatibilidad completa con page builders populares.',
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
        downloadUrl: '/downloads/Astra Pro 4.11.1.zip',
        images: [
          'https://youtu.be/uTgaDTAprI0?t=7',
          'https://cdn.shortpixel.ai/spai/w_825+q_lossless+ret_img+to_webp/wpastra.com/wp-content/uploads/2024/08/white-lable-visual.png',
          'https://cdn.shortpixel.ai/spai/w_1500+q_lossless+ret_img+to_webp/wpastra.com/wp-content/uploads/2024/11/blog-layouts.png',
        ],
        tags: ['Wordpress', 'Astra', 'Theme', 'Premium']
      },
      /*
      {
        id: '3',
        name: 'Preset Audio Gaming',
        size: '23.8 MB',
        uploadDate: '2024-01-10',
        downloadCount: 156,
        type: 'zip',
        rating: 4.9,
        reviews: 156,
        category: 'Audio',
        description: 'Presets de audio optimizados para gaming y streaming con efectos profesionales.',
        longDescription: 'Pack completo de presets de audio diseñados específicamente para gamers y streamers. Incluye efectos de voz, filtros de ruido y configuraciones optimizadas para diferentes tipos de contenido gaming.',
        features: [
          '30+ presets de voz para gaming',
          'Efectos de sonido inmersivos',
          'Configuraciones de EQ optimizadas',
          'Noise gate presets',
          'Configuraciones de compresión profesionales',
          'Compatible con OBS y Streamlabs'
        ],
        requirements: [
          'OBS Studio 27.0 o superior',
          'Voicemeeter (recomendado)',
          'Tarjeta de sonido compatible'
        ],
        downloadUrl: '/downloads/preset-audio-gaming.zip',
        images: [
          '/products/placeholder-gaming.svg'
        ],
        tags: ['Audio', 'Gaming', 'Streaming', 'Presets']
      },
      {
        id: '4',
        name: 'Overlay Pack Streaming',
        size: '67.3 MB',
        uploadDate: '2024-01-08',
        downloadCount: 203,
        type: 'zip',
        rating: 4.7,
        reviews: 94,
        category: 'Streaming',
        description: 'Colección completa de overlays y alertas para streaming profesional.',
        longDescription: 'Pack premium de overlays de streaming que incluye todo lo necesario para darle un aspecto profesional a tus transmisiones. Diseñados para diferentes tipos de contenido y compatibles con las principales plataformas.',
        features: [
          '25+ Overlays de pantalla completa',
          'Alertas de seguidor/suscriptor/donación',
          'Marcos para webcam',
          'Banners de "Stream Starting/Ending"',
          'Overlays de chat',
          'Indicadores de redes sociales'
        ],
        requirements: [
          'OBS Studio 26.0 o superior',
          'Streamlabs OBS compatible',
          'Resolución mínima 1080p'
        ],
        downloadUrl: '/downloads/overlay-pack-streaming.zip',
        images: [
          '/products/placeholder-gaming.svg'
        ],
        tags: ['Streaming', 'Overlays', 'OBS', 'Profesional']
      },
      {
        id: '5',
        name: 'Plantillas Thumbnails',
        size: '156.7 MB',
        uploadDate: '2024-01-05',
        downloadCount: 312,
        type: 'psd',
        rating: 4.8,
        reviews: 201,
        category: 'Diseño',
        description: 'Plantillas profesionales para thumbnails de YouTube con diferentes estilos.',
        longDescription: 'Colección premium de más de 50 plantillas de thumbnails para YouTube, diseñadas para maximizar el CTR de tus videos. Incluye elementos gráficos editables y guías de mejores prácticas.',
        features: [
          '50+ plantillas de thumbnails para YouTube',
          'Elementos gráficos editables',
          'Fuentes premium incluidas',
          'Texturas y efectos',
          'Guía de mejores prácticas',
          'Múltiples categorías (Gaming, Tech, Vlogs)'
        ],
        requirements: [
          'Adobe Photoshop CS6 o superior',
          'Resolución 1280x720 mínima',
          '2GB de espacio disponible'
        ],
        downloadUrl: '/downloads/plantillas-thumbnails.psd',
        images: [
          '/products/placeholder-gaming.svg'
        ],
        tags: ['Diseño', 'YouTube', 'Thumbnails', 'Templates']
      },
      {
        id: '6',
        name: 'Efectos Transición',
        size: '89.4 MB',
        uploadDate: '2024-01-03',
        downloadCount: 178,
        type: 'zip',
        rating: 4.5,
        reviews: 67,
        category: 'Edición',
        description: 'Pack de efectos de transición únicos para edición de video profesional.',
        longDescription: 'Pack completo de efectos de transición cinematográficos para editores de video. Incluye transiciones únicas, presets para diferentes software y tutoriales de instalación.',
        features: [
          '40+ efectos de transición únicos',
          'Presets para diferentes software',
          'Tutoriales de instalación',
          'Efectos de audio sincronizados',
          'Plantillas editables',
          'Múltiples resoluciones disponibles'
        ],
        requirements: [
          'Adobe Premiere Pro CC 2019+',
          'After Effects CC 2019+',
          '4GB de espacio disponible'
        ],
        downloadUrl: '/downloads/efectos-transicion.zip',
        images: [
          '/products/placeholder-gaming.svg'
        ],
        tags: ['Edición', 'Transiciones', 'Video', 'Premiere']
      }
      */
    ];

    const foundProduct = products.find(p => p.id === params.id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [params.id]);

  const handleDownload = () => {
    if (product) {
      const link = document.createElement('a');
      link.href = product.downloadUrl;
      const fileName = product.downloadUrl.split('/').pop() || `${product.name}.${product.type}`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setProduct(prev => prev ? { ...prev, downloadCount: prev.downloadCount + 1 } : null);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Producto no encontrado</h2>
          <button
            onClick={() => router.back()}
            className="text-purple-600 hover:text-purple-700 flex items-center mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver atrás
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver
              </button>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-xl font-bold text-purple-600 font-orbitron">KonlyZx</h1>
            </div>
            <span className="text-sm text-gray-500">Detalles del Producto</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Media Gallery */}
          <div className="flex flex-col-reverse">
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-2" aria-orientation="horizontal">
                {product.images.map((media, index) => {
                  const isVideo = media.includes('.mp4') || media.includes('.webm') || media.includes('.mov');
                  const isDemo = media.includes('.html');
                  const isYouTube = isYouTubeUrl(media);
                  return (
                    <button
                      key={index}
                      className={`relative h-16 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-purple-500 ${
                        index === selectedImage ? 'ring-2 ring-purple-500' : 'border border-gray-300'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      {isDemo ? (
                        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-md flex items-center justify-center">
                          <span className="text-white text-xs font-bold">DEMO</span>
                        </div>
                      ) : isYouTube ? (
                        <Image
                          src={getYouTubeThumbnail(media)}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover rounded-md"
                        />
                      ) : isVideo ? (
                        <video
                          src={media}
                          className="w-full h-full object-cover rounded-md"
                          muted
                          preload="metadata"
                        />
                      ) : (
                        <Image
                          src={media}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover rounded-md"
                        />
                      )}
                      {(isVideo || isDemo || isYouTube) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md">
                          <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-l-2 border-l-black border-y-1 border-y-transparent ml-0.5"></div>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-full aspect-video bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-xl overflow-hidden shadow-2xl">
              <div className="relative h-full w-full">
                {product.images[selectedImage]?.includes('.html') ? (
                  <iframe
                    src={product.images[selectedImage]}
                    className="w-full h-full border-0"
                    title="Demo Interactiva"
                  />
                ) : isYouTubeUrl(product.images[selectedImage]) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(product.images[selectedImage])}
                    className="w-full h-full border-0"
                    title="Video de YouTube"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : product.images[selectedImage]?.includes('.mp4') || 
                     product.images[selectedImage]?.includes('.webm') || 
                     product.images[selectedImage]?.includes('.mov') ? (
                  <video
                    src={product.images[selectedImage]}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                )}
                {!product.images[selectedImage]?.includes('.html') && !isYouTubeUrl(product.images[selectedImage]) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            {/* Category Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 mb-4">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              {product.category}
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 font-orbitron mb-2">
              {product.name}
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Calificación</p>
                    <p className="text-2xl font-bold text-purple-900">{product.rating}</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-400 fill-current" />
                </div>
                <p className="text-xs text-purple-600 mt-1">{product.reviews} reseñas</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Descargas</p>
                    <p className="text-2xl font-bold text-blue-900">{product.downloadCount}</p>
                  </div>
                  <Download className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-xs text-blue-600 mt-1">Este mes</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Tamaño</p>
                    <p className="text-lg font-bold text-green-900">{product.size}</p>
                  </div>
                  <FileIcon className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-xs text-green-600 mt-1">Total</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-600 font-medium">Fecha</p>
                    <p className="text-sm font-bold text-orange-900">
                      {new Date(product.uploadDate).toLocaleDateString('es-ES', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-xs text-orange-600 mt-1">Actualizado</p>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Download Button */}
            <div className="mb-10">
              <button
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 text-white py-6 px-8 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-500 flex items-center justify-center space-x-4 font-bold text-xl transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Download className="w-8 h-8 group-hover:animate-bounce" />
                <span>Descargar Gratis</span>
              </button>
              <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Descarga inmediata
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Sin registro
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  100% gratis
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl mb-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-orbitron">Descripción</h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">{product.longDescription}</p>
            </div>

            {/* Features */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl mb-8 border border-green-200">
              <h3 className="text-2xl font-bold text-green-900 mb-6 font-orbitron flex items-center">
                <Star className="w-6 h-6 text-green-600 mr-3" />
                Qué incluye
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start bg-white p-4 rounded-xl shadow-sm border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 font-orbitron flex items-center">
                <Eye className="w-6 h-6 text-blue-600 mr-3" />
                Requisitos del sistema
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.requirements.map((req, index) => (
                  <div key={index} className="flex items-start bg-white p-4 rounded-xl shadow-sm border border-blue-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-16 space-y-12">
          {/* Reviews Section */}
          <section className="bg-gradient-to-br from-yellow-50 to-orange-100 p-8 rounded-3xl border border-yellow-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 font-orbitron text-center">
              Lo que dicen nuestros usuarios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Carlos M.", rating: 5, comment: "Increíble calidad y muy fácil de usar. Perfecto para mis streams." },
                { name: "Ana L.", rating: 5, comment: "Los overlays son exactamente lo que necesitaba. ¡Súper recomendado!" },
                { name: "Diego R.", rating: 4, comment: "Excelente pack, tiene todo lo necesario para contenido profesional." }
              ].map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-yellow-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-900">{review.name}</p>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">&quot;{review.comment}&quot;</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Products */}
          <section className="bg-gradient-to-br from-indigo-50 to-purple-100 p-8 rounded-3xl border border-indigo-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 font-orbitron text-center">
              También te puede interesar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 1, name: "Elementor Pro", category: "Wordpress", rating: 4.8 },
                { id: 2, name: "Astra Pro", category: "Wordpress", rating: 5.0 }
              ].filter(p => p.id !== parseInt(product.id)).slice(0, 3).map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {relatedProduct.category}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-600">{relatedProduct.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{relatedProduct.name}</h3>
                  <button
                    onClick={() => window.location.href = `/producto/${relatedProduct.id}`}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium"
                  >
                    Ver Detalles
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Support Section */}
          <section className="bg-gradient-to-br from-teal-50 to-cyan-100 p-8 rounded-3xl border border-teal-200">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-orbitron">¿Necesitas ayuda?</h2>
              <p className="text-xl text-gray-600 mb-8">Estamos aquí para apoyarte en tu journey creativo</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-teal-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Comunidad</h3>
                  <p className="text-gray-600 text-sm">Únete a nuestro Discord para consejos y soporte</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-teal-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tutoriales</h3>
                  <p className="text-gray-600 text-sm">Guías paso a paso para usar nuestros recursos</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-teal-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Actualizaciones</h3>
                  <p className="text-gray-600 text-sm">Recibe nuevos recursos y actualizaciones gratis</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 