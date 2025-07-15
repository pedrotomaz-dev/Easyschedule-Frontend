import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, NgZone, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { SpinnerService } from './core/services/spinner.service';
import { SpinnerComponent } from './core/components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/services/auth.service';
import { filter } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    MatSidenavModule,
    SidenavComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'EasySchedule-Angular';

  isLoggedIn = false;
  isSidenavOpen = false;  // Variável que controla o estado do sidenav

  @ViewChild(SidenavComponent) sidenavComponent!: SidenavComponent;

  private readonly authService = inject(AuthService);
  private readonly spinnerService = inject(SpinnerService);
  private readonly router = inject(Router);


  ngOnInit() {
    // Inicializando o serviço de spinner
    this.spinnerService.hide();

    this.isLoggedIn = this.authService.isAuthenticated();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLoggedIn = this.authService.isAuthenticated();
    });
  }



  // Método para verificar se a página atual é a de login
  isLoginPage(): boolean {
    return this.router.url.includes('/login');
  }

  


  toggleSidenav() {
    this.sidenavComponent.toggleSidenav();
  }

  // Método chamado quando o evento de toggle é emitido do Header
  // toggleSidenav() {
  //   this.isSidenavOpen = !this.isSidenavOpen;
  // }
}
