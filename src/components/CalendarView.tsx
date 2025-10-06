import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useTasks } from "@/contexts/TaskContext";
import { format, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarDays, Clock } from "lucide-react";

const statusConfig = {
  todo: { label: "Cần làm", variant: "outline" as const },
  "in-progress": { label: "Đang làm", variant: "default" as const },
  review: { label: "Đang review", variant: "secondary" as const },
  done: { label: "Hoàn thành", variant: "secondary" as const },
};

const priorityConfig = {
  low: { label: "Thấp", variant: "secondary" as const },
  medium: { label: "Trung bình", variant: "default" as const },
  high: { label: "Cao", variant: "destructive" as const },
};

export function CalendarView() {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const tasksWithDates = tasks.filter(task => task.dueDate || task.startDate);
  
  const datesWithTasks = tasksWithDates.map(task => task.dueDate || task.startDate).filter(Boolean) as Date[];

  const selectedDateTasks = selectedDate
    ? tasksWithDates.filter(task => {
        if (task.dueDate && isSameDay(task.dueDate, selectedDate)) return true;
        if (task.startDate && isSameDay(task.startDate, selectedDate)) return true;
        return false;
      })
    : [];

  const upcomingTasks = tasksWithDates
    .filter(task => task.dueDate && task.dueDate >= new Date())
    .sort((a, b) => {
      const dateA = a.dueDate?.getTime() || 0;
      const dateB = b.dueDate?.getTime() || 0;
      return dateA - dateB;
    })
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <CalendarDays className="w-6 h-6" />
            Lịch công việc
          </h2>
          <p className="text-muted-foreground">Quản lý thời gian và deadline cho các công việc</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Chọn ngày</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={vi}
              className="rounded-md border pointer-events-auto"
              modifiers={{
                hasTask: datesWithTasks,
              }}
              modifiersStyles={{
                hasTask: {
                  fontWeight: "bold",
                  textDecoration: "underline",
                },
              }}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDate ? `Công việc ngày ${format(selectedDate, "dd/MM/yyyy", { locale: vi })}` : "Chọn ngày để xem công việc"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateTasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Không có công việc nào trong ngày này</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDateTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{task.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {task.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={statusConfig[task.status].variant} className="text-xs">
                            {statusConfig[task.status].label}
                          </Badge>
                          <Badge variant={priorityConfig[task.priority].variant} className="text-xs">
                            {priorityConfig[task.priority].label}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {task.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        {task.startDate && (
                          <div className="flex items-center gap-1 mb-1">
                            <Clock className="w-3 h-3" />
                            <span>Bắt đầu: {format(task.startDate, "dd/MM")}</span>
                          </div>
                        )}
                        {task.dueDate && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Hết hạn: {format(task.dueDate, "dd/MM")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Công việc sắp đến hạn
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Không có công việc nào sắp đến hạn</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingTasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{task.title}</h4>
                    <p className="text-sm text-muted-foreground">{task.assignee || "Chưa phân công"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={statusConfig[task.status].variant} className="text-xs">
                      {statusConfig[task.status].label}
                    </Badge>
                    {task.dueDate && (
                      <div className="text-sm text-muted-foreground whitespace-nowrap">
                        {format(task.dueDate, "dd/MM/yyyy")}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
