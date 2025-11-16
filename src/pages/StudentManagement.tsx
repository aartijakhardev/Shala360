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
import { Users, Search, Edit, Trash2, Eye, Loader2, RefreshCw } from 'lucide-react';
import { studentAPI } from '@/lib/api';
import { toast } from 'sonner';

interface Student {
  _id: string;
  studentName: string;
  applicationNumber: string;
  admission: {
    class: string;
    rollNumber?: string;
    academicYear: string;
  };
  father: {
    phone: string;
  };
  applicationStatus: string;
  createdAt: string;
}

const StudentManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchStudents = async (currentPage?: number ) => {
    try {
      setLoading(true);
      const response = await studentAPI.getAll({
        page:currentPage||page,
        limit,
        search: searchQuery || undefined,
      });

      if (response.success) {
        setStudents(response.data.students);
        setTotal(response.data.pagination.total);
        setTotalPages(response.data.pagination.pages);
      }
    } catch (error: any) {
      console.error('Failed to fetch students:', error);
      toast.error('Failed to load students', {
        description: error.response?.data?.message || 'Please try again later',
      });
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
        setPage(1);
        fetchStudents(1);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    try {
      await studentAPI.delete(id);
      toast.success('Student deleted successfully');
      fetchStudents();
    } catch (error: any) {
      console.error('Failed to delete student:', error);
      toast.error('Failed to delete student', {
        description: error.response?.data?.message || 'Please try again',
      });
    }
  };

  return (
    <Layout>
      <div className="pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              Student Management
            </h1>
            <p className="text-muted-foreground">Manage all student records and information</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Students</CardTitle>
                <CardDescription>View and manage student information</CardDescription>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={()=>fetchStudents()}
                disabled={loading}
                title="Refresh"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, application number, or class..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Export</Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No students found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery ? 'Try adjusting your search query' : 'No approved students yet'}
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Application No.</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Roll No</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Academic Year</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student._id}>
                          <TableCell className="font-medium">
                            {student.applicationNumber}
                          </TableCell>
                          <TableCell>{student.studentName}</TableCell>
                          <TableCell>{student.admission.class}</TableCell>
                          <TableCell>
                            {student.admission.rollNumber || '-'}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {student.father.phone}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                student.applicationStatus === 'approved' ? 'default' : 
                                student.applicationStatus === 'pending' ? 'secondary' :
                                student.applicationStatus === 'rejected' ? 'destructive' :
                                'secondary'
                              }
                            >
                              {student.applicationStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {student.admission.academicYear}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="View Profile"
                                onClick={() => navigate(`/student-profile/${student._id}`)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="Edit"
                                onClick={() => toast.info('Edit feature coming soon')}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="Delete"
                                onClick={() => handleDelete(student._id, student.studentName)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {students.length} of {total} students
                    {searchQuery && ` (filtered)`}
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {setPage(p => Math.max(1, p - 1)); fetchStudents(page-1);}}
                      disabled={page === 1 || loading}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-2 px-3">
                      <span className="text-sm">
                        Page {page} of {totalPages}
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() =>{ setPage(p => Math.min(totalPages, p + 1)); fetchStudents(page+1)}}
                      disabled={page === totalPages || loading}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentManagement;

