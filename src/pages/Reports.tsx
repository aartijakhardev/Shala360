import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { students, attendanceData } from '@/data/dummyData';
import { Download, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const handleDownloadPDF = (reportType: string) => {
    toast.success(`Downloading ${reportType} Report`, {
      description: 'Your PDF report will be ready in a moment.',
      icon: <FileText className="h-4 w-4" />,
    });
  };

  return (
    <Layout>
      <div className="pt-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">View and download attendance and performance reports</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="shadow-card hover-lift cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Monthly Attendance Report</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive attendance data for all classes
              </p>
              <Button 
                onClick={() => handleDownloadPDF('Monthly Attendance')}
                variant="outline" 
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card hover-lift cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-secondary" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Student-wise Report</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Individual student performance and attendance
              </p>
              <Button 
                onClick={() => handleDownloadPDF('Student-wise')}
                variant="outline" 
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card hover-lift cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Class-wise Summary</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Class performance and attendance statistics
              </p>
              <Button 
                onClick={() => handleDownloadPDF('Class-wise Summary')}
                variant="outline" 
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Class-wise Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="class" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendance" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Top Performing Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students
                .sort((a, b) => b.attendancePercentage - a.attendancePercentage)
                .slice(0, 10)
                .map((student, index) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Class {student.class}-{student.section} • Roll No: {student.rollNo}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-secondary">{student.attendancePercentage}%</p>
                      <p className="text-xs text-muted-foreground">Attendance</p>
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

export default Reports;
