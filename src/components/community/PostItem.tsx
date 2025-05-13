
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";
import { Post } from "@/types/community";

interface PostItemProps {
  post: Post;
  onLike: (id: number) => void;
}

export const PostItem: React.FC<PostItemProps> = ({ post, onLike }) => {
  return (
    <Card className="overflow-hidden">
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
            onClick={() => onLike(post.id)}
          >
            👍 {post.likes}
          </button>
          <button className="flex items-center gap-1 hover:text-primary">
            <MessageSquare className="h-4 w-4" /> {post.comments}
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};
