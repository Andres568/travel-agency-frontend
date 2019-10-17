import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoreService } from 'src/app/_services/store.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { GetHotel, UpdateHotel, RemoveHotel } from 'src/app/common/store/hotel/hotels.actions';
import { getHotel } from 'src/app/common/store/hotel/hotels.reducers';
import { Hotel } from 'src/app/common/models/hotel';
import { take } from 'rxjs/operators';
import { Room } from 'src/app/common/models/room';
import { CreateRoomComponent } from '../../rooms/create-room/create-room.component';
import { EditRoomComponent } from '../../rooms/edit-room/edit-room.component';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: '../create-hotel/create-hotel.component.html',
  styleUrls: ['../create-hotel/create-hotel.component.scss']
})
export class EditHotelComponent implements OnInit {
  title = 'Edit hotel';
  form: FormGroup;
  hotelId: number;
  rooms: MatTableDataSource<Room>;
  newRooms: Room[] = [];
  storedRooms: Room[] = [];
  removedRooms: Room[] = [];
  updatedRooms: Room[] = [];
  displayedColumns: string[] = ['name', 'isAvailable', 'isEnable', 
  'edit', 'delete'];

  constructor(private storeService: StoreService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<EditHotelComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.hotelId = this.data;

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      isEnable: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
    });

    this.storeService.getHotel(+this.hotelId)
    .pipe(
      take(1)
    )
    .subscribe(hotel => {
      // if (hotel != null) {
        console.log(hotel);
        this.form = this.formBuilder.group({
          id: [hotel.id],
          name: [hotel.name, [Validators.required]],
          city: [hotel.city, [Validators.required]],
          isEnable: [hotel.isEnable.trim(), [Validators.required]],
          imageUrl: [hotel.imageUrl, [Validators.required]],
        });

      this.storedRooms = hotel.rooms;
      this.rooms = new MatTableDataSource(this.storedRooms.concat(this.newRooms));
      console.log(this.rooms.data);
      this.rooms.sort = this.sort;
      // }
    });
  }

  onSaveHotel(hotel: Hotel) {
    this.storeService.updateHotel(hotel);
    this.onDialogBack();
  }

  updateRoomList() {
    this.rooms = new MatTableDataSource(this.storedRooms.concat(this.newRooms));
  }

  deleteRoom(room: Room) {
    if (confirm('Are you sure?')) {
      if (room.id == null) {
        this.newRooms = this.newRooms.filter(newRoom => newRoom !== room);
      } else {
        this.removedRooms.push(room);
        this.storedRooms = this.storedRooms.filter(storedRoom => storedRoom.id !== room.id);
      }
      this.updateRoomList();
    }
  }

  createRoomDialog(): void {
    const dialogRef = this.dialog.open(CreateRoomComponent, {
      // width: '1000px'
    });

    dialogRef.afterClosed().subscribe(room => {
      if(room){
        this.newRooms.push(room);
        this.updateRoomList();
      }
    });
  }

  editRoomDialog(room: Room): void {
    const dialogRef = this.dialog.open(EditRoomComponent, {
      data: room
    });

    dialogRef.afterClosed().subscribe(editedRoom => {
      if (editedRoom) {
        const roomIndex = this.newRooms.findIndex(r => r === room);
        this.newRooms[roomIndex] = editedRoom;
        this.updateRoomList();

        if (editedRoom.id) {
          this.updatedRooms.push(room);
        }
      }
    });
  }

  onDialogBack(): void {
    this.removedRooms.forEach(removedRoom => {
      this.storeService.removeRoom(removedRoom.id);
    });
    this.newRooms.forEach(newRoom => {
      newRoom.hotelId = this.hotelId,
      this.storeService.addRoom(newRoom);
    });
    this.updatedRooms.forEach(updatedRoom => {
      updatedRoom.hotelId = this.hotelId,
      this.storeService.updateRoom(updatedRoom);
    });
    this.dialogRef.close();
  }

}
