
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, ZoomIn, ZoomOut } from "lucide-react";

export const MapaInterativo = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Aqui implementaremos o mapa real mais tarde
    // Por enquanto, vamos simular com uma imagem placeholder
  }, []);

  // Dados simulados de anúncios no mapa
  const pinsExemplo = [
    { id: 1, lat: 30.0346, lng: -51.2177, cidade: "Porto Alegre", quantidade: 45 },
    { id: 2, lat: -28.2639, lng: -52.4081, cidade: "Passo Fundo", quantidade: 32 },
    { id: 3, lat: -31.7654, lng: -52.3376, cidade: "Pelotas", quantidade: 28 },
    { id: 4, lat: -29.6842, lng: -53.8069, cidade: "Santa Maria", quantidade: 56 },
    { id: 5, lat: -31.3222, lng: -54.1019, cidade: "Bagé", quantidade: 23 },
  ];

  return (
    <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
      {/* Placeholder do mapa */}
      <div 
        ref={mapContainerRef}
        className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 relative"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4f0d4' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        {/* Pins simulados */}
        {pinsExemplo.map((pin) => (
          <div
            key={pin.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${20 + (pin.id * 15)}%`,
              top: `${30 + (pin.id * 8)}%`,
            }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm hover:bg-green-700 transition-colors shadow-lg">
                {pin.quantidade}
              </div>
              <div className="w-3 h-3 bg-green-600 rotate-45 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
              
              {/* Tooltip */}
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {pin.cidade}: {pin.quantidade} anúncios
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Controles do mapa */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button size="icon" variant="secondary" className="shadow-lg">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="shadow-lg">
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Legenda */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-green-600" />
            Anúncios por Região
          </h4>
          <div className="text-sm text-gray-600">
            Clique nos pins para ver os anúncios da região
          </div>
        </div>

        {/* Overlay para implementação futura */}
        <div className="absolute inset-0 flex items-center justify-center bg-green-600/10">
          <div className="text-center text-green-800 font-medium">
            <MapPin className="h-12 w-12 mx-auto mb-2" />
            <p>Mapa Interativo do RS</p>
            <p className="text-sm">Em breve: Integração com Mapbox</p>
          </div>
        </div>
      </div>
    </div>
  );
};
