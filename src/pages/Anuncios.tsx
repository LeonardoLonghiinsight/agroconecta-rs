
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List, MapPin, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Anuncios = () => {
  const [visualizacao, setVisualizacao] = useState<'grid' | 'list'>('grid');

  // Dados simulados - serão substituídos por dados reais
  const anuncios = [
    {
      id: 1,
      titulo: "Gado Nelore - Lote premium com 50 cabeças",
      preco: "R$ 85.000",
      cidade: "Bagé",
      categoria: "Gado",
      imagem: "/placeholder.svg",
      selo: true,
      descricao: "Lote de gado nelore de alta qualidade, animais jovens e saudáveis."
    },
    {
      id: 2,
      titulo: "Trator John Deere 6110J - 2018 - Baixa Horas",
      preco: "R$ 185.000",
      cidade: "Passo Fundo", 
      categoria: "Máquinas",
      imagem: "/placeholder.svg",
      selo: true,
      descricao: "Trator em excelente estado, revisado e com documentação em dia."
    },
    {
      id: 3,
      titulo: "Fazenda 500 hectares - Região da Campanha",
      preco: "R$ 8.500.000",
      cidade: "Alegrete",
      categoria: "Imóveis",
      imagem: "/placeholder.svg",
      selo: false,
      descricao: "Fazenda produtiva com pastagens e infraestrutura completa."
    }
  ];

  const AnuncioCard = ({ anuncio }: { anuncio: any }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <img
          src={anuncio.imagem}
          alt={anuncio.titulo}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {anuncio.selo && (
          <Badge className="absolute top-3 right-3 bg-green-600 text-white">
            <Shield className="h-3 w-3 mr-1" />
            Verificado
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {anuncio.categoria}
          </Badge>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {anuncio.titulo}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {anuncio.descricao}
        </p>
        <div className="text-2xl font-bold text-green-700 mb-2">
          {anuncio.preco}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {anuncio.cidade}
          </div>
          <Button size="sm" asChild>
            <Link to={`/anuncio/${anuncio.id}`}>
              Ver Detalhes
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Anúncios
          </h1>
          <p className="text-gray-600">
            Encontre o que você precisa para sua propriedade rural
          </p>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar por título, categoria ou localização..."
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              
              <div className="flex">
                <Button
                  variant={visualizacao === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setVisualizacao('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={visualizacao === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setVisualizacao('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Mostrando {anuncios.length} de {anuncios.length} anúncios
          </p>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Mais Recentes</option>
            <option>Menor Preço</option>
            <option>Maior Preço</option>
            <option>Mais Próximos</option>
          </select>
        </div>

        {/* Grid de Anúncios */}
        <div className={`grid gap-6 ${
          visualizacao === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {anuncios.map((anuncio) => (
            <AnuncioCard key={anuncio.id} anuncio={anuncio} />
          ))}
        </div>

        {/* Paginação */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            <Button variant="outline" disabled>
              Anterior
            </Button>
            <Button variant="default">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anuncios;
