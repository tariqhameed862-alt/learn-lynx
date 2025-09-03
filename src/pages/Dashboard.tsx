import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { TeacherDashboard } from "@/components/dashboard/TeacherDashboard";
import { EnhancedAdminDashboard } from "@/components/dashboard/EnhancedAdminDashboard";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar";
import { TeacherSidebar } from "@/components/dashboard/TeacherSidebar";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { UsersPage } from "@/components/dashboard/admin-pages/UsersPage";
import { RolesPage } from "@/components/dashboard/admin-pages/RolesPage";
import { PermissionsPage } from "@/components/dashboard/admin-pages/PermissionsPage";
import { PagesPage } from "@/components/dashboard/admin-pages/PagesPage";
import { StudentsManagePage } from "@/components/dashboard/admin-pages/StudentsManagePage";
import { TeachersManagePage } from "@/components/dashboard/admin-pages/TeachersManagePage";
import { StudentAdmissionsPage } from "@/components/dashboard/admin-pages/StudentAdmissionsPage";
import { TeacherAssignmentsPage } from "@/components/dashboard/admin-pages/TeacherAssignmentsPage";
import { TeacherPerformancePage } from "@/components/dashboard/admin-pages/TeacherPerformancePage";
import { SystemSettingsPage } from "@/components/dashboard/admin-pages/SystemSettingsPage";
import { BooksManagementPage } from "@/components/dashboard/admin-pages/BooksManagementPage";
import { FYPProjectsPage } from "@/components/dashboard/admin-pages/FYPProjectsPage";
import { QAMonitoringPage } from "@/components/dashboard/admin-pages/QAMonitoringPage";
import { BooksPage } from "@/components/dashboard/student-pages/BooksPage";
import { FYPStudioPage } from "@/components/dashboard/student-pages/FYPStudioPage";
import { AskQuestionPage } from "@/components/dashboard/student-pages/AskQuestionPage";
import { StudyGroupsPage } from "@/components/dashboard/student-pages/StudyGroupsPage";
import { AnswerQuestionsPage } from "@/components/dashboard/teacher-pages/AnswerQuestionsPage";
import { ManageResourcesPage } from "@/components/dashboard/teacher-pages/ManageResourcesPage";
import { FYPSupervisionPage } from "@/components/dashboard/teacher-pages/FYPSupervisionPage";
import { StudentProgressPage } from "@/components/dashboard/teacher-pages/StudentProgressPage";
import { Users, GraduationCap, Settings, LogOut, Home } from "lucide-react";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get("role") as "student" | "teacher" | "admin" || "student";
  const page = searchParams.get("page") || "dashboard";

  const handleLogout = () => {
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const getRoleConfig = () => {
    switch (role) {
      case "student":
        return {
          icon: Users,
          title: "Student Dashboard",
          description: "Access your academic dashboard and track your progress"
        };
      case "teacher":
        return {
          icon: GraduationCap,
          title: "Teacher Dashboard",
          description: "Manage your classes, students, and academic content"
        };
      case "admin":
        return {
          icon: Settings,
          title: "Admin Panel",
          description: "System administration and comprehensive oversight"
        };
    }
  };

  const config = getRoleConfig();
  const IconComponent = config.icon;

  const renderStudentPage = () => {
    switch (page) {
      case "books":
        return <BooksPage />;
      case "fyp-studio":
        return <FYPStudioPage />;
      case "ask-question":
        return <AskQuestionPage />;
      case "study-groups":
        return <StudyGroupsPage />;
      case "assignments":
        return <div className="p-8 text-center text-muted-foreground">Assignments page coming soon...</div>;
      case "schedule":
        return <div className="p-8 text-center text-muted-foreground">Schedule page coming soon...</div>;
      case "help":
        return <div className="p-8 text-center text-muted-foreground">Help center coming soon...</div>;
      default:
        return <StudentDashboard />;
    }
  };

  const renderTeacherPage = () => {
    switch (page) {
      case "answer-questions":
        return <AnswerQuestionsPage />;
      case "manage-resources":
        return <ManageResourcesPage />;
      case "fyp-supervision":
        return <FYPSupervisionPage />;
      case "student-progress":
        return <StudentProgressPage />;
      case "course-management":
        return <div className="p-8 text-center text-muted-foreground">Course Management page coming soon...</div>;
      case "office-hours":
        return <div className="p-8 text-center text-muted-foreground">Office Hours page coming soon...</div>;
      case "assignments":
        return <div className="p-8 text-center text-muted-foreground">Teacher Assignments page coming soon...</div>;
      case "schedule":
        return <div className="p-8 text-center text-muted-foreground">Teacher Schedule page coming soon...</div>;
      default:
        return <TeacherDashboard />;
    }
  };

  const renderAdminPage = () => {
    switch (page) {
      case "users":
        return <UsersPage />;
      case "roles":
        return <RolesPage />;
      case "permissions":
        return <PermissionsPage />;
      case "pages":
        return <PagesPage />;
      case "books-management":
        return <BooksManagementPage />;
      case "fyp-projects":
        return <FYPProjectsPage />;
      case "qa-monitoring":
        return <QAMonitoringPage />;
      case "students":
        return <StudentsManagePage />;
      case "student-admissions":
        return <StudentAdmissionsPage />;
      case "teachers":
        return <TeachersManagePage />;
      case "teacher-assignments":
        return <TeacherAssignmentsPage />;
      case "teacher-performance":
        return <TeacherPerformancePage />;
      case "system-settings":
        return <SystemSettingsPage />;
      case "analytics":
        return <div className="p-8 text-center text-muted-foreground">Analytics dashboard coming soon...</div>;
      default:
        return <EnhancedAdminDashboard />;
    }
  };

  const renderDashboardContent = () => {
    switch (role) {
      case "student":
        return renderStudentPage();
      case "teacher":
        return renderTeacherPage();
      case "admin":
        return renderAdminPage();
    }
  };

  if (role === "student" || role === "teacher" || role === "admin") {
    const SidebarComponent = role === "student" ? StudentSidebar : role === "teacher" ? TeacherSidebar : AdminSidebar;
    
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-accent/5">
          <SidebarComponent />
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <SidebarTrigger />
                    <div className={`w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold gradient-text">{config.title}</h1>
                      <p className="text-sm text-muted-foreground">{config.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button onClick={handleGoHome} variant="ghost" className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Home
                    </Button>
                    <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8">
              {renderDashboardContent()}
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  // This fallback should never be reached since we handle all roles above
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center`}>
                <IconComponent className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">{config.title}</h1>
                <p className="text-sm text-muted-foreground">{config.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button onClick={handleGoHome} variant="ghost" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
              <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderDashboardContent()}
      </main>
    </div>
  );
};

export default Dashboard;