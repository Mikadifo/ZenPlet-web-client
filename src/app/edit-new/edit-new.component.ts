import { Location } from '@angular/common';
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
  imgURL: any;
  petImageBase64: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService,
    private petService: PetService,
    private _location: Location
  ) {
    this.loggedOwner = JSON.parse(localStorage.getItem('owner') || '');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.mode = params['mode'];
      this.page = params['page'];
    });
    if (this.mode === 'edit' && this.page === 'pet') {
      this.currentPet = JSON.parse(localStorage.getItem('selectedPet') || '');
      console.log(this.currentPet);
    }
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
      this.petService.deletePet(this.currentPet.petId).subscribe(
        (data) => {
          console.log(data);
          this.loggedOwner.ownerPets = this.loggedOwner.ownerPets.filter(
            (pet) => pet.petId !== this.currentPet.petId
          );
          this.ownerService
            .updateOwner(this.loggedOwner.ownerId, this.loggedOwner)
            .subscribe(
              (data) => {
                console.log(data);
                this.loggedOwner = data;
                localStorage.setItem('owner', JSON.stringify(data));
                console.log(this.loggedOwner);
                alert('Pet deleted');
                this._location.back();
              },
              (error) => {
                console.log(error);
              }
            );
        },
        (err) => console.log(err)
      );
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

  editOrCreatePet(
    name: string,
    breed: string,
    size: string,
    genre: string,
    birthdate: Date
  ) {
    console.log(name, breed, size, genre, birthdate);
    if (this.mode === 'edit') {
      console.log('editing');
      this.currentPet.petName = name;
      this.currentPet.petBreed = breed;
      this.currentPet.petSize = size;
      this.currentPet.petGenre = genre;
      this.currentPet.petOwner = this.loggedOwner;
      this.petService
        .updatePet(this.currentPet.petId, this.currentPet)
        .subscribe(
          (data) => {
            console.log(data);
            this.currentPet = data;
            this.ownerService
              .updateOwner(this.loggedOwner.ownerId, this.loggedOwner)
              .subscribe(
                (data) => {
                  console.log(data);
                  this.loggedOwner = data;
                  localStorage.setItem('owner', JSON.stringify(data));
                  alert('Pet Updated');
                  this._location.back();
                },
                (error) => {
                  console.log(error);
                }
              );
          },
          (error) => {
            console.log(error);
          }
        );
    } else if (this.mode === 'new') {
      console.log('newing');
      console.log(this.petImageBase64);
      let pet: Pets = {
        petId: 0,
        petName: name,
        petimage: this.petImageBase64,
        petBreed: breed,
        petSize: size,
        petGenre: genre,
        petOwner: this.loggedOwner,
      };
      this.petService.createPet(pet).subscribe(
        (data) => {
          console.log(data);
          pet = data;
          this.loggedOwner.ownerPets.push(pet);
          this.ownerService
            .updateOwner(this.loggedOwner.ownerId, this.loggedOwner)
            .subscribe(
              (data) => {
                console.log(data);
                this.loggedOwner = data;
                localStorage.setItem('owner', JSON.stringify(this.loggedOwner));
                alert('Pet Inserted');
                this._location.back();
              },
              (error) => {
                console.log(error);
              }
            );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onFileChanged(event: any) {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
      this.petImageBase64 = reader.result as string;
    };
  }
}
