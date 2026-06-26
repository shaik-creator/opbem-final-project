import { Inbox } from 'lucide-react';
import Button from './Button';

export default function EmptyState({ title = 'No records found', message = 'Try adjusting filters or add a new record.', actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#dbe3ea] bg-[#f8fafc] px-6 py-12 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-[#dbe3ea] shadow-sm">
        <Inbox className="h-7 w-7 text-[#94a3b8]" />
      </span>
      <h3 className="text-sm font-semibold text-[#172033]">{title}</h3>
      <p className="mt-1.5 max-w-xs text-sm leading-6 text-[#64748b]">{message}</p>
      {actionLabel && onAction ? (
        <Button className="mt-5" onClick={onAction}>{actionLabel}</Button>
      ) : null}
    </div>
  );
}
