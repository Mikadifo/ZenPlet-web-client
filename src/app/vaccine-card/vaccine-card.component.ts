import { Component, Input, OnInit } from '@angular/core';
import { PetVaccine } from '../model/pet-vaccine/pet-vaccine.model';
import { Pets } from '../model/pets.model';
import { Vaccine } from '../model/vaccine/vaccine.model';

@Component({
  selector: 'app-vaccine-card',
  templateUrl: './vaccine-card.component.html',
  styleUrls: ['./vaccine-card.component.css'],
})
export class VaccineCardComponent implements OnInit {
  @Input()
  petVaccine: PetVaccine = {
    petVaccineDate: '',
    petVaccineNext: '',
    pet: new Pets(),
    vaccine: new Vaccine(),
  };

  constructor() {}

  ngOnInit(): void {}
}
