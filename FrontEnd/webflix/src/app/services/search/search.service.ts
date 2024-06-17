import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  api_url: string = "http://127.0.0.1:5000/api/show/search"

  constructor(private http: HttpClient) { }

  searchShow(value: string): Observable<any> {
    const params = new HttpParams().set("value", value);
    return this.http.get<any>(this.api_url, { params })
  }
}
