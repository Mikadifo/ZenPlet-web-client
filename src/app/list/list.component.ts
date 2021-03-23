import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  listTitle: string = '';
  card: string = '';

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.card = this.router.snapshot.params['card'].toLowerCase();
  }
}
