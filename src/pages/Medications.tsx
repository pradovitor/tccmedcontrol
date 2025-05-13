
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { useMedications } from "@/hooks/useMedications";
import { MedicationsTable } from "@/components/medications/MedicationsTable";
import { EmptyMedicationsState } from "@/components/medications/EmptyMedicationsState";
import { MedicationDialog } from "@/components/medications/MedicationDialog";

const Medications = () => {
  const {
    medications,
    isDialogOpen,
    currentMedication,
    setIsDialogOpen,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleOpenDialog
  } = useMedications();

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Meus Medicamentos</h1>
          <MedicationDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onOpenDialog={handleOpenDialog}
            onSubmit={handleSubmit}
            currentMedication={currentMedication}
          />
        </div>

        {medications.length > 0 ? (
          <MedicationsTable 
            medications={medications} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ) : (
          <EmptyMedicationsState onAddClick={handleOpenDialog} />
        )}
      </div>
    </Layout>
  );
};

export default Medications;
