
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ModalContatoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  anuncioId: number;
  vendedorNome: string;
}

export const ModalContato = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  anuncioId, 
  vendedorNome 
}: ModalContatoProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    cidade: "",
    mensagem: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular salvamento do lead
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui salvaríamos o lead no banco de dados
      console.log("Lead qualificado gerado:", {
        ...formData,
        anuncioId,
        timestamp: new Date().toISOString()
      });

      toast({
        title: "Contato revelado!",
        description: "Sua mensagem foi enviada e agora você pode ver as informações de contato do vendedor.",
      });

      onSuccess();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Entrar em contato com {vendedorNome}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome completo *</Label>
            <Input
              id="nome"
              type="text"
              value={formData.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone com WhatsApp *</Label>
            <Input
              id="telefone"
              type="tel"
              value={formData.telefone}
              onChange={(e) => handleChange("telefone", e.target.value)}
              placeholder="(00) 00000-0000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cidade">Cidade *</Label>
            <Input
              id="cidade"
              type="text"
              value={formData.cidade}
              onChange={(e) => handleChange("cidade", e.target.value)}
              placeholder="Sua cidade"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensagem">Sua mensagem (opcional)</Label>
            <Textarea
              id="mensagem"
              value={formData.mensagem}
              onChange={(e) => handleChange("mensagem", e.target.value)}
              placeholder="Apresente-se ou faça uma pergunta sobre o anúncio..."
              rows={4}
            />
            <p className="text-sm text-gray-500">
              Uma mensagem personalizada aumenta suas chances de resposta.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>🔒 Seus dados estão seguros.</strong> Ao preencher este formulário, 
              você poderá ver as informações de contato do vendedor e ele também 
              receberá seus dados e sua mensagem para entrar em contato.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
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
              {loading ? "Processando..." : "Revelar Contato"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
