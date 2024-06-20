import { Component } from '@angular/core';
import { MainLayoutComponent } from "../../layouts/main-layout/main-layout.component";
import { TvShowService } from '../../services/tv-show/tv-show.service';
import { DetailsCommunicationService } from '../../services/details/details-communication.service';

@Component({
    selector: 'app-serie-detail',
    standalone: true,
    templateUrl: './serie-detail.component.html',
    styleUrl: './serie-detail.component.scss',
    imports: [MainLayoutComponent]
})
export class SerieDetailComponent {
  serie: any = []

  constructor(private tvShowService: TvShowService, private detailsCommService: DetailsCommunicationService) { }

  ngOnInit(): void {
    this.detailsCommService.searchShowId$.subscribe(id => {
      this.tvShowService.getSerieById(id).subscribe((data: { result: any; }) => {
        this.serie = data
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
