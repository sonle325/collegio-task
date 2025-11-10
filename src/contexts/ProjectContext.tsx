import { createContext, useContext, useState, ReactNode } from "react";

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  createdAt: Date;
}

interface ProjectContextType {
  projects: Project[];
  currentProject: Project;
  setCurrentProject: (project: Project) => void;
  addProject: (project: Omit<Project, "id" | "createdAt">) => void;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const initialProjects: Project[] = [
  {
    id: "1",
    name: "Web Application",
    description: "Phát triển ứng dụng web quản lý task",
    color: "bg-blue-500",
    icon: "💻",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Marketing Campaign",
    description: "Chiến dịch marketing tổng thể Q1-Q2",
    color: "bg-purple-500",
    icon: "📢",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Content Production",
    description: "Sản xuất nội dung đa kênh",
    color: "bg-green-500",
    icon: "🎨",
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "Brand Development",
    description: "Xây dựng và phát triển thương hiệu",
    color: "bg-orange-500",
    icon: "🎯",
    createdAt: new Date(),
  },
];

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [currentProject, setCurrentProject] = useState<Project>(initialProjects[0]);

  const addProject = (project: Omit<Project, "id" | "createdAt">) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setProjects([...projects, newProject]);
  };

  return (
    <ProjectContext.Provider value={{ projects, currentProject, setCurrentProject, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
}
