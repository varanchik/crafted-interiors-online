
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId: number;
}

export const ProductShareDialog = ({ isOpen, onClose, productName, productId }: ProductShareDialogProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const shareUrl = `${window.location.origin}/product/${productId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Ссылка скопирована",
        description: "Ссылка на товар скопирована в буфер обмена",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать ссылку",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `Посмотри этот товар: ${productName}`,
          url: shareUrl,
        });
      } catch (error) {
        // Пользователь отменил поделиться или произошла ошибка
      }
    } else {
      // Fallback - копируем ссылку
      handleCopyLink();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Share2 className="h-5 w-5" />
            <span>Поделиться товаром</span>
          </DialogTitle>
          <DialogDescription>
            Поделитесь ссылкой на {productName} с друзьями
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              value={shareUrl}
              readOnly
              className="flex-1"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={handleCopyLink}
              className="shrink-0"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={handleShare} className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Поделиться
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
