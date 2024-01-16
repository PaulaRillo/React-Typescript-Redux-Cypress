export class Reservation {
  id: string;
  price: number;
  dateStart: string;
  dateEnd: string;
  numAdults: number;
  numChildren: number;
  numPets: number;
  dailyPrice: number;
  propertyId: string;

  constructor(id: string, price: number, dateStart: string, dateEnd: string, numAdults: number, numChildren: number, numPets: number, dailyPrice: number, propertyId: string) {
    this.id = id;
    this.price = price;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.numAdults = numAdults;
    this.numChildren = numChildren;
    this.numPets = numPets;
    this.dailyPrice = dailyPrice;
    this.propertyId = propertyId;
  }
}