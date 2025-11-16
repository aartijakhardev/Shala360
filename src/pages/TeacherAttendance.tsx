import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  CalendarDays, 
  CheckCircle2, 
  XCircle, 
  Send, 
  Users, 
  Search,
  Bell,
  User,
  TrendingUp
} from 'lucide-react';

// Dummy student data with realistic names
const dummyStudents = [
  { id: 1, name: 'Aarav Sharma', rollNo: '001', class: '10-A', photo: null, parentPhone: '9999912345' },
  { id: 2, name: 'Diya Patel', rollNo: '002', class: '10-A', photo: null, parentPhone: '9999912346' },
  { id: 3, name: 'Arjun Kumar', rollNo: '003', class: '10-A', photo: null, parentPhone: '9999912347' },
  { id: 4, name: 'Ananya Singh', rollNo: '004', class: '10-A', photo: null, parentPhone: '9999912348' },
  { id: 5, name: 'Vihaan Gupta', rollNo: '005', class: '10-A', photo: null, parentPhone: '9999912349' },
  { id: 6, name: 'Isha Reddy', rollNo: '006', class: '10-A', photo: null, parentPhone: '9999912350' },
  { id: 7, name: 'Aditya Mehta', rollNo: '007', class: '10-A', photo: null, parentPhone: '9999912351' },
  { id: 8, name: 'Saanvi Joshi', rollNo: '008', class: '10-A', photo: null, parentPhone: '9999912352' },
  { id: 9, name: 'Reyansh Verma', rollNo: '009', class: '10-A', photo: null, parentPhone: '9999912353' },
  { id: 10, name: 'Myra Kapoor', rollNo: '010', class: '10-A', photo: null, parentPhone: '9999912354' },
  { id: 11, name: 'Kabir Desai', rollNo: '011', class: '10-A', photo: null, parentPhone: '9999912355' },
  { id: 12, name: 'Navya Iyer', rollNo: '012', class: '10-A', photo: null, parentPhone: '9999912356' },
  { id: 13, name: 'Advait Shah', rollNo: '013', class: '10-A', photo: null, parentPhone: '9999912357' },
  { id: 14, name: 'Kiara Rao', rollNo: '014', class: '10-A', photo: null, parentPhone: '9999912358' },
  { id: 15, name: 'Vivaan Nair', rollNo: '015', class: '10-A', photo: null, parentPhone: '9999912359' },
];

const TeacherAttendance = () => {
  const [selectedDate] = useState(new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));
  const [searchQuery, setSearchQuery] = useState('');
  const [attendance, setAttendance] = useState<Record<number, boolean>>(
    dummyStudents.reduce((acc, student) => ({ ...acc, [student.id]: true }), {})
  );
  const [submitted, setSubmitted] = useState(false);

  const filteredStudents = dummyStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.includes(searchQuery)
  );

  const handleToggleAttendance = (studentId: number, studentName: string, parentPhone: string) => {
    try {
      const newStatus = !attendance[studentId];
      setAttendance(prev => ({ ...prev, [studentId]: newStatus }));

      if (!newStatus) {
        // Student marked absent - show notification toast
        toast.info(
          `📱 Notification sent to parent of ${studentName}`,
          {
            description: `Contact: ${parentPhone}`,
            icon: <Bell className="h-4 w-4" />,
            duration: 3000,
          }
        );
      } else {
        // Student marked present again
        toast.success(`${studentName} marked Present`, {
          icon: <CheckCircle2 className="h-4 w-4" />,
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
      toast.error('Failed to update attendance. Please try again.');
    }
  };

  const handleSubmitAttendance = () => {
    try {
      const presentCount = Object.values(attendance).filter(Boolean).length;
      const absentCount = dummyStudents.length - presentCount;

      toast.success(
        `Attendance for Class 10-A submitted successfully! 🎉`,
        {
          description: `Present: ${presentCount} | Absent: ${absentCount}`,
          duration: 4000,
        }
      );
      setSubmitted(true);
      
      // Reset submitted state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting attendance:', error);
      toast.error('Failed to submit attendance. Please try again.');
    }
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const absentCount = dummyStudents.length - presentCount;
  const attendancePercentage = ((presentCount / dummyStudents.length) * 100).toFixed(1);

  return (
    <Layout>
      <div className="pt-8 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <CalendarDays className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              Student Attendance
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Class 10-A • {selectedDate}
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Users className="h-4 w-4" />
                Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-300">
                {dummyStudents.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2 text-green-700 dark:text-green-300">
                <CheckCircle2 className="h-4 w-4" />
                Present
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-300">
                {presentCount}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2 text-red-700 dark:text-red-300">
                <XCircle className="h-4 w-4" />
                Absent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-red-700 dark:text-red-300">
                {absentCount}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2 text-purple-700 dark:text-purple-300">
                <TrendingUp className="h-4 w-4" />
                Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-purple-700 dark:text-purple-300">
                {attendancePercentage}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Attendance Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Student Attendance</CardTitle>
            <CardDescription>Mark attendance for each student by toggling the switch</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or roll number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Student Cards Grid */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredStudents.map((student) => (
                <Card 
                  key={student.id} 
                  className={`transition-all duration-300 hover:shadow-md ${
                    attendance[student.id] 
                      ? 'border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-950/20' 
                      : 'border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-950/20'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center gap-3">
                      {/* Student Avatar */}
                      <Avatar className="h-16 w-16 border-4 border-background shadow-sm">
                        <AvatarImage src={student.photo || undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold text-lg">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>

                      {/* Student Info */}
                      <div className="w-full">
                        <h3 className="font-semibold text-sm sm:text-base break-words">
                          {student.name}
                        </h3>
                        <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                          <div>Roll: {student.rollNo}</div>
                          <div>Class: {student.class}</div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <Badge 
                        variant={attendance[student.id] ? 'default' : 'destructive'}
                        className="text-xs w-full justify-center"
                      >
                        {attendance[student.id] ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Present
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3 mr-1" />
                            Absent
                          </>
                        )}
                      </Badge>

                      {/* Toggle Switch */}
                      <div className="flex items-center justify-center gap-2 w-full">
                        <span className="text-xs text-muted-foreground">Mark:</span>
                        <Switch
                          checked={attendance[student.id]}
                          onCheckedChange={() => 
                            handleToggleAttendance(student.id, student.name, student.parentPhone)
                          }
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No students found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search query
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setAttendance(dummyStudents.reduce((acc, student) => ({ ...acc, [student.id]: true }), {}));
                  toast.info('All students marked Present');
                }}
                className="w-full sm:w-auto"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark All Present
              </Button>
              
              <Button
                size="lg"
                onClick={handleSubmitAttendance}
                disabled={submitted}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                {submitted ? 'Submitted ✓' : 'Submit Attendance'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TeacherAttendance;
