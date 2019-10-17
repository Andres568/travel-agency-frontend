export class Guest {
    id?: number;
    reservationId: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    documentType: string;
    documentNumber: string;
    email: string;
    contactPhoneNumber: string;
  
    constructor(){
       this.id = undefined;
    }
}