import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { Hotel } from 'src/app/common/models/hotel';
import { StoreService } from 'src/app/_services/store.service';
import { CreateHotelComponent } from '../create-hotel/create-hotel.component';
import { EditHotelComponent } from '../edit-hotel/edit-hotel.component';

@Component({
  selector: 'app-hotel-manager',
  templateUrl: './hotel-manager.component.html',
  styleUrls: ['./hotel-manager.component.scss']
})
export class HotelManagerComponent implements OnInit {
  title = 'HOTEL LIST';
  hotels: MatTableDataSource<Hotel>;
  displayedColumns: string[] = ['id', 'isEnable', 'name', 'city', 'edit', 'delete'];

  constructor(private storeService: StoreService,
              public dialog: MatDialog) { }

    @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
   this.storeService.getAllHotels().subscribe(hotels => {
     console.log(hotels)
      this.hotels = new MatTableDataSource(hotels);
      this.hotels.sort = this.sort;
   });
  }

  applyFilter(filterValue: string) {
    this.hotels.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
     this.storeService.removeHotel(id);
    }
  }

  createHotelDialog(): void {
    const dialogRef = this.dialog.open(CreateHotelComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  editHotelDialog(id: number): void {
    const dialogRef = this.dialog.open(EditHotelComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }


}
