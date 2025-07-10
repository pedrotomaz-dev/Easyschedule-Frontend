import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {
  /**
   * Atualiza as mensagens de erro dinamicamente para um formulário específico.
   * @param formGroup Formulário contendo os controles a serem verificados.
   * @returns Um objeto com as mensagens de erro para cada controle.
   */
  updateErrorMessages(formGroup?: FormGroup): { [key: string]: string } {
    const errorMessages: { [key: string]: string } = {};

    if (formGroup) {

      Object.keys(formGroup.controls).forEach(controlName => {
        const control = formGroup.get(controlName);
        if (control && control.errors) {
          errorMessages[controlName] = this.getErrorMessage(control.errors);
        }
      });
    }

    return errorMessages;
  }

  /**
   * Gera mensagens de erro específicas com base nos erros do controle.
   * @param errors Erros do controle.
   * @returns Uma mensagem descritiva para o primeiro erro encontrado.
   */
  private getErrorMessage(errors: { [key: string]: any }): string {
    if (!errors) {
      return '';
    }

    if (errors['required']) {
      return 'Campo obrigatório.';
    }
    if (errors['minlength']) {
      return `O valor deve ter pelo menos ${errors['minlength'].requiredLength} caracteres.`;
    }
    if (errors['maxlength']) {
      return `O valor não pode exceder ${errors['maxlength'].requiredLength} caracteres.`;
    }
    if (errors['email']) {
      return 'Formato de e-mail inválido.';
    }
    if (errors['pattern']) {
      return 'O formato do valor é inválido.';
    }
    // Adicione mais validações conforme necessário
    return 'Erro desconhecido.';
  }
}
