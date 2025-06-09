'use client';

import { useState, useEffect } from 'react';
import { Download, Star, Calendar, FileIcon } from 'lucide-react';
import { initAnimations } from '@/lib/animations';
import Link from 'next/link';

interface FileItem {
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
}

export default function Home() {
  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    const sampleFiles: FileItem[] = [
      {
        id: '1',
        name: 'Elementor Pro',
        size: '3,99 MB',
        uploadDate: '2025-06-09',
        downloadCount: 247,
        type: 'zip',
        rating: 5.0,
        reviews: 127,
        category: 'Wordpress',
        description: 'Plantillas y temas profesionales para WordPress.'
      },
      {
        id: '2',
        name: 'Astra Pro',
        size: '128.5 MB',
        uploadDate: '2025-06-09',
        downloadCount: 183,
        type: 'zip',
        rating: 5.0,
        reviews: 89,
        category: 'Wordpress',
        description: 'Plantillas y temas profesionales para WordPress.'
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
        description: 'Presets de audio optimizados para gaming y streaming con efectos profesionales.'
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
        description: 'Colección completa de overlays y alertas para streaming profesional.'
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
        description: 'Plantillas profesionales para thumbnails de YouTube con diferentes estilos.'
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
        description: 'Pack de efectos de transición únicos para edición de video profesional.'
      }
      */
    ];
    setFiles(sampleFiles);

    const timer = setTimeout(() => {
      initAnimations();
    }, 500);

    return () => clearTimeout(timer);
  }, []);



  const getFileIcon = (type: string, category: string) => {
    const iconSize = "w-12 h-12";
    
    // Iconos SVG específicos por tipo de archivo
    const getIconSVG = () => {
      switch (type.toLowerCase()) {
        case 'zip':
        case 'rar':
          return (
            <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              <path d="M10.05,11.22L12.88,14.05L15,11.93V19H9V11.93L10.05,11.22M10.05,11.22"/>
            </svg>
          );
        case 'psd':
          return (
            <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14A7,7 0 0,1 14,21H10A7,7 0 0,1 3,14A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M12,4.5A0.5,0.5 0 0,0 11.5,4A0.5,0.5 0 0,0 12,3.5A0.5,0.5 0 0,0 12.5,4A0.5,0.5 0 0,0 12,4.5Z"/>
            </svg>
          );
        case 'mp3':
        case 'wav':
          return (
            <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>
            </svg>
          );
        default:
          if (category.toLowerCase().includes('wordpress')) {
            return (
              <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.158,12.786L9.46,20.625C10.289,20.875 11.174,21 12.096,21C13.303,21 14.457,20.769 15.515,20.35C15.484,20.287 15.458,20.223 15.432,20.158L12.158,12.786M3.009,12C3.009,16.296 5.513,20.001 9.309,21.604L4.291,9.513C3.487,10.252 3.009,11.079 3.009,12M18.069,11.546C18.069,10.364 17.645,9.54 17.289,8.934C16.824,8.221 16.381,7.615 16.381,6.902C16.381,6.188 16.824,5.582 17.536,5.582H17.582C15.693,3.847 13.152,2.895 12.096,2.895C9.513,2.895 7.289,4.006 5.778,5.691H6.144C7.622,5.691 9.756,5.473 9.756,5.473C10.578,5.429 10.666,6.688 9.844,6.732C9.844,6.732 9.022,6.819 8.091,6.863L12.931,19.389L15.847,10.976L13.674,6.819C12.852,6.775 12.074,6.688 12.074,6.688C11.252,6.645 11.34,5.386 12.162,5.429C12.162,5.429 14.34,5.647 15.731,5.647C17.209,5.647 19.343,5.429 19.343,5.429C20.165,5.386 20.252,6.645 19.431,6.688C19.431,6.688 18.608,6.775 17.677,6.819L22.473,19.303L23.916,15.052C24.359,13.631 24.758,12.515 24.758,11.567C24.758,10.81 24.515,10.276 24.293,9.741C23.916,8.984 23.538,8.295 23.538,7.581C23.538,6.732 24.137,5.975 25.025,5.975C25.069,5.975 25.113,5.975 25.158,5.975C22.518,3.518 18.937,2 15,2C10.063,2 5.482,3.518 2.842,5.975C2.887,5.975 2.931,5.975 2.975,5.975C3.863,5.975 4.462,6.732 4.462,7.581C4.462,8.295 4.084,8.984 3.707,9.741C3.485,10.276 3.242,10.81 3.242,11.567C3.242,12.515 3.641,13.631 4.084,15.052L5.527,19.303L10.323,6.819C9.392,6.775 8.57,6.688 8.57,6.688C7.748,6.645 7.835,5.386 8.657,5.429C8.657,5.429 10.835,5.647 12.226,5.647L18.069,11.546Z"/>
              </svg>
            );
          }
          return (
            <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
          );
      }
    };

    // Colores por categoría
    const getBackgroundColor = () => {
      switch (category.toLowerCase()) {
        case 'wordpress':
          return 'bg-blue-600';
        case 'gaming':
          return 'bg-purple-600';
        case 'audio':
          return 'bg-green-600';
        case 'edición':
          return 'bg-red-600';
        case 'streaming':
          return 'bg-indigo-600';
        case 'diseño':
          return 'bg-pink-600';
        default:
          return 'bg-gray-600';
      }
    };

    return (
      <div className={`${getBackgroundColor()} p-3 rounded-lg file-icon text-white`}>
        {getIconSVG()}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 header-content">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-purple-600 font-orbitron">KonlyZx</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Centro de Descargas</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-orbitron main-title">KonlyZx Downloads</h1>
          <p className="text-gray-600 main-subtitle">Descarga recursos exclusivos y herramientas profesionales</p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8 nav-tabs">
          <nav className="-mb-px flex space-x-8">
            <button className="border-b-2 border-purple-500 py-2 px-1 text-sm font-medium text-purple-600 transition-colors duration-200">
              Descubre
            </button>
          </nav>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 files-grid">
          {files.map((file) => (
            <div key={file.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden file-card">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  {getFileIcon(file.type, file.category)}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate font-rajdhani">
                      {file.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {file.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="font-medium">{file.size}</span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(file.uploadDate).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 transition-colors duration-200 ${
                              i < Math.floor(file.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-600 font-medium">
                        {file.rating} ({file.reviews})
                      </span>
                    </div>  
                  </div>
                </div>
                
                <Link
                  href={`/producto/${file.id}`}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 font-medium download-button transform hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>Ver Detalles</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Section */}
        <section className="mt-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-orbitron">
              Recursos de Calidad Profesional
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Todos nuestros recursos están creados con los más altos estándares de calidad 
              para ayudarte a llevar tu contenido al siguiente nivel.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Calidad Premium</h3>
                <p className="text-gray-600">Recursos profesionales creados por expertos</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Descarga Gratuita</h3>
                <p className="text-gray-600">Todos los recursos están disponibles sin costo</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Variedad</h3>
                <p className="text-gray-600">Diferentes categorías para todas tus necesidades</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 font-orbitron">KonlyZx</h3>
            <p className="text-gray-500 text-sm mb-4">
              © 2024 KonlyZx. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-xs">
              Recursos exclusivos para la comunidad de creadores de contenido
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
