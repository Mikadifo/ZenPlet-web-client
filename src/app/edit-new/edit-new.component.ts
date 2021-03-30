import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from '../model/owner/owner.model';
import { Pets } from '../model/pets.model';
import { OwnerService } from '../service/owner.service';
import { PetService } from '../service/pet.service';

@Component({
  selector: 'app-edit-new',
  templateUrl: './edit-new.component.html',
  styleUrls: ['./edit-new.component.css'],
})
export class EditNewComponent implements OnInit {
  mode: string = '';
  page: string = '';
  loggedOwner: Owner = new Owner();
  currentPet: Pets = new Pets();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService,
    private petService: PetService
  ) {
    this.loggedOwner = JSON.parse(localStorage.getItem('owner') || '');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.mode = params['mode'];
      this.page = params['page'];
    });
  }

  changePasswordNav() {
    this.router.navigate(['/new/password']);
  }

  changePassword(
    oldPassword: string,
    newPassword: string,
    repeatPassword: string
  ) {
    this.ownerService.getOwnerById(this.loggedOwner.ownerId).subscribe(
      (data) => {
        this.loggedOwner = data;
        console.log(data);
        if (oldPassword === this.loggedOwner.ownerPassword) {
          if (newPassword === repeatPassword) {
            this.loggedOwner.ownerPassword = newPassword;
            this.ownerService
              .updateOwner(this.loggedOwner.ownerId, this.loggedOwner)
              .subscribe(
                (data) => {
                  console.log(data);
                  localStorage.setItem('owner', JSON.stringify(data));
                },
                (error) => {
                  console.log(error);
                }
              );
          } else {
            alert('new password and repeated are NOT the same');
          }
        } else {
          alert('old password is NOT correct');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteAccount() {
    if (confirm('Are you sure to delete your account?')) {
      this.ownerService.deleteOwner(this.loggedOwner.ownerId).subscribe(
        (data) => {
          console.log(data);
          alert('Your account has been deleted.');
          localStorage.clear();
          this.router.navigate(['auth']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deletePet() {
    if (confirm('Are you sure to delete your account?')) {
      console.log(this.currentPet);
      //this.petService.deletePet(this.c)
    }
  }

  saveChanges(username: string, email: string, phoneNumber: string) {
    this.ownerService.getOwnerById(this.loggedOwner.ownerId).subscribe(
      (data) => {
        this.loggedOwner = data;
        console.log(data);
        if (
          this.loggedOwner.ownerName === username &&
          this.loggedOwner.ownerEmail === email &&
          this.loggedOwner.ownerPhoneNumber === phoneNumber
        ) {
          alert('Data is the same, you can not save changes.');
        } else {
          this.loggedOwner.ownerName = username;
          this.loggedOwner.ownerEmail = email;
          this.loggedOwner.ownerPhoneNumber = phoneNumber;
          this.ownerService
            .updateOwner(this.loggedOwner.ownerId, this.loggedOwner)
            .subscribe(
              (data) => {
                console.log(data);
                this.loggedOwner = data;
                localStorage.setItem('owner', JSON.stringify(data));
                alert('Data changed successful');
              },
              (error) => {
                console.log(error);
              }
            );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveOrCreatePet(
    name: string,
    breed: string,
    size: string,
    genre: string,
    birthdate: Date
  ) {
    console.log(name, breed, size, genre, birthdate);
    //petimage!: string;
    if (this.mode === 'edit') {
      console.log('editin');
    } else if (this.mode === 'new') {
      console.log('new');
    }
  }
}
