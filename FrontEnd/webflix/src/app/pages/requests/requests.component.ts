import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type DataItem = {[key: string]: any}

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [ReactiveFormsModule, MainLayoutComponent, CommonModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss',
})
export class RequestsComponent {
  filmes: DataItem[] = [
    {id: '1', titulo: "titulo_um", genero: "genero_um", lancamento: "12/05/2023", diretor: "diretor_um", estudio: "estudio_um"},
    {id: '2', titulo: "titulo_dois", genero: "genero_dois", lancamento: "12/05/2023", diretor: "diretor_dois", estudio: "estudio_dois"},
    {id: '3', titulo: "titulo_tres", genero: "genero_tres", lancamento: "12/05/2023", diretor: "diretor_tres", estudio: "estudio_tres"},
    {id: '4', titulo: "titulo_quatro", genero: "genero_quatro", lancamento: "12/05/2023", diretor: "diretor_quatro", estudio: "estudio_quatro"},
  ]

  constructor(private router: Router) {}

  getKeys(object: any): string[] {
    return Object.keys(object)
  }

  navigate(page: string) {
    this.router.navigate([page]);
  }

}
