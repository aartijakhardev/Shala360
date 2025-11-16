import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard,
  UserPlus,
  CheckSquare,
  ClipboardCheck,
  FileText,
  Users,
  Settings,
  LogOut,
  GraduationCap,
  DollarSign,
  BookOpen,
  Award,
  Megaphone,
  TrendingUp,
  Menu,
  X,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const role = localStorage.getItem('userRole') || 'admin';

  const adminLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/students', icon: Users, label: 'Students' },
    { to: '/teachers', icon: GraduationCap, label: 'Teachers' },
    { to: '/fees', icon: DollarSign, label: 'Fee Management' },
    { to: '/admission', icon: UserPlus, label: 'New Admission' },
    { to: '/approval', icon: CheckSquare, label: 'Approvals' },
    { to: '/teacher-attendance', icon: ClipboardCheck, label: 'Teacher Attendance' },
    { to: '/test-reports-admin', icon: FileText, label: 'Test Reports' },
    { to: '/create-exam-report', icon: Award, label: 'Create Exam Report' },
    { to: '/marksheet-templates', icon: FileText, label: 'Marksheet Templates' },
    { to: '/announcements', icon: Megaphone, label: 'Announcements' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const teacherLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/my-classes', icon: BookOpen, label: 'My Classes' },
    { to: '/grades', icon: Award, label: 'Student Grades' },
    { to: '/create-test-report', icon: FileText, label: 'Create Test Report' },
    { to: '/attendance', icon: ClipboardCheck, label: 'Student Attendance' },
    { to: '/announcements', icon: Megaphone, label: 'Announcements' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const parentLinks = [
    { to: '/my-profile', icon: User, label: 'My Profile' },
    { to: '/performance', icon: TrendingUp, label: 'Performance' },
    { to: '/student-test-reports', icon: Award, label: 'Test Reports' },
    { to: '/student-marksheet-view', icon: FileText, label: 'My Marksheets' },
    { to: '/fee-status', icon: DollarSign, label: 'Fee Status' },
    { to: '/admission', icon: UserPlus, label: 'Apply for Admission' },
    { to: '/announcements', icon: Megaphone, label: 'Announcements' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const links = role === 'admin' ? adminLinks : role === 'teacher' ? teacherLinks : parentLinks;

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-64 bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed left-0 top-0 shadow-lg border-r border-sidebar-border z-50 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 lg:h-8 lg:w-8 text-sidebar-primary" />
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-sidebar-foreground">EduManage</h1>
                <p className="text-xs text-sidebar-foreground/70">{role.charAt(0).toUpperCase() + role.slice(1)} Portal</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button 
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-sidebar-accent rounded-lg"
            >
              <X className="h-5 w-5 text-sidebar-foreground" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                }`
              }
            >
              <link.icon className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
              <span className="font-medium text-sm lg:text-base">{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 lg:p-4 border-t border-sidebar-border space-y-2">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs lg:text-sm text-sidebar-foreground/80">Theme</span>
            <ThemeToggle />
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground text-sm lg:text-base"
          >
            <LogOut className="h-4 w-4 lg:h-5 lg:w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
