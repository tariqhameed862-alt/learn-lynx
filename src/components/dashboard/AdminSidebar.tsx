import { Home, Users, Shield, FileText, GraduationCap, BookOpen, Settings, BarChart3, UserPlus, MessageCircle, Calendar, TrendingUp } from "lucide-react";
import { useSearchParams } from "react-router-dom";
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

const adminMenuItems = [
  {
    title: "Dashboard",
    url: "?role=admin&page=dashboard",
    icon: Home,
  },
  {
    title: "Account Management",
    items: [
      {
        title: "Users",
        url: "?role=admin&page=users",
        icon: Users,
      },
      {
        title: "Roles",
        url: "?role=admin&page=roles",
        icon: Shield,
      },
      {
        title: "Permissions",
        url: "?role=admin&page=permissions",
        icon: Shield,
      },
      {
        title: "Pages",
        url: "?role=admin&page=pages",
        icon: FileText,
      },
    ],
  },
  {
    title: "Academic Management",
    items: [
      {
        title: "Books & Library",
        url: "?role=admin&page=books-management",
        icon: BookOpen,
      },
      {
        title: "FYP Projects",
        url: "?role=admin&page=fyp-projects",
        icon: GraduationCap,
      },
      {
        title: "Q&A Monitoring",
        url: "?role=admin&page=qa-monitoring",
        icon: MessageCircle,
      },
    ],
  },
  {
    title: "Student Management",
    items: [
      {
        title: "Students Overview",
        url: "?role=admin&page=students",
        icon: Users,
      },
      {
        title: "Admissions",
        url: "?role=admin&page=student-admissions",
        icon: UserPlus,
      },
    ],
  },
  {
    title: "Teacher Management",
    items: [
      {
        title: "Teachers Overview",
        url: "?role=admin&page=teachers",
        icon: Users,
      },
      {
        title: "Assignments",
        url: "?role=admin&page=teacher-assignments",
        icon: Calendar,
      },
      {
        title: "Performance",
        url: "?role=admin&page=teacher-performance",
        icon: TrendingUp,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Analytics",
        url: "?role=admin&page=analytics",
        icon: BarChart3,
      },
      {
        title: "Settings",
        url: "?role=admin&page=system-settings",
        icon: Settings,
      },
    ],
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "dashboard";

  const isActive = (url: string) => {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    return urlParams.get("page") === currentPage;
  };

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-primary">
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href={adminMenuItems[0].url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive(adminMenuItems[0].url)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    }`}
                  >
                    <Home className="w-5 h-5" />
                    {state !== "collapsed" && <span>{adminMenuItems[0].title}</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {adminMenuItems.slice(1).map((section, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel className="text-sm font-medium text-muted-foreground">
              {state !== "collapsed" && section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items?.map((item, itemIndex) => (
                  <SidebarMenuItem key={itemIndex}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive(item.url)
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}