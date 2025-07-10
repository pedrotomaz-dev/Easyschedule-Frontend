import { Component, inject, OnInit, ViewChild } from '@angular/core';

import { ServicoService } from '../../shared/services/servico.service';
import { Servico } from '../../shared/models/servico.model';
import { Profissional } from '../../shared/models/profissional.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTimepickerModule} from '@angular/material/timepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { ProfissionalService } from '../../shared/services/profissional.service';
import { BehaviorSubject, finalize, forkJoin, map, merge, Observable, of, startWith } from 'rxjs';
import { SnackbarComponent } from '../../core/components/snackbar/snackbar.component';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { SpinnerService } from '../../core/services/spinner.service';
import { Cliente } from '../../shared/models/cliente.model';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ClienteService } from '../../shared/services/cliente.service';
import { PhoneMaskDirective } from '../../core/directives/phone-mask.directive';
import { AgendamentoService } from '../../shared/services/agendamento.service';
import { Agendamento } from '../../shared/models/agendamento.model';


@Component({
    selector: 'app-scheduling',
    providers: [
      provideNativeDateAdapter(), 
      SnackbarComponent,
      DatePipe,
    ],
    imports: [
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      ReactiveFormsModule,
      MatStepperModule,
      MatDatepickerModule,
      MatTimepickerModule,
      MatNativeDateModule,
      CommonModule,
      MatIcon,    
      FormsModule,
      MatAutocompleteModule,
      AsyncPipe,
      PhoneMaskDirective,
    ],
    templateUrl: './scheduling.component.html',
    styleUrl: './scheduling.component.css'
})
export class SchedulingComponent implements OnInit {
  

  // variables
  isLinear = true;
  scheduleView = this.resetScheduleView();

  
  // lists
  clientes: Cliente[] = [];
  // clientesFiltrados?: Observable<Cliente[]>;
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  clientesFiltrados: Observable<Cliente[]> = this.clientesSubject.asObservable();
  profissionais: Profissional[] = [];
  profissionaisFiltrados: Profissional[] = [];
  servicos: Servico[] = [];


  // forms
  formCliente?: FormGroup;
  formHorarioAgendamento?: FormGroup;
  formProfissional?: FormGroup;
  formServico?: FormGroup;


  // elements
   @ViewChild('stepper') stepper!: MatStepper;


