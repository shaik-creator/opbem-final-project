import RoleDashboardBase from './RoleDashboardBase';

export default function AccountsDashboard() {
  return (
    <RoleDashboardBase
      title="Accounts Workspace"
      subtitle="Track invoices, payments, pending balances, and revenue."
      statusText="Accounts Staff"
      queueTitle="Payment follow-ups"
      cards={[
        { key: 'monthlyRevenue', label: 'Monthly revenue', icon: 'revenue', type: 'currency', tone: '#0f766e' },
        { key: 'paidInvoices', label: 'Paid invoices', icon: 'complete', tone: '#059669' },
        { key: 'pendingPayments', label: 'Pending payments', icon: 'payments', type: 'currency', tone: '#d97706' },
        { key: 'overduePayments', label: 'Overdue payments', icon: 'alerts', tone: '#e24b4a' },
        { key: 'partialPayments', label: 'Partial payments', icon: 'payments', tone: '#6366f1' },
        { key: 'customerBalances', label: 'Customer balances', icon: 'staff', type: 'currency', tone: '#378add' }
      ]}
      quickLinks={[
        { to: '/revenue', label: 'Update payment', hint: 'Finance' },
        { to: '/customers', label: 'Review customer billing', hint: 'CRM' },
        { to: '/reports', label: 'Export revenue report', hint: 'CSV' },
        { to: '/alerts', label: 'Review payment alerts', hint: 'Alerts' }
      ]}
    />
  );
}
