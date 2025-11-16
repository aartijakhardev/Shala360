import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FileText, Download, TrendingUp, Calendar, Award, BookOpen } from 'lucide-react';

const StudentTestReports = () => {
  const [selectedTerm, setSelectedTerm] = useState('current');

  // Student's own test data
  const studentInfo = {
    name: 'Aarav Sharma',
    class: '10-A',
    rollNo: '001',
    ssrNumber: 'SSR/2025/00001',
  };

  const testResults = [
    {
      id: 1,
      subject: 'Mathematics',
      testName: 'Algebra Unit Test',
      testType: 'Unit Test',
      date: '2024-01-15',
      marksObtained: 25,
      totalMarks: 30,
      percentage: 83.33,
      grade: 'A',
      remarks: 'Good understanding of concepts',
      teacher: 'Dr. Sarah Johnson',
    },
    {
      id: 2,
      subject: 'Physics',
      testName: 'Motion and Force',
      testType: 'Weekly Test',
      date: '2024-01-20',
      marksObtained: 40,
      totalMarks: 50,
      percentage: 80,
      grade: 'A',
      remarks: 'Good problem-solving skills',
      teacher: 'Mr. James Wilson',
    },
    {
      id: 3,
      subject: 'Chemistry',
      testName: 'Chemical Reactions',
      testType: 'Monthly Test',
      date: '2024-01-18',
      marksObtained: 35,
      totalMarks: 50,
      percentage: 70,
      grade: 'B+',
      remarks: 'Needs more practice with equations',
      teacher: 'Mr. Robert Brown',
    },
    {
      id: 4,
      subject: 'English',
      testName: 'Grammar and Composition',
      testType: 'Unit Test',
      date: '2024-01-22',
      marksObtained: 45,
      totalMarks: 50,
      percentage: 90,
      grade: 'A+',
      remarks: 'Excellent writing skills',
      teacher: 'Ms. Emily Davis',
    },
    {
      id: 5,
      subject: 'Biology',
      testName: 'Cell Structure',
      testType: 'Weekly Test',
      date: '2024-01-25',
      marksObtained: 38,
      totalMarks: 40,
      percentage: 95,
      grade: 'A+',
      remarks: 'Outstanding performance',
      teacher: 'Mr. Michael Taylor',
    },
  ];

  const overallAverage = testResults.reduce((sum, test) => sum + test.percentage, 0) / testResults.length;
  const totalMarksObtained = testResults.reduce((sum, test) => sum + test.marksObtained, 0);
  const totalMaxMarks = testResults.reduce((sum, test) => sum + test.totalMarks, 0);

  // Subject-wise performance
  const subjectPerformance = testResults.reduce((acc, test) => {
    if (!acc[test.subject]) {
      acc[test.subject] = {
        subject: test.subject,
        tests: [],
        average: 0,
        totalMarks: 0,
        maxMarks: 0,
      };
    }
    acc[test.subject].tests.push(test);
    acc[test.subject].totalMarks += test.marksObtained;
    acc[test.subject].maxMarks += test.totalMarks;
    acc[test.subject].average = (acc[test.subject].totalMarks / acc[test.subject].maxMarks) * 100;
    return acc;
  }, {} as Record<string, any>);

  const handleDownloadReportCard = () => {
    try {
      toast.success('Report card download started!', {
        description: 'Your report card is being prepared...',
      });
    } catch (error) {
      console.error('Error downloading report card:', error);
      toast.error('Failed to download report card. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="pt-8 space-y-6 max-w-6xl mx-auto">
        {/* Header with Student Info */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20 border-4 border-background">
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                  {studentInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{studentInfo.name}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>Class: {studentInfo.class}</span>
                  <span>•</span>
                  <span>Roll No: {studentInfo.rollNo}</span>
                  <span>•</span>
                  <span>SSR: {studentInfo.ssrNumber}</span>
                </div>
              </div>
              <Button onClick={handleDownloadReportCard} className="gap-2">
                <Download className="h-4 w-4" />
                Download Report Card
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Overall Performance Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                Overall Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                {overallAverage.toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Total Tests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                {testResults.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Total Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {totalMarksObtained}/{totalMaxMarks}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">
                Current Grade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-700 dark:text-orange-300">
                A
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject-wise Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Subject-wise Performance
            </CardTitle>
            <CardDescription>Your performance across different subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.values(subjectPerformance).map((subject: any) => (
                <div key={subject.subject} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{subject.subject}</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{subject.average.toFixed(1)}%</div>
                      <div className="text-sm text-muted-foreground">
                        {subject.totalMarks}/{subject.maxMarks} marks
                      </div>
                    </div>
                  </div>
                  <Progress value={subject.average} className="h-3" />
                  <div className="mt-2 text-sm text-muted-foreground">
                    {subject.tests.length} test(s) completed
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Test Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Test Results
            </CardTitle>
            <CardDescription>Your latest test performances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold">{test.testName}</h4>
                        <Badge variant="outline" className="text-xs">
                          {test.testType}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{test.subject}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {test.date}
                        <span>•</span>
                        <span>{test.teacher}</span>
                      </div>
                      {test.remarks && (
                        <p className="text-sm text-blue-600 mt-2 italic">"{test.remarks}"</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {test.marksObtained}/{test.totalMarks}
                    </div>
                    <div className={`text-sm font-semibold ${
                      test.percentage >= 80 ? 'text-green-600' :
                      test.percentage >= 60 ? 'text-orange-600' :
                      'text-red-600'
                    }`}>
                      {test.percentage.toFixed(1)}%
                    </div>
                    <Badge variant={
                      test.grade === 'A+' || test.grade === 'A' ? 'default' :
                      test.grade === 'B+' || test.grade === 'B' ? 'secondary' :
                      'destructive'
                    } className="mt-1">
                      Grade {test.grade}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-green-600 mb-3">Strengths</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Excellent performance in Biology (95%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Strong in English composition (90%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Consistent performance across subjects</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-orange-600 mb-3">Areas for Improvement</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span>Chemistry equations need more practice (70%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span>Focus on mathematical problem-solving speed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span>Regular revision recommended</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download Actions */}
        <div className="flex justify-center gap-4">
          <Button onClick={handleDownloadReportCard} className="gap-2 bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4" />
            Download Complete Report Card (PDF)
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Print Summary
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default StudentTestReports;
