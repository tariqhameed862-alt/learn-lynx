import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GraduationCap, Plus, Trash2, Edit, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialDomains = [
  { id: 1, name: "Sustainable & Green Process Engineering", projectCount: 0 },
  { id: 2, name: "Waste-to-Energy & Circular Economy", projectCount: 0 },
  { id: 3, name: "Environmental Engineering", projectCount: 0 },
  { id: 4, name: "Process Simulation, AI & Digitalization", projectCount: 0 },
  { id: 5, name: "Renewable Energy & Hydrogen Economy", projectCount: 0 },
];

const initialProjects = [
  {
    id: 1,
    domainId: 1,
    title: "Solar-Powered Water Purification System",
    description: "Developing an eco-friendly water treatment solution using renewable solar energy for sustainable community development."
  },
  {
    id: 2,
    domainId: 4,
    title: "AI-Based Energy Consumption Optimizer",
    description: "Machine learning model to predict and optimize energy usage in industrial processes for cost reduction."
  },
];

export function FYPProjectsPage() {
  const [domains, setDomains] = useState(initialDomains);
  const [projects, setProjects] = useState(initialProjects);
  const [newDomain, setNewDomain] = useState("");
  const [newProject, setNewProject] = useState({ domainId: "", title: "", description: "" });
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isAddDomainOpen, setIsAddDomainOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const { toast } = useToast();

  const handleAddDomain = () => {
    if (!newDomain.trim()) {
      toast({ title: "Error", description: "Domain name cannot be empty", variant: "destructive" });
      return;
    }

    const newDomainObj = {
      id: domains.length + 1,
      name: newDomain,
      projectCount: 0
    };

    setDomains([...domains, newDomainObj]);
    setNewDomain("");
    setIsAddDomainOpen(false);
    toast({ title: "Success", description: "Domain added successfully" });
  };

  const handleDeleteDomain = (id: number) => {
    const relatedProjects = projects.filter(p => p.domainId === id);
    if (relatedProjects.length > 0) {
      toast({ 
        title: "Cannot Delete", 
        description: "This domain has associated projects. Please delete them first.", 
        variant: "destructive" 
      });
      return;
    }

    setDomains(domains.filter(d => d.id !== id));
    toast({ title: "Success", description: "Domain deleted successfully" });
  };

  const handleAddProject = () => {
    if (!newProject.domainId || !newProject.title.trim() || !newProject.description.trim()) {
      toast({ title: "Error", description: "All fields are required", variant: "destructive" });
      return;
    }

    const project = {
      id: projects.length + 1,
      domainId: parseInt(newProject.domainId),
      title: newProject.title,
      description: newProject.description
    };

    setProjects([...projects, project]);
    
    // Update domain project count
    setDomains(domains.map(d => 
      d.id === project.domainId ? { ...d, projectCount: d.projectCount + 1 } : d
    ));

    setNewProject({ domainId: "", title: "", description: "" });
    setIsAddProjectOpen(false);
    toast({ title: "Success", description: "Project added successfully" });
  };

  const handleEditProject = () => {
    if (!editingProject.title.trim() || !editingProject.description.trim()) {
      toast({ title: "Error", description: "Title and description are required", variant: "destructive" });
      return;
    }

    setProjects(projects.map(p => 
      p.id === editingProject.id ? editingProject : p
    ));

    setEditingProject(null);
    setIsEditProjectOpen(false);
    toast({ title: "Success", description: "Project updated successfully" });
  };

  const handleDeleteProject = (id: number) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      setProjects(projects.filter(p => p.id !== id));
      setDomains(domains.map(d => 
        d.id === project.domainId ? { ...d, projectCount: Math.max(0, d.projectCount - 1) } : d
      ));
      toast({ title: "Success", description: "Project deleted successfully" });
    }
  };

  const openEditDialog = (project: any) => {
    setEditingProject({ ...project });
    setIsEditProjectOpen(true);
  };

  const getProjectsByDomain = (domainId: number) => {
    return projects.filter(p => p.domainId === domainId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">FYP Domains Management</h1>
          <p className="text-muted-foreground">Manage research domains and project ideas</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddDomainOpen} onOpenChange={setIsAddDomainOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Domain
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Domain</DialogTitle>
                <DialogDescription>Create a new FYP research domain</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Domain Name</Label>
                  <Input
                    placeholder="e.g., Renewable Energy Systems"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddDomain} className="w-full">Add Domain</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
                <DialogDescription>Add a project idea to a domain</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Select Domain</Label>
                  <Select value={newProject.domainId} onValueChange={(value) => setNewProject({ ...newProject, domainId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a domain" />
                    </SelectTrigger>
                    <SelectContent>
                      {domains.map(domain => (
                        <SelectItem key={domain.id} value={domain.id.toString()}>
                          {domain.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Project Title</Label>
                  <Input
                    placeholder="Enter project title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe the project objectives and scope"
                    rows={4}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddProject} className="w-full">Add Project</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Domains</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{domains.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Projects/Domain</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {domains.length > 0 ? (projects.length / domains.length).toFixed(1) : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="domains" className="space-y-4">
        <TabsList>
          <TabsTrigger value="domains">Domains</TabsTrigger>
          <TabsTrigger value="projects">All Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="domains" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Research Domains</CardTitle>
              <CardDescription>Manage FYP research domains</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain Name</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {domains.map((domain) => (
                    <TableRow key={domain.id}>
                      <TableCell className="font-medium">{domain.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{getProjectsByDomain(domain.id).length} projects</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteDomain(domain.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Projects</CardTitle>
              <CardDescription>View and manage all FYP project ideas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Title</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => {
                    const domain = domains.find(d => d.id === project.domainId);
                    return (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{domain?.name}</Badge>
                        </TableCell>
                        <TableCell className="max-w-md">
                          <p className="text-sm text-muted-foreground truncate">{project.description}</p>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openEditDialog(project)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Project Dialog */}
      <Dialog open={isEditProjectOpen} onOpenChange={setIsEditProjectOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update project details</DialogDescription>
          </DialogHeader>
          {editingProject && (
            <div className="space-y-4">
              <div>
                <Label>Project Title</Label>
                <Input
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={4}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                />
              </div>
              <Button onClick={handleEditProject} className="w-full">Update Project</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
