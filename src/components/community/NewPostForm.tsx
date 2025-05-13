
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface NewPostFormProps {
  content: string;
  onContentChange: (content: string) => void;
  onSubmit: () => void;
}

export const NewPostForm: React.FC<NewPostFormProps> = ({ 
  content, 
  onContentChange, 
  onSubmit 
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Nova Publicação</CardTitle>
        <CardDescription>Compartilhe suas dúvidas ou experiências com a comunidade</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea 
          placeholder="O que você quer compartilhar hoje?" 
          className="min-h-[100px]" 
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={onSubmit} className="ml-auto">Publicar</Button>
      </CardFooter>
    </Card>
  );
};
