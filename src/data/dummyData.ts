export interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  parentName: string;
  contact: string;
  email: string;
  attendancePercentage: number;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  contact: string;
}

export interface AdmissionRequest {
  id: string;
  fullName: string;
  dob: string;
  gender: string;
  class: string;
  section: string;
  parentName: string;
  contact: string;
  email: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
}

export const students: Student[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    class: '10',
    section: 'A',
    rollNo: '101',
    parentName: 'Rajesh Sharma',
    contact: '+91 98765 43210',
    email: 'rajesh.sharma@email.com',
    attendancePercentage: 92,
  },
  {
    id: '2',
    name: 'Diya Patel',
    class: '10',
    section: 'A',
    rollNo: '102',
    parentName: 'Amit Patel',
    contact: '+91 98765 43211',
    email: 'amit.patel@email.com',
    attendancePercentage: 88,
  },
  {
    id: '3',
    name: 'Arjun Kumar',
    class: '10',
    section: 'B',
    rollNo: '201',
    parentName: 'Suresh Kumar',
    contact: '+91 98765 43212',
    email: 'suresh.kumar@email.com',
    attendancePercentage: 95,
  },
  {
    id: '4',
    name: 'Ananya Singh',
    class: '10',
    section: 'B',
    rollNo: '202',
    parentName: 'Vikram Singh',
    contact: '+91 98765 43213',
    email: 'vikram.singh@email.com',
    attendancePercentage: 90,
  },
  {
    id: '5',
    name: 'Rohan Gupta',
    class: '9',
    section: 'A',
    rollNo: '301',
    parentName: 'Manoj Gupta',
    contact: '+91 98765 43214',
    email: 'manoj.gupta@email.com',
    attendancePercentage: 85,
  },
];

export const teachers: Teacher[] = [
  {
    id: 't1',
    name: 'Mrs. Priya Mehta',
    subject: 'Mathematics',
    contact: '+91 98765 11111',
  },
  {
    id: 't2',
    name: 'Mr. Rajesh Verma',
    subject: 'Science',
    contact: '+91 98765 22222',
  },
  {
    id: 't3',
    name: 'Ms. Sneha Reddy',
    subject: 'English',
    contact: '+91 98765 33333',
  },
];

export const admissionRequests: AdmissionRequest[] = [
  {
    id: 'ar1',
    fullName: 'Kavya Iyer',
    dob: '2012-05-15',
    gender: 'Female',
    class: '8',
    section: 'A',
    parentName: 'Sundar Iyer',
    contact: '+91 98765 44444',
    email: 'sundar.iyer@email.com',
    address: '123 MG Road, Bangalore',
    status: 'pending',
    submittedDate: '2025-10-28',
  },
  {
    id: 'ar2',
    fullName: 'Aditya Nair',
    dob: '2013-08-22',
    gender: 'Male',
    class: '7',
    section: 'B',
    parentName: 'Krishna Nair',
    contact: '+91 98765 55555',
    email: 'krishna.nair@email.com',
    address: '456 Park Street, Mumbai',
    status: 'pending',
    submittedDate: '2025-10-29',
  },
  {
    id: 'ar3',
    fullName: 'Ishita Kapoor',
    dob: '2011-12-10',
    gender: 'Female',
    class: '9',
    section: 'A',
    parentName: 'Ravi Kapoor',
    contact: '+91 98765 66666',
    email: 'ravi.kapoor@email.com',
    address: '789 Nehru Place, Delhi',
    status: 'pending',
    submittedDate: '2025-10-30',
  },
];

export const dashboardStats = {
  totalStudents: 1247,
  totalTeachers: 85,
  pendingAdmissions: 3,
  averageAttendance: 91,
};

export const monthlyAdmissions = [
  { month: 'Jan', admissions: 45 },
  { month: 'Feb', admissions: 38 },
  { month: 'Mar', admissions: 52 },
  { month: 'Apr', admissions: 41 },
  { month: 'May', admissions: 35 },
  { month: 'Jun', admissions: 48 },
];

export const attendanceData = [
  { class: 'Class 6', attendance: 93 },
  { class: 'Class 7', attendance: 91 },
  { class: 'Class 8', attendance: 89 },
  { class: 'Class 9', attendance: 90 },
  { class: 'Class 10', attendance: 92 },
];

export const recentAdmissions = [
  { name: 'Kavya Iyer', class: '8-A', date: '2025-10-28' },
  { name: 'Aditya Nair', class: '7-B', date: '2025-10-29' },
  { name: 'Ishita Kapoor', class: '9-A', date: '2025-10-30' },
];

export const announcements = [
  {
    id: 1,
    title: 'Parent-Teacher Meeting',
    date: '2025-11-15',
    description: 'PTM scheduled for all classes on November 15th at 10:00 AM',
  },
  {
    id: 2,
    title: 'Annual Sports Day',
    date: '2025-11-20',
    description: 'Annual sports day will be held on November 20th. All students must participate.',
  },
  {
    id: 3,
    title: 'Winter Vacation',
    date: '2025-12-20',
    description: 'School will be closed from December 20th to January 5th for winter vacation.',
  },
];

export const feeStatus = {
  totalAmount: 45000,
  paidAmount: 30000,
  pendingAmount: 15000,
  dueDate: '2025-11-30',
};
