import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { FileText, Download, AlertTriangle, BarChart, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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

const Reports = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [reportType, setReportType] = useState("medication");

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

  // Função para gerar relatório em PDF (simulação)
  const generatePDF = () => {
    alert("Relatório gerado! Em uma implementação real, isso baixaria um PDF.");
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Relatórios</h1>

        <Tabs defaultValue="medication" onValueChange={setReportType} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="medication" className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              Relatório de Medicação
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              Relatório Financeiro
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
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;
