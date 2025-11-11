// Notification Model - Modelo de datos de notificaciones
export type NotificationType = 'academic' | 'grade' | 'emergency' | 'reminder' | 'material';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: {
    [key: string]: any;
  };
}
