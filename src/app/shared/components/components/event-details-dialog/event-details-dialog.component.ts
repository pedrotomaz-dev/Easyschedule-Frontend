import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-event-details-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './event-details-dialog.component.html',
  styleUrl: './event-details-dialog.component.css'
})

export class EventDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { [key: string]: any }) {}

  getKeys(obj: object): string[] {
    return Object.keys(obj);
  }
  
  formatLabel(key: string): string {
    // Capitaliza e troca underline/caixa baixa por algo mais legível
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace('_', ' ');
  }
  
  formatValue(value: any): string {
    if (typeof value === 'number') {
      return `R$ ${value.toFixed(2)}`;
    }
    return value ?? '—';
  }
  
}


