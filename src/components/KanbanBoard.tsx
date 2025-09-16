import { TaskCard } from "./TaskCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const sampleTasks = {
  todo: [
    {
      id: "1",
      title: "Thiết kế giao diện đăng nhập",
      description: "Tạo mockup và wireframe cho trang đăng nhập với UX/UI hiện đại",
      priority: "high" as const,
      assignee: { name: "Nguyễn Văn A", initials: "NVA" },
      dueDate: "25/09",
      status: "todo" as const,
      tags: ["UI/UX", "Frontend"]
    },
    {
      id: "2", 
      title: "Nghiên cứu API thanh toán",
      description: "Tìm hiểu và so sánh các giải pháp thanh toán như VNPay, MoMo",
      priority: "medium" as const,
      assignee: { name: "Trần Thị B", initials: "TTB" },
      dueDate: "28/09",
      status: "todo" as const,
      tags: ["Backend", "API"]
    }
  ],
  inProgress: [
    {
      id: "3",
      title: "Xây dựng dashboard chính",
      description: "Phát triển giao diện dashboard với các widgets thống kê",
      priority: "high" as const,
      assignee: { name: "Lê Văn C", initials: "LVC" },
      dueDate: "30/09",
      status: "in-progress" as const,
      tags: ["Frontend", "Dashboard"]
    },
    {
      id: "4",
      title: "Cấu hình database",
      description: "Thiết lập cơ sở dữ liệu và các bảng cần thiết",
      priority: "medium" as const,
      assignee: { name: "Phạm Văn D", initials: "PVD" },
      dueDate: "27/09",
      status: "in-progress" as const,
      tags: ["Database", "Backend"]
    }
  ],
  done: [
    {
      id: "5",
      title: "Khởi tạo dự án",
      description: "Setup môi trường phát triển và cấu trúc thư mục",
      priority: "low" as const,
      assignee: { name: "Hoàng Thị E", initials: "HTE" },
      dueDate: "20/09",
      status: "done" as const,
      tags: ["Setup", "DevOps"]
    }
  ]
};

const columns = [
  { 
    id: "todo", 
    title: "Cần làm", 
    tasks: sampleTasks.todo,
    color: "bg-gradient-to-br from-muted to-muted/50"
  },
  { 
    id: "inProgress", 
    title: "Đang làm", 
    tasks: sampleTasks.inProgress,
    color: "bg-gradient-to-br from-warning/10 to-warning/5"
  },
  { 
    id: "done", 
    title: "Hoàn thành", 
    tasks: sampleTasks.done,
    color: "bg-gradient-to-br from-success/10 to-success/5"
  }
];

export function KanbanBoard() {
  return (
    <div className="flex gap-6 h-full p-6 overflow-x-auto">
      {columns.map((column) => (
        <div key={column.id} className="flex-shrink-0 w-80">
          <Card className={`h-full ${column.color} border-border/50 shadow-card`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-foreground font-semibold">{column.title}</span>
                <Badge variant="secondary" className="bg-background/80">
                  {column.tasks.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-4">
              {column.tasks.map((task) => (
                <div key={task.id} className="animate-fade-in">
                  <TaskCard {...task} />
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full bg-background/50 border-dashed hover:bg-background/80 transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm công việc
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}