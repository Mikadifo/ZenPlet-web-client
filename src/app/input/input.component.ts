import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() type: string = '';
  @Input() placeholder: string = 'placeholder';
  @Input() ngStyle: { [klass: string]: any } = {};
  @Input() value: any = '';

  constructor() {}

  ngOnInit(): void {}
}
