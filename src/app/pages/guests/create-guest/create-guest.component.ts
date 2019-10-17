import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoreService } from 'src/app/_services/store.service';
import { MatDialogRef } from '@angular/material';
import { Guest } from 'src/app/common/models/guest';

@Component({
  selector: 'app-create-guest',
  templateUrl: './create-guest.component.html',
  styleUrls: ['./create-guest.component.scss']
})
export class CreateGuestComponent implements OnInit {
  title = 'Create guest';
  form: FormGroup;

 constructor(private storeService: StoreService,
             private formBuilder: FormBuilder,
             public dialogRef: MatDialogRef<CreateGuestComponent>
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contactPhoneNumber: ['', [Validators.required]],
    });
  }

   onSaveGuest(guest: Guest) {
    this.dialogRef.close(guest);
  }

  onDialogBack(): void {
    this.dialogRef.close();
  }

}
