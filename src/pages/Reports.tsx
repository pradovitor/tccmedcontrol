
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, DollarSign, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useReports } from "@/hooks/useReports";
import { generatePDF, printCurrentPage } from "@/utils/reportUtils";
import ReportFilters from "@/components/reports/ReportFilters";
import MedicationReportContent from "@/components/reports/MedicationReportContent";
import FinancialReportContent from "@/components/reports/FinancialReportContent";
import QualityReportContent from "@/components/reports/QualityReportContent";

const Reports = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    reportType,
    setReportType,
    medicationReports,
    financialReports,
    qualityReports,
  } = useReports();
  
  const { toast } = useToast();

  // Função para gerar relatório em PDF
  const handleGeneratePDF = () => {
    try {
      const success = generatePDF(
        reportType,
        startDate,
        endDate,
        medicationReports,
        financialReports,
        qualityReports
      );
      
      if (success) {
        toast({
          title: "PDF Gerado com Sucesso",
          description: "O relatório foi gerado e baixado em formato PDF."
        });
      } else {
        throw new Error("Falha ao gerar PDF");
      }
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast({
        title: "Erro ao gerar PDF",
        description: "Ocorreu um erro ao gerar o relatório em PDF.",
        variant: "destructive"
      });
    }
  };

  // Função para imprimir a página atual
  const handlePrint = () => {
    try {
      const success = printCurrentPage();
      
      if (success) {
        toast({
          title: "Impressão Iniciada",
          description: "O relatório foi enviado para impressão."
        });
      } else {
        throw new Error("Falha ao imprimir");
      }
    } catch (error) {
      console.error("Erro ao imprimir:", error);
      toast({
        title: "Erro ao imprimir",
        description: "Ocorreu um erro ao imprimir o relatório.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Relatórios</h1>

        <Tabs defaultValue="medication" onValueChange={(value) => setReportType(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="medication" className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              Medicação
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              Financeiro
            </TabsTrigger>
            <TabsTrigger value="quality" className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4" />
              Qualidade
            </TabsTrigger>
          </TabsList>

          <ReportFilters 
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onGeneratePDF={handleGeneratePDF}
            onPrint={handlePrint}
          />

          <TabsContent value="medication" className="mt-6">
            <MedicationReportContent medicationReports={medicationReports} />
          </TabsContent>

          <TabsContent value="financial" className="mt-6">
            <FinancialReportContent financialReports={financialReports} />
          </TabsContent>

          <TabsContent value="quality" className="mt-6">
            <QualityReportContent qualityReports={qualityReports} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;
