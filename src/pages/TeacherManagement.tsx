import { useState } from 'react';
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
import { GraduationCap, Search, Plus, Edit, Trash2, Eye, Mail, Phone } from 'lucide-react';

const TeacherManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const teachers = [
    { id: 'TCH001', name: 'Dr. Sarah Johnson', subject: 'Mathematics', qualification: 'Ph.D', experience: '15 years', email: 'sarah.j@school.com', phone: '+91 98765 11111', status: 'Active' },
    { id: 'TCH002', name: 'Mr. James Wilson', subject: 'Physics', qualification: 'M.Sc', experience: '10 years', email: 'james.w@school.com', phone: '+91 98765 22222', status: 'Active' },
    { id: 'TCH003', name: 'Ms. Emily Davis', subject: 'English', qualification: 'M.A', experience: '8 years', email: 'emily.d@school.com', phone: '+91 98765 33333', status: 'Active' },
    { id: 'TCH004', name: 'Mr. Robert Brown', subject: 'Chemistry', qualification: 'M.Sc', experience: '12 years', email: 'robert.b@school.com', phone: '+91 98765 44444', status: 'On Leave' },
    { id: 'TCH005', name: 'Ms. Lisa Anderson', subject: 'History', qualification: 'M.A', experience: '7 years', email: 'lisa.a@school.com', phone: '+91 98765 55555', status: 'Active' },
  ];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Teacher
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {teachers.filter(t => t.status === 'Active').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {teachers.filter(t => t.status === 'On Leave').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(teachers.map(t => t.subject)).size}
              </div>
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
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Export</Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
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
                  {filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell className="font-medium">{teacher.id}</TableCell>
                      <TableCell className="font-medium">{teacher.name}</TableCell>
                      <TableCell>{teacher.subject}</TableCell>
                      <TableCell>{teacher.qualification}</TableCell>
                      <TableCell>{teacher.experience}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {teacher.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {teacher.phone}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={teacher.status === 'Active' ? 'default' : 'secondary'}>
                          {teacher.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="View">
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
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TeacherManagement;

