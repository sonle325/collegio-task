import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Bell, 
  Plus, 
  Filter,
  Calendar,
  Users
} from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="bg-card border-b border-border shadow-card">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Quản lý Công việc
              </h1>
              <p className="text-sm text-muted-foreground">
                Dashboard quản lý dự án và công việc nhóm
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Tìm kiếm công việc..." 
                className="pl-10 w-64 bg-background/50"
              />
            </div>
            
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
            
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Lịch
            </Button>
            
            <Button size="sm" className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Tạo mới
            </Button>
            
            <div className="flex items-center gap-3 pl-3 border-l border-border">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                  3
                </Badge>
              </Button>
              
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  AD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Bar */}
      <div className="px-6 py-3 bg-gradient-secondary border-t border-border/50">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
            <span className="text-muted-foreground">Tổng công việc:</span>
            <span className="font-semibold text-foreground">12</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-warning"></div>
            <span className="text-muted-foreground">Đang làm:</span>
            <span className="font-semibold text-foreground">4</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <span className="text-muted-foreground">Hoàn thành:</span>
            <span className="font-semibold text-foreground">6</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">5 thành viên</span>
          </div>
        </div>
      </div>
    </header>
  );
}