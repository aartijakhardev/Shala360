import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  FileText, 
  Download, 
  Award,
  GraduationCap,
  Lock,
  Eye
} from 'lucide-react';

const StudentMarksheetView = () => {
  const [selectedExam, setSelectedExam] = useState('half-yearly');
  const [marksheetVisible, setMarksheetVisible] = useState(true); // This would come from admin settings

  // Student data (would be fetched based on logged-in student)
  const studentData = {
    name: 'Aarav Sharma',
    class: '10-A',
    rollNo: '001',
    ssrNumber: 'SSR/2025/00001',
  };

  const examData = {
    'half-yearly': {
      examName: 'Half-Yearly Examination',
      examDate: 'September 2024',
      subjects: {
        'Mathematics': { marks: 85, total: 100, grade: 'A' },
        'Physics': { marks: 78, total: 100, grade: 'B+' },
        'Chemistry': { marks: 82, total: 100, grade: 'A' },
        'Biology': { marks: 88, total: 100, grade: 'A' },
        'English': { marks: 90, total: 100, grade: 'A+' },
        'Hindi': { marks: 75, total: 100, grade: 'B+' },
      }
    },
    'final': {
      examName: 'Final Examination',
      examDate: 'March 2025',
      subjects: {
        'Mathematics': { marks: 88, total: 100, grade: 'A' },
        'Physics': { marks: 85, total: 100, grade: 'A' },
        'Chemistry': { marks: 87, total: 100, grade: 'A' },
        'Biology': { marks: 92, total: 100, grade: 'A+' },
        'English': { marks: 94, total: 100, grade: 'A+' },
        'Hindi': { marks: 80, total: 100, grade: 'A' },
      }
    }
  };

  const selectedExamData = examData[selectedExam as keyof typeof examData];
  
  const totalMarks = Object.values(selectedExamData.subjects).reduce((sum, subject) => sum + subject.marks, 0);
  const totalMaxMarks = Object.values(selectedExamData.subjects).reduce((sum, subject) => sum + subject.total, 0);
  const percentage = ((totalMarks / totalMaxMarks) * 100).toFixed(2);
  const overallGrade = parseFloat(percentage) >= 90 ? 'A+' : parseFloat(percentage) >= 80 ? 'A' : parseFloat(percentage) >= 70 ? 'B+' : 'B';

  const handleDownload = () => {
    toast.success('Marksheet downloaded successfully!', {
      description: `${selectedExamData.examName} marksheet saved to downloads`,
    });
  };

  // Check admin settings (in real app, this would be an API call)
  useEffect(() => {
    try {
      // Simulate checking admin settings
      const adminSettings = localStorage.getItem('marksheetVisibility');
      setMarksheetVisible(adminSettings === 'true' || adminSettings === null);
    } catch (error) {
      console.error('Error checking marksheet visibility settings:', error);
      // Default to visible if there's an error
      setMarksheetVisible(true);
    }
  }, []);

  if (!marksheetVisible) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Lock className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Marksheets Not Available</h3>
              <p className="text-muted-foreground text-center">
                Marksheets are currently not visible to students. Please contact your teacher or admin for access.
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-8 space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Award className="h-8 w-8 text-primary" />
              My Marksheets
            </h1>
            <p className="text-muted-foreground">View and download your examination results</p>
          </div>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download Current
          </Button>
        </div>

        {/* Exam Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Examination</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger className="max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="half-yearly">Half-Yearly Examination - September 2024</SelectItem>
                <SelectItem value="final">Final Examination - March 2025</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Marksheet Display */}
        <Card>
          <CardContent className="p-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-12 w-12" />
                  <div>
                    <h2 className="text-2xl font-bold">EduManage School</h2>
                    <p className="text-sm opacity-90">Academic Excellence Since 1995</p>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-bold">{selectedExamData.examName}</h3>
                  <p className="text-sm opacity-90">{selectedExamData.examDate}</p>
                </div>
              </div>
            </div>

            {/* Student Info */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b">
                <Avatar className="h-20 w-20 border-4 border-primary/20">
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                    {studentData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">{studentData.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Class:</span>
                      <span className="font-semibold ml-2">{studentData.class}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Roll No:</span>
                      <span className="font-semibold ml-2">{studentData.rollNo}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">SSR:</span>
                      <span className="font-semibold ml-2">{studentData.ssrNumber}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Session:</span>
                      <span className="font-semibold ml-2">2024-25</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Marks Table */}
              <div className="space-y-4">
                <h4 className="font-semibold text-xl">Examination Results</h4>
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="p-4 text-left font-semibold">Subject</th>
                        <th className="p-4 text-center font-semibold">Marks Obtained</th>
                        <th className="p-4 text-center font-semibold">Total Marks</th>
                        <th className="p-4 text-center font-semibold">Percentage</th>
                        <th className="p-4 text-center font-semibold">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(selectedExamData.subjects).map(([subject, data], index) => (
                        <tr key={subject} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                          <td className="p-4 font-medium">{subject}</td>
                          <td className="p-4 text-center font-bold text-lg">{data.marks}</td>
                          <td className="p-4 text-center">{data.total}</td>
                          <td className="p-4 text-center font-semibold">
                            {((data.marks / data.total) * 100).toFixed(1)}%
                          </td>
                          <td className="p-4 text-center">
                            <Badge variant={
                              data.grade === 'A+' || data.grade === 'A' ? 'default' :
                              data.grade === 'B+' || data.grade === 'B' ? 'secondary' :
                              'destructive'
                            }>
                              {data.grade}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-primary bg-primary/5">
                        <td className="p-4 font-bold text-xl">GRAND TOTAL</td>
                        <td className="p-4 text-center font-bold text-xl text-primary">{totalMarks}</td>
                        <td className="p-4 text-center font-bold text-xl">{totalMaxMarks}</td>
                        <td className="p-4 text-center font-bold text-xl text-primary">{percentage}%</td>
                        <td className="p-4 text-center">
                          <Badge variant="default" className="text-lg px-4 py-2">
                            {overallGrade}
                          </Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Result Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">Result</h5>
                    <p className="text-2xl font-bold text-green-600">PASS</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Class Rank</h5>
                    <p className="text-2xl font-bold text-blue-600">3rd</p>
                    <p className="text-xs text-muted-foreground">Out of 35 students</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h5 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Attendance</h5>
                    <p className="text-2xl font-bold text-purple-600">93.5%</p>
                    <p className="text-xs text-muted-foreground">178/190 days</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h5 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Overall</h5>
                    <p className="text-2xl font-bold text-orange-600">{percentage}%</p>
                    <p className="text-xs text-muted-foreground">Grade {overallGrade}</p>
                  </div>
                </div>

                {/* Teacher's Comments */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Class Teacher's Remarks</h5>
                  <p className="text-sm">
                    Aarav has shown consistent improvement throughout the term. His performance in Science subjects is commendable. 
                    Needs to focus more on Mathematics problem-solving. Overall, a dedicated and sincere student.
                  </p>
                  <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                    <span>Class Teacher: Dr. Sarah Johnson</span>
                    <span>Date: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Principal's Signature */}
                <div className="mt-6 pt-4 border-t flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    <p>Generated on: {new Date().toLocaleDateString()}</p>
                    <p className="mt-2">Principal's Signature: _________________</p>
                  </div>
                  <div className="text-right">
                    <Button onClick={handleDownload} className="gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Marksheets */}
        <Card>
          <CardHeader>
            <CardTitle>Available Marksheets</CardTitle>
            <CardDescription>All your examination results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(examData).map(([examKey, exam]) => (
                <div 
                  key={examKey} 
                  className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                    selectedExam === examKey ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{exam.examName}</h4>
                      <p className="text-sm text-muted-foreground">{exam.examDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {Object.values(exam.subjects).reduce((sum, s) => sum + s.marks, 0)}/
                        {Object.values(exam.subjects).reduce((sum, s) => sum + s.total, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {(Object.values(exam.subjects).reduce((sum, s) => sum + s.marks, 0) / 
                         Object.values(exam.subjects).reduce((sum, s) => sum + s.total, 0) * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedExam(examKey)}
                        className="gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                      <Button size="sm" className="gap-1">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-green-600 mb-3">Strong Subjects</h4>
                <div className="space-y-2">
                  {Object.entries(selectedExamData.subjects)
                    .filter(([_, data]) => data.marks >= 85)
                    .map(([subject, data]) => (
                      <div key={subject} className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-950/20 rounded">
                        <span className="font-medium">{subject}</span>
                        <Badge variant="default">{data.marks}/100</Badge>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 mb-3">Focus Areas</h4>
                <div className="space-y-2">
                  {Object.entries(selectedExamData.subjects)
                    .filter(([_, data]) => data.marks < 85)
                    .map(([subject, data]) => (
                      <div key={subject} className="flex justify-between items-center p-2 bg-orange-50 dark:bg-orange-950/20 rounded">
                        <span className="font-medium">{subject}</span>
                        <Badge variant="secondary">{data.marks}/100</Badge>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentMarksheetView;
