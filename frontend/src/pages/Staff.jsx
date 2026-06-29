import { useEffect, useState } from 'react';
import { RefreshCw, UsersRound } from 'lucide-react';
import api, { getErrorMessage } from '../services/api';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import LoadingState from '../components/common/LoadingState';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/bookings/StatusBadge';
import { roleLabel } from '../constants/roles';

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadStaff() {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/staff');
      setStaff(response.data.staff || response.data.users || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStaff();
  }, []);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Staff"
        description="Admin-only staff directory, roles, activity, and access visibility."
        statusText="Admin only"
        actions={<Button variant="secondary" icon={RefreshCw} onClick={loadStaff}>Refresh</Button>}
      />
      {error ? <ErrorState message={error} onRetry={loadStaff} /> : null}
      {loading ? (
        <LoadingState rows={7} />
      ) : staff.length ? (
        <div className="overflow-hidden rounded-lg border border-[#dbe3ea] bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="min-w-[720px] divide-y divide-[#edf2f7] text-left text-sm">
              <thead className="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f7]">
                {staff.map((member) => (
                  <tr key={member.id || member.user_id} className="hover:bg-[#f8fafc]">
                    <td className="px-4 py-3">
                      <span className="inline-flex min-w-0 items-center gap-2 break-words font-semibold text-[#172033]">
                        <UsersRound className="h-4 w-4 shrink-0 text-[#64748b]" />
                        {member.name || member.staff_name || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3 break-words text-[#64748b]">{member.email || '-'}</td>
                    <td className="px-4 py-3">{roleLabel(member.role)}</td>
                    <td className="px-4 py-3 break-words text-[#64748b]">{member.phone || '-'}</td>
                    <td className="px-4 py-3"><StatusBadge status={member.status || (member.is_active ? 'Active' : 'Inactive')} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState title="No staff records" message="Staff records will appear once users or staff profiles are available." />
      )}
    </div>
  );
}
