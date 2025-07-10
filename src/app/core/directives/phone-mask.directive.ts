import { Directive, ElementRef, HostListener, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[phoneMask]',
  standalone: true
})
export class PhoneMaskDirective {

  constructor(private el: ElementRef, @Optional() @Self() private control?: NgControl) {}

  @HostListener('input', ['$event'])
  onInput() {
    let value = this.el.nativeElement.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (value.length > 11) {
      value = value.substring(0, 11); // Limita ao tamanho máximo
    }

    if (value.length >= 10) {
      value = this.formatPhone(value);
    }

    if (this.control?.control) {
      this.control.control.setValue(value, { emitEvent: false });
    } else {
      this.el.nativeElement.value = value;
    }
  }

  private formatPhone(value: string): string {
    if (value.length === 11) {
      // Formato para celular (11 dígitos)
      return value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2$3-$4');
    } else {
      // Formato para telefone fixo (10 dígitos)
      return value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }
  }

}
