import { CalendarDays } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';

function defaultStatusText() {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date());
}

export default function PageHeader({ title, description, actions, statusText = defaultStatusText() }) {
  return (
    <section className="relative overflow-hidden rounded-[20px] border border-[#dbe3ea] bg-white px-5 py-4 shadow-card">
      {/* Gradient accent bar at top */}
      <span className="absolute inset-x-0 top-0 h-[3px] rounded-t-[20px] bg-gradient-to-r from-[#1d9e75] via-[#38bdf8] to-[#1d9e75]" />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Breadcrumbs />
          <div className="mt-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748b]">ORBEM Solutions Private Limited</p>
            <h1 className="mt-1 truncate text-2xl font-semibold text-[#172033]">{title}</h1>
            {description ? <p className="mt-1 max-w-3xl text-sm leading-6 text-[#64748b]">{description}</p> : null}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#dbe3ea] bg-[#f8fafc] px-3 py-1.5 text-xs font-semibold text-[#344054]">
            <CalendarDays className="h-3.5 w-3.5 text-[#1d9e75]" />
            {statusText}
            {/* Animated live pulse */}
            <span className="relative ml-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1d9e75] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1d9e75]" />
            </span>
          </span>
          {actions ? <div className="flex flex-wrap justify-end gap-2">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
