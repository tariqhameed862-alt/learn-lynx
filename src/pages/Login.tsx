import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (role: "student" | "teacher" | "admin") => {
    navigate(`/dashboard?role=${role}`);
  };

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
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">Student Portal</h2>
            <LoginForm role="student" onLoginSuccess={() => handleLoginSuccess("student")} />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">Teacher Portal</h2>
            <LoginForm role="teacher" onLoginSuccess={() => handleLoginSuccess("teacher")} />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>
            <LoginForm role="admin" onLoginSuccess={() => handleLoginSuccess("admin")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;