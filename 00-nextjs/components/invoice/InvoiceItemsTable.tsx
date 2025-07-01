import { Invoice } from '@/types/invoice';

interface InvoiceItemsTableProps {
  items: Invoice['items'];
  amount: number;
}

export default function InvoiceItemsTable({ items, amount }: InvoiceItemsTableProps) {
  return (
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
            {items?.map((item, index) => (
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
                ${amount?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
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
                ${amount?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
