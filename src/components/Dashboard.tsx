import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentDashboard } from "./dashboard/StudentDashboard";
import { TeacherDashboard } from "./dashboard/TeacherDashboard";
import { AdminDashboard } from "./dashboard/AdminDashboard";
import { Users, GraduationCap, Settings } from "lucide-react";

export const Dashboard = () => {
  const [activeRole, setActiveRole] = useState("student");

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
              Student Dashboard
            </TabsTrigger>
            <TabsTrigger value="teacher" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Teacher Dashboard
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Admin Panel
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <StudentDashboard />
          </TabsContent>

          <TabsContent value="teacher">
            <TeacherDashboard />
          </TabsContent>

          <TabsContent value="admin">
            <AdminDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};