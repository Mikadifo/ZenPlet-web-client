import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.css'],
})
export class PrimaryButtonComponent implements OnInit {
  @Input() text: string = 'Button';

  constructor() {}

  ngOnInit(): void {}
}
