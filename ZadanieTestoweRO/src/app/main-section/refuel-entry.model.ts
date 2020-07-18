export class RefuelEntry{

    constructor(public meterStatus: number,
                public date: string,
                public fuelType: string,
                public fuelAmount: number,
                public unitPrice: number){}
}

