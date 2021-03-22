import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() listTitle: string = 'LIST';
  @Input() card: string = 'pets';

  constructor() {}

  ngOnInit(): void {
    this.card = this.card.toLowerCase();
    this.listTitle = this.listTitle.toUpperCase();
  }
}
