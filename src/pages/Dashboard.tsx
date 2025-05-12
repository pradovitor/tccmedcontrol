
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { Calendar, Bell, PillIcon } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Painel de Controle</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PillIcon className="mr-2 h-5 w-5" />
                Meus Medicamentos
              </CardTitle>
              <CardDescription>Gerencie seus medicamentos</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Adicione, edite e visualize seus medicamentos cadastrados.</p>
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
              <CardDescription>Controle seus horários de medicação</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Configure os horários e receba lembretes para seus medicamentos.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate("/agendamentos")}>Gerenciar Agendamentos</Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Lembretes
              </CardTitle>
              <CardDescription>Configurar notificações</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Configure lembretes via WhatsApp e outras configurações.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate("/lembretes")}>Gerenciar Lembretes</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
