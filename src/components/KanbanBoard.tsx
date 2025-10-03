import { TaskCard } from "./TaskCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/contexts/TaskContext";

export function KanbanBoard() {
  const { tasks } = useTasks();
  
  const columns = [
    { 
      id: "todo", 
      title: "Cần làm", 
      tasks: tasks.filter(t => t.status === "todo"),
      color: "bg-gradient-to-br from-muted to-muted/50"
    },
    { 
      id: "in-progress", 
      title: "Đang làm", 
      tasks: tasks.filter(t => t.status === "in-progress"),
      color: "bg-gradient-to-br from-warning/10 to-warning/5"
    },
    { 
      id: "review", 
      title: "Đang review", 
      tasks: tasks.filter(t => t.status === "review"),
      color: "bg-gradient-to-br from-primary/10 to-primary/5"
    },
    { 
      id: "done", 
      title: "Hoàn thành", 
      tasks: tasks.filter(t => t.status === "done"),
      color: "bg-gradient-to-br from-success/10 to-success/5"
    }
  ];
  
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
                  <TaskCard 
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    assignee={{ name: task.assignee, initials: task.assignee.split(' ').map(n => n[0]).join('').toUpperCase() }}
                    dueDate={new Date().toLocaleDateString('vi-VN')}
                    status={task.status}
                    tags={[task.category]}
                  />
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