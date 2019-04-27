import { Currency } from './currency.model';
class Donation {
  id: number;
  firstName: string;
  lastName: string;
  gender: boolean;
  birthDate: number;
  phoneNumber: string;
  address: string;
  city: string;
  email: string;
  facebookLink: string;
  amount: number;
  fee: number;
  currency: Currency;
  note: string;
}

class DonationModel {
  constructor(
    public id: number,
    public projectId: number,
    public amount: number,
    public note: number,
    public currencyId: number
  ) { }
}

export { Donation, DonationModel }