import { Component } from '@angular/core';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movies/movie.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MainLayoutComponent, CardComponent, CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  movies: any[] = [];
  movieGroups: any[][] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data.results;
      this.movieGroups = this.chunkArray(this.movies, 4);
    });
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
