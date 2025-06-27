
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface Categoria {
  nome: string;
  icone: string;
  quantidade: string;
  link: string;
}

interface CategoriaCardProps {
  categoria: Categoria;
}

export const CategoriaCard = ({ categoria }: CategoriaCardProps) => {
  return (
    <Link to={categoria.link}>
      <Card className="hover:shadow-lg transition-shadow duration-200 hover:scale-105 transform">
        <CardContent className="p-6 text-center">
          <div className="text-3xl mb-3">{categoria.icone}</div>
          <h3 className="font-semibold text-gray-900 mb-1">{categoria.nome}</h3>
          <p className="text-sm text-gray-600">{categoria.quantidade}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
