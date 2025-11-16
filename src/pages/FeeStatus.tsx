import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DollarSign, Download, CheckCircle, AlertCircle, Calendar, CreditCard } from 'lucide-react';

const FeeStatus = () => {
  const childInfo = {
    name: 'John Smith',
    class: '10-A',
    rollNo: '001',
    admissionNo: 'STU001',
  };

  const feeStructure = {
    tuitionFee: 35000,
    libraryFee: 2000,
    labFee: 5000,
    sportsFee: 3000,
    examFee: 5000,
    total: 50000,
  };

  const paymentHistory = [
    {
      id: 'PAY001',
      date: '2024-01-10',
      term: 'First Term (Full Payment)',
      amount: 50000,
      method: 'Online Banking',
      status: 'Completed',
      receiptNo: 'REC2024001',
    },
    {
      id: 'PAY002',
      date: '2023-09-15',
      term: 'Annual Fees 2023-24',
      amount: 50000,
      method: 'Debit Card',
      status: 'Completed',
      receiptNo: 'REC2023089',
    },
    {
      id: 'PAY003',
      date: '2023-04-20',
      term: 'Second Term 2022-23',
      amount: 25000,
      method: 'Cash',
      status: 'Completed',
      receiptNo: 'REC2023045',
    },
  ];

  const upcomingPayments = [
    {
      term: 'Second Term 2024',
      amount: 50000,
      dueDate: '2024-06-15',
      status: 'Upcoming',
    },
  ];

  return (
    <Layout>
      <div className="pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-primary" />
              Fee Status & Payments
            </h1>
            <p className="text-muted-foreground">Track and manage fee payments</p>
          </div>
          <Button className="gap-2">
            <CreditCard className="h-4 w-4" />
            Make Payment
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{childInfo.name}</CardTitle>
                <CardDescription className="mt-1">
                  Class: {childInfo.class} | Roll No: {childInfo.rollNo}
                </CardDescription>
              </div>
              <Badge variant="default" className="text-base px-4 py-2 gap-2">
                <CheckCircle className="h-4 w-4" />
                All Fees Paid
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                Total Paid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{paymentHistory.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {paymentHistory.length} transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                Current Term Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">Paid</div>
              <p className="text-xs text-muted-foreground mt-1">
                ₹50,000 paid on 10 Jan 2024
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-orange-600" />
                Next Payment Due
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">15 Jun 2024</div>
              <p className="text-xs text-muted-foreground mt-1">
                ₹50,000 for Second Term
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fee Structure (Academic Year 2023-24)</CardTitle>
            <CardDescription>Detailed breakdown of annual fees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Tuition Fee</span>
                  <span className="text-lg font-semibold">₹{feeStructure.tuitionFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Library Fee</span>
                  <span className="text-lg font-semibold">₹{feeStructure.libraryFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Laboratory Fee</span>
                  <span className="text-lg font-semibold">₹{feeStructure.labFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Sports Fee</span>
                  <span className="text-lg font-semibold">₹{feeStructure.sportsFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">Examination Fee</span>
                  <span className="text-lg font-semibold">₹{feeStructure.examFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border-2 border-primary">
                  <span className="font-bold text-lg">Total Annual Fee</span>
                  <span className="text-2xl font-bold text-primary">₹{feeStructure.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Payments</CardTitle>
                <CardDescription>Schedule of future fee payments</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-2 border-orange-200 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900">
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{payment.term}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Due: {payment.dueDate}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">₹{payment.amount.toLocaleString()}</div>
                    <Button size="sm" className="mt-2">Pay Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>All previous fee transactions</CardDescription>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download All Receipts
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Payment For</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Receipt No</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.date}</TableCell>
                      <TableCell>{payment.term}</TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹{payment.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm">{payment.method}</TableCell>
                      <TableCell className="text-sm font-mono">{payment.receiptNo}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Receipt
                        </Button>
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

export default FeeStatus;

