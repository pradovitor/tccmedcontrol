
import React, { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PillIcon, Home, Calendar, Bell, LogOut, Menu, Users, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  // Filtrar itens de menu com base no tipo de usuário
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home, access: ["patient", "caregiver"] },
    { name: "Medicamentos", path: "/medicamentos", icon: PillIcon, access: ["patient", "caregiver"] },
    { name: "Agendamentos", path: "/agendamentos", icon: Calendar, access: ["patient", "caregiver"] },
    { name: "Lembretes", path: "/lembretes", icon: Bell, access: ["patient", "caregiver"] },
    { 
      name: "Cuidadores", 
      path: "/cuidadores", 
      icon: Users, 
      access: ["patient"] 
    },
    { 
      name: "Pacientes", 
      path: "/cuidadores", 
      icon: Users, 
      access: ["caregiver"] 
    },
    { name: "Relatórios", path: "/relatorios", icon: FileText, access: ["patient", "caregiver"] },
  ].filter(item => user && item.access.includes(user.userType));

  const handleLogout = () => {
    logout();
  };

  const NavItems = () => (
    <>
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.path + item.name}
            to={item.path}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
            onClick={() => setIsSidebarOpen(false)}
          >
            <Icon className="h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar para desktop */}
      <aside className="hidden md:flex w-64 border-r flex-col p-4">
        <div className="flex items-center gap-2 mb-8">
          <PillIcon className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">MedControl</h1>
        </div>
        
        {/* Perfil do usuário */}
        {user && (
          <div className="flex items-center space-x-3 mb-6 p-2 bg-muted rounded-lg">
            <Avatar>
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.userType}</p>
            </div>
          </div>
        )}

        <nav className="space-y-2 flex-1">
          <NavItems />
        </nav>
        <Button
          variant="outline"
          className="mt-auto w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sair
        </Button>
      </aside>

      {/* Menu móvel */}
      <div className="md:hidden border-b sticky top-0 bg-background z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <PillIcon className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">MedControl</h1>
          </div>
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col h-full py-4">
                <div className="flex items-center gap-2 mb-8">
                  <PillIcon className="h-6 w-6 text-primary" />
                  <h1 className="text-xl font-bold">MedControl</h1>
                </div>
                
                {/* Perfil do usuário para mobile */}
                {user && (
                  <div className="flex items-center space-x-3 mb-6 p-2 bg-muted rounded-lg">
                    <Avatar>
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user.userType}</p>
                    </div>
                  </div>
                )}
                
                <nav className="space-y-2 flex-1">
                  <NavItems />
                </nav>
                <Button
                  variant="outline"
                  className="mt-auto w-full justify-start"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sair
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1">{children}</main>
    </div>
  );
};
