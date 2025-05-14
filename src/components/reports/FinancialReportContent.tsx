
import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FinancialReport } from "@/types/reports";

interface FinancialReportContentProps {
  financialReports: FinancialReport[];
}

const FinancialReportContent: React.FC<FinancialReportContentProps> = ({ financialReports }) => {
  // Calculate total expenses
  const totalGasto = financialReports.reduce((sum, report) => {
    const valor = parseFloat(report.total.replace('R$ ', '').replace(',', '.'));
    return sum + valor;
  }, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatório Financeiro</CardTitle>
        <CardDescription>
          Gastos com medicamentos no período selecionado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medicamento</TableHead>
              <TableHead>Preço Unitário</TableHead>
              <TableHead>Farmácia</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {financialReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.price}</TableCell>
                <TableCell>{report.pharmacy}</TableCell>
                <TableCell>{format(report.date, "dd/MM/yyyy")}</TableCell>
                <TableCell>{report.quantity}</TableCell>
                <TableCell>{report.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total gasto no período:</span>
            <span className="text-lg font-bold">R$ {totalGasto.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialReportContent;
