import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QualityReport } from "@/types/reports";
import { renderQualityIndicator } from "@/utils/reportUtils";

interface QualityReportContentProps {
  qualityReports: QualityReport[];
}

const QualityReportContent: React.FC<QualityReportContentProps> = ({ qualityReports }) => {
  // Calculate summary data
  const mediaAdesao = qualityReports.length > 0 
    ? (qualityReports.reduce((sum, report) => sum + report.adherenceRate, 0) / qualityReports.length).toFixed(0)
    : "0";
    
  const totalDosesTomadas = qualityReports.reduce((sum, report) => sum + report.takenDoses, 0);
  const totalDosesPerdidas = qualityReports.reduce((sum, report) => sum + report.missedDoses, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatório de Qualidade</CardTitle>
        <CardDescription>
          Análise da adesão ao tratamento no período selecionado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medicamento</TableHead>
              <TableHead>Doses Totais</TableHead>
              <TableHead>Doses Tomadas</TableHead>
              <TableHead>Doses Perdidas</TableHead>
              <TableHead>Taxa de Adesão</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qualityReports.map((report, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{report.medicationName}</TableCell>
                <TableCell>{report.totalDoses}</TableCell>
                <TableCell className="text-green-600">{report.takenDoses}</TableCell>
                <TableCell className="text-red-600">{report.missedDoses}</TableCell>
                <TableCell className="w-1/4">
                  {renderQualityIndicator(report.adherenceRate)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold">Resumo da Qualidade do Tratamento</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-lg">Taxa Média de Adesão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center">
                  {mediaAdesao}%
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-lg">Total de Doses Tomadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center text-green-600">
                  {totalDosesTomadas}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-lg">Total de Doses Perdidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center text-red-600">
                  {totalDosesPerdidas}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Recomendações:</h4>
            <ul className="list-disc pl-5 space-y-1 text-blue-800">
              <li>Defina horários fixos para tomar os medicamentos</li>
              <li>Use os alertas do aplicativo para lembrar os horários</li>
              <li>Configure lembretes via WhatsApp para familiares ou cuidadores</li>
              <li>Mantenha um estoque de medicamentos para evitar faltas</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityReportContent;
