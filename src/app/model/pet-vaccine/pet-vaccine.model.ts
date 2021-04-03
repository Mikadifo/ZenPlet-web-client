import { Pets } from '../pets.model';
import { Vaccine } from '../vaccine/vaccine.model';

export class PetVaccine {
  petVaccineDate!: string;
  petVaccineNext!: string;
  pet!: Pets;
  vaccine!: Vaccine;
}
