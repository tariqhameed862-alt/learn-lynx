import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  Video,
  GraduationCap,
  TrendingUp,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Eye,
  UserCheck,
  Calendar,
  BarChart3
} from "lucide-react";

export const EnhancedAdminDashboard = () => {
  const modules = [
    {
      title: "Users",
      icon: Users,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      stats: {
        total: "12,847",
        students: "8,234",
        teachers: "456",
        admins: "12"
      },
      recentActivity: [
        { type: "New Registration", user: "sarah.chen@uni.edu", time: "5 min ago", status: "pending" },
        { type: "Teacher Approved", user: "dr.ahmed@uni.edu", time: "1 hour ago", status: "approved" },
        { type: "Account Verified", user: "john.smith@uni.edu", time: "2 hours ago", status: "verified" }
      ],
      pendingActions: 5
    },
    {
      title: "FYP Projects",
      icon: GraduationCap,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      stats: {
        total: "347",
        active: "186",
        completed: "124",
        pending: "37"
      },
      domains: [
        { name: "Sustainable & Green Process Engineering", projects: 67 },
        { name: "Waste-to-Energy & Circular Economy", projects: 54 },
        { name: "Environmental Engineering", projects: 71 },
        { name: "Process Simulation, AI & Digitalization", projects: 89 },
        { name: "Renewable Energy & Hydrogen Economy", projects: 66 }
      ],
      pendingActions: 12
    },
    {
      title: "Books Library",
      icon: BookOpen,
      iconColor: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      stats: {
        total: "1,247",
        borrowed: "342",
        available: "905",
        overdue: "23"
      },
      recentActivity: [
        { type: "New Book Added", book: "Advanced Chemical Engineering", time: "30 min ago" },
        { type: "Book Borrowed", book: "Process Control Systems", user: "mike.wilson@uni.edu", time: "2 hours ago" },
        { type: "Book Returned", book: "Thermodynamics Basics", user: "lisa.brown@uni.edu", time: "4 hours ago" }
      ],
      pendingActions: 8
    },
    {
      title: "Q&A Monitoring",
      icon: MessageSquare,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      stats: {
        totalQuestions: "1,547",
        answered: "1,234",
        pending: "234",
        flagged: "23"
      },
      recentQuestions: [
        { question: "How to calculate heat transfer coefficient?", student: "alex.kim@uni.edu", time: "10 min ago", status: "pending" },
        { question: "Explain distillation column design", student: "maria.garcia@uni.edu", time: "45 min ago", status: "answered" },
        { question: "Reactor kinetics problem", student: "david.lee@uni.edu", time: "1 hour ago", status: "flagged" }
      ],
      pendingActions: 234
    },
    {
      title: "Meeting Requests",
      icon: Video,
      iconColor: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      stats: {
        total: "89",
        pending: "23",
        scheduled: "45",
        completed: "21"
      },
      upcomingMeetings: [
        { student: "Emma Wilson", topic: "FYP Progress Review", date: "Today, 2:00 PM", status: "scheduled" },
        { student: "Ryan Chen", topic: "Course Selection", date: "Tomorrow, 10:00 AM", status: "pending" },
        { student: "Sophie Martinez", topic: "Academic Guidance", date: "Jan 12, 3:00 PM", status: "scheduled" }
      ],
      pendingActions: 23
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Pending</Badge>;
      case "approved":
      case "verified":
      case "answered":
      case "scheduled":
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">Completed</Badge>;
      case "flagged":
        return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">Flagged</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold gradient-text">Admin Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive overview of all platform modules</p>
        </div>
        <Button className="btn-hero">
          <BarChart3 className="w-4 h-4 mr-2" />
          View Full Analytics
        </Button>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {modules.map((module, index) => (
          <Card key={index} className={`feature-card ${module.borderColor} hover:shadow-lg transition-shadow`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-lg ${module.bgColor} flex items-center justify-center`}>
                  <module.icon className={`w-5 h-5 ${module.iconColor}`} />
                </div>
                {module.pendingActions > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {module.pendingActions}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1">{module.title}</h3>
              <p className="text-2xl font-bold gradient-text">
                {Object.values(module.stats)[0]}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {Object.keys(module.stats)[0].charAt(0).toUpperCase() + Object.keys(module.stats)[0].slice(1)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Module Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {modules.map((module, index) => (
          <Card key={index} className={`feature-card ${module.borderColor}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${module.bgColor} flex items-center justify-center`}>
                    <module.icon className={`w-6 h-6 ${module.iconColor}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                    <CardDescription>Manage and monitor {module.title.toLowerCase()}</CardDescription>
                  </div>
                </div>
                {module.pendingActions > 0 && (
                  <Badge variant="destructive">{module.pendingActions} pending</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Statistics Grid */}
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(module.stats).map(([key, value], idx) => (
                  <div key={idx} className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-xl font-bold">{value}</div>
                    <div className="text-xs text-muted-foreground capitalize">{key}</div>
                  </div>
                ))}
              </div>

              {/* Module-specific content */}
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold">Recent Activity</h4>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    View All <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>

                {/* Users Module */}
                {module.title === "Users" && module.recentActivity && (
                  <div className="space-y-2">
                    {module.recentActivity.map((activity, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-card/50 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <UserCheck className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{activity.type}</p>
                            <p className="text-xs text-muted-foreground">{activity.user}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                          {getStatusBadge(activity.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* FYP Projects Module */}
                {module.title === "FYP Projects" && module.domains && (
                  <div className="space-y-2">
                    {module.domains.slice(0, 3).map((domain, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-card/50 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <GraduationCap className="w-4 h-4 text-muted-foreground" />
                          <p className="text-sm font-medium line-clamp-1">{domain.name}</p>
                        </div>
                        <Badge variant="outline">{domain.projects} projects</Badge>
                      </div>
                    ))}
                  </div>
                )}

                {/* Books Library Module */}
                {module.title === "Books Library" && module.recentActivity && (
                  <div className="space-y-2">
                    {module.recentActivity.map((activity, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-card/50 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{activity.type}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{activity.book}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Q&A Monitoring Module */}
                {module.title === "Q&A Monitoring" && module.recentQuestions && (
                  <div className="space-y-2">
                    {module.recentQuestions.map((q, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-card/50 rounded-lg border">
                        <div className="flex items-center gap-3 flex-1">
                          <MessageSquare className="w-4 h-4 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-1">{q.question}</p>
                            <p className="text-xs text-muted-foreground">{q.student}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <span className="text-xs text-muted-foreground">{q.time}</span>
                          {getStatusBadge(q.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Meeting Requests Module */}
                {module.title === "Meeting Requests" && module.upcomingMeetings && (
                  <div className="space-y-2">
                    {module.upcomingMeetings.map((meeting, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-card/50 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{meeting.student}</p>
                            <p className="text-xs text-muted-foreground">{meeting.topic}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{meeting.date}</span>
                          {getStatusBadge(meeting.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                View {module.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Performance Summary */}
      <Card className="feature-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Platform Performance Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-bold text-primary">99.9%</div>
              <div className="text-xs text-muted-foreground">System Uptime</div>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-2xl font-bold text-green-600">4.2m</div>
              <div className="text-xs text-muted-foreground">Avg Response Time</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-600">+15.3%</div>
              <div className="text-xs text-muted-foreground">User Growth</div>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-600">2,341</div>
              <div className="text-xs text-muted-foreground">Weekly Questions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
