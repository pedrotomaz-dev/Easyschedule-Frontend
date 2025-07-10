import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormErrorService } from '../../../core/services/form-error.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyMaskDirective } from '../../../core/directives/currency-mask.directive';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Profissional } from '../../../shared/models/profissional.model';
import { ServicoService } from '../../../shared/services/servico.service';
import { Servico } from '../../../shared/models/servico.model';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ProfissionalService } from '../../../shared/services/profissional.service';

@Component({
  selector: 'app-service-list-form',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    CurrencyMaskDirective,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
  ],
  templateUrl: './service-list-form.component.html',
  styleUrl: './service-list-form.component.css'
})
export class ServiceListFormComponent {


  formServico?: FormGroup;
  errorMessages: { [key: string]: string } = {};
  // Dicionário de horas
  horas: any[] = [
    { valor: 0.5, texto: '0h30' },
    { valor: 1, texto: '1h' },
    { valor: 1.5, texto: '1h30' },
    { valor: 2, texto: '2h' },
    { valor: 2.5, texto: '2h30' },
    { valor: 3, texto: '3h' },
    { valor: 3.5, texto: '3h30' },
    { valor: 4, texto: '4h' },
    { valor: 4.5, texto: '4h30' },
    { valor: 5, texto: '5h' },
    { valor: 5.5, texto: '5h30' },
    { valor: 6, texto: '6h' },
  ];


  profissionais: Profissional[] = [];

  servicoService = inject(ServicoService);
  profissionalService = inject(ProfissionalService);
  

  constructor(
    private fb: FormBuilder,
    private formErrorService: FormErrorService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.buildForm();
    this.loadData();
    this.loadService();
  }


  removeProfessional(profissional: Profissional) {
    const index = this.profissionais.findIndex(p => p.id === profissional.id);
    if (index >= 0) {
      this.profissionais.splice(index, 1);
    }
  }

  goToServiceList(): void {
    // Redirecionar para a página de listagem de serviços
    this.router.navigate(['/serviceList']);
  }

  professionalsCompare = (s1: any, s2: any) => s1 && s2 && s1.id === s2.id;

  showErrorMessage(): void {
    this.errorMessages = this.formErrorService.updateErrorMessages(this.formServico);
  }

  submitService() {
    if (this.formServico?.valid) {

      const obj = Object.assign(new Servico(), this.formServico.value);

      if (obj.id) {
        this.servicoService.update(obj).subscribe({
          next: () => {
            this.goToServiceList();
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      } else {
        this.servicoService.create(obj).subscribe({
          next: () => {
            this.goToServiceList();
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      }
    }
  }


  // private METHODS
  private actionForSuccessLoadData(profissionais: Profissional[]) {
    this.profissionais = profissionais;
  }

  private actionsForSuccessLoadService(servico: Servico) {
    this.formServico?.patchValue({
      ...servico,
      profissionais: servico.profissionais ?? []
    });
  }

  private buildForm() {
    this.formServico = this.fb.group({
      id: [''],
      sigla: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      valor: [0, [Validators.required]],
      tempoGastoEmHora: [0, [Validators.required]],
      profissionais: [],
    });
  }

  private loadData() {
    this.profissionalService.getAll().subscribe({
      next: (profissionais: Profissional[]) => {
        this.actionForSuccessLoadData(profissionais);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  private loadService() {
    const id = this.router.url.split('/').pop();
    if (id) {
      this.servicoService.getWithProfessionals(id).subscribe({
        next: (servico: Servico) => {
          this.actionsForSuccessLoadService(servico);
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }

}
