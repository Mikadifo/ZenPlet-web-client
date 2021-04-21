import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
import * as mapboxgl from 'mapbox-gl';
import * as CryptoJS from 'crypto-js';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-new',
  templateUrl: './edit-new.component.html',
  styleUrls: ['./edit-new.component.css'],
})
export class EditNewComponent implements OnInit {
  dataIsOk!: boolean;
  nameEdit!: boolean;
  descriptionEdit!: boolean;
  emailEdit!: boolean;
  usernameEdit!: boolean;
  oldpasswordEdit!: boolean;
  newpasswordEdit!: boolean;
  repeatpasswordEdit!: boolean;
  passwordEdit!: boolean;
  breedEdit!: boolean;
  phoneEdit!: boolean;
  loginEdit!: boolean;
  dataMissingAlert: string = '';
  oldPswIncorrectAlert: string = '';
  pswUpdatedAlert: string = '';
  pswNoSameAlert: string = '';
  confirmDltAccountAlert: string = '';
  accountDltAlert: string = '';
  confirmDltPetAlert: string = '';
  dltPetAlert: string = '';
  dataSameAlert: string = '';
  dataChangeAlert: string = '';
  petUpdatedAlert: string = '';
  petInsertedAlert: string = '';
  errorPostAlert: string = '';
  petMarkedLostAlert: string = '';
  lostPetUpdatedAlert: string = '';
  errorlostPetUpdatedAlert: string = '';
  errorOcurredAlert: string = '';
  noHavePetsAlert: string = '';
  findPetAlert: string = '';
  selectedPetVaccineAlert: string = '';
  petVaccineUpdatedAlert: string = '';
  petHaveVaccineAlert: string = '';
  confirmDltVaccineAlert: string = '';
  dltVaccineAlert: string = '';
  map!: mapboxgl.Map;
  mapbox = mapboxgl as typeof mapboxgl;
  style = `mapbox://styles/mapbox/streets-v11`;
  lat = -2.897351;
  lng = -79.00468;
  zoom = 15;
  lostPetLocation: string = `${this.lng},${this.lat}`;
  key = CryptoJS.enc.Hex.parse('070a0605060e0700060c06050704050a');
  genreSelecction: string = '';

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
  currentLostPet: LostPet = new LostPet();
  imgURL: any;
  petImageBase64: string = '';
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
  @ViewChild('mapElement') mapElement!: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService,
    private petService: PetService,
    private lostPetService: LostPetService,
    private petVaccineService: PetVaccinesService,
    private vaccineService: VaccineService,
    private petFoundService: PetFoundService,
    private _location: Location,
    private translate: TranslateService
  ) {
    this.loggedOwner = JSON.parse(localStorage.getItem('owner') || '');
    console.log('este es el constructor');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.translate
      .get([
        'data.missing',
        'findPet',
        'confirmDltVaccine',
        'petHaveVaccine',
        'petVacUpdate',
        'selectedPetVaccine',
        'errorOcurred',
        'noHavePets',
        'lostPet',
        'lostPetUpdated',
        'errorPost',
        'petInserted',
        '',
        'pwsUpdated',
        'petUpdated',
        'dataSame',
        'dataChange',
        'oldPswIncorrect',
        'confirmDltAccount',
        'pswNoSame',
        'accountDlt',
        'petDlt',
        'confirmDltPet',
      ])
      .subscribe((values) => {
        console.log(values);
        this.dataMissingAlert = values['data.missing'];
        this.oldPswIncorrectAlert = values['oldPswIncorrect'];
        this.pswNoSameAlert = values['pswNoSame'];
        this.pswUpdatedAlert = values['pwsUpdated'];
        this.confirmDltAccountAlert = values['confirmDltAccount'];
        this.accountDltAlert = values['accountDlt'];
        this.confirmDltPetAlert = values['confirmDltpet'];
        this.dltPetAlert = values['petDlt'];
        this.dataSameAlert = values['dataSame'];
        this.dataChangeAlert = values['dataChange'];
        this.petUpdatedAlert = values['petUpdated'];
        this.petInsertedAlert = values['petInserted'];
        this.errorPostAlert = values['errorOcurred'];
        this.petMarkedLostAlert = values['lostPet'];
        this.lostPetUpdatedAlert = values['lostPetUpdated'];
        this.errorOcurredAlert = values['errorOcurred'];
        this.findPetAlert = values['findPet'];
        this.errorOcurredAlert = values['errorOcurred'];
        this.noHavePetsAlert = values['noHavePets'];
        this.selectedPetVaccineAlert = values['selectedPetVaccine'];
        this.petHaveVaccineAlert = values['petHaveVaccine'];
        this.petVaccineUpdatedAlert = values['petVacUpdate'];
        this.confirmDltVaccineAlert = values['confirmDltVaccine'];
        this.dltVaccineAlert = values['confirmDltVaccine'];
      });
  }

  ngOnInit(): void {
    console.log('este es el ngOnInit');
    this.mapbox.accessToken = environment.mapboxKey;
    this.route.params.subscribe((params) => {
      this.mode = params['mode'];
      this.page = params['page'];
    });
    if (this.mode === 'edit' && this.page === 'pet') {
      this.currentPet = JSON.parse(localStorage.getItem('selectedPet') || '');
      this.genreSelecction = this.currentPet.petGenre[0];
      this.imgURL = this.currentPet.petImage;
      this.petImageBase64 = this.imgURL as string;
      this.lostPetService.getLostPetByPetId(this.currentPet.petId).subscribe(
        (data) => {
          console.log(data);
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
      this.petIdForVaccine = this.currentVaccine.id.petId.toString();
    } else if (this.page === 'lostpet') {
      this.currentPet = JSON.parse(localStorage.getItem('selectedPet') || '');
      this.lostPetService.getLostPetByPetId(this.currentPet.petId).subscribe(
        (data) => {
          console.log(data);
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
    }
  }

  createdMark(lng: number, lat: number) {
    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(this.map);

    marker.on('drag', () => {
      this.lostPetLocation = `${marker.getLngLat().lng},${
        marker.getLngLat().lat
      }`;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.page === 'lostpet') {
        if (this.mode === 'edit') {
          console.log(this.currentLostPet.lostPetLocation as string);
          console.log(this.currentLostPet.lostPetLocation);
          this.lostPetLocation = this.currentLostPet.lostPetLocation as string;
        }
        let lostPetLocationArray: number[] = [
          ...this.lostPetLocation.split(','),
        ].map((item) => parseFloat(item));
        console.log(this.mapElement.nativeElement);
        this.map = new mapboxgl.Map({
          container: this.mapElement.nativeElement,
          style: this.style,
          center: [lostPetLocationArray[0], lostPetLocationArray[1]],
          zoom: this.zoom,
        });
        this.map.addControl(new mapboxgl.NavigationControl());
        this.createdMark(lostPetLocationArray[0], lostPetLocationArray[1]);
      }
    }, 250);
  }

  changePasswordNav() {
    this.router.navigate(['/new/password']);
  }

  changePassword(
    oldPassword: string,
    newPassword: string,
    repeatPassword: string
  ) {
    if (!this.dataIsOk) {
      alert(this.dataMissingAlert);
    } else {
      this.ownerService.getOwnerById(this.loggedOwner.ownerId).subscribe(
        (data) => {
          this.loggedOwner = data;
          console.log(data);
          let encryptedOldPassword = CryptoJS.AES.encrypt(
            oldPassword,
            this.key,
            {
              mode: CryptoJS.mode.ECB,
            }
          ).toString();
          let oldPasswordUrlSafeEncrypted: string = this.Base64EncodeUrlSafe(
            encryptedOldPassword
          );
          console.log(oldPasswordUrlSafeEncrypted);
          if (oldPasswordUrlSafeEncrypted === this.loggedOwner.ownerPassword) {
            if (newPassword === repeatPassword) {
              let encryptedPassword = CryptoJS.AES.encrypt(
                newPassword,
                this.key,
                {
                  mode: CryptoJS.mode.ECB,
                }
              ).toString();
              let passwordUrlSafeEncrypted: string = this.Base64EncodeUrlSafe(
                encryptedPassword
              );
              console.log(passwordUrlSafeEncrypted);
              this.loggedOwner.ownerPassword = passwordUrlSafeEncrypted;
              this.ownerService
                .updateOwner(this.loggedOwner.ownerId, this.loggedOwner)
                .subscribe(
                  (data) => {
                    console.log(data);
                    localStorage.setItem('owner', JSON.stringify(data));
                    alert(this.pswUpdatedAlert);
                    this._location.back();
                  },
                  (error) => {
                    console.log(error);
                  }
                );
            } else {
              alert(this.pswNoSameAlert);
            }
          } else {
            alert(this.oldPswIncorrectAlert);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteAccount() {
    if (confirm(this.confirmDltAccountAlert)) {
      this.ownerService.deleteOwner(this.loggedOwner.ownerId).subscribe(
        (data) => {
          console.log(data);
          alert(this.accountDltAlert);
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
    if (confirm(this.confirmDltPetAlert)) {
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
                alert(this.dltPetAlert);
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
    if (!this.dataIsOk) {
      alert(this.dataMissingAlert);
    } else {
      this.ownerService.getOwnerById(this.loggedOwner.ownerId).subscribe(
        (data) => {
          this.loggedOwner = data;
          console.log(data);
          if (
            this.loggedOwner.ownerName === username &&
            this.loggedOwner.ownerEmail === email &&
            this.loggedOwner.ownerPhoneNumber === phoneNumber
          ) {
            alert(this.dataSameAlert);
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
                  alert(this.dataChangeAlert);
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
  }

  editOrCreatePet(
    name: string,
    breed: string,
    size: string,
    birthdate: string
  ) {
    if (!this.dataIsOk || this.imgURL === undefined) {
      alert(this.dataMissingAlert);
    } else if (this.mode === 'edit') {
      console.log('editing');
      this.currentPet.petName = name;
      this.currentPet.petBreed = breed;
      this.currentPet.petSize = size;
      this.currentPet.petGenre = this.genreSelecction;
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
                  alert(this.petUpdatedAlert);
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
        petGenre: this.genreSelecction,
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
                alert(this.dataChangeAlert);
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
    console.log(this.currentLostPet);
    if (this.currentLostPet.lostPetAdditionalInfo !== undefined) {
      this.router.navigate(['edit/lostpet']);
    } else {
      this.router.navigate(['post/lostpet']);
    }
  }

  postLostPet(additionalInfo: string) {
    if (!this.dataIsOk) {
      alert(this.dataMissingAlert);
    } else {
      console.log(this.currentPet);
      console.log(this.lostPetLocation);
      let lost: LostPet = {
        owner: this.loggedOwner,
        pet: this.currentPet,
        lostPetAdditionalInfo: additionalInfo,
        lostPetLocation: this.lostPetLocation,
      };
      this.lostPetService.saveLostPet(lost).subscribe(
        (data) => {
          console.log(data);
          if (data.owner.ownerId === 0) {
            alert(this.errorPostAlert);
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
  }

  editLostPet(additionalInfo: string) {
    if (!this.dataIsOk) {
      alert(this.dataMissingAlert);
    } else {
      console.log(this.lostPetLocation);
      let lostPetEdit: LostPet = {
        owner: new Owner(),
        pet: new Pets(),
        lostPetAdditionalInfo: additionalInfo,
        lostPetLocation: this.lostPetLocation,
      };
      console.log(lostPetEdit);
      this.lostPetService
        .updateLostPet(this.currentPet.petId, lostPetEdit)
        .subscribe(
          (data) => {
            console.log(data);
            if (
              data.lostPetAdditionalInfo === lostPetEdit.lostPetAdditionalInfo
            ) {
              alert(this.lostPetUpdatedAlert);
              this._location.back();
            } else {
              alert(this.errorlostPetUpdatedAlert);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  petFound() {
    this.lostPetService.deleteLostPet(this.currentPet.petId).subscribe(
      (data) => {
        console.log(data);
        if (data === null) {
          this.petFoundService.addPetFound().subscribe(
            (data) => {
              console.log(data);
              alert(this.findPetAlert);
              this.currentLostPet = new LostPet();
              this._location.back();
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          alert(this.errorOcurredAlert);
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
      alert(this.noHavePetsAlert);
    } else if (isNaN(parseInt(this.petIdForVaccine))) {
      alert(this.selectedPetVaccineAlert);
    } else if (this.mode === 'new') {
      if (!this.dataIsOk) {
        alert(this.dataMissingAlert);
      } else {
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
                alert(this.petHaveVaccineAlert);
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
    } else {
      if (!this.dataIsOk) {
        alert(this.dataMissingAlert);
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
                    alert(this.petVaccineUpdatedAlert);
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
  }

  deleteVaccine() {
    if (confirm(this.confirmDltVaccineAlert)) {
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
            alert(this.dltVaccineAlert);
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

  Base64EncodeUrlSafe(stringToEncode: string) {
    return stringToEncode
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/\=+$/, '');
  }

  validateAdditionalInfo(additionalInfo: string) {
    let regex = /(^[ÁÉÍÓÚA-Za-záéíóú ]{10,300}$)/;
    this.dataIsOk = regex.test(additionalInfo);
    this.descriptionEdit = regex.test(additionalInfo);
  }

  validateUsername(username: string) {
    let regex = /(^\w{3,20}$)/;
    this.dataIsOk = regex.test(username);
    this.usernameEdit = regex.test(username);
  }

  validateLogin(username: string) {
    let regex = /(^\w{3,20}$)/ || /(\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b)/;
    this.dataIsOk = regex.test(username);
    this.loginEdit = regex.test(username);
  }

  validateName(name: string) {
    let regex = /(^[ÁÉÍÓÚA-Za-záéíóú ]{3,30}$)/;
    this.dataIsOk = regex.test(name);
    this.nameEdit = regex.test(name);
  }

  validateBreed(name: string) {
    let regex = /(^[ÁÉÍÓÚA-Za-záéíóú ]{3,30}$)/;
    this.dataIsOk = regex.test(name);
    this.breedEdit = regex.test(name);
  }

  validateEmail(email: string) {
    let regex = /(\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b) /;
    this.dataIsOk = regex.test(email);
    this.emailEdit = regex.test(email);
  }

  validatePhone(phone: string) {
    let regex = /(^\d{4,15}$)/;
    this.dataIsOk = regex.test(phone);
    this.phoneEdit = regex.test(phone);
  }

  validateOldPassword(password: string) {
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}/;
    this.dataIsOk = regex.test(password);
    this.oldpasswordEdit = regex.test(password);
  }

  validateNewPassword(password: string) {
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}/;
    this.dataIsOk = regex.test(password);
    this.newpasswordEdit = regex.test(password);
  }

  validateRepeatPassword(password: string) {
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}/;
    this.dataIsOk = regex.test(password);
    this.repeatpasswordEdit = regex.test(password);
  }
}
