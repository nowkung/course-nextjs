import { Invoice } from '@/types/invoice';

interface InvoiceCustomerInfoProps {
  invoice: Invoice;
}

export default function InvoiceCustomerInfo({ invoice }: InvoiceCustomerInfoProps) {
  return (
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
          <div className="text-sm">
            {invoice.date ? new Date(invoice.date).toLocaleDateString() : 'N/A'}
          </div>
          
          <div className="text-sm text-gray-500">Due Date</div>
          <div className="text-sm">
            {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}
          </div>
          
          <div className="text-sm text-gray-500">Amount Due</div>
          <div className="text-lg font-bold">
            ${invoice.amount?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
          </div>
        </div>
      </div>
    </div>
  );
}
