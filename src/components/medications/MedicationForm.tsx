
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Medication, MedicationFormData } from "@/types/medication";
import { Upload } from "lucide-react";

interface MedicationFormProps {
  onSubmit: (data: MedicationFormData) => void;
  currentMedication: Medication | null;
}

export const MedicationForm: React.FC<MedicationFormProps> = ({ onSubmit, currentMedication }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(currentMedication?.image || null);

  const form = useForm<MedicationFormData>({
    defaultValues: currentMedication ? {
      name: currentMedication.name,
      dosage: currentMedication.dosage,
      interval: currentMedication.interval,
      observations: currentMedication.observations,
      price: currentMedication.price,
      pharmacy: currentMedication.pharmacy,
      image: currentMedication.image
    } : {
      name: "",
      dosage: "",
      interval: "",
      observations: "",
      price: "",
      pharmacy: "",
      image: ""
    }
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        form.setValue("image", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitWithImage = (data: MedicationFormData) => {
    onSubmit({
      ...data,
      image: imagePreview || undefined
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitWithImage)} className="space-y-4">
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
        
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Imagem do Medicamento</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-3">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <p className="text-sm mb-2">Prévia da imagem:</p>
                      <img 
                        src={imagePreview} 
                        alt="Prévia do medicamento" 
                        className="max-w-[200px] max-h-[200px] object-contain border rounded-md"
                      />
                    </div>
                  )}
                </div>
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
