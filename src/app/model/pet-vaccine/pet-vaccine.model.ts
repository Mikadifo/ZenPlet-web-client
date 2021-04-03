import { Pets } from '../pets.model';
import { Vaccine } from '../vaccine/vaccine.model';

export class PetVaccine {
  id!: { petId: number; vaccineId: number };
  petVaccineDate!: string;
  petVaccineNext!: string;
  pet?: Pets;
  vaccine!: Vaccine;
}
