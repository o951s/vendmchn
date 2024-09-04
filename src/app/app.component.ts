import { Component, OnInit } from '@angular/core';
import { VendingMachineService } from './vendingmachine.service';
import { VendingMachine } from './vendingmachine';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { TableModule } from 'primeng/table';  // PrimeNG Table modülünü import edin
import { ButtonModule } from 'primeng/button';
import { ReportComponent } from './report/report.component';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, ButtonModule, NgFor, ReportComponent]
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  
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
        console.log(this.vendingMachines); // Konsolda verilerin geldiğini kontrol edin
      },
      (error) => {
        console.error('Veriler yüklenirken hata oluştu:', error);
      }
    );
  }

}
