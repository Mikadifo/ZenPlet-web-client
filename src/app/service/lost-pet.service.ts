import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LostPet } from '../model/lost-pet.model';

@Injectable({
  providedIn: 'root',
})
export class LostPetService {
  private BASE_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getLostPets(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/lost-pets`);
  }

  saveLostPet(lostPet: LostPet): Observable<any> {
    return this.http.post(`${this.BASE_URL}/save-lostPet`, lostPet);
  }

  updateLostPet(id: number, lostPet: LostPet): Observable<any> {
    return this.http.put(`${this.BASE_URL}/edit-lost-pet/${id}`, lostPet);
  }

  deleteLostPet(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/delete-lost-pet/${id}`);
  }
}
