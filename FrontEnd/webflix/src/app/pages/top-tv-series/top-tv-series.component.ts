import { Component } from '@angular/core';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { TvShowService } from '../../services/tv-show/tv-show.service';

@Component({
  selector: 'app-top-tv-series',
  standalone: true,
  imports: [MainLayoutComponent, CardComponent, CommonModule],
  templateUrl: './top-tv-series.component.html',
  styleUrl: './top-tv-series.component.scss'
})
export class TopTvSeriesComponent {
  tvShows: any[] = [];
  tvShowsGroup: any[][] = [];

  constructor(private tvShowService: TvShowService) { }


  ngOnInit(): void {
    this.tvShowService.getTopRatedTvShow().subscribe(data => {
      this.tvShows = data.results;
      this.tvShowsGroup = this.chunkArray(this.tvShows, 4);
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
