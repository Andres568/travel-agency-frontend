import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/_services/store.service';
import { MatDialog } from '@angular/material';
import { Hotel } from 'src/app/common/models/hotel';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { Reservation } from 'src/app/common/models/reservation';
import { Room } from 'src/app/common/models/room';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  title = 'HOTEL LIST';
  listedHotels: Hotel[];
  hotels: Hotel[];
  form: FormGroup;
  reservations: Reservation[];
  rooms: Room[];

  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private storeService: StoreService) { }

  

  ngOnInit() {
   this.storeService.getAllHotels()
   .subscribe(hotels => {
     this.listedHotels = hotels;
     this.hotels = hotels;
   });
   this.storeService.getAllReservations()
   .pipe(
     take(1)
   )
   .subscribe(reservations => {
     this.reservations = reservations;
   });
   this.storeService.getAllRooms()
   .pipe(
     take(1)
   )
   .subscribe(rooms => {
     this.rooms = rooms;
   });
   
 
  this.form = this.formBuilder.group({
    arrivalDate: ['', [ Validators.required]],
    departureDate: ['', [ Validators.required]],
    city: ['', [ Validators.required]],
    peopleCapacity: ['', [ Validators.required]],
  });
  }
  
  onSearch(form){
    
      
      const reservations = this.reservations.filter(r =>
        ((form.departureDate >= r.arrivalDate) && (form.departureDate <= r.departureDate))
        || (form.arrivalDate >= r.arrivalDate) && (form.arrivalDate <= r.departureDate)
        || (form.arrivalDate <= r.arrivalDate) && (form.departureDate >= r.departureDate));
        
        console.log(reservations);

      const availableRooms: Room[] = this.rooms;

      reservations.forEach(reservation => {
        availableRooms.push(...this.rooms.filter(r => r.id !== reservation.roomId));
      });

      console.log(availableRooms);

      const hotelIds: number[] = [];

      
      console.log(hotelIds);
      availableRooms.forEach(availableRoom => {
        hotelIds.push(availableRoom.hotelId);
      });

      this.listedHotels = this.hotels.filter(h => (h.city.trim() == form.city.trim()) && hotelIds.includes(h.id));
  
      
    console.log(form);
  }
 
  onHotel(hotel: Hotel){
    console.log(hotel)
  }

  
   

}
