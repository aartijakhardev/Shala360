import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { teacherAPI, Teacher } from '@/lib/api';
import { 
  Trash2, Search, RotateCcw, Eye, ArrowLeft, 
  RefreshCw, UserX, Calendar, Mail, Phone 
} from 'lucide-react';

const DeletedTeachers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [deletedTeachers, setDeletedTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    subjectDistribution: []
  });

  // Fetch deleted teachers from API
  const fetchDeletedTeachers = async () => {
    try {
      setLoading(true);
      const response = await teacherAPI.getAll({
        includeDeleted: true,
        search: searchQuery,
        subject: subjectFilter === 'all' ? '' : subjectFilter,
        sortBy: 'updatedAt',
        sortOrder: 'desc'
      });
      setDeletedTeachers(response.data.teachers);
      setStatistics(response.data.statistics);
    } catch (error) {
      console.error('Error fetching deleted teachers:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch deleted teachers'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeletedTeachers();
  }, [searchQuery, subjectFilter]);

  const handleRestoreTeacher = async (teacherId: string, teacherName: string) => {
    try {
      await teacherAPI.restore(teacherId);
      toast({
        title: 'Teacher Restored',
        description: `${teacherName} has been restored successfully.`
      });
      fetchDeletedTeachers();
    } catch (error) {
      console.error('Error restoring teacher:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to restore teacher'
      });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/teacher-management')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Teachers
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Trash2 className="h-8 w-8 text-destructive" />
                Deleted Teachers
              </h1>
              <p className="text-muted-foreground">View and restore deleted teacher profiles</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Deleted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{deletedTeachers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Subjects Affected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {new Set(deletedTeachers.map(t => t.subject)).size}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Recent Deletions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {deletedTeachers.filter(t => {
                  const deletedDate = new Date(t.updatedAt);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return deletedDate > weekAgo;
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserX className="h-5 w-5" />
              Deleted Teachers
            </CardTitle>
            <CardDescription>
              View deleted teachers and restore them if needed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search deleted teachers by name, ID, or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {statistics.subjectDistribution.map((subject: any) => (
                    <SelectItem key={subject._id} value={subject._id}>
                      {subject._id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={fetchDeletedTeachers} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Teacher ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Deleted Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                        Loading deleted teachers...
                      </TableCell>
                    </TableRow>
                  ) : deletedTeachers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <UserX className="h-12 w-12 text-muted-foreground/50" />
                          <p>No deleted teachers found.</p>
                          <p className="text-sm">All teachers are active!</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    deletedTeachers.map((teacher) => (
                      <TableRow key={teacher._id} className="bg-destructive/5">
                        <TableCell>
                          <Avatar className="h-10 w-10 opacity-70">
                            <AvatarImage src={teacher.photo?.url} alt={teacher.name} />
                            <AvatarFallback>{getInitials(teacher.name)}</AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium text-muted-foreground">
                          {teacher.teacherId}
                        </TableCell>
                        <TableCell className="font-medium">
                          <span className="line-through text-muted-foreground">
                            {teacher.name}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-muted-foreground">
                            {teacher.subject}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" /> {teacher.email || 'N/A'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" /> {teacher.phone || 'N/A'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDate(teacher.updatedAt)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive">
                            🗑️ Deleted
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="View Profile"
                              onClick={() => navigate(`/teacher-management/view/${teacher._id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  title="Restore Teacher"
                                  className="border-green-200 text-green-600 hover:bg-green-50"
                                >
                                  <RotateCcw className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Restore Teacher</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to restore <strong>{teacher.name}</strong>? 
                                    They will be moved back to the active teachers list and their status will be updated.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleRestoreTeacher(teacher._id, teacher.name)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    Restore
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {deletedTeachers.length > 0 && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2 text-amber-800">
                  <UserX className="h-5 w-5" />
                  <h3 className="font-semibold">About Deleted Teachers</h3>
                </div>
                <p className="text-sm text-amber-700 mt-2">
                  Deleted teachers are soft-deleted and can be restored at any time. Their data is preserved 
                  but they won't appear in active teacher lists or reports.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DeletedTeachers;
