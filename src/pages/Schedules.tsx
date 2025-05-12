
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
import { CalendarIcon, Clock, Plus, Trash2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type Schedule = {
  id: number;
  medicationId: number;
  medicationName: string;
  time: string;
  date: Date;
  status: "pending" | "completed" | "missed";
};

type ScheduleFormData = {
  medicationId: string;
  date: Date;
  time: string;
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
      status: "pending"
    },
    {
      id: 2,
      medicationId: 2,
      medicationName: "Ibuprofeno",
      time: "14:00",
      date: new Date(),
      status: "pending"
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
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
      status: "pending" as const
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

  const filteredSchedules = schedules.filter(
    schedule => 
      schedule.date.getDate() === selectedDate.getDate() &&
      schedule.date.getMonth() === selectedDate.getMonth() &&
      schedule.date.getFullYear() === selectedDate.getFullYear()
  );

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">Agendamentos</h1>
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
                      {filteredSchedules.map((schedule) => (
                        <TableRow key={schedule.id}>
                          <TableCell className="text-base font-medium">{schedule.medicationName}</TableCell>
                          <TableCell className="flex items-center text-base">
                            <Clock className="mr-2 h-5 w-5" />
                            {schedule.time}
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
                                schedule.status === "missed" ? "Perdido" :
                                "Pendente"
                              }
                            </span>
                          </TableCell>
                          <TableCell className="space-x-2">
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
                              className="ml-2 h-11"
                            >
                              <Trash2 className="h-5 w-5 text-red-500" />
                              <span className="sr-only md:not-sr-only md:ml-2">Remover</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
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
