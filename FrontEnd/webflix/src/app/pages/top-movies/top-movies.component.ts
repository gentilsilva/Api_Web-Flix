import { MovieService } from './../../services/movies/movie.service';
import { Component, OnInit } from '@angular/core';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-movies',
  standalone: true,
  imports: [MainLayoutComponent, CardComponent, CommonModule],
  templateUrl: './top-movies.component.html',
  styleUrl: './top-movies.component.scss'
})
export class TopMoviesComponent implements OnInit {

  movies: any[] = [];
  movieGroups: any[][] = [];

  constructor(private movieService: MovieService) { }


  ngOnInit(): void {
    this.movieService.getTopRatedMovies().subscribe(data => {
      this.movies = data.results;
      this.movieGroups = this.chunkArray(this.movies, 4);
    });
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
    for(let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result
  }

}
