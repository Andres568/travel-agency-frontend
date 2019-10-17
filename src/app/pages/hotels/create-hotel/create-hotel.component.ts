import { Component, OnInit, ViewChild } from '@angular/core';
import { Hotel } from 'src/app/common/models/hotel';
import { StoreService } from 'src/app/_services/store.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { Room } from 'src/app/common/models/room';
import { CreateRoomComponent } from '../../rooms/create-room/create-room.component';
import { EditRoomComponent } from '../../rooms/edit-room/edit-room.component';


@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss']
})
export class CreateHotelComponent implements OnInit {
  title = 'Create hotel';
  form: FormGroup;
  rooms: MatTableDataSource<Room>;
  newRooms: Room[] = [];
  removedRooms: Room[] = [];

  displayedColumns: string[] = ['name', 'isAvailable', 'isEnable',
   'edit', 'delete'];


  constructor(private storeService: StoreService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<CreateHotelComponent>,
              public dialog: MatDialog) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.rooms = new MatTableDataSource(this.newRooms);
    this.rooms.sort = this.sort;

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      isEnable: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
    });
  }

  onSaveHotel(hotel: Hotel) {
    hotel.rooms = this.newRooms;
    this.storeService.addHotel(hotel);
    this.onDialogBack();
  }

  applyFilter(filterValue: string) {
    this.rooms.filter = filterValue.trim().toLowerCase();
  }

  updateRoomList() {
    this.rooms = new MatTableDataSource(this.newRooms);
  }

  deleteRoom(room) {
    if (confirm('Are you sure?')) {
      this.newRooms = this.newRooms.filter(newRoom => newRoom !== room);
      this.updateRoomList();
    }
  }

  createRoomDialog(): void {
    const dialogRef = this.dialog.open(CreateRoomComponent, {
      // width: '1000px'
    });

    dialogRef.afterClosed().subscribe(room => {
      if (room) {
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
      }
    });
  }

  onDialogBack(): void {
    this.dialogRef.close();
  }

}
