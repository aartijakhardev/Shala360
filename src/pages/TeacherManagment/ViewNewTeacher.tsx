import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { teacherAPI, Teacher } from '@/lib/api';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  RefreshCw, 
  User, 
  GraduationCap, 
  BookOpen, 
  Mail, 
  Phone, 
  Calendar,
  FileText,
  Award,
  MapPin,
  Heart,
  RotateCcw,
  DollarSign
} from 'lucide-react';

const ViewNewTeacher = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [teacher, setTeacher] = useState<Teacher | null>(null);

  // Fetch teacher data
  useEffect(() => {
    const fetchTeacher = async () => {
      if (!id) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Teacher ID is required'
        });
        navigate('/teacher-management');
        return;
      }

      try {
        setLoading(true);
        const response = await teacherAPI.getById(id);
        setTeacher(response.data);
      } catch (error: any) {
        console.error('Error fetching teacher:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch teacher data'
        });
        navigate('/teacher-management');
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id, navigate, toast]);

  const handleDeleteTeacher = async () => {
    if (!teacher) return;

    try {
      await teacherAPI.delete(teacher._id);
      toast({
        title: 'Teacher Deleted',
        description: `${teacher.name} has been moved to deleted teachers.`
      });
      navigate('/teacher-management');
    } catch (error) {
      console.error('Error deleting teacher:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete teacher'
      });
    }
  };

  const handleRestoreTeacher = async () => {
    if (!teacher) return;

    try {
      await teacherAPI.restore(teacher._id);
      toast({
        title: 'Teacher Restored',
        description: `${teacher.name} has been restored successfully.`
      });
      navigate('/teacher-management');
    } catch (error) {
      console.error('Error restoring teacher:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to restore teacher'
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'On Leave':
        return 'secondary';
      case 'Inactive':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'T';
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateAge = (dob: string | Date) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <Layout>
        <div className="pt-8 space-y-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Loading teacher profile...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!teacher) {
    return (
      <Layout>
        <div className="pt-8 space-y-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Teacher not found</p>
            <Button 
              className="mt-4" 
              onClick={() => navigate('/teacher-management')}
            >
              Back to Teachers
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(teacher?.isDeleted ? '/teacher-management/deleted' : '/teacher-management')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {teacher?.isDeleted ? 'Back to Deleted' : 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <User className="h-8 w-8 text-primary" />
                Teacher Profile
              </h1>
              <p className="text-muted-foreground">Complete profile of {teacher.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {!teacher.isDeleted ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/teacher-management/edit/${teacher._id}`)}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Teacher</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete <strong>{teacher.name}</strong>? This will move them to the deleted teachers list and they can be restored later.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteTeacher}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="default" className="gap-2 bg-green-600 hover:bg-green-700">
                    <RotateCcw className="h-4 w-4" />
                    Restore Teacher
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Restore Teacher</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to restore <strong>{teacher.name}</strong>? They will be moved back to the active teachers list.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleRestoreTeacher}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Restore
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Summary Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={teacher.photo?.url} alt={teacher.name} />
                  <AvatarFallback className="text-3xl">
                    {getInitials(teacher.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">{teacher.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2 text-base">
                <BookOpen className="h-4 w-4" />
                {teacher.subject} Teacher
              </CardDescription>
              <div className="flex justify-center mt-3">
                <Badge variant={getStatusBadgeVariant(teacher.status)} className="text-sm px-3 py-1">
                  {teacher.status === 'Active' && '🟢 '}
                  {teacher.status === 'On Leave' && '🟠 '}
                  {teacher.status === 'Inactive' && '🔴 '}
                  {teacher.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>ID: {teacher.teacherId}</span>
                </div>

                {teacher.dob && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Age: {calculateAge(teacher.dob)} years</span>
                  </div>
                )}
                
                {teacher.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{teacher.email}</span>
                  </div>
                )}
                
                {teacher.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{teacher.phone}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {formatDate(teacher.joiningDate)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Date of Birth</Label>
                    <p className="mt-1 text-base">
                      {teacher.dob ? formatDate(teacher.dob) : 'Not specified'}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Gender</Label>
                    <p className="mt-1 text-base">{teacher.gender}</p>
                  </div>
                  
                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Age</Label>
                    <p className="mt-1 text-base">
                      {teacher.dob ? `${calculateAge(teacher.dob)} years` : 'Not specified'}
                    </p>
                  </div>

                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Aadhar Number</Label>
                    <p className="mt-1 text-base font-mono">
                      {teacher.aadharNumber ? 
                        `${teacher.aadharNumber.slice(0, 4)} ${teacher.aadharNumber.slice(4, 8)} ${teacher.aadharNumber.slice(8)}` 
                        : 'Not provided'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Primary Subject</Label>
                    <p className="mt-1 text-base">{teacher.subject}</p>
                  </div>
                  
                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Qualification</Label>
                    <p className="mt-1 text-base">{teacher.qualification || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Experience</Label>
                    <p className="mt-1 text-base flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      {teacher.experience || 'Not specified'}
                    </p>
                  </div>

                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Joining Date</Label>
                    <p className="mt-1 text-base flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {teacher.joiningDate ? formatDate(teacher.joiningDate) : 'Not specified'}
                    </p>
                  </div>

                  {teacher.salary && (
                    <div>
                        <Label className="font-semibold text-sm text-muted-foreground">Monthly Salary</Label>
                        <p className="mt-1 text-base flex items-center gap-2 font-semibold text-green-600">
                          <DollarSign className="h-4 w-4" />
                          {formatCurrency(teacher.salary)}
                        </p>
                    </div>
                  )}

                  {teacher.subjectsTaught && teacher.subjectsTaught.length > 0 && (
                    <div className="md:col-span-2">
                      <Label className="font-semibold text-sm text-muted-foreground">Additional Subjects Taught</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {teacher.subjectsTaught.map((subject, index) => (
                          <Badge key={index} variant="outline">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Complete Address</Label>
                    <div className="mt-2 p-3 bg-muted/50 rounded-md">
                      <p className="text-base leading-relaxed">
                        {teacher.address?.street && (
                          <>
                            {teacher.address.street}<br />
                            {teacher.address.city}, {teacher.address.state} - {teacher.address.zip}<br />
                            {teacher.address.country || 'India'}
                          </>
                        )}
                        {!teacher.address?.street && 'Address not provided'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Personal Contact</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{teacher.email || 'Not provided'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{teacher.phone || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Emergency Contact</Label>
                    {teacher.emergencyContact?.name ? (
                      <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span className="font-medium">{teacher.emergencyContact.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Relation: {teacher.emergencyContact.relation}</p>
                          <p className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {teacher.emergencyContact.phone}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-2 text-base text-muted-foreground">Not provided</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            {teacher.remarks && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Additional Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Remarks & Notes</Label>
                    <div className="mt-2 p-3 bg-muted/50 rounded-md">
                      <p className="text-base leading-relaxed">{teacher.remarks}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* System Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  System Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Profile Created</Label>
                    <p className="mt-1 text-base">{formatDate(teacher.createdAt)}</p>
                  </div>
                  
                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Last Updated</Label>
                    <p className="mt-1 text-base">{formatDate(teacher.updatedAt)}</p>
                  </div>
                  
                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Teacher ID</Label>
                    <p className="mt-1 text-base font-mono bg-muted px-2 py-1 rounded">
                      {teacher.teacherId}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="font-semibold text-sm text-muted-foreground">Account Status</Label>
                    <p className="mt-1 text-base">
                      {teacher.isDeleted ? (
                        <Badge variant="destructive">🗑️ Deleted</Badge>
                      ) : (
                        <Badge variant="default">✅ Active Account</Badge>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper Label component for consistency
const Label = ({ children, className = '', ...props }: any) => (
  <label className={`block font-medium ${className}`} {...props}>
    {children}
  </label>
);

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export default ViewNewTeacher;