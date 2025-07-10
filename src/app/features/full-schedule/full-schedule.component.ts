import { Component, inject, ViewChild } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // Plugin para visualização de grade horária
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { AgendamentoService } from '../../shared/services/agendamento.service';
import { error } from 'console';
import { Agendamento } from '../../shared/models/agendamento.model';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailsDialogComponent } from '../../shared/components/components/event-details-dialog/event-details-dialog.component';


@Component({
    selector: 'app-full-schedule',
    imports: [FullCalendarModule],
    templateUrl: './full-schedule.component.html',
    styleUrl: './full-schedule.component.css'
})
export class FullScheduleComponent {

  agendamnetoService = inject(AgendamentoService);
  agendamentos: Agendamento[] = [];
  eventos: any[] = [];


  @ViewChild('fullcalendar') calendarComponent?: FullCalendarComponent;

  constructor(private dialog: MatDialog) {}

  private LoadSchedule() {

    const filtro = {
      clienteId: null,
      profissionalId: null, 
      servicoId: null,
      dataInicial: null,
      dataFinal: null,
    };


    this.agendamnetoService.getAllByFilter({filtro}).subscribe({
      next:(data) => {
        this.handleLoadSchedule(data);
      },
      error:(error) => {
        // this.handlerError(error);
        console.log('Erro ao carregar os dados:', error);
      }
    });
  }

  private handleLoadSchedule(data: Agendamento[]): void {
    this.agendamentos = data;
    this.eventos = this.mapSheculeToCalendar(this.agendamentos);

    if (this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.removeAllEvents(); // limpa eventos antigos
      calendarApi.addEventSource(this.eventos); // adiciona novos eventos
    }
  }

  private mapSheculeToCalendar(agendamentos: Agendamento[]): any[] {
    return agendamentos.map(agendamento => ({
      id: agendamento.id,
      title: `${agendamento.clienteNome} - ${agendamento.servico?.nome}`,
      start: agendamento.dataInicial?.toString(), // ou '2024-11-10T12:00:00'
      end: agendamento.dataFinal?.toString(), // ou '2024-11-10T14:00:00'
      allDay: false,
      extendedProps: {
        cliente: agendamento.clienteNome,
        telefone: agendamento.clienteTelefone,
        profissional: agendamento.profissional?.nome,
        servico: agendamento.servico?.nome,
        tempo: agendamento.servico?.tempoGastoEmHora,
        valor: agendamento.valor
      }
    })) || [];
  }

  
  calendarOptions: CalendarOptions = {
    initialView: 
      'timeGridWeek',
      // 'dayGridMonth', // Visualização inicial
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin , listPlugin ], // Plugins ativados
    // dateClick: this.handleDateClick.bind(this), // Evento ao clicar em uma data
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek,dayGridYear'
    },
    buttonText: {
      today:    'Hoje',
      month:    'Mês',
      week:     'Semana',
      day:      'Dia',
      list:     'Lista'
    },
    allDayText: 'Dia Inteiro',
    titleFormat: { // will produce something like "Tuesday, September 18, 2018"
      month: 'long',
      year: 'numeric',
      day: 'numeric',
      // weekday: 'long'
    },
    contentHeight: 'auto',
    height: '90%',
    navLinks: true,
    nowIndicator: true,
    businessHours: {
      // days of week. an array of zero-based day of week integers (0=Sunday)
      daysOfWeek: [ 1, 2, 3, 4, 5, 6 ], // Monday - Thursday
    
      startTime: '08:00', // a start time (8am in this example)
      endTime: '19:00', // an end time (7pm in this example)
    },
    locale: 'pt-br',  
    selectable: false, // Permite selecionar períodos
    editable: true, // Permite arrastar eventos
    droppable: true, 
    timeZone: 'UTC',
    dayMaxEvents: true, // allow "more" link when too many events
    // weekNumbers: true,
    events: this.eventos, // Eventos iniciais
    
    eventClick: (info) => {
      this.dialog.open(EventDetailsDialogComponent, {
        data: {
          cliente: info.event.extendedProps?.['cliente'],
          telefone: info.event.extendedProps?.['telefone'],
          servico: info.event.extendedProps?.['servico'],
          profissional: info.event.extendedProps?.['profissional'],
          valor: info.event.extendedProps?.['valor'],
          tempo: info.event.extendedProps?.['tempo'],
        }
      });
    }
  };

  
  ngOnInit(): void {
    this.LoadSchedule();
  }


  

}




