import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { teacherAPI, TeacherFormData, Teacher } from '@/lib/api';
import { 
  Edit2, Upload, ArrowLeft, Save, Loader2, RefreshCw,
  User, MapPin, Phone, Contact,
  BookOpen, FileText,
  Plus, X
} from 'lucide-react';

const EditNewTeacher = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState<TeacherFormData>({
    name: '',
    subject: '',
    qualification: '',
    experience: '',
    dob: '',
    gender: 'Male',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'India'
    },
    emergencyContact: {
      name: '',
      relation: '',
      phone: ''
    },
    joiningDate: '',
    aadharNumber: '',
    subjectsTaught: [],
    email: '',
    phone: '',
    status: 'Active',
    remarks: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [subjectInput, setSubjectInput] = useState('');

  // Common subjects list
  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi',
    'Social Studies', 'History', 'Geography', 'Computer Science', 
    'Physical Education', 'Art', 'Music', 'Sanskrit', 'Economics',
    'Political Science', 'Psychology', 'Other'
  ];

  // Qualification options
  const qualifications = [
    'Ph.D', 'M.Phil', 'M.A', 'M.Sc', 'M.Ed', 'M.Com', 'MBA', 
    'B.A', 'B.Sc', 'B.Ed', 'B.Com', 'B.Tech', 'Diploma', 'Other'
  ];

  // Indian states
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal', 'Delhi'
  ];

  // Relations for emergency contact
  const relations = [
    'Father', 'Mother', 'Spouse', 'Brother', 'Sister', 
    'Son', 'Daughter', 'Friend', 'Other'
  ];

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
        setInitialLoading(true);
        const response = await teacherAPI.getById(id);
        const teacherData = response.data;
        setTeacher(teacherData);
        
        // Populate form with existing data
        setFormData({
          teacherId: teacherData.teacherId,
          name: teacherData.name,
          subject: teacherData.subject,
          qualification: teacherData.qualification || '',
          experience: teacherData.experience || '',
          dob: teacherData.dob ? new Date(teacherData.dob).toISOString().split('T')[0] : '',
          gender: teacherData.gender || 'Male',
          address: {
            street: teacherData.address?.street || '',
            city: teacherData.address?.city || '',
            state: teacherData.address?.state || '',
            zip: teacherData.address?.zip || '',
            country: teacherData.address?.country || 'India'
          },
          emergencyContact: {
            name: teacherData.emergencyContact?.name || '',
            relation: teacherData.emergencyContact?.relation || '',
            phone: teacherData.emergencyContact?.phone || ''
          },
          joiningDate: teacherData.joiningDate ? new Date(teacherData.joiningDate).toISOString().split('T')[0] : '',
          salary: teacherData.salary,
          aadharNumber: teacherData.aadharNumber || '',
          subjectsTaught: teacherData.subjectsTaught || [],
          email: teacherData.email || '',
          phone: teacherData.phone || '',
          status: teacherData.status,
          remarks: teacherData.remarks || ''
        });

        // Set photo preview if exists
        if (teacherData.photo?.url) {
          setPhotoPreview(teacherData.photo.url);
        }
      } catch (error: any) {
        console.error('Error fetching teacher:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch teacher data'
        });
        navigate('/teacher-management');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchTeacher();
  }, [id, navigate, toast]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Basic Information (Required)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate = 'Joining date is required';
    }

    if (!formData.aadharNumber.trim()) {
      newErrors.aadharNumber = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = 'Aadhar number must be 12 digits';
    }

    // Address (Required)
    if (!formData.address.street.trim()) {
      newErrors['address.street'] = 'Street address is required';
    }

    if (!formData.address.city.trim()) {
      newErrors['address.city'] = 'City is required';
    }

    if (!formData.address.state.trim()) {
      newErrors['address.state'] = 'State is required';
    }

    if (!formData.address.zip.trim()) {
      newErrors['address.zip'] = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.address.zip)) {
      newErrors['address.zip'] = 'Pincode must be 6 digits';
    }

    // Emergency Contact (Required)
    if (!formData.emergencyContact.name.trim()) {
      newErrors['emergencyContact.name'] = 'Emergency contact name is required';
    }

    if (!formData.emergencyContact.relation.trim()) {
      newErrors['emergencyContact.relation'] = 'Emergency contact relation is required';
    }

    if (!formData.emergencyContact.phone.trim()) {
      newErrors['emergencyContact.phone'] = 'Emergency contact phone is required';
    } else if (!/^[+]?[\d\s-()]+$/.test(formData.emergencyContact.phone)) {
      newErrors['emergencyContact.phone'] = 'Please enter a valid phone number';
    }

    // Optional field validations
    if (formData.email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[+]?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.salary && formData.salary < 0) {
      newErrors.salary = 'Salary cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => {
        const parentObj = prev[parent as keyof TeacherFormData] as any;
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [child]: value
          }
        };
      });
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: 'destructive',
        title: 'File too large',
        description: 'Please select an image smaller than 5MB'
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: 'destructive',
        title: 'Invalid file type',
        description: 'Please select an image file'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setPhotoPreview(base64);
      setFormData(prev => ({
        ...prev,
        photo: base64,
        photoFileName: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const addSubject = () => {
    if (subjectInput.trim() && !formData.subjectsTaught?.includes(subjectInput.trim())) {
      setFormData(prev => ({
        ...prev,
        subjectsTaught: [...(prev.subjectsTaught || []), subjectInput.trim()]
      }));
      setSubjectInput('');
    }
  };

  const removeSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjectsTaught: prev.subjectsTaught?.filter(s => s !== subject) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please fix the errors in the form'
      });
      return;
    }

    if (!id) return;

    setLoading(true);
    try {
      const response = await teacherAPI.update(id, formData);
      toast({
        title: 'Success',
        description: `Teacher ${response.data.name} has been updated successfully`
      });
      navigate('/teacher-management');
    } catch (error: any) {
      console.error('Error updating teacher:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update teacher';
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'T';
  };

  const getFieldError = (field: string) => {
    return errors[field];
  };

  if (initialLoading) {
    return (
      <Layout>
        <div className="pt-8 space-y-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Loading teacher data...</p>
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
              onClick={() => navigate('/teacher-management')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Edit2 className="h-8 w-8 text-primary" />
                Edit Teacher
              </h1>
              <p className="text-muted-foreground">
                Update {teacher.name}'s profile information
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Profile Photo Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Profile Photo
                </CardTitle>
                <CardDescription>Update teacher's profile picture</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={photoPreview} alt="Preview" />
                    <AvatarFallback className="text-xl">
                      {getInitials(formData.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>Personal and identification details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="teacherId">Teacher ID</Label>
                    <Input
                      id="teacherId"
                      value={formData.teacherId || teacher.teacherId}
                      disabled
                      className="bg-muted font-mono"
                    />
                    <p className="text-xs text-muted-foreground">ID cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={getFieldError('name') ? 'border-destructive' : ''}
                    />
                    {getFieldError('name') && (
                      <p className="text-xs text-destructive">{getFieldError('name')}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      className={getFieldError('dob') ? 'border-destructive' : ''}
                    />
                    {getFieldError('dob') && (
                      <p className="text-xs text-destructive">{getFieldError('dob')}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange('gender', value)}
                    >
                      <SelectTrigger className={getFieldError('gender') ? 'border-destructive' : ''}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {getFieldError('gender') && (
                      <p className="text-xs text-destructive">{getFieldError('gender')}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadharNumber">Aadhar Number *</Label>
                    <Input
                      id="aadharNumber"
                      placeholder="Enter 12-digit Aadhar number"
                      value={formData.aadharNumber}
                      onChange={(e) => handleInputChange('aadharNumber', e.target.value.replace(/\D/g, '').slice(0, 12))}
                      maxLength={12}
                      className={getFieldError('aadharNumber') ? 'border-destructive' : ''}
                    />
                    {getFieldError('aadharNumber') && (
                      <p className="text-xs text-destructive">{getFieldError('aadharNumber')}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="joiningDate">Joining Date *</Label>
                    <Input
                      id="joiningDate"
                      type="date"
                      value={formData.joiningDate}
                      onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                      className={getFieldError('joiningDate') ? 'border-destructive' : ''}
                    />
                    {getFieldError('joiningDate') && (
                      <p className="text-xs text-destructive">{getFieldError('joiningDate')}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleInputChange('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">🟢 Active</SelectItem>
                        <SelectItem value="On Leave">🟠 On Leave</SelectItem>
                        <SelectItem value="Inactive">🔴 Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Professional Information
                </CardTitle>
                <CardDescription>Academic qualifications and teaching details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Primary Subject *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => handleInputChange('subject', value)}
                    >
                      <SelectTrigger className={getFieldError('subject') ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select primary subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {getFieldError('subject') && (
                      <p className="text-xs text-destructive">{getFieldError('subject')}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualification">Highest Qualification</Label>
                    <Select
                      value={formData.qualification || ''}
                      onValueChange={(value) => handleInputChange('qualification', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        {qualifications.map((qual) => (
                          <SelectItem key={qual} value={qual}>
                            {qual}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Teaching Experience</Label>
                    <Input
                      id="experience"
                      placeholder="e.g., 5 years"
                      value={formData.experience || ''}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary">Monthly Salary (₹)</Label>
                    <Input
                      id="salary"
                      type="number"
                      placeholder="Enter monthly salary"
                      value={formData.salary || ''}
                      onChange={(e) => handleInputChange('salary', e.target.value ? parseFloat(e.target.value) : undefined)}
                      className={getFieldError('salary') ? 'border-destructive' : ''}
                    />
                    {getFieldError('salary') && (
                      <p className="text-xs text-destructive">{getFieldError('salary')}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Additional Subjects Taught</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a subject"
                        value={subjectInput}
                        onChange={(e) => setSubjectInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSubject();
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={addSubject}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.subjectsTaught && formData.subjectsTaught.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.subjectsTaught.map((subject, index) => (
                          <Badge key={index} variant="secondary" className="gap-1">
                            {subject}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => removeSubject(subject)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
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
                <CardDescription>Current residential address</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2 md:col-span-2 lg:col-span-3">
                    <Label htmlFor="street">Street Address *</Label>
                    <Input
                      id="street"
                      placeholder="Enter complete street address"
                      value={formData.address.street}
                      onChange={(e) => handleInputChange('address.street', e.target.value)}
                      className={getFieldError('address.street') ? 'border-destructive' : ''}
                    />
                    {getFieldError('address.street') && (
                      <p className="text-xs text-destructive">{getFieldError('address.street')}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="Enter city"
                      value={formData.address.city}
                      onChange={(e) => handleInputChange('address.city', e.target.value)}
                      className={getFieldError('address.city') ? 'border-destructive' : ''}
                    />
                    {getFieldError('address.city') && (
                      <p className="text-xs text-destructive">{getFieldError('address.city')}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select
                      value={formData.address.state}
                      onValueChange={(value) => handleInputChange('address.state', value)}
                    >
                      <SelectTrigger className={getFieldError('address.state') ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {getFieldError('address.state') && (
                      <p className="text-xs text-destructive">{getFieldError('address.state')}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zip">Pincode *</Label>
                    <Input
                      id="zip"
                      placeholder="Enter 6-digit pincode"
                      value={formData.address.zip}
                      onChange={(e) => handleInputChange('address.zip', e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength={6}
                      className={getFieldError('address.zip') ? 'border-destructive' : ''}
                    />
                    {getFieldError('address.zip') && (
                      <p className="text-xs text-destructive">{getFieldError('address.zip')}</p>
                    )}
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
                <CardDescription>Personal and emergency contact details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Contact className="h-4 w-4" />
                      Personal Contact
                    </h4>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={getFieldError('email') ? 'border-destructive' : ''}
                      />
                      {getFieldError('email') && (
                        <p className="text-xs text-destructive">{getFieldError('email')}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
                        value={formData.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={getFieldError('phone') ? 'border-destructive' : ''}
                      />
                      {getFieldError('phone') && (
                        <p className="text-xs text-destructive">{getFieldError('phone')}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Contact className="h-4 w-4" />
                      Emergency Contact *
                    </h4>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyName">Contact Name *</Label>
                      <Input
                        id="emergencyName"
                        placeholder="Enter emergency contact name"
                        value={formData.emergencyContact.name}
                        onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                        className={getFieldError('emergencyContact.name') ? 'border-destructive' : ''}
                      />
                      {getFieldError('emergencyContact.name') && (
                        <p className="text-xs text-destructive">{getFieldError('emergencyContact.name')}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyRelation">Relation *</Label>
                      <Select
                        value={formData.emergencyContact.relation}
                        onValueChange={(value) => handleInputChange('emergencyContact.relation', value)}
                      >
                        <SelectTrigger className={getFieldError('emergencyContact.relation') ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select relation" />
                        </SelectTrigger>
                        <SelectContent>
                          {relations.map((relation) => (
                            <SelectItem key={relation} value={relation}>
                              {relation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {getFieldError('emergencyContact.relation') && (
                        <p className="text-xs text-destructive">{getFieldError('emergencyContact.relation')}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Contact Phone *</Label>
                      <Input
                        id="emergencyPhone"
                        placeholder="Enter emergency contact phone"
                        value={formData.emergencyContact.phone}
                        onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                        className={getFieldError('emergencyContact.phone') ? 'border-destructive' : ''}
                      />
                      {getFieldError('emergencyContact.phone') && (
                        <p className="text-xs text-destructive">{getFieldError('emergencyContact.phone')}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Additional Information
                </CardTitle>
                <CardDescription>Optional remarks and notes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="remarks">Remarks & Notes</Label>
                    <Textarea
                      id="remarks"
                      placeholder="Additional notes, certifications, achievements, etc."
                      value={formData.remarks || ''}
                      onChange={(e) => handleInputChange('remarks', e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/teacher-management')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="gap-2">
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    {loading ? 'Updating...' : 'Update Teacher'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditNewTeacher;