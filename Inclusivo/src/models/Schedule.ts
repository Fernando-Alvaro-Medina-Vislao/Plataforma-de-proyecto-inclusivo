// Schedule Model - Modelo de datos de horarios
export type DayOfWeek = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';

export interface ClassSession {
  id: string;
  subject: string;
  professor: string;
  room: string;
  building: string;
  startTime: string; // formato HH:mm
  endTime: string;   // formato HH:mm
  day: DayOfWeek;
  color?: string;
  type: 'lecture' | 'lab' | 'seminar';
}

export interface WeeklySchedule {
  [key: string]: ClassSession[]; // key is DayOfWeek
}
