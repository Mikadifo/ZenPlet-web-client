import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LostPet } from '../model/lost-pet.model';
import { Owner } from '../model/owner/owner.model';
import { PetVaccine } from '../model/pet-vaccine/pet-vaccine.model';
import { Pets } from '../model/pets.model';
import { Vaccine } from '../model/vaccine/vaccine.model';
import { LostPetService } from '../service/lost-pet.service';
import { OwnerService } from '../service/owner.service';
import { PetFoundService } from '../service/pet-found.service';
import { PetVaccinesService } from '../service/pet-vaccines.service';
import { PetService } from '../service/pet.service';
import { VaccineService } from '../service/vaccine.service';

@Component({
  selector: 'app-edit-new',
  templateUrl: './edit-new.component.html',
  styleUrls: ['./edit-new.component.css'],
})
export class EditNewComponent implements OnInit {
  mode: string = '';
  page: string = '';
  loggedOwner: Owner = {
    ownerId: 0,
    ownerName: '',
    ownerEmail: '',
    ownerPassword: '',
    ownerPhoneNumber: '',
    ownerToken: '',
    ownerPets: [],
  };
  currentPet: Pets = new Pets();
  imgURL: any;
  petImageBase64: string = '';
  currentLostPet: LostPet = new LostPet();
  petIdForVaccine: string = '';
  currentVaccine: PetVaccine = {
    id: { petId: 0, vaccineId: 0 },
    petVaccineDate: '',
    petVaccineNext: '',
    pet: new Pets(),
    vaccine: {
      vaccinesId: 0,
      vaccinesName: '',
      vaccinesDescription: '',
    },
  };
  selectedPetNameOfCombo: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService,
    private petService: PetService,
    private lostPetService: LostPetService,
    private petVaccineService: PetVaccinesService,
    private vaccineService: VaccineService,
    private petFoundService: PetFoundService,
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
      this.imgURL = this.currentPet.petImage;
      this.petImageBase64 = this.imgURL as string;
      this.lostPetService.getLostPetByPetId(this.currentPet.petId).subscribe(
        (data) => {
          console.log(data, 'fsafsafs');
          if (data === null) {
            this.currentLostPet = new LostPet();
          } else {
            this.currentLostPet = data;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (this.mode === 'edit' && this.page === 'vaccine') {
      this.currentVaccine = JSON.parse(
        localStorage.getItem('selectedVaccine') || ''
      );
      this.selectedPetNameOfCombo = this.loggedOwner.ownerPets.filter(
        (pet) => pet.petId === this.currentVaccine.id.petId
      )[0].petName;
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
                  alert('Password has been updated');
                  this._location.back();
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
    if (confirm('Are you sure to delete your pet?')) {
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
    birthdate: string
  ) {
    if (this.imgURL === undefined) {
      alert('Pet Image is mandatory');
    } else if (this.mode === 'edit') {
      console.log('editing');
      this.currentPet.petName = name;
      this.currentPet.petBreed = breed;
      this.currentPet.petSize = size;
      this.currentPet.petGenre = genre;
      this.currentPet.petOwner = this.loggedOwner;
      this.currentPet.petImage = this.petImageBase64;
      this.currentPet.petBirthdate = birthdate;
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
      let newPet: Pets = {
        petId: 0,
        petName: name,
        petImage: this.petImageBase64,
        petBreed: breed,
        petBirthdate: birthdate,
        petSize: size,
        petGenre: genre,
        petOwner: this.loggedOwner,
        petVaccines: [],
      };
      this.petService.createPet(newPet).subscribe(
        (data) => {
          console.log(data);
          newPet = data;
          this.loggedOwner.ownerPets.push(newPet);
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

  postLostPetNav() {
    if (this.currentLostPet.lostPetAdditionalInfo !== undefined) {
      this.router.navigate(['edit/lostpet']);
    } else {
      this.router.navigate(['post/lostpet']);
    }
  }

  postLostPet(additionalInfo: string) {
    let lost: LostPet = {
      owner: this.loggedOwner,
      pet: this.currentPet,
      lostPetAdditionalInfo: additionalInfo,
    };
    this.lostPetService.saveLostPet(lost).subscribe(
      (data) => {
        console.log(data);
        if (data.owner.ownerId === 0) {
          alert('An error has been ocurred while posting your pet as lost');
        } else {
          alert('Your pet now is marked as lost');
          this.currentLostPet = data;
          this._location.back();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editLostPet(additionalInfo: string) {
    let lostPetEdit: LostPet = {
      owner: new Owner(),
      pet: new Pets(),
      lostPetAdditionalInfo: additionalInfo,
    };
    this.lostPetService
      .updateLostPet(this.currentPet.petId, lostPetEdit)
      .subscribe(
        (data) => {
          console.log(data);
          if (
            data.lostPetAdditionalInfo === lostPetEdit.lostPetAdditionalInfo
          ) {
            alert('Lost Pet Updated');
            this._location.back();
          } else {
            alert('Error updating lost pet');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  petFound() {
    this.lostPetService.deleteLostPet(this.currentPet.petId).subscribe(
      (data) => {
        console.log(data);
        if (data === null) {
          this.petFoundService.addPetFound().subscribe(
            (data) => {
              console.log(data);
              alert('We are happy to help you to find your pet.');
              this.currentLostPet = new LostPet();
              this._location.back();
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          alert('An error has been ocurred while setting your pet as lost');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editOrCreateVaccine(
    vaccineName: string,
    vaccineDate: string,
    vaccineNext: string,
    vaccinesDescription: string
  ) {
    if (this.loggedOwner.ownerPets.length === 0) {
      alert('You Dont Have Pets Yet');
    } else if (isNaN(parseInt(this.petIdForVaccine))) {
      alert('You must select a pet to apply the vaccine');
    } else if (this.mode === 'new') {
      console.log('newing');
      let vaccine: Vaccine = {
        vaccinesId: 0,
        vaccinesName: vaccineName,
        vaccinesDescription: vaccinesDescription,
      };
      this.vaccineService.saveVaccine(vaccine).subscribe(
        (data) => {
          console.log(data);
          vaccine = data;
          let pet: Pets = this.loggedOwner.ownerPets.filter(
            (pet) => pet.petId === parseInt(this.petIdForVaccine)
          )[0];
          let petVaccine: PetVaccine = {
            id: { petId: 0, vaccineId: 0 },
            petVaccineDate: vaccineDate,
            petVaccineNext: vaccineNext,
            pet: pet,
            vaccine: vaccine,
          };
          console.log(petVaccine);
          this.petVaccineService.savePetVaccine(petVaccine).subscribe(
            (data) => {
              console.log(data);
              petVaccine = data;
              this.loggedOwner.ownerPets
                .filter((pet) => pet.petId === data.id.petId)
                .forEach((pet) => pet.petVaccines.push(petVaccine));
              localStorage.setItem('owner', JSON.stringify(this.loggedOwner));
              alert('Your pet now has the vaccine');
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
    } else {
      console.log('editing');
      let vaccineToUpdate: Vaccine = this.currentVaccine.vaccine;
      vaccineToUpdate.vaccinesDescription = vaccinesDescription;
      vaccineToUpdate.vaccinesName = vaccineName;
      this.vaccineService
        .updateVaccine(vaccineToUpdate.vaccinesId, vaccineToUpdate)
        .subscribe(
          (data) => {
            console.log(data);
            vaccineToUpdate = data;
            let pet: Pets = this.loggedOwner.ownerPets.filter(
              (pet) => pet.petId === parseInt(this.petIdForVaccine)
            )[0];
            let petVaccine: PetVaccine = {
              id: { petId: pet.petId, vaccineId: 0 },
              petVaccineDate: vaccineDate,
              petVaccineNext: vaccineNext,
              vaccine: vaccineToUpdate,
            };
            this.petVaccineService
              .updatePetVaccine(
                petVaccine.id.petId,
                petVaccine.vaccine.vaccinesId,
                petVaccine
              )
              .subscribe(
                (data) => {
                  console.log(data);
                  petVaccine = data;

                  this.loggedOwner.ownerPets
                    .filter((pet) => pet.petId === data.id.petId)
                    .forEach((pet) =>
                      pet.petVaccines.splice(
                        pet.petVaccines.indexOf(petVaccine),
                        1
                      )
                    );

                  this.loggedOwner.ownerPets
                    .filter((pet) => pet.petId === data.id.petId)
                    .forEach((pet) => pet.petVaccines.push(petVaccine));

                  localStorage.setItem(
                    'owner',
                    JSON.stringify(this.loggedOwner)
                  );
                  alert('Pet Vaccine updated');
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

  deleteVaccine() {
    if (confirm('Are you sure to delete the vaccine?')) {
      console.log(this.currentVaccine);
      this.vaccineService
        .deleteVaccine(this.currentVaccine.id.vaccineId)
        .subscribe(
          (data) => {
            console.log(data);
            this.loggedOwner.ownerPets
              .filter((pet) => pet.petId === this.currentVaccine.id.petId)
              .forEach((pet) =>
                pet.petVaccines.splice(
                  pet.petVaccines.indexOf(
                    this.loggedOwner.ownerPets
                      .filter(
                        (pet) => pet.petId === this.currentVaccine.id.petId
                      )[0]
                      .petVaccines.filter(
                        (petVaccine) =>
                          petVaccine.id.vaccineId ===
                          this.currentVaccine.id.vaccineId
                      )[0]
                  ),
                  1
                )
              );
            localStorage.setItem('owner', JSON.stringify(this.loggedOwner));
            alert('Vaccine has been deleted.');
            this._location.back();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  printLostPetNav() {
    this.router.navigate(['/print-lost']);
    localStorage.setItem('lostpet', JSON.stringify(this.currentLostPet));
  }
}
