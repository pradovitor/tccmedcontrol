
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, Smartphone, WhatsApp } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

type ReminderSettings = {
  enableWhatsApp: boolean;
  phoneNumber: string;
  reminderTime: number;
  customMessage: string;
};

const Reminders = () => {
  const [settings, setSettings] = useState<ReminderSettings>({
    enableWhatsApp: true,
    phoneNumber: "",
    reminderTime: 30,
    customMessage: "Olá! Está na hora de tomar seu medicamento."
  });

  const form = useForm<ReminderSettings>({
    defaultValues: settings
  });

  const onSubmit = (data: ReminderSettings) => {
    setSettings(data);
    toast({
      title: "Configurações salvas",
      description: "Suas preferências de lembretes foram atualizadas."
    });
  };

  const generateTestMessage = () => {
    let phoneNumber = settings.phoneNumber.replace(/\D/g, "");
    // Se o número não começar com +55, adicione o código do Brasil
    if (!phoneNumber.startsWith("55")) {
      phoneNumber = "55" + phoneNumber;
    }
    
    const message = encodeURIComponent(
      `${settings.customMessage} (Mensagem de teste)`
    );
    
    // Use a API do WhatsApp para abrir o app com o número e mensagem
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`, '_blank');
    
    toast({
      title: "Teste de WhatsApp",
      description: "Abrindo WhatsApp com a mensagem de teste."
    });
  };

  const testDirectWhatsApp = () => {
    // Abre o WhatsApp diretamente sem número específico
    const message = encodeURIComponent(
      `${settings.customMessage} (Mensagem de teste direta)`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Configuração de Lembretes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <WhatsApp className="mr-2 h-5 w-5 text-green-500" />
                Lembretes via WhatsApp
              </CardTitle>
              <CardDescription>
                Configure como deseja receber seus lembretes via WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="enableWhatsApp"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Ativar Lembretes via WhatsApp</FormLabel>
                          <FormDescription>
                            Receba lembretes no WhatsApp quando for hora de tomar seus medicamentos.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número do WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: (11) 98765-4321" {...field} />
                        </FormControl>
                        <FormDescription>
                          Informe o número que receberá os lembretes (com DDD)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reminderTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tempo de Antecedência (minutos)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            max={60}
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Quanto tempo antes você deseja receber o lembrete
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="customMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem Personalizada</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Digite a mensagem de lembrete"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Personalize a mensagem que você receberá nos lembretes
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button type="submit">Salvar Configurações</Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={generateTestMessage}
                      className="flex items-center"
                    >
                      <Smartphone className="mr-2 h-4 w-4" />
                      Testar com Número
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={testDirectWhatsApp}
                      className="flex items-center"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Testar Sem Número
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalhes dos Lembretes</CardTitle>
                <CardDescription>
                  Como funciona o sistema de lembretes do MedControl
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>O MedControl utiliza o WhatsApp para enviar lembretes sobre seus medicamentos, ajudando você a não esquecer de tomá-los no horário correto.</p>
                  
                  <h3 className="text-lg font-semibold mt-4">Como funciona:</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Configure seus medicamentos na seção "Medicamentos"</li>
                    <li>Defina os horários na seção "Agendamentos"</li>
                    <li>Quando for hora de tomar o medicamento, você receberá um link para abrir o WhatsApp</li>
                    <li>O sistema não envia mensagens automaticamente, apenas gera links para facilitar o envio</li>
                  </ol>
                  
                  <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mt-4">
                    <p className="text-yellow-800">
                      <strong>Observação:</strong> Para idosos ou pessoas com dificuldades no uso de tecnologia, 
                      recomendamos configurar o aplicativo com ajuda de um cuidador ou familiar.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reminders;
