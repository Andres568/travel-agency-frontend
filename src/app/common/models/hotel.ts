import { Room } from './room';

export class Hotel {
    id?: number;
    isEnable: string;
    name: string;
    city: string;
    imageUrl: string;
    rooms?: Room[];

    constructor(){
       this.id = undefined;
    }
}