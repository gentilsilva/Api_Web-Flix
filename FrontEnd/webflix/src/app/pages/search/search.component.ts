import { Component } from '@angular/core';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { SearchService } from '../../services/search/search.service';
import { SearchCommunicationService } from '../../services/search-communication/search-communication.service';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MainLayoutComponent, CardComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchResult: any[] = [];
  searchResultGroup: any[][] = [];

  constructor(private searchService: SearchService, private searchCommService: SearchCommunicationService) { }

  ngOnInit(): void {
    this.searchCommService.searchQuery$.subscribe(query => {
      if (query && query.length > 2) {
        this.searchService.searchShow(query).subscribe(data => {
          this.searchResult = data.results;
          this.searchResultGroup = this.chunkArray(this.searchResult, 4);
        });
      } else {
        this.searchResult = [];
        this.searchResultGroup = [];
      }
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
    return `https://image.tmdb.org/t/p/w500/${posterPath}`;
  }

  chunkArray(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
}
