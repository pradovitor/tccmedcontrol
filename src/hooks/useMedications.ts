
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Medication, MedicationFormData } from "@/types/medication";

export const useMedications = () => {
  const [medications, setMedications] = useState<Medication[]>([
    { 
      id: 1, 
      name: "Paracetamol", 
      dosage: "500mg", 
      interval: "6 horas", 
      observations: "Tomar com água",
      price: "R$ 12,90",
      pharmacy: "Drogaria São Paulo"
    },
    { 
      id: 2, 
      name: "Ibuprofeno", 
      dosage: "200mg", 
      interval: "8 horas", 
      observations: "Tomar após as refeições",
      price: "R$ 15,50",
      pharmacy: "Drogasil"
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMedication, setCurrentMedication] = useState<Medication | null>(null);

  const handleSubmit = (data: MedicationFormData) => {
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
    setCurrentMedication(null);
  };

  const handleEdit = (medication: Medication) => {
    setCurrentMedication(medication);
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
    setCurrentMedication(null);
    setIsDialogOpen(true);
  };

  return {
    medications,
    isDialogOpen,
    currentMedication,
    setIsDialogOpen,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleOpenDialog
  };
};
