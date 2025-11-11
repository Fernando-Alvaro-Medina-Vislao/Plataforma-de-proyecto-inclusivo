import { useState } from 'react';
import { ArrowLeft, CheckCheck, Bell, Star, Clock, FileText, AlertTriangle, Info, Mic, MoreVertical } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Screen } from '../App';
import { toast } from 'sonner';

interface NotificationsScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Notification {
  id: string;
  type: 'academic' | 'grade' | 'emergency' | 'general';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

export default function NotificationsScreen({ onNavigate }: NotificationsScreenProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'academic' | 'grades' | 'emergency'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'emergency',
      title: 'Alerta de Emergencia',
      message: 'Simulacro de evacuación programado para hoy a las 15:00. Por favor dirígete a la zona de seguridad más cercana.',
      timestamp: 'Hace 10 minutos',
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'grade',
      title: 'Nueva calificación publicada',
      message: 'Se ha publicado la nota del Examen Parcial de Algoritmos. Tu calificación es 18/20.',
      timestamp: 'Hace 2 horas',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'academic',
      title: 'Recordatorio de clase',
      message: 'Tu clase de Algoritmos comienza en 45 minutos en el Laboratorio 301.',
      timestamp: 'Hace 5 minutos',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'general',
      title: 'Material disponible',
      message: 'El profesor ha subido los slides de la clase anterior de Estructuras de Datos.',
      timestamp: 'Hace 1 día',
      isRead: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'academic',
      title: 'Cambio de aula',
      message: 'La clase de Base de Datos del viernes se trasladará al Aula 201.',
      timestamp: 'Hace 2 días',
      isRead: true,
      priority: 'medium'
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast.success('Todas las notificaciones marcadas como leídas');
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const playNotification = (notification: Notification) => {
    toast.success(`Reproduciendo: ${notification.title}`);
  };

  const confirmEmergency = (id: string) => {
    toast.success('Recepción de alerta confirmada');
    markAsRead(id);
  };

  const getFilteredNotifications = () => {
    let filtered = notifications;
    
    switch (filter) {
      case 'unread':
        filtered = notifications.filter(n => !n.isRead);
        break;
      case 'academic':
        filtered = notifications.filter(n => n.type === 'academic');
        break;
      case 'grades':
        filtered = notifications.filter(n => n.type === 'grade');
        break;
      case 'emergency':
        filtered = notifications.filter(n => n.type === 'emergency');
        break;
    }
    
    return filtered;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return <FileText className="w-6 h-6" aria-hidden="true" />;
      case 'grade': return <Star className="w-6 h-6" aria-hidden="true" />;
      case 'emergency': return <AlertTriangle className="w-6 h-6" aria-hidden="true" />;
      default: return <Info className="w-6 h-6" aria-hidden="true" />;
    }
  };

  const getTypeColor = (type: string, priority: string) => {
    if (type === 'emergency') return 'border-l-destructive';
    if (priority === 'high') return 'border-l-warning';
    if (type === 'grade') return 'border-l-info';
    if (type === 'academic') return 'border-l-primary';
    return 'border-l-muted-foreground';
  };

  const getTypeIconColor = (type: string) => {
    switch (type) {
      case 'academic': return 'text-primary';
      case 'grade': return 'text-info';
      case 'emergency': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-background pb-6">
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
          <h1>Notificaciones</h1>
          <div className="flex-1"></div>
          <button
            onClick={markAllAsRead}
            className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Marcar todas como leídas"
            disabled={unreadCount === 0}
          >
            <CheckCheck className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="px-6 py-6">
        {/* Unread Indicator */}
        {unreadCount > 0 && (
          <Card className="p-3 mb-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-primary" aria-hidden="true" />
              <p>
                Tienes <strong>{unreadCount}</strong> {unreadCount === 1 ? 'notificación' : 'notificaciones'} sin leer
              </p>
            </div>
          </Card>
        )}

        {/* Filters */}
        <div className="mb-6 overflow-x-auto -mx-6 px-6">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 h-9 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                filter === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
              aria-label="Mostrar todas las notificaciones"
              aria-current={filter === 'all' ? 'true' : undefined}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 h-9 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                filter === 'unread'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
              aria-label="Mostrar solo notificaciones sin leer"
              aria-current={filter === 'unread' ? 'true' : undefined}
            >
              Sin leer
            </button>
            <button
              onClick={() => setFilter('academic')}
              className={`px-4 h-9 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                filter === 'academic'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
              aria-label="Mostrar notificaciones académicas"
              aria-current={filter === 'academic' ? 'true' : undefined}
            >
              Académicas
            </button>
            <button
              onClick={() => setFilter('grades')}
              className={`px-4 h-9 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                filter === 'grades'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
              aria-label="Mostrar notificaciones de calificaciones"
              aria-current={filter === 'grades' ? 'true' : undefined}
            >
              Calificaciones
            </button>
            <button
              onClick={() => setFilter('emergency')}
              className={`px-4 h-9 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                filter === 'emergency'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
              aria-label="Mostrar alertas de emergencia"
              aria-current={filter === 'emergency' ? 'true' : undefined}
            >
              Emergencias
            </button>
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <Card className="p-12 text-center">
            <Bell className="w-24 h-24 mx-auto mb-4 text-muted-foreground opacity-20" aria-hidden="true" />
            <h2 className="mb-2">No tienes notificaciones</h2>
            <p className="text-muted-foreground">
              Aparecerán aquí cuando las recibas
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 border-l-4 ${getTypeColor(notification.type, notification.priority)} ${
                  !notification.isRead ? 'bg-card shadow-md' : 'bg-muted/50'
                } ${notification.type === 'emergency' && !notification.isRead ? 'bg-destructive/5 border-2 border-destructive animate-pulse' : ''}`}
              >
                <div className="flex gap-3">
                  <div className={`flex-shrink-0 mt-1 ${getTypeIconColor(notification.type)}`}>
                    {getTypeIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className={notification.type === 'emergency' ? 'text-destructive' : ''}>
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <div className="w-2 h-2 rounded-full bg-info flex-shrink-0 mt-2" aria-label="Sin leer" />
                      )}
                    </div>

                    <p className={`mb-3 leading-relaxed ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification.message}
                    </p>

                    <div className="flex items-center gap-3 mb-3">
                      <p className="text-muted-foreground">
                        <Clock className="w-4 h-4 inline mr-1" aria-hidden="true" />
                        {notification.timestamp}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {notification.type === 'academic' && 'Académico'}
                        {notification.type === 'grade' && 'Calificación'}
                        {notification.type === 'emergency' && 'Emergencia'}
                        {notification.type === 'general' && 'General'}
                      </Badge>
                    </div>

                    {/* Emergency Action */}
                    {notification.type === 'emergency' && !notification.isRead && (
                      <Button
                        onClick={() => confirmEmergency(notification.id)}
                        className="w-full h-12 bg-destructive hover:bg-destructive/90 mb-3"
                      >
                        Confirmar Recepción
                      </Button>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => playNotification(notification)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Reproducir por voz"
                      >
                        <Mic className="w-5 h-5" aria-hidden="true" />
                      </button>

                      {!notification.isRead && notification.type !== 'emergency' && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                          aria-label="Marcar como leída"
                        >
                          <CheckCheck className="w-5 h-5" aria-hidden="true" />
                        </button>
                      )}

                      <button
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Más opciones"
                      >
                        <MoreVertical className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        {`Mostrando ${filteredNotifications.length} ${filteredNotifications.length === 1 ? 'notificación' : 'notificaciones'}. ${unreadCount} sin leer.`}
      </div>
    </div>
  );
}
