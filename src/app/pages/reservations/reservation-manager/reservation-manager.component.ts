import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { Reservation } from 'src/app/common/models/reservation';
import { User } from 'src/app/common/models/user';
import { StoreService } from 'src/app/_services/store.service';
import { CreateReservationComponent } from '../create-reservation/create-reservation.component';
import { EditReservationComponent } from '../edit-reservation/edit-reservation.component';

@Component({
  selector: 'app-reservation-manager',
  templateUrl: './reservation-manager.component.html',
  styleUrls: ['./reservation-manager.component.scss']
})
export class ReservationManagerComponent implements OnInit {
  title = 'RESERVATION LIST';
  reservations: MatTableDataSource<Reservation>;
  displayedColumns: string[] = ['id', 'username', 'departureDate', 'arrivalDate', 'delete'];


  constructor(private storeService: StoreService,
              public dialog: MatDialog) { }

    @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
   this.storeService.getAllReservations().subscribe(reservations => {
     console.log(reservations)
      this.reservations = new MatTableDataSource(reservations);
      this.reservations.sort = this.sort;
   });
  }

  applyFilter(filterValue: string) {
    this.reservations.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
     this.storeService.removeReservation(id);
    }
  }

  createReservationDialog(): void {
    const dialogRef = this.dialog.open(CreateReservationComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  editReservationDialog(id: number): void {
    const dialogRef = this.dialog.open(EditReservationComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }


}
