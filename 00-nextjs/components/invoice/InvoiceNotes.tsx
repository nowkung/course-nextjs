interface InvoiceNotesProps {
  notes?: string;
}

export default function InvoiceNotes({ notes }: InvoiceNotesProps) {
  if (!notes) return null;

  return (
    <div className="px-6 py-4 bg-gray-50">
      <h3 className="text-sm font-medium text-gray-500">Notes</h3>
      <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">
        {notes}
      </p>
    </div>
  );
}
