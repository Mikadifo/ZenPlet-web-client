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
    petSize: '',
    petGenre: '',
    petOwner: new Owner(),
    petVaccines: [],
  };

  constructor() {}

  ngOnInit(): void {}
}
