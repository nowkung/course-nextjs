export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  customer: string;
  amount: number;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  customerEmail?: string;
  customerAddress?: string;
  notes?: string;
}
