
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UploadImagensProps {
  imagens: File[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

export const UploadImagens = ({ imagens, onImageUpload, onRemoveImage }: UploadImagensProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fotos do Anúncio - Fator Rural</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={onImageUpload}
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
                Máximo: 10 imagens para o Fator Rural | Formatos: JPG, PNG, WebP
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
                    onClick={() => onRemoveImage(index)}
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
  );
};
