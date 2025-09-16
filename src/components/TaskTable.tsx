import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, User } from "lucide-react";

const tasksByCategory = {
  "frontend": [
    {
      id: "1",
      title: "Thiết kế giao diện đăng nhập",
      description: "Tạo mockup và wireframe cho trang đăng nhập với UX/UI hiện đại",
      priority: "high" as const,
      assignee: { name: "Nguyễn Văn A", initials: "NVA" },
      dueDate: "25/09/2024",
      status: "todo" as const,
      progress: 0
    },
    {
      id: "3",
      title: "Xây dựng dashboard chính",
      description: "Phát triển giao diện dashboard với các widgets thống kê",
      priority: "high" as const,
      assignee: { name: "Lê Văn C", initials: "LVC" },
      dueDate: "30/09/2024",
      status: "in-progress" as const,
      progress: 65
    },
    {
      id: "6",
      title: "Responsive mobile design",
      description: "Tối ưu giao diện cho thiết bị di động",
      priority: "medium" as const,
      assignee: { name: "Nguyễn Văn A", initials: "NVA" },
      dueDate: "05/10/2024",
      status: "todo" as const,
      progress: 0
    }
  ],
  "backend": [
    {
      id: "2",
      title: "Nghiên cứu API thanh toán",
      description: "Tìm hiểu và so sánh các giải pháp thanh toán như VNPay, MoMo",
      priority: "medium" as const,
      assignee: { name: "Trần Thị B", initials: "TTB" },
      dueDate: "28/09/2024",
      status: "todo" as const,
      progress: 0
    },
    {
      id: "4",
      title: "Cấu hình database",
      description: "Thiết lập cơ sở dữ liệu và các bảng cần thiết",
      priority: "medium" as const,
      assignee: { name: "Phạm Văn D", initials: "PVD" },
      dueDate: "27/09/2024",
      status: "in-progress" as const,
      progress: 80
    },
    {
      id: "7",
      title: "API Authentication",
      description: "Xây dựng hệ thống xác thực người dùng",
      priority: "high" as const,
      assignee: { name: "Phạm Văn D", initials: "PVD" },
      dueDate: "02/10/2024",
      status: "todo" as const,
      progress: 0
    }
  ],
  "devops": [
    {
      id: "5",
      title: "Khởi tạo dự án",
      description: "Setup môi trường phát triển và cấu trúc thư mục",
      priority: "low" as const,
      assignee: { name: "Hoàng Thị E", initials: "HTE" },
      dueDate: "20/09/2024",
      status: "done" as const,
      progress: 100
    },
    {
      id: "8",
      title: "CI/CD Pipeline",
      description: "Thiết lập tự động hóa deploy và testing",
      priority: "medium" as const,
      assignee: { name: "Hoàng Thị E", initials: "HTE" },
      dueDate: "08/10/2024",
      status: "todo" as const,
      progress: 0
    }
  ],
  "testing": [
    {
      id: "9",
      title: "Unit Test Backend",
      description: "Viết test cases cho các API endpoints",
      priority: "medium" as const,
      assignee: { name: "Trần Thị B", initials: "TTB" },
      dueDate: "12/10/2024",
      status: "todo" as const,
      progress: 0
    },
    {
      id: "10",
      title: "Integration Testing",
      description: "Test tích hợp giữa frontend và backend",
      priority: "high" as const,
      assignee: { name: "Lê Văn C", initials: "LVC" },
      dueDate: "15/10/2024",
      status: "todo" as const,
      progress: 0
    }
  ]
};

const priorityConfig = {
  low: { label: "Thấp", variant: "secondary" as const, color: "text-muted-foreground" },
  medium: { label: "Trung bình", variant: "default" as const, color: "text-warning" },
  high: { label: "Cao", variant: "destructive" as const, color: "text-destructive" },
};

const statusConfig = {
  todo: { label: "Cần làm", variant: "outline" as const },
  "in-progress": { label: "Đang làm", variant: "default" as const },
  done: { label: "Hoàn thành", variant: "secondary" as const },
};

const categoryConfig = {
  frontend: { label: "Frontend", color: "bg-blue-100 text-blue-800", icon: "🎨" },
  backend: { label: "Backend", color: "bg-green-100 text-green-800", icon: "⚙️" },
  devops: { label: "DevOps", color: "bg-purple-100 text-purple-800", icon: "🔧" },
  testing: { label: "Testing", color: "bg-orange-100 text-orange-800", icon: "🧪" },
};

function TaskTableContent({ tasks }: { tasks: any[] }) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[300px] font-semibold">Công việc</TableHead>
              <TableHead className="font-semibold">Người thực hiện</TableHead>
              <TableHead className="font-semibold">Trạng thái</TableHead>
              <TableHead className="font-semibold">Độ ưu tiên</TableHead>
              <TableHead className="font-semibold">Tiến độ</TableHead>
              <TableHead className="font-semibold">Hạn hoàn thành</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => {
              const priorityInfo = priorityConfig[task.priority];
              const statusInfo = statusConfig[task.status];
              
              return (
                <TableRow key={task.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{task.title}</div>
                      <div className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {task.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7">
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          {task.assignee.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{task.assignee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusInfo.variant} className="text-xs">
                      {statusInfo.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={priorityInfo.variant} className="text-xs">
                      {priorityInfo.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{task.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {task.dueDate}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function TaskTable() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Bảng công việc theo hạng mục</h2>
          <p className="text-muted-foreground">Quản lý chi tiết công việc theo từng lĩnh vực</p>
        </div>
      </div>

      <Tabs defaultValue="frontend" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          {Object.entries(categoryConfig).map(([key, config]) => (
            <TabsTrigger key={key} value={key} className="flex items-center gap-2">
              <span>{config.icon}</span>
              {config.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(tasksByCategory).map(([category, tasks]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <Card className="bg-gradient-secondary border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <span className="text-2xl">{categoryConfig[category as keyof typeof categoryConfig].icon}</span>
                  <div>
                    <span className="text-lg font-semibold">{categoryConfig[category as keyof typeof categoryConfig].label}</span>
                    <div className="text-sm text-muted-foreground">
                      {tasks.length} công việc • {tasks.filter(t => t.status === 'done').length} hoàn thành
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100)}% hoàn thành
                  </Badge>
                </CardTitle>
              </CardHeader>
            </Card>
            
            <TaskTableContent tasks={tasks} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}