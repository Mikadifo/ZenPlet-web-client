import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LostPet } from '../model/lost-pet.model';
import { Owner } from '../model/owner/owner.model';
import { PetVaccine } from '../model/pet-vaccine/pet-vaccine.model';
import { Pets } from '../model/pets.model';
import { LostPetService } from '../service/lost-pet.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  listTitle: string = '';
  card: string = '';
  loggedOwner: Owner = {
    ownerId: 0,
    ownerName: '',
    ownerEmail: '',
    ownerPassword: '',
    ownerPhoneNumber: '',
    ownerToken: '',
    ownerPets: [],
  };
  lostPets: LostPet[] = [];
  ownerPetsVaccines: PetVaccine[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lostPetService: LostPetService
  ) {
    this.loggedOwner = JSON.parse(localStorage.getItem('owner') || '');
    lostPetService.getLostPets().subscribe(
      (data) => {
        console.log(data);
        this.lostPets = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.loggedOwner.ownerPets.forEach((pet) => {
      pet.petVaccines.forEach((petVaccine) => {
        this.ownerPetsVaccines.push(petVaccine);
      });
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.card = params['card']));
  }

  newOfCurrentCard() {
    if (this.card === 'pets') {
      this.router.navigate(['new/pet']);
    } else if (this.card === 'vaccines') {
      this.router.navigate(['new/vaccine']);
    }
  }

  selectPet(pet: Pets) {
    this.router.navigate(['edit/pet']);
    localStorage.setItem('selectedPet', JSON.stringify(pet));
  }
}
