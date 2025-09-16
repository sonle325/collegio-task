import { DashboardHeader } from "@/components/DashboardHeader";
import { KanbanBoard } from "@/components/KanbanBoard";
import { TeamSidebar } from "@/components/TeamSidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="flex h-[calc(100vh-140px)]">
        <TeamSidebar />
        
        <main className="flex-1 overflow-hidden">
          <KanbanBoard />
        </main>
      </div>
    </div>
  );
};

export default Index;
