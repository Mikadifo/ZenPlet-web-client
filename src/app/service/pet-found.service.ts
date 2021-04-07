import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetFoundService {
  private BASE_URL = 'http://localhost:8080/api';
  private header = {};

  constructor(private http: HttpClient) {
    this.header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') || ''
      ),
    };
  }

  getPetsFound(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/pets-found`);
  }

  addPetFound(): Observable<any> {
    return this.http.put(`${this.BASE_URL}/add-pet-found`, null, this.header);
  }

  subPetFound(): Observable<any> {
    return this.http.put(`${this.BASE_URL}/sub-pet-found`, null, this.header);
  }
}
