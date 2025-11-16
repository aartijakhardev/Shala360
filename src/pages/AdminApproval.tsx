import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Calendar, Mail, Phone, MapPin, Loader2, RefreshCw, UserCheck } from 'lucide-react';
import { admissionAPI } from '@/lib/api';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface AdmissionRequest {
  _id: string;
  studentName: string;
  applicationNumber: string;
  dateOfBirth: Date;
  gender: string;
  admission: {
    class: string;
    academicYear: string;
  };
  father: {
    name: string;
    phone: string;
    email?: string;
  };
  mother: {
    name: string;
    phone: string;
  };
  currentAddress: {
    street: string;
    city: string;
    state: string;
  };
  applicationStatus: string;
  createdAt: string;
}

const AdminApproval = () => {
  const [pendingRequests, setPendingRequests] = useState<AdmissionRequest[]>([]);
  const [processedRequests, setProcessedRequests] = useState<AdmissionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<AdmissionRequest | null>(null);
  const [rejectComments, setRejectComments] = useState('');

  const fetchRequests = async () => {
    try {
      setLoading(true);
      
      // Fetch pending requests
      const pendingResponse = await admissionAPI.getAll({
        status: 'pending',
        limit: 50,
      });
      
      // Fetch recently processed requests (approved/rejected)
      const processedResponse = await admissionAPI.getAll({
        limit: 20,
      });
      
      if (pendingResponse.success) {
        setPendingRequests(pendingResponse.data.students);
      }
      
      if (processedResponse.success) {
        const processed = processedResponse.data.students.filter(
          (s: AdmissionRequest) => s.applicationStatus === 'approved' || s.applicationStatus === 'rejected'
        );
        setProcessedRequests(processed);
      }
    } catch (error: any) {
      console.error('Failed to fetch requests:', error);
      toast.error('Failed to load admission requests', {
        description: error.response?.data?.message || 'Please try again later',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (request: AdmissionRequest) => {
    try {
      setActionLoading(request._id);
      
      const response = await admissionAPI.updateStatus(request._id, {
        status: 'approved',
        comments: 'Application approved by admin',
      });
      
      if (response.success) {
        toast.success('Admission Approved', {
          description: `${request.studentName} has been approved for ${request.admission.class}`,
          icon: <CheckCircle className="h-4 w-4" />,
        });
        
        // Refresh the lists
        fetchRequests();
      }
    } catch (error: any) {
      console.error('Failed to approve:', error);
      toast.error('Failed to approve application', {
        description: error.response?.data?.message || 'Please try again',
      });
    } finally {
      setActionLoading(null);
    }
  };

  const openRejectDialog = (request: AdmissionRequest) => {
    setSelectedRequest(request);
    setRejectComments('');
    setShowRejectDialog(true);
  };

  const handleReject = async () => {
    if (!selectedRequest) return;
    
    if (!rejectComments.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    try {
      setActionLoading(selectedRequest._id);
      
      const response = await admissionAPI.updateStatus(selectedRequest._id, {
        status: 'rejected',
        comments: rejectComments,
      });
      
      if (response.success) {
        toast.error('Admission Rejected', {
          description: `${selectedRequest.studentName}'s application has been rejected`,
        });
        
        setShowRejectDialog(false);
        setSelectedRequest(null);
        setRejectComments('');
        
        // Refresh the lists
        fetchRequests();
      }
    } catch (error: any) {
      console.error('Failed to reject:', error);
      toast.error('Failed to reject application', {
        description: error.response?.data?.message || 'Please try again',
      });
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      <div className="pt-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <UserCheck className="h-8 w-8 text-primary" />
              Admission Approvals
            </h1>
            <p className="text-muted-foreground">Review and process pending admission requests</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={fetchRequests}
            disabled={loading}
            title="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Pending Requests ({pendingRequests.length})
              </h2>
              
              {pendingRequests.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No pending requests</h3>
                    <p className="text-sm text-muted-foreground">
                      All admission requests have been processed
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {pendingRequests.map((request) => (
                    <Card key={request._id} className="shadow-card hover-lift">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{request.studentName}</CardTitle>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="secondary">
                                Class {request.admission.class}
                              </Badge>
                              <Badge variant="outline">
                                {request.applicationNumber}
                              </Badge>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            Pending
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(request.dateOfBirth)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="font-medium">{request.gender}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="font-medium">Father: {request.father.name}</p>
                              <p className="text-muted-foreground">
                                {request.father.email || 'No email provided'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{request.father.phone}</span>
                          </div>
                          <div className="flex items-start gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5" />
                            <span>
                              {request.currentAddress.street}, {request.currentAddress.city}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={() => handleApprove(request)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            disabled={actionLoading !== null}
                          >
                            {actionLoading === request._id ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <CheckCircle className="h-4 w-4 mr-2" />
                            )}
                            Approve
                          </Button>
                          <Button
                            onClick={() => openRejectDialog(request)}
                            variant="outline"
                            className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                            disabled={actionLoading !== null}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {processedRequests.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Recently Processed ({processedRequests.length})
                </h2>
                <div className="space-y-3">
                  {processedRequests.map((request) => (
                    <Card key={request._id} className="shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{request.studentName}</p>
                            <p className="text-sm text-muted-foreground">
                              Class {request.admission.class} • {request.applicationNumber} • {request.father.email || request.father.phone}
                            </p>
                          </div>
                          <Badge variant={request.applicationStatus === 'approved' ? 'default' : 'destructive'}>
                            {request.applicationStatus === 'approved' ? (
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
        )}

        {/* Rejection Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Admission Application</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting {selectedRequest?.studentName}'s application.
                This will be communicated to the parents.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="comments">Reason for Rejection *</Label>
                <Textarea
                  id="comments"
                  placeholder="e.g., Age requirements not met, incomplete documents, etc."
                  rows={4}
                  value={rejectComments}
                  onChange={(e) => setRejectComments(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectDialog(false);
                  setSelectedRequest(null);
                  setRejectComments('');
                }}
                disabled={actionLoading !== null}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={actionLoading !== null || !rejectComments.trim()}
              >
                {actionLoading === selectedRequest?._id ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Rejecting...
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Application
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AdminApproval;
