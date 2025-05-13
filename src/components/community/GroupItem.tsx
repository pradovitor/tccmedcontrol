
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GroupInfo } from "@/types/community";

interface GroupItemProps {
  group: GroupInfo;
  onJoinGroup: (id: number) => void;
}

export const GroupItem: React.FC<GroupItemProps> = ({ group, onJoinGroup }) => {
  return (
    <Card>
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
          onClick={() => onJoinGroup(group.id)}
        >
          Participar do Grupo
        </Button>
      </CardFooter>
    </Card>
  );
};
