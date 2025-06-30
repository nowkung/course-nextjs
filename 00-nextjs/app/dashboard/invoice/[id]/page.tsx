'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getInvoice } from '@/services/invoiceService';
import { Invoice } from '@/types/invoice';
import InvoiceLoading from '@/components/invoice/InvoiceLoading';
import InvoiceError from '@/components/invoice/InvoiceError';
import InvoiceDetail from '@/components/invoice/InvoiceDetail';

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (id) {
      fetchInvoice();
    }
  }, [id]);

  const handleMarkAsPaid = async () => {
    // TODO: Implement mark as paid functionality
    console.log('Marking invoice as paid:', invoice?.id);
  };

  const handleEdit = () => {
    if (invoice) {
      router.push(`/dashboard/invoice/${invoice.id}/edit`);
    }
  };

  if (loading) {
    return <InvoiceLoading />;
  }

  if (error) {
    return (
      <InvoiceError
        message={error}
        onRetry={fetchInvoice}
      />
    );
  }

  if (!invoice) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Invoice Not Found</h2>
        <p className="text-gray-600 mb-6">The requested invoice could not be found.</p>
        <button
          onClick={() => router.push('/dashboard/invoice')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Invoices
        </button>
      </div>
    );
  }

  return (
    <InvoiceDetail
      invoice={invoice}
      onMarkAsPaid={handleMarkAsPaid}
      onEdit={handleEdit}
    />
  );
}
