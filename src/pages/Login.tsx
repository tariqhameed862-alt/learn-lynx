import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { User, GraduationCap, Shield } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | "admin">("student");

  const handleLoginSuccess = (role: "student" | "teacher" | "admin") => {
    navigate(`/dashboard?role=${role}`);
  };

  const roles = [
    {
      id: "student" as const,
      title: "Student",
      icon: User,
      description: "Access your academic dashboard"
    },
    {
      id: "teacher" as const,
      title: "Teacher", 
      icon: GraduationCap,
      description: "Manage your classes and students"
    },
    {
      id: "admin" as const,
      title: "Admin",
      icon: Shield,
      description: "System administration and oversight"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="container mx-auto p-4">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Academic Portal
          </h1>
          <p className="text-xl text-muted-foreground">
            Access your dashboard
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <LoginForm 
            onLoginSuccess={handleLoginSuccess} 
          />
        </div>
      </div>
    </div>
  );
};

export default Login;