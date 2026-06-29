import { Search, X } from 'lucide-react';
import Button from './Button';
import Input from './Input';

export default function SearchFilterBar({ value, onChange, onSearch, onClear, placeholder = 'Search records', children }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-card no-print">
      <div className="grid min-w-0 gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
        <Input label="Search" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
        <div className="flex flex-wrap items-end gap-2 md:flex-nowrap">
          <Button variant="secondary" icon={X} onClick={onClear}>Clear</Button>
          <Button icon={Search} onClick={onSearch}>Search</Button>
        </div>
      </div>
      {children ? <div className="mt-3 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-4">{children}</div> : null}
    </div>
  );
}
