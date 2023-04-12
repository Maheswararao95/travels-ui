import { Component } from '@angular/core';
import { Traveller } from './model/Traveller';
import { Trip } from './model/Trip';
import { ApiService } from './api.service';
import { Booking } from './model/Booking';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private apiService: ApiService) {
    this.getBookings();
  }

  title = 'travels-ui';
  nationalityList = [
    "Italian",
    "Polish"
  ];

  travelFromList = [
    "Italy",
    "Poland"
  ]

  travelDestList = [
    "US", "UK", "Australia"
  ];

  traveller: Traveller = {
    name: '',
    nationality: '',
    eligibleForTravelling: true,
  }
  trip: Trip = {
    from: '',
    to: '',
    isVisaRequired: false,
  }
  booking: Booking = {
    traveller: this.traveller,
    trip: this.trip,
    prefType: null
  }
  prefSeatType = [
    "WINDOW", "AISLE", "OTHER"
  ];

  id: any;
  taskId: any;
  nextTaskName = "";
  bookings = [];
  allocationList = [];

  createNewTrip() {
    this.traveller = {
      name: '',
      nationality: '',
      eligibleForTravelling: true,
    };
    this.trip = {
      from: '',
      to: '',
      isVisaRequired: false,
    };    
    this.booking = {
      traveller: this.traveller,
      trip: this.trip,
      prefType: null
    };
    this.id = null;
    this.taskId = null;
    this.nextTaskName = "newTrip";
  }

  submitTripDetails() {
    this.apiService.postTravels(this.traveller, this.trip).subscribe(
      data => {
        this.id = data.id;
        this.traveller = data.traveller;
        this.trip = data.trip;
        console.log("Trip created");
        this.nextTask();
      }
    )
  }

  nextTask() {
    console.log("coming here");
    if (this.id) {
      this.apiService.getNextTask(this.id).subscribe(
        tasks => {
          console.log("coming into next task");
          const task = tasks[0];
          this.taskId = task.id;
          this.nextTaskName = task.name;
        }
      );
    }
  }

  applyForVisa() {
    if (this.id && this.taskId) {
      this.apiService.postVisaApplication(this.id, this.taskId, this.traveller).subscribe(data => {
        this.traveller = data.traveller;
        this.nextTask();
      });
    }
  }

  bookFlight() {
    if (this.id && this.taskId) {
      this.apiService.postFlightBooking(this.id, this.taskId, this.booking).subscribe(data => {
        console.log("Booking data: ", data);
        this.nextTaskName = "";
        this.getBookings();
      })
    }
  }

  getBookings() {
    this.apiService.getAllBookings().subscribe(data => {
      console.log(data);
      this.bookings = data;
    })
  }

  allocateSeats(){
    this.apiService.getOptimizeAllocationList().subscribe(data => {
      this.allocationList = data.allocationList;
    })
  }
    
}
