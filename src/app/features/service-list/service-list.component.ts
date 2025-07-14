import { Component, inject } from '@angular/core';
import { ServicoService } from '../../shared/services/servico.service';
import { Servico } from '../../shared/models/servico.model';
import { MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SpinnerService } from '../../core/services/spinner.service';

@Component({
    selector: 'app-service-list',
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
    ],
    templateUrl: './service-list.component.html',
    styleUrl: './service-list.component.css'
})
export class ServiceListComponent {


  // public PROPERTIES
  servicos: Servico[] = []; 
  displayedColumns: string[] = ['sigla', 'nome', 'valor', 'tempoGastoEmHora'];
  
  // dependency injection
  private servicoService = inject(ServicoService);
  private spinner = inject(SpinnerService);

  constructor(
    private router: Router,
  ) { }


  ngOnInit() {
    this.loadServices();
  }


  addService() {
    this.router.navigate(['/serviceList', '']);
  }

  getCounter(): number {
    return this.servicos?.length ?? 0;
  }


  rowEdit(row: Servico) {
    this.router.navigate(['/serviceList', row.id]);
  }


  // private METODS
  private actionsForError(erro: any) {
    this.spinner.hide();
    console.log(erro);
  }

  private loadServices() {
    this.spinner.show();

    this.servicoService.getAllWithProfessionals().subscribe({
      next: (servicos: Servico[]) => {
        this.actionsForSuccessLoadServices(servicos);
      },
      error: (error: any) => {
        this.actionsForError(error);
      }
    });
  }

  private actionsForSuccessLoadServices(data: Servico[]) {
    this.servicos = data;

    this.spinner.hide();
  }
}
