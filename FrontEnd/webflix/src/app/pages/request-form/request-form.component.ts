import { RequestService } from './../../services/request.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { RequestsComponent } from '../requests/requests.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface LoginForm {
  titulo: FormControl;
  genero: FormControl;
  lancamento: FormControl<Date | null>;
  diretor: FormControl;
  estudio: FormControl;
}

interface DataItem {
  id: string;
  titulo: string;
  genero: string;
  lancamento: string;
  diretor: string;
  estudio: string;
}


@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [ReactiveFormsModule, MainLayoutComponent, RequestsComponent],
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss',
})
export class RequestFormComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private requestService: RequestService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(6)]),
      genero: new FormControl('', [Validators.required, Validators.minLength(6)]),
      lancamento: new FormControl<Date>(new Date, [Validators.required]),
      diretor: new FormControl('', [Validators.required, Validators.minLength(6)]),
      estudio: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit(): void {
    console.log(this.loginForm.valid)

    if(this.loginForm.valid) {
      const novaRequisicao: DataItem = {
        id: (this.requestService.filmes["length"] + 1).toString(),
        titulo: this.loginForm.value.titulo,
        genero: this.loginForm.value.genero,
        lancamento: this.loginForm.value.lancamento?.toString() ?? '',
        diretor: this.loginForm.value.diretor,
        estudio: this.loginForm.value.estudio
      }
      this.requestService.setFilme(novaRequisicao);
      this.toastService.success("Solicitação enviada com sucesso");
      this.router.navigate(["requests"])

    } else {
      this.toastService.error("Ocorreu algum erro, tente novamente mais tarde");
    }
  }
}
