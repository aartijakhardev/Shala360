import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  CalendarDays, 
  CheckCircle2, 
  XCircle, 
  Send, 
  GraduationCap, 
  Search,
  User,
  TrendingUp,
  History,
  Calendar,
  Download
} from 'lucide-react';

// Dummy teacher data
const dummyTeachers = [
  { id: 1, name: 'Dr. Sarah Johnson', subject: 'Mathematics', empId: 'EMP001', photo: null, phone: '9876543210' },
  { id: 2, name: 'Mr. James Wilson', subject: 'Physics', empId: 'EMP002', photo: null, phone: '9876543211' },
  { id: 3, name: 'Ms. Emily Davis', subject: 'English', empId: 'EMP003', photo: null, phone: '9876543212' },
  { id: 4, name: 'Mr. Robert Brown', subject: 'Chemistry', empId: 'EMP004', photo: null, phone: '9876543213' },
  { id: 5, name: 'Ms. Lisa Anderson', subject: 'History', empId: 'EMP005', photo: null, phone: '9876543214' },
  { id: 6, name: 'Mr. Michael Taylor', subject: 'Biology', empId: 'EMP006', photo: null, phone: '9876543215' },
  { id: 7, name: 'Dr. Jennifer White', subject: 'Computer Science', empId: 'EMP007', photo: null, phone: '9876543216' },
  { id: 8, name: 'Mr. David Martinez', subject: 'Physical Education', empId: 'EMP008', photo: null, phone: '9876543217' },
  { id: 9, name: 'Ms. Amanda Garcia', subject: 'Art', empId: 'EMP009', photo: null, phone: '9876543218' },
  { id: 10, name: 'Mr. Christopher Lee', subject: 'Music', empId: 'EMP010', photo: null, phone: '9876543219' },
];

// Generate dummy attendance history
const generateAttendanceHistory = () => {
  const history: Record<string, Record<number, boolean>> = {};
  const today = new Date();
  
  // Generate data for last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = date.toISOString().split('T')[0];
    
    history[dateKey] = {};
    dummyTeachers.forEach(teacher => {
      // Random attendance (90% present)
      history[dateKey][teacher.id] = Math.random() > 0.1;
    });
  }
  
  return history;
};

