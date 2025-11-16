import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { 
  FileText, 
  Download, 
  Eye, 
  Settings as SettingsIcon,
  Palette,
  Layout as LayoutIcon,
  Star,
  Award,
  GraduationCap
} from 'lucide-react';

const MarksheetTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [selectedStudent, setSelectedStudent] = useState('STU001');
  const [showToAllStudents, setShowToAllStudents] = useState(false);
  const [selectedExam, setSelectedExam] = useState('half-yearly');

  const templates = [
    {
      id: 'classic',
      name: 'Classic Blue',
      description: 'Traditional blue header with clean layout',
      color: 'blue',
      preview: 'bg-gradient-to-r from-blue-600 to-blue-800',
    },
    {
      id: 'modern',
      name: 'Modern Green',
      description: 'Contemporary design with green accents',
      color: 'green',
      preview: 'bg-gradient-to-r from-green-600 to-emerald-600',
    },
    {
      id: 'elegant',
      name: 'Elegant Purple',
      description: 'Sophisticated purple theme with gold accents',
      color: 'purple',
      preview: 'bg-gradient-to-r from-purple-600 to-violet-600',
    },
    {
      id: 'professional',
      name: 'Professional Gray',
      description: 'Clean corporate style in grayscale',
      color: 'gray',
      preview: 'bg-gradient-to-r from-gray-700 to-gray-900',
    },
    {
      id: 'vibrant',
      name: 'Vibrant Orange',
      description: 'Energetic orange design with modern elements',
      color: 'orange',
      preview: 'bg-gradient-to-r from-orange-500 to-red-500',
    },
    {
      id: 'minimal',
      name: 'Minimal Teal',
      description: 'Clean and minimal teal design',
      color: 'teal',
      preview: 'bg-gradient-to-r from-teal-600 to-cyan-600',
    },
  ];

  const students = [
    { id: 'STU001', name: 'Aarav Sharma', class: '10-A', rollNo: '001' },
    { id: 'STU002', name: 'Diya Patel', class: '10-A', rollNo: '002' },
    { id: 'STU003', name: 'Arjun Kumar', class: '10-A', rollNo: '003' },
    { id: 'STU004', name: 'Ananya Singh', class: '10-A', rollNo: '004' },
    { id: 'STU005', name: 'Vihaan Gupta', class: '10-A', rollNo: '005' },
  ];

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

  const selectedStudentData = students.find(s => s.id === selectedStudent);
  const selectedExamData = examData[selectedExam as keyof typeof examData];
  
  const totalMarks = Object.values(selectedExamData.subjects).reduce((sum, subject) => sum + subject.marks, 0);
  const totalMaxMarks = Object.values(selectedExamData.subjects).reduce((sum, subject) => sum + subject.total, 0);
  const percentage = ((totalMarks / totalMaxMarks) * 100).toFixed(2);
  const overallGrade = percentage >= '90' ? 'A+' : percentage >= '80' ? 'A' : percentage >= '70' ? 'B+' : 'B';

  const handleDownload = () => {
    try {
      const template = templates.find(t => t.id === selectedTemplate);
      toast.success('Marksheet downloaded successfully!', {
        description: `${template?.name || 'Selected'} template applied`,
      });
    } catch (error) {
      console.error('Error downloading marksheet:', error);
      toast.error('Failed to download marksheet. Please try again.');
    }
  };

  const handlePreview = () => {
    try {
      toast.info('Opening marksheet preview...', {
        description: 'Preview will open in new window',
      });
    } catch (error) {
      console.error('Error opening preview:', error);
      toast.error('Failed to open preview. Please try again.');
    }
  };

  const handleToggleVisibility = () => {
    try {
      setShowToAllStudents(!showToAllStudents);
      toast.success(
        showToAllStudents 
          ? 'Marksheets hidden from students' 
          : 'Marksheets now visible to all students!',
        {
          description: showToAllStudents 
            ? 'Students can no longer view their marksheets'
            : 'Students can now view and download their marksheets',
        }
      );
    } catch (error) {
      console.error('Error toggling visibility:', error);
      toast.error('Failed to update visibility settings. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="pt-8 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              Marksheet Templates & Download
            </h1>
            <p className="text-muted-foreground">Customize and download student marksheets</p>
          </div>
          
          {/* Student Visibility Toggle */}
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Label htmlFor="visibility" className="text-sm font-medium">
                Show marksheets to students
              </Label>
              <Switch
                id="visibility"
                checked={showToAllStudents}
                onCheckedChange={handleToggleVisibility}
              />
            </div>
          </Card>
        </div>

        {/* Template Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Choose Template
            </CardTitle>
            <CardDescription>Select a design template for the marksheet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className={`h-20 rounded-lg ${template.preview} flex items-center justify-center`}>
                        <FileText className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          {template.name}
                          {selectedTemplate === template.id && (
                            <Badge variant="default" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Selected
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student & Exam Selection */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutIcon className="h-5 w-5" />
                Select Student
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {students.map(student => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} (Roll: {student.rollNo})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Select Exam
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="half-yearly">Half-Yearly Examination</SelectItem>
                  <SelectItem value="final">Final Examination</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Marksheet Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Marksheet Preview
            </CardTitle>
            <CardDescription>
              Preview of {selectedStudentData?.name}'s marksheet with {templates.find(t => t.id === selectedTemplate)?.name} template
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Marksheet Preview Content */}
            <div className="border-2 border-dashed rounded-lg p-8 bg-muted/20">
              <div className={`p-6 rounded-lg text-white ${templates.find(t => t.id === selectedTemplate)?.preview}`}>
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

              <div className="bg-white dark:bg-card p-6 rounded-b-lg">
                {/* Student Info */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                      {selectedStudentData?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{selectedStudentData?.name}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>Class: {selectedStudentData?.class}</span>
                      <span>Roll No: {selectedStudentData?.rollNo}</span>
                      <span>SSR: SSR/2025/00{selectedStudentData?.rollNo}</span>
                    </div>
                  </div>
                </div>

                {/* Marks Table */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Subject-wise Marks</h4>
                  <div className="rounded-lg border">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="p-3 text-left">Subject</th>
                          <th className="p-3 text-center">Marks Obtained</th>
                          <th className="p-3 text-center">Total Marks</th>
                          <th className="p-3 text-center">Percentage</th>
                          <th className="p-3 text-center">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(selectedExamData.subjects).map(([subject, data]) => (
                          <tr key={subject} className="border-t">
                            <td className="p-3 font-medium">{subject}</td>
                            <td className="p-3 text-center font-semibold">{data.marks}</td>
                            <td className="p-3 text-center">{data.total}</td>
                            <td className="p-3 text-center">
                              {((data.marks / data.total) * 100).toFixed(1)}%
                            </td>
                            <td className="p-3 text-center">
                              <Badge variant="default">{data.grade}</Badge>
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t-2 border-primary bg-primary/5">
                          <td className="p-3 font-bold text-lg">TOTAL</td>
                          <td className="p-3 text-center font-bold text-lg">{totalMarks}</td>
                          <td className="p-3 text-center font-bold text-lg">{totalMaxMarks}</td>
                          <td className="p-3 text-center font-bold text-lg text-primary">{percentage}%</td>
                          <td className="p-3 text-center">
                            <Badge variant="default" className="text-lg px-3 py-1">
                              {overallGrade}
                            </Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Result Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <h5 className="font-semibold text-green-700 dark:text-green-300">Result</h5>
                      <p className="text-2xl font-bold text-green-600">PASS</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <h5 className="font-semibold text-blue-700 dark:text-blue-300">Class Rank</h5>
                      <p className="text-2xl font-bold text-blue-600">3rd</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                      <h5 className="font-semibold text-purple-700 dark:text-purple-300">Attendance</h5>
                      <p className="text-2xl font-bold text-purple-600">93.5%</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t flex justify-between items-center text-sm text-muted-foreground">
                    <div>
                      <p>Generated on: {new Date().toLocaleDateString()}</p>
                      <p>Principal Signature: _________________</p>
                    </div>
                    <div className="text-right">
                      <p>Class Teacher: Dr. Sarah Johnson</p>
                      <p>Date: {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreview} className="gap-2">
              <Eye className="h-4 w-4" />
              Preview Full Size
            </Button>
            <Button variant="outline" className="gap-2">
              <SettingsIcon className="h-4 w-4" />
              Customize Template
            </Button>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleDownload} className="gap-2 bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4" />
              Download Marksheet
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download All Students
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Bulk Operations</CardTitle>
            <CardDescription>Perform actions on multiple marksheets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={selectedExam} onValueChange={setSelectedExam}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="half-yearly">Half-Yearly Exam</SelectItem>
                    <SelectItem value="final">Final Exam</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10-A">Class 10-A</SelectItem>
                    <SelectItem value="10-B">Class 10-B</SelectItem>
                    <SelectItem value="9-A">Class 9-A</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Download All Class Marksheets (ZIP)
                </Button>
                <Button variant="outline" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Preview All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle>Individual Student Downloads</CardTitle>
            <CardDescription>Download marksheet for specific students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Roll: {student.rollNo} • Class: {student.class}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-3 w-3" />
                      Preview
                    </Button>
                    <Button size="sm" className="gap-1">
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
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

export default MarksheetTemplates;
