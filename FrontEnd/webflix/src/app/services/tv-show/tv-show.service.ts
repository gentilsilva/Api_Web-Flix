import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {
  private apiUrl = "http://127.0.0.1:5000";
  private endPoint: string = "";
  private urlCompleta: string = ""

  constructor(private http: HttpClient) { }

  getTopRatedTvShow(): Observable<any> {
    this.endPoint = "/api/tv-shows/top";
    this.urlCompleta = this.apiUrl + this.endPoint;
    return this.http.get<any>(this.urlCompleta)
  }
}
