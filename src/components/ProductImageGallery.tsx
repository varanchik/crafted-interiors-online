
import { Badge } from "@/components/ui/badge";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  selectedImage: number;
  onImageSelect: (index: number) => void;
  customizable?: boolean;
}

export const ProductImageGallery = ({ 
  images, 
  productName, 
  selectedImage, 
  onImageSelect, 
  customizable 
}: ProductImageGalleryProps) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <img
          src={images[selectedImage]}
          alt={productName}
          className="w-full h-96 lg:h-[500px] object-cover rounded-xl shadow-soft"
        />
        {customizable && (
          <Badge className="absolute top-4 left-4 bg-primary text-white">
            Под заказ
          </Badge>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`relative h-24 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === index ? 'border-primary' : 'border-transparent'
            }`}
          >
            <img
              src={image}
              alt={`${productName} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
