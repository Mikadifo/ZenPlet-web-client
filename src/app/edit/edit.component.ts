import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @Input() title: string = 'edit';

  constructor() {}

  ngOnInit(): void {
    this.title = this.title.toUpperCase();
  }
}
