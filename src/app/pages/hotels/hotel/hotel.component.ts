import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/common/models/room';
import { StoreService } from 'src/app/_services/store.service';
import { take } from 'rxjs/operators';
import { Hotel } from 'src/app/common/models/hotel';
import { MatDialog } from '@angular/material';
import { CreateReservationComponent } from '../../reservations/create-reservation/create-reservation.component';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  hotel: Hotel;

  constructor(private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    public dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      console.log(id);
      this.storeService.getHotel(id)
        .subscribe(hotel => {
          this.hotel = hotel;
          console.log(this.hotel);
        });
    });
  }

  createReservationDialog(id: number): void {
    const dialogRef = this.dialog.open(CreateReservationComponent, {
      data: id
    });
  }

}
