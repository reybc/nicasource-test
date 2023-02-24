export class CustomerModel {
  id: string;
  first_name: string;
  last_name: string;
  status: 'active' | 'pending' | 'inactive';
  email: string;
  phone: string;

    constructor() {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.status = 'active';
    this.email = '';
    this.phone = '';
  }
}
