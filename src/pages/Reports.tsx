import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { FileText, Download, AlertTriangle, BarChart, DollarSign, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type MedicationReport = {
  id: number;
  name: string;
  dosage: string;
  date: Date;
  time: string;
  status: "taken" | "missed";
  reason?: string;
};

type FinancialReport = {
  id: number;
  name: string;
  price: string;
  pharmacy: string;
  date: Date;
  quantity: number;
  total: string;
};

type QualityReport = {
  medicationName: string;
  adherenceRate: number;
  totalDoses: number;
  takenDoses: number;
  missedDoses: number;
};

const Reports = () => {
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 7 * 86400000)); // 7 dias atrás
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [reportType, setReportType] = useState("medication");
  const { toast } = useToast();
  
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

  // Função para gerar relatório em PDF (simulação)
  const generatePDF = () => {
    toast({
      title: "Relatório gerado!",
      description: "Em uma implementação real, isso baixaria um PDF."
    });
  };

  // Função auxiliar para renderizar o indicador de qualidade
  const renderQualityIndicator = (adherenceRate: number) => {
    let bgColor, textColor;
    
    if (adherenceRate >= 90) {
      bgColor = "bg-green-100";
      textColor = "text-green-800";
    } else if (adherenceRate >= 70) {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
    } else {
      bgColor = "bg-red-100";
      textColor = "text-red-800";
    }
    
    return (
      <div className={`flex items-center ${textColor}`}>
        <div className={`w-full bg-gray-200 rounded-full h-4 mr-2`}>
          <div 
            className={`${bgColor} h-4 rounded-full`} 
            style={{ width: `${adherenceRate}%` }}
          ></div>
        </div>
        <span className="font-semibold">{adherenceRate.toFixed(0)}%</span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Relatórios</h1>

        <Tabs defaultValue="medication" onValueChange={setReportType} className="w-full">
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

          <Card className="mt-4 border-t-0">
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
              <CardDescription>Selecione o período para gerar o relatório</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Inicial</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        {startDate ? (
                          format(startDate, "PPP", { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => date && setStartDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Final</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        {endDate ? (
                          format(endDate, "PPP", { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={(date) => date && setEndDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={generatePDF} className="ml-auto">
                <Download className="mr-2 h-4 w-4" />
                Gerar PDF
              </Button>
            </CardFooter>
          </Card>

          <TabsContent value="medication" className="mt-6">
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
          </TabsContent>

          <TabsContent value="financial" className="mt-6">
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
                    <span className="text-lg font-bold">R$ 41,30</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality" className="mt-6">
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
                          {qualityReports.length > 0 
                            ? (qualityReports.reduce((sum, report) => sum + report.adherenceRate, 0) / qualityReports.length).toFixed(0) + '%'
                            : '0%'
                          }
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="py-4">
                        <CardTitle className="text-lg">Total de Doses Tomadas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-center text-green-600">
                          {qualityReports.reduce((sum, report) => sum + report.takenDoses, 0)}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="py-4">
                        <CardTitle className="text-lg">Total de Doses Perdidas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-center text-red-600">
                          {qualityReports.reduce((sum, report) => sum + report.missedDoses, 0)}
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
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;
