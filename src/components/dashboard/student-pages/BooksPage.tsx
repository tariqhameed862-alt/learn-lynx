import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  BookOpen, 
  Star, 
  Download, 
  Eye,
  Filter,
  BookMarked,
  Clock,
  Users,
  Plus,
  Trash2,
  FileText
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
    type: "PDF",
    pdfUrl: "/sample-algorithms.pdf",
    pages: 1312,
    publishedYear: 2009
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
    type: "PDF",
    pdfUrl: "/sample-clean-code.pdf",
    pages: 464,
    publishedYear: 2008
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
    type: "PDF",
    pdfUrl: "/sample-database.pdf",
    pages: 1376,
    publishedYear: 2019
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
  const [myLibrary, setMyLibrary] = useState<number[]>([]);
  const [selectedBook, setSelectedBook] = useState<typeof featuredBooks[0] | null>(null);
  const [showMyLibrary, setShowMyLibrary] = useState(false);
  const { toast } = useToast();

  const addToLibrary = (bookId: number) => {
    if (!myLibrary.includes(bookId)) {
      setMyLibrary([...myLibrary, bookId]);
      toast({
        title: "Added to Library",
        description: "Book has been added to your library.",
      });
    }
  };

  const removeFromLibrary = (bookId: number) => {
    setMyLibrary(myLibrary.filter(id => id !== bookId));
    toast({
      title: "Removed from Library",
      description: "Book has been removed from your library.",
    });
  };

  const downloadBook = (book: typeof featuredBooks[0]) => {
    toast({
      title: "Downloading...",
      description: `Downloading ${book.title}`,
    });
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${book.title} has been downloaded.`,
      });
    }, 1500);
  };

  const libraryBooks = featuredBooks.filter(book => myLibrary.includes(book.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            {showMyLibrary ? "My Library" : "Academic Library"}
          </h1>
          <p className="text-muted-foreground">
            {showMyLibrary 
              ? `You have ${libraryBooks.length} book${libraryBooks.length !== 1 ? 's' : ''} in your library`
              : "Discover books and resources for your studies"
            }
          </p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => setShowMyLibrary(!showMyLibrary)}
        >
          <BookMarked className="w-4 h-4 mr-2" />
          {showMyLibrary ? "Browse Books" : `My Library (${libraryBooks.length})`}
        </Button>
      </div>

      {/* Search and Filter */}
      {!showMyLibrary && (
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
      )}

      {showMyLibrary ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {libraryBooks.length === 0 ? (
            <Card className="col-span-full p-12 text-center">
              <BookMarked className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Your library is empty</h3>
              <p className="text-muted-foreground mb-4">Start adding books to build your collection</p>
              <Button onClick={() => setShowMyLibrary(false)}>
                Browse Books
              </Button>
            </Card>
          ) : (
            libraryBooks.map((book) => (
              <Card key={book.id} className="feature-card overflow-hidden">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-primary/50" />
                  </div>
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
                      <FileText className="w-4 h-4" />
                      <span>{book.pages} pages</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedBook(book)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => downloadBook(book)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => removeFromLibrary(book.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      ) : (
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
                      onClick={() => setSelectedBook(book)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      disabled={!book.available}
                      onClick={() => downloadBook(book)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    {myLibrary.includes(book.id) ? (
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => removeFromLibrary(book.id)}
                      >
                        <BookMarked className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        disabled={!book.available}
                        onClick={() => addToLibrary(book.id)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    )}
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
      )}

      {/* Book Details Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Book Details</DialogTitle>
          </DialogHeader>
          {selectedBook && (
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="w-32 h-44 bg-gradient-to-br from-primary/10 to-accent/10 rounded flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-12 h-12 text-primary/50" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{selectedBook.title}</h2>
                  <p className="text-muted-foreground mb-4">by {selectedBook.author}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge variant="secondary">{selectedBook.category}</Badge>
                    <Badge variant="outline">{selectedBook.type}</Badge>
                    <Badge variant="outline">{selectedBook.publishedYear}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{selectedBook.rating} Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>{selectedBook.downloads} Downloads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>{selectedBook.pages} Pages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookMarked className="w-4 h-4" />
                      <span>{selectedBook.available ? "Available" : "Not Available"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{selectedBook.description}</p>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1"
                  disabled={!selectedBook.available}
                  onClick={() => downloadBook(selectedBook)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                {myLibrary.includes(selectedBook.id) ? (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      removeFromLibrary(selectedBook.id);
                      setSelectedBook(null);
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove from Library
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    disabled={!selectedBook.available}
                    onClick={() => {
                      addToLibrary(selectedBook.id);
                      setSelectedBook(null);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Library
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};