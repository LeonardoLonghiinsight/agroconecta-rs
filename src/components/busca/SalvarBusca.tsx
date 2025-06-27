
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Bell, Save } from "lucide-react";

interface SalvarBuscaProps {
  filtrosBusca: {
    categoria?: string;
    cidade?: string;
    termosBusca?: string;
    precoMin?: string;
    precoMax?: string;
  };
}

export const SalvarBusca = ({ filtrosBusca }: SalvarBuscaProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    frequencia: "diaria"
  });
  const { toast } = useToast();

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular salvamento da busca
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Busca salva:", {
        ...formData,
        filtros: filtrosBusca,
        timestamp: new Date().toISOString()
      });

      toast({
        title: "Alerta criado com sucesso!",
        description: `Você receberá notificações ${formData.frequencia === 'diaria' ? 'diárias' : 'semanais'} quando novos anúncios corresponderem à sua busca.`,
      });

      setIsOpen(false);
      setFormData({ nome: "", email: "", frequencia: "diaria" });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao criar o alerta. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const temFiltros = Object.values(filtrosBusca).some(valor => valor && valor.trim() !== "");

  if (!temFiltros) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Salvar Busca
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5 text-green-600" />
            Criar Alerta de Anúncios
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800">
              <strong>📧 Receba notificações automáticas</strong> quando novos anúncios 
              que correspondam aos seus critérios de busca forem publicados.
            </p>
          </div>

          <form onSubmit={handleSalvar} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Como podemos te chamar?"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail para notificações *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Frequência das notificações</Label>
              <div className="flex gap-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="frequencia"
                    value="diaria"
                    checked={formData.frequencia === "diaria"}
                    onChange={(e) => setFormData(prev => ({ ...prev, frequencia: e.target.value }))}
                    className="text-green-600"
                  />
                  <span className="text-sm">Diária</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="frequencia"
                    value="semanal"
                    checked={formData.frequencia === "semanal"}
                    onChange={(e) => setFormData(prev => ({ ...prev, frequencia: e.target.value }))}
                    className="text-green-600"
                  />
                  <span className="text-sm">Semanal</span>
                </label>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Critérios da busca:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {filtrosBusca.categoria && <p>• Categoria: {filtrosBusca.categoria}</p>}
                {filtrosBusca.cidade && <p>• Cidade: {filtrosBusca.cidade}</p>}
                {filtrosBusca.termosBusca && <p>• Termos: {filtrosBusca.termosBusca}</p>}
                {(filtrosBusca.precoMin || filtrosBusca.precoMax) && (
                  <p>• Preço: {filtrosBusca.precoMin || "0"} - {filtrosBusca.precoMax || "∞"}</p>
                )}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-700 hover:bg-green-800"
                disabled={loading}
              >
                {loading ? "Criando..." : "Criar Alerta"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
