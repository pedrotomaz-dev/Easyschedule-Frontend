import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-header',
    imports: [
        MatToolbarModule, MatButtonModule, MatIconModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() isLoggedIn = false;


  private readonly authService = inject(AuthService);

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.authService.logout();
  }
}
