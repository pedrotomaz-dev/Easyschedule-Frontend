import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ProfissionalService } from '../../shared/services/profissional.service';
import { Profissional } from '../../shared/models/profissional.model';
import { Router } from '@angular/router';
import { SpinnerService } from '../../core/services/spinner.service';

@Component({
  selector: 'app-professional-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './professional-list.component.html',
  styleUrl: './professional-list.component.css'
})
export class ProfessionalListComponent {


  // public PROPERTIES
  profissionais: Profissional[] = [];
  displayedColumns: string[] = ['nome', 'telefone', 'ativo'];

  

  // dependency injection
  private profissionalService = inject(ProfissionalService);

  constructor(
    private router: Router,
    private spinner: SpinnerService,
  ) { }


  ngOnInit() {
    this.loadProfessionals();
  }


  addProfessional() {
    this.router.navigate(['/professionalList', '']);
  }

  getCounter(): number {
    return this.profissionais?.length ?? 0;
  }


  rowEdit(row: Profissional) {
    this.router.navigate(['/professionalList', row.id]);
  }


  // private METODS
  private actionsForError(message: string) {
    this.spinner.hide();
    
    console.log(message);
  }
  private loadProfessionals() {
    // this.spinner.show();
    this.profissionalService.getAll().subscribe({
      next: (profissionals: Profissional[]) => {
        this.actionsForSuccessLoadProfessionals(profissionals);
      },
      error: (error: any) => {
        this.actionsForError(error.message);
      }
    });
  }

  private actionsForSuccessLoadProfessionals(data: Profissional[]) {
    this.profissionais = data;
    this.spinner.hide();
  }
}
