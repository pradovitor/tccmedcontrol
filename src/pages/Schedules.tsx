
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Agendamentos</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Agendamento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Adicionar Agendamento</DialogTitle>
                <DialogDescription>
                  Agende um horário para tomar seu medicamento.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="medicationId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medicamento</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um medicamento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {medications.map(med => (
                              <SelectItem key={med.id} value={med.id.toString()}>
                                {med.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: ptBR })
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horário</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Adicionar</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
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
              <CardTitle>
                Agendamentos para {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredSchedules.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medicamento</TableHead>
                      <TableHead>Horário</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSchedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell>{schedule.medicationName}</TableCell>
                        <TableCell className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {schedule.time}
                        </TableCell>
                        <TableCell>
                          <span className={
                            schedule.status === "completed" ? "text-green-500" :
                            schedule.status === "missed" ? "text-red-500" :
                            "text-yellow-500"
                          }>
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
                            className="inline-flex items-center justify-center h-9 rounded-md px-3 text-xs bg-green-500 text-white"
                          >
                            <MessageSquare className="mr-1 h-4 w-4" />
                            Lembrete
                          </a>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(schedule.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Nenhum agendamento para esta data.</p>
                  <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
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
