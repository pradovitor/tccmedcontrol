
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";

const Caregivers = () => {
  const { user } = useAuth();
  const isPatient = user?.userType === "patient";

  return (
    <Layout>
      <div className="p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">
          {isPatient ? "Meus Cuidadores" : "Meus Pacientes"}
        </h1>
        
        {isPatient ? (
          <PatientView />
        ) : (
          <CaregiverView />
        )}
      </div>
    </Layout>
  );
};

// Visão do paciente - gerenciar cuidadores
const PatientView = () => {
  return (
    <div>
      <Tabs defaultValue="caregivers">
        <TabsList className="mb-4">
          <TabsTrigger value="caregivers">Cuidadores</TabsTrigger>
          <TabsTrigger value="shifts">Turnos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="caregivers">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Lista de Cuidadores</CardTitle>
              <Button>Adicionar Cuidador</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Turno</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Maria Silva</TableCell>
                    <TableCell>(11) 98765-4321</TableCell>
                    <TableCell>Manhã (07:00 - 15:00)</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="destructive" size="sm">Remover</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>João Pereira</TableCell>
                    <TableCell>(11) 91234-5678</TableCell>
                    <TableCell>Noite (23:00 - 07:00)</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="destructive" size="sm">Remover</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shifts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Turnos Configurados</CardTitle>
              <Button>Adicionar Turno</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Dias</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Manhã</TableCell>
                    <TableCell>07:00 - 15:00</TableCell>
                    <TableCell>Seg, Ter, Qua, Qui, Sex</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="destructive" size="sm">Remover</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tarde</TableCell>
                    <TableCell>15:00 - 23:00</TableCell>
                    <TableCell>Seg, Ter, Qua, Qui, Sex</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="destructive" size="sm">Remover</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Noite</TableCell>
                    <TableCell>23:00 - 07:00</TableCell>
                    <TableCell>Todos os dias</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="destructive" size="sm">Remover</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Visão do cuidador - gerenciar pacientes
const CaregiverView = () => {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Meus Pacientes</CardTitle>
          <Button>Adicionar Paciente</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>Medicamentos</TableHead>
                <TableHead>Próxima Medicação</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Ana Souza</TableCell>
                <TableCell>72</TableCell>
                <TableCell>4 medicamentos</TableCell>
                <TableCell>Hoje, 14:00</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="sm">Ver Detalhes</Button>
                  <Button variant="outline" size="sm">Relatórios</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carlos Oliveira</TableCell>
                <TableCell>65</TableCell>
                <TableCell>2 medicamentos</TableCell>
                <TableCell>Hoje, 20:00</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="sm">Ver Detalhes</Button>
                  <Button variant="outline" size="sm">Relatórios</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Caregivers;
