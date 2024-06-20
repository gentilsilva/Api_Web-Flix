import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movies/movie.service';
import { DetailsCommunicationService } from '../../services/details/details-communication.service';
import { MainLayoutComponent } from "../../layouts/main-layout/main-layout.component";

@Component({
    selector: 'app-movie-detail',
    standalone: true,
    templateUrl: './movie-detail.component.html',
    styleUrl: './movie-detail.component.scss',
    imports: [MainLayoutComponent]
})
export class MovieDetailComponent implements OnInit {
  movie: any = []

  constructor(private movieService: MovieService, private detailsCommService: DetailsCommunicationService) { }

  ngOnInit(): void {
    this.detailsCommService.searchShowId$.subscribe(id => {
      this.movieService.getMovieById(id).subscribe((data: { result: any; }) => {
        this.movie = data
      })
    })
  }

  getPoster(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500/${posterPath}`;
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
}
