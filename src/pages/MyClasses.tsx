import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Calendar, Clock, FileText } from 'lucide-react';

const MyClasses = () => {
  const classes = [
    {
      id: 1,
      name: 'Class 10-A',
      subject: 'Mathematics',
      students: 35,
      schedule: [
        { day: 'Monday', time: '09:00 - 10:00 AM' },
        { day: 'Wednesday', time: '11:00 AM - 12:00 PM' },
        { day: 'Friday', time: '02:00 - 03:00 PM' },
      ],
      nextClass: 'Monday, 09:00 AM',
      syllabus: '75% Complete',
      assignments: 3,
    },
    {
      id: 2,
      name: 'Class 10-B',
      subject: 'Mathematics',
      students: 32,
      schedule: [
        { day: 'Tuesday', time: '10:00 - 11:00 AM' },
        { day: 'Thursday', time: '09:00 - 10:00 AM' },
        { day: 'Friday', time: '03:00 - 04:00 PM' },
      ],
      nextClass: 'Tuesday, 10:00 AM',
      syllabus: '70% Complete',
      assignments: 2,
    },
    {
      id: 3,
      name: 'Class 9-A',
      subject: 'Mathematics',
      students: 38,
      schedule: [
        { day: 'Monday', time: '11:00 AM - 12:00 PM' },
        { day: 'Wednesday', time: '02:00 - 03:00 PM' },
        { day: 'Thursday', time: '11:00 AM - 12:00 PM' },
      ],
      nextClass: 'Monday, 11:00 AM',
      syllabus: '68% Complete',
      assignments: 4,
    },
  ];

  return (
    <Layout>
      <div className="pt-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            My Classes
          </h1>
          <p className="text-muted-foreground">View and manage your assigned classes</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {classes.reduce((sum, cls) => sum + cls.students, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {classes.reduce((sum, cls) => sum + cls.assignments, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-1">
          {classes.map((classItem) => (
            <Card key={classItem.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{classItem.name}</CardTitle>
                    <CardDescription className="mt-1">{classItem.subject}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {classItem.students} Students
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Schedule
                    </h3>
                    <div className="space-y-2">
                      {classItem.schedule.map((slot, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="font-medium">{slot.day}:</span>
                          <span className="text-muted-foreground ml-2">{slot.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Next Class
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{classItem.nextClass}</p>
                    
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Syllabus Progress
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: classItem.syllabus }}
                        />
                      </div>
                      <span className="text-xs font-medium">{classItem.syllabus}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button className="w-full gap-2">
                      <Users className="h-4 w-4" />
                      View Students
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <FileText className="h-4 w-4" />
                      Assignments ({classItem.assignments})
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Clock className="h-4 w-4" />
                      Mark Attendance
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MyClasses;

