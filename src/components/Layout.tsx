import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-30 lg:hidden flex items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="mr-2"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold">EduManage</h1>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full lg:ml-64 pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
