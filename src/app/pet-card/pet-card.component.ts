import { Component, Input, OnInit } from '@angular/core';
import { Owner } from '../model/owner/owner.model';
import { Pets } from '../model/pets.model';
import * as moment from 'moment';

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
    let petBirthdate: any = moment(this.pet.petBirthdate, 'YYYY-MM-DD');
    let now: any = moment();
    let petYears = now.diff(petBirthdate, 'year');
    petBirthdate.add(petYears, 'years');
    let petMonths = now.diff(petBirthdate, 'month');
    petBirthdate.add(petMonths, 'months');
    let petDays = now.diff(petBirthdate, 'day');

    this.petAge = `${petYears} year(s) ${petMonths} month(s) ${petDays} day(s)`;

    console.log(this.petAge);
  }
}
