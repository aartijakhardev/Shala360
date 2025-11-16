import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { GraduationCap, Plus, Save, Calculator } from 'lucide-react';

const CreateExamReport = () => {
  const [examDetails, setExamDetails] = useState({
    examType: '',
    class: '',
    academicYear: '2024-25',
    examMonth: '',
  });

  const [subjectMarks, setSubjectMarks] = useState<Record<string, Record<string, string>>>({});

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'Social Science'];
  
  const students = [
    { id: 'STU001', name: 'Aarav Sharma', rollNo: '001' },
    { id: 'STU002', name: 'Diya Patel', rollNo: '002' },
    { id: 'STU003', name: 'Arjun Kumar', rollNo: '003' },
    { id: 'STU004', name: 'Ananya Singh', rollNo: '004' },
    { id: 'STU005', name: 'Vihaan Gupta', rollNo: '005' },
  ];

  const subjectMaxMarks: Record<string, number> = {
    'Mathematics': 100,
    'Physics': 100,
    'Chemistry': 100,
    'Biology': 100,
    'English': 100,
    'Hindi': 100,
    'Social Science': 100,
  };

  const updateSubjectMarks = (studentId: string, subject: string, marks: string) => {
    setSubjectMarks(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subject]: marks,
      }
    }));
  };

  const calculateStudentTotal = (studentId: string) => {
    const studentSubjects = subjectMarks[studentId] || {};
    const total = Object.values(studentSubjects).reduce((sum, marks) => {
      return sum + (parseFloat(marks) || 0);
    }, 0);
    return total;
  };

  const calculateStudentPercentage = (studentId: string) => {
    const total = calculateStudentTotal(studentId);
    const maxTotal = Object.values(subjectMaxMarks).reduce((sum, max) => sum + max, 0);
    return maxTotal > 0 ? ((total / maxTotal) * 100).toFixed(2) : '0';
  };

  const calculateGrade = (percentage: number) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    return 'F';
  };

  const handleSubmit = () => {
    try {
      if (!examDetails.examType || !examDetails.class) {
        toast.error('Please fill in exam details');
        return;
      }

      const hasMarks = Object.values(subjectMarks).some(studentSubjects => 
        Object.values(studentSubjects).some(marks => marks)
      );

      if (!hasMarks) {
        toast.error('Please enter marks for at least one student');
        return;
      }

      // Save to localStorage
      const examReport = {
        id: Date.now(),
        ...examDetails,
        subjectMarks,
        subjects,
        subjectMaxMarks,
        createdAt: new Date().toISOString(),
        createdBy: 'Admin',
      };

      const existingExamReports = JSON.parse(localStorage.getItem('examReports') || '[]');
      existingExamReports.push(examReport);
      localStorage.setItem('examReports', JSON.stringify(existingExamReports));

      toast.success('Exam report created successfully! 🎉', {
        description: `${examDetails.examType} results saved for Class ${examDetails.class}`,
      });
    } catch (error) {
      console.error('Error submitting exam report:', error);
      toast.error('Failed to create exam report. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="pt-8 space-y-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            Create Exam Report
          </h1>
          <p className="text-muted-foreground">Enter marks for Half-Yearly and Final Examinations</p>
        </div>

        {/* Exam Details */}
        <Card>
          <CardHeader>
            <CardTitle>Exam Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Exam Type *</Label>
                <Select value={examDetails.examType} onValueChange={(value) => setExamDetails({ ...examDetails, examType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Half-Yearly Exam">Half-Yearly Exam</SelectItem>
                    <SelectItem value="Final Exam">Final Exam</SelectItem>
                    <SelectItem value="Pre-Board Exam">Pre-Board Exam</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Class *</Label>
                <Select value={examDetails.class} onValueChange={(value) => setExamDetails({ ...examDetails, class: value })}>
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
                <Label>Academic Year</Label>
                <Select value={examDetails.academicYear} onValueChange={(value) => setExamDetails({ ...examDetails, academicYear: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-25">2024-25</SelectItem>
                    <SelectItem value="2023-24">2023-24</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Exam Month</Label>
                <Select value={examDetails.examMonth} onValueChange={(value) => setExamDetails({ ...examDetails, examMonth: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="September">September</SelectItem>
                    <SelectItem value="October">October</SelectItem>
                    <SelectItem value="March">March</SelectItem>
                    <SelectItem value="April">April</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Marks Entry Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Enter Marks for All Subjects
            </CardTitle>
            <CardDescription>
              Enter marks for each student in all subjects. System will auto-calculate total, percentage, and grade.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Roll</TableHead>
                    <TableHead className="w-48">Student Name</TableHead>
                    {subjects.map(subject => (
                      <TableHead key={subject} className="text-center w-24">
                        {subject}
                        <div className="text-xs text-muted-foreground">
                          (/{subjectMaxMarks[subject]})
                        </div>
                      </TableHead>
                    ))}
                    <TableHead className="text-center w-20">Total</TableHead>
                    <TableHead className="text-center w-20">%</TableHead>
                    <TableHead className="text-center w-16">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => {
                    const total = calculateStudentTotal(student.id);
                    const percentage = parseFloat(calculateStudentPercentage(student.id));
                    const grade = calculateGrade(percentage);

                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.rollNo}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        {subjects.map(subject => (
                          <TableCell key={subject} className="text-center">
                            <Input
                              type="number"
                              className="w-16 text-center text-sm"
                              placeholder="0"
                              min="0"
                              max={subjectMaxMarks[subject]}
                              value={subjectMarks[student.id]?.[subject] || ''}
                              onChange={(e) => updateSubjectMarks(student.id, subject, e.target.value)}
                            />
                          </TableCell>
                        ))}
                        <TableCell className="text-center">
                          <span className="font-bold text-lg">{total}</span>
                          <div className="text-xs text-muted-foreground">
                            /{Object.values(subjectMaxMarks).reduce((sum, max) => sum + max, 0)}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`font-bold ${
                            percentage >= 80 ? 'text-green-600' :
                            percentage >= 60 ? 'text-orange-600' :
                            percentage > 0 ? 'text-red-600' : 'text-muted-foreground'
                          }`}>
                            {percentage}%
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={
                            grade === 'A+' || grade === 'A' ? 'default' :
                            grade === 'B+' || grade === 'B' ? 'secondary' :
                            'destructive'
                          }>
                            {grade}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Auto-calculation: Total marks, percentage, and grades are calculated automatically
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save as Draft
                </Button>
                <Button onClick={handleSubmit} className="gap-2 bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4" />
                  Submit Exam Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateExamReport;
