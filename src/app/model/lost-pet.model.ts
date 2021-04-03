import { Owner } from './owner/owner.model';
import { Pets } from './pets.model';

export class LostPet {
  owner!: Owner;
  pet!: Pets;
  lostPetAdditionalInfo!: string;
  constructor() {}
}
