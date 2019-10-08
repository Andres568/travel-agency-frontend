import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/_services/store.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  reservations: any[];

  constructor(private storeService: StoreService) { }


  ngOnInit() {
    this.storeService.getAllHotels().subscribe(x => console.log(x));
    this.storeService.getAllRooms().subscribe(x => console.log(x));
    this.storeService.getAllTravelers().subscribe(x => console.log(x));
    this.storeService.getAllReservations().subscribe(x => console.log(x));
   }

}
