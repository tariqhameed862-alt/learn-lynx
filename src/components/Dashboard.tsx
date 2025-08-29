import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { StudentDashboard } from "./dashboard/StudentDashboard";
import { TeacherDashboard } from "./dashboard/TeacherDashboard";
import { EnhancedAdminDashboard } from "./dashboard/EnhancedAdminDashboard";
import { LoginForm } from "./auth/LoginForm";
import { Users, GraduationCap, Settings, LogIn, LogOut } from "lucide-react";

export const Dashboard = () => {
  const [activeRole, setActiveRole] = useState("student");
  const [isLoggedIn, setIsLoggedIn] = useState<Record<string, boolean>>({
    student: false,
    teacher: false,
    admin: false
  });

  const handleLogin = (role: "student" | "teacher" | "admin") => {
    setIsLoggedIn(prev => ({ ...prev, [role]: true }));
  };

  const handleLogout = (role: "student" | "teacher" | "admin") => {
    setIsLoggedIn(prev => ({ ...prev, [role]: false }));
  };

  const renderDashboardContent = (role: "student" | "teacher" | "admin") => {
    if (!isLoggedIn[role]) {
      return <LoginForm role={role} onLoginSuccess={() => handleLogin(role)} />;
    }

    switch (role) {
      case "student":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold gradient-text">Welcome to Student Dashboard</h3>
              <Button onClick={() => handleLogout(role)} variant="outline" className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
            <StudentDashboard />
          </div>
        );
      case "teacher":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold gradient-text">Welcome to Teacher Dashboard</h3>
              <Button onClick={() => handleLogout(role)} variant="outline" className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
            <TeacherDashboard />
          </div>
        );
      case "admin":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold gradient-text">Admin Panel</h3>
              <Button onClick={() => handleLogout(role)} variant="outline" className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
            <EnhancedAdminDashboard />
          </div>
        );
    }
  };

  return (
    <section id="dashboard" className="py-20 bg-gradient-to-br from-background via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            Complete Dashboard Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access role-specific features and tools tailored to your academic journey
          </p>
        </div>

        <Tabs value={activeRole} onValueChange={setActiveRole} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-12">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Student Portal
              {!isLoggedIn.student && <LogIn className="w-3 h-3 ml-1 text-muted-foreground" />}
            </TabsTrigger>
            <TabsTrigger value="teacher" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Teacher Portal
              {!isLoggedIn.teacher && <LogIn className="w-3 h-3 ml-1 text-muted-foreground" />}
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Admin Panel
              {!isLoggedIn.admin && <LogIn className="w-3 h-3 ml-1 text-muted-foreground" />}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            {renderDashboardContent("student")}
          </TabsContent>

          <TabsContent value="teacher">
            {renderDashboardContent("teacher")}
          </TabsContent>

          <TabsContent value="admin">
            {renderDashboardContent("admin")}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};