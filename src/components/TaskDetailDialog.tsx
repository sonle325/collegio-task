import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar, 
  Clock, 
  User, 
  MessageSquare,
  Send,
  Tag,
  TrendingUp
} from "lucide-react";
import { Task, useTasks } from "@/contexts/TaskContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const statusConfig = {
  todo: { label: "Cần làm", variant: "outline" as const, color: "text-muted-foreground" },
  "in-progress": { label: "Đang làm", variant: "default" as const, color: "text-primary" },
  review: { label: "Đang review", variant: "secondary" as const, color: "text-secondary" },
  done: { label: "Hoàn thành", variant: "secondary" as const, color: "text-success" },
};

const priorityConfig = {
  low: { label: "Thấp", variant: "secondary" as const },
  medium: { label: "Trung bình", variant: "default" as const },
  high: { label: "Cao", variant: "destructive" as const },
};

interface TaskDetailDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDetailDialog({ task, open, onOpenChange }: TaskDetailDialogProps) {
  const { updateTask, addComment } = useTasks();
  const { user } = useAuth();
  const { toast } = useToast();
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusChange = (newStatus: Task["status"]) => {
    updateTask(task.id, { status: newStatus });
    toast({
      title: "Cập nhật thành công!",
      description: `Đã chuyển trạng thái sang "${statusConfig[newStatus].label}"`,
    });
  };

  const handleProgressChange = (value: number[]) => {
    updateTask(task.id, { progress: value[0] });
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Bạn cần đăng nhập để thêm ý kiến.",
      });
      return;
    }

    if (!commentText.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    addComment(task.id, {
      text: commentText.trim(),
      author: user.name,
    });

    toast({
      title: "Đã thêm ý kiến!",
      description: "Ý kiến của bạn đã được ghi nhận.",
    });

    setCommentText("");
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{task.title}</DialogTitle>
          <DialogDescription>
            Chi tiết công việc và quản lý trạng thái
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Status and Priority Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Trạng thái
                </Label>
                <Select value={task.status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">Cần làm</SelectItem>
                    <SelectItem value="in-progress">Đang làm</SelectItem>
                    <SelectItem value="review">Đang review</SelectItem>
                    <SelectItem value="done">Hoàn thành</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Độ ưu tiên
                </Label>
                <Badge variant={priorityConfig[task.priority].variant} className="w-full justify-center py-2">
                  {priorityConfig[task.priority].label}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Mô tả</Label>
              <p className="text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg">
                {task.description || "Không có mô tả"}
              </p>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Tiến độ</Label>
                <span className="text-sm font-medium">{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-2" />
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Người thực hiện
                </Label>
                <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      {task.assignee ? task.assignee.split(' ').map(n => n[0]).join('').toUpperCase() : 'N/A'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{task.assignee || "Chưa phân công"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Hạng mục
                </Label>
                <Badge variant="outline" className="w-full justify-center py-2">
                  {task.category}
                </Badge>
              </div>
            </div>

            {/* Dates */}
            {(task.startDate || task.dueDate) && (
              <div className="grid grid-cols-2 gap-4">
                {task.startDate && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Ngày bắt đầu
                    </Label>
                    <div className="text-sm p-2 bg-muted/30 rounded-lg">
                      {format(task.startDate, "dd/MM/yyyy", { locale: vi })}
                    </div>
                  </div>
                )}
                {task.dueDate && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Ngày hết hạn
                    </Label>
                    <div className="text-sm p-2 bg-muted/30 rounded-lg">
                      {format(task.dueDate, "dd/MM/yyyy", { locale: vi })}
                    </div>
                  </div>
                )}
              </div>
            )}

            <Separator />

            {/* Comments Section */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2 text-base">
                <MessageSquare className="w-5 h-5" />
                Ý kiến ({task.comments?.length || 0})
              </Label>

              {/* Comments List */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {task.comments && task.comments.length > 0 ? (
                  task.comments.map((comment) => (
                    <div key={comment.id} className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                              {comment.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{comment.author}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(comment.createdAt, "dd/MM/yyyy HH:mm", { locale: vi })}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Chưa có ý kiến nào</p>
                  </div>
                )}
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="space-y-3">
                <Textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Thêm ý kiến của bạn..."
                  rows={3}
                  disabled={!user}
                />
                <Button 
                  type="submit" 
                  disabled={!commentText.trim() || isSubmitting || !user}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Đang gửi..." : "Gửi ý kiến"}
                </Button>
                {!user && (
                  <p className="text-xs text-muted-foreground text-center">
                    Bạn cần đăng nhập để thêm ý kiến
                  </p>
                )}
              </form>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
