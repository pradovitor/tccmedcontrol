
import React from "react";
import { GroupItem } from "./GroupItem";
import { GroupInfo } from "@/types/community";

interface GroupsListProps {
  groups: GroupInfo[];
  onJoinGroup: (id: number) => void;
}

export const GroupsList: React.FC<GroupsListProps> = ({ groups, onJoinGroup }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {groups.map(group => (
        <GroupItem key={group.id} group={group} onJoinGroup={onJoinGroup} />
      ))}
    </div>
  );
};
