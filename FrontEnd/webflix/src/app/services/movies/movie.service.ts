import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, endWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = "http://127.0.0.1:5000";
  private endPoint: string = "";
  private urlCompleta: string = ""

  constructor(private http: HttpClient) { }

  getTopRatedMovies(): Observable<any> {
    this.endPoint = "/api/filmes/top";
    this.urlCompleta = this.apiUrl + this.endPoint;
    return this.http.get<any>(this.urlCompleta)
  }

}
