
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FormularioAnuncio } from "@/components/anuncios/FormularioAnuncio";
import { UploadImagens } from "@/components/anuncios/UploadImagens";

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

  const handleFormDataChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
              Criar Anúncio - Fator Rural
            </h1>
            <p className="text-gray-600">
              Preencha as informações abaixo para anunciar no Fator Rural
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <FormularioAnuncio
              formData={formData}
              camposEspecificos={camposEspecificos}
              onFormDataChange={handleFormDataChange}
              onCampoEspecificoChange={handleCampoEspecificoChange}
              onCategoriaChange={handleCategoriaChange}
            />

            {/* Upload de Imagens */}
            <UploadImagens
              imagens={imagens}
              onImageUpload={handleImageUpload}
              onRemoveImage={removeImage}
            />

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
                {loading ? "Publicando no Fator Rural..." : "Publicar no Fator Rural"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CriarAnuncio;
