import { Component, OnInit } from '@angular/core';
import { PetFoundService } from '../service/pet-found.service';

@Component({
  selector: 'app-pets-found-counter',
  templateUrl: './pets-found-counter.component.html',
  styleUrls: ['./pets-found-counter.component.css'],
})
export class PetsFoundCounterComponent implements OnInit {
  petsFoundCounter: number = 0;

  constructor(private petsFoundService: PetFoundService) {
    petsFoundService.getPetsFound().subscribe(
      (data) => {
        console.log(data);
        this.petsFoundCounter = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
