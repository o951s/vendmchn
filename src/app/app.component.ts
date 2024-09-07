import { Component, OnInit } from '@angular/core';
import { VendingMachineService } from './vendingmachine.service';
import { VendingMachine } from './vendingmachine';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { TableModule, TablePageEvent } from 'primeng/table';  // PrimeNG Table modülünü import edin
import { ButtonModule } from 'primeng/button';
import { ReportComponent } from './report/report.component';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule,TableModule, FormsModule, ButtonModule, NgFor, ReportComponent, RouterModule]
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  first = 0;

  rows = 10;
  
  vendingMachines: VendingMachine[] = [];

  searchValue: string = '';
  get totalRevenue(): number {
    return this.vendingMachines.reduce((total, machine) => total + (machine.salesPrice || 0), 0);
  }


  constructor(private vendingMachineService: VendingMachineService) {}

  ngOnInit() {
    this.vendingMachineService.getVendingMachines().subscribe(
      (data: VendingMachine[]) => {
        this.vendingMachines = data;
      },
      (error) => {
        console.error('Veriler yüklenirken hata oluştu:', error);
      }
      
    );
  }
    next() {
      this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  pageChange(event: { first: number; rows: number; }) {
      this.first = event.first;
      this.rows = event.rows;
  }

  isLastPage(): boolean {
      return this.vendingMachines ? this.first === this.vendingMachines.length - this.rows : true;
  }

  isFirstPage(): boolean {
      return this.vendingMachines ? this.first === 0 : true;
  }
    
  }


