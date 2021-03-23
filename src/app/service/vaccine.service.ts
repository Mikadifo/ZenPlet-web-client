import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaccine } from '../model/vaccine/vaccine.model';

@Injectable({
  providedIn: 'root',
})
export class VaccineService {
  private BASE_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getVaccines(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/vaccines`);
  }

  saveVaccine(vaccine: Vaccine): Observable<any> {
    return this.http.post(`${this.BASE_URL}/save-vaccine`, vaccine);
  }

  getVaccineById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/vaccine/id/${id}`);
  }

  getVaccinesByName(name: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/vaccine/name/${name}`);
  }

  updateVaccine(id: number, vaccine: Vaccine): Observable<any> {
    return this.http.put(`${this.BASE_URL}/edit-vaccine/${id}`, vaccine);
  }

  deleteVaccine(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/delete-vaccine/${id}`);
  }
}
