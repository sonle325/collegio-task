import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Flag } from "lucide-react";

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  assignee: {
    name: string;
    avatar?: string;
    initials: string;
  };
  dueDate: string;
  status: "todo" | "in-progress" | "review" | "done";
  tags?: string[];
}

const priorityConfig = {
  low: { label: "Thấp", variant: "secondary" as const, icon: "🟢" },
  medium: { label: "Trung bình", variant: "default" as const, icon: "🟡" },
  high: { label: "Cao", variant: "destructive" as const, icon: "🔴" },
};

export function TaskCard({ 
  title, 
  description, 
  priority, 
  assignee, 
  dueDate, 
  tags = [] 
}: TaskCardProps) {
  const priorityInfo = priorityConfig[priority];
  
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-hover hover:scale-105 bg-gradient-to-br from-card to-card/50 border-border/50">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-sm leading-tight text-card-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <Badge variant={priorityInfo.variant} className="ml-2 shrink-0 text-xs">
            {priorityInfo.icon} {priorityInfo.label}
          </Badge>
        </div>
        
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{dueDate}</span>
          </div>
          
          <Avatar className="w-6 h-6">
            <AvatarImage src={assignee.avatar} alt={assignee.name} />
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
              {assignee.initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
    </Card>
  );
}