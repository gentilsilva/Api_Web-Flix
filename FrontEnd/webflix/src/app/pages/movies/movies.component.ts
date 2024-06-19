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
  currentPage: number = 1;
  isLoading: boolean = false;


  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadMovies()
  }

  loadMovies(initialLoad: boolean = false): void {
    if (this.isLoading) return;
    this.isLoading = true;
    this.movieService.getMovies(this.currentPage).subscribe(data => {
      this.movies = [...this.movies, ...data.results];
      this.movieGroups = this.chunkArray(this.movies, 4);
      this.isLoading = false;

      // Check if scrolling is possible, and load more if not
      if (initialLoad && (document.body.scrollHeight <= window.innerHeight)) {
        this.loadMoreMovies();
      }
    }, () => {
      this.isLoading = false;
    });
  }

  loadMoreMovies(): void {
    this.currentPage++;
    this.loadMovies();
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
