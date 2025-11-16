import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const handleGoHome = () => {
    try {
      const userRole = localStorage.getItem('userRole');
      if (userRole === 'parent') {
        navigate('/parent-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error navigating home:', error);
      window.location.href = '/';
    }
  };

  const handleGoBack = () => {
    try {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        handleGoHome();
      }
    } catch (error) {
      console.error('Error going back:', error);
      handleGoHome();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-950/20 rounded-full">
              <AlertTriangle className="h-12 w-12 text-orange-600" />
            </div>
            
            <div>
              <h1 className="text-4xl font-bold mb-2">404</h1>
              <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The page you're looking for doesn't exist or has been moved.
              </p>
              
              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-muted-foreground bg-muted p-2 rounded mt-2">
                  Route: {location.pathname}
                </div>
              )}
            </div>

            <div className="flex gap-3 w-full">
              <Button 
                onClick={handleGoBack}
                variant="outline"
                className="flex-1 gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
              <Button 
                onClick={handleGoHome}
                className="flex-1 gap-2"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
