import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DishService {
  private baseUrl = 'http://localhost:3000/api/dishes/all';

  constructor(private http: HttpClient) {}

  getAllDishes(city?: string): Observable<any[]> {
    let url = this.baseUrl;
    if (city) {
      url += `?city=${encodeURIComponent(city)}`;
    }
    return this.http.get<any[]>(url);
  }
}