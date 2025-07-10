import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClienteService } from '../../shared/services/cliente.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auto-register',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './auto-register.component.html',
  styleUrl: './auto-register.component.css'
})
export class AutoRegisterComponent {

  formCustomer: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    cpfCnpj: new FormControl('', [Validators.required, Validators.minLength(5)]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmarSenha: new FormControl('', [Validators.required])
  },
  { validators: this.senhasIguaisValidator } // aplica a validação personalizada ao grupo
  );


  private readonly clienteService = inject(ClienteService);
  private readonly router = inject(Router);
  

  senhasIguaisValidator(group: AbstractControl): { [key: string]: any } | null {
    const senha = group.get('senha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhasDiferentes: true };
  }

  submit(): void {
    if (this.formCustomer.valid) {

      const value = this.formCustomer.value;
      const obj = {
        nome: value.nome,
        email: value.email,
        telefone: value.telefone,
        cpfCnpj: value.cpfCnpj,
        usuario: {username: value.cpfCnpj, senha: value.senha}
      };

      this.clienteService.create(obj).subscribe({
        next: (response) => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erro ao cadastrar cliente:', error);
          alert('Erro ao realizar o cadastro. Tente novamente mais tarde.');
        }
      });
    }
  }



}

