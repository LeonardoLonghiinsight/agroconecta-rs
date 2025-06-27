
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">AgroConecta RS</h3>
                <p className="text-sm text-gray-400">Rio Grande do Sul</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              A plataforma que conecta o agronegócio gaúcho. Encontre e anuncie gado, 
              máquinas, insumos e serviços rurais com facilidade e segurança.
            </p>
            <div className="flex items-center text-green-400 text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Atuando em todo o Rio Grande do Sul</span>
            </div>
          </div>

          {/* Links úteis */}
          <div>
            <h4 className="font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/anuncios" className="text-gray-300 hover:text-white">
                  Ver Anúncios
                </Link>
              </li>
              <li>
                <Link to="/criar-anuncio" className="text-gray-300 hover:text-white">
                  Anunciar
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-300 hover:text-white">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/anuncios?categoria=gado" className="text-gray-300 hover:text-white">
                  Gado
                </Link>
              </li>
              <li>
                <Link to="/anuncios?categoria=maquinas" className="text-gray-300 hover:text-white">
                  Máquinas
                </Link>
              </li>
              <li>
                <Link to="/anuncios?categoria=insumos" className="text-gray-300 hover:text-white">
                  Insumos
                </Link>
              </li>
              <li>
                <Link to="/anuncios?categoria=imoveis" className="text-gray-300 hover:text-white">
                  Imóveis Rurais
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 AgroConecta RS. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacidade" className="text-gray-400 hover:text-white text-sm">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="text-gray-400 hover:text-white text-sm">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
