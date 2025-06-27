
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, MapPin, TrendingUp, Shield, Users, Star } from "lucide-react";
import { MapaInterativo } from "@/components/mapa/MapaInterativo";
import { CategoriaCard } from "@/components/categorias/CategoriaCard";
import { AnuncioDestaque } from "@/components/anuncios/AnuncioDestaque";

const Index = () => {
  const categorias = [
    {
      nome: "Gado",
      icone: "🐄",
      quantidade: "1.234 anúncios",
      link: "/anuncios?categoria=gado"
    },
    {
      nome: "Máquinas",
      icone: "🚜",
      quantidade: "567 anúncios", 
      link: "/anuncios?categoria=maquinas"
    },
    {
      nome: "Insumos",
      icone: "🌾",
      quantidade: "890 anúncios",
      link: "/anuncios?categoria=insumos"
    },
    {
      nome: "Imóveis Rurais",
      icone: "🏡",
      quantidade: "123 anúncios",
      link: "/anuncios?categoria=imoveis"
    },
    {
      nome: "Serviços",
      icone: "🔧",
      quantidade: "345 anúncios",
      link: "/anuncios?categoria=servicos"
    },
    {
      nome: "Implementos",
      icone: "⚙️",
      quantidade: "456 anúncios",
      link: "/anuncios?categoria=implementos"
    }
  ];

  const anunciosDestaque = [
    {
      id: 1,
      titulo: "Gado Nelore - Lote com 50 cabeças",
      preco: "R$ 85.000",
      cidade: "Bagé",
      imagem: "/placeholder.svg",
      selo: true
    },
    {
      id: 2,
      titulo: "Trator John Deere 6110J - 2018",
      preco: "R$ 185.000",
      cidade: "Passo Fundo",
      imagem: "/placeholder.svg",
      selo: true
    },
    {
      id: 3,
      titulo: "Fazenda 500 hectares - Região da Campanha",
      preco: "R$ 8.500.000",
      cidade: "Alegrete",
      imagem: "/placeholder.svg",
      selo: false
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              O Marketplace do Agronegócio Gaúcho
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">
              Conectamos produtores, vendedores e prestadores de serviços em todo o Rio Grande do Sul
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="O que você está procurando?"
                    className="w-full pl-12 pr-4 py-4 text-base text-gray-900 border-0"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 px-8">
                  Buscar
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-white">3.615</div>
                <div className="text-green-200">Anúncios Ativos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">1.840</div>
                <div className="text-green-200">Vendedores Cadastrados</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">497</div>
                <div className="text-green-200">Cidades Atendidas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore por Categoria
            </h2>
            <p className="text-xl text-gray-600">
              Encontre exatamente o que você precisa
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categorias.map((categoria, index) => (
              <CategoriaCard key={index} categoria={categoria} />
            ))}
          </div>
        </div>
      </section>

      {/* Mapa Interativo */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Anúncios pelo Rio Grande do Sul
            </h2>
            <p className="text-xl text-gray-600">
              Explore as oportunidades próximas a você
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <MapaInterativo />
          </div>
        </div>
      </section>

      {/* Anúncios em Destaque */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Anúncios em Destaque
              </h2>
              <p className="text-xl text-gray-600">
                Oportunidades selecionadas para você
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/anuncios">Ver Todos</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {anunciosDestaque.map((anuncio) => (
              <AnuncioDestaque key={anuncio.id} anuncio={anuncio} />
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher o AgroConecta RS?
            </h2>
            <p className="text-xl text-gray-600">
              A plataforma mais confiável para o agronegócio gaúcho
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Vendedores Verificados
              </h3>
              <p className="text-gray-600">
                Sistema de verificação que garante a confiabilidade dos anunciantes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Busca Geolocalizada
              </h3>
              <p className="text-gray-600">
                Encontre oportunidades próximas a você com nosso mapa interativo
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Comunicação Direta
              </h3>
              <p className="text-gray-600">
                Fale diretamente com vendedores via WhatsApp, telefone ou chat interno
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Anuncie seus produtos ou encontre o que precisa agora mesmo
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100" asChild>
              <Link to="/criar-anuncio">Anunciar Agora</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700" asChild>
              <Link to="/anuncios">Explorar Anúncios</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
