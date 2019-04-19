import { Injectable } from '@angular/core';

import { ApiService } from './api.service';



@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private apiService: ApiService) { }

  uploadFile(file: File) {
    return this.apiService.postFile('/uploadFile', file);
  }
}
