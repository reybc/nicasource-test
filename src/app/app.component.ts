import {Component, OnInit} from '@angular/core';
import {CustomerModel} from "./models/customer.model";
import {LocalCustomerService} from "./services/local-customer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nicasource-test';

  public customersCount = 20;

  public customers: CustomerModel[] = [];

  constructor(private readonly _localData: LocalCustomerService) {
  }

  ngOnInit(): void {
    if (!localStorage.getItem('customers')) {
      this.generateCustomers();
      localStorage.setItem('customers', JSON.stringify(this.customers));
    }
  }

  public generateCustomers(): void {
    this.customers = this._localData.generateCustomers(this.customersCount);
  }
}
