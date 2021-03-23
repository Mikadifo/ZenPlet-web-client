import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Owner } from '../model/owner/owner.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private BASE_URL= '/owners'
  constructor( private http:HttpClient ) {

   }

 getOwnerById(id:number):Observable<any>{
  return this.http.get('${this.BASE_URL}/owner-id/${id}');
 }
 getOwnerByName(name:string):Observable<any>{
  return this.http.get('${this.BASE_URL}/owner-name/${name}');
 }
 
 updateOwner(id: number, owner:Owner):Observable<any>{
  return this.http.put('${this.BASE_URL}/edit-owner/${id}',owner);
}
deleteOwner(id: number):Observable<any>{
  return this.http.delete('${this.BASE_URL}/delete-owner/${id}');
}

} 