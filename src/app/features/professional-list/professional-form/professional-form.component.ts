import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Profissional } from '../../../shared/models/profissional.model';
import { FormErrorService } from '../../../core/services/form-error.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProfissionalService } from '../../../shared/services/profissional.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CpfCnpjMaskDirective } from '../../../core/directives/cpf-cnpj-mask.directive';
import { Servico } from '../../../shared/models/servico.model';
import { PhoneMaskDirective } from '../../../core/directives/phone-mask.directive';
import { ServicoService } from '../../../shared/services/servico.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professional-form',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    ReactiveFormsModule,
    CpfCnpjMaskDirective,
    PhoneMaskDirective,
    CommonModule,
  ],
  templateUrl: './professional-form.component.html',
  styleUrl: './professional-form.component.scss'
})
export class ProfessionalFormComponent {


  formProfissional?: FormGroup = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    telefone: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl(''),
    cpfCnpj: new FormControl(''),
    ativo: new FormControl(true),
    servicos: new FormControl([])
  });

  errorMessages: { [key: string]: string } = {};

  servicos: Servico[] = [];

  profissionalService = inject(ProfissionalService);
  servicoService = inject(ServicoService);

  


  readonly dialog = inject(MatDialog);

  constructor(
    private fb: FormBuilder,
    private formErrorService: FormErrorService,
    private router: Router,
  ) { }


  ngOnInit() {
    // this.resetProfessionalForm();
    this.loadData();
    this.loadProfessional();
  }


  goToProfessionalList(): void {
    // Redirecionar para a página de listagem de serviços
    this.router.navigate(['/professionalList']);
  }

  openDialog() {
    // const dialogRef = this.dialog.open();

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  removeService(servico: Servico) {
    const index = this.servicos.findIndex(p => p.id === servico.id);
    if (index >= 0) {
      this.servicos.splice(index, 1);
    }
  }

  servicesCompare = (s1: any, s2: any) => s1 && s2 && s1.id === s2.id;
  
  showErrorMessage(): void {
    this.errorMessages = this.formErrorService.updateErrorMessages(this.formProfissional);
  }

  submitProfessional() {
    if (this.formProfissional?.valid) {

      const obj = Object.assign({}, this.formProfissional.value);

      if (obj.id) {
        this.profissionalService.update(obj).subscribe({
          next: () => {
            this.goToProfessionalList();
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      } else {
        this.profissionalService.create(obj).subscribe({
          next: () => {
            this.goToProfessionalList();
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      }
    }
  }


  // private METHODS
  private actionsForSuccessLoadData(servicos: Servico[]) {
    this.servicos = servicos;
  }


  private actionsForSuccessLoadProfessional(profissional: Profissional) {
    this.formProfissional?.patchValue({
      ...profissional,
      servicos: profissional.servicos ?? []
    });
  }


  private resetProfessionalForm() {
    this.formProfissional?.reset({
      id: [''],
      telefone: [''],
      nome: [''],
      cpfCnpj: [''],
      email: [''],
      servicos: new FormArray([])
    });
  }


  private loadData() {
    this.servicoService.getAll().subscribe({
      next: (servicos: Servico[]) => {
        this.actionsForSuccessLoadData(servicos);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }


  private loadProfessional() {
    const id = this.router.url.split('/').pop();
    if (id) {
      this.profissionalService.getWithProfessionals(id).subscribe({
        next: (profissional: Profissional) => {
          this.actionsForSuccessLoadProfessional(profissional);
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }
}
