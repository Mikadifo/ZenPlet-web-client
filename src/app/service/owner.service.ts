import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Owner } from '../model/owner/owner.model';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private BASE_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getOwners(): Observable<any> {
    let header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') || ''
      ),
    }; //may is neccesary to put token hear the same for all methid of all servies

    return this.http.get(`${this.BASE_URL}/owners`, header);
  }

  saveOwners(owner: Owner): Observable<any> {
    return this.http.post(`${this.BASE_URL}/save-owner`, owner);
  }

  getOwnerById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/owner/id/${id}`);
  }

  getOwnerByName(name: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/owner/name/${name}`);
  }

  updateOwner(id: number, owner: Owner): Observable<any> {
    return this.http.put(`${this.BASE_URL}/edit-owner/${id}`, owner);
  }

  deleteOwner(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/delete-owner/${id}`);
  }

  login(login: string, password: string): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/login-owner?login=${login}&password=${password}`
    );
  }
}
