import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

export default function ErrorState({ title = 'Unable to load data', message = 'Something went wrong.', onRetry }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50/60 px-5 py-4 text-sm text-red-800 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
          <AlertTriangle className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0 flex-1 pt-1">
          <p className="font-semibold text-red-800">{title}</p>
          <p className="mt-0.5 text-xs leading-5 text-red-700">{message}</p>
          {onRetry ? (
            <Button variant="secondary" className="mt-3 text-xs" icon={RefreshCw} onClick={onRetry}>
              Retry
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
