import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { FileText, Plus, Save, Users } from 'lucide-react';

const CreateTestReport = () => {
  const [testDetails, setTestDetails] = useState({
    subject: '',
    class: '',
    testType: '',
    testDate: '',
    totalMarks: '',
    testName: '',
  });

  const [studentMarks, setStudentMarks] = useState<Record<string, { marks: string; remarks: string }>>({});

  // Dummy student data for Class 10-A
  const students = [
    { id: 'STU001', name: 'Aarav Sharma', rollNo: '001' },
    { id: 'STU002', name: 'Diya Patel', rollNo: '002' },
    { id: 'STU003', name: 'Arjun Kumar', rollNo: '003' },
    { id: 'STU004', name: 'Ananya Singh', rollNo: '004' },
    { id: 'STU005', name: 'Vihaan Gupta', rollNo: '005' },
    { id: 'STU006', name: 'Isha Reddy', rollNo: '006' },
    { id: 'STU007', name: 'Aditya Mehta', rollNo: '007' },
    { id: 'STU008', name: 'Saanvi Joshi', rollNo: '008' },
    { id: 'STU009', name: 'Reyansh Verma', rollNo: '009' },
    { id: 'STU010', name: 'Myra Kapoor', rollNo: '010' },
  ];

  const updateStudentMarks = (studentId: string, field: 'marks' | 'remarks', value: string) => {
    setStudentMarks(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      }
    }));
  };

  const calculateGrade = (marks: number, total: number) => {
    const percentage = (marks / total) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    return 'F';
  };

  const handleSubmit = () => {
    try {
      if (!testDetails.subject || !testDetails.class || !testDetails.testType || !testDetails.totalMarks) {
        toast.error('Please fill in all test details');
        return;
      }

      const enteredMarksCount = Object.values(studentMarks).filter(mark => mark?.marks).length;
      if (enteredMarksCount === 0) {
        toast.error('Please enter marks for at least one student');
        return;
      }

      // Save to localStorage for demo
      const testReport = {
        id: Date.now(),
        ...testDetails,
        studentMarks,
        createdAt: new Date().toISOString(),
        createdBy: 'Dr. Sarah Johnson',
      };

      const existingReports = JSON.parse(localStorage.getItem('testReports') || '[]');
      existingReports.push(testReport);
      localStorage.setItem('testReports', JSON.stringify(existingReports));

      toast.success('Test report created successfully! 🎉', {
        description: `Marks entered for ${enteredMarksCount} students`,
        duration: 4000,
      });

      // Reset form
      setTestDetails({
        subject: '',
        class: '',
        testType: '',
        testDate: '',
        totalMarks: '',
        testName: '',
      });
      setStudentMarks({});
    } catch (error) {
      console.error('Error submitting test report:', error);
      toast.error('Failed to create test report. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="pt-8 space-y-6 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Plus className="h-8 w-8 text-primary" />
            Create Test Report
          </h1>
          <p className="text-muted-foreground">Enter marks for offline tests and exams</p>
        </div>

        {/* Test Details */}
        <Card>
          <CardHeader>
            <CardTitle>Test Information</CardTitle>
            <CardDescription>Enter basic test details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="testName">Test Name *</Label>
                <Input
                  id="testName"
                  placeholder="e.g., Algebra Unit Test"
                  value={testDetails.testName}
                  onChange={(e) => setTestDetails({ ...testDetails, testName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Select value={testDetails.subject} onValueChange={(value) => setTestDetails({ ...testDetails, subject: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'Social Science'].map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="class">Class *</Label>
                <Select value={testDetails.class} onValueChange={(value) => setTestDetails({ ...testDetails, class: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {['6-A', '6-B', '7-A', '7-B', '8-A', '8-B', '9-A', '9-B', '10-A', '10-B'].map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="testType">Test Type *</Label>
                <Select value={testDetails.testType} onValueChange={(value) => setTestDetails({ ...testDetails, testType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Weekly Test">Weekly Test</SelectItem>
                    <SelectItem value="Unit Test">Unit Test</SelectItem>
                    <SelectItem value="Monthly Test">Monthly Test</SelectItem>
                    <SelectItem value="Half-Yearly Exam">Half-Yearly Exam</SelectItem>
                    <SelectItem value="Final Exam">Final Exam</SelectItem>
                    <SelectItem value="Class Test">Class Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="testDate">Test Date *</Label>
                <Input
                  id="testDate"
                  type="date"
                  value={testDetails.testDate}
                  onChange={(e) => setTestDetails({ ...testDetails, testDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalMarks">Total Marks *</Label>
                <Input
                  id="totalMarks"
                  type="number"
                  placeholder="50"
                  value={testDetails.totalMarks}
                  onChange={(e) => setTestDetails({ ...testDetails, totalMarks: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Marks Entry */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Enter Student Marks
            </CardTitle>
            <CardDescription>
              Enter marks for each student (Class {testDetails.class || 'Not Selected'})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="text-center">Marks Obtained</TableHead>
                    <TableHead className="text-center">Total Marks</TableHead>
                    <TableHead className="text-center">Percentage</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                    <TableHead>Remarks (Optional)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => {
                    const marks = parseFloat(studentMarks[student.id]?.marks || '0');
                    const total = parseFloat(testDetails.totalMarks || '0');
                    const percentage = total > 0 ? ((marks / total) * 100).toFixed(1) : '0';
                    const grade = total > 0 && marks > 0 ? calculateGrade(marks, total) : '-';

                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.rollNo}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell className="text-center">
                          <Input
                            type="number"
                            placeholder="0"
                            className="w-20 text-center"
                            min="0"
                            max={testDetails.totalMarks}
                            value={studentMarks[student.id]?.marks || ''}
                            onChange={(e) => updateStudentMarks(student.id, 'marks', e.target.value)}
                          />
                        </TableCell>
                        <TableCell className="text-center font-semibold">
                          {testDetails.totalMarks || '-'}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`font-semibold ${
                            parseFloat(percentage) >= 80 ? 'text-green-600' :
                            parseFloat(percentage) >= 60 ? 'text-orange-600' :
                            parseFloat(percentage) > 0 ? 'text-red-600' : 'text-muted-foreground'
                          }`}>
                            {percentage}%
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`font-bold ${
                            grade === 'A+' || grade === 'A' ? 'text-green-600' :
                            grade === 'B+' || grade === 'B' ? 'text-orange-600' :
                            grade === 'C' ? 'text-red-600' : 'text-muted-foreground'
                          }`}>
                            {grade}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="Optional remarks..."
                            className="text-sm"
                            value={studentMarks[student.id]?.remarks || ''}
                            onChange={(e) => updateStudentMarks(student.id, 'remarks', e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Marks entered for {Object.values(studentMarks).filter(mark => mark?.marks).length} of {students.length} students
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save as Draft
                </Button>
                <Button onClick={handleSubmit} className="gap-2 bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4" />
                  Submit Test Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateTestReport;
