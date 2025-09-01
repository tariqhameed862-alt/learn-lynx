import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Clock, User, BookOpen, Send } from "lucide-react";

const pendingQuestions = [
  {
    id: 1,
    student: "Alice Johnson",
    avatar: "/placeholder.svg",
    course: "Data Structures",
    question: "Can you explain the difference between arrays and linked lists in terms of memory allocation?",
    timestamp: "2 hours ago",
    urgency: "high",
    category: "Theory"
  },
  {
    id: 2,
    student: "Bob Smith",
    avatar: "/placeholder.svg", 
    course: "Web Development",
    question: "I'm getting a CORS error when making API calls from my React app. How do I fix this?",
    timestamp: "4 hours ago",
    urgency: "medium",
    category: "Practical"
  },
  {
    id: 3,
    student: "Carol Davis",
    avatar: "/placeholder.svg",
    course: "Database Systems",
    question: "What's the best approach for optimizing SQL queries with multiple joins?",
    timestamp: "1 day ago",
    urgency: "low", 
    category: "Theory"
  }
];

const answeredQuestions = [
  {
    id: 4,
    student: "David Wilson",
    course: "Machine Learning",
    question: "How do I prevent overfitting in neural networks?",
    answer: "There are several techniques: 1) Use dropout layers, 2) Implement early stopping, 3) Add regularization...",
    timestamp: "Yesterday",
    category: "Theory"
  }
];

export function AnswerQuestionsPage() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const handleSubmitAnswer = () => {
    if (answer.trim()) {
      // Handle answer submission
      console.log("Submitting answer:", answer);
      setAnswer("");
      setSelectedQuestion(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Answer Questions</h1>
        <p className="text-muted-foreground mt-2">
          Help students by answering their questions and providing guidance
        </p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pending Questions ({pendingQuestions.length})</TabsTrigger>
          <TabsTrigger value="answered">Answered Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingQuestions.map((question) => (
            <Card key={question.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={question.avatar} alt={question.student} />
                      <AvatarFallback>
                        {question.student.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{question.student}</h3>
                        <Badge variant={getUrgencyColor(question.urgency)}>
                          {question.urgency}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-3 w-3" />
                        <span>{question.course}</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span>{question.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{question.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">{question.question}</p>
                
                {selectedQuestion === question.id ? (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Type your answer here..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSubmitAnswer} className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Submit Answer
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedQuestion(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => setSelectedQuestion(question.id)}
                      className="flex items-center gap-2"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Answer Question
                    </Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="answered" className="space-y-4">
          {answeredQuestions.map((question) => (
            <Card key={question.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {question.student.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{question.student}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-3 w-3" />
                        <span>{question.course}</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span>{question.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{question.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Question:</p>
                  <p className="text-sm text-muted-foreground">{question.question}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Your Answer:</p>
                  <p className="text-sm leading-relaxed">{question.answer}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}