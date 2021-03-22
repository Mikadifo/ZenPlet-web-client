import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string = 'Button';
  @Input() type: string = 'primary';
  @Input() ngStyle: { [klass: string]: any } = {};
  @Output() onClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onClickButton(event: any) {
    this.onClick.emit(event);
  }
}
