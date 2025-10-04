import { useState } from "react";
import { Calendar, Clock, MessageSquare, Send, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface MeetingRequest {
  id: number;
  date: string;
  time: string;
  topic: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  meetingLink?: string;
  adminNote?: string;
}

const mockMeetingRequests: MeetingRequest[] = [
  {
    id: 1,
    date: "2024-02-20",
    time: "14:00",
    topic: "FYP Project Discussion",
    description: "Need guidance on project architecture and technology stack selection.",
    status: "approved",
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: 2,
    date: "2024-02-18",
    time: "10:00",
    topic: "Course Selection Help",
    description: "Want to discuss elective course options for next semester.",
    status: "pending",
  },
  {
    id: 3,
    date: "2024-02-15",
    time: "15:00",
    topic: "Career Guidance",
    description: "Discussion about internship opportunities and career path.",
    status: "rejected",
    adminNote: "Please reschedule for next week.",
  },
];

export default function ScheduleMeetingPage() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [requests, setRequests] = useState<MeetingRequest[]>(mockMeetingRequests);

  const handleSubmitRequest = () => {
    if (!selectedDate || !selectedTime || !topic || !description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newRequest: MeetingRequest = {
      id: requests.length + 1,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      topic,
      description,
      status: "pending",
    };

    setRequests([newRequest, ...requests]);
    
    // Reset form
    setSelectedDate(undefined);
    setSelectedTime("");
    setTopic("");
    setDescription("");

    toast({
      title: "Success",
      description: "Meeting request submitted successfully!",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Schedule Meeting</h1>
        <p className="text-muted-foreground">
          Request a meeting with administration and track your meeting requests
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Request Meeting Form */}
        <Card>
          <CardHeader>
            <CardTitle>Request New Meeting</CardTitle>
            <CardDescription>Fill in the details to schedule a meeting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Select Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Meeting Topic</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="topic"
                  placeholder="e.g., FYP Project Discussion"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">What do you want to discuss?</Label>
              <Textarea
                id="description"
                placeholder="Provide details about what you'd like to discuss in the meeting..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <Button onClick={handleSubmitRequest} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </CardContent>
        </Card>

        {/* My Meeting Requests */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Meeting Requests</CardTitle>
              <CardDescription>Track your meeting request status</CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-3">
            {requests.map((request) => (
              <Card key={request.id} className="border-l-4" style={{
                borderLeftColor: request.status === "approved" ? "#22c55e" : 
                               request.status === "pending" ? "#eab308" : "#ef4444"
              }}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-base">{request.topic}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(request.date), "PPP")}
                        <Clock className="w-3 h-3 ml-2" />
                        {request.time}
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(request.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{request.description}</p>
                  
                  {request.status === "approved" && request.meetingLink && (
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">
                        Meeting Approved!
                      </p>
                      <Button size="sm" asChild className="w-full">
                        <a href={request.meetingLink} target="_blank" rel="noopener noreferrer">
                          Join Google Meet
                        </a>
                      </Button>
                    </div>
                  )}

                  {request.status === "rejected" && request.adminNote && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                      <p className="text-sm font-medium text-red-900 dark:text-red-100 mb-1">
                        Admin Note:
                      </p>
                      <p className="text-sm text-red-800 dark:text-red-200">
                        {request.adminNote}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
