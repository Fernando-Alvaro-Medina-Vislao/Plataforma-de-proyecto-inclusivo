// Custom Hook para manejar notificaciones
import { useState, useEffect } from 'react';
import { Notification, NotificationPriority, NotificationType } from '../models/Notification';
import { notificationService } from '../services/NotificationService';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    setNotifications(notificationService.getAllNotifications());
    setUnreadCount(notificationService.getUnreadCount());
  };

  const markAsRead = (id: string) => {
    notificationService.markAsRead(id);
    loadNotifications();
  };

  const markAllAsRead = () => {
    notificationService.markAllAsRead();
    loadNotifications();
  };

  const deleteNotification = (id: string) => {
    notificationService.deleteNotification(id);
    loadNotifications();
  };

  const getUnreadNotifications = () => {
    return notificationService.getUnreadNotifications();
  };

  const getNotificationsByPriority = (priority: NotificationPriority) => {
    return notificationService.getNotificationsByPriority(priority);
  };

  const getNotificationsByType = (type: NotificationType) => {
    return notificationService.getNotificationsByType(type);
  };

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    notificationService.addNotification(notification);
    loadNotifications();
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadNotifications,
    getNotificationsByPriority,
    getNotificationsByType,
    addNotification,
  };
}
