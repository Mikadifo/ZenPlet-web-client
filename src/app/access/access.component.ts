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

  constructor(private ownerService: OwnerService, private router: Router) {}

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
    this.ownerService.login(login, password).subscribe(
      (data) => {
        console.log(data);
        if (data.ownerId !== 0) {
          this.owner = data;
          localStorage.setItem('token', data.token);
          localStorage.setItem('owner', JSON.stringify(this.owner));
          this.router.navigate(['/list/pets']);
        } else {
          alert('Username or Password are not correct');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  signup(
    username: string,
    email: string,
    password: string,
    phoneNumber: string
  ) {
    console.log('signingup...');
    this.owner.ownerName = username;
    this.owner.ownerEmail = email;
    this.owner.ownerPhoneNumber = phoneNumber;
    this.owner.ownerPassword = password;
    this.ownerService.saveOwners(this.owner).subscribe(
      (data) => {
        console.log(data);
        this.logInNav();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchUser() {
    console.log('searching user...');
  }
}
