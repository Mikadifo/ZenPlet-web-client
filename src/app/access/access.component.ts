import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from '../model/owner/owner.model';
import { OwnerService } from '../service/owner.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
})
export class AccessComponent implements OnInit {
  @Input() page: string = 'menu';

  owner: Owner = new Owner();

  constructor(private router: Router, private ownerService: OwnerService) {}

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

  loginOwner(login: string, password: string) {
    console.log('logining...');
    console.log(login, password);
    this.ownerService.login(login, password).subscribe(
      (data) => {
        console.log(data);
        this.owner = data;
        console.log(this.owner);
        localStorage.setItem('token', data.token);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  signup() {
    console.log('signingup...');
  }

  searchUser() {
    console.log('searching user...');
  }
}
