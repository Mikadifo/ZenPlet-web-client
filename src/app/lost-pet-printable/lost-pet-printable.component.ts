import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LostPet } from '../model/lost-pet.model';

@Component({
  selector: 'app-lost-pet-printable',
  templateUrl: './lost-pet-printable.component.html',
  styleUrls: ['./lost-pet-printable.component.css'],
})
export class LostPetPrintableComponent implements OnInit {
  lostPet: LostPet;
  visible: boolean = true;

  constructor(private _location: Location) {
    this.lostPet = JSON.parse(localStorage.getItem('lostpet') || '');
  }

  ngOnInit(): void {}

  onPrintLostPet() {
    print();
  }

  back() {
    this._location.back();
  }
}
