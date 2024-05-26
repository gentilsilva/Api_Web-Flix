import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { RequestsComponent } from '../requests/requests.component';

interface LoginForm {
  titulo: FormControl;
  genero: FormControl;
  lancamento: FormControl<Date | null>;
  diretor: FormControl;
  estudio: FormControl;
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

  constructor() {
    this.loginForm = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(6)]),
      genero: new FormControl('', [Validators.required, Validators.minLength(6)]),
      lancamento: new FormControl<Date>(new Date, [Validators.required]),
      diretor: new FormControl('', [Validators.required, Validators.minLength(6)]),
      estudio: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    
  }
}
