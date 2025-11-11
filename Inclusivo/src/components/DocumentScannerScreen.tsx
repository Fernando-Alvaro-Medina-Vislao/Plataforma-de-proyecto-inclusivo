import { useState } from 'react';
import { ArrowLeft, Camera, Image as ImageIcon, History, Zap, Play, Pause, Share2, Save, Edit, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Screen } from '../App';
import { toast } from 'sonner';
import BottomNav from './BottomNav';

interface DocumentScannerScreenProps {
  onNavigate: (screen: Screen) => void;
}

type ScanState = 'camera' | 'processing' | 'result';

export default function DocumentScannerScreen({ onNavigate }: DocumentScannerScreenProps) {
  const [scanState, setScanState] = useState<ScanState>('camera');
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  const handleCapture = () => {
    setScanState('processing');
    setProcessingProgress(0);
    
    // Simulate processing
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setScanState('result'), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      toast.info('Reproducción pausada');
    } else {
      setIsPlaying(true);
      toast.success('Reproduciendo documento');
      
      // Simulate playback
      const interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 300);
    }
  };

  const handleNewScan = () => {
    setScanState('camera');
    setProcessingProgress(0);
    setPlaybackProgress(0);
    setIsPlaying(false);
  };

  if (scanState === 'processing') {
    return (
      <div className="min-h-screen bg-black/70 flex items-center justify-center p-6">
        <Card className="w-full max-w-sm p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <Camera className="w-20 h-20 text-primary animate-pulse" aria-hidden="true" />
            </div>
          </div>

          <h2 className="mb-2">Procesando documento...</h2>
          <p className="text-muted-foreground mb-6">Extrayendo texto</p>

          <Progress value={processingProgress} className="mb-4 h-2" />
          <p className="text-muted-foreground mb-6">{processingProgress}% completado</p>

          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-success" aria-hidden="true" />
            <p className="text-success">Precisión esperada: Alta</p>
          </div>

          <p className="text-muted-foreground">~3 segundos</p>

          {/* Screen reader announcement */}
          <div className="sr-only" role="status" aria-live="polite">
            Procesando documento. {processingProgress}% completado. Extrayendo texto.
          </div>
        </Card>
      </div>
    );
  }

  if (scanState === 'result') {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Top App Bar */}
        <header className="bg-card shadow-md px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={handleNewScan}
              className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Volver a escanear"
            >
              <ArrowLeft className="w-6 h-6" aria-hidden="true" />
            </button>
            <h1>Documento Procesado</h1>
            <div className="flex-1"></div>
            <button
              className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Compartir documento"
              onClick={() => toast.info('Compartir documento')}
            >
              <Share2 className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="px-6 py-6">
          {/* Document Info */}
          <Card className="p-4 mb-4 shadow-md">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h2 className="mb-2">Documento sin título</h2>
                <p className="text-muted-foreground">27 Oct 2024, 15:30</p>
              </div>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Editar título"
              >
                <Edit className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className="bg-success text-success-foreground">92% de confianza</Badge>
              <p className="text-muted-foreground">Español • 1 página</p>
            </div>
          </Card>

          {/* Original Image Preview */}
          <Card className="mb-4 overflow-hidden shadow-md">
            <div className="h-24 bg-gradient-to-br from-muted to-muted-foreground/20 relative flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-muted-foreground/50" aria-hidden="true" />
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-2 right-2 h-8"
              >
                Ver imagen original
              </Button>
            </div>
          </Card>

          {/* Playback Controls */}
          <Card className="p-4 mb-4 shadow-md sticky top-20 z-10 bg-card">
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={handlePlayPause}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary transition-transform active:scale-95"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Play className="w-6 h-6 ml-1" aria-hidden="true" />
                )}
              </button>

              <div className="flex-1">
                <Progress value={playbackProgress} className="h-2 mb-2" />
                <div className="flex justify-between text-muted-foreground">
                  <span>0:{String(Math.floor(playbackProgress * 1.5)).padStart(2, '0')}</span>
                  <span>2:30</span>
                </div>
              </div>

              <button
                className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Velocidad de reproducción: 1.0x"
              >
                <span>1.0x</span>
              </button>
            </div>
          </Card>

          {/* Extracted Text */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Volume2 className="w-5 h-5 text-primary" aria-hidden="true" />
              <h2>Texto extraído</h2>
            </div>

            <Card className="p-4 bg-muted/50 max-h-80 overflow-y-auto">
              <p className="leading-relaxed select-text">
                Este es un ejemplo de texto extraído mediante tecnología OCR (Reconocimiento Óptico de Caracteres). 
                El sistema ha procesado la imagen capturada y ha convertido el contenido visual en texto digital que 
                puede ser leído por lectores de pantalla y sintetizadores de voz.
                <br /><br />
                La precisión del OCR depende de varios factores como la calidad de la imagen, la iluminación, 
                el tipo de fuente utilizada en el documento original y la claridad del texto. En este caso, 
                la confianza del reconocimiento es del 92%, lo que indica una alta precisión en la extracción.
                <br /><br />
                Este texto ahora puede ser utilizado de múltiples formas: reproducido en voz alta, 
                guardado para referencia futura, compartido con otros estudiantes o profesores, 
                o exportado en diferentes formatos como audio MP3 o documentos de texto.
              </p>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              variant="outline"
              className="h-14 flex-col gap-1"
              onClick={() => toast.success('Documento guardado')}
            >
              <Save className="w-6 h-6" aria-hidden="true" />
              <span>Guardar</span>
            </Button>

            <Button
              variant="outline"
              className="h-14 flex-col gap-1"
              onClick={() => toast.info('Compartir documento')}
            >
              <Share2 className="w-6 h-6" aria-hidden="true" />
              <span>Compartir</span>
            </Button>

            <Button
              variant="outline"
              className="h-14 flex-col gap-1"
            >
              <Edit className="w-6 h-6" aria-hidden="true" />
              <span>Editar</span>
            </Button>

            <Button
              variant="outline"
              className="h-14 flex-col gap-1"
              onClick={() => toast.success('Generando archivo de audio...')}
            >
              <Volume2 className="w-6 h-6" aria-hidden="true" />
              <span>Audio MP3</span>
            </Button>
          </div>

          {/* New Scan Button */}
          <Button
            onClick={handleNewScan}
            className="w-full h-14"
          >
            <Camera className="w-5 h-5 mr-2" aria-hidden="true" />
            Nuevo Escaneo
          </Button>
        </div>

        <BottomNav currentScreen="documents" onNavigate={onNavigate} />
      </div>
    );
  }

  // Camera View
  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Top App Bar */}
      <header className="bg-black/80 backdrop-blur-sm px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white text-white"
            aria-label="Volver al inicio"
          >
            <ArrowLeft className="w-6 h-6" aria-hidden="true" />
          </button>
          <h1 className="text-white">Lector de Documentos</h1>
        </div>
      </header>

      {/* Camera Preview Area */}
      <div className="relative h-[60vh] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        {/* Guide Frame */}
        <div className="relative w-5/6 h-4/5 border-4 border-white/50 rounded-2xl">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-2xl"></div>
          
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            Coloca el documento aquí
          </div>

          {/* Camera Icon Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Camera className="w-32 h-32 text-white" aria-hidden="true" />
          </div>
        </div>

        {/* Lighting Indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-success text-success-foreground">
            <CheckCircle className="w-4 h-4 mr-1" aria-hidden="true" />
            Iluminación OK
          </Badge>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-6 py-4">
        <Card className="p-3 bg-white/10 backdrop-blur-sm border-white/20 mb-6">
          <p className="text-white/90 text-center">
            Mantén el documento plano y bien iluminado
          </p>
        </Card>

        {/* Main Capture Button */}
        <div className="flex flex-col items-center mb-6">
          <button
            onClick={handleCapture}
            className="w-20 h-20 rounded-full bg-primary hover:bg-primary/90 shadow-xl flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary/50 transition-transform active:scale-95 mb-2"
            aria-label="Capturar documento"
          >
            <Camera className="w-12 h-12 text-primary-foreground" aria-hidden="true" />
          </button>
          <span className="text-white">Capturar</span>
        </div>

        {/* Secondary Controls */}
        <div className="flex justify-center gap-6 mb-6">
          <button
            onClick={() => {
              setFlashEnabled(!flashEnabled);
              toast.info(flashEnabled ? 'Linterna desactivada' : 'Linterna activada');
            }}
            className={`flex flex-col items-center gap-2 w-14 h-14 rounded-full ${
              flashEnabled ? 'bg-warning text-warning-foreground' : 'bg-white/10 text-white'
            } hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-colors`}
            aria-label={flashEnabled ? 'Desactivar linterna' : 'Activar linterna'}
            aria-pressed={flashEnabled}
          >
            <Zap className="w-6 h-6" aria-hidden="true" />
          </button>

          <button
            onClick={() => toast.info('Abrir galería')}
            className="flex flex-col items-center gap-2 w-14 h-14 rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Seleccionar de galería"
          >
            <ImageIcon className="w-6 h-6" aria-hidden="true" />
          </button>

          <button
            onClick={() => toast.info('Ver historial')}
            className="flex flex-col items-center gap-2 w-14 h-14 rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white relative"
            aria-label="Ver historial de documentos"
          >
            <History className="w-6 h-6" aria-hidden="true" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs">
              5
            </Badge>
          </button>
        </div>
      </div>

      <BottomNav currentScreen="documents" onNavigate={onNavigate} />

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Modo cámara. Coloca el documento dentro del marco para escanearlo. Iluminación adecuada.
      </div>
    </div>
  );
}

// Helper component for check icon
function CheckCircle({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
