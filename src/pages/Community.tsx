
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, Users, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Post = {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: Date;
  likes: number;
  comments: number;
  category: "geral" | "medicamentos" | "cuidadores";
};

type GroupInfo = {
  id: number;
  name: string;
  members: number;
  category: string;
  description: string;
};

const Community = () => {
  const { toast } = useToast();
  const [newPostContent, setNewPostContent] = useState("");
  const [activeTab, setActiveTab] = useState("forum");
  
  // Dados de exemplo para o fórum
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Maria Silva",
      avatar: "MS",
      content: "Alguém tem alguma dica para lembrar de tomar medicamentos à noite? Sempre esqueço meu Losartana.",
      date: new Date(Date.now() - 2 * 86400000),
      likes: 5,
      comments: 3,
      category: "medicamentos"
    },
    {
      id: 2,
      author: "João Pereira",
      avatar: "JP",
      content: "Descobri uma farmácia que faz entrega gratuita para idosos. Alguém já usou o serviço da Drogaria São Paulo?",
      date: new Date(Date.now() - 1 * 86400000),
      likes: 8,
      comments: 6,
      category: "geral"
    },
    {
      id: 3,
      author: "Ana Rodrigues",
      avatar: "AR",
      content: "Estou procurando cuidador(a) para meu pai que tem Alzheimer. Alguém pode recomendar profissionais confiáveis?",
      date: new Date(),
      likes: 3,
      comments: 4,
      category: "cuidadores"
    }
  ]);

  // Dados de exemplo para grupos
  const groups: GroupInfo[] = [
    {
      id: 1,
      name: "Viver Melhor com Diabetes",
      members: 342,
      category: "Condição Específica",
      description: "Grupo para pessoas com diabetes compartilharem experiências e dicas sobre medicamentos e rotina."
    },
    {
      id: 2,
      name: "Cuidadores Unidos",
      members: 189,
      category: "Cuidadores",
      description: "Rede de apoio para cuidadores de idosos trocarem experiências e darem suporte emocional."
    },
    {
      id: 3,
      name: "Economia em Medicamentos",
      members: 256,
      category: "Medicamentos",
      description: "Compartilhamento de informações sobre descontos, programas sociais e alternativas para economizar."
    }
  ];

  const handleNewPost = () => {
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: posts.length + 1,
        author: "Você",
        avatar: "VC",
        content: newPostContent,
        date: new Date(),
        likes: 0,
        comments: 0,
        category: "geral"
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      toast({
        title: "Publicação enviada",
        description: "Sua mensagem foi publicada no fórum."
      });
    }
  };

  const handleLike = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, likes: post.likes + 1 } 
        : post
    ));
  };

  const handleJoinGroup = (groupId: number) => {
    toast({
      title: "Grupo adicionado",
      description: "Você agora é membro deste grupo."
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Comunidade</h1>

        <Tabs defaultValue="forum" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="forum" className="flex items-center">
              <MessageCircle className="mr-2 h-4 w-4" />
              Fórum
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Grupos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forum" className="mt-6">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle>Nova Publicação</CardTitle>
                <CardDescription>Compartilhe suas dúvidas ou experiências com a comunidade</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="O que você quer compartilhar hoje?" 
                  className="min-h-[100px]" 
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </CardContent>
              <CardFooter>
                <Button onClick={handleNewPost} className="ml-auto">Publicar</Button>
              </CardFooter>
            </Card>

            <div className="space-y-4">
              {posts.map(post => (
                <Card key={post.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                          {post.avatar}
                        </div>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{post.author}</CardTitle>
                        <CardDescription>
                          {post.date.toLocaleDateString('pt-BR')} · {post.category}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p>{post.content}</p>
                  </CardContent>
                  <CardFooter className="pt-0 border-t bg-muted/40 px-4 py-3">
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <button 
                        className="flex items-center gap-1 hover:text-primary"
                        onClick={() => handleLike(post.id)}
                      >
                        👍 {post.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary">
                        <MessageSquare className="h-4 w-4" /> {post.comments}
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groups" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groups.map(group => (
                <Card key={group.id}>
                  <CardHeader>
                    <CardTitle>{group.name}</CardTitle>
                    <CardDescription>{group.category} • {group.members} membros</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{group.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleJoinGroup(group.id)}
                    >
                      Participar do Grupo
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Community;
