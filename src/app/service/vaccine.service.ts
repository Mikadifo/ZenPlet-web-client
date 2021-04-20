import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaccine } from '../model/vaccine/vaccine.model';

@Injectable({
  providedIn: 'root',
})
export class VaccineService {
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

  getVaccines(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/vaccines`, this.header);
  }

  saveVaccine(vaccine: Vaccine): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}/save-vaccine`,
      vaccine,
      this.header
    );
  }

  getVaccineById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/vaccine/id/${id}`, this.header);
  }

  updateVaccine(id: number, vaccine: Vaccine): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/edit-vaccine/${id}`,
      vaccine,
      this.header
    );
  }

  deleteVaccine(id: number): Observable<any> {
    return this.http.delete(
      `${this.BASE_URL}/delete-vaccine/${id}`,
      this.header
    );
  }
}
