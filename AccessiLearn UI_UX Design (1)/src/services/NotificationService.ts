// Notification Service - Controlador de lógica de notificaciones
import { Notification, NotificationPriority, NotificationType } from '../models/Notification';

class NotificationService {
  private notifications: Notification[] = [
    {
      id: '1',
      type: 'grade',
      priority: 'high',
      title: 'Nueva calificación',
      message: 'Tu calificación del examen parcial de Algoritmos ha sido publicada: 18/20',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // hace 2 horas
      read: false,
    },
    {
      id: '2',
      type: 'reminder',
      priority: 'medium',
      title: 'Recordatorio de clase',
      message: 'Tu clase de Algoritmos comenzará en 45 minutos en el Aula 301',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // hace 5 minutos
      read: false,
    },
    {
      id: '3',
      type: 'material',
      priority: 'low',
      title: 'Material disponible',
      message: 'Se han publicado las diapositivas de la clase anterior de Bases de Datos',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // hace 1 día
      read: false,
    },
    {
      id: '4',
      type: 'academic',
      priority: 'high',
      title: 'Cambio de horario',
      message: 'La clase de Programación Web del viernes se ha movido al Aula 502',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // hace 3 horas
      read: true,
    },
    {
      id: '5',
      type: 'emergency',
      priority: 'critical',
      title: 'Alerta de seguridad',
      message: 'Se ha programado un simulacro de evacuación para mañana a las 10:00 AM',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // hace 6 horas
      read: true,
    },
    {
      id: '6',
      type: 'academic',
      priority: 'medium',
      title: 'Entrega de trabajo',
      message: 'Recuerda entregar el proyecto de Ingeniería de Software antes del viernes',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // hace 12 horas
      read: true,
    },
  ];

  // Obtener todas las notificaciones
  getAllNotifications(): Notification[] {
    return [...this.notifications].sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  // Obtener notificaciones no leídas
  getUnreadNotifications(): Notification[] {
    return this.notifications.filter(n => !n.read);
  }

  // Contar notificaciones no leídas
  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  // Obtener notificaciones por prioridad
  getNotificationsByPriority(priority: NotificationPriority): Notification[] {
    return this.notifications.filter(n => n.priority === priority);
  }

  // Obtener notificaciones por tipo
  getNotificationsByType(type: NotificationType): Notification[] {
    return this.notifications.filter(n => n.type === type);
  }

  // Marcar como leída
  markAsRead(id: string): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }

  // Marcar todas como leídas
  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
  }

  // Eliminar notificación
  deleteNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  // Agregar nueva notificación
  addNotification(notification: Omit<Notification, 'id'>): Notification {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
    };
    this.notifications.unshift(newNotification);
    return newNotification;
  }

  // Obtener color según prioridad (para UI)
  getPriorityColor(priority: NotificationPriority): string {
    const colors = {
      low: 'success',
      medium: 'info',
      high: 'warning',
      critical: 'destructive',
    };
    return colors[priority];
  }

  // Obtener icono según tipo (para UI)
  getTypeIcon(type: NotificationType): string {
    const icons = {
      academic: 'Calendar',
      grade: 'Star',
      emergency: 'AlertTriangle',
      reminder: 'Clock',
      material: 'FileText',
    };
    return icons[type];
  }
}

// Singleton
export const notificationService = new NotificationService();
