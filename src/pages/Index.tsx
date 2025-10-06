import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { KanbanBoard } from "@/components/KanbanBoard";
import { TaskTable } from "@/components/TaskTable";
import { CalendarView } from "@/components/CalendarView";
import { TeamSidebar } from "@/components/TeamSidebar";

const Index = () => {
  const [currentView, setCurrentView] = useState<'kanban' | 'table' | 'calendar'>('kanban');

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex h-[calc(100vh-140px)]">
        <TeamSidebar />
        
        <main className="flex-1 overflow-hidden">
          {currentView === 'kanban' && <KanbanBoard />}
          {currentView === 'table' && <TaskTable />}
          {currentView === 'calendar' && <CalendarView />}
        </main>
      </div>
    </div>
  );
};

export default Index;
