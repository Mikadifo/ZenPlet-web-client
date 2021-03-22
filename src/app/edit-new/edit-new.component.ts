import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-new',
  templateUrl: './edit-new.component.html',
  styleUrls: ['./edit-new.component.css'],
})
export class EditNewComponent implements OnInit {
  @Input() title: string = 'edit';

  constructor() {}

  ngOnInit(): void {
    this.title = this.title.toUpperCase();
  }
}
