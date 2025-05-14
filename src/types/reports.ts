
export type MedicationReport = {
  id: number;
  name: string;
  dosage: string;
  date: Date;
  time: string;
  status: "taken" | "missed";
  reason?: string;
};

export type FinancialReport = {
  id: number;
  name: string;
  price: string;
  pharmacy: string;
  date: Date;
  quantity: number;
  total: string;
};

export type QualityReport = {
  medicationName: string;
  adherenceRate: number;
  totalDoses: number;
  takenDoses: number;
  missedDoses: number;
};

export type ReportType = "medication" | "financial" | "quality";
