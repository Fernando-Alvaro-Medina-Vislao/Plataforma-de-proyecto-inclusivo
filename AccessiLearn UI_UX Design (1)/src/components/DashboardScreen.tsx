import { Bell, Calendar, Star, Camera, Map, User, Mic, Clock, MapPin, FileText } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Screen } from '../App';
import BottomNav from './BottomNav';
import { useApp } from '../contexts/AppContext';
import { useSchedule } from '../hooks/useSchedule';
import { useNotifications } from '../hooks/useNotifications';

interface DashboardScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const { user, speak, accessibilitySettings } = useApp();
  const { nextClass, todayClasses, timeUntilNext } = useSchedule();
  const { unreadCount, notifications } = useNotifications();

  const handleVoiceCommand = () => {
    speak('Comando de voz activado. Di tu comando.');
    // Aquí iría la lógica real de reconocimiento de voz
  };

  const handleSpeakNotification = (text: string) => {
    speak(text, true);
  };

  // Formatear tiempo hasta la próxima clase
  const formatTimeUntil = (minutes: number | null): string => {
    if (minutes === null) return 'Sin clases próximas';
    if (minutes < 0) return 'En curso';
    if (minutes < 60) return `En ${minutes} minutos`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `En ${hours}h ${mins}min` : `En ${hours} horas`;
  };

  // Obtener notificaciones recientes (máximo 3)
  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top App Bar */}
      <header className="bg-card shadow-md px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2">
            Hola, {user?.name?.split(' ')[0] || 'Usuario'} <span aria-hidden="true">👋</span>
          </h1>
          <button
            onClick={() => onNavigate('notifications')}
            className="relative w-12 h-12 flex items-center justify-center rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
            aria-label={`Notificaciones. Tienes ${unreadCount} notificaciones sin leer`}
          >
            <Bell className="w-6 h-6" aria-hidden="true" />
            {unreadCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center p-0 bg-destructive text-destructive-foreground rounded-full"
                aria-hidden="true"
              >
                {unreadCount}
              </Badge>
            )}
          </button>
        </div>
      </header>

      <div className="px-6 py-6">
        {/* Hero Section - Next Activity */}
        {nextClass ? (
          <Card className="mb-6 overflow-hidden shadow-lg">
            <div className="bg-gradient-to-br from-primary to-secondary p-5 text-white">
              <div className="flex items-start justify-between mb-3">
                <Clock className="w-8 h-8 opacity-80" aria-hidden="true" />
                <Badge className="bg-warning text-warning-foreground">
                  {formatTimeUntil(timeUntilNext)}
                </Badge>
              </div>
              
              <p className="text-white/80 mb-1">Tu próxima actividad</p>
              <h2 className="text-white mb-3">{nextClass.subject}</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 opacity-80" aria-hidden="true" />
                  <span>{nextClass.startTime} - {nextClass.endTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 opacity-80" aria-hidden="true" />
                  <span>{nextClass.room} - {nextClass.building}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 opacity-80" aria-hidden="true" />
                  <span className="opacity-80">{nextClass.professor}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('navigation')}
                  className="bg-white/10 border-white text-white hover:bg-white/20 h-10 backdrop-blur-sm"
                >
                  Cómo llegar
                </Button>
                <Button 
                  variant="ghost"
                  className="text-white hover:bg-white/10 h-10"
                >
                  Materiales
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="mb-6 p-5">
            <p className="text-center text-muted-foreground">
              No tienes clases programadas próximamente
            </p>
          </Card>
        )}

        {/* Quick Access Section */}
        <div className="mb-6">
          <h2 className="mb-3">Acceso Rápido</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Mis Horarios */}
            <Card 
              className="p-4 h-36 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-primary"
              onClick={() => onNavigate('schedule')}
              tabIndex={0}
              role="button"
              aria-label="Mis Horarios. Ver horario semanal. 2 clases hoy"
              onKeyDown={(e) => e.key === 'Enter' && onNavigate('schedule')}
            >
              <Calendar className="w-10 h-10 text-primary mb-3" aria-hidden="true" />
              <h3 className="mb-1">Mis Horarios</h3>
              <p className="text-muted-foreground">Ver horario semanal</p>
              <Badge variant="secondary" className="mt-2">2 clases hoy</Badge>
            </Card>

            {/* Calificaciones */}
            <Card 
              className="p-4 h-36 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-primary"
              tabIndex={0}
              role="button"
              aria-label="Calificaciones. Consultar notas. 1 nueva"
              onKeyDown={(e) => e.key === 'Enter' && alert('Ver Calificaciones')}
            >
              <Star className="w-10 h-10 text-primary mb-3" aria-hidden="true" />
              <h3 className="mb-1">Calificaciones</h3>
              <p className="text-muted-foreground">Consultar notas</p>
              <Badge variant="destructive" className="mt-2">1 nueva</Badge>
            </Card>

            {/* Documentos OCR */}
            <Card 
              className="p-4 h-36 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-primary"
              onClick={() => onNavigate('documents')}
              tabIndex={0}
              role="button"
              aria-label="Leer Documentos. Escanear con OCR"
              onKeyDown={(e) => e.key === 'Enter' && onNavigate('documents')}
            >
              <Camera className="w-10 h-10 text-primary mb-3" aria-hidden="true" />
              <h3 className="mb-1">Leer Documentos</h3>
              <p className="text-muted-foreground">Escanear con OCR</p>
            </Card>

            {/* Navegación */}
            <Card 
              className="p-4 h-36 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-primary"
              onClick={() => onNavigate('navigation')}
              tabIndex={0}
              role="button"
              aria-label="Navegación. Ir a un lugar"
              onKeyDown={(e) => e.key === 'Enter' && onNavigate('navigation')}
            >
              <Map className="w-10 h-10 text-primary mb-3" aria-hidden="true" />
              <h3 className="mb-1">Navegación</h3>
              <p className="text-muted-foreground">Ir a un lugar</p>
            </Card>

            {/* Asistente Virtual */}
            <Card 
              className="p-4 h-36 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-primary"
              onClick={handleVoiceCommand}
              tabIndex={0}
              role="button"
              aria-label="Asistente Virtual. Pregunta por voz"
              onKeyDown={(e) => e.key === 'Enter' && handleVoiceCommand()}
            >
              <div className="relative">
                <Mic className="w-10 h-10 text-primary mb-3 animate-pulse" aria-hidden="true" />
              </div>
              <h3 className="mb-1">Asistente</h3>
              <p className="text-muted-foreground">Pregunta por voz</p>
            </Card>

            {/* Mi Perfil */}
            <Card 
              className="p-4 h-36 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-primary"
              onClick={() => onNavigate('profile')}
              tabIndex={0}
              role="button"
              aria-label="Mi Perfil. Configuración"
              onKeyDown={(e) => e.key === 'Enter' && onNavigate('profile')}
            >
              <User className="w-10 h-10 text-primary mb-3" aria-hidden="true" />
              <h3 className="mb-1">Mi Perfil</h3>
              <p className="text-muted-foreground">Configuración</p>
            </Card>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-3">
            <h2>Notificaciones Recientes</h2>
            <button
              onClick={() => onNavigate('notifications')}
              className="text-primary min-h-[3rem] min-w-[3rem] px-3 py-2 rounded hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Ver todas las notificaciones"
            >
              Ver todas
            </button>
          </div>

          <div className="space-y-2">
            {recentNotifications.map((notification) => {
              // Determinar el icono según el tipo
              const IconComponent = 
                notification.type === 'grade' ? Star :
                notification.type === 'reminder' ? Clock :
                notification.type === 'material' ? FileText :
                notification.type === 'academic' ? Calendar :
                Bell;
              
              // Determinar el color según prioridad
              const borderColor = 
                notification.priority === 'critical' ? '#ef4444' :
                notification.priority === 'high' ? '#f59e0b' :
                notification.priority === 'medium' ? '#3b82f6' :
                '#10b981';
              
              // Formatear tiempo relativo
              const getRelativeTime = (date: Date) => {
                const diff = Date.now() - date.getTime();
                const minutes = Math.floor(diff / 60000);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);
                
                if (minutes < 60) return `Hace ${minutes} minutos`;
                if (hours < 24) return `Hace ${hours} horas`;
                return `Hace ${days} días`;
              };

              return (
                <Card key={notification.id} className="p-3 border-l-4" style={{ borderLeftColor: borderColor }}>
                  <div className="flex gap-3">
                    <IconComponent className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: borderColor }} aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-1">{notification.title}</h4>
                      <p className="text-muted-foreground mb-2">{notification.message}</p>
                      <p className="text-muted-foreground">{getRelativeTime(notification.timestamp)}</p>
                    </div>
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary flex-shrink-0"
                      aria-label="Reproducir notificación por voz"
                      onClick={() => handleSpeakNotification(`${notification.title}. ${notification.message}`)}
                    >
                      <Mic className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAB - Floating Action Button */}
      <button
        onClick={handleVoiceCommand}
        className="fixed bottom-20 right-6 w-16 h-16 bg-accent text-accent-foreground rounded-full shadow-lg hover:shadow-xl flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-accent/50 transition-all active:scale-95 z-20"
        aria-label="Activar comando de voz"
      >
        <Mic className="w-8 h-8" aria-hidden="true" />
      </button>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="dashboard" onNavigate={onNavigate} />

      {/* Screen reader announcements */}
      <div className="sr-only" role="status" aria-live="polite">
        Dashboard. Tienes {unreadCount} notificaciones sin leer. Tu próxima clase es {nextClass?.subject || 'ninguna'} a las {nextClass?.startTime || 'ninguna'} en {nextClass?.room || 'ninguna'}.
      </div>
    </div>
  );
}