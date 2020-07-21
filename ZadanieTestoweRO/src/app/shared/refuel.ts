import {FuelTypes} from './FuelTypes.enum';

export interface Refuel {
     id:number;
     meterStatus: number;
     date: string;
     fuelType: FuelTypes;
     fuelAmount: number;
     unitPrice: number;
     driverName: string;
}
