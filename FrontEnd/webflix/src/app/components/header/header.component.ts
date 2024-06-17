import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { SearchComponent } from '../../pages/search/search.component';
import { SearchCommunicationService } from '../../services/search-communication/search-communication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  searchForm!: FormGroup;
  result: Observable<any> | undefined

  constructor(private router: Router, private searchCommService: SearchCommunicationService) {
    this.searchForm = new FormGroup({
      queryField: new FormControl()
    });
  }

  ngOnInit(): void {
    this.searchForm.get('queryField')!.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(async (value) => {
        this.searchCommService.setSearchQuery(value);
        return this.router.navigate(['search']);
      })
    ).subscribe();
  }

  navigate(page: string) {
    this.router.navigate([page]);
  }
}
