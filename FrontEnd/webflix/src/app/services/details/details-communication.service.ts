import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsCommunicationService {
  private searchShowId = new BehaviorSubject<number>(0)
  searchShowId$ = this.searchShowId.asObservable();

  setShowId(id: number): void {
    this.searchShowId.next(id);
  }
}
