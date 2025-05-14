
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { MedicationReport, FinancialReport, QualityReport, ReportType } from "@/types/reports";

export const generatePDF = (
  reportType: ReportType,
  startDate: Date,
  endDate: Date,
  medicationReports: MedicationReport[],
  financialReports: FinancialReport[],
  qualityReports: QualityReport[]
) => {
  try {
    const doc = new jsPDF();
    
    // Título do relatório
    const title = `Relatório de ${reportType === "medication" ? "Medicação" : 
                   reportType === "financial" ? "Financeiro" : "Qualidade"}`;
    
    doc.setFontSize(18);
    doc.text(title, 14, 20);
    
    // Período do relatório
    doc.setFontSize(12);
    doc.text(`Período: ${format(startDate, "dd/MM/yyyy")} a ${format(endDate, "dd/MM/yyyy")}`, 14, 30);
    
    // Data e hora de geração
    doc.setFontSize(10);
    doc.text(`Gerado em: ${format(new Date(), "dd/MM/yyyy HH:mm")}`, 14, 36);
    
    if (reportType === "medication") {
      // Tabela de medicamentos não administrados
      doc.setFontSize(14);
      doc.text("Medicamentos não administrados", 14, 45);
      
      const missedMeds = medicationReports.filter(report => report.status === "missed");
      autoTable(doc, {
        startY: 48,
        head: [['Medicamento', 'Dosagem', 'Data', 'Horário', 'Motivo']],
        body: missedMeds.map(report => [
          report.name, 
          report.dosage, 
          format(report.date, "dd/MM/yyyy"),
          report.time,
          report.reason || "Não informado"
        ]),
      });
      
      // Tabela com todos os medicamentos
      const finalY = (doc as any).lastAutoTable.finalY + 10;
      doc.text("Todos os medicamentos", 14, finalY);
      
      autoTable(doc, {
        startY: finalY + 3,
        head: [['Medicamento', 'Dosagem', 'Data', 'Horário', 'Status']],
        body: medicationReports.map(report => [
          report.name, 
          report.dosage, 
          format(report.date, "dd/MM/yyyy"),
          report.time,
          report.status === "taken" ? "Administrado" : "Não administrado"
        ]),
      });
    } 
    else if (reportType === "financial") {
      // Tabela de gastos financeiros
      autoTable(doc, {
        startY: 45,
        head: [['Medicamento', 'Preço Unit.', 'Farmácia', 'Data', 'Quant.', 'Total']],
        body: financialReports.map(report => [
          report.name, 
          report.price, 
          report.pharmacy,
          format(report.date, "dd/MM/yyyy"),
          report.quantity.toString(),
          report.total
        ]),
      });
      
      // Total gasto
      const finalY = (doc as any).lastAutoTable.finalY + 10;
      const totalGasto = financialReports.reduce((sum, report) => {
        const valor = parseFloat(report.total.replace('R$ ', '').replace(',', '.'));
        return sum + valor;
      }, 0);
      
      doc.text(`Total gasto no período: R$ ${totalGasto.toFixed(2).replace('.', ',')}`, 14, finalY);
    }
    else if (reportType === "quality") {
      // Tabela de qualidade de tratamento
      autoTable(doc, {
        startY: 45,
        head: [['Medicamento', 'Doses Totais', 'Doses Tomadas', 'Doses Perdidas', 'Taxa de Adesão']],
        body: qualityReports.map(report => [
          report.medicationName, 
          report.totalDoses.toString(), 
          report.takenDoses.toString(),
          report.missedDoses.toString(),
          `${report.adherenceRate.toFixed(0)}%`
        ]),
      });
      
      // Resumo da qualidade
      const finalY = (doc as any).lastAutoTable.finalY + 10;
      doc.text("Resumo da Qualidade do Tratamento", 14, finalY);
      
      const mediaAdesao = qualityReports.length > 0 
        ? (qualityReports.reduce((sum, report) => sum + report.adherenceRate, 0) / qualityReports.length).toFixed(0)
        : "0";
        
      const totalDosesTomadas = qualityReports.reduce((sum, report) => sum + report.takenDoses, 0);
      const totalDosesPerdidas = qualityReports.reduce((sum, report) => sum + report.missedDoses, 0);
      
      doc.text(`Taxa Média de Adesão: ${mediaAdesao}%`, 14, finalY + 10);
      doc.text(`Total de Doses Tomadas: ${totalDosesTomadas}`, 14, finalY + 15);
      doc.text(`Total de Doses Perdidas: ${totalDosesPerdidas}`, 14, finalY + 20);
    }
    
    // Baixa o PDF
    doc.save(`relatorio-${reportType}-${format(new Date(), "yyyy-MM-dd")}.pdf`);
    
    return true;
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    return false;
  }
};

// Função auxiliar para imprimir a página atual
export const printCurrentPage = () => {
  window.print();
  return true;
};

// Esta função retorna um elemento JSX, mas será definida em um arquivo separado
export type QualityIndicatorProps = {
  adherenceRate: number;
};
