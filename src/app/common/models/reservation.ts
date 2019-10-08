export class Reservation {
    Id?: number;
    RoomId: number;
    TravelerId: number;
    DepartureDate: string;
    ArrivalDate: string;

    constructor(){
       this.Id = undefined;
    }
}