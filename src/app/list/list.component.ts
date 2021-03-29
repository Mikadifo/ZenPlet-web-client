import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  listTitle: string = '';
  card: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

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
}
