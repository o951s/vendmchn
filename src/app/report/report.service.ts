import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
    
    
    private apiServerUrl = 'http://localhost:8080';
    apiUrl: any;


  constructor(private http: HttpClient) {}

  getSalesData(date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?date=${date}`);
  }
}
