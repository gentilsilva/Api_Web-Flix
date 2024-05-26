import { RequestService } from './../../services/request.service';
import { Component, OnInit } from '@angular/core';
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
export class RequestsComponent implements OnInit {
  filmes: DataItem[] = []

  constructor(private router: Router, private requestService: RequestService) {}

  ngOnInit(): void {
    this.filmes = this.requestService.getFilme()
  }

  getKeys(object: any): string[] {
    return this.filmes['length'] > 0 ? Object.keys(this.filmes[0]) : [];
  }

  navigate(page: string) {
    this.router.navigate([page]);
  }

}
