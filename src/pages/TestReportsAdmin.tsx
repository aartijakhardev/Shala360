import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText, Download, Search, Filter, TrendingUp } from 'lucide-react';

const TestReportsAdmin = () => {
  const [filters, setFilters] = useState({
    studentName: '',
    class: '',
    subject: '',
    startDate: '',
    endDate: '',
    testType: '',
  });

  // Dummy test reports data
  const testReports = [
    {
      id: 1,
      studentName: 'Aarav Sharma',
      rollNo: '001',
      class: '10-A',
      subject: 'Mathematics',
      testName: 'Algebra Unit Test',
      testType: 'Unit Test',
      testDate: '2024-01-15',
      marksObtained: 25,
      totalMarks: 30,
      percentage: 83.33,
      grade: 'A',
      remarks: 'Good understanding of concepts',
      teacher: 'Dr. Sarah Johnson',
    },
    {
      id: 2,
      studentName: 'Diya Patel',
      rollNo: '002',
      class: '10-A',
      subject: 'Mathematics',
      testName: 'Algebra Unit Test',
      testType: 'Unit Test',
      testDate: '2024-01-15',
      marksObtained: 28,
      totalMarks: 30,
      percentage: 93.33,
      grade: 'A+',
      remarks: 'Excellent work',
      teacher: 'Dr. Sarah Johnson',
    },
    {
      id: 3,
      studentName: 'Aarav Sharma',
      rollNo: '001',
      class: '10-A',
      subject: 'Physics',
      testName: 'Motion and Force',
      testType: 'Weekly Test',
      testDate: '2024-01-20',
      marksObtained: 40,
      totalMarks: 50,
      percentage: 80,
      grade: 'A',
      remarks: 'Good problem-solving skills',
      teacher: 'Mr. James Wilson',
    },
    {
      id: 4,
      studentName: 'Arjun Kumar',
      rollNo: '003',
      class: '10-A',
      subject: 'Chemistry',
      testName: 'Chemical Reactions',
      testType: 'Monthly Test',
      testDate: '2024-01-18',
      marksObtained: 35,
      totalMarks: 50,
      percentage: 70,
      grade: 'B+',
      remarks: 'Needs more practice with equations',
      teacher: 'Mr. Robert Brown',
    },
    {
      id: 5,
      studentName: 'Ananya Singh',
      rollNo: '004',
      class: '10-A',
      subject: 'English',
      testName: 'Grammar and Composition',
      testType: 'Unit Test',
      testDate: '2024-01-22',
      marksObtained: 45,
      totalMarks: 50,
      percentage: 90,
      grade: 'A+',
      remarks: 'Excellent writing skills',
      teacher: 'Ms. Emily Davis',
    },
    {
      id: 6,
      studentName: 'Vihaan Gupta',
      rollNo: '005',
      class: '10-A',
      subject: 'Biology',
      testName: 'Cell Structure',
      testType: 'Weekly Test',
      testDate: '2024-01-25',
      marksObtained: 38,
      totalMarks: 40,
      percentage: 95,
      grade: 'A+',
      remarks: 'Outstanding performance',
      teacher: 'Mr. Michael Taylor',
    },
    {
      id: 7,
      studentName: 'Isha Reddy',
      rollNo: '006',
      class: '10-A',
      subject: 'Hindi',
      testName: 'Literature Analysis',
      testType: 'Monthly Test',
      testDate: '2024-01-28',
      marksObtained: 42,
      totalMarks: 50,
      percentage: 84,
      grade: 'A',
      remarks: 'Good interpretation skills',
      teacher: 'Ms. Priya Sharma',
    },
  ];

  const filteredReports = testReports.filter(report => {
    const matchesStudent = !filters.studentName || 
      report.studentName.toLowerCase().includes(filters.studentName.toLowerCase()) ||
      report.rollNo.includes(filters.studentName);
    const matchesClass = !filters.class || report.class === filters.class;
    const matchesSubject = !filters.subject || report.subject === filters.subject;
    const matchesTestType = !filters.testType || report.testType === filters.testType;
    
    let matchesDateRange = true;
    if (filters.startDate && filters.endDate) {
      const testDate = new Date(report.testDate);
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);
      matchesDateRange = testDate >= startDate && testDate <= endDate;
    }

    return matchesStudent && matchesClass && matchesSubject && matchesTestType && matchesDateRange;
  });

  const totalTests = filteredReports.length;
  const averageScore = totalTests > 0 ? (filteredReports.reduce((sum, report) => sum + report.percentage, 0) / totalTests) : 0;
  const highScorers = filteredReports.filter(report => report.percentage >= 80).length;
  const subjectsCount = new Set(testReports.map(r => r.subject)).size;

  return (
    <Layout>
      <div className="pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              Test Reports (Admin)
            </h1>
            <p className="text-muted-foreground">View and analyze all test reports across classes</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export All Reports
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTests}</div>
              <p className="text-xs text-muted-foreground mt-1">
                From {testReports.length} total reports
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                High Scorers (≥80%)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {highScorers}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalTests > 0 ? ((highScorers / totalTests) * 100).toFixed(0) : 0}% of students
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {averageScore.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all tests
              </p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Subjects Covered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {subjectsCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Different subjects
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Reports
            </CardTitle>
            <CardDescription>
              Filter test reports by student, class, subject, date range, or test type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="space-y-2">
                <Label>Student Name/Roll</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-10"
                    value={filters.studentName}
                    onChange={(e) => setFilters({ ...filters, studentName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Class</Label>
                <Select value={filters.class || "all"} onValueChange={(value) => setFilters({ ...filters, class: value === "all" ? "" : value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="6-A">6-A</SelectItem>
                    <SelectItem value="6-B">6-B</SelectItem>
                    <SelectItem value="7-A">7-A</SelectItem>
                    <SelectItem value="7-B">7-B</SelectItem>
                    <SelectItem value="8-A">8-A</SelectItem>
                    <SelectItem value="8-B">8-B</SelectItem>
                    <SelectItem value="9-A">9-A</SelectItem>
                    <SelectItem value="9-B">9-B</SelectItem>
                    <SelectItem value="10-A">10-A</SelectItem>
                    <SelectItem value="10-B">10-B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={filters.subject || "all"} onValueChange={(value) => setFilters({ ...filters, subject: value === "all" ? "" : value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Test Type</Label>
                <Select value={filters.testType || "all"} onValueChange={(value) => setFilters({ ...filters, testType: value === "all" ? "" : value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Weekly Test">Weekly Test</SelectItem>
                    <SelectItem value="Unit Test">Unit Test</SelectItem>
                    <SelectItem value="Monthly Test">Monthly Test</SelectItem>
                    <SelectItem value="Half-Yearly Exam">Half-Yearly</SelectItem>
                    <SelectItem value="Final Exam">Final Exam</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setFilters({
                  studentName: '',
                  class: '',
                  subject: '',
                  startDate: '',
                  endDate: '',
                  testType: '',
                })}
              >
                Clear All Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Test Reports</CardTitle>
            <CardDescription>
              Showing {filteredReports.length} of {testReports.length} reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="text-sm">{report.testDate}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{report.studentName}</p>
                          <p className="text-xs text-muted-foreground">Roll: {report.rollNo}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{report.class}</TableCell>
                      <TableCell className="font-medium">{report.subject}</TableCell>
                      <TableCell className="text-sm">{report.testName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {report.testType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="text-sm">
                          <span className="font-bold">{report.marksObtained}/{report.totalMarks}</span>
                          <div className={`text-xs ${
                            report.percentage >= 80 ? 'text-green-600' :
                            report.percentage >= 60 ? 'text-orange-600' :
                            'text-red-600'
                          }`}>
                            {report.percentage.toFixed(1)}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={
                          report.grade === 'A+' || report.grade === 'A' ? 'default' :
                          report.grade === 'B+' || report.grade === 'B' ? 'secondary' :
                          'destructive'
                        }>
                          {report.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{report.teacher}</TableCell>
                      <TableCell className="text-sm max-w-xs truncate">{report.remarks}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No reports found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Student Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Student Performance Overview
            </CardTitle>
            <CardDescription>Summary of individual student performance across all tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead className="text-center">Total Tests</TableHead>
                    <TableHead className="text-center">Average Score</TableHead>
                    <TableHead className="text-center">Highest Score</TableHead>
                    <TableHead className="text-center">Lowest Score</TableHead>
                    <TableHead className="text-center">Overall Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: 'Aarav Sharma',
                      rollNo: '001',
                      class: '10-A',
                      totalTests: 2,
                      averageScore: 81.67,
                      highestScore: 83.33,
                      lowestScore: 80,
                      overallGrade: 'A',
                    },
                    {
                      name: 'Diya Patel',
                      rollNo: '002',
                      class: '10-A',
                      totalTests: 1,
                      averageScore: 93.33,
                      highestScore: 93.33,
                      lowestScore: 93.33,
                      overallGrade: 'A+',
                    },
                    {
                      name: 'Arjun Kumar',
                      rollNo: '003',
                      class: '10-A',
                      totalTests: 1,
                      averageScore: 70,
                      highestScore: 70,
                      lowestScore: 70,
                      overallGrade: 'B+',
                    },
                    {
                      name: 'Ananya Singh',
                      rollNo: '004',
                      class: '10-A',
                      totalTests: 1,
                      averageScore: 90,
                      highestScore: 90,
                      lowestScore: 90,
                      overallGrade: 'A+',
                    },
                    {
                      name: 'Vihaan Gupta',
                      rollNo: '005',
                      class: '10-A',
                      totalTests: 1,
                      averageScore: 95,
                      highestScore: 95,
                      lowestScore: 95,
                      overallGrade: 'A+',
                    },
                  ].map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">Roll: {student.rollNo}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{student.class}</TableCell>
                      <TableCell className="text-center">{student.totalTests}</TableCell>
                      <TableCell className="text-center">
                        <span className={`font-bold ${
                          student.averageScore >= 80 ? 'text-green-600' :
                          student.averageScore >= 60 ? 'text-orange-600' :
                          'text-red-600'
                        }`}>
                          {student.averageScore.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-center font-semibold text-green-600">
                        {student.highestScore.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-center font-semibold text-red-600">
                        {student.lowestScore.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={
                          student.overallGrade === 'A+' || student.overallGrade === 'A' ? 'default' :
                          student.overallGrade === 'B+' || student.overallGrade === 'B' ? 'secondary' :
                          'destructive'
                        }>
                          {student.overallGrade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Report Card
                        </Button>
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

export default TestReportsAdmin;