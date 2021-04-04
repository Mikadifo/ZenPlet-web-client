import { Component, Input, OnInit } from '@angular/core';
import { Owner } from '../model/owner/owner.model';
import { Pets } from '../model/pets.model';

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

  petAge: number = 0;

  constructor() {}

  ngOnInit(): void {
    let petBirthdateAsDate = new Date(this.pet.petBirthdate);
    let timeDiff = Math.abs(Date.now() - petBirthdateAsDate.getTime());
    this.petAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }
}
