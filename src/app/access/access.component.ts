import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from '../model/owner/owner.model';
import { OwnerService } from '../service/owner.service';
import * as CryptoJS from 'crypto-js';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
})
export class AccessComponent implements OnInit {
  usernameAcc!: boolean;
  emailAcc!: boolean;
  phoneAcc!: boolean;
  passwordAcc!: boolean;
  dataMissingAlert: string = '';
  incorrectData: string = '';
  owner: Owner = new Owner();
  key = CryptoJS.enc.Hex.parse('070a0605060e0700060c06050704050a');

  @Input() page: string = 'menu';

  constructor(
    private ownerService: OwnerService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.translate
      .get(['data.missing', 'incorrectUserOrPwd'])
      .subscribe((values) => {
        this.dataMissingAlert = values['data.missing'];
        this.incorrectData = values['incorrectUserOrPwd'];
      });
  }

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
    let encryptedPassword = CryptoJS.AES.encrypt(password, this.key, {
      mode: CryptoJS.mode.ECB,
    }).toString();
    let passwordUrlSafeEncrypted: string = this.Base64EncodeUrlSafe(
      encryptedPassword
    );
    this.ownerService.login(login, passwordUrlSafeEncrypted).subscribe(
      (data) => {
        if (data.ownerId !== 0) {
          this.owner = data;
          localStorage.setItem('token', data.token);
          localStorage.setItem('owner', JSON.stringify(this.owner));
          this.router.navigate(['/list/pets']);
        } else {
          alert(this.incorrectData);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  signup(
    username: string,
    email: string,
    password: string,
    phoneNumber: string
  ) {
    if (
      !this.usernameAcc ||
      !this.emailAcc ||
      !this.passwordAcc ||
      !this.phoneAcc
    ) {
      alert(this.dataMissingAlert);
    } else {
      this.owner.ownerName = username;
      this.owner.ownerEmail = email;
      this.owner.ownerPhoneNumber = phoneNumber;
      let encryptedPassword = CryptoJS.AES.encrypt(password, this.key, {
        mode: CryptoJS.mode.ECB,
      }).toString();
      let passwordUrlSafeEncrypted: string = this.Base64EncodeUrlSafe(
        encryptedPassword
      );
      this.owner.ownerPassword = passwordUrlSafeEncrypted;
      this.ownerService.saveOwners(this.owner).subscribe(
        (data) => {
          this.logInNav();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  searchUser() {
    console.log('searching user...');
  }

  Base64EncodeUrlSafe(stringToEncode: string) {
    return stringToEncode
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/\=+$/, '');
  }

  validateUsername(username: string) {
    let regex = /(^\w{3,20}$)/;
    this.usernameAcc = regex.test(username);
  }

  validatePhone(phone: string) {
    let regex = /(^\d{4,15}$)/;
    this.phoneAcc = regex.test(phone);
  }

  validatePassword(password: string) {
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}/;
    this.passwordAcc = regex.test(password);
  }

  validateEmail(email: string) {
    let regex = /(\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b)/;
    this.emailAcc = regex.test(email);
  }
}
