
import React, { createContext, useState, useContext, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type UserType = "patient" | "caregiver";

interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string, userType: UserType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("medcontrol-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  const login = (email: string, password: string) => {
    // Simulação de login - será substituído por autenticação real
    console.log("Login com:", { email, password });
    
    // Recuperar o usuário armazenado no registro
    const savedUsers = localStorage.getItem("medcontrol-users");
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    const foundUser = users.find((u: any) => u.email === email);
    
    if (foundUser && foundUser.password === password) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("medcontrol-user", JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Login realizado",
        description: "Você foi autenticado com sucesso",
      });
      
      navigate("/dashboard");
    } else {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos",
        variant: "destructive",
      });
    }
  };

  const register = (name: string, email: string, password: string, userType: UserType) => {
    // Simulação de registro - será substituído por autenticação real
    console.log("Registro com:", { name, email, password, userType });
    
    // Salvar usuário em localStorage (simulando um banco de dados)
    const savedUsers = localStorage.getItem("medcontrol-users");
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    // Verificar se o email já existe
    if (users.some((u: any) => u.email === email)) {
      toast({
        title: "Erro no registro",
        description: "Este email já está em uso",
        variant: "destructive",
      });
      return;
    }
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      userType
    };
    
    users.push(newUser);
    localStorage.setItem("medcontrol-users", JSON.stringify(users));
    
    toast({
      title: "Conta criada",
      description: "Sua conta foi criada com sucesso",
    });
    
    navigate("/login");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("medcontrol-user");
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema com sucesso"
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
