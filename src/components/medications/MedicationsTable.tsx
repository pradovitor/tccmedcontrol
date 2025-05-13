
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Medication } from "@/types/medication";

interface MedicationsTableProps {
  medications: Medication[];
  onEdit: (medication: Medication) => void;
  onDelete: (id: number) => void;
}

export const MedicationsTable: React.FC<MedicationsTableProps> = ({ medications, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Dosagem</TableHead>
          <TableHead>Intervalo</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Farmácia</TableHead>
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
            <TableCell>{med.price}</TableCell>
            <TableCell>{med.pharmacy}</TableCell>
            <TableCell>{med.observations}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(med)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(med.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
