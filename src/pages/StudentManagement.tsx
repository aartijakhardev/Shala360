import { useState } from 'react';
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
import { Users, Search, Plus, Edit, Trash2, Eye } from 'lucide-react';

const StudentManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const students = [
    { id: 'STU001', name: 'John Smith', class: '10-A', rollNo: '001', phone: '+91 98765 43210', status: 'Active', fees: 'Paid' },
    { id: 'STU002', name: 'Emma Johnson', class: '10-A', rollNo: '002', phone: '+91 98765 43211', status: 'Active', fees: 'Pending' },
    { id: 'STU003', name: 'Michael Brown', class: '9-B', rollNo: '015', phone: '+91 98765 43212', status: 'Active', fees: 'Paid' },
    { id: 'STU004', name: 'Sophia Davis', class: '10-B', rollNo: '008', phone: '+91 98765 43213', status: 'Active', fees: 'Paid' },
    { id: 'STU005', name: 'William Wilson', class: '9-A', rollNo: '012', phone: '+91 98765 43214', status: 'Inactive', fees: 'Overdue' },
    { id: 'STU006', name: 'Olivia Martinez', class: '10-A', rollNo: '003', phone: '+91 98765 43215', status: 'Active', fees: 'Paid' },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <CardTitle>All Students</CardTitle>
            <CardDescription>View and manage student information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or class..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Export</Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fee Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{student.phone}</TableCell>
                      <TableCell>
                        <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            student.fees === 'Paid' ? 'default' : 
                            student.fees === 'Pending' ? 'secondary' : 
                            'destructive'
                          }
                        >
                          {student.fees}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="View Profile"
                            onClick={() => navigate(`/student-profile/${student.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Delete">
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
                Showing {filteredStudents.length} of {students.length} students
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentManagement;

