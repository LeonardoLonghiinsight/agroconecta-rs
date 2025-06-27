
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield } from "lucide-react";

interface Anuncio {
  id: number;
  titulo: string;
  preco: string;
  cidade: string;
  imagem: string;
  selo: boolean;
}

interface AnuncioDestaqueProps {
  anuncio: Anuncio;
}

export const AnuncioDestaque = ({ anuncio }: AnuncioDestaqueProps) => {
  return (
    <Link to={`/anuncio/${anuncio.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200 overflow-hidden">
        <div className="relative">
          <img
            src={anuncio.imagem}
            alt={anuncio.titulo}
            className="w-full h-48 object-cover"
          />
          {anuncio.selo && (
            <Badge className="absolute top-3 right-3 bg-green-600 text-white">
              <Shield className="h-3 w-3 mr-1" />
              Verificado
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {anuncio.titulo}
          </h3>
          <div className="text-2xl font-bold text-green-700 mb-2">
            {anuncio.preco}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {anuncio.cidade}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
