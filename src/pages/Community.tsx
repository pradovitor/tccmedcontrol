
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { CommunityTabs } from "@/components/community/CommunityTabs";
import { useCommunity } from "@/hooks/useCommunity";

const Community = () => {
  const { 
    newPostContent, 
    setNewPostContent, 
    activeTab, 
    setActiveTab, 
    posts, 
    groups, 
    handleNewPost, 
    handleLike, 
    handleJoinGroup 
  } = useCommunity();

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Comunidade</h1>

        <CommunityTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          posts={posts}
          groups={groups}
          newPostContent={newPostContent}
          onContentChange={setNewPostContent}
          onSubmitPost={handleNewPost}
          onLike={handleLike}
          onJoinGroup={handleJoinGroup}
        />
      </div>
    </Layout>
  );
};

export default Community;
