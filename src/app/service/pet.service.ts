import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pets } from '../model/pets.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http:HttpClient) { }

  private BASE_URL='http://localhost:8080/api';
  
  getPets():Observable<any>{
    return this.http.get(`${this.BASE_URL}/pets`);
  }

  createPet(pet:Pets):Observable<any>{
    return this.http.post(`${this.BASE_URL}/save-pet`, pet);
  }

  getPetById(id:number):Observable<any>{
    return this.http.get(`${this.BASE_URL}/pet/id/${id}`);
  }

  getPetByName(name:string):Observable<any>{
    return this.http.get(`${this.BASE_URL}/pet/name/${name}`);  
  }

  updatePet(id:number, pet:Pets):Observable<any>{
    return this.http.put(`${this.BASE_URL}/edit-pet/${id}`, pet); 
  }

  deletePet(id:number):Observable<any>{
    return this.http.delete(`${this.BASE_URL}/delete-pet/${id}`); 
  }

}
