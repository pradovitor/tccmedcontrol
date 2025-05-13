
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyMedicationsStateProps {
  onAddClick: () => void;
}

export const EmptyMedicationsState: React.FC<EmptyMedicationsStateProps> = ({ onAddClick }) => {
  return (
    <div className="text-center py-10">
      <p className="text-muted-foreground">Nenhum medicamento cadastrado ainda.</p>
      <Button className="mt-4" onClick={onAddClick}>
        <Plus className="mr-2 h-4 w-4" />
        Adicionar seu primeiro medicamento
      </Button>
    </div>
  );
};
