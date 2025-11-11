import { ArrowLeft, ChevronLeft, ChevronRight, User, MapPin, FileText, CheckCircle, Map } from 'lucide-react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Screen } from '../App';
import BottomNav from './BottomNav';

interface ScheduleScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface ClassItem {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  code: string;
  professor: string;
  location: string;
  type: 'theory' | 'lab' | 'tutorial' | 'exam';
  status: 'upcoming' | 'in-progress' | 'completed';
}

const DAYS = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];
const DATES = [23, 24, 25, 26, 27, 28, 29];

export default function ScheduleScreen({ onNavigate }: ScheduleScreenProps) {
  const [selectedDay, setSelectedDay] = useState(0); // Monday

  const todayClasses: ClassItem[] = [
    {
      id: '1',
      startTime: '08:00',
      endTime: '10:00',
      title: 'Estructuras de Datos',
      code: 'IS-301',
      professor: 'Dr. María González',
      location: 'Aula 201',
      type: 'theory',
      status: 'completed'
    },
    {
      id: '2',
      startTime: '14:00',
      endTime: '16:00',
      title: 'Algoritmos y Estructuras de Datos',
      code: 'IS-401',
      professor: 'Dr. García López',
      location: 'Laboratorio 301',
      type: 'lab',
      status: 'upcoming'
    },
    {
      id: '3',
      startTime: '16:00',
      endTime: '18:00',
      title: 'Base de Datos Avanzadas',
      code: 'IS-402',
      professor: 'Ing. Carlos Ruiz',
      location: 'Aula 105',
      type: 'theory',
      status: 'upcoming'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'border-l-info';
      case 'lab': return 'border-l-success';
      case 'tutorial': return 'border-l-warning';
      case 'exam': return 'border-l-[#6200EE]';
      default: return 'border-l-info';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge className="bg-success text-success-foreground animate-pulse">En curso</Badge>;
      case 'completed':
        return (
          <Badge variant="secondary" className="text-muted-foreground">
            <CheckCircle className="w-3 h-3 mr-1" aria-hidden="true" />
            Completada
          </Badge>
        );
      case 'upcoming':
        return <Badge className="bg-info text-info-foreground">Pendiente</Badge>;
      default:
        return null;
    }
  };

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
          <h1>Mi Horario</h1>
        </div>
      </header>

      <div className="px-6 py-6">
        {/* Week Selector */}
        <Card className="p-4 mb-4 shadow-md">
          <div className="flex items-center justify-between">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Semana anterior"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>
            
            <div className="flex-1 text-center">
              <h2>Semana del 23 - 27 Oct</h2>
              <Badge variant="secondary" className="mt-1 bg-success/10 text-success border-success">
                Esta semana
              </Badge>
            </div>

            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Semana siguiente"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </Card>

        {/* Days Tabs */}
        <div className="mb-6 overflow-x-auto -mx-6 px-6">
          <div className="flex gap-2 min-w-max">
            {DAYS.map((day, index) => (
              <button
                key={day}
                onClick={() => setSelectedDay(index)}
                className={`flex flex-col items-center justify-center min-w-[3.5rem] h-14 px-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                  selectedDay === index
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground hover:bg-muted'
                }`}
                aria-label={`${day} ${DATES[index]}`}
                aria-current={selectedDay === index ? 'date' : undefined}
              >
                <span className={selectedDay === index ? '' : 'text-muted-foreground'}>
                  {day}
                </span>
                <span className="text-xl mt-1">{DATES[index]}</span>
                {index === 0 && selectedDay !== 0 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Classes List */}
        <div className="space-y-4 mb-6">
          {todayClasses.map((classItem, index) => (
            <div key={classItem.id}>
              {/* Time Separator */}
              {index > 0 && (
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 border-t border-border"></div>
                  <span className="text-muted-foreground px-2">
                    {classItem.startTime}
                  </span>
                  <div className="flex-1 border-t border-border"></div>
                </div>
              )}

              <Card className={`p-4 shadow-md border-l-4 ${getTypeColor(classItem.type)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-primary">
                        {classItem.startTime} - {classItem.endTime}
                      </h2>
                    </div>
                  </div>
                  {getStatusBadge(classItem.status)}
                </div>

                <h3 className="mb-1">{classItem.title}</h3>
                <p className="text-muted-foreground mb-4">Código: {classItem.code}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                    <span>{classItem.professor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                    <span>{classItem.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                    <span className="text-muted-foreground">
                      {classItem.type === 'theory' && 'Clase Teórica'}
                      {classItem.type === 'lab' && 'Práctica de Laboratorio'}
                      {classItem.type === 'tutorial' && 'Tutoría'}
                      {classItem.type === 'exam' && 'Evaluación'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate('navigation')}
                    className="h-10"
                  >
                    <Map className="w-4 h-4 mr-2" aria-hidden="true" />
                    Cómo llegar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10"
                  >
                    <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
                    Materiales
                    {classItem.id === '2' && (
                      <Badge className="ml-2 bg-destructive text-destructive-foreground">2</Badge>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                    Asistencia
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Info Badge */}
        <Card className="p-4 bg-muted/50 text-center">
          <p className="text-muted-foreground">
            Tienes <span className="text-foreground">{todayClasses.length} clases</span> programadas para hoy
          </p>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="schedule" onNavigate={onNavigate} />

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Horario de {DAYS[selectedDay]} {DATES[selectedDay]}. Tienes {todayClasses.length} clases programadas.
      </div>
    </div>
  );
}
