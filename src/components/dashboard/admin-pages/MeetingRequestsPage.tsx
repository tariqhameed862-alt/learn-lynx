import { useState } from "react";
import { Calendar, Clock, MessageSquare, CheckCircle2, XCircle, Link as LinkIcon, User, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MeetingRequest {
  id: number;
  studentName: string;
  studentId: string;
  date: string;
  time: string;
  topic: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  meetingLink?: string;
  adminNote?: string;
  submittedAt: string;
}

const mockMeetingRequests: MeetingRequest[] = [
  {
    id: 1,
    studentName: "Sarah Johnson",
    studentId: "STU-2024-001",
    date: "2024-02-25",
    time: "14:00",
    topic: "FYP Project Discussion",
    description: "Need guidance on project architecture and technology stack selection for my final year project.",
    status: "pending",
    submittedAt: "2024-02-15T10:30:00",
  },
  {
    id: 2,
    studentName: "Michael Chen",
    studentId: "STU-2024-002",
    date: "2024-02-22",
    time: "10:00",
    topic: "Course Selection Help",
    description: "Want to discuss elective course options for next semester and get advice on which courses align with my career goals.",
    status: "pending",
    submittedAt: "2024-02-15T09:15:00",
  },
  {
    id: 3,
    studentName: "Emma Davis",
    studentId: "STU-2024-003",
    date: "2024-02-20",
    time: "15:00",
    topic: "Internship Guidance",
    description: "Discussion about internship opportunities and career path planning.",
    status: "approved",
    meetingLink: "https://meet.google.com/xyz-abcd-efg",
    submittedAt: "2024-02-14T14:20:00",
  },
  {
    id: 4,
    studentName: "Alex Martinez",
    studentId: "STU-2024-004",
    date: "2024-02-18",
    time: "11:00",
    topic: "Academic Performance Review",
    description: "Need to discuss recent grades and strategies for improvement.",
    status: "rejected",
    adminNote: "Please reschedule for next week as I'm unavailable on this date.",
    submittedAt: "2024-02-13T16:45:00",
  },
];

export default function MeetingRequestsPage() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<MeetingRequest[]>(mockMeetingRequests);
  const [selectedRequest, setSelectedRequest] = useState<MeetingRequest | null>(null);
  const [meetingLink, setMeetingLink] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleApprove = (requestId: number) => {
    if (!meetingLink) {
      toast({
        title: "Error",
        description: "Please provide a Google Meet link",
        variant: "destructive",
      });
      return;
    }

    setRequests(requests.map(req =>
      req.id === requestId
        ? { ...req, status: "approved" as const, meetingLink }
        : req
    ));

    setMeetingLink("");
    setSelectedRequest(null);

    toast({
      title: "Success",
      description: "Meeting request approved and link sent to student",
    });
  };

  const handleReject = (requestId: number) => {
    if (!adminNote) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection",
        variant: "destructive",
      });
      return;
    }

    setRequests(requests.map(req =>
      req.id === requestId
        ? { ...req, status: "rejected" as const, adminNote }
        : req
    ));

    setAdminNote("");
    setSelectedRequest(null);

    toast({
      title: "Meeting Rejected",
      description: "Rejection notification sent to student",
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

  const filteredRequests = requests.filter(req =>
    req.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingRequests = filteredRequests.filter(r => r.status === "pending");
  const approvedRequests = filteredRequests.filter(r => r.status === "approved");
  const rejectedRequests = filteredRequests.filter(r => r.status === "rejected");

  const renderRequestCard = (request: MeetingRequest) => (
    <Card key={request.id} className="border-l-4" style={{
      borderLeftColor: request.status === "approved" ? "#22c55e" : 
                     request.status === "pending" ? "#eab308" : "#ef4444"
    }}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="font-semibold">{request.studentName}</p>
                <p className="text-xs text-muted-foreground">{request.studentId}</p>
              </div>
            </div>
            <CardTitle className="text-base">{request.topic}</CardTitle>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {format(new Date(request.date), "PPP")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {request.time}
              </span>
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
        <div>
          <p className="text-sm font-medium mb-1">Discussion Topic:</p>
          <p className="text-sm text-muted-foreground">{request.description}</p>
        </div>

        {request.status === "approved" && request.meetingLink && (
          <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">
              Meeting Link:
            </p>
            <a 
              href={request.meetingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-green-700 dark:text-green-300 hover:underline break-all"
            >
              {request.meetingLink}
            </a>
          </div>
        )}

        {request.status === "rejected" && request.adminNote && (
          <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-sm font-medium text-red-900 dark:text-red-100 mb-1">
              Rejection Note:
            </p>
            <p className="text-sm text-red-800 dark:text-red-200">
              {request.adminNote}
            </p>
          </div>
        )}

        {request.status === "pending" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="w-full" 
                onClick={() => setSelectedRequest(request)}
              >
                Review Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Review Meeting Request</DialogTitle>
                <DialogDescription>
                  Approve or reject the meeting request from {request.studentName}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Student</p>
                    <p className="text-sm text-muted-foreground">{request.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Student ID</p>
                    <p className="text-sm text-muted-foreground">{request.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(request.date), "PPP")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-sm text-muted-foreground">{request.time}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Topic</p>
                  <p className="text-sm text-muted-foreground">{request.topic}</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Description</p>
                  <p className="text-sm text-muted-foreground">{request.description}</p>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="meetingLink">Google Meet Link (for approval)</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="meetingLink"
                        placeholder="https://meet.google.com/..."
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminNote">Note (for rejection)</Label>
                    <Textarea
                      id="adminNote"
                      placeholder="Provide a reason for rejection..."
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleApprove(request.id)}
                      className="flex-1"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve & Send Link
                    </Button>
                    <Button 
                      onClick={() => handleReject(request.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Meeting Requests</h1>
          <p className="text-muted-foreground">
            Review and manage student meeting requests
          </p>
        </div>
        <div className="flex gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{pendingRequests.length}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{approvedRequests.length}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by student name, ID, or topic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingRequests.length > 0 ? (
            pendingRequests.map(renderRequestCard)
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">No pending requests</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedRequests.length > 0 ? (
            approvedRequests.map(renderRequestCard)
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">No approved requests</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedRequests.length > 0 ? (
            rejectedRequests.map(renderRequestCard)
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">No rejected requests</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
