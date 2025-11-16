import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Award, TrendingUp, BookOpen, Calendar, FileText } from 'lucide-react';

const ChildPerformance = () => {
  const childInfo = {
    name: 'John Smith',
    class: '10-A',
    rollNo: '001',
    admissionNo: 'STU001',
  };

  const subjects = [
    { name: 'Mathematics', marks: 90, totalMarks: 100, grade: 'A+', teacher: 'Dr. Sarah Johnson', progress: 90 },
    { name: 'Physics', marks: 85, totalMarks: 100, grade: 'A', teacher: 'Mr. James Wilson', progress: 85 },
    { name: 'Chemistry', marks: 88, totalMarks: 100, grade: 'A', teacher: 'Mr. Robert Brown', progress: 88 },
    { name: 'English', marks: 82, totalMarks: 100, grade: 'B+', teacher: 'Ms. Emily Davis', progress: 82 },
    { name: 'History', marks: 78, totalMarks: 100, grade: 'B+', teacher: 'Ms. Lisa Anderson', progress: 78 },
  ];

  const recentTests = [
    { subject: 'Mathematics', test: 'Unit Test 3', date: '2024-01-15', marks: 45, total: 50, percentage: 90 },
    { subject: 'Physics', test: 'Mid Term', date: '2024-01-12', marks: 85, total: 100, percentage: 85 },
    { subject: 'Chemistry', test: 'Unit Test 3', date: '2024-01-10', marks: 42, total: 50, percentage: 84 },
  ];

  const attendance = {
    present: 178,
    total: 190,
    percentage: 93.68,
  };

  const overallPercentage = (subjects.reduce((sum, sub) => sum + sub.marks, 0) / subjects.reduce((sum, sub) => sum + sub.totalMarks, 0) * 100).toFixed(2);

  return (
    <Layout>
      <div className="pt-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Award className="h-8 w-8 text-primary" />
            Child's Academic Performance
          </h1>
          <p className="text-muted-foreground">Track your child's progress and achievements</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {childInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">{childInfo.name}</CardTitle>
                <CardDescription className="mt-1">
                  Class: {childInfo.class} | Roll No: {childInfo.rollNo} | Admission No: {childInfo.admissionNo}
                </CardDescription>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                Overall: {overallPercentage}%
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                Overall Grade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{overallPercentage}%</div>
              <Badge variant="default" className="mt-2">Grade A</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{attendance.percentage}%</div>
              <p className="text-sm text-muted-foreground mt-2">
                {attendance.present} / {attendance.total} days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                Class Rank
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">3rd</div>
              <p className="text-sm text-muted-foreground mt-2">
                Out of 35 students
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Performance</CardTitle>
            <CardDescription>Detailed breakdown of all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {subjects.map((subject) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{subject.name}</h3>
                        <Badge variant="secondary">{subject.grade}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Teacher: {subject.teacher}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {subject.marks}/{subject.totalMarks}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {subject.progress}%
                      </p>
                    </div>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Test Results
            </CardTitle>
            <CardDescription>Latest exam and test scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTests.map((test, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{test.subject}</h4>
                      <p className="text-sm text-muted-foreground">{test.test}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {test.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {test.marks}/{test.total}
                    </div>
                    <Badge variant={test.percentage >= 85 ? 'default' : 'secondary'}>
                      {test.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Strength & Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Strengths
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Excellent performance in Mathematics and Chemistry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Consistent improvement in Physics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>Good attendance record (93.68%)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span>Focus more on English grammar and comprehension</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span>History requires more consistent study</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">•</span>
                    <span>Improve participation in class discussions</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ChildPerformance;

