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
    <section className="relative w-full max-w-full overflow-hidden rounded-[20px] border border-[#dbe3ea] bg-white px-4 py-4 shadow-card sm:px-5">
      {/* Gradient accent bar at top */}
      <span className="absolute inset-x-0 top-0 h-[3px] rounded-t-[20px] bg-gradient-to-r from-[#1d9e75] via-[#38bdf8] to-[#1d9e75]" />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Breadcrumbs />
          <div className="mt-3">
            <p className="break-words text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748b]">ORBEM Solutions Private Limited</p>
            <h1 className="mt-1 break-words text-xl font-semibold text-[#172033] sm:text-2xl">{title}</h1>
            {description ? <p className="mt-1 max-w-3xl break-words text-sm leading-6 text-[#64748b]">{description}</p> : null}
          </div>
        </div>
        <div className="flex w-full min-w-0 flex-col items-start gap-3 sm:w-auto sm:shrink-0 sm:items-end">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#dbe3ea] bg-[#f8fafc] px-3 py-1.5 text-xs font-semibold text-[#344054]">
            <CalendarDays className="h-3.5 w-3.5 shrink-0 text-[#1d9e75]" />
            <span className="min-w-0 break-words">{statusText}</span>
            {/* Animated live pulse */}
            <span className="relative ml-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1d9e75] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1d9e75]" />
            </span>
          </span>
          {actions ? <div className="flex w-full min-w-0 flex-wrap gap-2 sm:w-auto sm:justify-end">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
