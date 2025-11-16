import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Search, Download, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const FeeManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const feeRecords = [
    { id: 'STU001', name: 'John Smith', class: '10-A', totalFee: 50000, paid: 50000, pending: 0, status: 'Paid', dueDate: '2024-01-15', lastPayment: '2024-01-10' },
    { id: 'STU002', name: 'Emma Johnson', class: '10-A', totalFee: 50000, paid: 30000, pending: 20000, status: 'Partial', dueDate: '2024-01-15', lastPayment: '2023-12-05' },
    { id: 'STU003', name: 'Michael Brown', class: '9-B', totalFee: 45000, paid: 45000, pending: 0, status: 'Paid', dueDate: '2024-01-15', lastPayment: '2024-01-08' },
    { id: 'STU004', name: 'Sophia Davis', class: '10-B', totalFee: 50000, paid: 50000, pending: 0, status: 'Paid', dueDate: '2024-01-15', lastPayment: '2024-01-12' },
    { id: 'STU005', name: 'William Wilson', class: '9-A', totalFee: 45000, paid: 15000, pending: 30000, status: 'Overdue', dueDate: '2023-12-15', lastPayment: '2023-11-20' },
    { id: 'STU006', name: 'Olivia Martinez', class: '10-A', totalFee: 50000, paid: 25000, pending: 25000, status: 'Partial', dueDate: '2024-01-15', lastPayment: '2023-12-28' },
  ];

  const filteredRecords = feeRecords.filter(record =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCollected = feeRecords.reduce((sum, record) => sum + record.paid, 0);
  const totalPending = feeRecords.reduce((sum, record) => sum + record.pending, 0);
  const totalExpected = feeRecords.reduce((sum, record) => sum + record.totalFee, 0);

  return (
    <Layout>
      <div className="pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-primary" />
              Fee Management
            </h1>
            <p className="text-muted-foreground">Track and manage student fee payments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button className="gap-2">Send Reminders</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Total Collected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{totalCollected.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {((totalCollected / totalExpected) * 100).toFixed(1)}% of expected
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                Total Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                ₹{totalPending.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {feeRecords.filter(r => r.pending > 0).length} students pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                Fully Paid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {feeRecords.filter(r => r.status === 'Paid').length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Out of {feeRecords.length} students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                Overdue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {feeRecords.filter(r => r.status === 'Overdue').length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Require immediate action
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fee Payment Records</CardTitle>
            <CardDescription>View and manage all fee transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student name, ID, or class..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter by Status</Button>
              <Button variant="outline">Filter by Class</Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead className="text-right">Total Fee</TableHead>
                    <TableHead className="text-right">Paid</TableHead>
                    <TableHead className="text-right">Pending</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>{record.class}</TableCell>
                      <TableCell className="text-right">₹{record.totalFee.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-green-600 font-medium">
                        ₹{record.paid.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-orange-600 font-medium">
                        ₹{record.pending.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm">{record.dueDate}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            record.status === 'Paid' ? 'default' : 
                            record.status === 'Partial' ? 'secondary' : 
                            'destructive'
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {record.pending > 0 && (
                            <Button size="sm">
                              Record Payment
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FeeManagement;

