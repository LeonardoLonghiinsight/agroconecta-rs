import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CamposEspecificos } from "@/components/anuncios/CamposEspecificos";

const CriarAnuncio = () => {
  const [loading, setLoading] = useState(false);
  const [imagens, setImagens] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    categoria: "",
    titulo: "",
    descricao: "",
    preco: "",
    cidade: ""
  });
  const [camposEspecificos, setCamposEspecificos] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const categorias = [
    { value: "gado", label: "Gado" },
    { value: "maquinas", label: "Máquinas e Tratores" },
    { value: "insumos", label: "Insumos Agrícolas" },
    { value: "imoveis", label: "Imóveis Rurais" },
    { value: "servicos", label: "Serviços" },
    { value: "implementos", label: "Implementos" }
  ];

  const cidades = [
    "Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria",
    "Gravataí", "Viamão", "Novo Hamburgo", "São Leopoldo", "Rio Grande",
    "Alvorada", "Passo Fundo", "Sapucaia do Sul", "Uruguaiana", "Santa Cruz do Sul",
    "Cachoeirinha", "Bagé", "Bento Gonçalves", "Erechim", "Guaíba",
    "Alegrete", "Santana do Livramento", "Ijuí", "Sapiranga", "Santo Ângelo"
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.slice(0, 10 - imagens.length);
    setImagens(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImagens(prev => prev.filter((_, i) => i !== index));
  };

  const handleCampoEspecificoChange = (campo: string, valor: string) => {
    setCamposEspecificos(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleCategoriaChange = (value: string) => {
    setFormData(prev => ({ ...prev, categoria: value }));
    setCamposEspecificos({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Anúncio criado:", {
        ...formData,
        camposEspecificos,
        imagens: imagens.map(img => img.name),
        timestamp: new Date().toISOString()
      });

      toast({
        title: "Anúncio criado com sucesso!",
        description: "Seu anúncio foi publicado e já está disponível para visualização.",
      });

      // Reset form
      setFormData({
        categoria: "",
        titulo: "",
        descricao: "",
        preco: "",
        cidade: ""
      });
      setCamposEspecificos({});
      setImagens([]);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao criar o anúncio. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Criar Anúncio
            </h1>
            <p className="text-gray-600">
              Preencha as informações abaixo para anunciar seu produto ou serviço
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações do Anúncio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria *</Label>
                    <Select
                      value={formData.categoria}
                      onValueChange={handleCategoriaChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria.value} value={categoria.value}>
                            {categoria.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade *</Label>
                    <Select
                      value={formData.cidade}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, cidade: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione sua cidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {cidades.map((cidade) => (
                          <SelectItem key={cidade} value={cidade}>
                            {cidade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Campos Específicos por Categoria */}
                {formData.categoria && (
                  <CamposEspecificos
                    categoria={formData.categoria}
                    valores={camposEspecificos}
                    onChange={handleCampoEspecificoChange}
                  />
                )}

                <div className="space-y-2">
                  <Label htmlFor="titulo">Título do Anúncio *</Label>
                  <Input
                    id="titulo"
                    type="text"
                    value={formData.titulo}
                    onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
                    placeholder="Ex: Gado Nelore - Lote com 50 cabeças"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preco">Preço *</Label>
                  <Input
                    id="preco"
                    type="text"
                    value={formData.preco}
                    onChange={(e) => setFormData(prev => ({ ...prev, preco: e.target.value }))}
                    placeholder="Ex: R$ 85.000 ou A Combinar"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição Detalhada *</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                    placeholder="Descreva detalhadamente seu produto ou serviço..."
                    rows={6}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Seja específico sobre características, estado, origem e outros detalhes importantes.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Upload de Imagens */}
            <Card>
              <CardHeader>
                <CardTitle>Fotos do Anúncio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={imagens.length >= 10}
                    />
                    <label 
                      htmlFor="image-upload" 
                      className={`cursor-pointer ${imagens.length >= 10 ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">
                        {imagens.length >= 10 
                          ? "Máximo de 10 imagens atingido"
                          : "Clique para adicionar imagens ou arraste aqui"
                        }
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Máximo: 10 imagens | Formatos: JPG, PNG, WebP
                      </p>
                    </label>
                  </div>

                  {/* Preview das imagens */}
                  {imagens.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagens.map((imagem, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={URL.createObjectURL(imagem)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute -top-2 -right-2 w-6 h-6"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={loading}
              >
                Salvar como Rascunho
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-700 hover:bg-green-800"
                disabled={loading}
              >
                {loading ? "Publicando..." : "Publicar Anúncio"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CriarAnuncio;
