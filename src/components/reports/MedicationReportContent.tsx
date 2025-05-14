
import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";
import { MedicationReport } from "@/types/reports";

interface MedicationReportContentProps {
  medicationReports: MedicationReport[];
}

const MedicationReportContent: React.FC<MedicationReportContentProps> = ({ medicationReports }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatório de Medicação</CardTitle>
        <CardDescription>
          Medicamentos administrados e não administrados no período selecionado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-medium mb-2">Medicamentos não administrados</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medicamento</TableHead>
              <TableHead>Dosagem</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Motivo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicationReports
              .filter(report => report.status === "missed")
              .map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.dosage}</TableCell>
                  <TableCell>{format(report.date, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{report.time}</TableCell>
                  <TableCell className="flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                    {report.reason || "Não informado"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <h3 className="text-lg font-medium mt-6 mb-2">Todos os medicamentos</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medicamento</TableHead>
              <TableHead>Dosagem</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicationReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.dosage}</TableCell>
                <TableCell>{format(report.date, "dd/MM/yyyy")}</TableCell>
                <TableCell>{report.time}</TableCell>
                <TableCell>
                  <span className={
                    report.status === "taken" ? "text-green-500" : "text-red-500"
                  }>
                    {report.status === "taken" ? "Administrado" : "Não administrado"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MedicationReportContent;
