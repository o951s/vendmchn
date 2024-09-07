import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormGroup, FormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { VendingMachine } from '../vendingmachine';
import { NgFor } from '@angular/common';
import { VendingMachineService } from '../vendingmachine.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-report',
  standalone: true,
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  imports: [BreadcrumbModule,CalendarModule, FormsModule, FontAwesomeModule, NgFor] // Gerekli modülleri buraya ekledik
})
export class ReportComponent implements OnInit {
  faCalculator = faCalculator; // Hesap makinesi ikonu
  selectedDate!: Date; // Tarih seçimi için model
  rangeDates: Date[] | undefined;
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;
  
  vendingMachines: VendingMachine[] = [];
  date!: Date;
  formGroup: FormGroup | undefined;

  get totalRevenue(): number {
    return this.vendingMachines.reduce((total, machine) => total + (machine.salesPrice || 0), 0);
  }
// Kredi kartı ile yapılan satışlar
get totalCreditCardRevenue(): number {
  return this.vendingMachines
    .filter(machine => machine.paymentMethod === 'Kredi Kartı')
    .reduce((total, machine) => total + (machine.salesPrice || 0), 0);
}

// Nakit ile yapılan satışlar
get totalCashRevenue(): number {
  return this.vendingMachines
    .filter(machine => machine.paymentMethod === 'Nakit')
    .reduce((total, machine) => total + (machine.salesPrice || 0), 0);
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
    this.items = [
      { label: 'Dashboard' }, 
      { label: 'Otomatlar' }, 
      { label: 'Kartlar' }, 
      { label: 'Satışlar' }, 
      { label: 'Ürünler' },
      { label: 'Kullanıcılar' }
  ];

  this.home = { icon: 'pi pi-home', routerLink: '/' };
 
  }

}
