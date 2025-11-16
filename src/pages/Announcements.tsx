import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Megaphone, Pin, Calendar, Bell, Plus, AlertCircle, Upload, X, Image as ImageIcon } from 'lucide-react';

const Announcements = () => {
  const [filter, setFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const role = localStorage.getItem('userRole') || 'admin';
  
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    category: 'Event',
    priority: 'medium',
    targetAudience: 'All',
    isPinned: false,
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleCreateAnnouncement = () => {
    try {
      if (!newAnnouncement.title || !newAnnouncement.content) {
        toast.error('Please fill in all required fields');
        return;
      }

      toast.success('Announcement created successfully!', {
        description: `"${newAnnouncement.title}" has been published`,
      });

      // Reset form
      setNewAnnouncement({
        title: '',
        content: '',
        category: 'Event',
        priority: 'medium',
        targetAudience: 'All',
        isPinned: false,
      });
      setSelectedImage(null);
      setImagePreview(null);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error('Error creating announcement:', error);
      toast.error('Failed to create announcement. Please try again.');
    }
  };

  const announcements = [
    {
      id: 1,
      title: 'Annual Sports Day - 2024',
      content: 'The annual sports day will be held on February 15, 2024. All students are required to participate. Parents are invited to attend.',
      date: '2024-01-20',
      category: 'Event',
      priority: 'high',
      isPinned: true,
      author: 'Principal',
      targetAudience: 'All',
    },
    {
      id: 2,
      title: 'Mid-Term Examination Schedule Released',
      content: 'The mid-term examination schedule for all classes has been published. Please check the school portal for detailed timetable.',
      date: '2024-01-18',
      category: 'Academic',
      priority: 'high',
      isPinned: true,
      author: 'Academic Office',
      targetAudience: 'Students',
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      content: 'Parent-teacher meetings are scheduled for January 27-28, 2024. Please book your slot through the parent portal.',
      date: '2024-01-15',
      category: 'Meeting',
      priority: 'medium',
      isPinned: false,
      author: 'Vice Principal',
      targetAudience: 'Parents',
    },
    {
      id: 4,
      title: 'Holiday Notice - Republic Day',
      content: 'School will remain closed on January 26, 2024, on account of Republic Day. Classes will resume on January 29, 2024.',
      date: '2024-01-12',
      category: 'Holiday',
      priority: 'medium',
      isPinned: false,
      author: 'Administration',
      targetAudience: 'All',
    },
    {
      id: 5,
      title: 'New Library Books Available',
      content: 'Over 200 new books have been added to the library. Students can now issue books from the updated collection.',
      date: '2024-01-10',
      category: 'Facility',
      priority: 'low',
      isPinned: false,
      author: 'Librarian',
      targetAudience: 'Students',
    },
    {
      id: 6,
      title: 'Staff Training Workshop',
      content: 'A professional development workshop for all teaching staff will be conducted on February 3, 2024. Attendance is mandatory.',
      date: '2024-01-08',
      category: 'Training',
      priority: 'medium',
      isPinned: false,
      author: 'HR Department',
      targetAudience: 'Teachers',
    },
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    if (filter === 'all') return true;
    return announcement.category.toLowerCase() === filter.toLowerCase();
  });

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'destructive';
    if (priority === 'medium') return 'secondary';
    return 'default';
  };

  const getCategoryIcon = (category: string) => {
    if (category === 'Event') return Calendar;
    if (category === 'Academic') return Bell;
    if (category === 'Meeting') return Calendar;
    return Megaphone;
  };

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.isPinned);
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.isPinned);

  return (
    <Layout>
      <div className="pt-8 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <Megaphone className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              Announcements
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Stay updated with school news and events</p>
          </div>
          {role === 'admin' && (
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 w-full sm:w-auto">
                  <Plus className="h-4 w-4" />
                  <span>Create Announcement</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5" />
                    Create New Announcement
                  </DialogTitle>
                  <DialogDescription>
                    Create a new announcement with optional image attachment
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter announcement title"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      placeholder="Enter announcement details..."
                      rows={5}
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Attach Image (Optional)</Label>
                    {!imagePreview ? (
                      <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors">
                        <input
                          id="image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageSelect}
                        />
                        <label
                          htmlFor="image"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">Click to upload image</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </label>
                      </div>
                    ) : (
                      <div className="relative border rounded-lg p-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-4 right-4"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Category and Priority */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newAnnouncement.category}
                        onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Event">Event</SelectItem>
                          <SelectItem value="Academic">Academic</SelectItem>
                          <SelectItem value="Meeting">Meeting</SelectItem>
                          <SelectItem value="Holiday">Holiday</SelectItem>
                          <SelectItem value="Facility">Facility</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={newAnnouncement.priority}
                        onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="space-y-2">
                    <Label htmlFor="audience">Target Audience</Label>
                    <Select
                      value={newAnnouncement.targetAudience}
                      onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, targetAudience: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Students">Students</SelectItem>
                        <SelectItem value="Parents">Parents</SelectItem>
                        <SelectItem value="Teachers">Teachers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Pin Announcement */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="pin"
                      checked={newAnnouncement.isPinned}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, isPinned: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="pin" className="cursor-pointer">
                      Pin this announcement to top
                    </Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAnnouncement}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Announcement
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{announcements.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium">Pinned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-primary">
                {announcements.filter(a => a.isPinned).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium">High Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-red-600">
                {announcements.filter(a => a.priority === 'high').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                {announcements.filter(a => new Date(a.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
            className="text-xs sm:text-sm"
          >
            All
          </Button>
          <Button
            variant={filter === 'event' ? 'default' : 'outline'}
            onClick={() => setFilter('event')}
            size="sm"
            className="text-xs sm:text-sm"
          >
            Events
          </Button>
          <Button
            variant={filter === 'academic' ? 'default' : 'outline'}
            onClick={() => setFilter('academic')}
            size="sm"
            className="text-xs sm:text-sm"
          >
            Academic
          </Button>
          <Button
            variant={filter === 'meeting' ? 'default' : 'outline'}
            onClick={() => setFilter('meeting')}
            size="sm"
            className="text-xs sm:text-sm"
          >
            Meetings
          </Button>
          <Button
            variant={filter === 'holiday' ? 'default' : 'outline'}
            onClick={() => setFilter('holiday')}
            size="sm"
            className="text-xs sm:text-sm"
          >
            Holidays
          </Button>
        </div>

        {pinnedAnnouncements.length > 0 && (
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
              <Pin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Pinned
            </h2>
            {pinnedAnnouncements.map((announcement) => {
              const CategoryIcon = getCategoryIcon(announcement.category);
              return (
                <Card key={announcement.id} className="border-2 border-primary">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex-shrink-0">
                          <CategoryIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Pin className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                            <CardTitle className="text-base sm:text-xl break-words">{announcement.title}</CardTitle>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <Badge variant={getPriorityColor(announcement.priority)} className="text-xs">
                              {announcement.priority.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">{announcement.category}</Badge>
                            <span className="text-xs sm:text-sm text-muted-foreground">
                              by {announcement.author}
                            </span>
                          </div>
                          <CardDescription className="text-sm sm:text-base mt-2">
                            {announcement.content}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2 sm:flex-shrink-0">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        {announcement.date}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">
          {pinnedAnnouncements.length > 0 && (
            <h2 className="text-lg sm:text-xl font-semibold">All Announcements</h2>
          )}
          {regularAnnouncements.map((announcement) => {
            const CategoryIcon = getCategoryIcon(announcement.category);
            return (
              <Card key={announcement.id}>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary flex-shrink-0">
                        <CategoryIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <CardTitle className="text-base sm:text-lg break-words">{announcement.title}</CardTitle>
                          <Badge variant={getPriorityColor(announcement.priority)} className="text-xs">
                            {announcement.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs">{announcement.category}</Badge>
                        </div>
                        <CardDescription className="text-xs sm:text-sm">
                          {announcement.content}
                        </CardDescription>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 text-xs text-muted-foreground">
                          <span>By: {announcement.author}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>For: {announcement.targetAudience}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2 sm:flex-shrink-0">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      {announcement.date}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {filteredAnnouncements.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No announcements found</h3>
              <p className="text-muted-foreground text-center">
                {filter === 'all' 
                  ? 'There are no announcements at the moment'
                  : `No ${filter} announcements available`
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Announcements;

