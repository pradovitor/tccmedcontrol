
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { Calendar, Bell, PillIcon, Users, FileText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isPatient = user?.userType === "patient";

  return (
    <Layout>
      <div className="p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-2">Painel de Controle</h1>
        <p className="text-muted-foreground mb-6">
          Bem-vindo, {user?.name}! Você está conectado como {isPatient ? "paciente" : "cuidador"}.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PillIcon className="mr-2 h-5 w-5" />
                Meus Medicamentos
              </CardTitle>
              <CardDescription>
                {isPatient ? "Gerencie seus medicamentos" : "Veja os medicamentos dos seus pacientes"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                {isPatient 
                  ? "Adicione, edite e visualize seus medicamentos cadastrados."
                  : "Visualize e monitore os medicamentos dos seus pacientes."}
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate("/medicamentos")}>Gerenciar Medicamentos</Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Agendamentos
              </CardTitle>
              <CardDescription>
                {isPatient 
                  ? "Controle seus horários de medicação" 
                  : "Verifique os agendamentos dos pacientes"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                {isPatient
                  ? "Configure os horários e receba lembretes para seus medicamentos."
                  : "Monitore os horários de medicação dos seus pacientes."}
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate("/agendamentos")}>
                {isPatient ? "Gerenciar Agendamentos" : "Ver Agendamentos"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Lembretes
              </CardTitle>
              <CardDescription>
                {isPatient 
                  ? "Configurar notificações" 
                  : "Gerenciar notificações dos pacientes"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                {isPatient
                  ? "Configure lembretes via WhatsApp e outras configurações."
                  : "Configure lembretes para seus pacientes e receba alertas."}
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate("/lembretes")}>
                {isPatient ? "Gerenciar Lembretes" : "Configurar Alertas"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                {isPatient ? "Cuidadores" : "Pacientes"}
              </CardTitle>
              <CardDescription>
                {isPatient ? "Gerenciar cuidadores" : "Gerenciar pacientes"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                {isPatient
                  ? "Adicione e gerencie seus cuidadores, turnos e contatos."
                  : "Visualize e gerencie seus pacientes e seus dados."}
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate("/cuidadores")}>
                {isPatient ? "Gerenciar Cuidadores" : "Gerenciar Pacientes"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Relatórios
              </CardTitle>
              <CardDescription>Gerar relatórios</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                {isPatient
                  ? "Visualize relatórios de medicação e gastos com medicamentos."
                  : "Gere relatórios de aderência e gastos dos seus pacientes."}
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate("/relatorios")}>
                {isPatient ? "Ver Relatórios" : "Gerar Relatórios"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
