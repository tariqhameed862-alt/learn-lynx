import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { TeacherDashboard } from "@/components/dashboard/TeacherDashboard";
import { EnhancedAdminDashboard } from "@/components/dashboard/EnhancedAdminDashboard";
import { Users, GraduationCap, Settings, LogOut, Home } from "lucide-react";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get("role") as "student" | "teacher" | "admin" || "student";

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

  const renderDashboardContent = () => {
    switch (role) {
      case "student":
        return <StudentDashboard />;
      case "teacher":
        return <TeacherDashboard />;
      case "admin":
        return <EnhancedAdminDashboard />;
    }
  };

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