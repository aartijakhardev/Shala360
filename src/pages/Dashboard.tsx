import { Users, UserCheck, UserPlus, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/StatCard';
import Layout from '@/components/Layout';
import { dashboardStats, monthlyAdmissions, attendanceData, recentAdmissions } from '@/data/dummyData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  // Safe data loading with fallbacks
  const safeStats = dashboardStats || {
    totalStudents: 0,
    totalTeachers: 0,
    pendingAdmissions: 0,
    averageAttendance: 0
  };

  const safeMonthlyAdmissions = monthlyAdmissions || [];
  const safeAttendanceData = attendanceData || [];
  const safeRecentAdmissions = recentAdmissions || [];

  return (
    <Layout>
      <div className="pt-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={safeStats.totalStudents}
            icon={Users}
            trend="+12% from last month"
          />
          <StatCard
            title="Total Teachers"
            value={safeStats.totalTeachers}
            icon={UserCheck}
            trend="5 new this month"
          />
          <StatCard
            title="Pending Admissions"
            value={safeStats.pendingAdmissions}
            icon={UserPlus}
            trend="Needs attention"
          />
          <StatCard
            title="Avg. Attendance"
            value={`${safeStats.averageAttendance}%`}
            icon={TrendingUp}
            trend="+2% from last week"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Monthly Admissions</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={safeMonthlyAdmissions}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="admissions" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Class-wise Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={safeAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="class" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Admission Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safeRecentAdmissions.map((admission, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">{admission.name}</p>
                    <p className="text-sm text-muted-foreground">Class {admission.class}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{admission.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
