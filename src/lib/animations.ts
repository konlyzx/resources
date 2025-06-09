import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins de GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Smooth scrolling básico con CSS
export const initSmoothScrolling = () => {
  if (typeof window === 'undefined') return null;

  // Aplicar smooth scrolling con CSS
  document.documentElement.style.scrollBehavior = 'smooth';
  
  return null;
};

// Animaciones para las cards
export const animateCards = () => {
  if (typeof window === 'undefined') return;

  // Animación de entrada para las cards
  gsap.fromTo('.file-card', 
    {
      y: 60,
      opacity: 0,
      scale: 0.9
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.files-grid',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Efecto parallax para los iconos
  gsap.to('.file-icon', {
    y: -30,
    duration: 1,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.files-grid',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });
};

// Animación para el header
export const animateHeader = () => {
  if (typeof window === 'undefined') return;

  gsap.fromTo('.header-content',
    {
      y: -20,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      delay: 0.2
    }
  );
};

// Animación para el título principal
export const animateTitle = () => {
  if (typeof window === 'undefined') return;

  gsap.fromTo('.main-title',
    {
      y: 40,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      delay: 0.5
    }
  );

  gsap.fromTo('.main-subtitle',
    {
      y: 20,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      delay: 0.8
    }
  );
};

// Animación para las tabs
export const animateTabs = () => {
  if (typeof window === 'undefined') return;

  gsap.fromTo('.nav-tabs',
    {
      y: 20,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: 1
    }
  );
};

// Animación hover para las cards
export const setupCardHoverAnimations = () => {
  if (typeof window === 'undefined') return;

  const cards = document.querySelectorAll('.file-card');
  
  cards.forEach((card) => {
    const icon = card.querySelector('.file-icon');
    const button = card.querySelector('.download-button');
    
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      if (icon) {
        gsap.to(icon, {
          rotation: 5,
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      
      if (button) {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      if (icon) {
        gsap.to(icon, {
          rotation: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      
      if (button) {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    });
  });
};

// Función principal para inicializar todas las animaciones
export const initAnimations = () => {
  if (typeof window === 'undefined') return;

  // Verificar si las animaciones ya se ejecutaron en esta sesión completa
  const animationsExecuted = sessionStorage.getItem('animations-executed');
  
  // Inicializar smooth scrolling básico siempre
  initSmoothScrolling();

  // Si las animaciones ya se ejecutaron, solo configurar hover effects
  if (animationsExecuted === 'true') {
    // Configurar elementos en su estado final (visible)
    gsap.set('.file-card', { opacity: 1, y: 0, scale: 1 });
    gsap.set('.header-content', { opacity: 1, y: 0 });
    gsap.set('.main-title', { opacity: 1, y: 0 });
    gsap.set('.main-subtitle', { opacity: 1, y: 0 });
    gsap.set('.nav-tabs', { opacity: 1, y: 0 });

    // Solo configurar hover effects
    setTimeout(() => {
      setupCardHoverAnimations();
    }, 100);

    return null;
  }

  // Primera vez en la sesión - ejecutar animaciones completas
  // Configurar animaciones cuando el DOM esté listo
  gsap.set('.file-card', { opacity: 0, y: 60, scale: 0.9 });
  gsap.set('.header-content', { opacity: 0, y: -20 });
  gsap.set('.main-title', { opacity: 0, y: 40 });
  gsap.set('.main-subtitle', { opacity: 0, y: 20 });
  gsap.set('.nav-tabs', { opacity: 0, y: 20 });

  // Ejecutar animaciones
  setTimeout(() => {
    animateHeader();
    animateTitle();
    animateTabs();
    animateCards();
    setupCardHoverAnimations();

    // Marcar las animaciones como ejecutadas en esta sesión
    sessionStorage.setItem('animations-executed', 'true');
  }, 100);

  return null;
};
