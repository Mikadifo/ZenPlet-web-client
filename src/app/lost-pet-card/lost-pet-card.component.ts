import { Component, Input, OnInit } from '@angular/core';
import { LostPet } from '../model/lost-pet.model';
import { Owner } from '../model/owner/owner.model';
import { Pets } from '../model/pets.model';

@Component({
  selector: 'app-lost-pet-card',
  templateUrl: './lost-pet-card.component.html',
  styleUrls: ['./lost-pet-card.component.css'],
})
export class LostPetCardComponent implements OnInit {
  @Input()
  lostPet: LostPet = {
    owner: new Owner(),
    pet: new Pets(),
    lostPetAdditionalInfo: '',
    lostPetLocation: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
