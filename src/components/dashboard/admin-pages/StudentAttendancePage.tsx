import { useState } from "react";
import { Calendar, Search, Filter, Download, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const mockAttendance = [
  {
    id: 1,
    studentName: "Alice Johnson",
    studentId: "ST001",
    program: "Computer Science",
    totalClasses: 45,
    attended: 42,
    missed: 3,
    attendanceRate: 93.3,
    lastAttendance: "2024-01-20",
    status: "Good",
    monthlyAttendance: [
      { month: "Jan", rate: 95 },
      { month: "Dec", rate: 90 },
      { month: "Nov", rate: 95 }
    ]
  },
  {
    id: 2,
    studentName: "Bob Smith",
    studentId: "ST002",
    program: "Software Engineering",
    totalClasses: 40,
    attended: 36,
    missed: 4,
    attendanceRate: 90.0,
    lastAttendance: "2024-01-19",
    status: "Good",
    monthlyAttendance: [
      { month: "Jan", rate: 88 },
      { month: "Dec", rate: 92 },
      { month: "Nov", rate: 90 }
    ]
  },
  {
    id: 3,
    studentName: "Carol Davis",
    studentId: "ST003",
    program: "Data Science",
    totalClasses: 38,
    attended: 28,
    missed: 10,
    attendanceRate: 73.7,
    lastAttendance: "2024-01-18",
    status: "Warning",
    monthlyAttendance: [
      { month: "Jan", rate: 70 },
      { month: "Dec", rate: 75 },
      { month: "Nov", rate: 76 }
    ]
  },
  {
    id: 4,
    studentName: "David Wilson",
    studentId: "ST004",
    program: "Information Technology",
    totalClasses: 42,
    attended: 25,
    missed: 17,
    attendanceRate: 59.5,
    lastAttendance: "2024-01-15",
    status: "Critical",
    monthlyAttendance: [
      { month: "Jan", rate: 55 },
      { month: "Dec", rate: 62 },
      { month: "Nov", rate: 62 }
    ]
  }
];

const programs = ["Computer Science", "Software Engineering", "Data Science", "Information Technology"];

export function StudentAttendancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredAttendance = mockAttendance.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === "all" || record.program === selectedProgram;
    const matchesStatus = selectedStatus === "all" || record.status === selectedStatus;
    return matchesSearch && matchesProgram && matchesStatus;
  });

  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "bg-green-100 text-green-800";
      case "Warning": return "bg-yellow-100 text-yellow-800";
      case "Critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Good": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Warning": return <Clock className="w-4 h-4 text-yellow-600" />;
      case "Critical": return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Student Attendance</h1>
          <p className="text-muted-foreground">Monitor and track student attendance across all courses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">79.1%</div>
            <p className="text-xs text-muted-foreground">Across all students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Good Attendance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAttendance.filter(a => a.status === "Good").length}
            </div>
            <p className="text-xs text-muted-foreground">Students above 85%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAttendance.filter(a => a.status === "Warning").length}
            </div>
            <p className="text-xs text-muted-foreground">Need monitoring</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Cases</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAttendance.filter(a => a.status === "Critical").length}
            </div>
            <p className="text-xs text-muted-foreground">Below 75%</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Programs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {programs.map((program) => (
                    <SelectItem key={program} value={program}>
                      {program}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Warning">Warning</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Attendance Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Attendance Stats</TableHead>
                <TableHead>Attendance Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder-student-${record.id}.jpg`} />
                        <AvatarFallback>{record.studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{record.studentName}</p>
                        <p className="text-sm text-muted-foreground">{record.studentId}</p>
                        <p className="text-xs text-muted-foreground">
                          Last: {record.lastAttendance}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{record.program}</p>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="text-green-600">{record.attended}</span> present / 
                        <span className="text-red-600"> {record.missed}</span> absent
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Total: {record.totalClasses} classes
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${getAttendanceColor(record.attendanceRate)}`}>
                          {record.attendanceRate.toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={record.attendanceRate} 
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      <Badge className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm">
                        Send Alert
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}