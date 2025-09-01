import { useState } from "react";
import { Shield, Plus, Edit, Trash2, Users, Lock } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";

const mockRoles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full system access with all permissions",
    userCount: 3,
    permissions: ["user_management", "role_management", "system_settings", "analytics", "content_moderation"],
    color: "bg-red-100 text-red-800"
  },
  {
    id: 2,
    name: "Admin",
    description: "Administrative access to manage users and content",
    userCount: 8,
    permissions: ["user_management", "content_moderation", "analytics"],
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: 3,
    name: "Teacher",
    description: "Educator with access to teaching tools and student management",
    userCount: 45,
    permissions: ["student_management", "content_creation", "grading", "course_management"],
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: 4,
    name: "Student",
    description: "Learner with access to courses and educational resources",
    userCount: 1234,
    permissions: ["course_access", "resource_access", "assignment_submission"],
    color: "bg-green-100 text-green-800"
  },
];

const availablePermissions = [
  { id: "user_management", name: "User Management", description: "Create, edit, and delete users" },
  { id: "role_management", name: "Role Management", description: "Manage user roles and permissions" },
  { id: "system_settings", name: "System Settings", description: "Configure system-wide settings" },
  { id: "analytics", name: "Analytics", description: "View system analytics and reports" },
  { id: "content_moderation", name: "Content Moderation", description: "Moderate user-generated content" },
  { id: "student_management", name: "Student Management", description: "Manage student records and progress" },
  { id: "content_creation", name: "Content Creation", description: "Create and edit educational content" },
  { id: "grading", name: "Grading", description: "Grade assignments and provide feedback" },
  { id: "course_management", name: "Course Management", description: "Manage courses and curricula" },
  { id: "course_access", name: "Course Access", description: "Access enrolled courses" },
  { id: "resource_access", name: "Resource Access", description: "Access educational resources" },
  { id: "assignment_submission", name: "Assignment Submission", description: "Submit assignments and projects" },
];

export function RolesPage() {
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    } else {
      setSelectedPermissions(selectedPermissions.filter(id => id !== permissionId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Role Management</h1>
          <p className="text-muted-foreground">Manage system roles and their permissions</p>
        </div>
        <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="roleName">Role Name</Label>
                <Input id="roleName" placeholder="Enter role name" />
              </div>
              <div>
                <Label htmlFor="roleDescription">Description</Label>
                <Textarea id="roleDescription" placeholder="Enter role description" />
              </div>
              <div>
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={permission.id}
                        checked={selectedPermissions.includes(permission.id)}
                        onCheckedChange={(checked) => 
                          handlePermissionChange(permission.id, checked as boolean)
                        }
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={permission.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {permission.name}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {permission.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddRoleOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddRoleOpen(false)}>
                  Create Role
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
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRoles.length}</div>
            <p className="text-xs text-muted-foreground">System-wide roles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockRoles.reduce((sum, role) => sum + role.userCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all roles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permissions</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availablePermissions.length}</div>
            <p className="text-xs text-muted-foreground">Available permissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Beyond default roles</p>
          </CardContent>
        </Card>
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>System Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{role.name}</p>
                          <Badge className={role.color}>{role.name}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{role.userCount} users</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 2).map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {availablePermissions.find(p => p.id === permission)?.name}
                        </Badge>
                      ))}
                      {role.permissions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{role.permissions.length - 2} more
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