export class Room {
    Id?: number;
    HotelId: number;
    Name: string;
    IsAvailable: boolean;
    IsEnable: boolean;
    BaseCost: string;
    Tax: string;
    Type: string;
    PeopleCapacity: number;
    ImageUrl: string;

    constructor(){
       this.Id = undefined;
    }
}