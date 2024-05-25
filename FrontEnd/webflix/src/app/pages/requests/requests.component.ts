import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';

interface LoginForm {
  titulo: FormControl,
  genero: FormControl,
  lancamento: FormControl<Date | null>,
  diretor: FormControl,
  estudio: FormControl,
}

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [ReactiveFormsModule, MainLayoutComponent],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss',
})
export class RequestsComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor() {
    this.loginForm = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(6)]),
      genero: new FormControl('', [Validators.required, Validators.minLength(6)]),
      lancamento: new FormControl<Date>(new Date, [Validators.required]),
      diretor: new FormControl('', [Validators.required, Validators.minLength(6)]),
      estudio: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    console.log(this.loginForm.value.titulo);
    console.log(this.loginForm.value.genero);
    console.log(this.loginForm.value.lancamento);
    console.log(this.loginForm.value.diretor);
    console.log(this.loginForm.value.estudio);
  }
}
