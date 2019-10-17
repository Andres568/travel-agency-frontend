import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoreService } from 'src/app/_services/store.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Reservation } from 'src/app/common/models/reservation';
import { take } from 'rxjs/operators';
import { Guest } from 'src/app/common/models/guest';
import { CreateGuestComponent } from '../../guests/create-guest/create-guest.component';
import { EditGuestComponent } from '../../guests/edit-guest/edit-guest.component';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: '../create-reservation/create-reservation.component.html',
  styleUrls: ['../create-reservation/create-reservation.component.scss']
})
export class EditReservationComponent implements OnInit {
  title = 'Edit reservation';
  form: FormGroup;
  reservationId: number;
  guests: MatTableDataSource<Guest>;
  newGuests: Guest[] = [];
  storedGuests: Guest[] = [];
  removedGuests: Guest[] = [];
  updatedGuests: Guest[] = [];
  displayedColumns: string[] = ['name', 'isAvailable', 'isEnable', 
  'edit', 'delete'];

  constructor(private storeService: StoreService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<EditReservationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.reservationId = this.data;

    this.form = this.formBuilder.group({
      departureDate: ['', [Validators.required]],
      arrivalDate: ['', [Validators.required]],
    });

    this.storeService.getReservation(+this.reservationId)
    .pipe(
      take(1)
    )
    .subscribe(reservation => {
      // if (reservation != null) {

        this.form = this.formBuilder.group({
          id: [reservation.id],
          roomId: [reservation.roomId], 
          userId: [reservation.username], 
          emergencyContactId: [reservation.emergencyContactId],
          departureDate: [reservation.departureDate, [Validators.required]],
          arrivalDate: [reservation.arrivalDate, [Validators.required]],
        });

      this.storedGuests = reservation.guests;
      this.guests = new MatTableDataSource(this.storedGuests.concat(this.newGuests));
      console.log(this.guests.data);
      this.guests.sort = this.sort;
      // }
    });
  }

  onSaveReservation(reservation: Reservation) {
    this.storeService.updateReservation(reservation);
    this.onDialogBack();
  }

  updateGuestList() {
    this.guests = new MatTableDataSource(this.storedGuests.concat(this.newGuests));
  }

  deleteGuest(guest: Guest) {
    if (confirm('Are you sure?')) {
      console.log(guest);
      console.log(guest.id);
      if (guest.id == null) {
        this.newGuests = this.newGuests.filter(newGuest => newGuest !== guest);
        console.log(this.newGuests);
      } else {
        this.removedGuests.push(guest);
        console.log([...this.storedGuests]);
        this.storedGuests = this.storedGuests.filter(storedGuest => storedGuest.id !== guest.id);
        console.log([...this.storedGuests]);
      }
      this.updateGuestList();
    }
  }

  createGuestDialog(): void {
    const dialogRef = this.dialog.open(CreateGuestComponent, {
      // width: '1000px'
    });

    dialogRef.afterClosed().subscribe(guest => {
      if (guest) {
        this.newGuests.push(guest);
        this.updateGuestList();
      }
    });
  }

  editGuestDialog(guest: Guest): void {
    const dialogRef = this.dialog.open(EditGuestComponent, {
      data: guest
    });

    dialogRef.afterClosed().subscribe(editedGuest => {
      if (editedGuest) {
        const guestIndex = this.newGuests.findIndex(r => r === guest);
        this.newGuests[guestIndex] = editedGuest;
        this.updateGuestList();
  
        if (editedGuest.id) {
          this.updatedGuests.push(guest);
        }
      }
    });
  }

  onDialogBack(): void {
    this.removedGuests.forEach(removedGuest => {
      this.storeService.removeGuest(removedGuest.id);
    });
    this.newGuests.forEach(newGuest => {
      newGuest.reservationId = this.reservationId,
      this.storeService.addGuest(newGuest);
    });
    this.updatedGuests.forEach(updatedGuest => {
      updatedGuest.reservationId = this.reservationId,
      this.storeService.updateGuest(updatedGuest);
    });
    this.dialogRef.close();
  }

}
