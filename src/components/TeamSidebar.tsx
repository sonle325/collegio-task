import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Calendar, 
  Target, 
  TrendingUp,
  Clock,
  CheckCircle2,
  Plus
} from "lucide-react";

const teamMembers = [
  { 
    name: "Nguyễn Văn A", 
    initials: "NVA", 
    role: "Frontend Dev", 
    status: "online",
    tasksCompleted: 8,
    totalTasks: 10
  },
  { 
    name: "Trần Thị B", 
    initials: "TTB", 
    role: "Backend Dev", 
    status: "busy",
    tasksCompleted: 6,
    totalTasks: 8
  },
  { 
    name: "Lê Văn C", 
    initials: "LVC", 
    role: "UI/UX Designer", 
    status: "offline",
    tasksCompleted: 12,
    totalTasks: 15
  },
  { 
    name: "Phạm Văn D", 
    initials: "PVD", 
    role: "DevOps", 
    status: "online",
    tasksCompleted: 4,
    totalTasks: 6
  },
  { 
    name: "Hoàng Thị E", 
    initials: "HTE", 
    role: "QA Tester", 
    status: "busy",
    tasksCompleted: 9,
    totalTasks: 11
  }
];

const statusColors = {
  online: "bg-success",
  busy: "bg-warning", 
  offline: "bg-muted-foreground"
};

export function TeamSidebar() {
  return (
    <div className="w-80 border-r border-border bg-card/50 p-6 space-y-6 overflow-y-auto">
      {/* Project Stats */}
      <Card className="bg-gradient-primary text-white border-0 shadow-hover">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6" />
            <h3 className="font-semibold">Dự án Web App</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Tiến độ hoàn thành</span>
                <span>72%</span>
              </div>
              <Progress value={72} className="bg-white/20" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <div>
                  <div className="font-semibold">24</div>
                  <div className="opacity-80">Hoàn thành</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <div>
                  <div className="font-semibold">8</div>
                  <div className="opacity-80">Còn lại</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Thành viên nhóm
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors cursor-pointer group">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${statusColors[member.status]}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                    {member.name}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">{member.role}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Progress 
                    value={(member.tasksCompleted / member.totalTasks) * 100} 
                    className="h-1 flex-1"
                  />
                  <span className="text-xs text-muted-foreground">
                    {member.tasksCompleted}/{member.totalTasks}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-4">
            <Plus className="w-4 h-4 mr-2" />
            Mời thành viên
          </Button>
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Thống kê nhanh
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-success/10 rounded-lg">
              <Calendar className="w-5 h-5 mx-auto mb-2 text-success" />
              <div className="text-xl font-bold text-success">5</div>
              <div className="text-xs text-muted-foreground">Hôm nay</div>
            </div>
            <div className="text-center p-3 bg-warning/10 rounded-lg">
              <Clock className="w-5 h-5 mx-auto mb-2 text-warning" />
              <div className="text-xl font-bold text-warning">3</div>
              <div className="text-xs text-muted-foreground">Quá hạn</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}