import { useState } from "react";
import { FileText, Plus, Edit, Trash2, Search, Eye, Globe, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const mockPages = [
  {
    id: 1,
    title: "Dashboard",
    slug: "/dashboard",
    description: "Main dashboard page for all users",
    status: "Published",
    visibility: "Private",
    roles: ["Student", "Teacher", "Admin"],
    lastModified: "2024-01-15",
    author: "System",
    template: "Dashboard"
  },
  {
    id: 2,
    title: "Student Portal",
    slug: "/student",
    description: "Student-specific landing page with academic tools",
    status: "Published", 
    visibility: "Private",
    roles: ["Student"],
    lastModified: "2024-01-14",
    author: "Admin User",
    template: "Student Portal"
  },
  {
    id: 3,
    title: "Teacher Hub",
    slug: "/teacher",
    description: "Teacher dashboard with course management tools",
    status: "Published",
    visibility: "Private", 
    roles: ["Teacher"],
    lastModified: "2024-01-13",
    author: "Admin User",
    template: "Teacher Hub"
  },
  {
    id: 4,
    title: "About Us",
    slug: "/about",
    description: "Public information about the institution",
    status: "Published",
    visibility: "Public",
    roles: ["Public"],
    lastModified: "2024-01-12",
    author: "Content Manager",
    template: "Static Page"
  },
  {
    id: 5,
    title: "Help Center",
    slug: "/help",
    description: "User documentation and support resources",
    status: "Draft",
    visibility: "Private",
    roles: ["Student", "Teacher"],
    lastModified: "2024-01-10",
    author: "Support Team",
    template: "Help Center"
  }
];

const pageTemplates = [
  "Dashboard",
  "Static Page", 
  "Student Portal",
  "Teacher Hub",
  "Help Center",
  "Landing Page",
  "Course Page",
  "Custom"
];

export function PagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddPageOpen, setIsAddPageOpen] = useState(false);

  const filteredPages = mockPages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || page.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getVisibilityIcon = (visibility: string) => {
    return visibility === "Public" ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Page Management</h1>
          <p className="text-muted-foreground">Manage system pages and their access controls</p>
        </div>
        <Dialog open={isAddPageOpen} onOpenChange={setIsAddPageOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Page</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pageTitle">Page Title</Label>
                  <Input id="pageTitle" placeholder="Enter page title" />
                </div>
                <div>
                  <Label htmlFor="pageSlug">URL Slug</Label>
                  <Input id="pageSlug" placeholder="e.g., /about-us" />
                </div>
              </div>
              <div>
                <Label htmlFor="pageDescription">Description</Label>
                <Textarea id="pageDescription" placeholder="Brief description of the page" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="template">Template</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {pageTemplates.map((template) => (
                        <SelectItem key={template} value={template}>
                          {template}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="public" />
                <Label htmlFor="public">Make this page publicly accessible</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddPageOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddPageOpen(false)}>
                  Create Page
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPages.length}</div>
            <p className="text-xs text-muted-foreground">System-wide pages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPages.filter(p => p.status === "Published").length}
            </div>
            <p className="text-xs text-muted-foreground">Live pages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Public Pages</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPages.filter(p => p.visibility === "Public").length}
            </div>
            <p className="text-xs text-muted-foreground">Publicly accessible</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPages.filter(p => p.status === "Draft").length}
            </div>
            <p className="text-xs text-muted-foreground">Work in progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>System Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pages Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{page.title}</p>
                        <p className="text-sm text-muted-foreground">{page.slug}</p>
                        <p className="text-xs text-muted-foreground">{page.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(page.status)}>
                      {page.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getVisibilityIcon(page.visibility)}
                      <span className="text-sm">{page.visibility}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{page.template}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{page.lastModified}</p>
                      <p className="text-xs text-muted-foreground">by {page.author}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
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