
import { useState } from "react";
import { MedicationReport, FinancialReport, QualityReport, ReportType } from "@/types/reports";

export const useReports = () => {
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 7 * 86400000)); // 7 dias atrás
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [reportType, setReportType] = useState<ReportType>("medication");

  // Dados de exemplo para o relatório de medicamentos
  const medicationReports: MedicationReport[] = [
    { 
      id: 1, 
      name: "Paracetamol", 
      dosage: "500mg", 
      date: new Date(), 
      time: "08:00", 
      status: "taken" 
    },
    { 
      id: 2, 
      name: "Ibuprofeno", 
      dosage: "200mg", 
      date: new Date(), 
      time: "14:00", 
      status: "missed",
      reason: "Paciente estava dormindo"
    },
    { 
      id: 3, 
      name: "Paracetamol", 
      dosage: "500mg", 
      date: new Date(Date.now() - 86400000), 
      time: "08:00", 
      status: "taken" 
    },
    { 
      id: 4, 
      name: "Ibuprofeno", 
      dosage: "200mg", 
      date: new Date(Date.now() - 86400000), 
      time: "14:00", 
      status: "missed",
      reason: "Medicamento em falta"
    },
    { 
      id: 5, 
      name: "Paracetamol", 
      dosage: "500mg", 
      date: new Date(Date.now() - 2 * 86400000), 
      time: "08:00", 
      status: "taken" 
    },
    { 
      id: 6, 
      name: "Paracetamol", 
      dosage: "500mg", 
      date: new Date(Date.now() - 2 * 86400000), 
      time: "20:00", 
      status: "taken" 
    },
    { 
      id: 7, 
      name: "Ibuprofeno", 
      dosage: "200mg", 
      date: new Date(Date.now() - 3 * 86400000), 
      time: "14:00", 
      status: "taken"
    },
  ];

  // Dados de exemplo para o relatório financeiro
  const financialReports: FinancialReport[] = [
    {
      id: 1,
      name: "Paracetamol",
      price: "R$ 12,90",
      pharmacy: "Drogaria São Paulo",
      date: new Date(),
      quantity: 2,
      total: "R$ 25,80"
    },
    {
      id: 2,
      name: "Ibuprofeno",
      price: "R$ 15,50",
      pharmacy: "Drogasil",
      date: new Date(Date.now() - 86400000),
      quantity: 1,
      total: "R$ 15,50"
    }
  ];

  // Calcular relatório de qualidade
  const calculateQualityReport = (): QualityReport[] => {
    const medications = [...new Set(medicationReports.map(report => report.name))];
    
    return medications.map(medicationName => {
      const medicationData = medicationReports.filter(report => report.name === medicationName);
      const totalDoses = medicationData.length;
      const takenDoses = medicationData.filter(report => report.status === "taken").length;
      const missedDoses = totalDoses - takenDoses;
      const adherenceRate = totalDoses > 0 ? (takenDoses / totalDoses) * 100 : 0;
      
      return {
        medicationName,
        adherenceRate,
        totalDoses,
        takenDoses,
        missedDoses
      };
    });
  };

  const qualityReports = calculateQualityReport();

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    reportType,
    setReportType,
    medicationReports,
    financialReports,
    qualityReports,
  };
};
