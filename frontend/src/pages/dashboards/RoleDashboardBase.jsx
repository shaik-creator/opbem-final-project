import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileWarning,
  PackageCheck,
  Truck,
  UsersRound,
  Wallet
} from 'lucide-react';
import api, { getErrorMessage } from '../../services/api';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import SummaryCard from '../../components/common/SummaryCard';
import StatusBadge from '../../components/bookings/StatusBadge';
import { formatCurrency, formatDate, formatNumber } from '../../utils/formatters';

const iconMap = {
  bookings: PackageCheck,
  shipments: Truck,
  documents: FileWarning,
  revenue: CreditCard,
  payments: Wallet,
  alerts: AlertCircle,
  staff: UsersRound,
  tasks: ClipboardList,
  complete: CheckCircle2
};

function formatValue(type, value) {
  if (type === 'currency') return formatCurrency(value);
  return formatNumber(value, 0);
}

function Panel({ title, action, children }) {
  return (
    <section className="min-w-0 overflow-hidden rounded-lg border border-[#dbe3ea] bg-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dbe3ea] px-4 py-3">
        <h2 className="min-w-0 break-words text-sm font-semibold text-[#111827]">{title}</h2>
        {action}
      </div>
      <div className="min-w-0 p-4">{children}</div>
    </section>
  );
}

function RecentBookings({ rows = [], title = 'Operational queue' }) {
  if (!rows.length) {
    return <EmptyState title="No records yet" message="Role-specific operational records will appear here." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-[#dbe3ea] bg-[#f8fafc] text-[11px] font-semibold uppercase tracking-wide text-[#64748b]">
            <th className="px-3 py-2">{title}</th>
            <th className="px-3 py-2">Customer</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Expected</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#edf2f7]">
          {rows.slice(0, 6).map((row) => (
            <tr key={row.id} className="hover:bg-[#f8fafc]">
              <td className="px-3 py-2">
                <Link className="break-words font-semibold text-[#0f1f3d] hover:text-[#1d9e75]" to={`/bookings/${row.id}`}>
                  {row.booking_id || row.awb_number || `#${row.id}`}
                </Link>
                <p className="mt-0.5 break-words text-xs text-[#64748b]">
                  {row.origin_airport || '---'} to {row.destination_airport || '---'}
                </p>
              </td>
              <td className="px-3 py-2 break-words text-[#111827]">{row.company_name || row.customer_name || '-'}</td>
              <td className="px-3 py-2"><StatusBadge status={row.shipment_status || row.current_status || 'Pending'} /></td>
              <td className="px-3 py-2 text-[#64748b]">{formatDate(row.expected_delivery_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function RoleDashboardBase({ title, subtitle, statusText, cards, quickLinks = [], queueTitle }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/dashboard/summary');
      setData(response.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const values = useMemo(() => ({ ...(data?.kpis || {}), ...(data?.roleSummary || {}) }), [data]);

  if (loading && !data) return <LoadingState rows={8} />;
  if (error && !data) return <ErrorState message={error} onRetry={loadDashboard} />;

  return (
    <div className="space-y-5">
      <PageHeader title={title} description={subtitle} statusText={statusText} />
      {error ? <ErrorState message={error} onRetry={loadDashboard} /> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = iconMap[card.icon] || PackageCheck;
          return (
            <SummaryCard
              key={card.key}
              title={card.label}
              value={formatValue(card.type, values[card.key])}
              icon={Icon}
              tone={card.tone}
            />
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
        <Panel
          title={queueTitle || 'Current work'}
          action={<Link to="/shipments" className="text-xs font-semibold text-[#1d9e75] hover:underline">Open shipments</Link>}
        >
          <RecentBookings rows={data?.tables?.recentBookings || []} title={queueTitle} />
        </Panel>

        <Panel title="Role shortcuts">
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-lg border border-[#dbe3ea] bg-[#f8fafc] px-3 py-2 text-sm font-semibold text-[#172033] transition hover:border-[#b8c7d6] hover:bg-white"
              >
                <span className="min-w-0 break-words">{link.label}</span>
                <span className="break-words text-xs text-[#64748b]">{link.hint}</span>
              </Link>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
