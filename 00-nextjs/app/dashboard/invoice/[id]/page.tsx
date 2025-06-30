'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { getInvoice } from '@/services/invoiceService';
import { Invoice } from '@/types/invoice';

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const data = await getInvoice(id as string);
        if (data) {
          setInvoice(data);
        } else {
          setError('Invoice not found');
        }
      } catch (err) {
        console.error('Failed to fetch invoice:', err);
        setError('Failed to load invoice. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInvoice();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Error</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/invoice')}
        >
          Back to Invoices
        </Button>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Invoice Not Found</h2>
        <p className="text-gray-600 mb-6">The requested invoice could not be found.</p>
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/invoice')}
        >
          Back to Invoices
        </Button>
      </div>
    );
  }

  const statusColor = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    overdue: 'bg-red-100 text-red-800',
    draft: 'bg-gray-100 text-gray-800',
  }[invoice.status] || 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Back button */}
      <div className="px-6 pt-4">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Invoices
        </button>
      </div>

      {/* Header */}
      <div className="px-6 pb-4 pt-2 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoice #{invoice.id}</h1>
          <div className="mt-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
              {invoice.status?.charAt(0).toUpperCase() + invoice.status?.slice(1)}
            </span>
          </div>
        </div>
        <div className="space-x-2">
          <a
            href={`/dashboard/invoice/${invoice.id}/edit`}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </a>
          <Button variant="primary" size="sm">
            Mark as Paid
          </Button>
        </div>
      </div>

      {/* Invoice Details */}
      {/* Customer and Invoice Info */}
      <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Bill To</h3>
          <p className="text-sm text-gray-900 font-medium">{invoice.customer}</p>
          {invoice.customerEmail && (
            <p className="text-sm text-gray-600">{invoice.customerEmail}</p>
          )}
          {invoice.customerAddress && (
            <div className="whitespace-pre-line text-sm text-gray-600 mt-1">
              {invoice.customerAddress}
            </div>
          )}
        </div>
        <div className="md:text-right">
          <div className="grid grid-cols-2 gap-x-4">
            <div className="text-sm text-gray-500">Invoice #</div>
            <div className="text-sm font-medium">{invoice.id}</div>

            <div className="text-sm text-gray-500">Date</div>
            <div className="text-sm">{invoice.date ? new Date(invoice.date).toLocaleDateString() : 'N/A'}</div>

            <div className="text-sm text-gray-500">Due Date</div>
            <div className="text-sm">{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}</div>

            <div className="text-sm text-gray-500">Amount Due</div>
            <div className="text-lg font-bold">${invoice.amount?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}</div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="px-6 py-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoice.items?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.description || 'No description'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    ${item.unitPrice?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    ${(item.quantity * (item.unitPrice || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-right px-6 py-4 text-sm font-medium text-gray-900">
                  Subtotal
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                  ${invoice.amount?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="text-right px-6 py-4 text-sm font-medium text-gray-900">
                  Tax (0%)
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                  $0.00
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="text-right px-6 py-4 text-lg font-bold text-gray-900 border-t border-gray-200">
                  Total
                </td>
                <td className="px-6 py-4 text-right text-lg font-bold text-gray-900 border-t border-gray-200">
                  ${invoice.amount?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="px-6 py-4 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-500">Notes</h3>
          <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">
            {invoice.notes}
          </p>
        </div>
      )}
    </div>
  );
}
