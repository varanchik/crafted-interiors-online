
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Reply } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  image: string;
  replies: Array<{
    id: number;
    name: string;
    comment: string;
    date: string;
  }>;
}

interface ProductReviewsProps {
  reviews: Review[];
  onReviewsUpdate: (reviews: Review[]) => void;
}

export const ProductReviews = ({ reviews, onReviewsUpdate }: ProductReviewsProps) => {
  const { toast } = useToast();
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleReply = (reviewId: number) => {
    if (!replyText.trim()) return;

    const updatedReviews = reviews.map(review => 
      review.id === reviewId 
        ? {
            ...review,
            replies: [...review.replies, {
              id: Date.now(),
              name: "Гость",
              comment: replyText,
              date: new Date().toISOString().split('T')[0]
            }]
          }
        : review
    );

    onReviewsUpdate(updatedReviews);
    setReplyText("");
    setReplyingTo(null);
    toast({
      title: "Ответ отправлен",
      description: "Ваш ответ добавлен к комментарию.",
    });
  };

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i <= review.rating
                                ? 'fill-white-400 text-white-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Проверенная покупка
                        </Badge>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <p className="text-muted-foreground mb-3">{review.comment}</p>

                {/* Replies */}
                {review.replies.length > 0 && (
                  <div className="ml-4 space-y-3 mb-3">
                    {review.replies.map((reply) => (
                      <div key={reply.id} className="bg-muted p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{reply.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(reply.date).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                        <p className="text-sm">{reply.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                {replyingTo === review.id ? (
                  <div className="ml-4 space-y-3">
                    <Textarea
                      placeholder="Ваш ответ..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="min-h-20"
                    />
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleReply(review.id)}
                        className="btn-primary"
                      >
                        Отправить
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyText("");
                        }}
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReplyingTo(review.id)}
                    className="ml-4"
                  >
                    <Reply className="h-4 w-4 mr-2" />
                    Ответить
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
