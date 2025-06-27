
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Shield, 
  Phone, 
  Mail, 
  Share2, 
  Heart,
  ChevronLeft,
  ChevronRight,
  MessageCircle 
} from "lucide-react";
import { ModalContato } from "@/components/anuncios/ModalContato";

const AnuncioDetalhes = () => {
  const { id } = useParams();
  const [imagemAtual, setImagemAtual] = useState(0);
  const [modalContatoAberto, setModalContatoAberto] = useState(false);
  const [contatoRevelado, setContatoRevelado] = useState(false);

  // Dados simulados - serão substituídos por dados reais baseados no ID
  const anuncio = {
    id: 1,
    titulo: "Gado Nelore - Lote premium com 50 cabeças",
    preco: "R$ 85.000",
    cidade: "Bagé",
    estado: "RS",
    categoria: "Gado",
    subcategoria: "Gado de Corte",
    selo: true,
    imagens: [
      "/placeholder.svg",
      "/placeholder.svg", 
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    descricao: `Lote de gado nelore de alta qualidade, animais jovens e saudáveis.
    
    Características:
    - 50 cabeças de gado nelore
    - Idade média: 18-24 meses
    - Peso médio: 380kg
    - Animais vacinados e vermifugados
    - Documentação completa
    - Origem rastreada
    
    Os animais estão em excelente estado de saúde e prontos para engorda ou reprodução. Localização estratégica na região da Campanha, facilitando o transporte.`,
    vendedor: {
      nome: "João Carlos Silva",
      telefone: "(53) 99999-9999",
      email: "joao@exemplo.com",
      cidade: "Bagé",
      verificado: true
    },
    dataPublicacao: "2024-01-15"
  };

  const proximaImagem = () => {
    setImagemAtual((prev) => (prev + 1) % anuncio.imagens.length);
  };

  const imagemAnterior = () => {
    setImagemAtual((prev) => (prev - 1 + anuncio.imagens.length) % anuncio.imagens.length);
  };

  const handleContatoSucesso = () => {
    setContatoRevelado(true);
    setModalContatoAberto(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galeria de Imagens */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={anuncio.imagens[imagemAtual]}
                    alt={anuncio.titulo}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  
                  {/* Navegação das imagens */}
                  {anuncio.imagens.length > 1 && (
                    <>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2"
                        onClick={imagemAnterior}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        onClick={proximaImagem}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {/* Indicador de posição */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-2">
                      {anuncio.imagens.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === imagemAtual ? 'bg-white' : 'bg-white/50'
                          }`}
                          onClick={() => setImagemAtual(index)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Selo de verificação */}
                  {anuncio.selo && (
                    <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                      <Shield className="h-3 w-3 mr-1" />
                      Verificado
                    </Badge>
                  )}
                </div>

                {/* Miniaturas */}
                {anuncio.imagens.length > 1 && (
                  <div className="flex space-x-2 p-4 overflow-x-auto">
                    {anuncio.imagens.map((imagem, index) => (
                      <button
                        key={index}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === imagemAtual 
                            ? 'border-green-500' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setImagemAtual(index)}
                      >
                        <img
                          src={imagem}
                          alt={`${anuncio.titulo} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Informações do Anúncio */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <Badge variant="secondary" className="mb-2">
                    {anuncio.categoria} • {anuncio.subcategoria}
                  </Badge>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {anuncio.titulo}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {anuncio.cidade}, {anuncio.estado}
                  </div>
                </div>

                <div className="text-3xl font-bold text-green-700 mb-6">
                  {anuncio.preco}
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Descrição
                  </h3>
                  <div className="text-gray-700 whitespace-pre-line">
                    {anuncio.descricao}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Informações do Vendedor */}
          <div className="space-y-6">
            {/* Card do Vendedor */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-green-700">
                      {anuncio.vendedor.nome.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {anuncio.vendedor.nome}
                  </h3>
                  {anuncio.vendedor.verificado && (
                    <Badge className="bg-green-100 text-green-800">
                      <Shield className="h-3 w-3 mr-1" />
                      Vendedor Verificado
                    </Badge>
                  )}
                  <div className="flex items-center justify-center text-gray-600 text-sm mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {anuncio.vendedor.cidade}
                  </div>
                </div>

                {/* Contato */}
                <div className="space-y-3">
                  {!contatoRevelado ? (
                    <Button 
                      className="w-full bg-green-700 hover:bg-green-800"
                      onClick={() => setModalContatoAberto(true)}
                    >
                      Ver Telefone e Enviar Mensagem
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <Button className="w-full" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        {anuncio.vendedor.telefone}
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        {anuncio.vendedor.email}
                      </Button>
                    </div>
                  )}

                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat Interno
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Ações */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Salvar Anúncio
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <p>Anúncio publicado em</p>
                    <p className="font-medium">
                      {new Date(anuncio.dataPublicacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal de Contato */}
      <ModalContato
        isOpen={modalContatoAberto}
        onClose={() => setModalContatoAberto(false)}
        onSuccess={handleContatoSucesso}
        anuncioId={anuncio.id}
        vendedorNome={anuncio.vendedor.nome}
      />
    </div>
  );
};

export default AnuncioDetalhes;
