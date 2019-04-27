import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProjectModel } from '../models/project.model';
import { ApiService } from './api.service';
import { Donation, DonationModel } from '../models/donation.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  constructor(private apiService: ApiService) { }

  getProjects(filter = '', sortBy = '', sortOrder = 'asc', pageNumber = 0, pageSize = 10): Observable<any> {
    return this.apiService.get('/projects',
      new HttpParams()
        .set('filter', filter)
        .set('sortBy', sortBy)
        .set('sortOrder', sortOrder)
        .set('page', pageNumber.toString())
        .set('pageSize', pageSize.toString()));
  }

  getProject(id: number) {
    return this.apiService.get(`/projects/${id}`);
  }

  createProject(project: ProjectModel) {
    return this.apiService.post('/projects', project);
  }

  updateProject(id: number, project: ProjectModel) {
    return this.apiService.put(`/projects/${id}`, project);
  }

  deleteProject(id: number) {
    return this.apiService.delete(`/projects/${id}`);
  }

  getDonations(projectId: number, filter: string, sortBy: string, sortOrder: string, pageNumber: number, pageSize: number) {
    return this.apiService.get(`/projects/${projectId}/donators`,
      new HttpParams()
        .set('filter', filter)
        .set('sortBy', sortBy)
        .set('sortOrder', sortOrder)
        .set('page', pageNumber.toString())
        .set('pageSize', pageSize.toString()));
  }

  createDonation(donation: DonationModel) {
    return this.apiService.post('/donations', donation);
  }

  getDonation(id: number) {
    return this.apiService.get(`/donations/${id}`);
  }

  updateDonation(id: number, donation: DonationModel) {
    return this.apiService.put(`/donations/${id}`, donation);
  }

  deleteDonation(id: number) {
    return this.apiService.delete(`/donations/${id}`);
  }


}
