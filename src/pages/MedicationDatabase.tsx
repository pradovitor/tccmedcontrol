
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { PillIcon } from "lucide-react";

type Medication = {
  id: number;
  name: string;
  generic: string;
  classification: string;
  usage: string;
  sideEffects: string[];
  interactions: string[];
  dosage: string;
  isFavorite: boolean;
};

const MedicationDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  // Banco de dados simulado de medicamentos
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: "Losartana Potássica",
      generic: "Losartana",
      classification: "Anti-hipertensivo",
      usage: "Tratamento de pressão alta e insuficiência cardíaca",
      sideEffects: ["Tontura", "Dor de cabeça", "Fadiga", "Tosse seca"],
      interactions: ["AINEs", "Suplementos de potássio", "Lítio"],
      dosage: "25-100mg uma vez ao dia",
      isFavorite: false
    },
    {
      id: 2,
      name: "Glifage XR",
      generic: "Metformina",
      classification: "Antidiabético",
      usage: "Controle de diabetes tipo 2",
      sideEffects: ["Diarreia", "Náusea", "Desconforto abdominal", "Gosto metálico na boca"],
      interactions: ["Cimetidina", "Corticosteroides", "Diuréticos"],
      dosage: "500-2500mg por dia, dividido em doses",
      isFavorite: false
    },
    {
      id: 3,
      name: "Sinvastatina",
      generic: "Sinvastatina",
      classification: "Estatina",
      usage: "Redução do colesterol e prevenção de doenças cardiovasculares",
      sideEffects: ["Dores musculares", "Dor de cabeça", "Distúrbios digestivos", "Insônia"],
      interactions: ["Amiodarona", "Ciclosporina", "Diltiazem", "Suco de toranja"],
      dosage: "5-40mg uma vez ao dia, à noite",
      isFavorite: false
    },
    {
      id: 4,
      name: "Puran T4",
      generic: "Levotiroxina",
      classification: "Hormônio tireoidiano",
      usage: "Tratamento de hipotireoidismo",
      sideEffects: ["Palpitações", "Insônia", "Tremores", "Aumento da sudorese"],
      interactions: ["Antiácidos", "Sertralina", "Carbamazepina", "Fenitoína"],
      dosage: "25-200mcg uma vez ao dia, em jejum",
      isFavorite: false
    },
    {
      id: 5,
      name: "Rivotril",
      generic: "Clonazepam",
      classification: "Benzodiazepínico",
      usage: "Tratamento de distúrbios de ansiedade e convulsões",
      sideEffects: ["Sonolência", "Tontura", "Fadiga", "Problemas de coordenação"],
      interactions: ["Álcool", "Outros depressores do SNC", "Antidepressivos"],
      dosage: "0.5-2mg duas ou três vezes ao dia",
      isFavorite: false
    }
  ]);

  const handleFavoriteToggle = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, isFavorite: !med.isFavorite } : med
    ));
  };

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          med.generic.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "favorites") return matchesSearch && med.isFavorite;
    
    return matchesSearch && med.classification.toLowerCase() === activeTab;
  });

  // Obter categorias únicas para as abas
  const categories = [...new Set(medications.map(med => med.classification))];

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Banco de Dados de Medicamentos</h1>
        
        <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
          <div className="w-full md:w-2/3">
            <Input
              placeholder="Pesquisar medicamento por nome ou princípio ativo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12"
            />
          </div>
          <Button className="w-full md:w-auto">
            Pesquisar
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full overflow-x-auto flex whitespace-nowrap pb-1">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="favorites">Favoritos</TabsTrigger>
            {categories.map((category, index) => (
              <TabsTrigger key={index} value={category.toLowerCase()}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Todos os Medicamentos</CardTitle>
                <CardDescription>
                  Lista completa de medicamentos no banco de dados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderMedicationTable(filteredMedications, handleFavoriteToggle)}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Medicamentos Favoritos</CardTitle>
                <CardDescription>
                  Seus medicamentos marcados como favoritos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredMedications.length > 0 ? (
                  renderMedicationTable(filteredMedications, handleFavoriteToggle)
                ) : (
                  <div className="text-center py-8">
                    <PillIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-lg text-muted-foreground">
                      Você ainda não tem medicamentos favoritos
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {categories.map((category, index) => (
            <TabsContent key={index} value={category.toLowerCase()} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                  <CardDescription>
                    Medicamentos classificados como {category.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredMedications.length > 0 ? (
                    renderMedicationTable(filteredMedications, handleFavoriteToggle)
                  ) : (
                    <p className="text-center py-4 text-muted-foreground">
                      Nenhum medicamento encontrado nesta categoria com o termo de busca.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

function renderMedicationTable(medications: Medication[], onFavoriteToggle: (id: number) => void) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Favorito</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Princípio Ativo</TableHead>
            <TableHead>Classificação</TableHead>
            <TableHead>Dosagem</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medications.map((med) => (
            <TableRow key={med.id} className="cursor-pointer" onClick={() => {}}>
              <TableCell>
                <Checkbox 
                  checked={med.isFavorite} 
                  onCheckedChange={() => onFavoriteToggle(med.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </TableCell>
              <TableCell className="font-medium">{med.name}</TableCell>
              <TableCell>{med.generic}</TableCell>
              <TableCell>{med.classification}</TableCell>
              <TableCell>{med.dosage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default MedicationDatabase;