const TeacherAttendanceAdmin = () => {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(String(today.getMonth() + 1));
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedDate] = useState(today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));
  const [searchQuery, setSearchQuery] = useState('');
  const [attendance, setAttendance] = useState<Record<number, boolean>>(
    dummyTeachers.reduce((acc, teacher) => ({ ...acc, [teacher.id]: true }), {})
  );
  const [submitted, setSubmitted] = useState(false);
  const [attendanceHistory] = useState(generateAttendanceHistory());

  const filteredTeachers = dummyTeachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleAttendance = (teacherId: number, teacherName: string) => {
    const newStatus = !attendance[teacherId];
    setAttendance(prev => ({ ...prev, [teacherId]: newStatus }));

    toast.success(
      `${teacherName} marked ${newStatus ? 'Present' : 'Absent'}`,
      {
        icon: newStatus ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />,
        duration: 2000,
      }
    );
  };

  const handleSubmitAttendance = () => {
    const presentCount = Object.values(attendance).filter(Boolean).length;
    const absentCount = dummyTeachers.length - presentCount;

    toast.success(
      `Teacher Attendance submitted successfully! 🎉`,
      {
        description: `Present: ${presentCount} | Absent: ${absentCount}`,
        duration: 4000,
      }
    );
    setSubmitted(true);
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const absentCount = dummyTeachers.length - presentCount;
  const attendancePercentage = ((presentCount / dummyTeachers.length) * 100).toFixed(1);

  // Calculate monthly statistics
  const getMonthlyStats = () => {
    const monthKey = `${selectedYear}-${selectedMonth.padStart(2, '0')}`;
    const daysInMonth = new Date(Number(selectedYear), Number(selectedMonth), 0).getDate();
    
    const stats = dummyTeachers.map(teacher => {
      let presentDays = 0;
      let totalDays = 0;
      
      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${selectedYear}-${selectedMonth.padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (attendanceHistory[dateKey]) {
          totalDays++;
          if (attendanceHistory[dateKey][teacher.id]) {
            presentDays++;
          }
        }
      }
      
      return {
        ...teacher,
        presentDays,
        totalDays,
        percentage: totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : '0',
      };
    });
    
    return stats;
  };

  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const years = ['2025', '2024', '2023', '2022', '2021', '2020'];

  return (
    <Layout>
      <div className="pt-8 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              Teacher Attendance
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Track and manage teacher attendance records
            </p>
          </div>
        </div>

        {/* Tabs for Mark Attendance and View Records */}
        <Tabs defaultValue="mark" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="mark" className="gap-2">
              <Calendar className="h-4 w-4" />
              Mark Today
            </TabsTrigger>
            <TabsTrigger value="records" className="gap-2">
              <History className="h-4 w-4" />
              View Records
            </TabsTrigger>
          </TabsList>

          {/* Mark Attendance Tab */}
          <TabsContent value="mark" className="space-y-4 mt-4">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  {selectedDate}
                </CardTitle>
                <CardDescription>Mark today's attendance for teaching staff</CardDescription>
              </CardHeader>
            </Card>

            {/* Statistics Cards */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <GraduationCap className="h-4 w-4" />
                Total Teachers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-300">
                {dummyTeachers.length}
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
            <CardTitle className="text-lg sm:text-xl">Teaching Staff</CardTitle>
            <CardDescription>Mark attendance for each teacher by toggling the switch</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, employee ID, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Teacher Cards Grid */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTeachers.map((teacher) => (
                <Card 
                  key={teacher.id} 
                  className={`transition-all duration-300 hover:shadow-md ${
                    attendance[teacher.id] 
                      ? 'border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-950/20' 
                      : 'border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-950/20'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center gap-3">
                      {/* Teacher Avatar */}
                      <Avatar className="h-16 w-16 border-4 border-background shadow-sm">
                        <AvatarImage src={teacher.photo || undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-lg">
                          {teacher.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>

                      {/* Teacher Info */}
                      <div className="w-full">
                        <h3 className="font-semibold text-sm sm:text-base break-words">
                          {teacher.name}
                        </h3>
                        <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                          <div>{teacher.subject}</div>
                          <div>ID: {teacher.empId}</div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <Badge 
                        variant={attendance[teacher.id] ? 'default' : 'destructive'}
                        className="text-xs w-full justify-center"
                      >
                        {attendance[teacher.id] ? (
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
                          checked={attendance[teacher.id]}
                          onCheckedChange={() => 
                            handleToggleAttendance(teacher.id, teacher.name)
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
            {filteredTeachers.length === 0 && (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No teachers found</h3>
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
                  setAttendance(dummyTeachers.reduce((acc, teacher) => ({ ...acc, [teacher.id]: true }), {}));
                  toast.info('All teachers marked Present');
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
          </TabsContent>

          {/* View Records Tab */}
          <TabsContent value="records" className="space-y-4 mt-4">
            {/* Month/Year Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Attendance Records
                </CardTitle>
                <CardDescription>View teacher attendance history by month and year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Select Month</label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map(month => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Select Year</label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Monthly Attendance Table */}
                <div className="rounded-md border overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="p-3 text-left font-semibold">Teacher</th>
                        <th className="p-3 text-left font-semibold">Subject</th>
                        <th className="p-3 text-left font-semibold">Emp ID</th>
                        <th className="p-3 text-center font-semibold">Present Days</th>
                        <th className="p-3 text-center font-semibold">Total Days</th>
                        <th className="p-3 text-center font-semibold">Attendance %</th>
                        <th className="p-3 text-center font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getMonthlyStats().map((teacher, index) => (
                        <tr key={teacher.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                                  {teacher.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{teacher.name}</span>
                            </div>
                          </td>
                          <td className="p-3 text-muted-foreground">{teacher.subject}</td>
                          <td className="p-3 text-muted-foreground">{teacher.empId}</td>
                          <td className="p-3 text-center font-semibold text-green-600">{teacher.presentDays}</td>
                          <td className="p-3 text-center">{teacher.totalDays}</td>
                          <td className="p-3 text-center">
                            <span className={`font-bold ${
                              Number(teacher.percentage) >= 90 ? 'text-green-600' :
                              Number(teacher.percentage) >= 75 ? 'text-orange-600' :
                              'text-red-600'
                            }`}>
                              {teacher.percentage}%
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <Badge variant={
                              Number(teacher.percentage) >= 90 ? 'default' :
                              Number(teacher.percentage) >= 75 ? 'secondary' :
                              'destructive'
                            }>
                              {Number(teacher.percentage) >= 90 ? 'Excellent' :
                               Number(teacher.percentage) >= 75 ? 'Good' :
                               'Poor'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TeacherAttendanceAdmin;

