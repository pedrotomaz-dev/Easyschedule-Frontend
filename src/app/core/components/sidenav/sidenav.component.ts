import { Component, computed, Input, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../models/menu-item.model';
import { MatSidenav } from '@angular/material/sidenav';

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
export class SidenavComponent {

  // @ViewChild('drawer') sidenav!: MatSidenav;

  // toggleSidenav() {
  //   this.sidenav.toggle();
  // }

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

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
      rota: 'scheduling'
    },
    {
      icone: 'home',
      titulo: 'Home',
      rota: 'home'
    },
    {
      icone: 'calendar_month',
      titulo: 'Calendário',
      rota: 'fullSchedule'
    },
    {
      icone: 'design_services',
      titulo: 'Serviços',
      rota: 'serviceList'
    },
    {
      icone: 'group',
      titulo: 'Profissionais',
      rota: 'professionalList'
    },
  ]);
  


}
