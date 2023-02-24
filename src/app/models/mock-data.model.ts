export enum StringCaseSensetiveOptions {
  AllLowercase = 'allLowercase',
  AllUppercase = 'allUppercase',
  Default = 'default',
}

export enum StringOptions{
  AllowDigits = 'allowDigits',
  Name = 'name',
  Guid = 'guid',
  Default = 'default',
}

export class StringParameters{
  public minLength: number;
  public maxLength: number;
  public options: StringOptions;
  public caseSensitiveOptions: StringCaseSensetiveOptions;

  constructor() {
    this.minLength = 4;
    this.maxLength = 8;
    this.options = StringOptions.Default;
    this.caseSensitiveOptions = StringCaseSensetiveOptions.Default;
  }
}
