import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MessageCircle, CheckCircle, Clock, AlertTriangle, ThumbsUp, Eye, Flag } from "lucide-react";

const mockQuestions = [
  {
    id: 1,
    title: "How to implement binary search tree in Python?",
    content: "I'm struggling with implementing a BST. Can someone help with the insertion and deletion methods?",
    author: "Ahmad Hassan",
    authorRole: "Student",
    department: "Computer Science",
    subject: "Data Structures",
    status: "Answered",
    priority: "Medium",
    answers: 3,
    votes: 15,
    views: 127,
    createdAt: "2024-11-18T10:30:00Z",
    lastActivity: "2024-11-20T14:22:00Z",
    tags: ["python", "data-structures", "algorithms"]
  },
  {
    id: 2,
    title: "Database normalization best practices",
    content: "What are the key principles of database normalization and when should we apply them?",
    author: "Fatima Khan",
    authorRole: "Student",
    department: "Computer Science",
    subject: "Database Systems",
    status: "Pending",
    priority: "High",
    answers: 0,
    votes: 8,
    views: 89,
    createdAt: "2024-11-20T09:15:00Z",
    lastActivity: "2024-11-20T09:15:00Z",
    tags: ["database", "normalization", "sql"]
  },
  {
    id: 3,
    title: "React hooks vs class components",
    content: "When should I use hooks versus class components in React development?",
    author: "Hassan Ali",
    authorRole: "Student",
    department: "Computer Science",
    subject: "Web Development",
    status: "Answered",
    priority: "Low",
    answers: 5,
    votes: 23,
    views: 234,
    createdAt: "2024-11-15T16:45:00Z",
    lastActivity: "2024-11-19T11:30:00Z",
    tags: ["react", "javascript", "frontend"]
  }
];

const mockAnswers = [
  {
    id: 1,
    questionId: 1,
    content: "Here's a comprehensive implementation of a Binary Search Tree...",
    author: "Dr. Sarah Ahmed",
    authorRole: "Teacher",
    votes: 12,
    isAccepted: true,
    createdAt: "2024-11-18T15:20:00Z",
    helpful: 8
  },
  {
    id: 2,
    questionId: 2,
    content: "Database normalization follows these key principles...",
    author: "Dr. Ali Raza",
    authorRole: "Teacher",
    votes: 5,
    isAccepted: false,
    createdAt: "2024-11-20T10:30:00Z",
    helpful: 3
  }
];

export function QAMonitoringPage() {
  const [questions] = useState(mockQuestions);
  const [answers] = useState(mockAnswers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const statuses = ["Pending", "Answered", "Closed"];
  const priorities = ["Low", "Medium", "High"];
  
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || question.status === selectedStatus;
    const matchesPriority = selectedPriority === "all" || question.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Answered": return "bg-green-500/10 text-green-700 border-green-200";
      case "Pending": return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "Closed": return "bg-gray-500/10 text-gray-700 border-gray-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-500/10 text-red-700 border-red-200";
      case "Medium": return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "Low": return "bg-green-500/10 text-green-700 border-green-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Answered": return <CheckCircle className="w-4 h-4" />;
      case "Pending": return <Clock className="w-4 h-4" />;
      case "Closed": return <AlertTriangle className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const totalQuestions = questions.length;
  const pendingQuestions = questions.filter(q => q.status === "Pending").length;
  const answeredQuestions = questions.filter(q => q.status === "Answered").length;
  const avgResponseTime = "2.5 hours";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Q&A Monitoring</h1>
          <p className="text-muted-foreground">Monitor and moderate questions and answers platform</p>
        </div>
        <Button className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuestions}</div>
            <p className="text-xs text-muted-foreground">All time questions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingQuestions}</div>
            <p className="text-xs text-muted-foreground">Awaiting answers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Answered</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{answeredQuestions}</div>
            <p className="text-xs text-muted-foreground">Successfully answered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">Teacher response time</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="questions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="answers">Answers</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Questions</CardTitle>
              <CardDescription>Monitor and manage student questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search questions by title, content, or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    {priorities.map(priority => (
                      <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuestions.map((question) => (
                      <TableRow key={question.id}>
                        <TableCell>
                          <div className="max-w-md">
                            <div className="font-medium">{question.title}</div>
                            <div className="text-sm text-muted-foreground line-clamp-2">
                              {question.content}
                            </div>
                            <div className="flex gap-1 mt-2">
                              {question.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>{question.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{question.author}</div>
                              <div className="text-xs text-muted-foreground">{question.department}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{question.subject}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(question.status)}>
                            {getStatusIcon(question.status)}
                            <span className="ml-1">{question.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(question.priority)}>
                            {question.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {question.answers} answers
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {question.votes} votes
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {question.views} views
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Flag className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="answers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Answer Management</CardTitle>
              <CardDescription>Monitor and manage teacher and student answers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Answer management interface coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation</CardTitle>
              <CardDescription>Review flagged content and manage community guidelines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Moderation tools coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Q&A Analytics</CardTitle>
              <CardDescription>Insights and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Analytics dashboard coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}