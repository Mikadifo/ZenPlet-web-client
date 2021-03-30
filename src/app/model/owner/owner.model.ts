import { Pets } from '../pets.model';

export class Owner {
  ownerId: number = 0;
  ownerName: string = '';
  ownerEmail: string = '';
  ownerPassword: string = '';
  ownerPhoneNumber: string = '';
  ownerToken: string = '';
  ownerPets: Pets[] = [];

  constructor() {}
}
