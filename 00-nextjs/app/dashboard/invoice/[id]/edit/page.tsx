'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { getInvoice, updateInvoice, getInvoiceStatuses } from '@/services/invoiceService';
import { Invoice } from '@/types/invoice';

export default function EditInvoicePage() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [invoice, setInvoice] = useState<Partial<Invoice>>({
    customer: '',
    status: 'draft',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    customerEmail: '',
    customerAddress: '',
    notes: '',
    items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
  });

  const statuses = getInvoiceStatuses();

  useEffect(() => {
    const fetchInvoice = async () => {
      if (id && id !== 'new') {
        const data = await getInvoice(id as string);
        if (data) {
          setInvoice(data);
        }
      }
      setIsLoading(false);
    };

    fetchInvoice();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInvoice(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index: number, field: keyof Invoice['items'][0], value: string | number) => {
    const newItems = [...(invoice.items || [])];
    const item = { ...newItems[index] };
    
    item[field] = value as never;
    
    if (field === 'quantity' || field === 'unitPrice') {
      item.total = item.quantity * item.unitPrice;
    }
    
    newItems[index] = item;
    setInvoice(prev => ({
      ...prev,
      items: newItems,
      amount: newItems.reduce((sum, item) => sum + item.total, 0)
    }));
  };

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...(prev.items || []), { description: '', quantity: 1, unitPrice: 0, total: 0 }]
    }));
  };

  const removeItem = (index: number) => {
    const newItems = [...(invoice.items || [])];
    newItems.splice(index, 1);
    setInvoice(prev => ({
      ...prev,
      items: newItems,
      amount: newItems.reduce((sum, item) => sum + item.total, 0)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (id && id !== 'new') {
        await updateInvoice(id as string, invoice);
      } else {
        // Handle create new invoice
      }
      
      router.push('/dashboard/invoice');
      router.refresh();
    } catch (error) {
      console.error('Failed to save invoice:', error);
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6">
        {id === 'new' ? 'Create New Invoice' : `Edit Invoice #${id}`}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input
              type="text"
              name="customer"
              value={invoice.customer}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={invoice.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
            <input
              type="date"
              name="date"
              value={invoice.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={invoice.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
            <input
              type="email"
              name="customerEmail"
              value={invoice.customerEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Address</label>
            <textarea
              name="customerAddress"
              value={invoice.customerAddress}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Items</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addItem}
            >
              Add Item
            </Button>
          </div>
          
          <div className="space-y-4">
            {invoice.items?.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-start">
                <div className="col-span-5">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Item description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-end">
                  <span className="font-medium">${item.total.toFixed(2)}</span>
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-800"
                    disabled={invoice.items?.length === 1}
                  >
                    <span className="sr-only">Remove</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${invoice.amount?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${invoice.amount?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            name="notes"
            value={invoice.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Additional notes or terms"
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/invoice')}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Invoice'}
          </Button>
        </div>
      </form>
    </div>
  );
}
