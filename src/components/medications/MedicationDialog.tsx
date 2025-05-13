
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MedicationForm } from "./MedicationForm";
import { Medication, MedicationFormData } from "@/types/medication";

interface MedicationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenDialog: () => void;
  onSubmit: (data: MedicationFormData) => void;
  currentMedication: Medication | null;
}

export const MedicationDialog: React.FC<MedicationDialogProps> = ({
  isOpen,
  onOpenChange,
  onOpenDialog,
  onSubmit,
  currentMedication
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={onOpenDialog}>
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
        <MedicationForm onSubmit={onSubmit} currentMedication={currentMedication} />
      </DialogContent>
    </Dialog>
  );
};
