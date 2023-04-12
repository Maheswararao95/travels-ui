import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Traveller } from './model/Traveller';
import { Trip } from './model/Trip';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from './model/Booking';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiRoot = environment.apiRoot;
  headers: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.set("Access-Control-Allow-Origin", "*");
   }

  postTravels(traveller: Traveller, trip: Trip): Observable<any> {
    const endPoint = `${this.apiRoot}/travels`;
    return this.httpClient.post(endPoint, {traveller, trip}, { headers: this.headers });
  }

  getNextTask(id: any) :Observable<any>{
    const endPoint = `${this.apiRoot}/travels/${id}/tasks`;
    return this.httpClient.get(endPoint);
  }

  postVisaApplication(id: any, taskId: any, traveller: Traveller): Observable<any>{
    const endPoint = `${this.apiRoot}/travels/${id}/visaApplication/${taskId}`;
    return this.httpClient.post(endPoint, { traveller }, {headers: this.headers});
  }

  postFlightBooking(id: any, taskId: any, booking: Booking): Observable<any> {
    const endPoint = `${this.apiRoot}/travels/${id}/flightBooking/${taskId}`;
    return this.httpClient.post(endPoint, { booking }, { headers: this.headers });
  }

  getAllBookings(): Observable<any> {
    const endPoint = `${this.apiRoot}/bookings`;
    return this.httpClient.get(endPoint);
  }

  getOptimizeAllocationList(): Observable<any> {
    const endPoint = `${this.apiRoot}/allocate-seats`;
    return this.httpClient.get(endPoint);
  }
}
