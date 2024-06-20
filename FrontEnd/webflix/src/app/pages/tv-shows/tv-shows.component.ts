import { Component } from '@angular/core';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { TvShowService } from '../../services/tv-show/tv-show.service';

@Component({
  selector: 'app-tv-shows',
  standalone: true,
  imports: [MainLayoutComponent, CardComponent, CommonModule],
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.scss'
})
export class TvShowsComponent {
  tvShows: any[] = [];
  tvShowsGroup: any[][] = [];
  currentPage: number = 1;
  isLoading: boolean = false;

  constructor(private tvShowService: TvShowService) { }

  ngOnInit(): void {
    this.loadSeries()
  }

  loadSeries(initialLoad: boolean = false): void {
    if (this.isLoading) return;
    this.isLoading = true;
    this.tvShowService.getTvShows(this.currentPage).subscribe(data => {
      this.tvShows = [...this.tvShows, ...data.results];
      this.tvShowsGroup = this.chunkArray(this.tvShows, 5);
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  loadMoreSeries(): void {
    this.currentPage++;
    this.loadSeries();
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
