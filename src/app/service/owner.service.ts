import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Owner } from '../model/owner/owner.model';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private BASE_URL = 'http://localhost:8080/api';
  private header = {};

  constructor(private http: HttpClient) {
    this.header = {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('token') || ''
      ),
    }; //may is neccesary to put token hear the same for all methid of all servies
  }

  getOwners(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/owners`, this.header);
  }

  saveOwners(owner: Owner): Observable<any> {
    return this.http.post(`${this.BASE_URL}/save-owner`, owner);
  }

  getOwnerById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/owner/id/${id}`, this.header);
  }

  getOwnerByName(name: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/owner/name/${name}`, this.header);
  }

  updateOwner(id: number, owner: Owner): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/edit-owner/${id}`,
      owner,
      this.header
    );
  }

  deleteOwner(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/delete-owner/${id}`, this.header);
  }

  login(login: string, password: string): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/login-owner?login=${login}&password=${password}`
    );
  }
}
