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
import { Calendar } from "lucide-react";
import { useTasks } from "@/contexts/TaskContext";

const priorityConfig = {
  low: { label: "Thấp", variant: "secondary" as const, color: "text-muted-foreground" },
  medium: { label: "Trung bình", variant: "default" as const, color: "text-warning" },
  high: { label: "Cao", variant: "destructive" as const, color: "text-destructive" },
};

const statusConfig = {
  todo: { label: "Cần làm", variant: "outline" as const },
  "in-progress": { label: "Đang làm", variant: "default" as const },
  review: { label: "Đang review", variant: "secondary" as const },
  done: { label: "Hoàn thành", variant: "secondary" as const },
};

export function TaskTable() {
  const { tasks } = useTasks();
  
  const tasksByCategory = {
    "Frontend": tasks.filter(t => t.category === "Frontend"),
    "Backend": tasks.filter(t => t.category === "Backend"),
    "DevOps": tasks.filter(t => t.category === "DevOps"),
    "Testing": tasks.filter(t => t.category === "Testing"),
  };

  const categoryConfig = {
    Frontend: { label: "Frontend", color: "bg-blue-100 text-blue-800", icon: "🎨" },
    Backend: { label: "Backend", color: "bg-green-100 text-green-800", icon: "⚙️" },
    DevOps: { label: "DevOps", color: "bg-purple-100 text-purple-800", icon: "🔧" },
    Testing: { label: "Testing", color: "bg-orange-100 text-orange-800", icon: "🧪" },
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Bảng công việc theo hạng mục</h2>
          <p className="text-muted-foreground">Quản lý chi tiết công việc theo từng lĩnh vực</p>
        </div>
      </div>

      <Tabs defaultValue="Frontend" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          {Object.entries(categoryConfig).map(([key, config]) => (
            <TabsTrigger key={key} value={key} className="flex items-center gap-2">
              <span>{config.icon}</span>
              {config.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <Card className="bg-gradient-secondary border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <span className="text-2xl">{categoryConfig[category as keyof typeof categoryConfig].icon}</span>
                  <div>
                    <span className="text-lg font-semibold">{categoryConfig[category as keyof typeof categoryConfig].label}</span>
                    <div className="text-sm text-muted-foreground">
                      {categoryTasks.length} công việc • {categoryTasks.filter(t => t.status === 'done').length} hoàn thành
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {categoryTasks.length > 0 ? Math.round((categoryTasks.filter(t => t.status === 'done').length / categoryTasks.length) * 100) : 0}% hoàn thành
                  </Badge>
                </CardTitle>
              </CardHeader>
            </Card>
            
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryTasks.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          Chưa có công việc nào
                        </TableCell>
                      </TableRow>
                    ) : (
                      categoryTasks.map((task) => {
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
                                    {task.assignee ? task.assignee.split(' ').map(n => n[0]).join('').toUpperCase() : 'N/A'}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{task.assignee || 'Chưa phân công'}</span>
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
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}