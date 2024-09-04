import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VendingMachine } from './vendingmachine';

@Injectable({
  providedIn: 'root'
})
export class VendingMachineService {

  private apiServerUrl = 'http://localhost:8080';
  apiUrl: any;

  constructor(private http: HttpClient) { }

  public getVendingMachines(): Observable<VendingMachine[]> {
    return this.http.get<VendingMachine[]>(`${this.apiServerUrl}/vending/all`)
  }

}


