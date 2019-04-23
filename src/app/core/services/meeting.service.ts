import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private apiService: ApiService,
    private http: HttpClient
  ) { }

  getMeetingsByMonthYear(month: number, year: number): Observable<any> {
    return this.apiService.get('/meetings',
      new HttpParams()
        .set('month', month.toString())
        .set('year', year.toString()));
  }

  getMeeting(id: number) {
    return this.apiService.get(`/meetings/${id}`);
  }

  createMeeting(meeting: any) {
    return this.apiService.post('/meetings', meeting);
  }

  updateMeeting(id: number, meeting: any) {
    return this.apiService.put(`/meetings/${id}`, meeting);
  }

  deleteMeeting(id: number) {
    return this.apiService.delete(`/meetings/${id}`);
  }
}
