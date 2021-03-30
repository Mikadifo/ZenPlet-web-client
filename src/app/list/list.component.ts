import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from '../model/owner/owner.model';
import { Pets } from '../model/pets.model';

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
    ownerPets: new Set(),
  };

  constructor(private route: ActivatedRoute, private router: Router) {
    this.loggedOwner = JSON.parse(localStorage.getItem('owner') || '');
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

  hola(pet: Pets) {
    console.log('funcaaaaaa', pet);
  }
}
