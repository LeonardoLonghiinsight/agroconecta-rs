
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, User, Menu, X } from "lucide-react";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AgroConecta</h1>
              <p className="text-xs text-green-700 font-medium">Rio Grande do Sul</p>
            </div>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Buscar anúncios, produtos, equipamentos..."
                className="w-full pl-12 pr-4 py-3 text-base border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <Button className="ml-2 bg-green-700 hover:bg-green-800 px-6">
              Buscar
            </Button>
          </div>

          {/* User actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/criar-anuncio" className="flex items-center space-x-2">
                <span>Anunciar</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/login" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Entrar</span>
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 py-2 border-t border-gray-100">
          <Link to="/" className="text-gray-700 hover:text-green-700 font-medium">
            Início
          </Link>
          <Link to="/anuncios?categoria=gado" className="text-gray-700 hover:text-green-700">
            Gado
          </Link>
          <Link to="/anuncios?categoria=maquinas" className="text-gray-700 hover:text-green-700">
            Máquinas
          </Link>
          <Link to="/anuncios?categoria=insumos" className="text-gray-700 hover:text-green-700">
            Insumos
          </Link>
          <Link to="/anuncios?categoria=imoveis" className="text-gray-700 hover:text-green-700">
            Imóveis Rurais
          </Link>
          <Link to="/anuncios?categoria=servicos" className="text-gray-700 hover:text-green-700">
            Serviços
          </Link>
          <div className="flex items-center text-green-700 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Rio Grande do Sul</span>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4">
            {/* Search - Mobile */}
            <div className="mb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            {/* Navigation links */}
            <div className="space-y-3">
              <Link to="/" className="block text-gray-700 font-medium py-2">
                Início
              </Link>
              <Link to="/anuncios?categoria=gado" className="block text-gray-700 py-2">
                Gado
              </Link>
              <Link to="/anuncios?categoria=maquinas" className="block text-gray-700 py-2">
                Máquinas
              </Link>
              <Link to="/anuncios?categoria=insumos" className="block text-gray-700 py-2">
                Insumos
              </Link>
              <Link to="/anuncios?categoria=imoveis" className="block text-gray-700 py-2">
                Imóveis Rurais
              </Link>
              <Link to="/anuncios?categoria=servicos" className="block text-gray-700 py-2">
                Serviços
              </Link>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <Button asChild className="w-full bg-green-700 hover:bg-green-800">
                <Link to="/criar-anuncio">Anunciar</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/login">Entrar</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
