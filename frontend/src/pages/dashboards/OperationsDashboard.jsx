import RoleDashboardBase from './RoleDashboardBase';

export default function OperationsDashboard() {
  return (
    <RoleDashboardBase
      title="Operations Workspace"
      subtitle="Manage assigned bookings, shipment updates, and document blockers."
      statusText="Operations Staff"
      queueTitle="Assigned bookings"
      cards={[
        { key: 'assignedBookings', label: 'Assigned bookings', icon: 'bookings', tone: '#1d9e75' },
        { key: 'activeShipments', label: 'Active shipments', icon: 'shipments', tone: '#378add' },
        { key: 'pendingDocuments', label: 'Pending documents', icon: 'documents', tone: '#ef9f27' },
        { key: 'delayedShipments', label: 'Delayed shipments', icon: 'alerts', tone: '#e24b4a' },
        { key: 'todayShipmentUpdates', label: "Today's updates", icon: 'tasks', tone: '#6366f1' },
        { key: 'operationsAlerts', label: 'Operational alerts', icon: 'alerts', tone: '#d97706' }
      ]}
      quickLinks={[
        { to: '/bookings', label: 'Create or update booking', hint: 'Ops' },
        { to: '/shipments', label: 'Update shipment status', hint: 'Live' },
        { to: '/documents', label: 'Resolve documents', hint: 'Docs' },
        { to: '/alerts', label: 'Review operational alerts', hint: 'Alerts' }
      ]}
    />
  );
}
