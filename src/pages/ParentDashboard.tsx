import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { students, announcements, feeStatus } from '@/data/dummyData';
import { TrendingUp, DollarSign, Bell, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ParentDashboard = () => {
  // Using first student as example child data
  const childData = students[0];

  return (
    <Layout>
      <div className="pt-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Parent Dashboard</h1>
          <p className="text-muted-foreground">Track your child's progress and school updates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-card col-span-1 md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Student Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-2xl font-bold">{childData.name}</p>
                <p className="text-sm text-muted-foreground">
                  Class {childData.class}-{childData.section} • Roll No: {childData.rollNo}
                </p>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground mb-1">Parent</p>
                <p className="font-medium">{childData.parentName}</p>
                <p className="text-sm text-muted-foreground">{childData.contact}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-4xl font-bold text-secondary">{childData.attendancePercentage}%</span>
                    <span className="text-muted-foreground mb-1">this month</span>
                  </div>
                  <Progress value={childData.attendancePercentage} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Excellent attendance record! Keep it up.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-accent" />
                Fee Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Amount</span>
                  <span className="font-semibold">₹{feeStatus.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Paid</span>
                  <span className="font-semibold text-secondary">₹{feeStatus.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm font-medium">Pending</span>
                  <span className="font-bold text-accent">₹{feeStatus.pendingAmount.toLocaleString()}</span>
                </div>
                <Badge variant="outline" className="w-full justify-center">
                  Due by {feeStatus.dueDate}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              School Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="p-2 bg-primary/10 rounded-lg h-fit">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold">{announcement.title}</h3>
                      <Badge variant="secondary">{announcement.date}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{announcement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Present Days</span>
                  <span className="text-lg font-bold text-secondary">23</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Absent Days</span>
                  <span className="text-lg font-bold text-destructive">2</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Total Classes</span>
                  <span className="text-lg font-bold">25</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">School Office</p>
                  <p className="font-medium">+91 123 456 7890</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">info@edumanage.school</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Class Teacher</p>
                  <p className="font-medium">Mrs. Priya Mehta</p>
                  <p className="text-sm text-muted-foreground">priya.mehta@edumanage.school</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ParentDashboard;
