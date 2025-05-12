
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Página não encontrada</p>
      <Button onClick={() => navigate("/")}>Voltar para a página inicial</Button>
    </div>
  );
};

export default NotFound;
