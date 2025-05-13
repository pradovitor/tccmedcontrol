
import { useState } from "react";
import { Post, GroupInfo } from "@/types/community";
import { useToast } from "@/hooks/use-toast";

export const useCommunity = () => {
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

  return {
    newPostContent,
    setNewPostContent,
    activeTab,
    setActiveTab,
    posts,
    groups,
    handleNewPost,
    handleLike,
    handleJoinGroup
  };
};
