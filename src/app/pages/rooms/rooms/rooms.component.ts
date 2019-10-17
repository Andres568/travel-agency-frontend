import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MatSort } from '@angular/material';
import { Room } from 'src/app/common/models/room';
import { StoreService } from 'src/app/_services/store.service';
import { Hotel } from 'src/app/common/models/hotel';
import { CreateRoomComponent } from '../create-room/create-room.component';
import { EditRoomComponent } from '../edit-room/edit-room.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  title = 'Create hotel';
  form: FormGroup;
  rooms: MatTableDataSource<Room>;
  newRooms: Room[] = [];
  storedRooms: Room[] = [];
  removedRooms: Room[] = [];

  displayedColumns: string[] = ['name', 'isAvailable', 'isEnable', 
   'edit', 'delete'];

  constructor( public dialog: MatDialog, 
    private storeService: StoreService,
    public dialogRef: MatDialogRef<RoomsComponent>,
    private formBuilder: FormBuilder) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      isEnable: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
    });
    //[{ value: '', disabled: true }, Validators.required]
    this.storeService.getAllRooms().subscribe(storedRooms => {
      this.storedRooms = storedRooms;
      console.log(storedRooms);
      console.log(this.storedRooms);
      // let listedRooms: Room[];
      // if(this.newRooms.length > 0){
      //   listedRooms = this.storedRooms.concat(this.newRooms);
      // }
      // else{
      //   listedRooms = this.storedRooms;
      // }
      this.rooms = new MatTableDataSource(this.storedRooms.concat(this.newRooms));
      console.log(this.rooms.data);
        this.rooms.sort = this.sort;
     });
  }

  onSaveHotel(hotel: Hotel) {   
    
    this.newRooms.forEach(newRoom => {
      this.storeService.addRoom(newRoom);
    });
    this.removedRooms.forEach(removedRoom => {
      this.storeService.removeRoom(removedRoom.id);
    });
    this.onDialogBack();
  }

  applyFilter(filterValue: string) {
    this.rooms.filter = filterValue.trim().toLowerCase();
  }

  updateRoomList(){
    this.rooms = new MatTableDataSource(this.storedRooms.concat(this.newRooms));
  }

  deleteRoom(room) {
    if (confirm('Are you sure?')) {
      if(room.id == null){
        this.newRooms = this.newRooms.filter(newRoom => newRoom !== room);
        console.log(this.newRooms);
      } else {
        this.removedRooms.push(room);
        this.storedRooms = this.newRooms.filter(storedRoom => storedRoom.id !== room.id);
      }
      this.updateRoomList();
    }
  }

  createRoomDialog(): void {
     const dialogRef = this.dialog.open(CreateRoomComponent, {
      // width: '1000px'
    });

    dialogRef.afterClosed().subscribe(room => {
      this.newRooms.push(room);
      this.updateRoomList();

    } 

    )

    
    // dialogRef.afterClosed()
    // .subscribe(room => {

      
    //   console.log('The dialog was closed');
    // });
  }


  editRoomDialog(id: number): void {
    const dialogRef = this.dialog.open(EditRoomComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  onDialogBack(): void {
    this.dialogRef.close();
  }


}
