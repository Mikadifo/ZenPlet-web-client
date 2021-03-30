import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pets } from '../model/pets.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private header = {};

  constructor(private http: HttpClient) {
    this.header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') || ''
      ),
    };
  }

  private BASE_URL = 'http://localhost:8080/api';

  getPets(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/pets`, this.header);
  }

  createPet(pet: Pets): Observable<any> {
    return this.http.post(`${this.BASE_URL}/save-pet`, pet, this.header);
  }

  getPetById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/pet/id/${id}`, this.header);
  }

  getPetByName(name: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/pet/name/${name}`, this.header);
  }

  updatePet(id: number, pet: Pets): Observable<any> {
    return this.http.put(`${this.BASE_URL}/edit-pet/${id}`, pet, this.header);
  }

  deletePet(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/delete-pet/${id}`, this.header);
  }
}
