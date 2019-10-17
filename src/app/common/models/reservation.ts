import { Guest } from './guest';

export class Reservation {
    id?: number;
    roomId: number;
    username: string;
    emergencyContactId: number;
    departureDate: Date;
    arrivalDate: Date;
    guests?: Guest[];

    constructor(){
       this.id = undefined;
    }
}