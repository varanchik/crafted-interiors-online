
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CustomOrderForm = () => {
  const { toast } = useToast();
  const [customDimensions, setCustomDimensions] = useState({
    width: '',
    height: '',
    depth: ''
  });
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const handleCustomOrder = () => {
    if (!customDimensions.width || !customDimensions.height || !customDimensions.depth) {
      toast({
        title: "Не указаны размеры",
        description: "Пожалуйста, укажите все размеры.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Заказ на изготовление отправлен",
      description: "Мы свяжемся с вами в течение 24 часов с предложением.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAttachedFile(file);
      toast({
        title: "Файл прикреплен",
        description: `Файл ${file.name} успешно прикреплен.`,
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Заказать индивидуальные размеры</h3>
            <p className="text-muted-foreground mb-6">
              Мы можем изготовить это изделие под ваши точные требования. Пожалуйста, укажите желаемые размеры ниже.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="width">Ширина (см)</Label>
              <Input
                id="width"
                placeholder="198"
                value={customDimensions.width}
                onChange={(e) => setCustomDimensions(prev => ({ ...prev, width: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="height">Высота (см)</Label>
              <Input
                id="height"
                placeholder="76"
                value={customDimensions.height}
                onChange={(e) => setCustomDimensions(prev => ({ ...prev, height: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="depth">Глубина (см)</Label>
              <Input
                id="depth"
                placeholder="91"
                value={customDimensions.depth}
                onChange={(e) => setCustomDimensions(prev => ({ ...prev, depth: e.target.value }))}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">Дополнительные пожелания</Label>
            <Textarea
              id="notes"
              placeholder="Любые особые требования или предпочтения..."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="attachment">Прикрепить файл</Label>
            <div className="mt-2 flex items-center space-x-4">
              <Input
                id="attachment"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
            {attachedFile && (
              <p className="text-sm text-muted-foreground mt-2">
                Прикреплен: {attachedFile.name}
              </p>
            )}
          </div>
          
          <Button onClick={handleCustomOrder} className="btn-primary">
            Отправить запрос на изготовление
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
