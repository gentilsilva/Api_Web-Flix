import { RequestService } from '../../services/request/request.service'; // Serviço para lidar com requisições
import { Component } from '@angular/core'; // Decorador e classe Component do Angular
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms'; // Ferramentas para formulários reativos
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component'; // Componente de layout principal
import { ToastrModule, ToastrService } from 'ngx-toastr'; // Módulo e serviço para notificações
import { CommonModule } from '@angular/common'; // Módulo comum para diretivas como NgIf e NgFor
import { Router } from '@angular/router';

// Interface para definir a estrutura dos dados do formulário de signup
interface SignupForm {
  nome: FormControl<string>;
  email: FormControl<string>;
  senha: FormControl<string>;
  confirmSenha: FormControl<string>;
}

// Interface para definir a estrutura dos dados do usuário
interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
}

// Decorador @Component que define o componente e suas propriedades
@Component({
  selector: 'app-signup-form', // Seletor usado para instanciar o componente no HTML
  standalone: true, // Indica que o componente é autônomo
  imports: [ReactiveFormsModule, MainLayoutComponent, CommonModule], // Módulos importados usados pelo componente
  templateUrl: './signup.component.html', // Caminho para o arquivo de template HTML
  styleUrl: './signup.component.scss', // Caminho para o arquivo de estilos SCSS
})

export class SignupComponent {
  // Declaração do formulário de signup
  signupForm!: FormGroup<SignupForm>;

  // Construtor da classe que injeta os serviços necessários
  constructor(
    private requestService: RequestService, // Serviço para lidar com requisições de usuário
    private toastService: ToastrService, // Serviço para exibir notificações
    private router: Router
  ) {
    // Inicialização do formulário com os campos e suas validações
    this.signupForm = new FormGroup({
      nome: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }), // Campo nome, obrigatório, com mínimo de 3 caracteres
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }), // Campo email, obrigatório, deve ser um email válido
      senha: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }), // Campo senha, obrigatório, com mínimo de 6 caracteres
      confirmSenha: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }) // Campo confirmar senha, obrigatório, com mínimo de 6 caracteres
    }, { validators: this.passwordMatchValidator }); // Adiciona o validador para conferir se as senhas coincidem
  }

  // Função para validar se as senhas coincidem
  passwordMatchValidator: ValidatorFn = (group: AbstractControl): { [key: string]: boolean } | null => {
    // Se os valores dos campos senha e confirmar senha são diferentes
    const senha = group.get('senha')?.value;
    const confirmSenha = group.get('confirmSenha')?.value;
    if (senha !== confirmSenha) {
      return { mismatch: true }; // Retorna um objeto com a chave 'mismatch' indicando erro
    }
    return null; // Retorna null se não houver erro
  }

  // Função para submissão do formulário
  submit(): void {
    // Verifica se o formulário é válido
    if (this.signupForm.valid) {
      // Cria um novo objeto usuário com os dados do formulário
      const newUser: User = {
        id: (this.requestService.users.length + 1).toString(), // Gera um novo ID baseado no tamanho da lista de usuários
        nome: this.signupForm.value.nome?? '', // Obtém o valor do campo nome
        email: this.signupForm.value.email?? '', // Obtém o valor do campo email
        senha: this.signupForm.value.senha?? '' // Obtém o valor do campo senha
      };
      // Chama o serviço para adicionar o novo usuário
      this.requestService.setUser(newUser);
      // Exibe uma mensagem de sucesso usando o serviço de notificação
      this.toastService.success("Cadastro realizado com sucesso");
      this.router.navigate(["home"])

    } else {
      // Exibe uma mensagem de erro se o formulário for inválido
      this.toastService.error("Ocorreu algum erro, tente novamente mais tarde");
    }

  }
}


/*import { Component } from '@angular/core';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';

interface LoginForm {
  titulo: FormControl;
  genero: FormControl;
  lancamento: FormControl<Date | null>;
  diretor: FormControl;
  estudio: FormControl;
}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MainLayoutComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private requestService: RequestService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(6)]),
      CPF: new FormControl('', [Validators.required, Validators.minLength(6)]),
      RG: new FormControl('', [Validators.required, Validators.minLength(6)]),
      Endereço: new FormControl('', [Validators.required, Validators.minLength(6)]),
      "Data de nascimento": new FormControl<Date>(new Date, [Validators.required]),
      diretor: new FormControl('', [Validators.required, Validators.minLength(6)]),
      estudio: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
}*/
