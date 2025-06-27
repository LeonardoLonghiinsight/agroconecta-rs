import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CamposEspecificos } from "@/components/anuncios/CamposEspecificos";

interface FormData {
  categoria: string;
  titulo: string;
  descricao: string;
  preco: string;
  cidade: string;
}

interface FormularioAnuncioProps {
  formData: FormData;
  camposEspecificos: Record<string, string>;
  onFormDataChange: (field: keyof FormData, value: string) => void;
  onCampoEspecificoChange: (campo: string, valor: string) => void;
  onCategoriaChange: (value: string) => void;
}

export const FormularioAnuncio = ({
  formData,
  camposEspecificos,
  onFormDataChange,
  onCampoEspecificoChange,
  onCategoriaChange
}: FormularioAnuncioProps) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Anúncio - Fator Rural</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria *</Label>
            <Select
              value={formData.categoria}
              onValueChange={onCategoriaChange}
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
              onValueChange={(value) => onFormDataChange("cidade", value)}
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
            onChange={onCampoEspecificoChange}
          />
        )}

        <div className="space-y-2">
          <Label htmlFor="titulo">Título do Anúncio *</Label>
          <Input
            id="titulo"
            type="text"
            value={formData.titulo}
            onChange={(e) => onFormDataChange("titulo", e.target.value)}
            placeholder="Ex: Gado Nelore - Lote com 50 cabeças - Fator Rural"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preco">Preço *</Label>
          <Input
            id="preco"
            type="text"
            value={formData.preco}
            onChange={(e) => onFormDataChange("preco", e.target.value)}
            placeholder="Ex: R$ 85.000 ou A Combinar"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricao">Descrição Detalhada *</Label>
          <Textarea
            id="descricao"
            value={formData.descricao}
            onChange={(e) => onFormDataChange("descricao", e.target.value)}
            placeholder="Descreva detalhadamente seu produto ou serviço para o Fator Rural..."
            rows={6}
            required
          />
          <p className="text-sm text-gray-500">
            Seja específico sobre características, estado, origem e outros detalhes importantes para os usuários do Fator Rural.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
