import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetVaccine } from '../model/pet-vaccine/pet-vaccine.model';

@Injectable({
  providedIn: 'root',
})
export class PetVaccinesService {
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

  getPetVaccines(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/pet-vaccines`, this.header);
  }

  savePetVaccine(petVaccines: PetVaccine): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}/save-pet-vacines`,
      petVaccines,
      this.header
    );
  }

  updatePetVaccine(
    petId: number,
    vaccineId: number,
    petVaccines: PetVaccine
  ): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/edit-pet-vaccines/${petId}/${vaccineId}`,
      petVaccines,
      this.header
    );
  }

  deletePetVaccine(id: number): Observable<any> {
    return this.http.delete(
      `${this.BASE_URL}/delete-pet-vaccines/${id}`,
      this.header
    );
  }
}
