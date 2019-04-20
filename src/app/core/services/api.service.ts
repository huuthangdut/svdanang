import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) { }

  get(url: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient
      .get(BASE_URL + url, { params })
      .pipe(catchError(this.formatErrors));
  }

  post(url: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(BASE_URL + url, JSON.stringify(body), { headers: this.header })
      .pipe(catchError(this.formatErrors));
  }

  postFile(url: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post('https://svdanang.herokuapp.com' + url, formData);
  }

  put(url: string, body: object = {}): Observable<any> {
    return this.httpClient
      .put(BASE_URL + url, JSON.stringify(body), { headers: this.header })
      .pipe(catchError(this.formatErrors));
  }

  delete(url: string): Observable<any> {
    return this.httpClient
      .delete(BASE_URL + url)
      .pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any): Observable<any> {
    return throwError(error.error);
  }
}
