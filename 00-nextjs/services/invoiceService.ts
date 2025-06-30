import { Invoice, InvoiceItem } from '@/types/invoice';

// Mock database
let invoices: Invoice[] = [
  {
    id: 'INV-001',
    customer: 'Acme Inc.',
    amount: 1200,
    status: 'paid',
    date: '2023-05-15',
    dueDate: '2023-06-15',
    customerEmail: 'billing@acme.com',
    customerAddress: '123 Business St.\\nSan Francisco, CA 94103',
    notes: 'Thank you for your business!',
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
    customerEmail: 'accounts@globex.com',
    customerAddress: '456 Corporate Ave.\\nNew York, NY 10001',
    notes: 'Payment due upon receipt',
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
    customerEmail: 'finance@soylent.com',
    customerAddress: '789 Industrial Way\\nChicago, IL 60601',
    notes: 'Second notice',
    items: [
      { description: 'Software License', quantity: 1, unitPrice: 2500, total: 2500 },
      { description: 'Support Package', quantity: 1, unitPrice: 1000, total: 1000 },
    ]
  },
];

// Calculate total amount from items
const calculateTotal = (items: InvoiceItem[]): number => {
  return items.reduce((sum, item) => sum + item.total, 0);
};

// Generate a new invoice ID
const generateId = (): string => {
  const lastId = Math.max(
    0,
    ...invoices.map((inv) => parseInt(inv.id.split('-')[1]))
  );
  return `INV-${String(lastId + 1).padStart(3, '0')}`;
};

export const getInvoices = async (): Promise<Invoice[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve([...invoices]), 300);
  });
};

export const getInvoice = async (id: string): Promise<Invoice | undefined> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(invoices.find((invoice) => invoice.id === id));
    }, 300);
  });
};

export const createInvoice = async (invoiceData: Omit<Invoice, 'id' | 'amount'>): Promise<Invoice> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const amount = calculateTotal(invoiceData.items);
      const newInvoice: Invoice = {
        ...invoiceData,
        id: generateId(),
        amount,
      };
      invoices.push(newInvoice);
      resolve(newInvoice);
    }, 500);
  });
};

export const updateInvoice = async (id: string, invoiceData: Partial<Omit<Invoice, 'id'>>): Promise<Invoice | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = invoices.findIndex((inv) => inv.id === id);
      if (index === -1) {
        resolve(undefined);
        return;
      }

      const updatedItems = invoiceData.items || invoices[index].items;
      const amount = calculateTotal(updatedItems);
      
      const updatedInvoice: Invoice = {
        ...invoices[index],
        ...invoiceData,
        items: updatedItems,
        amount,
      };

      invoices[index] = updatedInvoice;
      resolve(updatedInvoice);
    }, 500);
  });
};

export const deleteInvoice = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const initialLength = invoices.length;
      invoices = invoices.filter((invoice) => invoice.id !== id);
      resolve(invoices.length < initialLength);
    }, 500);
  });
};

export const getInvoiceStatuses = (): string[] => {
  return ['draft', 'pending', 'paid', 'overdue'];
};
