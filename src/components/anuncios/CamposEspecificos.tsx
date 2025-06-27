
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CamposEspecificosProps {
  categoria: string;
  valores: Record<string, string>;
  onChange: (campo: string, valor: string) => void;
}

export const CamposEspecificos = ({ categoria, valores, onChange }: CamposEspecificosProps) => {
  const renderCamposGado = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="raca">Raça *</Label>
        <Select
          value={valores.raca || ""}
          onValueChange={(value) => onChange("raca", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a raça" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nelore">Nelore</SelectItem>
            <SelectItem value="angus">Angus</SelectItem>
            <SelectItem value="brahman">Brahman</SelectItem>
            <SelectItem value="charolesa">Charolesa</SelectItem>
            <SelectItem value="hereford">Hereford</SelectItem>
            <SelectItem value="limousin">Limousin</SelectItem>
            <SelectItem value="simental">Simental</SelectItem>
            <SelectItem value="mista">Mista</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="idade">Faixa de Idade *</Label>
        <Select
          value={valores.idade || ""}
          onValueChange={(value) => onChange("idade", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a idade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-12">0 a 12 meses</SelectItem>
            <SelectItem value="12-24">12 a 24 meses</SelectItem>
            <SelectItem value="24-36">24 a 36 meses</SelectItem>
            <SelectItem value="36+">Acima de 36 meses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipo">Tipo *</Label>
        <Select
          value={valores.tipo || ""}
          onValueChange={(value) => onChange("tipo", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="corte">Gado de Corte</SelectItem>
            <SelectItem value="leite">Gado Leiteiro</SelectItem>
            <SelectItem value="misto">Misto</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderCamposMaquinas = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="marca">Marca *</Label>
        <Select
          value={valores.marca || ""}
          onValueChange={(value) => onChange("marca", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a marca" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="john-deere">John Deere</SelectItem>
            <SelectItem value="case">Case</SelectItem>
            <SelectItem value="new-holland">New Holland</SelectItem>
            <SelectItem value="massey-ferguson">Massey Ferguson</SelectItem>
            <SelectItem value="valtra">Valtra</SelectItem>
            <SelectItem value="fendt">Fendt</SelectItem>
            <SelectItem value="claas">Claas</SelectItem>
            <SelectItem value="other">Outra</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="modelo">Modelo</Label>
        <Input
          id="modelo"
          type="text"
          value={valores.modelo || ""}
          onChange={(e) => onChange("modelo", e.target.value)}
          placeholder="Ex: 6110J"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ano">Ano de Fabricação *</Label>
        <Input
          id="ano"
          type="number"
          min="1990"
          max={new Date().getFullYear()}
          value={valores.ano || ""}
          onChange={(e) => onChange("ano", e.target.value)}
          placeholder="Ex: 2020"
        />
      </div>
    </div>
  );

  const renderCamposInsumos = () => (
    <div className="space-y-2">
      <Label htmlFor="tipoInsumo">Tipo de Insumo *</Label>
      <Select
        value={valores.tipoInsumo || ""}
        onValueChange={(value) => onChange("tipoInsumo", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione o tipo de insumo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fertilizante">Fertilizante</SelectItem>
          <SelectItem value="semente">Semente</SelectItem>
          <SelectItem value="agrotoxico">Agrotóxico</SelectItem>
          <SelectItem value="racao">Ração</SelectItem>
          <SelectItem value="medicamento">Medicamento Veterinário</SelectItem>
          <SelectItem value="vacina">Vacina</SelectItem>
          <SelectItem value="suplemento">Suplemento</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  if (!categoria) return null;

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Informações Específicas</h4>
      {categoria === "gado" && renderCamposGado()}
      {categoria === "maquinas" && renderCamposMaquinas()}
      {categoria === "insumos" && renderCamposInsumos()}
    </div>
  );
};
