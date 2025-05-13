
import React from "react";
import { PostItem } from "./PostItem";
import { NewPostForm } from "./NewPostForm";
import { Post } from "@/types/community";

interface PostsListProps {
  posts: Post[];
  newPostContent: string;
  onContentChange: (content: string) => void;
  onSubmitPost: () => void;
  onLike: (id: number) => void;
}

export const PostsList: React.FC<PostsListProps> = ({ 
  posts, 
  newPostContent, 
  onContentChange, 
  onSubmitPost, 
  onLike 
}) => {
  return (
    <div>
      <NewPostForm 
        content={newPostContent} 
        onContentChange={onContentChange} 
        onSubmit={onSubmitPost} 
      />

      <div className="space-y-4">
        {posts.map(post => (
          <PostItem key={post.id} post={post} onLike={onLike} />
        ))}
      </div>
    </div>
  );
};
