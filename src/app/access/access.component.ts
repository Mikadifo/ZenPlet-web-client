import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
})
export class AccessComponent implements OnInit {
  @Input() page: string = 'menu';

  constructor() {}

  ngOnInit(): void {
    this.page = this.page.toLowerCase();
  }

  signUpNav() {
    this.page = 'signup';
  }

  logInNav() {
    this.page = 'login';
  }

  forgotNav() {
    this.page = 'forgot';
  }

  login() {
    console.log('logining...');
  }

  signup() {
    console.log('signup...');
  }

  searchUser() {
    console.log('searching user...');
  }
}
