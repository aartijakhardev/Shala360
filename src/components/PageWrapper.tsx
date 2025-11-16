import React, { ReactNode, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Layout from './Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface PageWrapperProps {
  children: ReactNode;
  requiresLayout?: boolean;
}

// Loading component for Suspense
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Card>
      <CardContent className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading page...</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Higher-order component to wrap pages with error boundaries
const PageWrapper: React.FC<PageWrapperProps> = ({ 
  children, 
  requiresLayout = true 
}) => {
  const content = (
    <ErrorBoundary>
      <Suspense fallback={<PageLoading />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );

  // For pages that don't use Layout (like Login, NotFound)
  if (!requiresLayout) {
    return content;
  }

  // For pages that already have Layout wrapped
  return content;
};

export default PageWrapper;
