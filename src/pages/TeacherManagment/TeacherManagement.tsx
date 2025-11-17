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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { teacherAPI, Teacher } from '@/lib/api';
import { GraduationCap, Search, Plus, Edit, Trash2, Eye, Mail, Phone, Download, RefreshCw, ChevronDown, UserX } from 'lucide-react';

const TeacherManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    totalActive: 0,
    statusDistribution: [],
    subjectDistribution: [],
    deletedTeachers: 0
  });

  // Fetch teachers from API
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      
      // Fetch teachers list and statistics separately
      const [teachersResponse, statsResponse] = await Promise.all([
        teacherAPI.getAll({
          search: searchQuery,
          status: statusFilter === 'all' ? '' : statusFilter,
          subject: subjectFilter === 'all' ? '' : subjectFilter,
          sortBy: 'name',
          sortOrder: 'asc'
        }),
        teacherAPI.getStats()
      ]);
      
      setTeachers(teachersResponse.data.teachers);
      setStatistics({
        totalActive: statsResponse.data.totalTeachers,
        statusDistribution: statsResponse.data.statusDistribution,
        subjectDistribution: statsResponse.data.subjectDistribution,
        deletedTeachers: statsResponse.data.deletedTeachers
      });
    } catch (error) {
      console.error('Error fetching teachers:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch teachers'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [searchQuery, statusFilter, subjectFilter]);

  const handleDeleteTeacher = async (teacherId: string, teacherName: string) => {
    try {
      await teacherAPI.delete(teacherId);
      toast({
        title: 'Teacher Deleted',
        description: `${teacherName} has been moved to deleted teachers.`
      });
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete teacher'
      });
    }
  };

  const handleExport = async (format: 'excel' | 'csv' = 'excel') => {
    try {
      toast({
        title: 'Export Started',
        description: 'Preparing teachers data for export...'
      });

      const blob = await teacherAPI.export({
        format,
        includeDeleted: false,
        status: statusFilter === 'all' ? undefined : statusFilter,
        subject: subjectFilter === 'all' ? undefined : subjectFilter
      });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const date = new Date().toISOString().split('T')[0];
      const filename = `teachers-export-${date}.${format === 'excel' ? 'xls' : 'csv'}`;
      link.download = filename;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: 'Export Complete',
        description: `Teachers data exported successfully as ${filename}`
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        variant: 'destructive',
        title: 'Export Failed',
        description: 'Failed to export teachers data. Please try again.'
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'On Leave':
        return 'secondary';
      case 'Inactive':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const activeTeachers = statistics.statusDistribution.find(s => s._id === 'Active')?.count || 0;
  const onLeaveTeachers = statistics.statusDistribution.find(s => s._id === 'On Leave')?.count || 0;
  const totalSubjects = statistics.subjectDistribution.length;

  const filteredTeachers = teachers;

  return (
    <Layout>
      <div className="pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              Teacher Management
            </h1>
            <p className="text-muted-foreground">Manage teaching staff and their assignments</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="gap-2" 
              onClick={() => navigate('/teacher-management/deleted')}
            >
              <UserX className="h-4 w-4" />
              Deleted Teachers
            </Button>
            <Button className="gap-2" onClick={() => navigate('/teacher-management/add')}>
              <Plus className="h-4 w-4" />
              Add New Teacher
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.totalActive}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {activeTeachers}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {onLeaveTeachers}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalSubjects}
              </div>
            </CardContent>
          </Card>
          <Card 
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => navigate('/teacher-management/deleted')}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Deleted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {statistics.deletedTeachers}
              </div>
              <p className="text-xs text-muted-foreground">Click to view</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Teachers</CardTitle>
            <CardDescription>View and manage teacher information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
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
              <Button variant="outline" onClick={fetchTeachers} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExport('excel')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export as Excel (.xls)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('csv')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export as CSV (.csv)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Teacher ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Qualification</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                        Loading teachers...
                      </TableCell>
                    </TableRow>
                  ) : filteredTeachers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        No teachers found. Try adjusting your search or filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTeachers.map((teacher) => (
                      <TableRow key={teacher._id}>
                        <TableCell>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={teacher.photo?.url} alt={teacher.name} />
                            <AvatarFallback>{getInitials(teacher.name)}</AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{teacher.teacherId}</TableCell>
                        <TableCell className="font-medium">{teacher.name}</TableCell>
                        <TableCell>{teacher.subject}</TableCell>
                        <TableCell>{teacher.qualification || '-'}</TableCell>
                        <TableCell>{teacher.experience || '-'}</TableCell>
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
                          <Badge variant={getStatusBadgeVariant(teacher.status)}>
                            {teacher.status === 'Active' && '🟢 '}
                            {teacher.status === 'On Leave' && '🟠 '}
                            {teacher.status === 'Inactive' && '🔴 '}
                            {teacher.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="View"
                              onClick={() => navigate(`/teacher-management/view/${teacher._id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Edit"
                              onClick={() => navigate(`/teacher-management/edit/${teacher._id}`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" title="Delete">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Teacher</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete <strong>{teacher.name}</strong>? This will move them to the deleted teachers list and they can be restored later.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDeleteTeacher(teacher._id, teacher.name)}
                                    className="bg-destructive hover:bg-destructive/90"
                                  >
                                    Delete
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
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TeacherManagement;

