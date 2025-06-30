import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

interface InvoiceErrorProps {
  message: string;
  onRetry?: () => void;
}

export default function InvoiceError({ message, onRetry }: InvoiceErrorProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <h2 className="text-xl font-semibold mb-4 text-red-600">Error</h2>
      <p className="text-gray-600 mb-6">{message}</p>
      <div className="space-x-4">
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/invoice')}
        >
          Back to Invoices
        </Button>
        {onRetry && (
          <Button
            variant="primary"
            onClick={onRetry}
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
