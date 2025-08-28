import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Brain, 
  BookOpen, 
  Users, 
  GraduationCap, 
  Settings,
  ArrowRight,
  Sparkles
} from "lucide-react";

export const Hero = () => {
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | "admin">("student");

  const roleContent = {
    student: {
      title: "Ask anything, anytime.",
      subtitle: "From assignments to FYPs—get AI answers and mentor guidance in one place.",
      features: ["AI-Powered Q&A", "FYP Guidance", "Assignment Help", "Resource Discovery"],
      cta: "Get Help Now"
    },
    teacher: {
      title: "Mentor the next generation.",
      subtitle: "Guide students, share knowledge, and build academic excellence together.",
      features: ["Student Q&A Queue", "FYP Mentorship", "Resource Curation", "Progress Tracking"],
      cta: "Become a Mentor"
    },
    admin: {
      title: "Manage academic excellence.",
      subtitle: "Oversee the platform, moderate content, and drive educational success.",
      features: ["User Management", "Content Moderation", "Analytics Dashboard", "System Config"],
      cta: "Admin Access"
    }
  };

  const currentContent = roleContent[selectedRole];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(217_91%_60%/0.1),transparent_70%)]" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl float" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl float delay-200" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-secondary/20 rounded-full blur-xl float delay-300" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Role Switcher */}
        <div className="flex justify-center mb-8 animate-fade-in-up">
          <div className="glass rounded-2xl p-2">
            <div className="flex space-x-1">
              <button
                onClick={() => setSelectedRole("student")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedRole === "student" 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Student
              </button>
              <button
                onClick={() => setSelectedRole("teacher")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedRole === "teacher" 
                    ? "bg-secondary text-secondary-foreground shadow-lg" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <GraduationCap className="w-4 h-4 inline mr-2" />
                Teacher
              </button>
              <button
                onClick={() => setSelectedRole("admin")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedRole === "admin" 
                    ? "bg-accent text-accent-foreground shadow-lg" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="animate-fade-in-up delay-200">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Your Complete University Companion
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {currentContent.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {currentContent.features.map((feature, index) => (
              <Badge 
                key={feature}
                variant="outline" 
                className="px-4 py-2 text-sm border-border/50 hover:border-primary/50 transition-colors duration-300"
              >
                {feature}
              </Badge>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="btn-hero group">
              {currentContent.cta}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button variant="outline" className="btn-hero-outline">
              Watch Demo
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">Trusted by students and educators worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-sm font-medium">500+ Universities</div>
              <div className="text-sm font-medium">50k+ Students</div>
              <div className="text-sm font-medium">2k+ Teachers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};