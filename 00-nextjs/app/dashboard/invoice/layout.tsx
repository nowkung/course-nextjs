import { ReactNode } from 'react';
import Link from 'next/link';

interface InvoiceLayoutProps {
  children: ReactNode;
}

export default function InvoiceLayout({ children }: InvoiceLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Link 
          href="/dashboard/invoice/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Create New
        </Link>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="font-semibold mb-3">Filter</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="pending" className="rounded text-blue-600" />
                <label htmlFor="pending" className="ml-2 text-sm">Pending</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="paid" className="rounded text-blue-600" />
                <label htmlFor="paid" className="ml-2 text-sm">Paid</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="overdue" className="rounded text-blue-600" />
                <label htmlFor="overdue" className="ml-2 text-sm">Overdue</label>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="font-semibold mb-3">Quick Actions</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard/invoice/export" className="text-blue-600 hover:underline text-sm">
                  Export Invoices
                </Link>
              </li>
              <li>
                <Link href="/dashboard/invoice/templates" className="text-blue-600 hover:underline text-sm">
                  Templates
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
