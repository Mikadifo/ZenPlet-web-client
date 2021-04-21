import { Component, Input, OnInit } from '@angular/core';
import { Owner } from '../model/owner/owner.model';
import { Pets } from '../model/pets.model';
import {EditNewComponent} from '../edit-new/edit-new.component';


@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css'],
})
export class PetCardComponent implements OnInit {
  @Input()
  pet: Pets = {
    petId: 0,
    petName: '',
    petImage: '',
    petBreed: '',
    petBirthdate: '',
    petSize: '',
    petGenre: '',
    petOwner: new Owner(),
    petVaccines: [],
  };

  petAge: string = '';

  constructor() {}

  ngOnInit(): void {
    let yearMonthDay : {year:number, month:number, day:number }=EditNewComponent.getYearMonthDayFromStringDate(this.pet.petBirthdate);
    this.petAge =`${yearMonthDay.year} year(s) ${yearMonthDay.month} month(s) ${yearMonthDay.day} day(s)`;
  }

}
