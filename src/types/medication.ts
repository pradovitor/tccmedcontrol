
export type Medication = {
  id: number;
  name: string;
  dosage: string;
  interval: string;
  observations: string;
  price: string;
  pharmacy: string;
  image?: string; // Optional image as base64 string
};

export type MedicationFormData = {
  name: string;
  dosage: string;
  interval: string;
  observations: string;
  price: string;
  pharmacy: string;
  image?: string; // Optional image as base64 string
};
