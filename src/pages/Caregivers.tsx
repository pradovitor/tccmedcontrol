
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Users } from "lucide-react";

type Caregiver = {
  id: number;
  name: string;
  phone: string;
  email: string;
  shift: string;
  notes: string;
};

type CaregiverFormData = {
  name: string;
  phone: string;
  email: string;
  shift: string;
  notes: string;
};

const Caregivers = () => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([
    { 
      id: 1, 
      name: "Maria Silva", 
      phone: "(11) 98765-4321", 
      email: "maria.silva@example.com", 
      shift: "Manhã",
      notes: "Enfermeira particular, disponível de segunda a sexta"
    },
    { 
      id: 2, 
      name: "João Oliveira", 
      phone: "(11) 91234-5678", 
      email: "joao.oliveira@example.com", 
      shift: "Noite",
      notes: "Cuidador profissional, disponível de quarta a domingo"
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCaregiver, setCurrentCaregiver] = useState<Caregiver | null>(null);
  
  const form = useForm<CaregiverFormData>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      shift: "",
      notes: ""
    }
  });

  const onSubmit = (data: CaregiverFormData) => {
    if (currentCaregiver) {
      // Editar cuidador existente
      const updatedCaregivers = caregivers.map(caregiver => 
        caregiver.id === currentCaregiver.id ? { ...caregiver, ...data } : caregiver
      );
      setCaregivers(updatedCaregivers);
      toast({
        title: "Cuidador atualizado",
        description: `${data.name} foi atualizado com sucesso.`
      });
    } else {
      // Adicionar novo cuidador
      const newCaregiver = {
        id: caregivers.length > 0 ? Math.max(...caregivers.map(c => c.id)) + 1 : 1,
        ...data
      };
      setCaregivers([...caregivers, newCaregiver]);
      toast({
        title: "Cuidador adicionado",
        description: `${data.name} foi adicionado com sucesso.`
      });
    }
    setIsDialogOpen(false);
    form.reset();
    setCurrentCaregiver(null);
  };

  const handleEdit = (caregiver: Caregiver) => {
    setCurrentCaregiver(caregiver);
    form.reset({
      name: caregiver.name,
      phone: caregiver.phone,
      email: caregiver.email,
      shift: caregiver.shift,
      notes: caregiver.notes
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setCaregivers(caregivers.filter(caregiver => caregiver.id !== id));
    toast({
      title: "Cuidador removido",
      description: "O cuidador foi removido com sucesso."
    });
  };

  const handleOpenDialog = () => {
    form.reset({
      name: "",
      phone: "",
      email: "",
      shift: "",
      notes: ""
    });
    setCurrentCaregiver(null);
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Meus Cuidadores</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Cuidador
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {currentCaregiver ? "Editar Cuidador" : "Adicionar Cuidador"}
                </DialogTitle>
                <DialogDescription>
                  {currentCaregiver
                    ? "Edite os detalhes do cuidador abaixo."
                    : "Preencha os detalhes do novo cuidador abaixo."}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Cuidador</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Maria Silva" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: (11) 98765-4321" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: nome@exemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="shift"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Turno</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um turno" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Manhã">Manhã</SelectItem>
                            <SelectItem value="Tarde">Tarde</SelectItem>
                            <SelectItem value="Noite">Noite</SelectItem>
                            <SelectItem value="Integral">Integral</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observações</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Disponibilidade, especialidades, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">
                      {currentCaregiver ? "Salvar Alterações" : "Adicionar"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {caregivers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Turno</TableHead>
                <TableHead>Observações</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caregivers.map((caregiver) => (
                <TableRow key={caregiver.id}>
                  <TableCell className="font-medium">{caregiver.name}</TableCell>
                  <TableCell>{caregiver.phone}</TableCell>
                  <TableCell>{caregiver.email}</TableCell>
                  <TableCell>{caregiver.shift}</TableCell>
                  <TableCell>{caregiver.notes}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(caregiver)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(caregiver.id)}
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
            <p className="text-muted-foreground">Nenhum cuidador cadastrado ainda.</p>
            <Button className="mt-4" onClick={handleOpenDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar seu primeiro cuidador
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Caregivers;
