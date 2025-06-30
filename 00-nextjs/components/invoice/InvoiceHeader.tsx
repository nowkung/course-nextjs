import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Invoice } from '@/types/invoice';

interface InvoiceHeaderProps {
  invoice: Invoice;
  onEdit?: () => void;
  onMarkAsPaid?: () => void;
}

export default function InvoiceHeader({ invoice, onEdit, onMarkAsPaid }: InvoiceHeaderProps) {
  const router = useRouter();
  const statusColor = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    overdue: 'bg-red-100 text-red-800',
    draft: 'bg-gray-100 text-gray-800',
  }[invoice.status] || 'bg-gray-100 text-gray-800';

  return (
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
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button 
          variant="primary" 
          size="sm"
          onClick={onMarkAsPaid}
        >
          Mark as Paid
        </Button>
      </div>
    </div>
  );
}
