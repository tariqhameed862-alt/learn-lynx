import { useState } from "react";
import { GraduationCap, Search, Filter, Download, TrendingUp, TrendingDown, Award } from "lucide-react";
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

const mockGrades = [
  {
    id: 1,
    studentName: "Alice Johnson",
    studentId: "ST001",
    program: "Computer Science",
    semester: "Fall 2024",
    courses: [
      { name: "Data Structures", grade: "A", points: 4.0, credits: 3 },
      { name: "Algorithms", grade: "A-", points: 3.7, credits: 3 },
      { name: "Database Systems", grade: "B+", points: 3.3, credits: 3 },
      { name: "Software Engineering", grade: "A", points: 4.0, credits: 4 }
    ],
    gpa: 3.75,
    totalCredits: 13,
    status: "Good Standing"
  },
  {
    id: 2,
    studentName: "Bob Smith",
    studentId: "ST002",
    program: "Software Engineering",
    semester: "Fall 2024",
    courses: [
      { name: "Web Development", grade: "A", points: 4.0, credits: 3 },
      { name: "Mobile Apps", grade: "B+", points: 3.3, credits: 3 },
      { name: "UI/UX Design", grade: "A-", points: 3.7, credits: 3 },
      { name: "Project Management", grade: "B", points: 3.0, credits: 3 }
    ],
    gpa: 3.5,
    totalCredits: 12,
    status: "Good Standing"
  },
  {
    id: 3,
    studentName: "Carol Davis",
    studentId: "ST003",
    program: "Data Science",
    semester: "Fall 2024",
    courses: [
      { name: "Statistics", grade: "B-", points: 2.7, credits: 3 },
      { name: "Machine Learning", grade: "C+", points: 2.3, credits: 4 },
      { name: "Data Mining", grade: "B", points: 3.0, credits: 3 },
      { name: "Python Programming", grade: "B+", points: 3.3, credits: 3 }
    ],
    gpa: 2.8,
    totalCredits: 13,
    status: "Academic Warning"
  }
];

const programs = ["Computer Science", "Software Engineering", "Data Science", "Information Technology"];
const semesters = ["Fall 2024", "Spring 2024", "Summer 2024"];

export function StudentGradesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");

  const filteredGrades = mockGrades.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === "all" || record.program === selectedProgram;
    const matchesSemester = selectedSemester === "all" || record.semester === selectedSemester;
    return matchesSearch && matchesProgram && matchesSemester;
  });

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return "text-green-600";
    if (gpa >= 3.0) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good Standing": return "bg-green-100 text-green-800";
      case "Academic Warning": return "bg-yellow-100 text-yellow-800";
      case "Academic Probation": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return "text-green-600";
    if (grade.startsWith('B')) return "text-blue-600";
    if (grade.startsWith('C')) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Student Grades & Transcripts</h1>
          <p className="text-muted-foreground">Monitor student academic performance and generate transcripts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Transcripts
          </Button>
          <Button className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Generate Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.35</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Honor Students</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockGrades.filter(g => g.gpa >= 3.5).length}
            </div>
            <p className="text-xs text-muted-foreground">GPA 3.5 or higher</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockGrades.filter(g => g.gpa < 3.0).length}
            </div>
            <p className="text-xs text-muted-foreground">Need academic support</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockGrades.reduce((sum, record) => sum + record.totalCredits, 0)}
            </div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Records</CardTitle>
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
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Semesters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {semesters.map((semester) => (
                    <SelectItem key={semester} value={semester}>
                      {semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grades Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Program & Semester</TableHead>
                <TableHead>Course Grades</TableHead>
                <TableHead>GPA & Credits</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrades.map((record) => (
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
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{record.program}</p>
                      <p className="text-sm text-muted-foreground">{record.semester}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {record.courses.slice(0, 2).map((course, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="truncate max-w-32">{course.name}</span>
                          <Badge variant="outline" className={getGradeColor(course.grade)}>
                            {course.grade}
                          </Badge>
                        </div>
                      ))}
                      {record.courses.length > 2 && (
                        <p className="text-xs text-muted-foreground">
                          +{record.courses.length - 2} more courses
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">GPA:</span>
                        <span className={`font-bold ${getGPAColor(record.gpa)}`}>
                          {record.gpa.toFixed(2)}
                        </span>
                      </div>
                      <Progress value={(record.gpa / 4.0) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {record.totalCredits} credits
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        View Transcript
                      </Button>
                      <Button variant="ghost" size="sm">
                        Generate Report
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