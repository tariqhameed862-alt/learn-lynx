import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto p-4">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Academic Portal
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your role to access the dashboard
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {/* Role Selection */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg bg-muted p-1">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <Button
                    key={role.id}
                    variant={selectedRole === role.id ? "default" : "ghost"}
                    size="lg"
                    onClick={() => setSelectedRole(role.id)}
                    className={`px-6 py-3 transition-all duration-300 ${
                      selectedRole === role.id 
                        ? "bg-primary text-primary-foreground shadow-md" 
                        : "hover:bg-background/50"
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-2" />
                    {role.title}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Form Container with Animation */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${roles.findIndex(r => r.id === selectedRole) * 100}%)`,
                width: `${roles.length * 100}%`
              }}
            >
              {roles.map((role) => (
                <div key={role.id} className="w-full flex-shrink-0 px-2">
                  <LoginForm 
                    role={role.id} 
                    onLoginSuccess={() => handleLoginSuccess(role.id)} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;