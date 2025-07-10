import { Directive, ElementRef, HostListener, Input, Optional, Self, signal, WritableSignal } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[cpfCnpjMask]',
  standalone: true
})
export class CpfCnpjMaskDirective {

  @Input() maskType: 'cpf' | 'cnpj' | 'auto' = 'auto'; // Define o tipo de máscara

  constructor(private el: ElementRef, @Optional() @Self() private control?: NgControl) {}

  @HostListener('input', ['$event'])
  onInput() {
    let value = this.el.nativeElement.value.replace(/\D/g, '');

    if (this.maskType === 'cpf') {
      value = this.formatCPF(value);
      this.el.nativeElement.maxLength = 14;
    } else if (this.maskType === 'cnpj') {
      value = this.formatCNPJ(value);
      this.el.nativeElement.maxLength = 18;
    } else {

      if (value.length <= 11) {
        value = this.formatCPF(value);
      } else {
        value = this.formatCNPJ(value);
      }

      this.el.nativeElement.maxLength = 18;
    }

    if (this.control?.control) {
      this.control.control.setValue(value, { emitEvent: false });
    } else {
      this.el.nativeElement.value = value; // Atualiza manualmente
    }
  }

  private formatCPF(value: string): string {
    return value
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2');
  }

  private formatCNPJ(value: string): string {
    return value
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }

}
