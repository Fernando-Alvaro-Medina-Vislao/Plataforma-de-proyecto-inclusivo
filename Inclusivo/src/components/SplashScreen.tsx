import { Accessibility } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary flex flex-col items-center justify-center px-6 animate-in fade-in duration-500">
      {/* Logo/Icon */}
      <div className="mb-6 relative">
        <div className="w-32 h-32 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
          <Accessibility 
            className="w-20 h-20 text-white" 
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* App Name */}
      <h1 className="text-white mb-3 text-center tracking-tight">
        AccessiLearn
      </h1>

      {/* Tagline */}
      <p className="text-white/90 text-center max-w-xs">
        Educación accesible para todos
      </p>

      {/* Loading indicator */}
      <div className="mt-12">
        <div className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full animate-pulse"
            style={{ width: '60%' }}
            role="progressbar"
            aria-label="Cargando aplicación"
            aria-valuenow={60}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* Hidden screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        AccessiLearn. Educación accesible para todos. Cargando aplicación.
      </div>
    </div>
  );
}
