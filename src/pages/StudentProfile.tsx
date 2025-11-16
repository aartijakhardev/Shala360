import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  GraduationCap, 
  FileText,
  Download,
  Edit,
  CheckCircle,
  Home,
  Users,
  BookOpen,
  Shield,
  Droplets,
  Globe,
  Languages
} from 'lucide-react';

const StudentProfile = () => {
  const { id } = useParams();
  const role = localStorage.getItem('userRole') || 'admin';
  
  // Generate SSR Number (Student Serial Register Number)
  const generateSSRNumber = (studentId: string) => {
    try {
      const year = new Date().getFullYear();
      const ssrNumber = `SSR/${year}/${studentId.padStart(5, '0')}`;
      return ssrNumber;
    } catch (error) {
      console.error('Error generating SSR number:', error);
      return 'SSR/2024/00001'; // fallback
    }
  };

  // Safety check for id parameter
  const studentId = id || '001';

  // Dummy student data (from admission form)
  const studentData = {
    // Basic Info
    studentId: '001',
    ssrNumber: generateSSRNumber('001'),
    admissionDate: '2024-01-15',
    admissionStatus: 'Approved',
    currentStatus: 'Active',
    
    // Personal Information
    studentName: 'Aarav Sharma',
    dateOfBirth: '2010-05-15',
    age: 14,
    gender: 'Male',
    bloodGroup: 'O+',
    nationality: 'Indian',
    religion: 'Hindu',
    caste: 'General',
    motherTongue: 'Hindi',
    aadharNumber: '1234 5678 9012',
    photo: null,
    
    // Academic Information
    currentClass: '10-A',
    admissionClass: '10',
    academicYear: '2024-25',
    rollNumber: '001',
    section: 'A',
    medium: 'English',
    secondLanguage: 'Hindi',
    hasTransport: true,
    
    // Previous School
    previousSchool: 'Delhi Public School',
    lastClassAttended: '9th',
    yearOfPassing: '2023',
    tcNumber: 'TC202301234',
    tcVerified: true,
    boardOfEducation: 'CBSE',
    
    // Parent Information
    fatherName: 'Rajesh Sharma',
    fatherOccupation: 'Software Engineer',
    fatherPhone: '+91 98765 43210',
    fatherEmail: 'rajesh.sharma@email.com',
    
    motherName: 'Priya Sharma',
    motherOccupation: 'Teacher',
    motherPhone: '+91 98765 43211',
    motherEmail: 'priya.sharma@email.com',
    
    // Address
    currentAddress: {
      street: '123, Green Park Extension',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016',
    },
    permanentAddress: {
      street: '123, Green Park Extension',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016',
    },
    
    // Documents
    documents: {
      birthCertificate: 'Uploaded ✓',
      transferCertificate: 'Uploaded ✓',
      marksheet: 'Uploaded ✓',
      aadharCard: 'Uploaded ✓',
      photo: 'Uploaded ✓',
    },
    
    // Academic Performance
    attendance: {
      present: 178,
      total: 190,
      percentage: 93.68,
    },
    
    currentGrade: 'A',
    overallPercentage: 87.5,
  };

  return (
    <Layout>
      <div className="pt-8 space-y-6 max-w-6xl mx-auto">
        {/* Header with Photo and Basic Info */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Student Photo */}
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                <AvatarImage src={studentData.photo || undefined} />
                <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                  {studentData.studentName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              {/* Basic Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{studentData.studentName}</h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        Roll No: {studentData.rollNumber}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        Class: {studentData.currentClass}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Session: {studentData.academicYear}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default" className="text-sm px-3 py-1">
                        {studentData.currentStatus}
                      </Badge>
                      <Badge variant="secondary" className="text-sm px-3 py-1">
                        {studentData.admissionStatus}
                      </Badge>
                    </div>
                  </div>
                  
                  {role === 'admin' && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Profile
                      </Button>
                    </div>
                  )}
                </div>

                {/* SSR Number - Prominent Display */}
                <div className="mt-4 p-4 bg-primary/10 rounded-lg border-2 border-primary inline-block">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Student Serial Register Number</p>
                      <p className="text-2xl font-bold text-primary font-mono">{studentData.ssrNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {studentData.attendance.percentage}%
              </div>
              <p className="text-xs text-muted-foreground">
                {studentData.attendance.present}/{studentData.attendance.total} days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {studentData.currentGrade}
              </div>
              <p className="text-xs text-muted-foreground">
                {studentData.overallPercentage}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Admission Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {new Date(studentData.admissionDate).toLocaleDateString('en-US', { 
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric' 
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">TC Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-600">Verified</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {studentData.tcNumber}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-semibold">{studentData.studentName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Date of Birth
                </p>
                <p className="font-semibold">{studentData.dateOfBirth}</p>
                <p className="text-xs text-muted-foreground">Age: {studentData.age} years</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-semibold">{studentData.gender}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Droplets className="h-3 w-3" />
                  Blood Group
                </p>
                <p className="font-semibold">{studentData.bloodGroup}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  Nationality
                </p>
                <p className="font-semibold">{studentData.nationality}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Religion</p>
                <p className="font-semibold">{studentData.religion}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Caste/Category</p>
                <p className="font-semibold">{studentData.caste}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Languages className="h-3 w-3" />
                  Mother Tongue
                </p>
                <p className="font-semibold">{studentData.motherTongue}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Aadhar Number</p>
                <p className="font-semibold font-mono">{studentData.aadharNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Current Class</p>
                <p className="font-semibold text-lg">{studentData.currentClass}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Roll Number</p>
                <p className="font-semibold text-lg">{studentData.rollNumber}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Section</p>
                <p className="font-semibold">{studentData.section}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Academic Year</p>
                <p className="font-semibold">{studentData.academicYear}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  Medium of Instruction
                </p>
                <p className="font-semibold">{studentData.medium}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Second Language</p>
                <p className="font-semibold">{studentData.secondLanguage}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Transport Facility</p>
                <p className="font-semibold">{studentData.hasTransport ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Previous School Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Previous School Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1 md:col-span-2">
                <p className="text-sm text-muted-foreground">School Name</p>
                <p className="font-semibold">{studentData.previousSchool}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Board</p>
                <p className="font-semibold">{studentData.boardOfEducation}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last Class</p>
                <p className="font-semibold">{studentData.lastClassAttended}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Year of Passing</p>
                <p className="font-semibold">{studentData.yearOfPassing}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  TC Number
                </p>
                <div className="flex items-center gap-2">
                  <p className="font-semibold font-mono">{studentData.tcNumber}</p>
                  {studentData.tcVerified && (
                    <Badge variant="default" className="gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parent/Guardian Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Parent/Guardian Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Father's Details */}
              <div>
                <h3 className="font-semibold text-lg mb-4 text-primary">Father's Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold">{studentData.fatherName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Occupation</p>
                    <p className="font-semibold">{studentData.fatherOccupation}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Phone Number
                    </p>
                    <p className="font-semibold">{studentData.fatherPhone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      Email
                    </p>
                    <p className="font-semibold">{studentData.fatherEmail}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Mother's Details */}
              <div>
                <h3 className="font-semibold text-lg mb-4 text-primary">Mother's Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold">{studentData.motherName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Occupation</p>
                    <p className="font-semibold">{studentData.motherOccupation}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Phone Number
                    </p>
                    <p className="font-semibold">{studentData.motherPhone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      Email
                    </p>
                    <p className="font-semibold">{studentData.motherEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Address */}
              <div className="space-y-3">
                <h3 className="font-semibold text-primary">Current Address</h3>
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">{studentData.currentAddress.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {studentData.currentAddress.city}, {studentData.currentAddress.state}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PIN: {studentData.currentAddress.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Permanent Address */}
              <div className="space-y-3">
                <h3 className="font-semibold text-primary">Permanent Address</h3>
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">{studentData.permanentAddress.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {studentData.permanentAddress.city}, {studentData.permanentAddress.state}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PIN: {studentData.permanentAddress.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Submitted */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documents Submitted
            </CardTitle>
            <CardDescription>All required documents for admission</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(studentData.documents).map(([docName, status]) => (
                <div 
                  key={docName} 
                  className="flex items-center justify-between p-4 border rounded-lg bg-green-50/50 dark:bg-green-950/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm capitalize">
                        {docName.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-xs text-muted-foreground">{status}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Registration Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Registration Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">SSR Number</p>
                <p className="font-bold text-lg font-mono text-primary">{studentData.ssrNumber}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Student ID</p>
                <p className="font-semibold font-mono">STU{studentData.studentId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Admission Date</p>
                <p className="font-semibold">{studentData.admissionDate}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Admission Status</p>
                <Badge variant="default">{studentData.admissionStatus}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Current Status</p>
                <Badge variant="default">{studentData.currentStatus}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {role === 'admin' && (
          <div className="flex justify-end gap-3">
            <Button variant="outline">
              Generate ID Card
            </Button>
            <Button variant="outline">
              Print Profile
            </Button>
            <Button>
              Update Information
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudentProfile;

