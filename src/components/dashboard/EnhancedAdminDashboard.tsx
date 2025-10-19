import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  Video,
  GraduationCap,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";

export const EnhancedAdminDashboard = () => {
  const modules = [
    {
      title: "Users",
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/20",
      stats: [
        { label: "Total Users", value: "12,847", trend: "+12.5%" },
        { label: "Students", value: "8,234", trend: "+15%" },
        { label: "Teachers", value: "456", trend: "+8%" },
        { label: "Admins", value: "12", trend: "0%" }
      ]
    },
    {
      title: "FYP Projects",
      icon: GraduationCap,
      gradient: "from-purple-500 to-purple-600",
      shadowColor: "shadow-purple-500/20",
      stats: [
        { label: "Total Projects", value: "347", trend: "+18%" },
        { label: "Active", value: "186", trend: "+22%" },
        { label: "Completed", value: "124", trend: "+10%" },
        { label: "Pending", value: "37", trend: "-5%" }
      ]
    },
    {
      title: "Books Library",
      icon: BookOpen,
      gradient: "from-green-500 to-green-600",
      shadowColor: "shadow-green-500/20",
      stats: [
        { label: "Total Books", value: "1,247", trend: "+6%" },
        { label: "Borrowed", value: "342", trend: "+14%" },
        { label: "Available", value: "905", trend: "-8%" },
        { label: "Overdue", value: "23", trend: "-12%" }
      ]
    },
    {
      title: "Q&A Monitoring",
      icon: MessageSquare,
      gradient: "from-orange-500 to-orange-600",
      shadowColor: "shadow-orange-500/20",
      stats: [
        { label: "Total Questions", value: "1,547", trend: "+25%" },
        { label: "Answered", value: "1,234", trend: "+20%" },
        { label: "Pending", value: "234", trend: "+35%" },
        { label: "Flagged", value: "23", trend: "-8%" }
      ]
    },
    {
      title: "Meeting Requests",
      icon: Video,
      gradient: "from-cyan-500 to-cyan-600",
      shadowColor: "shadow-cyan-500/20",
      stats: [
        { label: "Total Requests", value: "89", trend: "+16%" },
        { label: "Pending", value: "23", trend: "+30%" },
        { label: "Scheduled", value: "45", trend: "+12%" },
        { label: "Completed", value: "21", trend: "+5%" }
      ]
    }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-fade-in">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">Real-time platform statistics and insights</p>
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <Card 
            key={index} 
            className="relative group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Gradient Background Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Animated Border Glow */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${module.gradient} rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
            
            <CardContent className="relative p-6 space-y-6">
              {/* Header with Icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${module.gradient} shadow-lg ${module.shadowColor} group-hover:scale-110 transition-transform duration-300`}>
                    <module.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{module.title}</h3>
                    <p className="text-sm text-muted-foreground">Module Overview</p>
                  </div>
                </div>
                <TrendingUp className={`w-5 h-5 text-green-500 group-hover:scale-110 transition-transform`} />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {module.stats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="relative p-4 rounded-xl bg-gradient-to-br from-background/50 to-muted/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group/stat"
                  >
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className={`w-3 h-3 ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`} />
                        <span className={`text-xs font-semibold ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {stat.trend}
                        </span>
                      </div>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>

              {/* View Details Badge */}
              <div className="pt-2 border-t border-border/50">
                <Badge variant="outline" className="w-full justify-center py-2 hover:bg-primary/10 transition-colors cursor-pointer">
                  View Details
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Performance Stats */}
      <Card className="relative overflow-hidden border-2 border-primary/20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5" />
        <CardContent className="relative p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Platform Performance
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:scale-105 transition-transform">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">99.9%</div>
              <div className="text-sm font-medium text-muted-foreground">System Uptime</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-green-600">4.2ms</div>
              <div className="text-sm font-medium text-muted-foreground">Response Time</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-blue-600">+15.3%</div>
              <div className="text-sm font-medium text-muted-foreground">User Growth</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-purple-600">2,341</div>
              <div className="text-sm font-medium text-muted-foreground">Weekly Questions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
