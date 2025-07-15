import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

  isLoading: boolean = false;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.spinnerService.loaderState$.subscribe((isLoading) => {
      this.isLoading = isLoading; // Atualiza o estado de exibição do spinner
    });
  }
}
