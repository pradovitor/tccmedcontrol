
export type Medication = {
  id: number;
  name: string;
  dosage: string;
  interval: string;
  observations: string;
  price: string;
  pharmacy: string;
};

export type MedicationFormData = {
  name: string;
  dosage: string;
  interval: string;
  observations: string;
  price: string;
  pharmacy: string;
};
