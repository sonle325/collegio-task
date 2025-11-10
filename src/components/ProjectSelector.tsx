import { useProjects } from "@/contexts/ProjectContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProjectSelector() {
  const { projects, currentProject, setCurrentProject } = useProjects();

  return (
    <Select
      value={currentProject.id}
      onValueChange={(value) => {
        const project = projects.find((p) => p.id === value);
        if (project) setCurrentProject(project);
      }}
    >
      <SelectTrigger className="w-[280px] bg-background/80 backdrop-blur-sm border-border/50">
        <SelectValue>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentProject.icon}</span>
            <div className="flex flex-col items-start">
              <span className="font-semibold">{currentProject.name}</span>
              <span className="text-xs text-muted-foreground">{currentProject.description}</span>
            </div>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-background border-border shadow-lg">
        {projects.map((project) => (
          <SelectItem key={project.id} value={project.id} className="cursor-pointer">
            <div className="flex items-center gap-3 py-1">
              <span className="text-2xl">{project.icon}</span>
              <div className="flex flex-col">
                <span className="font-semibold">{project.name}</span>
                <span className="text-xs text-muted-foreground">{project.description}</span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
