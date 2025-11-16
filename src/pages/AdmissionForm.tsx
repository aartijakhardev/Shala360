import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  UserPlus, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle,
  Upload,
  X,
  AlertCircle,
  FileText,
  User,
  Home,
  GraduationCap,
  Shield,
  Users
} from 'lucide-react';
import React from 'react';

const AdmissionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tcVerified, setTcVerified] = useState(false);
  const [showTcDialog, setShowTcDialog] = useState(false);
  const [tcNumber, setTcNumber] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [tcDocument, setTcDocument] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Step 1 - Student Information
    studentName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    nationality: 'Indian',
    religion: '',
    caste: '',
    motherTongue: '',
    aadharNumber: '',
    
    // Step 2 - Previous School Information
    previousSchool: '',
    lastClass: '',
    yearOfPassing: '',
    tcNumber: '',
    boardOfEducation: '',
    
    // Step 3 - Parent/Guardian Information
    fatherName: '',
    fatherOccupation: '',
    fatherPhone: '',
    fatherEmail: '',
    motherName: '',
    motherOccupation: '',
    motherPhone: '',
    motherEmail: '',
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    
    // Step 4 - Address Information
    currentAddress: '',
    currentCity: '',
    currentState: '',
    currentPincode: '',
    permanentAddress: '',
    permanentCity: '',
    permanentState: '',
    permanentPincode: '',
    sameAsCurrentAddress: false,
    
    // Step 5 - Class Admission Details
    admissionClass: '',
    academicYear: '2024-25',
    medium: 'English',
    secondLanguage: '',
    hasTransportNeed: false,
    
    // Step 6 - Documents
    birthCertificate: null,
    transferCertificate: null,
    marksheet: null,
    photo: null,
  });

  const handleTcVerification = () => {
    if (!tcNumber || tcNumber.length < 6) {
      toast.error('Please enter a valid TC number');
      return;
    }
    
    // Simulate TC verification
    setTimeout(() => {
      setTcVerified(true);
      setFormData({ ...formData, tcNumber });
      setShowTcDialog(false);
      toast.success('TC verified successfully!', {
        description: `TC Number: ${tcNumber} is valid`,
      });
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'photo') {
          setPhoto(reader.result as string);
        } else if (type === 'tc') {
          setTcDocument(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (currentStep === 2 && !tcVerified) {
      setShowTcDialog(true);
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 6));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    toast.success('Admission form submitted successfully! 🎉', {
      description: 'Your application is under review. You will be notified soon.',
      duration: 5000,
    });
  };

  const steps = [
    { number: 1, title: 'Student Info', icon: User },
    { number: 2, title: 'Previous School', icon: GraduationCap },
    { number: 3, title: 'Parents/Guardian', icon: Users },
    { number: 4, title: 'Address', icon: Home },
    { number: 5, title: 'Class Details', icon: FileText },
    { number: 6, title: 'Documents', icon: Upload },
  ];

  return (
    <Layout>
      <div className="pt-8 space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <UserPlus className="h-8 w-8 text-primary" />
            Student Admission Form
          </h1>
          <p className="text-muted-foreground mt-1">Fill out all sections to complete your admission</p>
        </div>

        {/* Progress Steps */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center gap-2">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                        currentStep >= step.number 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'border-muted-foreground/30 text-muted-foreground'
                      }`}>
                        {currentStep > step.number ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Icon className="h-6 w-6" />
                        )}
                      </div>
                      <span className={`text-xs sm:text-sm font-medium hidden sm:block ${
                        currentStep >= step.number ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 ${
                        currentStep > step.number ? 'bg-primary' : 'bg-muted-foreground/20'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
              Step {currentStep}: {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>Please fill in all required fields</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Student Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                {/* Photo Upload */}
                <div className="flex justify-center mb-6">
                  {!photo ? (
                    <div className="w-32 h-32 border-2 border-dashed rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-primary">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="photo-upload"
                        onChange={(e) => handleImageUpload(e, 'photo')}
                      />
                      <label htmlFor="photo-upload" className="cursor-pointer text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                        <span className="text-xs text-muted-foreground mt-1">Upload Photo</span>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <img src={photo} alt="Student" className="w-32 h-32 rounded-full object-cover" />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 rounded-full h-8 w-8"
                        onClick={() => setPhoto(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name *</Label>
                    <Input
                      id="studentName"
                      placeholder="Enter full name"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select value={formData.bloodGroup} onValueChange={(value) => setFormData({ ...formData, bloodGroup: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                          <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="religion">Religion</Label>
                    <Input
                      id="religion"
                      placeholder="Enter religion"
                      value={formData.religion}
                      onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="caste">Caste/Category</Label>
                    <Select value={formData.caste} onValueChange={(value) => setFormData({ ...formData, caste: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="OBC">OBC</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="ST">ST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motherTongue">Mother Tongue</Label>
                    <Input
                      id="motherTongue"
                      placeholder="Enter mother tongue"
                      value={formData.motherTongue}
                      onChange={(e) => setFormData({ ...formData, motherTongue: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadharNumber">Aadhar Number</Label>
                    <Input
                      id="aadharNumber"
                      placeholder="Enter 12-digit Aadhar number"
                      maxLength={12}
                      value={formData.aadharNumber}
                      onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Previous School Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                {tcVerified && (
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900 dark:text-green-100">TC Verified Successfully</p>
                      <p className="text-sm text-green-700 dark:text-green-300">TC Number: {formData.tcNumber}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="previousSchool">Previous School Name *</Label>
                    <Input
                      id="previousSchool"
                      placeholder="Enter previous school name"
                      value={formData.previousSchool}
                      onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastClass">Last Class Attended *</Label>
                    <Select value={formData.lastClass} onValueChange={(value) => setFormData({ ...formData, lastClass: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'].map(cls => (
                          <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearOfPassing">Year of Passing *</Label>
                    <Input
                      id="yearOfPassing"
                      type="number"
                      placeholder="YYYY"
                      value={formData.yearOfPassing}
                      onChange={(e) => setFormData({ ...formData, yearOfPassing: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="boardOfEducation">Board of Education</Label>
                    <Input
                      id="boardOfEducation"
                      placeholder="e.g., CBSE, State Board, ICSE"
                      value={formData.boardOfEducation}
                      onChange={(e) => setFormData({ ...formData, boardOfEducation: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Parent/Guardian Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Father's Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fatherName">Father's Name *</Label>
                      <Input
                        id="fatherName"
                        placeholder="Enter father's name"
                        value={formData.fatherName}
                        onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fatherOccupation">Occupation</Label>
                      <Input
                        id="fatherOccupation"
                        placeholder="Enter occupation"
                        value={formData.fatherOccupation}
                        onChange={(e) => setFormData({ ...formData, fatherOccupation: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fatherPhone">Phone Number *</Label>
                      <Input
                        id="fatherPhone"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.fatherPhone}
                        onChange={(e) => setFormData({ ...formData, fatherPhone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fatherEmail">Email</Label>
                      <Input
                        id="fatherEmail"
                        type="email"
                        placeholder="father@email.com"
                        value={formData.fatherEmail}
                        onChange={(e) => setFormData({ ...formData, fatherEmail: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Mother's Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="motherName">Mother's Name *</Label>
                      <Input
                        id="motherName"
                        placeholder="Enter mother's name"
                        value={formData.motherName}
                        onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motherOccupation">Occupation</Label>
                      <Input
                        id="motherOccupation"
                        placeholder="Enter occupation"
                        value={formData.motherOccupation}
                        onChange={(e) => setFormData({ ...formData, motherOccupation: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motherPhone">Phone Number *</Label>
                      <Input
                        id="motherPhone"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.motherPhone}
                        onChange={(e) => setFormData({ ...formData, motherPhone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motherEmail">Email</Label>
                      <Input
                        id="motherEmail"
                        type="email"
                        placeholder="mother@email.com"
                        value={formData.motherEmail}
                        onChange={(e) => setFormData({ ...formData, motherEmail: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Address Information */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Current Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="currentAddress">Street Address *</Label>
                      <Textarea
                        id="currentAddress"
                        placeholder="Enter complete address"
                        rows={3}
                        value={formData.currentAddress}
                        onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentCity">City *</Label>
                      <Input
                        id="currentCity"
                        placeholder="City"
                        value={formData.currentCity}
                        onChange={(e) => setFormData({ ...formData, currentCity: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentState">State *</Label>
                      <Input
                        id="currentState"
                        placeholder="State"
                        value={formData.currentState}
                        onChange={(e) => setFormData({ ...formData, currentState: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentPincode">Pincode *</Label>
                      <Input
                        id="currentPincode"
                        placeholder="6-digit pincode"
                        maxLength={6}
                        value={formData.currentPincode}
                        onChange={(e) => setFormData({ ...formData, currentPincode: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sameAddress"
                    checked={formData.sameAsCurrentAddress}
                    onChange={(e) => setFormData({ ...formData, sameAsCurrentAddress: e.target.checked })}
                  />
                  <Label htmlFor="sameAddress" className="cursor-pointer">
                    Permanent address same as current address
                  </Label>
                </div>
              </div>
            )}

            {/* Step 5: Class Admission Details */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="admissionClass">Admission Class *</Label>
                    <Select value={formData.admissionClass} onValueChange={(value) => setFormData({ ...formData, admissionClass: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map(cls => (
                          <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Select value={formData.academicYear} onValueChange={(value) => setFormData({ ...formData, academicYear: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-25">2024-25</SelectItem>
                        <SelectItem value="2025-26">2025-26</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medium">Medium of Instruction *</Label>
                    <Select value={formData.medium} onValueChange={(value) => setFormData({ ...formData, medium: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                        <SelectItem value="Regional">Regional Language</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondLanguage">Second Language</Label>
                    <Select value={formData.secondLanguage} onValueChange={(value) => setFormData({ ...formData, secondLanguage: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                        <SelectItem value="Sanskrit">Sanskrit</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <input
                    type="checkbox"
                    id="transport"
                    checked={formData.hasTransportNeed}
                    onChange={(e) => setFormData({ ...formData, hasTransportNeed: e.target.checked })}
                  />
                  <Label htmlFor="transport" className="cursor-pointer">
                    Require school transport facility
                  </Label>
                </div>
              </div>
            )}

            {/* Step 6: Documents */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Birth Certificate *</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition-colors">
                      <input type="file" className="hidden" id="birth-cert" />
                      <label htmlFor="birth-cert" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm">Upload Birth Certificate</p>
                        <p className="text-xs text-muted-foreground">PDF, JPG up to 2MB</p>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Transfer Certificate (TC) *</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition-colors">
                      <input type="file" className="hidden" id="tc-cert" onChange={(e) => handleImageUpload(e, 'tc')} />
                      <label htmlFor="tc-cert" className="cursor-pointer">
                        {!tcDocument ? (
                          <>
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm">Upload TC</p>
                            <p className="text-xs text-muted-foreground">PDF, JPG up to 2MB</p>
                          </>
                        ) : (
                          <div className="text-green-600">
                            <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                            <p className="text-sm">TC Uploaded</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Last Class Marksheet *</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition-colors">
                      <input type="file" className="hidden" id="marksheet" />
                      <label htmlFor="marksheet" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm">Upload Marksheet</p>
                        <p className="text-xs text-muted-foreground">PDF, JPG up to 2MB</p>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Aadhar Card</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition-colors">
                      <input type="file" className="hidden" id="aadhar" />
                      <label htmlFor="aadhar" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm">Upload Aadhar</p>
                        <p className="text-xs text-muted-foreground">PDF, JPG up to 2MB</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < 6 ? (
                <Button onClick={nextStep}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Application
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* TC Verification Dialog */}
        <Dialog open={showTcDialog} onOpenChange={setShowTcDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                TC Verification Required
              </DialogTitle>
              <DialogDescription>
                Please enter your Transfer Certificate number for verification before proceeding
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tc-number">TC Number *</Label>
                <Input
                  id="tc-number"
                  placeholder="Enter TC number (e.g., TC202401234)"
                  value={tcNumber}
                  onChange={(e) => setTcNumber(e.target.value)}
                />
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 flex gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  The TC number will be verified with your previous school records.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowTcDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleTcVerification}>
                Verify TC
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AdmissionForm;
