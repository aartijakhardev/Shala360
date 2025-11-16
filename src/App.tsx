import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import ErrorBoundary from "@/components/ErrorBoundary";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdmissionForm from "./pages/AdmissionForm";
import AdminApproval from "./pages/AdminApproval";
import TeacherAttendance from "./pages/TeacherAttendance";
import Reports from "./pages/Reports";
import ParentDashboard from "./pages/ParentDashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
// Admin Pages
import StudentManagement from "./pages/StudentManagement";
import TeacherManagement from "./pages/TeacherManagement";
import FeeManagement from "./pages/FeeManagement";
import TeacherAttendanceAdmin from "./pages/TeacherAttendanceAdmin";
// Teacher Pages
import MyClasses from "./pages/MyClasses";
import StudentGrades from "./pages/StudentGrades";
import CreateTestReport from "./pages/CreateTestReport";
// Parent Pages
import ChildPerformance from "./pages/ChildPerformance";
import FeeStatus from "./pages/FeeStatus";
// Student Pages
import StudentProfile from "./pages/StudentProfile";
import StudentTestReports from "./pages/StudentTestReports";
import StudentMarksheetView from "./pages/StudentMarksheetView";
// Admin Pages
import TestReportsAdmin from "./pages/TestReportsAdmin";
import CreateExamReport from "./pages/CreateExamReport";
import MarksheetTemplates from "./pages/MarksheetTemplates";
// Common Pages
import Announcements from "./pages/Announcements";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>
        <ErrorBoundary>
          <Toaster />
          <Sonner position="top-center" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ErrorBoundary><Login /></ErrorBoundary>} />
              <Route path="/dashboard" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
              
              {/* Admin Routes */}
              <Route path="/students" element={<ErrorBoundary><StudentManagement /></ErrorBoundary>} />
              <Route path="/teachers" element={<ErrorBoundary><TeacherManagement /></ErrorBoundary>} />
              <Route path="/fees" element={<ErrorBoundary><FeeManagement /></ErrorBoundary>} />
              <Route path="/admission" element={<ErrorBoundary><AdmissionForm /></ErrorBoundary>} />
              <Route path="/approval" element={<ErrorBoundary><AdminApproval /></ErrorBoundary>} />
              <Route path="/teacher-attendance" element={<ErrorBoundary><TeacherAttendanceAdmin /></ErrorBoundary>} />
              <Route path="/test-reports-admin" element={<ErrorBoundary><TestReportsAdmin /></ErrorBoundary>} />
              <Route path="/create-exam-report" element={<ErrorBoundary><CreateExamReport /></ErrorBoundary>} />
              <Route path="/marksheet-templates" element={<ErrorBoundary><MarksheetTemplates /></ErrorBoundary>} />
              
              {/* Teacher Routes */}
              <Route path="/my-classes" element={<ErrorBoundary><MyClasses /></ErrorBoundary>} />
              <Route path="/grades" element={<ErrorBoundary><StudentGrades /></ErrorBoundary>} />
              <Route path="/create-test-report" element={<ErrorBoundary><CreateTestReport /></ErrorBoundary>} />
              <Route path="/attendance" element={<ErrorBoundary><TeacherAttendance /></ErrorBoundary>} />
              
              {/* Parent Routes */}
              <Route path="/parent-dashboard" element={<ErrorBoundary><ParentDashboard /></ErrorBoundary>} />
              <Route path="/performance" element={<ErrorBoundary><ChildPerformance /></ErrorBoundary>} />
              <Route path="/fee-status" element={<ErrorBoundary><FeeStatus /></ErrorBoundary>} />
              
              {/* Student Routes */}
              <Route path="/student-profile/:id" element={<ErrorBoundary><StudentProfile /></ErrorBoundary>} />
              <Route path="/my-profile" element={<ErrorBoundary><StudentProfile /></ErrorBoundary>} />
              <Route path="/student-test-reports" element={<ErrorBoundary><StudentTestReports /></ErrorBoundary>} />
              <Route path="/student-marksheet-view" element={<ErrorBoundary><StudentMarksheetView /></ErrorBoundary>} />
              
              {/* Common Routes */}
              <Route path="/announcements" element={<ErrorBoundary><Announcements /></ErrorBoundary>} />
              <Route path="/reports" element={<ErrorBoundary><Reports /></ErrorBoundary>} />
              <Route path="/settings" element={<ErrorBoundary><Settings /></ErrorBoundary>} />
            
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
