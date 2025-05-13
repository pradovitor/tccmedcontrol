
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarIcon, Clock, Plus, Trash2, MessageSquare, CheckCircle, XCircle, BellRing } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type Schedule = {
  id: number;
  medicationId: number;
  medicationName: string;
  time: string;
  date: Date;
  status: "pending" | "completed" | "missed";
  alerted: boolean;
};

type ScheduleFormData = {
  medicationId: string;
  date: Date;
  time: string;
};

const determineTimeColor = (time: string): "morning" | "afternoon" | "night" => {
  const hour = parseInt(time.split(":")[0]);
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  return "night";
};

const Schedules = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      medicationId: 1,
      medicationName: "Paracetamol",
      time: "08:00",
      date: new Date(),
      status: "pending",
      alerted: true
    },
    {
      id: 2,
      medicationId: 2,
      medicationName: "Ibuprofeno",
      time: "14:00",
      date: new Date(),
      status: "pending",
      alerted: true
    },
    {
      id: 3,
      medicationId: 1,
      medicationName: "Paracetamol",
      time: "20:00",
      date: new Date(),
      status: "pending",
      alerted: false
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState<number[]>([1, 2]);
  
  const medications = [
    { id: 1, name: "Paracetamol" },
    { id: 2, name: "Ibuprofeno" }
  ];

  const form = useForm<ScheduleFormData>({
    defaultValues: {
      date: new Date(),
      time: "08:00"
    }
  });

  const onSubmit = (data: ScheduleFormData) => {
    // Encontrar o nome do medicamento
    const medication = medications.find(med => med.id === parseInt(data.medicationId));
    if (!medication) return;

    const newSchedule = {
      id: schedules.length > 0 ? Math.max(...schedules.map(s => s.id)) + 1 : 1,
      medicationId: parseInt(data.medicationId),
      medicationName: medication.name,
      date: data.date,
      time: data.time,
      status: "pending" as const,
      alerted: false
    };

    setSchedules([...schedules, newSchedule]);
    toast({
      title: "Agendamento criado",
      description: `${medication.name} agendado para ${format(data.date, "dd/MM/yyyy")} às ${data.time}`
    });
    setIsDialogOpen(false);
    form.reset();
  };

  const handleDelete = (id: number) => {
    // Remover do array de alertas ativos se estiver lá
    if (activeAlerts.includes(id)) {
      setActiveAlerts(activeAlerts.filter(alertId => alertId !== id));
    }
    
    // Remover o agendamento
    setSchedules(schedules.filter(schedule => schedule.id !== id));
    
    toast({
      title: "Agendamento removido",
      description: "O agendamento foi removido com sucesso."
    });
  };

  const generateWhatsAppLink = (schedule: Schedule) => {
    const message = encodeURIComponent(
      `Lembrete de medicação: ${schedule.medicationName} - ${format(schedule.date, "dd/MM/yyyy")} às ${schedule.time}`
    );
    return `https://wa.me/?text=${message}`;
  };

  const handleStatusChange = (id: number, newStatus: "completed" | "missed") => {
    setSchedules(schedules.map(schedule => {
      if (schedule.id === id) {
        // Se estava na lista de alertas ativos, removê-lo
        if (activeAlerts.includes(id)) {
          setActiveAlerts(activeAlerts.filter(alertId => alertId !== id));
        }
        
        return { ...schedule, status: newStatus };
      }
      return schedule;
    }));
    
    toast({
      title: newStatus === "completed" ? "Medicamento tomado" : "Medicamento não tomado",
      description: newStatus === "completed" 
        ? "Registro atualizado com sucesso!" 
        : "Registramos que o medicamento não foi tomado."
    });
  };

  const filteredSchedules = schedules.filter(
    schedule => 
      schedule.date.getDate() === selectedDate.getDate() &&
      schedule.date.getMonth() === selectedDate.getMonth() &&
      schedule.date.getFullYear() === selectedDate.getFullYear()
  );

  // Função para simular um novo alerta
  const simulateNewAlert = () => {
    const pendingSchedules = schedules.filter(s => s.status === "pending" && !s.alerted);
    if (pendingSchedules.length > 0) {
      const scheduleId = pendingSchedules[0].id;
      
      // Marcar como alertado
      setSchedules(schedules.map(schedule => {
        if (schedule.id === scheduleId) {
          return { ...schedule, alerted: true };
        }
        return schedule;
      }));
      
      // Adicionar à lista de alertas ativos
      if (!activeAlerts.includes(scheduleId)) {
        setActiveAlerts([...activeAlerts, scheduleId]);
      }
      
      toast({
        title: "Novo alerta de medicação",
        description: `Está na hora de tomar ${pendingSchedules[0].medicationName} (${pendingSchedules[0].time})`,
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">Agendamentos</h1>
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <Button variant="outline" onClick={simulateNewAlert} className="w-full md:w-auto">
              <BellRing className="mr-2 h-5 w-5" />
              Simular Alerta
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto">
                  <Plus className="mr-2 h-5 w-5" />
                  Novo Agendamento
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Adicionar Agendamento</DialogTitle>
                  <DialogDescription className="text-lg">
                    Agende um horário para tomar seu medicamento.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="medicationId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Medicamento</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 text-base">
                                <SelectValue placeholder="Selecione um medicamento" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {medications.map(med => (
                                <SelectItem 
                                  key={med.id} 
                                  value={med.id.toString()}
                                  className="text-base py-3"
                                >
                                  {med.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-base" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-lg">Data</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full h-12 pl-3 text-left font-normal text-base",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP", { locale: ptBR })
                                  ) : (
                                    <span>Selecione uma data</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage className="text-base" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Horário</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} className="h-12 text-base" />
                          </FormControl>
                          <FormMessage className="text-base" />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit" size="lg">Adicionar</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {activeAlerts.length > 0 && (
          <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
            <BellRing className="h-5 w-5 text-red-500" />
            <AlertDescription className="text-lg">
              Você tem {activeAlerts.length} medicamento{activeAlerts.length > 1 ? 's' : ''} aguardando confirmação!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Calendário</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single" 
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="pointer-events-auto"
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">
                Agendamentos para {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredSchedules.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-base">Medicamento</TableHead>
                        <TableHead className="text-base">Horário</TableHead>
                        <TableHead className="text-base">Status</TableHead>
                        <TableHead className="text-base">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSchedules.map((schedule) => {
                        const timeColor = determineTimeColor(schedule.time);
                        const isAlertActive = activeAlerts.includes(schedule.id);
                        
                        return (
                          <TableRow 
                            key={schedule.id} 
                            className={cn(
                              isAlertActive && "bg-red-50 animate-pulse"
                            )}
                          >
                            <TableCell className="text-base font-medium">{schedule.medicationName}</TableCell>
                            <TableCell className="flex items-center text-base">
                              <Clock 
                                className={cn(
                                  "mr-2 h-5 w-5",
                                  timeColor === "morning" && "text-blue-500",
                                  timeColor === "afternoon" && "text-orange-500",
                                  timeColor === "night" && "text-purple-700"
                                )}
                              />
                              <span className={cn(
                                "py-1 px-3 rounded-full",
                                timeColor === "morning" && "bg-blue-100 text-blue-800",
                                timeColor === "afternoon" && "bg-orange-100 text-orange-800",
                                timeColor === "night" && "bg-purple-100 text-purple-800"
                              )}>
                                {schedule.time}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={cn(
                                "text-base px-3 py-1 rounded-full inline-block",
                                schedule.status === "completed" ? "bg-green-100 text-green-800" :
                                schedule.status === "missed" ? "bg-red-100 text-red-800" :
                                "bg-yellow-100 text-yellow-800"
                              )}>
                                {
                                  schedule.status === "completed" ? "Completado" :
                                  schedule.status === "missed" ? "Não tomado" :
                                  "Pendente"
                                }
                              </span>
                            </TableCell>
                            <TableCell className="space-y-2 md:space-y-0 md:space-x-2">
                              {schedule.status === "pending" && (
                                <div className="flex flex-col md:flex-row gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleStatusChange(schedule.id, "completed")}
                                    className="bg-green-50 border-green-200 hover:bg-green-100 h-11"
                                  >
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                    <span>Tomei</span>
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleStatusChange(schedule.id, "missed")}
                                    className="bg-red-50 border-red-200 hover:bg-red-100 h-11"
                                  >
                                    <XCircle className="h-5 w-5 text-red-600 mr-2" />
                                    <span>Não tomei</span>
                                  </Button>
                                </div>
                              )}
                              <div className="flex flex-col md:flex-row gap-2">
                                <a 
                                  href={generateWhatsAppLink(schedule)} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="inline-flex items-center justify-center h-11 rounded-md px-4 text-base bg-green-500 text-white hover:bg-green-600"
                                >
                                  <MessageSquare className="mr-1 h-5 w-5" />
                                  Lembrete
                                </a>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete(schedule.id)}
                                  className="h-11"
                                >
                                  <Trash2 className="h-5 w-5 text-red-500" />
                                  <span className="md:ml-2">Remover</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-lg text-muted-foreground">Nenhum agendamento para esta data.</p>
                  <Button className="mt-6" size="lg" onClick={() => setIsDialogOpen(true)}>
                    <Plus className="mr-2 h-5 w-5" />
                    Adicionar agendamento
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Schedules;
