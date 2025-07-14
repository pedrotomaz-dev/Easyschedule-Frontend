import { Component, computed, Input, signal, ViewChild, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../models/menu-item.model';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-sidenav',
    imports: [
        MatSidenavModule,
        MatNavList,
        MatIconModule,
        MatIconModule,
        RouterModule,
    ],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
  

  role?: string | null;
 
  private authService = inject(AuthService);

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  ngOnInit(): void {
    this.getRoles();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  close() {
    this.sidenav.close();
  }

  open() {
    this.sidenav.open();
  }

  menuItems = signal<MenuItem[]>([
    {
      icone: 'schedule_send',
      titulo: 'Agendamento',
      rota: 'scheduling',
      roles: ['admin','profissional', 'cliente']
    },
    {
      icone: 'home',
      titulo: 'Home',
      rota: 'home',
      roles: ['admin','profissional', 'cliente']
    },
    {
      icone: 'calendar_month',
      titulo: 'Calendário',
      rota: 'fullSchedule',
      roles: ['admin', 'profissional']
    },
    {
      icone: 'design_services',
      titulo: 'Serviços',
      rota: 'serviceList',
      roles: ['admin', 'profissional']
    },
    {
      icone: 'group',
      titulo: 'Profissionais',
      rota: 'professionalList',
      roles: ['admin', 'profissional']
    },
  ]);
  

  private getRoles() {
    this.role = this.authService.getRole();
  }

}
