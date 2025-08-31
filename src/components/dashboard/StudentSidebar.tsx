import { 
  BookOpen, 
  MessageSquare, 
  Target, 
  Calendar, 
  Users, 
  HelpCircle,
  Home,
  GraduationCap,
  FileText,
  Clock
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/dashboard?role=student", 
    icon: Home,
    description: "Overview and quick stats"
  },
  { 
    title: "Find Books", 
    url: "/dashboard?role=student&page=books", 
    icon: BookOpen,
    description: "Search academic resources"
  },
  { 
    title: "FYP Studio", 
    url: "/dashboard?role=student&page=fyp-studio", 
    icon: Target,
    description: "Final year project help"
  },
  { 
    title: "Ask Question", 
    url: "/dashboard?role=student&page=ask-question", 
    icon: MessageSquare,
    description: "Get help from seniors"
  },
  { 
    title: "Study Groups", 
    url: "/dashboard?role=student&page=study-groups", 
    icon: Users,
    description: "Join collaborative sessions"
  },
  { 
    title: "Assignments", 
    url: "/dashboard?role=student&page=assignments", 
    icon: FileText,
    description: "Track your tasks"
  },
  { 
    title: "Schedule", 
    url: "/dashboard?role=student&page=schedule", 
    icon: Calendar,
    description: "Manage your time"
  },
  { 
    title: "Help Center", 
    url: "/dashboard?role=student&page=help", 
    icon: HelpCircle,
    description: "Support and guides"
  }
];

export function StudentSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-accent/50";

  return (
    <Sidebar
      className={collapsed ? "w-16" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="border-r">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-primary" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-sm">Student Portal</h2>
                <p className="text-xs text-muted-foreground">Academic Dashboard</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${getNavCls({ isActive })}`}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium">{item.title}</span>
                          <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="p-4 mt-auto border-t">
            <div className="bg-accent/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Study Streak</span>
              </div>
              <p className="text-2xl font-bold text-primary">15 days</p>
              <p className="text-xs text-muted-foreground">Keep it up! 🔥</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}