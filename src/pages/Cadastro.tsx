
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, User, Building } from "lucide-react";

const Cadastro = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState<'pessoa_fisica' | 'pessoa_juridica'>('pessoa_fisica');
  const [formData, setFormData] = useState({
    nome: "",
    documento: "",
    telefone: "",
    email: "",
    cidade: "",
    password: "",
    confirmPassword: ""
  });

  const cidades = [
    "Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria",
    "Gravataí", "Viamão", "Novo Hamburgo", "São Leopoldo", "Rio Grande",
    "Alvorada", "Passo Fundo", "Sapucaia do Sul", "Uruguaiana", "Santa Cruz do Sul",
    "Cachoeirinha", "Bagé", "Bento Gonçalves", "Erechim", "Guaíba",
    "Alegrete", "Santana do Livramento", "Ijuí", "Sapiranga", "Santo Ângelo"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    setLoading(true);
    
    // Simular cadastro
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Cadastro:", { ...formData, tipoUsuario });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AgroConecta RS</h1>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Crie sua conta
          </h2>
          <p className="text-gray-600 mt-2">
            Cadastre-se para anunciar e encontrar oportunidades
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cadastro</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tipo de usuário */}
              <div className="space-y-3">
                <Label>Tipo de Conta</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={tipoUsuario === 'pessoa_fisica' ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setTipoUsuario('pessoa_fisica')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Pessoa Física
                  </Button>
                  <Button
                    type="button"
                    variant={tipoUsuario === 'pessoa_juridica' ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setTipoUsuario('pessoa_juridica')}
                  >
                    <Building className="h-4 w-4 mr-2" />
                    Pessoa Jurídica
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nome">
                  {tipoUsuario === 'pessoa_fisica' ? 'Nome Completo' : 'Razão Social'} *
                </Label>
                <Input
                  id="nome"
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  placeholder={tipoUsuario === 'pessoa_fisica' ? 'Seu nome completo' : 'Nome da empresa'}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documento">
                  {tipoUsuario === 'pessoa_fisica' ? 'CPF' : 'CNPJ'} *
                </Label>
                <Input
                  id="documento"
                  type="text"
                  value={formData.documento}
                  onChange={(e) => setFormData(prev => ({ ...prev, documento: e.target.value }))}
                  placeholder={tipoUsuario === 'pessoa_fisica' ? '000.000.000-00' : '00.000.000/0000-00'}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone com WhatsApp *</Label>
                <Input
                  id="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
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
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="seu@email.com"
                  required
                />
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

              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Repita sua senha"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-start space-x-2 text-sm">
                  <input type="checkbox" className="rounded mt-0.5" required />
                  <span>
                    Concordo com os{" "}
                    <Link to="/termos" className="text-green-700 hover:text-green-800">
                      Termos de Uso
                    </Link>{" "}
                    e{" "}
                    <Link to="/privacidade" className="text-green-700 hover:text-green-800">
                      Política de Privacidade
                    </Link>
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800"
                disabled={loading}
              >
                {loading ? "Criando conta..." : "Criar Conta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Já tem uma conta?{" "}
                <Link 
                  to="/login" 
                  className="text-green-700 hover:text-green-800 font-medium"
                >
                  Faça login aqui
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cadastro;
