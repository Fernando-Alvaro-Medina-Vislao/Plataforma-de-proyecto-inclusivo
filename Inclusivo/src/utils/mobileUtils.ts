// Utilidades para mejorar la experiencia móvil

/**
 * Detecta si el dispositivo es móvil
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Detecta si es un dispositivo táctil
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

/**
 * Prevenir zoom en inputs (para mejor accesibilidad)
 */
export function preventInputZoom() {
  const viewport = document.querySelector('meta[name=viewport]');
  if (viewport) {
    viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    );
  }
}

/**
 * Permitir zoom (para accesibilidad)
 */
export function allowZoom() {
  const viewport = document.querySelector('meta[name=viewport]');
  if (viewport) {
    viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
    );
  }
}

/**
 * Vibración háptica
 */
export function vibrate(pattern: number | number[]) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

/**
 * Feedback háptico corto (para botones)
 */
export function hapticFeedback() {
  vibrate(50);
}

/**
 * Feedback háptico de éxito
 */
export function hapticSuccess() {
  vibrate([100, 50, 100]);
}

/**
 * Feedback háptico de error
 */
export function hapticError() {
  vibrate([200, 100, 200]);
}

/**
 * Prevenir el rebote (bounce) en iOS
 */
export function preventBounce() {
  document.body.style.overscrollBehavior = 'none';
}

/**
 * Obtener la altura segura del viewport (considerando barras del sistema)
 */
export function getSafeViewportHeight(): number {
  if (typeof window === 'undefined') return 0;
  
  // En iOS, window.innerHeight incluye la barra de navegación
  // Usamos visualViewport si está disponible
  if (window.visualViewport) {
    return window.visualViewport.height;
  }
  
  return window.innerHeight;
}

/**
 * Detectar orientación del dispositivo
 */
export function getOrientation(): 'portrait' | 'landscape' {
  if (typeof window === 'undefined') return 'portrait';
  
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
}

/**
 * Escuchar cambios de orientación
 */
export function onOrientationChange(callback: (orientation: 'portrait' | 'landscape') => void) {
  if (typeof window === 'undefined') return;
  
  const handleOrientationChange = () => {
    callback(getOrientation());
  };
  
  window.addEventListener('resize', handleOrientationChange);
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', handleOrientationChange);
  };
}

/**
 * Ocultar la barra de direcciones en móviles
 */
export function hideAddressBar() {
  if (!isMobileDevice()) return;
  
  setTimeout(() => {
    window.scrollTo(0, 1);
  }, 0);
}

/**
 * Prevenir el pull-to-refresh en Chrome móvil
 */
export function preventPullToRefresh() {
  let startY = 0;
  
  document.addEventListener('touchstart', (e) => {
    startY = e.touches[0].pageY;
  });
  
  document.addEventListener('touchmove', (e) => {
    const y = e.touches[0].pageY;
    
    // Si estamos en el top de la página y jalando hacia abajo
    if (document.documentElement.scrollTop === 0 && y > startY) {
      e.preventDefault();
    }
  }, { passive: false });
}

/**
 * Obtener información del dispositivo
 */
export function getDeviceInfo() {
  return {
    isMobile: isMobileDevice(),
    isTouch: isTouchDevice(),
    orientation: getOrientation(),
    viewportHeight: getSafeViewportHeight(),
    pixelRatio: window.devicePixelRatio || 1,
    platform: navigator.platform,
    userAgent: navigator.userAgent,
  };
}

/**
 * Inicializar configuraciones móviles para accesibilidad
 */
export function initMobileAccessibility() {
  if (!isMobileDevice()) return;
  
  // Permitir zoom para accesibilidad
  allowZoom();
  
  // Prevenir bounce en iOS
  preventBounce();
  
  // Prevenir pull-to-refresh
  preventPullToRefresh();
  
  // Agregar clase para CSS específico de móvil
  document.documentElement.classList.add('mobile-device');
  
  if (isTouchDevice()) {
    document.documentElement.classList.add('touch-device');
  }
}
