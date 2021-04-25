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
import * as moment from 'moment';

@Component({
  selector: 'app-edit-new',
  templateUrl: './edit-new.component.html',
  styleUrls: ['./edit-new.component.css'],
})
export class EditNewComponent implements OnInit {
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
  petBirthdateEdit!: boolean;
  petDateVaccine!: boolean;
  petNextVaccine!: boolean;
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
  genreSelecction: string = 'Male';

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
    this.mapbox.accessToken = environment.mapboxKey;
    this.route.params.subscribe((params) => {
      this.mode = params['mode'];
      this.page = params['page'];
    });
    if (this.mode === 'edit') {
      this.nameEdit = true;
      this.descriptionEdit = true;
      this.emailEdit = true;
      this.usernameEdit = true;
      this.oldpasswordEdit = true;
      this.newpasswordEdit = true;
      this.repeatpasswordEdit = true;
      this.passwordEdit = true;
      this.breedEdit = true;
      this.phoneEdit = true;
      this.loginEdit = true;
      this.petBirthdateEdit = true;
      this.petDateVaccine = true;
      this.petNextVaccine = true;
    }
    if (this.mode === 'edit' && this.page === 'pet') {
      this.currentPet = JSON.parse(localStorage.getItem('selectedPet') || '');
      this.genreSelecction = this.currentPet.petGenre;
      this.imgURL = this.currentPet.petImage;
      this.petImageBase64 = this.imgURL as string;
      this.lostPetService.getLostPetByPetId(this.currentPet.petId).subscribe(
        (data) => {
          if (data === null) {
            this.currentLostPet = new LostPet();
          } else {
            this.currentLostPet = data;
          }
        },
        (error) => {
          console.error(error);
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
          if (data === null) {
            this.currentLostPet = new LostPet();
          } else {
            this.currentLostPet = data;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else if (this.mode === 'new') {
      let today: string = moment().format('YYYY-MM-DD');
      if (this.page === 'pet') {
        this.currentPet.petBirthdate = today;
      } else if (this.page === 'vaccine') {
        this.currentVaccine.petVaccineDate = today;
        this.currentVaccine.petVaccineNext = today;
      }
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
          this.lostPetLocation = this.currentLostPet.lostPetLocation as string;
        }
        let lostPetLocationArray: number[] = [
          ...this.lostPetLocation.split(','),
        ].map((item) => parseFloat(item));
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
    if (
      !this.oldpasswordEdit ||
      !this.newpasswordEdit ||
      !this.repeatpasswordEdit
    ) {
      alert(this.dataMissingAlert);
    } else {
      this.ownerService.getOwnerById(this.loggedOwner.ownerId).subscribe(
        (data) => {
          this.loggedOwner = data;
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
              this.loggedOwner.ownerPassword = passwordUrlSafeEncrypted;
              this.ownerService
                .updateOwner(this.loggedOwner.ownerId, this.loggedOwner)
                .subscribe(
                  (data) => {
                    localStorage.setItem('owner', JSON.stringify(data));
                    alert(this.pswUpdatedAlert);
                    this._location.back();
                  },
                  (error) => {
                    console.error(error);
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
          console.error(error);
        }
      );
    }
  }

  deleteAccount() {
    if (confirm(this.confirmDltAccountAlert)) {
      this.ownerService.deleteOwner(this.loggedOwner.ownerId).subscribe(
        (data) => {
          alert(this.accountDltAlert);
          localStorage.clear();
          this.router.navigate(['auth']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  deletePet() {
    if (confirm(this.confirmDltPetAlert)) {
      this.petService.deletePet(this.currentPet.petId).subscribe(
        (data) => {
          this.loggedOwner.ownerPets = this.loggedOwner.ownerPets.filter(
            (pet) => pet.petId !== this.currentPet.petId
          );
          this.ownerService
            .updateOwner(this.loggedOwner.ownerId, this.loggedOwner)
            .subscribe(
              (data) => {
                this.loggedOwner = data;
                localStorage.setItem('owner', JSON.stringify(data));
                alert(this.dltPetAlert);
                this._location.back();
              },
              (error) => {
                console.error(error);
              }
            );
        },
        (error) => console.error(error)
      );
    }
  }

  saveChanges(username: string, email: string, phoneNumber: string) {
    if (!this.usernameEdit || !this.emailEdit || !this.phoneEdit) {
      alert(this.dataMissingAlert);
    } else {
      this.ownerService.getOwnerById(this.loggedOwner.ownerId).subscribe(
        (data) => {
          this.loggedOwner = data;
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
                  this.loggedOwner = data;
                  localStorage.setItem('owner', JSON.stringify(data));
                  alert(this.dataChangeAlert);
                },
                (error) => {
                  console.error(error);
                }
              );
          }
        },
        (error) => {
          console.error(error);
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
    if (this.imgURL === undefined || !this.nameEdit || !this.breedEdit) {
      alert(this.dataMissingAlert);
    } else if (this.mode === 'edit') {
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
            this.currentPet = data;
            this.ownerService
              .updateOwner(this.loggedOwner.ownerId, this.loggedOwner)
              .subscribe(
                (data) => {
                  this.loggedOwner = data;
                  localStorage.setItem('owner', JSON.stringify(data));
                  alert(this.petUpdatedAlert);
                  this._location.back();
                },
                (error) => {
                  console.error(error);
                }
              );
          },
          (error) => {
            console.error(error);
          }
        );
    } else if (this.mode === 'new') {
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
          newPet = data;
          this.loggedOwner.ownerPets.push(newPet);
          localStorage.setItem('owner', JSON.stringify(this.loggedOwner));
          alert(this.petInsertedAlert);
          this._location.back();
        },
        (error) => {
          console.error(error);
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
    if (!this.descriptionEdit) {
      alert(this.dataMissingAlert);
    } else {
      let lost: LostPet = {
        owner: this.loggedOwner,
        pet: this.currentPet,
        lostPetAdditionalInfo: additionalInfo,
        lostPetLocation: this.lostPetLocation,
      };
      this.lostPetService.saveLostPet(lost).subscribe(
        (data) => {
          if (data.owner.ownerId === 0) {
            alert(this.errorPostAlert);
          } else {
            alert('Your pet now is marked as lost');
            this.currentLostPet = data;
            this._location.back();
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  editLostPet(additionalInfo: string) {
    if (!this.descriptionEdit) {
      alert(this.dataMissingAlert);
    } else {
      let lostPetEdit: LostPet = {
        owner: new Owner(),
        pet: new Pets(),
        lostPetAdditionalInfo: additionalInfo,
        lostPetLocation: this.lostPetLocation,
      };
      this.lostPetService
        .updateLostPet(this.currentPet.petId, lostPetEdit)
        .subscribe(
          (data) => {
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
            console.error(error);
          }
        );
    }
  }

  petFound() {
    this.lostPetService.deleteLostPet(this.currentPet.petId).subscribe(
      (data) => {
        if (data === null) {
          this.petFoundService.addPetFound().subscribe(
            (data) => {
              alert(this.findPetAlert);
              this.currentLostPet = new LostPet();
              this._location.back();
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          alert(this.errorOcurredAlert);
        }
      },
      (error) => {
        console.error(error);
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
    } else if (!this.nameEdit || !this.descriptionEdit) {
      alert(this.dataMissingAlert);
    } else if (this.mode === 'new') {
      let vaccine: Vaccine = {
        vaccinesId: 0,
        vaccinesName: vaccineName,
        vaccinesDescription: vaccinesDescription,
      };
      this.vaccineService.saveVaccine(vaccine).subscribe(
        (data) => {
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
          this.petVaccineService.savePetVaccine(petVaccine).subscribe(
            (data) => {
              petVaccine = data;
              this.loggedOwner.ownerPets
                .filter((pet) => pet.petId === data.id.petId)
                .forEach((pet) => pet.petVaccines.push(petVaccine));
              localStorage.setItem('owner', JSON.stringify(this.loggedOwner));
              alert(this.petHaveVaccineAlert);
              this._location.back();
            },
            (error) => {
              console.error(error);
            }
          );
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      let vaccineToUpdate: Vaccine = this.currentVaccine.vaccine;
      vaccineToUpdate.vaccinesDescription = vaccinesDescription;
      vaccineToUpdate.vaccinesName = vaccineName;
      this.vaccineService
        .updateVaccine(vaccineToUpdate.vaccinesId, vaccineToUpdate)
        .subscribe(
          (data) => {
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
                  console.error(error);
                }
              );
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  deleteVaccine() {
    if (confirm(this.confirmDltVaccineAlert)) {
      this.vaccineService
        .deleteVaccine(this.currentVaccine.id.vaccineId)
        .subscribe(
          (data) => {
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
            console.error(error);
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
    let regex = /(^[ÁÉÍÓÚA-Za-záéíóú ]{10,250}$)/;
    this.descriptionEdit = regex.test(additionalInfo);
  }

  validateUsername(username: string) {
    let regex = /(^\w{3,20}$)/;
    this.usernameEdit = regex.test(username);
  }

  validateLogin(username: string) {
    let regex = /(^\w{3,20}$)/ || /(\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b)/;
    this.loginEdit = regex.test(username);
  }

  validateName(name: string) {
    let regex = /(^[ÁÉÍÓÚA-Za-záéíóú ]{3,30}$)/;
    this.nameEdit = regex.test(name);
  }

  validateBreed(name: string) {
    let regex = /(^[ÁÉÍÓÚA-Za-záéíóú ]{3,30}$)/;
    this.breedEdit = regex.test(name);
  }

  validateEmail(email: string) {
    let regex = /(\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b)/;
    this.emailEdit = regex.test(email);
  }

  validatePhone(phone: string) {
    let regex = /(^\d{4,15}$)/;
    this.phoneEdit = regex.test(phone);
  }

  validateOldPassword(password: string) {
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}/;
    this.oldpasswordEdit = regex.test(password);
  }

  validateNewPassword(password: string) {
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}/;
    this.newpasswordEdit = regex.test(password);
  }

  validateRepeatPassword(password: string) {
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}/;
    this.repeatpasswordEdit = regex.test(password);
  }

  validatePetBirthdate(date: string) {
    let yearMonthDay: {
      year: number;
      month: number;
      day: number;
    } = EditNewComponent.getYearMonthDayFromStringDate(date);
    if (yearMonthDay.year > 50 || yearMonthDay.year < 0) {
      this.petBirthdateEdit = false;
    } else if (yearMonthDay.year === 0) {
      if (yearMonthDay.month == 0) {
        if (yearMonthDay.day < 0) {
          this.petBirthdateEdit = false;
        } else {
          this.petBirthdateEdit = true;
        }
      } else {
        this.petBirthdateEdit = true;
      }
    } else {
      this.petBirthdateEdit = true;
    }
  }

  validatePetVaccineDate(date: string) {
    let yearMonthDay: {
      year: number;
      month: number;
      day: number;
    } = EditNewComponent.getYearMonthDayFromStringDate(date);
    if (yearMonthDay.year > 50 || yearMonthDay.year < 0) {
      this.petDateVaccine = false;
    } else if (yearMonthDay.year === 0) {
      if (yearMonthDay.month == 0) {
        if (yearMonthDay.day < 0) {
          this.petDateVaccine = false;
        } else {
          this.petDateVaccine = true;
        }
      } else {
        this.petDateVaccine = true;
      }
    } else {
      this.petDateVaccine = true;
    }
  }

  validatePetVaccineNext(date: string) {
    let yearMonthDay: {
      year: number;
      month: number;
      day: number;
    } = EditNewComponent.getYearMonthDayFromStringDate(date);
    if (yearMonthDay.year < -5 || yearMonthDay.year > 0) {
      this.petNextVaccine = false;
    } else if (yearMonthDay.year === 0) {
      if (yearMonthDay.month == 0) {
        if (yearMonthDay.day > 0) {
          this.petNextVaccine = false;
        } else {
          this.petNextVaccine = true;
        }
      } else {
        this.petNextVaccine = true;
      }
    } else {
      this.petNextVaccine = true;
    }
  }

  static getYearMonthDayFromStringDate(
    stringDate: string
  ): { year: number; month: number; day: number } {
    let petBirthdate: any = moment(stringDate, 'YYYY-MM-DD');
    let now: any = moment();
    let petYears = now.diff(petBirthdate, 'year');
    petBirthdate.add(petYears, 'years');
    let petMonths = now.diff(petBirthdate, 'month');
    petBirthdate.add(petMonths, 'months');
    let petDays = now.diff(petBirthdate, 'day');

    return { year: petYears, month: petMonths, day: petDays };
  }
}
