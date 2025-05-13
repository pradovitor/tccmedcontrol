
export type Post = {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: Date;
  likes: number;
  comments: number;
  category: "geral" | "medicamentos" | "cuidadores";
};

export type GroupInfo = {
  id: number;
  name: string;
  members: number;
  category: string;
  description: string;
};
