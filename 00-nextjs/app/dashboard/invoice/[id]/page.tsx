'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

// Mock invoice data - in a real app, this would come from an API
const getInvoice = (id: string) => {
  const invoices = [
    { 
      id: 'INV-001', 
      customer: 'Acme Inc.', 
      amount: 1200, 
      status: 'paid', 
      date: '2023-05-15',
      dueDate: '2023-06-15',
      items: [
        { description: 'Web Design Services', quantity: 1, unitPrice: 1000, total: 1000 },
        { description: 'Hosting (1 year)', quantity: 1, unitPrice: 200, total: 200 },
      ]
    },
    { 
      id: 'INV-002', 
      customer: 'Globex Corp', 
      amount: 850, 
      status: 'pending', 
      date: '2023-05-18',
      dueDate: '2023-06-18',
      items: [
        { description: 'Consulting', quantity: 10, unitPrice: 85, total: 850 },
      ]
    },
    { 
      id: 'INV-003', 
      customer: 'Soylent Corp', 
      amount: 3500, 
      status: 'overdue', 
      date: '2023-05-10',
      dueDate: '2023-06-10',
      items: [
        { description: 'Software License', quantity: 1, unitPrice: 2500, total: 2500 },
        { description: 'Support Package', quantity: 1, unitPrice: 1000, total: 1000 },
      ]
    },
  ];

  return invoices.find(invoice => invoice.id === id);
};

export default function ViewInvoicePage() {
  const params = useParams();
  const router = useRouter();
  const invoice = getInvoice(params.id as string);

  if (!invoice) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Invoice not found</h2>
        <Button onClick={() => router.push('/dashboard/invoice')}>
          Back to Invoices
        </Button>
      </div>
    );
  }

  const statusColors = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    overdue: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Invoice #{invoice.id}</h2>
          <div className="flex items-center mt-1">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[invoice.status as keyof typeof statusColors]}`}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </span>
          </div>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            Print
          </Button>
          <Link href={`/dashboard/invoice/${invoice.id}/edit`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <Button variant="primary" size="sm">
            Mark as Paid
          </Button>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Bill To</h3>
            <p className="font-medium">{invoice.customer}</p>
            <p className="text-sm text-gray-600">123 Business St.</p>
            <p className="text-sm text-gray-600">San Francisco, CA 94103</p>
            <p className="text-sm text-gray-600">contact@acme.com</p>
          </div>
          <div className="md:text-right">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="text-sm text-gray-500">Invoice #</div>
              <div className="text-sm font-medium">{invoice.id}</div>
              
              <div className="text-sm text-gray-500">Date</div>
              <div className="text-sm">{new Date(invoice.date).toLocaleDateString()}</div>
              
              <div className="text-sm text-gray-500">Due Date</div>
              <div className="text-sm">{new Date(invoice.dueDate).toLocaleDateString()}</div>
              
              <div className="text-sm text-gray-500">Amount Due</div>
              <div className="text-lg font-bold">${invoice.amount.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    ${item.unitPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                    ${item.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-8 flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2 text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${invoice.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 text-sm text-gray-600">
              <span>Tax (0%)</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between py-2 text-lg font-bold border-t border-gray-200 mt-2 pt-3">
              <span>Total</span>
              <span>${invoice.amount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Notes</h3>
          <p className="mt-1 text-sm text-gray-500">
            Thank you for your business. Please make the payment by the due date.
          </p>
        </div>
      </div>
    </div>
  );
}
