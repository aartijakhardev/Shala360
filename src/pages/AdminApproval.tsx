import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { admissionRequests as initialRequests } from '@/data/dummyData';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Calendar, Mail, Phone, MapPin } from 'lucide-react';

const AdminApproval = () => {
  const [requests, setRequests] = useState(initialRequests);

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'approved' as const } : req
    ));
    toast.success('Admission Approved and Mail Sent to Parent', {
      description: 'The parent will receive a confirmation email shortly.',
      icon: <Mail className="h-4 w-4" />,
    });
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'rejected' as const } : req
    ));
    toast.error('Admission Rejected', {
      description: 'The parent will be notified via email.',
    });
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const processedRequests = requests.filter(req => req.status !== 'pending');

  return (
    <Layout>
      <div className="pt-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admission Approvals</h1>
          <p className="text-muted-foreground">Review and process pending admission requests</p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Pending Requests ({pendingRequests.length})</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pendingRequests.map((request) => (
                <Card key={request.id} className="shadow-card hover-lift">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{request.fullName}</CardTitle>
                        <Badge variant="secondary" className="mt-2">
                          Class {request.class}-{request.section}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>DOB: {request.dob}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="font-medium">{request.gender}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{request.parentName}</p>
                          <p className="text-muted-foreground">{request.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{request.contact}</span>
                      </div>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 mt-0.5" />
                        <span>{request.address}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => handleApprove(request.id)}
                        className="flex-1 bg-secondary hover:bg-secondary/90"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(request.id)}
                        variant="outline"
                        className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {processedRequests.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Processed Requests</h2>
              <div className="space-y-3">
                {processedRequests.map((request) => (
                  <Card key={request.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{request.fullName}</p>
                          <p className="text-sm text-muted-foreground">
                            Class {request.class}-{request.section} • {request.email}
                          </p>
                        </div>
                        <Badge variant={request.status === 'approved' ? 'default' : 'destructive'}>
                          {request.status === 'approved' ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approved
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1" />
                              Rejected
                            </>
                          )}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminApproval;
