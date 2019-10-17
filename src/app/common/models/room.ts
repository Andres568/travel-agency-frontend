export class Room {
    id?: number;
    hotelId: number;
    name: string;
    isAvailable: string;
    isEnable: string;
    baseCost: string;
    tax: string;
    type: string;
    peopleCapacity: number;
    imageUrl: string;
    address: string;

    constructor(){
       this.id = undefined;
    }
}