  // dependency injections
  private profissionalService = inject(ProfissionalService);
  private servicoService = inject(ServicoService);
  private clienteService = inject(ClienteService);
  private agendamentoService = inject(AgendamentoService);
  private spinner = inject(SpinnerService);
  


  
  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarComponent,
    private datePipe: DatePipe,
  ) { }
  


  ngOnInit() {
    this.buildForms();
    this.valueChangesObservables();
    this.loadData();
  }


  // public METHODS
  buildScheduleView() {
    const servico = this.servicos.find(x => x.id == this.formServico?.value.servicoId);
    const profissional = this.profissionais.find(x => x.id == this.formProfissional?.value.profissionalId);
    const nome = this.formCliente?.value.nome ?? '';
    const telefone = this.formCliente?.value.telefone ?? '';

    this.scheduleView = {
      cliente: nome, 
      servico: servico ? servico.nome : '',
      profissional: profissional ? profissional.nome : '',	
      data: this.formHorarioAgendamento?.value.data ?? '',
      horario: this.formHorarioAgendamento?.value.horario ?? '',
    };
  }

  filterProfessionals() {
    this.profissionaisFiltrados = this.profissionais.filter((profissional: Profissional) => {
      return profissional.servicos?.some((servico) => servico.id === this.formServico?.value.servicoId);
    });
  }
  
  saveSchedule() {
    // this.spinner.show();
    
    const obj = {
      clienteId: this.formCliente?.value.id,
      clienteNome: this.formCliente?.value.nome,
      clienteTelefone: this.formCliente?.value.telefone,
      servicoId: this.formServico?.value.servicoId,
      profissionalId: this.formProfissional?.value.profissionalId,
      data: this.datePipe.transform(this.formHorarioAgendamento?.value.data, 'yyyy-MM-ddT00:00:00'),
      horario: this.datePipe.transform(this.formHorarioAgendamento?.value.horario, 'HH:mm:ss'),
    };

    this.agendamentoService.create(obj).subscribe({
      next: (agendamento: Agendamento) => this.actionsForSusccessCreateSchedule(agendamento),
      error: (error: any) => this.actionsForError(error)
    })

  }
  
  selectionStepChange(event: any) {
    // if (event.selectedIndex === 2) {
      this.buildScheduleView();
    // } 
  }

  
  stepperReset() {
    this.stepper.reset(); 
    this.scheduleView = this.resetScheduleView();
  }


  // private METHODS
  private actionsForError(error: any) {
    this.spinner.hide();
    this.snackbar.showError(error);
  }

  private actionsForSusccessCreateSchedule(agendamento: Agendamento) {
    this.stepperReset();
    this.buildForms();
    this.snackbar.showSuccess('Agendamento criado com sucesso!');
    this.spinner.hide();
  }

  private actionsForSuccessLoadData(clientes: Cliente[], servicos: Servico[], profissionais: Profissional[]) {
    this.spinner.hide();
    this.actionsForSuccessLoadClients(clientes);
    this.actionsForSuccessLoadServices(servicos);
    this.actionsForSuccessLoadProfessionals(profissionais);
  }

  private actionsForSuccessLoadProfessionals(profissionais: Profissional[]) {
    this.profissionais = profissionais;
  }

  private actionsForSuccessLoadClients(clientes: Cliente[]) {
    this.clientes = clientes;
    this.clientesSubject.next(clientes);
  }

  private actionsForSuccessLoadServices(servicos: Servico[]) {
    this.servicos = servicos;    
  }

  private buildForms() {
    this.buildClientForm();
    this.buildServiceForm();
    this.buildProfessionalForm();
    this.buildScheduleTimeForm();
  }

  private buildClientForm() {
    this.formCliente = this.fb.group({
      id: [''],
      nome: ['', [Validators.required]],
      telefone: ['', [Validators.required]]
    });
  }

  private buildProfessionalForm() {
    this.formProfissional = this.fb.group({
      profissionalId: ['', Validators.required],
    });
  }

  private buildServiceForm() {
    this.formServico = this.fb.group({
      servicoId: ['', Validators.required],
    });

    this.formServico.get('servicoId')?.valueChanges.subscribe((value: string) => {
      this.profissionaisFiltrados = this.profissionais.filter((profissional: Profissional) => {
        return profissional.servicos?.some((servico) => servico.id === value);
      });
    });
  }

  private buildScheduleTimeForm() {
    this.formHorarioAgendamento = this.fb.group({
      data: ['', Validators.required],
      horario: [''],
    });
  }

  private filterClientsByName(value: string): Cliente[] {
    const filterValue = value.toLowerCase();

    const cliente = this.clientes.find(c => c.telefone?.toLocaleLowerCase() === filterValue);
    if (cliente) {
      this.formCliente?.patchValue({
        telefone: cliente.telefone
      });
    }

    return this.clientes.filter(x => x.nome?.toLowerCase().includes(filterValue));
  }

  private filterClientsByPhone(phone: string): Cliente[] {
    const normalizedPhone = phone.replace(/\D/g, ''); // Remove tudo que não for número

    const cliente = this.clientes.find(cliente => cliente.telefone?.replace(/\D/g, '') === normalizedPhone);
    if (cliente) {
      this.formCliente?.patchValue({
        nome: cliente.nome
      });
    }

    return this.clientes.filter(cliente => 
      cliente.telefone?.replace(/\D/g, '').includes(normalizedPhone)
    );
  }

  private loadData() {
    // this.spinner.show();
    forkJoin([
      this.clienteService.getAll(),
      this.servicoService.getAllWithProfessionals(), 
      this.profissionalService.getAllWithServices(),
    ]).subscribe({
      next: ([clientes, servicos, profissionais]: [Cliente[], Servico[], Profissional[]]) => {
        this.actionsForSuccessLoadData(clientes, servicos, profissionais);
      },
      error: (error: any) => {
        this.actionsForError(error);
      }
    });
  }

  private resetScheduleView(): any {
    return {
      cliente: '',
      servico: '',
      profissional: '',
      data: '',
      horario: '',
    };
  }

  private valueChangesObservables() {
    const telefoneControl = this.formCliente?.get('telefone');
    const nomeControl = this.formCliente?.get('nome');
  
    const telefoneChanges = telefoneControl
      ? telefoneControl.valueChanges.pipe(
          startWith(''),
          map(x => (x ? this.filterClientsByPhone(x) : this.clientes))
        )
      : of(this.clientes); // Se o controle não existir, usa um Observable padrão
  
    const nomeChanges = nomeControl
      ? nomeControl.valueChanges.pipe(
          startWith(''),
          map(x => (x ? this.filterClientsByName(x) : this.clientes))
        )
      : of(this.clientes);
  
    this.clientesFiltrados = merge(telefoneChanges, nomeChanges);
  }

}
