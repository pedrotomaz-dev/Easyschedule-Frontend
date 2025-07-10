import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[currencyMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyMaskDirective),
      multi: true,
    },
  ],
})
export class CurrencyMaskDirective implements ControlValueAccessor {
  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any): void {
    let value = event.target.value;

    // Remove todos os caracteres que não sejam números
    value = value.replace(/\D/g, '');

    if (value) {
      value = this.formatCurrency(value);
    }

    event.target.value = value;

    // Converte para número decimal e notifica o FormControl
    this.onChange(this.parseToNumber(value));
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  private formatCurrency(value: string): string {
    // Transforma o número corretamente em centavos
    const numericValue = (parseInt(value, 10) / 100).toFixed(2);

    // Formata no padrão brasileiro (BRL)
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(numericValue));
  }

  private parseToNumber(value: string): number | null {
    if (!value) return null;

    // Remove pontos de milhar e substitui vírgula decimal por ponto
    return Number(value.replace(/\./g, '').replace(',', '.'));
  }

  // Métodos para integração com FormControl
  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.el.nativeElement.value = this.formatCurrency((value * 100).toString());
    } else {
      this.el.nativeElement.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }
}
