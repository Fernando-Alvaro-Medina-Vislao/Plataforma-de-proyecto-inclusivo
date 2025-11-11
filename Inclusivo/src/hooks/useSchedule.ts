// Custom Hook para manejar horarios
import { useState, useEffect } from 'react';
import { ClassSession, WeeklySchedule, DayOfWeek } from '../models/Schedule';
import { scheduleService } from '../services/ScheduleService';

export function useSchedule() {
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule>({
    Lunes: [],
    Martes: [],
    Miércoles: [],
    Jueves: [],
    Viernes: [],
    Sábado: [],
    Domingo: [],
  });
  const [nextClass, setNextClass] = useState<ClassSession | null>(null);
  const [todayClasses, setTodayClasses] = useState<ClassSession[]>([]);
  const [timeUntilNext, setTimeUntilNext] = useState<number | null>(null);

  useEffect(() => {
    // Cargar horario semanal
    setWeeklySchedule(scheduleService.getWeeklySchedule());
    
    // Cargar clases de hoy
    setTodayClasses(scheduleService.getTodayClasses());
    
    // Cargar próxima clase
    setNextClass(scheduleService.getNextClass());
    
    // Actualizar tiempo hasta la próxima clase
    setTimeUntilNext(scheduleService.getTimeUntilNextClass());
  }, []);

  // Actualizar cada minuto el tiempo hasta la próxima clase
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilNext(scheduleService.getTimeUntilNextClass());
      setNextClass(scheduleService.getNextClass());
    }, 60000); // 1 minuto

    return () => clearInterval(interval);
  }, []);

  const getClassesByDay = (day: DayOfWeek) => {
    return scheduleService.getClassesByDay(day);
  };

  return {
    weeklySchedule,
    nextClass,
    todayClasses,
    timeUntilNext,
    getClassesByDay,
  };
}
