import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { VendingMachine } from '../vendingmachine';
import { NgFor } from '@angular/common';
import { VendingMachineService } from '../vendingmachine.service';
import { machine } from 'os';


@Component({
  selector: 'app-report',
  standalone: true,
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  imports: [CalendarModule, FormsModule, FontAwesomeModule, NgFor] // Gerekli modülleri buraya ekledik
})
export class ReportComponent implements OnInit {
  faCalculator = faCalculator; // Hesap makinesi ikonu
  selectedDate!: Date; // Tarih seçimi için model
  
  vendingMachines: VendingMachine[] = [];
  date!: Date;
  get totalRevenue(): number {
    return this.vendingMachines.reduce((total, machine) => total + (machine.salesPrice || 0), 0);
  }

  get totalProduct(): number{
    return this.vendingMachines.reduce((total, machine) => total + (machine.count|| 0), 0);
  } 

  constructor(private vendingMachineService: VendingMachineService) {}

  ngOnInit() {
    this.vendingMachineService.getVendingMachines().subscribe(
      (data: VendingMachine[]) => {
        this.vendingMachines = data;
        console.log(this.vendingMachines); // Konsolda verilerin geldiğini kontrol edin
      },
      (error: any) => {
        console.error('Veriler yüklenirken hata oluştu:', error);
      }
    );
  }

}
