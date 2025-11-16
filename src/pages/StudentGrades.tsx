import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Award, Search, Download, Edit } from 'lucide-react';

const StudentGrades = () => {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedExam, setSelectedExam] = useState('midterm');
  const [searchQuery, setSearchQuery] = useState('');

  const students = [
    { id: 'STU001', rollNo: '001', name: 'John Smith', term1: 85, term2: 88, midterm: 90, total: 263, percentage: 87.67, grade: 'A' },
    { id: 'STU002', rollNo: '002', name: 'Emma Johnson', term1: 92, term2: 90, midterm: 95, total: 277, percentage: 92.33, grade: 'A+' },
    { id: 'STU003', rollNo: '003', name: 'Michael Brown', term1: 78, term2: 80, midterm: 82, total: 240, percentage: 80.00, grade: 'B+' },
    { id: 'STU004', rollNo: '004', name: 'Sophia Davis', term1: 88, term2: 85, midterm: 90, total: 263, percentage: 87.67, grade: 'A' },
    { id: 'STU005', rollNo: '005', name: 'William Wilson', term1: 65, term2: 70, midterm: 68, total: 203, percentage: 67.67, grade: 'C' },
    { id: 'STU006', rollNo: '006', name: 'Olivia Martinez', term1: 95, term2: 93, midterm: 97, total: 285, percentage: 95.00, grade: 'A+' },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.includes(searchQuery)
  );

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'default';
    if (grade === 'B+' || grade === 'B') return 'secondary';
    return 'destructive';
  };

  const classAverage = (students.reduce((sum, s) => sum + s.percentage, 0) / students.length).toFixed(2);

  return (
    <Layout>
      <div className="pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Award className="h-8 w-8 text-primary" />
              Student Grades & Performance
            </h1>
            <p className="text-muted-foreground">Manage and track student academic performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button className="gap-2">
              <Edit className="h-4 w-4" />
              Enter Grades
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Class Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classAverage}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95.00%</div>
              <p className="text-xs text-muted-foreground mt-1">Olivia Martinez</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Passing Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">100%</div>
              <p className="text-xs text-muted-foreground mt-1">All students passed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Grade A+ Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.filter(s => s.grade === 'A+').length}</div>
              <p className="text-xs text-muted-foreground mt-1">Out of {students.length} students</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Grade Book</CardTitle>
            <CardDescription>View and manage student grades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10-A">Class 10-A</SelectItem>
                  <SelectItem value="10-B">Class 10-B</SelectItem>
                  <SelectItem value="9-A">Class 9-A</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="term1">Term 1</SelectItem>
                  <SelectItem value="term2">Term 2</SelectItem>
                  <SelectItem value="midterm">Mid Term</SelectItem>
                  <SelectItem value="final">Final</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search student by name or roll number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="text-center">Term 1</TableHead>
                    <TableHead className="text-center">Term 2</TableHead>
                    <TableHead className="text-center">Mid Term</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center">Percentage</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.rollNo}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="text-center">{student.term1}</TableCell>
                      <TableCell className="text-center">{student.term2}</TableCell>
                      <TableCell className="text-center font-semibold">{student.midterm}</TableCell>
                      <TableCell className="text-center">{student.total}</TableCell>
                      <TableCell className="text-center font-semibold">
                        {student.percentage}%
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={getGradeColor(student.grade)}>
                          {student.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Grading Scale</h3>
              <div className="grid grid-cols-6 gap-4 text-sm">
                <div><Badge variant="default">A+</Badge> <span className="text-muted-foreground ml-2">90-100%</span></div>
                <div><Badge variant="default">A</Badge> <span className="text-muted-foreground ml-2">80-89%</span></div>
                <div><Badge variant="secondary">B+</Badge> <span className="text-muted-foreground ml-2">70-79%</span></div>
                <div><Badge variant="secondary">B</Badge> <span className="text-muted-foreground ml-2">60-69%</span></div>
                <div><Badge variant="destructive">C</Badge> <span className="text-muted-foreground ml-2">50-59%</span></div>
                <div><Badge variant="destructive">F</Badge> <span className="text-muted-foreground ml-2">Below 50%</span></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentGrades;

