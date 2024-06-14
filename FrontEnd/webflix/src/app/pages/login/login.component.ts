import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request/request.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

// Interface para definir a estrutura dos dados do formulário de signup
interface LoginForm {
  email: FormControl<string>;
  senha: FormControl<string>;
}

// Interface para definir a estrutura dos dados do usuário
interface DataItem {
  email: string;
  senha: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MainLayoutComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private requestService: RequestService, // Serviço para lidar com requisições de usuário
    private toastService: ToastrService, // Serviço para exibir notificações
    private router: Router
  ) {
    // Inicialização do formulário com os campos e suas validações
    this.loginForm = new FormGroup({
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }), // Campo email, obrigatório, deve ser um email válido
      senha: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }), // Campo senha, obrigatório, com mínimo de 6 caracteres
    })
  }

  submit(): void {
    if(this.loginForm.valid) {
      const user: DataItem = {
        email: this.loginForm.value.email?? '',
        senha: this.loginForm.value.senha?? '',
      }

      if(this.requestService.getUser(user)) {
        this.toastService.success("Bem vindo " + user['email']);
        this.router.navigate(["home"]);
      } else {
        this.toastService.error("Login inválido");
      }
    } else {
      this.toastService.error("Ocorreu algum erro, tente novamente mais tarde");
    }
  }

}
