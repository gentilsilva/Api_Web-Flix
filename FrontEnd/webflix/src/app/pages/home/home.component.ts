import { Router } from '@angular/router';
import { TvShowService } from './../../services/tv-show/tv-show.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movies/movie.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { SearchCommunicationService } from '../../services/search-communication/search-communication.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainLayoutComponent, ReactiveFormsModule, CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy  {
  filmeAtual: number = 0;
  intervalo: any;
  movies: any[] = [];
  series: any[] = [];
  movieSeries: any[] = [];
  searchForm!: FormGroup;
  result: Observable<any> | undefined

  constructor(private router: Router, private movieService: MovieService, private tvShowService: TvShowService, private searchCommService: SearchCommunicationService) {
    this.searchForm = new FormGroup({
      queryField: new FormControl()
    });
  }

  proximo() {
    this.filmeAtual = (this.filmeAtual + 1) % this.movies.length;
  }

  anterior() {
    this.filmeAtual = (this.filmeAtual - 1 + this.movies.length) % this.movies.length;
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe((data: { results: any[]; }) => {
      this.movies = data.results;
      this.movies = this.chunkArray(this.movies, 7);
    });

    this.tvShowService.getTvShows().subscribe((data: { results: any[]; }) => {
      this.series = data.results;
      this.series = this.chunkArray(this.series, 7);
    })

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

    this.intervalo = setInterval(() => {
      this.proximo();
    }, 5000)
  }

  ngOnDestroy(): void {
    if(this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  formatDate(date: string) {
    let newDate = new Date(date)

    let formatedDate = newDate.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    })

    return formatedDate
  }

  getPoster(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500/${posterPath}`
  }

  chunkArray(array: any[], chunkSize: number): any[][] {
    const result = [];
    for(let i = 0; i < chunkSize; i++) {
        result.push(array[i]);
    }
    return result
  }
}
