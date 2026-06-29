import { X } from 'lucide-react';
import Button from './Button';

export default function Modal({ title, open, onClose, children, size = 'max-w-3xl' }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900/50 p-3 sm:p-4">
      <div className={`max-h-[90vh] w-full min-w-0 ${size} overflow-hidden rounded-lg bg-white shadow-xl`}>
        <div className="flex min-w-0 items-center justify-between gap-3 border-b border-gray-200 px-4 py-4 sm:px-5">
          <h2 className="min-w-0 break-words text-base font-semibold text-gray-900">{title}</h2>
          <Button variant="ghost" className="h-9 w-9 px-0" onClick={onClose} aria-label="Close modal">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="max-h-[calc(90vh-72px)] overflow-y-auto overflow-x-hidden p-4 sm:p-5">{children}</div>
      </div>
    </div>
  );
}
