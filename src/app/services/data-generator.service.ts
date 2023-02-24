import {Injectable} from '@angular/core';
import {StringCaseSensetiveOptions, StringOptions, StringParameters} from "../models/mock-data.model";

export enum DataType {
  Null = 'null',
  Undefined = 'undefined',
  Number = 'number',
  String = 'string',
}

export class MockDataProperty {
  public propName!: string;
  public dataType!: DataType;
  public parameter!: StringParameters;
}

@Injectable({
  providedIn: 'root'
})
export class DataGeneratorService {

  public create(params: MockDataProperty[]): any {
    let obj: any = {};

    params.forEach((pr) => {
      let type = pr.dataType;
      let key = pr.propName;
      let value = null;

      if (type === DataType.Null) {
        value = null;
      } else if (type === DataType.Undefined) {
        value = undefined;
      } else if (type === DataType.String) {
        let stringParam = pr.parameter as StringParameters;

        let length = this.generateRandomNumberBeetween(
          stringParam.minLength,
          stringParam.maxLength,
          false
        );

        if(stringParam.options === StringOptions.Guid){
          value = this.generateRandomGuid();
        }
        else if(stringParam.options === StringOptions.Name){
          value = this.generateRandomName(length, stringParam.caseSensitiveOptions);
        }
        else {
          let allowDigits = stringParam.options === StringOptions.AllowDigits;
          value = this.generateRandomString(length, stringParam.caseSensitiveOptions, allowDigits);
        }


      } else {
        console.error('No implementation for type:' + type);
      }

      obj[key] = value;
    });

    return obj;
  }

  public generateRandomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  public generateRandomNumberBeetween(from: number, to: number, float: boolean, floatPrecisions: number = 0
  ): number {
    let min = from;
    let num = Math.random() * (to - min) + min;

    if (!float) {
      num = Math.floor(num);
    }
    if (floatPrecisions > 0) {
      num = parseFloat(num.toFixed(floatPrecisions));
    }

    return num;
  }

  //#region string start

  private vowelsCharts = 'aeiouy';
  private consonantsCharts = 'bcdfghjklmnpqrstvwxz';

  public generateRandomName(
    length: number,
    caseSensetiveOptions: StringCaseSensetiveOptions
  ): string {
    let str = '';

    let firstCharIsVowel = this.generateRandomBoolean();

    let firstPart = '';
    let secondPart = '';

    if (firstCharIsVowel) {
      firstPart = this.vowelsCharts;
      secondPart = this.consonantsCharts;
    } else {
      firstPart = this.consonantsCharts;
      secondPart = this.vowelsCharts;
    }

    for (let i = 1; i < length + 1; i++) {
      let char = '';

      if (i % 2 == 0) {
        char = secondPart.charAt(Math.floor(Math.random() * secondPart.length));
      } else {
        char = firstPart.charAt(Math.floor(Math.random() * firstPart.length));
      }

      if (caseSensetiveOptions === StringCaseSensetiveOptions.AllUppercase) {
        char = char.toUpperCase();
      }

      str += char;
    }

    if (caseSensetiveOptions === StringCaseSensetiveOptions.Default && str.length > 0) {
      str = str[0].toUpperCase() + str.substring(1, str.length - 1);
    }

    return str;
  }

  private numbeCharts = '0123456789';
  private uppercaseChart = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private lowercaseChart = 'abcdefghijklmnopqrstuvwxyz';

  public generateRandomString(
    length: number,
    caseSensetiveOptions: StringCaseSensetiveOptions,
    useNumbers: boolean
  ): string {
    let str = '';

    let charts = '';
    if (caseSensetiveOptions === StringCaseSensetiveOptions.Default) {
      charts = this.uppercaseChart + this.lowercaseChart;
    }
    else if (caseSensetiveOptions === StringCaseSensetiveOptions.AllLowercase) {
      charts = this.lowercaseChart;
    }
    else if (caseSensetiveOptions === StringCaseSensetiveOptions.AllUppercase) {
      charts = this.uppercaseChart;
    }

    if (useNumbers) {
      charts += this.numbeCharts;
    }

    for (let i = 0; i < length; i++) {
      str += charts.charAt(Math.floor(Math.random() * charts.length));
    }

    return str;
  }

  //#endregion end string

  public generateRandomGuid(): string {
    //pattern 8-4-4-12
    // efa45702-8acb-4e10-bdd2-75f9d8b0ca7c
    // ee05809a-ddcd-4493-aa81-21ce3fa9c753

    let str = '';
    let charts = this.lowercaseChart + this.numbeCharts;

    for (let i = 0; i < 32; i++) {
      str += charts.charAt(Math.floor(Math.random() * charts.length));
    }

    console.log(str.length);
    str = `${str.slice(0, 8)}-${str.slice(8, 12)}-${str.slice(
      12,
      16
    )}-${str.slice(16, 20)}-${str.slice(20, 32)}`;
    console.log(str.length);

    return str;
  }


  constructor() { }
}
