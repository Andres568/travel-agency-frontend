import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoreService } from 'src/app/_services/store.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateGuestComponent } from '../create-guest/create-guest.component';
import { Guest } from 'src/app/common/models/guest';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-guest',
  templateUrl: '../create-guest/create-guest.component.html',
  styleUrls: ['../create-guest/create-guest.component.scss']
})
export class EditGuestComponent implements OnInit {
  title = 'Edit guest';
  form: FormGroup;
  guestId: number;

 constructor(private storeService: StoreService,
             private formBuilder: FormBuilder,
             public dialogRef: MatDialogRef<CreateGuestComponent>,
             @Inject(MAT_DIALOG_DATA) public guest: Guest,
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.guest.id],
      reservationId: [this.guest.reservationId],
      firstName: [this.guest.firstName, [Validators.required]],
      lastName: [this.guest.lastName, [Validators.required]],
      birthDate: [this.guest.birthDate, [Validators.required]],
      gender: [this.guest.gender, [Validators.required]],
      documentType: [this.guest.documentType, [Validators.required]],
      documentNumber: [this.guest.documentNumber, [Validators.required]],
      email: [this.guest.email, [Validators.required, Validators.email]],
      contactPhoneNumber: [this.guest.contactPhoneNumber, [Validators.required]],
    });

  }

   onSaveGuest(guest: Guest) {
    this.dialogRef.close(guest);
  }

  onDialogBack(): void {
    this.dialogRef.close();
  }

}
