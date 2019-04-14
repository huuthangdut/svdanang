import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { EventModel } from '../models/event.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private apiService: ApiService) { }

  getEvents(filter = '', sortBy = '', sortOrder = 'asc', pageNumber = 0, pageSize = 10): Observable<any> {
    return this.apiService.get('/events',
      new HttpParams()
        .set('filter', filter)
        .set('sortBy', sortBy)
        .set('sortOrder', sortOrder)
        .set('page', pageNumber.toString())
        .set('pageSize', pageSize.toString()));
  }

  getEvent(id: number) {
    return this.apiService.get(`/events/${id}`);
  }

  createEvent(event: EventModel) {
    return this.apiService.post('/events', event);
  }

  updateEvent(id: number, event: EventModel) {
    return this.apiService.put(`/events/${id}`, event);
  }

  deleteEvent(id: number) {
    return this.apiService.delete(`/events/${id}`);
  }
}
