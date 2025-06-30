import { useRouter } from 'next/navigation';
import { Invoice } from '@/types/invoice';
import InvoiceHeader from './InvoiceHeader';
import InvoiceCustomerInfo from './InvoiceCustomerInfo';
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceNotes from './InvoiceNotes';

interface InvoiceDetailProps {
  invoice: Invoice;
  onMarkAsPaid: () => void;
  onEdit: () => void;
}

export default function InvoiceDetail({ invoice, onMarkAsPaid, onEdit }: InvoiceDetailProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Back button */}
      <div className="px-6 pt-4">
        <button
          onClick={handleBack}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Invoices
        </button>
      </div>

      <InvoiceHeader 
        invoice={invoice}
        onEdit={onEdit}
        onMarkAsPaid={onMarkAsPaid}
      />
      
      <InvoiceCustomerInfo invoice={invoice} />
      
      <InvoiceItemsTable 
        items={invoice.items} 
        amount={invoice.amount || 0} 
      />
      
      <InvoiceNotes notes={invoice.notes} />
    </div>
  );
}
