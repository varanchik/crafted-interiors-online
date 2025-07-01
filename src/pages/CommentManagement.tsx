
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageCircle, Reply, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CommentManagement = () => {
  const { toast } = useToast();
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  // Mock данные комментариев
  const [comments, setComments] = useState([
    {
      id: 1,
      productId: 1,
      productName: "Дубовый обеденный стол",
      author: "Анна Иванова",
      email: "anna@example.com",
      rating: 5,
      text: "Отличный стол! Качество превзошло ожидания.",
      date: "2024-01-15",
      status: "published",
      replies: [
        {
          id: 101,
          author: "Администратор",
          text: "Спасибо за отзыв! Рады, что вам понравился наш стол.",
          date: "2024-01-16"
        }
      ]
    },
    {
      id: 2,
      productId: 1,
      productName: "Дубовый обеденный стол",
      author: "Михаил Петров",
      email: "mikhail@example.com",
      rating: 4,
      text: "Хороший стол, но доставка задержалась на несколько дней.",
      date: "2024-01-14",
      status: "published",
      replies: []
    },
    {
      id: 3,
      productId: 2,
      productName: "Ореховый журнальный столик",
      author: "Елена Сидорова",
      email: "elena@example.com",
      rating: 3,
      text: "Столик красивый, но цена завышена.",
      date: "2024-01-13",
      status: "pending",
      replies: []
    }
  ]);

  const handleReply = (commentId: number) => {
    if (!replyText.trim()) return;

    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? {
            ...comment,
            replies: [...comment.replies, {
              id: Date.now(),
              author: "Администратор",
              text: replyText,
              date: new Date().toISOString().split('T')[0]
            }]
          }
        : comment
    ));

    setReplyText("");
    setReplyingTo(null);
    toast({
      title: "Ответ отправлен",
      description: "Ваш ответ успешно добавлен к комментарию.",
    });
  };

  const handleStatusChange = (commentId: number, newStatus: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, status: newStatus }
        : comment
    ));

    toast({
      title: "Статус изменен",
      description: `Комментарий ${newStatus === 'published' ? 'опубликован' : 'скрыт'}.`,
    });
  };

  const handleDelete = (commentId: number) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    toast({
      title: "Комментарий удален",
      description: "Комментарий успешно удален.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-white-100 text-white-800';
      case 'hidden':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Опубликован';
      case 'pending':
        return 'На модерации';
      case 'hidden':
        return 'Скрыт';
      default:
        return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Назад к админке
                </Button>
              </Link>
              <h1 className="text-3xl font-serif font-bold">Управление комментариями</h1>
            </div>
            <Badge variant="secondary">{comments.length} комментариев</Badge>
          </div>

          <div className="space-y-6">
            {comments.map((comment) => (
              <Card key={comment.id} className="border-0 shadow-soft">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <CardTitle className="text-lg">{comment.author}</CardTitle>
                      <Badge className={getStatusColor(comment.status)} variant="secondary">
                        {getStatusText(comment.status)}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 rounded-full ${
                              i <= comment.rating ? 'bg-white-400' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {new Date(comment.date).toLocaleDateString('ru-RU')}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusChange(
                          comment.id, 
                          comment.status === 'published' ? 'hidden' : 'published'
                        )}
                      >
                        {comment.status === 'published' ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(comment.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Товар: <Link to={`/product/${comment.productId}`} className="text-primary hover:underline">
                        {comment.productName}
                      </Link>
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Email: {comment.email}
                    </p>
                    <p className="text-foreground">{comment.text}</p>
                  </div>

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="ml-6 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="bg-muted p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{reply.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(reply.date).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                          <p className="text-sm">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingTo === comment.id ? (
                    <div className="ml-6 space-y-3">
                      <Textarea
                        placeholder="Ваш ответ..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="min-h-20"
                      />
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleReply(comment.id)}
                          className="btn-primary"
                        >
                          Отправить ответ
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
                      onClick={() => setReplyingTo(comment.id)}
                      className="ml-6"
                    >
                      <Reply className="h-4 w-4 mr-2" />
                      Ответить
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentManagement;
