import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { PetVaccine } from '../model/pet-vaccine/pet-vaccine.model';

@Injectable({
  providedIn: 'root'
})
export class PetVaccinesService {
  
  private BASE_URL= '/pet-vaccines'
  constructor(private http:HttpClient ) { 

  }
  updatePetVaccines(id: number, petVaccines:PetVaccine):Observable<any>{
    return this.http.put('${this.BASE_URL}/edit-pet-vaccines/${id}',petVaccines);
  }
  deleteOwner(id: number):Observable<any>{
    return this.http.delete('${this.BASE_URL}/delete-pet-vaccines/${id}');
  }
}
