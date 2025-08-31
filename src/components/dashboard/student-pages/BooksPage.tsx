import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  BookOpen, 
  Star, 
  Download, 
  Eye,
  Filter,
  BookMarked,
  Clock,
  Users
} from "lucide-react";

const featuredBooks = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    rating: 4.8,
    downloads: 1420,
    description: "Comprehensive guide to algorithms and data structures",
    cover: "/api/placeholder/120/160",
    available: true,
    type: "PDF"
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Software Engineering",
    rating: 4.9,
    downloads: 2100,
    description: "A handbook of agile software craftsmanship",
    cover: "/api/placeholder/120/160",
    available: true,
    type: "PDF"
  },
  {
    id: 3,
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    category: "Database",
    rating: 4.7,
    downloads: 980,
    description: "Comprehensive database systems textbook",
    cover: "/api/placeholder/120/160",
    available: false,
    type: "PDF"
  }
];

const recentlyViewed = [
  { title: "Data Structures and Algorithms", progress: 45, lastRead: "2 hours ago" },
  { title: "Software Engineering Principles", progress: 78, lastRead: "1 day ago" },
  { title: "Computer Networks", progress: 23, lastRead: "3 days ago" }
];

const categories = [
  "All", "Computer Science", "Mathematics", "Software Engineering", 
  "Database", "AI/ML", "Web Development", "Mobile Development"
];

export const BooksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Academic Library</h1>
          <p className="text-muted-foreground">Discover books and resources for your studies</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <BookMarked className="w-4 h-4 mr-2" />
          My Library
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books, authors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
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

      <Tabs defaultValue="featured" className="space-y-6">
        <TabsList>
          <TabsTrigger value="featured">Featured Books</TabsTrigger>
          <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBooks.map((book) => (
              <Card key={book.id} className="feature-card overflow-hidden">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-primary/50" />
                  </div>
                  {!book.available && (
                    <Badge variant="secondary" className="absolute top-2 right-2">
                      Not Available
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{book.description}</p>
                  
                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{book.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{book.downloads}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      disabled={!book.available}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Read
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      disabled={!book.available}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Continue Reading
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentlyViewed.map((book, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{book.title}</h4>
                    <p className="text-sm text-muted-foreground">{book.lastRead}</p>
                    <div className="mt-2 bg-background rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{book.progress}% complete</p>
                  </div>
                  <Button size="sm">Continue</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Based on Your Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredBooks.slice(0, 2).map((book) => (
                  <div key={book.id} className="flex gap-4 p-4 bg-accent/10 rounded-lg">
                    <div className="w-16 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary/50" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{book.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{book.rating}</span>
                        <Badge variant="outline">{book.category}</Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
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