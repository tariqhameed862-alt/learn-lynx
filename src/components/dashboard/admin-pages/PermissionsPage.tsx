import { useState } from "react";
import { Shield, Lock, Plus, Edit, Trash2, Search, Filter } from "lucide-react";
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

const permissionCategories = [
  "User Management",
  "Content Management", 
  "System Administration",
  "Academic Operations",
  "Analytics & Reporting"
];

const mockPermissions = [
  {
    id: 1,
    name: "user_create",
    displayName: "Create Users",
    description: "Ability to create new user accounts",
    category: "User Management",
    roles: ["Super Admin", "Admin"],
    resourceType: "User",
    actions: ["create"]
  },
  {
    id: 2,
    name: "user_edit",
    displayName: "Edit Users", 
    description: "Ability to modify existing user accounts",
    category: "User Management",
    roles: ["Super Admin", "Admin"],
    resourceType: "User",
    actions: ["update"]
  },
  {
    id: 3,
    name: "user_delete",
    displayName: "Delete Users",
    description: "Ability to delete user accounts",
    category: "User Management", 
    roles: ["Super Admin"],
    resourceType: "User",
    actions: ["delete"]
  },
  {
    id: 4,
    name: "content_create",
    displayName: "Create Content",
    description: "Ability to create educational content",
    category: "Content Management",
    roles: ["Teacher", "Admin", "Super Admin"],
    resourceType: "Content",
    actions: ["create"]
  },
  {
    id: 5,
    name: "course_manage",
    displayName: "Manage Courses",
    description: "Full course management capabilities",
    category: "Academic Operations",
    roles: ["Teacher", "Admin", "Super Admin"],
    resourceType: "Course",
    actions: ["create", "read", "update", "delete"]
  },
  {
    id: 6,
    name: "system_settings",
    displayName: "System Settings",
    description: "Configure system-wide settings",
    category: "System Administration",
    roles: ["Super Admin"],
    resourceType: "System",
    actions: ["update"]
  },
  {
    id: 7,
    name: "analytics_view",
    displayName: "View Analytics",
    description: "Access to system analytics and reports",
    category: "Analytics & Reporting",
    roles: ["Admin", "Super Admin"],
    resourceType: "Analytics",
    actions: ["read"]
  },
];

export function PermissionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddPermissionOpen, setIsAddPermissionOpen] = useState(false);

  const filteredPermissions = mockPermissions.filter(permission => {
    const matchesSearch = permission.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || permission.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "User Management": "bg-blue-100 text-blue-800",
      "Content Management": "bg-green-100 text-green-800",
      "System Administration": "bg-red-100 text-red-800", 
      "Academic Operations": "bg-purple-100 text-purple-800",
      "Analytics & Reporting": "bg-orange-100 text-orange-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Permission Management</h1>
          <p className="text-muted-foreground">Manage system permissions and access controls</p>
        </div>
        <Dialog open={isAddPermissionOpen} onOpenChange={setIsAddPermissionOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Permission
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Permission</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="permissionName">Permission Name</Label>
                <Input id="permissionName" placeholder="e.g., user_create" />
              </div>
              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" placeholder="e.g., Create Users" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe what this permission allows" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {permissionCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="resourceType">Resource Type</Label>
                <Input id="resourceType" placeholder="e.g., User, Course, Content" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddPermissionOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddPermissionOpen(false)}>
                  Create Permission
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
            <CardTitle className="text-sm font-medium">Total Permissions</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPermissions.length}</div>
            <p className="text-xs text-muted-foreground">System-wide permissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{permissionCategories.length}</div>
            <p className="text-xs text-muted-foreground">Permission categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Permissions</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPermissions.filter(p => p.roles.includes("Admin")).length}
            </div>
            <p className="text-xs text-muted-foreground">Admin-level access</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Security</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPermissions.filter(p => p.roles.includes("Super Admin")).length}
            </div>
            <p className="text-xs text-muted-foreground">Super Admin only</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>System Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search permissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {permissionCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Permissions Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Permission</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Assigned Roles</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPermissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{permission.displayName}</p>
                        <p className="text-sm text-muted-foreground">{permission.description}</p>
                        <p className="text-xs text-muted-foreground font-mono">{permission.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(permission.category)}>
                      {permission.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{permission.resourceType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {permission.roles.slice(0, 2).map((role) => (
                        <Badge key={role} variant="secondary" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                      {permission.roles.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{permission.roles.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
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