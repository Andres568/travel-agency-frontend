import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoreService } from 'src/app/_services/store.service';
import { MatDialogRef } from '@angular/material';
import { Room } from 'src/app/common/models/room';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  title = 'Create room';
  form: FormGroup;

 constructor(private storeService: StoreService,
             private formBuilder: FormBuilder,
             public dialogRef: MatDialogRef<CreateRoomComponent>
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      isAvailable: ['', [Validators.required]],
      isEnable: ['', [Validators.required]],
      baseCost: ['', [Validators.required]],
      tax: ['', [Validators.required]],
      type: ['', [Validators.required]],
      peopleCapacity: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
    });
  }

   onSaveRoom(room: Room) {
    this.dialogRef.close(room);
  }

  onDialogBack(): void {
    this.dialogRef.close();
  }

}
