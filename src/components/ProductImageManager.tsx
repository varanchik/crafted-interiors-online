
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Star, ArrowUp, ArrowDown, Play, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface ProductMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  isPreview: boolean;
  order: number;
  alt?: string;
}

interface ProductImageManagerProps {
  media: ProductMedia[];
  onChange: (media: ProductMedia[]) => void;
}

export const ProductImageManager = ({ media, onChange }: ProductImageManagerProps) => {
  const { toast } = useToast();
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const newMedia: ProductMedia = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        url,
        isPreview: media.length === 0 && type === 'image', // Первое изображение автоматически превью
        order: media.length,
        alt: file.name
      };
      
      onChange([...media, newMedia]);
    });

    toast({
      title: "Файлы загружены",
      description: `Добавлено ${files.length} ${type === 'image' ? 'изображений' : 'видео'}`,
    });
  };

  const removeMedia = (id: string) => {
    const updatedMedia = media.filter(item => item.id !== id);
    // Пересчитываем порядок
    const reorderedMedia = updatedMedia.map((item, index) => ({
      ...item,
      order: index
    }));
    onChange(reorderedMedia);
  };

  const setAsPreview = (id: string) => {
    const updatedMedia = media.map(item => ({
      ...item,
      isPreview: item.id === id
    }));
    onChange(updatedMedia);
    
    toast({
      title: "Превью обновлено",
      description: "Изображение установлено как превью товара",
    });
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const itemIndex = media.findIndex(item => item.id === id);
    if (itemIndex === -1) return;

    const newIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;
    if (newIndex < 0 || newIndex >= media.length) return;

    const updatedMedia = [...media];
    [updatedMedia[itemIndex], updatedMedia[newIndex]] = [updatedMedia[newIndex], updatedMedia[itemIndex]];
    
    // Обновляем порядок
    const reorderedMedia = updatedMedia.map((item, index) => ({
      ...item,
      order: index
    }));
    
    onChange(reorderedMedia);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) {
      setDraggedItem(null);
      return;
    }

    const draggedIndex = media.findIndex(item => item.id === draggedItem);
    const targetIndex = media.findIndex(item => item.id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;

    const updatedMedia = [...media];
    const draggedElement = updatedMedia.splice(draggedIndex, 1)[0];
    updatedMedia.splice(targetIndex, 0, draggedElement);
    
    // Обновляем порядок
    const reorderedMedia = updatedMedia.map((item, index) => ({
      ...item,
      order: index
    }));
    
    onChange(reorderedMedia);
    setDraggedItem(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Медиа файлы товара</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Controls */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="image-upload">Загрузить изображения</Label>
            <div className="mt-2">
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileUpload(e, 'image')}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Выбрать изображения
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="video-upload">Загрузить видео</Label>
            <div className="mt-2">
              <Input
                id="video-upload"
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => handleFileUpload(e, 'video')}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById('video-upload')?.click()}
              >
                <Play className="h-4 w-4 mr-2" />
                Выбрать видео
              </Button>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        {media.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium">Загруженные файлы ({media.length})</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {media
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <div
                    key={item.id}
                    className="relative border rounded-lg p-2 bg-card cursor-move"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, item.id)}
                  >
                    {/* Preview Badge */}
                    {item.isPreview && (
                      <Badge className="absolute top-1 left-1 z-10 bg-yellow-500">
                        <Star className="h-3 w-3 mr-1" />
                        Превью
                      </Badge>
                    )}

                    {/* Media Preview */}
                    <div className="aspect-square bg-gray-100 rounded mb-2 overflow-hidden">
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.alt}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <Play className="h-8 w-8 text-gray-500" />
                          <span className="ml-2 text-sm text-gray-500">Видео</span>
                        </div>
                      )}
                    </div>

                    {/* Controls */}
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => moveItem(item.id, 'up')}
                          disabled={item.order === 0}
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => moveItem(item.id, 'down')}
                          disabled={item.order === media.length - 1}
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="flex space-x-1">
                        {item.type === 'image' && !item.isPreview && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setAsPreview(item.id)}
                          >
                            <Star className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMedia(item.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Order indicator */}
                    <div className="text-xs text-center text-muted-foreground mt-1">
                      Позиция: {item.order + 1}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {media.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Загрузите изображения и видео товара</p>
            <p className="text-sm mt-1">Первое изображение автоматически станет превью</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
