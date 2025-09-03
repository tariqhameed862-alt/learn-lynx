import { Home, Users, Shield, FileText, GraduationCap, BookOpen, Settings, BarChart3, UserPlus, MessageCircle, Calendar, TrendingUp, ChevronDown } from "lucide-react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <SidebarContent className="custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-primary px-4 py-3">
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href={adminMenuItems[0].url}
                    className={`flex items-center gap-3 px-3 py-2 mx-2 rounded-lg transition-colors ${
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

        <ScrollArea className="flex-1 px-2">
          {state !== "collapsed" ? (
            <Accordion type="multiple" className="w-full space-y-2">
              {adminMenuItems.slice(1).map((section, index) => (
                <AccordionItem 
                  key={index} 
                  value={`section-${index}`}
                  className="border border-border/30 rounded-lg bg-card/30"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/50 rounded-lg">
                    <span className="text-sm font-medium text-foreground">
                      {section.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <SidebarMenu className="space-y-1">
                      {section.items?.map((item, itemIndex) => (
                        <SidebarMenuItem key={itemIndex}>
                          <SidebarMenuButton asChild>
                            <a
                              href={item.url}
                              className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-md transition-colors text-sm ${
                                isActive(item.url)
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-accent text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <item.icon className="w-4 h-4" />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            // Collapsed state - show only icons
            <div className="space-y-2">
              {adminMenuItems.slice(1).map((section, index) => (
                <div key={index} className="space-y-1">
                  {section.items?.map((item, itemIndex) => (
                    <SidebarMenuItem key={itemIndex}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                            isActive(item.url)
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-accent"
                          }`}
                          title={item.title}
                        >
                          <item.icon className="w-5 h-5" />
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}