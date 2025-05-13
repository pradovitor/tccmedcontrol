
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Medication, MedicationFormData } from "@/types/medication";

interface MedicationFormProps {
  onSubmit: (data: MedicationFormData) => void;
  currentMedication: Medication | null;
}

export const MedicationForm: React.FC<MedicationFormProps> = ({ onSubmit, currentMedication }) => {
  const form = useForm<MedicationFormData>({
    defaultValues: currentMedication ? {
      name: currentMedication.name,
      dosage: currentMedication.dosage,
      interval: currentMedication.interval,
      observations: currentMedication.observations,
      price: currentMedication.price,
      pharmacy: currentMedication.pharmacy
    } : {
      name: "",
      dosage: "",
      interval: "",
      observations: "",
      price: "",
      pharmacy: ""
    }
  });

  return (
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: R$ 12,90" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pharmacy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farmácia</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Drogaria São Paulo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
  );
};
