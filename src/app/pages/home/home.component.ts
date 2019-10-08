import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/common/store/app.state';
import { GetAllReservations, UpdateReservation, AddReservation, RemoveReservation, GetReservation } from 'src/app/common/store/reservations/reservations.actions';
import { getAllReservations, getReservation } from 'src/app/common/store/reservations/reservations.reducers';
import { Reservation } from 'src/app/common/models/reservation';
import { StoreService } from 'src/app/_services/store.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  reservations: any[];

  constructor(private storeService: StoreService) { }


  ngOnInit() { }

}
