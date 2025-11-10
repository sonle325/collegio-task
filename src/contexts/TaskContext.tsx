import { createContext, useContext, useState, ReactNode } from "react";

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  avatar: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high";
  category: string;
  progress: number;
  createdBy: string;
  startDate?: Date;
  dueDate?: Date;
  comments?: Comment[];
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addComment: (taskId: string, comment: Omit<Comment, "id" | "createdAt">) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Thiết kế UI Dashboard",
    description: "Tạo mockup cho trang chủ với các component hiện đại",
    assignee: "Nguyễn Văn A",
    avatar: "/placeholder-avatar.jpg",
    status: "in-progress",
    priority: "high",
    category: "Frontend",
    progress: 60,
    createdBy: "system",
    startDate: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Xây dựng API Authentication",
    description: "Implement JWT authentication và refresh token mechanism",
    assignee: "Trần Thị B",
    avatar: "/placeholder-avatar.jpg",
    status: "done",
    priority: "high",
    category: "Backend",
    progress: 100,
    createdBy: "system",
    startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Thiết kế Database Schema",
    description: "Tạo ERD và implement migration scripts cho PostgreSQL",
    assignee: "Lê Văn C",
    avatar: "/placeholder-avatar.jpg",
    status: "review",
    priority: "high",
    category: "Backend",
    progress: 85,
    createdBy: "system",
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    title: "Viết Unit Tests cho Components",
    description: "Đạt coverage 80% cho các React components chính",
    assignee: "Phạm Thị D",
    avatar: "/placeholder-avatar.jpg",
    status: "in-progress",
    priority: "medium",
    category: "Testing",
    progress: 45,
    createdBy: "system",
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    title: "Tối ưu hóa Performance",
    description: "Giảm bundle size và cải thiện loading time xuống dưới 2s",
    assignee: "Hoàng Văn E",
    avatar: "/placeholder-avatar.jpg",
    status: "todo",
    priority: "medium",
    category: "Frontend",
    progress: 0,
    createdBy: "system",
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: "6",
    title: "Tích hợp Payment Gateway",
    description: "Implement Stripe payment cho subscription plans",
    assignee: "Ngô Thị F",
    avatar: "/placeholder-avatar.jpg",
    status: "todo",
    priority: "high",
    category: "Backend",
    progress: 0,
    createdBy: "system",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
  },
  {
    id: "7",
    title: "Thiết kế Logo và Branding",
    description: "Tạo bộ nhận diện thương hiệu hoàn chỉnh",
    assignee: "Đặng Văn G",
    avatar: "/placeholder-avatar.jpg",
    status: "review",
    priority: "low",
    category: "Design",
    progress: 90,
    createdBy: "system",
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "8",
    title: "Setup CI/CD Pipeline",
    description: "Cấu hình GitHub Actions cho automated testing và deployment",
    assignee: "Vũ Thị H",
    avatar: "/placeholder-avatar.jpg",
    status: "done",
    priority: "medium",
    category: "DevOps",
    progress: 100,
    createdBy: "system",
    startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "9",
    title: "Viết Documentation",
    description: "Tạo API docs và user guide chi tiết",
    assignee: "Bùi Văn I",
    avatar: "/placeholder-avatar.jpg",
    status: "in-progress",
    priority: "low",
    category: "Documentation",
    progress: 30,
    createdBy: "system",
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: "10",
    title: "Implement Real-time Chat",
    description: "Xây dựng tính năng chat real-time với WebSocket",
    assignee: "Nguyễn Văn A",
    avatar: "/placeholder-avatar.jpg",
    status: "todo",
    priority: "high",
    category: "Frontend",
    progress: 0,
    createdBy: "system",
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
  },
  {
    id: "11",
    title: "Security Audit",
    description: "Kiểm tra và fix các lỗ hổng bảo mật",
    assignee: "Trần Thị B",
    avatar: "/placeholder-avatar.jpg",
    status: "in-progress",
    priority: "high",
    category: "Security",
    progress: 50,
    createdBy: "system",
    startDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "12",
    title: "Mobile Responsive Design",
    description: "Tối ưu giao diện cho mobile và tablet",
    assignee: "Lê Văn C",
    avatar: "/placeholder-avatar.jpg",
    status: "review",
    priority: "medium",
    category: "Frontend",
    progress: 80,
    createdBy: "system",
    startDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: "13",
    title: "Chiến dịch Social Media Q1",
    description: "Lên kế hoạch và thực hiện chiến dịch marketing trên Facebook, Instagram và TikTok",
    assignee: "Nguyễn Thị K",
    avatar: "/placeholder-avatar.jpg",
    status: "in-progress",
    priority: "high",
    category: "Marketing",
    progress: 55,
    createdBy: "system",
    startDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000),
  },
  {
    id: "14",
    title: "SEO Content Strategy",
    description: "Nghiên cứu từ khóa và xây dựng chiến lược nội dung SEO cho website",
    assignee: "Trần Văn L",
    avatar: "/placeholder-avatar.jpg",
    status: "todo",
    priority: "high",
    category: "Marketing",
    progress: 0,
    createdBy: "system",
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000),
  },
  {
    id: "15",
    title: "Video Content Production",
    description: "Sản xuất 10 video ngắn giới thiệu sản phẩm cho YouTube và TikTok",
    assignee: "Phạm Thị M",
    avatar: "/placeholder-avatar.jpg",
    status: "in-progress",
    priority: "medium",
    category: "Content",
    progress: 40,
    createdBy: "system",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: "16",
    title: "Blog Content Calendar",
    description: "Lập kế hoạch và viết 20 bài blog cho tháng tới",
    assignee: "Lê Thị N",
    avatar: "/placeholder-avatar.jpg",
    status: "in-progress",
    priority: "medium",
    category: "Content",
    progress: 65,
    createdBy: "system",
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
  },
  {
    id: "17",
    title: "Email Marketing Campaign",
    description: "Thiết kế và triển khai chiến dịch email marketing cho khách hàng mới",
    assignee: "Hoàng Văn O",
    avatar: "/placeholder-avatar.jpg",
    status: "review",
    priority: "high",
    category: "Marketing",
    progress: 85,
    createdBy: "system",
    startDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "18",
    title: "Infographic Design Series",
    description: "Tạo 15 infographic về các tính năng sản phẩm cho social media",
    assignee: "Ngô Thị P",
    avatar: "/placeholder-avatar.jpg",
    status: "todo",
    priority: "medium",
    category: "Content",
    progress: 0,
    createdBy: "system",
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
  },
  {
    id: "19",
    title: "Influencer Partnership Program",
    description: "Tìm kiếm và hợp tác với 10 influencer trong ngành",
    assignee: "Đỗ Văn Q",
    avatar: "/placeholder-avatar.jpg",
    status: "in-progress",
    priority: "high",
    category: "Marketing",
    progress: 30,
    createdBy: "system",
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: "20",
    title: "Podcast Content Strategy",
    description: "Lên kế hoạch và ghi âm 8 tập podcast về chuyên môn",
    assignee: "Vũ Thị R",
    avatar: "/placeholder-avatar.jpg",
    status: "todo",
    priority: "low",
    category: "Content",
    progress: 0,
    createdBy: "system",
    startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
  },
  {
    id: "21",
    title: "Google Ads Campaign Optimization",
    description: "Tối ưu hóa chiến dịch quảng cáo Google Ads để giảm CPC 30%",
    assignee: "Bùi Văn S",
    avatar: "/placeholder-avatar.jpg",
    status: "done",
    priority: "high",
    category: "Marketing",
    progress: 100,
    createdBy: "system",
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "22",
    title: "Case Study Writing",
    description: "Viết 5 case study thành công của khách hàng",
    assignee: "Nguyễn Thị T",
    avatar: "/placeholder-avatar.jpg",
    status: "review",
    priority: "medium",
    category: "Content",
    progress: 75,
    createdBy: "system",
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  },
];

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addComment = (taskId: string, comment: Omit<Comment, "id" | "createdAt">) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newComment: Comment = {
          id: Date.now().toString(),
          createdAt: new Date(),
          ...comment,
        };
        return {
          ...task,
          comments: [...(task.comments || []), newComment],
        };
      }
      return task;
    }));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, addComment }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
