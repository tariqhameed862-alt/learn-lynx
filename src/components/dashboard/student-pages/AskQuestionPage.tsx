import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter,
  ThumbsUp,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Eye,
  Star
} from "lucide-react";

const questions = [
  {
    id: 1,
    title: "How to implement binary search trees efficiently?",
    content: "I'm working on a data structures assignment and need help understanding the implementation of binary search trees. Can someone explain the insertion and deletion operations?",
    author: "Ahmad Ali",
    authorYear: "3rd Year",
    category: "Data Structures",
    tags: ["algorithms", "trees", "computer-science"],
    upvotes: 12,
    answers: 3,
    views: 156,
    timeAgo: "2 hours ago",
    status: "answered",
    isAnswered: true
  },
  {
    id: 2,
    title: "Best practices for React component state management?",
    content: "I'm building a React application and struggling with state management across multiple components. Should I use Context API or Redux?",
    author: "Fatima Khan",
    authorYear: "4th Year",
    category: "Web Development",
    tags: ["react", "javascript", "state-management"],
    upvotes: 8,
    answers: 5,
    views: 89,
    timeAgo: "4 hours ago",
    status: "answered",
    isAnswered: true
  },
  {
    id: 3,
    title: "Database normalization confusion in 3NF",
    content: "I understand 1NF and 2NF but I'm having trouble with third normal form. Can someone provide a simple example?",
    author: "Hassan Malik",
    authorYear: "2nd Year",
    category: "Database",
    tags: ["database", "normalization", "sql"],
    upvotes: 5,
    answers: 1,
    views: 45,
    timeAgo: "1 day ago",
    status: "pending",
    isAnswered: false
  }
];

const myQuestions = [
  {
    id: 1,
    title: "Machine Learning model evaluation metrics",
    answers: 4,
    views: 78,
    status: "answered",
    timeAgo: "3 days ago"
  },
  {
    id: 2,
    title: "Docker container networking issues",
    answers: 1,
    views: 23,
    status: "pending",
    timeAgo: "1 week ago"
  }
];

const topContributors = [
  { name: "Sarah Ahmed", answers: 142, reputation: 2850, avatar: "SA" },
  { name: "Ali Hassan", answers: 98, reputation: 1967, avatar: "AH" },
  { name: "Zara Sheikh", answers: 76, reputation: 1543, avatar: "ZS" }
];

const categories = [
  "All", "Computer Science", "Web Development", "Mobile Development", 
  "Database", "AI/ML", "Data Structures", "Software Engineering"
];

export const AskQuestionPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Q&A Community</h1>
          <p className="text-muted-foreground">Get help from seniors and peers, share knowledge</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Ask Question
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search questions, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md text-sm"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList>
          <TabsTrigger value="browse">Browse Questions</TabsTrigger>
          <TabsTrigger value="my-questions">My Questions</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="contributors">Top Contributors</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          {questions.map((question) => (
            <Card key={question.id} className="feature-card hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-2 min-w-[80px]">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{question.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{question.answers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{question.views}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">
                        {question.title}
                      </h3>
                      <Badge variant={question.isAnswered ? "default" : "secondary"}>
                        {question.isAnswered ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertCircle className="w-3 h-3 mr-1" />
                        )}
                        {question.status}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-3 line-clamp-2">{question.content}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {question.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {question.author} • {question.authorYear}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {question.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {question.timeAgo}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="my-questions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Your Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {myQuestions.map((question) => (
                <div key={question.id} className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{question.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{question.answers} answers</span>
                      <span>•</span>
                      <span>{question.views} views</span>
                      <span>•</span>
                      <span>{question.timeAgo}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={question.status === "answered" ? "default" : "secondary"}>
                      {question.status}
                    </Badge>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trending Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questions.slice(0, 3).map((question, index) => (
                  <div key={question.id} className="flex items-start gap-4 p-4 bg-accent/10 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/20 rounded-full text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{question.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{question.upvotes} upvotes</span>
                        <span>•</span>
                        <span>{question.answers} answers</span>
                        <span>•</span>
                        <span>{question.views} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contributors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topContributors.map((contributor, index) => (
                  <div key={contributor.name} className="text-center p-4 bg-accent/10 rounded-lg">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarFallback className="text-lg">{contributor.avatar}</AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold mb-1">{contributor.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{contributor.answers} answers</p>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{contributor.reputation}</span>
                    </div>
                    {index === 0 && (
                      <Badge className="mt-2" variant="default">Top Contributor</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};