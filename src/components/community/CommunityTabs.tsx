
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Users } from "lucide-react";
import { PostsList } from "./PostsList";
import { GroupsList } from "./GroupsList";
import { Post, GroupInfo } from "@/types/community";

interface CommunityTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  posts: Post[];
  groups: GroupInfo[];
  newPostContent: string;
  onContentChange: (content: string) => void;
  onSubmitPost: () => void;
  onLike: (id: number) => void;
  onJoinGroup: (id: number) => void;
}

export const CommunityTabs: React.FC<CommunityTabsProps> = ({
  activeTab,
  onTabChange,
  posts,
  groups,
  newPostContent,
  onContentChange,
  onSubmitPost,
  onLike,
  onJoinGroup
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
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
        <PostsList 
          posts={posts}
          newPostContent={newPostContent}
          onContentChange={onContentChange}
          onSubmitPost={onSubmitPost}
          onLike={onLike}
        />
      </TabsContent>

      <TabsContent value="groups" className="mt-6">
        <GroupsList 
          groups={groups} 
          onJoinGroup={onJoinGroup} 
        />
      </TabsContent>
    </Tabs>
  );
};
