// Schedule Service - Controlador de lógica de horarios
import { ClassSession, WeeklySchedule, DayOfWeek } from '../models/Schedule';

class ScheduleService {
  // Mock data - En producción esto vendría de una API o base de datos
  private mockSchedule: ClassSession[] = [
    {
      id: '1',
      subject: 'Algoritmos y Estructuras de Datos',
      professor: 'Prof. María García',
      room: '301',
      building: 'Edificio A',
      startTime: '14:00',
      endTime: '16:00',
      day: 'Lunes',
      color: '#6200EE',
      type: 'lecture',
    },
    {
      id: '2',
      subject: 'Bases de Datos',
      professor: 'Prof. Carlos Ruiz',
      room: '205',
      building: 'Edificio B',
      startTime: '08:00',
      endTime: '10:00',
      day: 'Lunes',
      color: '#03DAC6',
      type: 'lecture',
    },
    {
      id: '3',
      subject: 'Ingeniería de Software',
      professor: 'Prof. Ana López',
      room: 'Lab 102',
      building: 'Edificio C',
      startTime: '10:00',
      endTime: '12:00',
      day: 'Martes',
      color: '#FF6B35',
      type: 'lab',
    },
    {
      id: '4',
      subject: 'Programación Web',
      professor: 'Prof. Juan Méndez',
      room: '401',
      building: 'Edificio A',
      startTime: '14:00',
      endTime: '16:00',
      day: 'Miércoles',
      color: '#6200EE',
      type: 'lecture',
    },
    {
      id: '5',
      subject: 'Redes de Computadoras',
      professor: 'Prof. Laura Torres',
      room: 'Lab 201',
      building: 'Edificio B',
      startTime: '08:00',
      endTime: '10:00',
      day: 'Jueves',
      color: '#03DAC6',
      type: 'lab',
    },
    {
      id: '6',
      subject: 'Inteligencia Artificial',
      professor: 'Prof. Roberto Sánchez',
      room: '302',
      building: 'Edificio A',
      startTime: '16:00',
      endTime: '18:00',
      day: 'Viernes',
      color: '#FF6B35',
      type: 'lecture',
    },
  ];

  // Obtener horario completo organizado por día
  getWeeklySchedule(): WeeklySchedule {
    const schedule: WeeklySchedule = {
      Lunes: [],
      Martes: [],
      Miércoles: [],
      Jueves: [],
      Viernes: [],
      Sábado: [],
      Domingo: [],
    };

    this.mockSchedule.forEach(session => {
      schedule[session.day].push(session);
    });

    // Ordenar por hora de inicio
    Object.keys(schedule).forEach(day => {
      schedule[day].sort((a, b) => {
        return a.startTime.localeCompare(b.startTime);
      });
    });

    return schedule;
  }

  // Obtener clases de hoy
  getTodayClasses(): ClassSession[] {
    const today = this.getCurrentDay();
    return this.mockSchedule
      .filter(session => session.day === today)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  // Obtener próxima clase
  getNextClass(): ClassSession | null {
    const todayClasses = this.getTodayClasses();
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Encontrar la siguiente clase que no ha comenzado
    const nextClass = todayClasses.find(session => session.startTime > currentTime);
    
    if (nextClass) {
      return nextClass;
    }

    // Si no hay más clases hoy, buscar la primera del próximo día
    const days: DayOfWeek[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const todayIndex = days.indexOf(this.getCurrentDay());
    
    for (let i = 1; i < days.length; i++) {
      const nextDayIndex = (todayIndex + i) % days.length;
      const nextDay = days[nextDayIndex];
      const nextDayClasses = this.mockSchedule
        .filter(session => session.day === nextDay)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
      
      if (nextDayClasses.length > 0) {
        return nextDayClasses[0];
      }
    }

    return null;
  }

  // Obtener tiempo hasta la próxima clase (en minutos)
  getTimeUntilNextClass(): number | null {
    const nextClass = this.getNextClass();
    if (!nextClass) return null;

    const now = new Date();
    const [hours, minutes] = nextClass.startTime.split(':').map(Number);
    const classTime = new Date();
    classTime.setHours(hours, minutes, 0, 0);

    const diff = classTime.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60));
  }

  // Obtener clases por día específico
  getClassesByDay(day: DayOfWeek): ClassSession[] {
    return this.mockSchedule
      .filter(session => session.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  // Día actual en español
  private getCurrentDay(): DayOfWeek {
    const days: DayOfWeek[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[new Date().getDay()];
  }
}

// Singleton
export const scheduleService = new ScheduleService();
