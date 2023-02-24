import { Injectable } from '@angular/core';
import {DataGeneratorService, DataType, MockDataProperty} from "./data-generator.service";
import {CustomerModel} from "../models/customer.model";
import {StringOptions, StringParameters} from "../models/mock-data.model";

@Injectable({
  providedIn: 'root'
})
export class LocalCustomerService {

  constructor(private readonly _dataGenerator: DataGeneratorService) {}

  public generateCustomers(count: number): CustomerModel[] {
    let guidParam = new StringParameters();
    guidParam.options = StringOptions.Guid;

    let nameParam = new StringParameters();
    nameParam.options = StringOptions.Name;

    let props: MockDataProperty[] = [
      {
        propName: 'id',
        dataType: DataType.String,
        parameter: guidParam,
      },
      {
        propName: 'first_name',
        dataType: DataType.String,
        parameter: nameParam,
      },
      {
        propName: 'last_name',
        dataType: DataType.String,
        parameter: nameParam,
      },
      {
        propName: 'status',
        dataType: DataType.String,
        parameter: nameParam
      },
      {
        propName: 'email',
        dataType: DataType.String,
        parameter: nameParam
      },
      {
        propName: 'phone',
        dataType: DataType.Number,
        parameter: nameParam
      }
    ];

    return this._generateData(count, props);
  }

  public createCustomer(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  public getCustomer(key: string) {
    return localStorage.getItem(key)
  }
  public removeCustomer(key: string) {
    localStorage.removeItem(key);
  }
  public clearData() {
    localStorage.clear();
  }

  private _generateData(count: number, props: MockDataProperty[]): Array<any> {
    let arr: Array<any> = [];

    for (let i = 0; i < count; i++) {
      arr.push(this._dataGenerator.create(props));
    }

    return arr;
  }

}
