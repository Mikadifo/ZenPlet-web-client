import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LostPet } from '../model/lost-pet.model';

@Injectable({
  providedIn: 'root',
})
export class LostPetService {
  private BASE_URL = 'https://zenplet.herokuapp.com/api';
  private header = {};

  constructor(private http: HttpClient) {
    this.header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') || ''
      ),
    };
  }

  getLostPets(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/lost-pet`, this.header);
  }

  getLostPetByPetId(petId: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/lost-pet/pet/${petId}`, this.header);
  }

  saveLostPet(lostPet: LostPet): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}/save-lost-pet`,
      lostPet,
      this.header
    );
  }

  updateLostPet(petId: number, lostPet: LostPet): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/edit-lost-pet/${petId}`,
      lostPet,
      this.header
    );
  }

  deleteLostPet(petId: number): Observable<any> {
    return this.http.delete(
      `${this.BASE_URL}/delete-lost-pet/${petId}`,
      this.header
    );
  }
}
