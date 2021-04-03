import { Owner } from './owner/owner.model';
import { PetVaccine } from './pet-vaccine/pet-vaccine.model';

export class Pets {
  petId!: number;
  petName!: string;
  petImage!: string;
  petBreed!: string;
  petSize!: string;
  petGenre!: string;
  petOwner!: Owner;
  petVaccines!: PetVaccine[];
}
