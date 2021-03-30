import { Component, Input, OnInit } from '@angular/core';
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
    petimage: '',
    petBreed: '',
    petSize: '',
    petGenre: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
