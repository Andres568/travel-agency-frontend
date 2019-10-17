import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoreService } from 'src/app/_services/store.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateRoomComponent } from '../create-room/create-room.component';
import { Room } from 'src/app/common/models/room';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-room',
  templateUrl: '../create-room/create-room.component.html',
  styleUrls: ['../create-room/create-room.component.scss']
})
export class EditRoomComponent implements OnInit {
  title = 'Edit room';
  form: FormGroup;
  roomId: number;

 constructor(private storeService: StoreService,
             private formBuilder: FormBuilder,
             public dialogRef: MatDialogRef<CreateRoomComponent>,
             @Inject(MAT_DIALOG_DATA) public room: Room,
    ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: [this.room.id],
      name: [this.room.name, [Validators.required]],
      isAvailable: [this.room.isAvailable, [Validators.required]],
      isEnable: [this.room.isEnable, [Validators.required]],
      baseCost: [this.room.baseCost, [Validators.required]],
      tax: [this.room.tax, [Validators.required]],
      type: [this.room.type, [Validators.required]],
      peopleCapacity: [this.room.peopleCapacity, [Validators.required]],
      imageUrl: [this.room.imageUrl, [Validators.required]],
    });

  }

   onSaveRoom(room: Room) {
    this.dialogRef.close(room);
  }

  onDialogBack(): void {
    this.dialogRef.close();
  }

}
