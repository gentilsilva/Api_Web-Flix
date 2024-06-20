import { Component, Input, OnInit } from '@angular/core';
import { DetailsCommunicationService } from '../../services/details/details-communication.service';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movies/movie.service';
import { TvShowService } from '../../services/tv-show/tv-show.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() title: string = "";
  @Input() lancamento: string = "";
  @Input() vote_average: string = "";
  @Input() poster_path: string = "";
  @Input() show_id: number = 0;
  @Input() show_type: number = 0;

  constructor(private router: Router, private detailsCommService: DetailsCommunicationService) {

  }

  details(show_id: number, show_type: number) {
    if(show_type === 1) {
      this.detailsCommService.setShowId(show_id);
      return this.router.navigate(['movie-detail'])
    } else if (show_type === 2) {
      this.detailsCommService.setShowId(show_id)
      return this.router.navigate(['serie-detail'])
    }
    return 0;
  }

}
