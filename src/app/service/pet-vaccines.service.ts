import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetVaccine } from '../model/pet-vaccine/pet-vaccine.model';

@Injectable({
  providedIn: 'root',
})
export class PetVaccinesService {
  private BASE_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getPetVaccines(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/pet-vaccines`);
  }

  savePetVaccine(petVaccines: PetVaccine): Observable<any> {
    return this.http.post(`${this.BASE_URL}/save-pet-vacines`, petVaccines);
  }

  updatePetVaccine(id: number, petVaccines: PetVaccine): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/edit-pet-vaccines/${id}`,
      petVaccines
    );
  }

  deletePetVaccine(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/delete-pet-vaccines/${id}`);
  }
}
