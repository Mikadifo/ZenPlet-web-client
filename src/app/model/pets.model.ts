import { Owner } from './owner/owner.model';

export class Pets {
  petId!: number;
  petName!: string;
  petimage!: string;
  petBreed!: string;
  petSize!: string;
  petGenre!: string;
  petOwner!: Owner;
}
