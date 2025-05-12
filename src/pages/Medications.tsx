
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

type Medication = {
  id: number;
  name: string;
  dosage: string;
  interval: string;
  observations: string;
};

type MedicationFormData = {
  name: string;
  dosage: string;
  interval: string;
  observations: string;
};

const Medications = () => {
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: "Paracetamol", dosage: "500mg", interval: "6 horas", observations: "Tomar com água" },
    { id: 2, name: "Ibuprofeno", dosage: "200mg", interval: "8 horas", observations: "Tomar após as refeições" }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMedication, setCurrentMedication] = useState<Medication | null>(null);
  
  const form = useForm<MedicationFormData>({
    defaultValues: {
      name: "",
      dosage: "",
      interval: "",
      observations: ""
    }
  });

  const onSubmit = (data: MedicationFormData) => {
    if (currentMedication) {
      // Editar medicamento existente
      const updatedMedications = medications.map(med => 
        med.id === currentMedication.id ? { ...med, ...data } : med
      );
      setMedications(updatedMedications);
      toast({
        title: "Medicamento atualizado",
        description: `${data.name} foi atualizado com sucesso.`
      });
    } else {
      // Adicionar novo medicamento
      const newMedication = {
        id: medications.length > 0 ? Math.max(...medications.map(m => m.id)) + 1 : 1,
        ...data
      };
      setMedications([...medications, newMedication]);
      toast({
        title: "Medicamento adicionado",
        description: `${data.name} foi adicionado com sucesso.`
      });
    }
    setIsDialogOpen(false);
    form.reset();
    setCurrentMedication(null);
  };

  const handleEdit = (medication: Medication) => {
    setCurrentMedication(medication);
    form.reset({
      name: medication.name,
      dosage: medication.dosage,
      interval: medication.interval,
      observations: medication.observations
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setMedications(medications.filter(med => med.id !== id));
    toast({
      title: "Medicamento removido",
      description: "O medicamento foi removido com sucesso."
    });
  };

  const handleOpenDialog = () => {
    form.reset({
      name: "",
      dosage: "",
      interval: "",
      observations: ""
    });
    setCurrentMedication(null);
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Meus Medicamentos</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Medicamento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {currentMedication ? "Editar Medicamento" : "Adicionar Medicamento"}
                </DialogTitle>
                <DialogDescription>
                  {currentMedication
                    ? "Edite os detalhes do medicamento abaixo."
                    : "Preencha os detalhes do novo medicamento abaixo."}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Medicamento</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Paracetamol" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dosage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dosagem</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 500mg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="interval"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Intervalo</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 8 horas" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="observations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observações</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ex: Tomar após as refeições"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">
                      {currentMedication ? "Salvar Alterações" : "Adicionar"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {medications.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Dosagem</TableHead>
                <TableHead>Intervalo</TableHead>
                <TableHead>Observações</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medications.map((med) => (
                <TableRow key={med.id}>
                  <TableCell className="font-medium">{med.name}</TableCell>
                  <TableCell>{med.dosage}</TableCell>
                  <TableCell>{med.interval}</TableCell>
                  <TableCell>{med.observations}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(med)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(med.id)}
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
            <p className="text-muted-foreground">Nenhum medicamento cadastrado ainda.</p>
            <Button className="mt-4" onClick={handleOpenDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar seu primeiro medicamento
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Medications;
