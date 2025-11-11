import { useState } from 'react';
import { ArrowLeft, Search, Mic, MapPin, Navigation as NavigationIcon, X, TrendingUp, Clock, Accessibility } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Screen } from '../App';
import { toast } from 'sonner';
import BottomNav from './BottomNav';

interface NavigationScreenProps {
  onNavigate: (screen: Screen) => void;
}

type NavState = 'search' | 'active';

export default function NavigationScreen({ onNavigate }: NavigationScreenProps) {
  const [navState, setNavState] = useState<NavState>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [destination, setDestination] = useState('');

  const frequentDestinations = [
    { id: 1, name: 'Biblioteca', icon: '📚' },
    { id: 2, name: 'Cafetería', icon: '☕' },
    { id: 3, name: 'Laboratorio 301', icon: '💻' },
    { id: 4, name: 'Auditorio', icon: '🎭' },
    { id: 5, name: 'Edificio Principal', icon: '🏛️' },
    { id: 6, name: 'Baños Accesibles', icon: '♿' },
  ];

  const handleStartNavigation = (dest: string) => {
    setDestination(dest);
    setNavState('active');
    toast.success(`Iniciando navegación a ${dest}`);
  };

  const handleStopNavigation = () => {
    setNavState('search');
    setDestination('');
    toast.info('Navegación detenida');
  };

  if (navState === 'active') {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Map Area */}
        <div className="relative h-[45vh] bg-gradient-to-br from-success/20 to-info/20">
          {/* Simplified Map Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full p-8">
              {/* Route Line */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                <path
                  d="M 60 300 Q 150 250, 200 200 T 300 100"
                  stroke="#4CAF50"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="10 5"
                  className="animate-pulse"
                />
              </svg>

              {/* Current Location */}
              <div className="absolute bottom-24 left-12 z-10">
                <div className="relative">
                  <div className="w-12 h-12 bg-info rounded-full border-4 border-white shadow-lg animate-pulse flex items-center justify-center">
                    <NavigationIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/70 text-white px-2 py-1 rounded text-xs">
                    Tu ubicación
                  </div>
                </div>
              </div>

              {/* Destination */}
              <div className="absolute top-20 right-12 z-10">
                <div className="relative">
                  <div className="w-10 h-10 bg-destructive rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-destructive text-white px-2 py-1 rounded text-xs">
                    {destination}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Voice Indicator */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <Card className="p-3 bg-black/70 backdrop-blur-sm text-white border-0 animate-in slide-in-from-top">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
                  <div className="w-1 h-6 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <p className="text-sm">Avanza recto 50 metros</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Navigation Info Card */}
        <Card className="m-6 shadow-lg sticky top-0 z-30">
          <div className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-1">
                <MapPin className="w-10 h-10 text-primary flex-shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <h2 className="mb-1">{destination}</h2>
                  <div className="flex items-center gap-2">
                    <p className="text-primary">150 metros</p>
                    <span className="text-muted-foreground">•</span>
                    <p className="text-muted-foreground">3 min</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleStopNavigation}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary flex-shrink-0"
                aria-label="Cerrar navegación"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Current Instruction */}
            <Card className="p-4 bg-primary/5 border-primary/20 mb-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-12 h-12 text-primary flex-shrink-0" aria-hidden="true" />
                <p className="flex-1">Avanza recto 50 metros</p>
              </div>
            </Card>

            {/* Additional Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <span className="text-muted-foreground">3 min</span>
              </div>
              <div className="flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-success" aria-hidden="true" />
                <span className="text-success">Ruta accesible</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-10"
              >
                Pausar
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleStopNavigation}
                className="flex-1 h-10"
              >
                Detener Navegación
              </Button>
            </div>
          </div>

          {/* Next Instructions (Expandable) */}
          <div className="border-t border-border p-5 bg-muted/30">
            <h3 className="mb-3">Próximos pasos</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <TrendingUp className="w-5 h-5 flex-shrink-0 rotate-45" aria-hidden="true" />
                <span>Gira a la derecha</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <TrendingUp className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span>Continúa recto 30 metros</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span>Destino a la izquierda</span>
              </div>
            </div>
          </div>
        </Card>

        <BottomNav currentScreen="navigation" onNavigate={onNavigate} />

        {/* Screen reader announcements */}
        <div className="sr-only" role="status" aria-live="assertive" aria-atomic="true">
          Navegando a {destination}. Distancia 150 metros. Tiempo estimado 3 minutos. 
          Instrucción actual: Avanza recto 50 metros.
        </div>
      </div>
    );
  }

  // Search View
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top App Bar */}
      <header className="bg-card shadow-md px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Volver al inicio"
          >
            <ArrowLeft className="w-6 h-6" aria-hidden="true" />
          </button>
          <h1>Navegación en Campus</h1>
        </div>
      </header>

      <div className="px-6 py-6">
        {/* Search Card */}
        <Card className="p-4 mb-6 shadow-md sticky top-24 z-10 bg-card">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" aria-hidden="true" />
            <Input
              type="text"
              placeholder="¿A dónde quieres ir?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-14 pr-14 border-2 focus:border-primary rounded-full"
              aria-label="Buscar destino"
            />
            <button
              onClick={() => toast.info('Búsqueda por voz activada')}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Buscar por voz"
            >
              <Mic className="w-6 h-6 text-primary" aria-hidden="true" />
            </button>
          </div>

          {/* Frequent Destinations */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {frequentDestinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => handleStartNavigation(dest.name)}
                className="flex items-center gap-2 px-4 h-9 bg-muted hover:bg-muted/80 rounded-full whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary transition-colors flex-shrink-0"
                aria-label={`Ir a ${dest.name}`}
              >
                <span aria-hidden="true">{dest.icon}</span>
                <span>{dest.name}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Simplified Map */}
        <Card className="mb-6 overflow-hidden shadow-md">
          <div className="h-80 bg-gradient-to-br from-primary/5 to-secondary/5 relative">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className="border border-muted-foreground"></div>
                ))}
              </div>
            </div>

            {/* Current Location Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <div className="w-16 h-16 bg-info rounded-full border-4 border-white shadow-xl animate-pulse flex items-center justify-center">
                  <NavigationIcon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/70 text-white px-3 py-1 rounded">
                  Tu ubicación
                </div>
              </div>
            </div>

            {/* Sample POI Markers */}
            <div className="absolute top-16 left-16">
              <div className="w-8 h-8 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <span aria-hidden="true">📚</span>
              </div>
            </div>
            <div className="absolute top-24 right-20">
              <div className="w-8 h-8 bg-success rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <span aria-hidden="true">☕</span>
              </div>
            </div>
            <div className="absolute bottom-20 left-24">
              <div className="w-8 h-8 bg-warning rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <span aria-hidden="true">💻</span>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button
                className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Acercar mapa"
              >
                +
              </button>
              <button
                className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Alejar mapa"
              >
                −
              </button>
            </div>

            <button
              onClick={() => toast.info('Centrando en tu ubicación')}
              className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Centrar en mi ubicación"
            >
              <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
            </button>
          </div>
        </Card>

        {/* Points of Interest */}
        <div>
          <h2 className="mb-4">Lugares destacados</h2>
          <div className="space-y-3">
            {frequentDestinations.slice(0, 4).map((dest) => (
              <Card
                key={dest.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleStartNavigation(dest.name)}
                tabIndex={0}
                role="button"
                aria-label={`Navegar a ${dest.name}`}
                onKeyDown={(e) => e.key === 'Enter' && handleStartNavigation(dest.name)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                    <span aria-hidden="true">{dest.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1">{dest.name}</h3>
                    <p className="text-muted-foreground">
                      ~5 min • Ruta accesible
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="flex-shrink-0">
                    Ir aquí
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNav currentScreen="navigation" onNavigate={onNavigate} />

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Pantalla de navegación. Busca tu destino o selecciona uno de los lugares destacados.
      </div>
    </div>
  );
}
