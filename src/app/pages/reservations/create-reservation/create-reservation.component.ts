import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Reservation } from 'src/app/common/models/reservation';
import { StoreService } from 'src/app/_services/store.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MatTableDataSource, MatDialog, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import { Guest } from 'src/app/common/models/guest';
import { CreateGuestComponent } from '../../guests/create-guest/create-guest.component';
import { EditGuestComponent } from '../../guests/edit-guest/edit-guest.component';
import { AuthService } from 'src/app/core/auth/auth.service';
import { EmergencyContact } from 'src/app/common/models/emergencyContact';


@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss']
})
export class CreateReservationComponent implements OnInit {
  title = 'Create reservation';
  form: FormGroup;
  guests: MatTableDataSource<Guest>;
  newGuests: Guest[] = [];
  removedGuests: Guest[] = [];
  roomId: number;
  
  displayedColumns: string[] = ['firstName', 'lastName', 'birthDate', 'gender',
   'edit', 'delete'];


  constructor(private storeService: StoreService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<CreateReservationComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private authService: AuthService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;



  ngOnInit() {
    this.roomId = this.data;

    this.guests = new MatTableDataSource(this.newGuests);
    this.guests.sort = this.sort;
    
    
    this.form = this.formBuilder.group({
      departureDate: ['', [Validators.required]],
      arrivalDate: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      contactPhoneNumber: ['', [Validators.required]],

    });
  }

  onSaveReservation(form) {
    const reservation: Reservation = new Reservation();
    reservation.arrivalDate = form.arrivalDate;
    reservation.departureDate = form.departureDate;
    reservation.roomId = this.roomId;
    reservation.guests = this.newGuests;
    reservation.username = this.authService.user.username;
    this.storeService.addReservation(reservation);

    const emergencyContact: EmergencyContact = new EmergencyContact();
    emergencyContact.fullName = form.fullName;
    emergencyContact.contactPhoneNumber = form.contactPhoneNumber;
    emergencyContact.username = this.authService.user.username;
    this.storeService.addEmergencyContact(emergencyContact);

    this.onDialogBack();
  }

  applyFilter(filterValue: string) {
    this.guests.filter = filterValue.trim().toLowerCase();
  }

  updateGuestList() {
    this.guests = new MatTableDataSource(this.newGuests);
  }

  deleteGuest(guest) {
    if (confirm('Are you sure?')) {
      this.newGuests = this.newGuests.filter(newGuest => newGuest !== guest);
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
      }
    });
  }

  onDialogBack(): void {
    this.dialogRef.close();
  }

}
