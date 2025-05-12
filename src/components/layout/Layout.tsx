
import React, { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MedicationIcon, Home, Calendar, Pill, Bell, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Medicamentos", path: "/medicamentos", icon: Pill },
    { name: "Agendamentos", path: "/agendamentos", icon: Calendar },
    { name: "Lembretes", path: "/lembretes", icon: Bell },
  ];

  const handleLogout = () => {
    // Lógica de logout (simulada)
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema com sucesso"
    });
    navigate("/login");
  };

  const NavItems = () => (
    <>
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.path}
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
          <MedicationIcon className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">MedControl</h1>
        </div>
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
            <MedicationIcon className="h-6 w-6 text-primary" />
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
                  <MedicationIcon className="h-6 w-6 text-primary" />
                  <h1 className="text-xl font-bold">MedControl</h1>
                </div>
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
